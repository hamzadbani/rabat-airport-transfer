<?php

namespace App\Livewire\Dashboard;

use App\Http\Requests\Dashboard\StoreOrganizationRequest;
use App\Models\Organization;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Livewire\Component;
use Livewire\WithPagination;

class OrganizationsManager extends Component
{
    use AuthorizesRequests;
    use WithPagination;

    public string $search = '';

    public bool $showForm = false;

    public ?int $editingId = null;

    public string $name = '';

    public string $phone = '';

    public string $notes = '';

    public function updatingSearch(): void
    {
        $this->resetPage();
    }

    public function openCreate(): void
    {
        $this->authorize('create', Organization::class);
        $this->resetForm();
        $this->showForm = true;
    }

    public function openEdit(int $id): void
    {
        $org = Organization::findOrFail($id);
        $this->authorize('update', $org);
        $this->editingId = $id;
        $this->name = $org->name;
        $this->phone = $org->phone ?? '';
        $this->notes = $org->notes ?? '';
        $this->showForm = true;
    }

    public function closeForm(): void
    {
        $this->showForm = false;
        $this->editingId = null;
    }

    public function save(): void
    {
        $data = $this->validate((new StoreOrganizationRequest)->rules());

        if ($this->editingId) {
            $org = Organization::findOrFail($this->editingId);
            $this->authorize('update', $org);
            $org->update($data);
            session()->flash('success', __('dashboard.organizations.updated'));
        } else {
            $this->authorize('create', Organization::class);
            Organization::create($data);
            session()->flash('success', __('dashboard.organizations.created'));
        }

        $this->closeForm();
    }

    public function delete(int $id): void
    {
        $org = Organization::findOrFail($id);
        $this->authorize('delete', $org);
        $org->delete();
        session()->flash('success', __('dashboard.organizations.deleted'));
    }

    public function render(): View
    {
        $query = Organization::query();

        if ($this->search !== '') {
            $term = '%'.$this->search.'%';
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', $term)
                    ->orWhere('phone', 'like', $term)
                    ->orWhere('notes', 'like', $term);
            });
        }

        return view('livewire.dashboard.organizations-manager', [
            'organizations' => $query->orderBy('name')->paginate(12),
        ]);
    }

    private function resetForm(): void
    {
        $this->editingId = null;
        $this->name = '';
        $this->phone = '';
        $this->notes = '';
    }
}
