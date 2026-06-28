<?php

namespace App\Livewire\Dashboard;

use App\Http\Requests\Dashboard\StoreDriverRequest;
use App\Models\Driver;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;
use Livewire\Component;
use Livewire\WithFileUploads;
use Livewire\WithPagination;

class DriversManager extends Component
{
    use AuthorizesRequests;
    use WithFileUploads;
    use WithPagination;

    public string $search = '';

    public bool $showForm = false;

    public ?int $editingId = null;

    public string $name = '';

    public string $phone = '';

    public string $vehicle = '';

    public string $rating = '0';

    public string $notes = '';

    public $photo;

    public ?string $existingPhoto = null;

    public function updatingSearch(): void
    {
        $this->resetPage();
    }

    public function openCreate(): void
    {
        $this->authorize('create', Driver::class);
        $this->resetForm();
        $this->showForm = true;
    }

    public function openEdit(int $id): void
    {
        $driver = Driver::findOrFail($id);
        $this->authorize('update', $driver);
        $this->editingId = $id;
        $this->name = $driver->name;
        $this->phone = $driver->phone;
        $this->vehicle = $driver->vehicle ?? '';
        $this->rating = (string) $driver->rating;
        $this->notes = $driver->notes ?? '';
        $this->existingPhoto = $driver->photoUrl();
        $this->photo = null;
        $this->showForm = true;
    }

    public function closeForm(): void
    {
        $this->showForm = false;
        $this->editingId = null;
        $this->photo = null;
    }

    public function save(): void
    {
        $rules = (new StoreDriverRequest)->rules();
        if ($this->editingId) {
            $rules['photo'] = ['nullable', 'image', 'max:2048'];
        }
        $data = $this->validate($rules);

        $payload = [
            'name' => $data['name'],
            'phone' => $data['phone'],
            'vehicle' => $data['vehicle'] ?? '',
            'rating' => $data['rating'] ?? 0,
            'notes' => $data['notes'] ?? '',
        ];

        if ($this->photo) {
            $path = $this->photo->store('drivers', 'public');
            $payload['photo_path'] = $path;
        }

        if ($this->editingId) {
            $driver = Driver::findOrFail($this->editingId);
            $this->authorize('update', $driver);
            if ($this->photo && $driver->photo_path) {
                Storage::disk('public')->delete($driver->photo_path);
            }
            $driver->update($payload);
            session()->flash('success', __('dashboard.drivers.updated'));
        } else {
            $this->authorize('create', Driver::class);
            Driver::create($payload);
            session()->flash('success', __('dashboard.drivers.created'));
        }

        $this->closeForm();
    }

    public function delete(int $id): void
    {
        $driver = Driver::findOrFail($id);
        $this->authorize('delete', $driver);
        if ($driver->photo_path) {
            Storage::disk('public')->delete($driver->photo_path);
        }
        $driver->delete();
        session()->flash('success', __('dashboard.drivers.deleted'));
    }

    public function render(): View
    {
        $query = Driver::query();

        if ($this->search !== '') {
            $term = '%'.$this->search.'%';
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', $term)
                    ->orWhere('phone', 'like', $term)
                    ->orWhere('vehicle', 'like', $term);
            });
        }

        return view('livewire.dashboard.drivers-manager', [
            'drivers' => $query->orderBy('name')->paginate(12),
        ]);
    }

    private function resetForm(): void
    {
        $this->editingId = null;
        $this->name = '';
        $this->phone = '';
        $this->vehicle = '';
        $this->rating = '4.50';
        $this->notes = '';
        $this->photo = null;
        $this->existingPhoto = null;
    }
}
