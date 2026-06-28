<?php

namespace App\Livewire\Dashboard;

use App\Http\Requests\Dashboard\StorePricingZoneRequest;
use App\Models\PricingZone;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Livewire\Component;
use Livewire\WithPagination;

class PricingZonesManager extends Component
{
    use AuthorizesRequests;
    use WithPagination;

    public string $search = '';

    public bool $showForm = false;

    public ?int $editingId = null;

    public string $name = '';

    public string $city = '';

    public string $region = '';

    public bool $is_airport = false;

    public string $radius_km = '5';

    public string $day_price = '0';

    public string $night_price = '0';

    public string $currency = 'MAD';

    public bool $is_active = true;

    public ?string $lat = null;

    public ?string $lng = null;

    public function updatingSearch(): void
    {
        $this->resetPage();
    }

    public function updatedSearch(): void
    {
        $this->resetPage();
    }

    public function openCreate(): void
    {
        $this->authorize('create', PricingZone::class);
        $this->resetForm();
        $this->showForm = true;
        $this->dispatch('pricing-map-init', lat: 34.0209, lng: -6.8416, componentId: $this->getId());
    }

    public function openEdit(int $id): void
    {
        $zone = PricingZone::findOrFail($id);
        $this->authorize('update', $zone);
        $this->editingId = $id;
        $this->name = $zone->name;
        $this->city = $zone->city;
        $this->region = $zone->region ?? '';
        $this->is_airport = (bool) $zone->is_airport;
        $this->radius_km = (string) $zone->radius_km;
        $this->day_price = (string) $zone->day_price;
        $this->night_price = (string) $zone->night_price;
        $this->currency = $zone->currency;
        $this->is_active = (bool) $zone->is_active;
        $this->lat = $zone->lat !== null ? (string) $zone->lat : null;
        $this->lng = $zone->lng !== null ? (string) $zone->lng : null;
        $this->showForm = true;
        $this->dispatch('pricing-map-init', lat: (float) ($zone->lat ?? 34.0209), lng: (float) ($zone->lng ?? -6.8416), componentId: $this->getId());
    }

    public function closeForm(): void
    {
        $this->showForm = false;
        $this->editingId = null;
    }

    public function setCoordinates(float $lat, float $lng): void
    {
        $this->lat = (string) $lat;
        $this->lng = (string) $lng;
    }

    public function save(): void
    {
        $data = $this->validate((new StorePricingZoneRequest)->rules());

        if ($this->editingId) {
            $zone = PricingZone::findOrFail($this->editingId);
            $this->authorize('update', $zone);
            $zone->update($data);
            session()->flash('success', __('dashboard.pricing.updated'));
        } else {
            $this->authorize('create', PricingZone::class);
            PricingZone::create($data);
            session()->flash('success', __('dashboard.pricing.created'));
        }

        $this->closeForm();
    }

    public function delete(int $id): void
    {
        $zone = PricingZone::findOrFail($id);
        $this->authorize('delete', $zone);
        $zone->delete();
        session()->flash('success', __('dashboard.pricing.deleted'));
    }

    public function render(): View
    {
        $query = PricingZone::query();

        if ($this->search !== '') {
            $term = '%'.$this->search.'%';
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', $term)
                    ->orWhere('city', 'like', $term)
                    ->orWhere('day_price', 'like', $term)
                    ->orWhere('night_price', 'like', $term);
            });
        }

        return view('livewire.dashboard.pricing-zones-manager', [
            'zones' => $query->orderBy('name')->paginate(15),
        ]);
    }

    private function resetForm(): void
    {
        $this->editingId = null;
        $this->name = '';
        $this->city = '';
        $this->region = '';
        $this->is_airport = false;
        $this->radius_km = '5';
        $this->day_price = '0';
        $this->night_price = '0';
        $this->currency = 'MAD';
        $this->is_active = true;
        $this->lat = '34.0209';
        $this->lng = '-6.8416';
    }
}
