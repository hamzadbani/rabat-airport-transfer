<?php

namespace App\Livewire\Dashboard;

use App\Models\Organization;
use App\Models\Reservation;
use App\Support\ReservationFilters;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;
use Livewire\Component;
use Livewire\WithPagination;

class BookingsManager extends Component
{
    use AuthorizesRequests;
    use WithPagination;

    public string $search = '';

    public string $archive = 'active';

    public string $status = 'all';

    public string $dateFrom = '';

    public string $dateTo = '';

    public ?int $organizationId = null;

    protected $queryString = ['search', 'archive', 'status', 'dateFrom', 'dateTo', 'organizationId'];

    public function mount(): void
    {
        $this->archive = request()->query('archive', 'active');
        $this->status = request()->query('status', 'all');
        $this->dateFrom = now()->startOfMonth()->format('Y-m-d');
        $this->dateTo = now()->endOfMonth()->format('Y-m-d');
    }

    public function render(): View
    {
        $this->authorize('viewAny', Reservation::class);

        $organizations = Organization::query()
            ->when($this->organizationId, fn ($q) => $q->where('id', $this->organizationId))
            ->orderBy('name')
            ->get();

        $partnerStats = $organizations->map(function (Organization $org) {
            $query = $org->reservations();
            if ($this->dateFrom) {
                $query->whereDate('date', '>=', $this->dateFrom);
            }
            if ($this->dateTo) {
                $query->whereDate('date', '<=', $this->dateTo);
            }

            return (object) [
                'id' => $org->id,
                'name' => $org->name,
                'phone' => $org->phone,
                'trip_count' => (clone $query)->count(),
                'total_revenue' => (clone $query)->sum('price'),
            ];
        })->filter(fn ($p) => $p->trip_count > 0)->values();

        $grandTotal = $partnerStats->sum('total_revenue');

        $listQuery = Reservation::query()
            ->with(['driver', 'organization'])
            ->whereNotNull('organization_id');

        ReservationFilters::apply($listQuery, [
            'archive' => $this->archive,
            'status' => $this->status,
            'date' => request()->query('date', ''),
        ]);

        if ($this->search !== '') {
            $term = '%'.$this->search.'%';
            $listQuery->where(function ($q) use ($term) {
                $q->where('client_name', 'like', $term)
                    ->orWhere('phone', 'like', $term)
                    ->orWhereHas('organization', fn ($o) => $o->where('name', 'like', $term));
            });
        }

        return view('livewire.dashboard.bookings-manager', [
            'partnerStats' => $partnerStats,
            'grandTotal' => $grandTotal,
            'organizations' => Organization::orderBy('name')->get(),
            'bookings' => $listQuery->orderByDesc('date')->paginate(10),
        ]);
    }
}
