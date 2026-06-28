<?php

namespace App\Livewire\Dashboard;

use App\Models\Driver;
use App\Models\Organization;
use App\Models\Reservation;
use App\Support\ReservationFilters;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Livewire\Component;
use Livewire\WithPagination;

class ReservationsManager extends Component
{
    use AuthorizesRequests;
    use WithPagination;

    public string $search = '';

    public string $archive = 'active';

    public string $status = 'all';

    public bool $showForm = false;

    public bool $showDetail = false;

    public ?int $editingId = null;

    public ?int $detailId = null;

    public string $client_name = '';

    public string $client_phone = '';

    public string $pickup_address = '';

    public string $dropoff_address = '';

    public string $flight_number = '';

    public string $trip_date = '';

    public string $trip_time = '';

    public string $price = '0';

    public string $currency = 'MAD';

    public int $passengers = 1;

    public int $children = 0;

    public string $baggage = '';

    public string $notes = '';

    public ?int $driver_id = null;

    public ?int $organization_id = null;

    public string $reservation_status = 'planned';

    public string $trip_mode = 'one_way';

    public string $source = 'admin';

    protected $queryString = [
        'search' => ['except' => ''],
        'archive' => ['except' => 'active'],
        'status' => ['except' => 'all'],
    ];

    public function mount(): void
    {
        $this->archive = request()->query('archive', 'active');
        $this->status = request()->query('status', 'all');

        if (request()->boolean('new')) {
            $this->openCreate();
        }

        if ($detailId = request()->integer('detail')) {
            $this->openDetail($detailId);
        }
    }

    public function updatingSearch(): void
    {
        $this->resetPage();
    }

    public function openCreate(): void
    {
        $this->authorize('create', Reservation::class);
        $this->resetForm();
        $this->editingId = null;
        $this->showDetail = false;
        $this->showForm = true;
    }

    public function openEdit(int $id): void
    {
        $reservation = Reservation::findOrFail($id);
        $this->authorize('update', $reservation);
        $this->fillForm($reservation);
        $this->editingId = $id;
        $this->showDetail = false;
        $this->showForm = true;
    }

    public function openDetail(int $id): void
    {
        $reservation = Reservation::findOrFail($id);
        $this->authorize('view', $reservation);
        $this->detailId = $id;
        $this->showForm = false;
        $this->showDetail = true;
    }

    public function closeModals(): void
    {
        $this->showForm = false;
        $this->showDetail = false;
        $this->editingId = null;
        $this->detailId = null;
    }

    public function save(): void
    {
        $data = $this->validate([
            'client_name' => ['required', 'string', 'max:190'],
            'client_phone' => ['required', 'string', 'max:64'],
            'pickup_address' => ['required', 'string', 'max:500'],
            'dropoff_address' => ['required', 'string', 'max:500'],
            'flight_number' => ['nullable', 'string', 'max:32'],
            'trip_date' => ['required', 'date'],
            'trip_time' => ['required', 'date_format:H:i'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'in:MAD,EUR,USD'],
            'passengers' => ['required', 'integer', 'min:1'],
            'children' => ['nullable', 'integer', 'min:0'],
            'baggage' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
            'driver_id' => ['nullable', 'integer', 'exists:drivers,id'],
            'organization_id' => ['nullable', 'integer', 'exists:organizations,id'],
            'reservation_status' => ['required', 'in:planned,confirmed,cancelled'],
            'trip_mode' => ['required', 'in:one_way,round_trip'],
            'source' => ['required', 'in:admin,website,google_ads,phone,whatsapp'],
        ]);

        $driver = $data['driver_id'] ? Driver::find($data['driver_id']) : null;

        $payload = [
            'client_name' => $data['client_name'],
            'phone' => $data['client_phone'],
            'pickup_location' => $data['pickup_address'],
            'dropoff_location' => $data['dropoff_address'],
            'flight_number' => $data['flight_number'] ?? '',
            'date' => $data['trip_date'].' '.$data['trip_time'],
            'price' => $data['price'],
            'currency' => $data['currency'],
            'passengers' => $data['passengers'],
            'children_count' => $data['children'] ?? 0,
            'baggage' => $data['baggage'] ?? '',
            'notes' => $data['notes'] ?? '',
            'driver_id' => $data['driver_id'],
            'driver_name' => $driver?->name ?? 'Non assigné',
            'organization_id' => $data['organization_id'],
            'status' => $data['reservation_status'],
            'trip_mode' => $data['trip_mode'],
            'source' => $data['source'],
            'type' => 'byAdmin',
        ];

        if ($this->editingId) {
            $reservation = Reservation::findOrFail($this->editingId);
            $this->authorize('update', $reservation);
            $reservation->update($payload);
            session()->flash('success', __('dashboard.reservations.updated'));
        } else {
            $this->authorize('create', Reservation::class);
            Reservation::create($payload);
            session()->flash('success', __('dashboard.reservations.created'));
        }

        $this->closeModals();
    }

    public function delete(int $id): void
    {
        $reservation = Reservation::findOrFail($id);
        $this->authorize('delete', $reservation);
        $reservation->delete();
        session()->flash('success', __('dashboard.reservations.deleted'));
        $this->closeModals();
    }

    public function render(): View
    {
        $query = Reservation::query()->with(['driver', 'organization']);

        ReservationFilters::apply($query, [
            'archive' => $this->archive,
            'status' => $this->status,
            'date' => request()->query('date', ''),
        ]);

        if ($this->search !== '') {
            $term = '%'.$this->search.'%';
            $query->where(function ($q) use ($term) {
                $q->where('client_name', 'like', $term)
                    ->orWhere('phone', 'like', $term)
                    ->orWhere('pickup_location', 'like', $term)
                    ->orWhere('dropoff_location', 'like', $term)
                    ->orWhere('flight_number', 'like', $term)
                    ->orWhereHas('driver', fn ($d) => $d->where('name', 'like', $term));
            });
        }

        return view('livewire.dashboard.reservations-manager', [
            'reservations' => $query->orderByDesc('date')->paginate(10),
            'drivers' => Driver::orderBy('name')->get(),
            'organizations' => Organization::orderBy('name')->get(),
            'detail' => $this->detailId ? Reservation::with(['driver', 'organization'])->find($this->detailId) : null,
        ]);
    }

    private function resetForm(): void
    {
        $this->client_name = '';
        $this->client_phone = '';
        $this->pickup_address = '';
        $this->dropoff_address = '';
        $this->flight_number = '';
        $this->trip_date = now()->format('Y-m-d');
        $this->trip_time = now()->format('H:i');
        $this->price = '0';
        $this->currency = 'MAD';
        $this->passengers = 1;
        $this->children = 0;
        $this->baggage = '';
        $this->notes = '';
        $this->driver_id = null;
        $this->organization_id = Organization::default()->id;
        $this->reservation_status = 'planned';
        $this->trip_mode = 'one_way';
        $this->source = 'admin';
    }

    private function fillForm(Reservation $reservation): void
    {
        $this->client_name = $reservation->client_name;
        $this->client_phone = $reservation->client_phone;
        $this->pickup_address = $reservation->pickup_address;
        $this->dropoff_address = $reservation->dropoff_address;
        $this->flight_number = $reservation->flight_number;
        $this->trip_date = $reservation->trip_date ?? now()->format('Y-m-d');
        $this->trip_time = $reservation->trip_time ?? '00:00';
        $this->price = (string) $reservation->price;
        $this->currency = $reservation->currency ?? 'MAD';
        $this->passengers = (int) $reservation->passengers;
        $this->children = (int) $reservation->children;
        $this->baggage = $reservation->baggage ?? '';
        $this->notes = $reservation->notes ?? '';
        $this->driver_id = $reservation->driver_id;
        $this->organization_id = $reservation->organization_id;
        $this->reservation_status = $reservation->status;
        $this->trip_mode = $reservation->trip_mode ?? 'one_way';
        $this->source = $reservation->source ?? 'admin';
    }
}
