<?php

namespace App\Livewire\Dashboard;

use App\Http\Requests\Dashboard\StoreQuoteConfigRequest;
use App\Models\QuoteConfig;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Livewire\Component;
use Livewire\WithPagination;

class QuoteConfigsManager extends Component
{
    use AuthorizesRequests;
    use WithPagination;

    public string $search = '';

    public bool $showForm = false;

    public ?int $editingId = null;

    public string $name = '';

    public string $description = '';

    public string $unit_price = '0';

    public string $currency = 'MAD';

    public string $vat_rate = '10';

    public string $eur_to_mad = '10.8500';

    public string $usd_to_mad = '9.9500';

    public bool $is_active = true;

    public bool $is_default = false;

    public function updatingSearch(): void
    {
        $this->resetPage();
    }

    public function openCreate(): void
    {
        $this->authorize('create', QuoteConfig::class);
        $this->resetForm();
        $this->showForm = true;
    }

    public function openEdit(int $id): void
    {
        $config = QuoteConfig::findOrFail($id);
        $this->authorize('update', $config);
        $this->editingId = $id;
        $this->name = $config->name;
        $this->description = $config->description ?? '';
        $this->unit_price = (string) $config->unit_price;
        $this->currency = $config->currency;
        $this->vat_rate = (string) $config->vat_rate;
        $this->eur_to_mad = (string) $config->eur_to_mad;
        $this->usd_to_mad = (string) $config->usd_to_mad;
        $this->is_active = (bool) $config->is_active;
        $this->is_default = (bool) $config->is_default;
        $this->showForm = true;
    }

    public function closeForm(): void
    {
        $this->showForm = false;
        $this->editingId = null;
    }

    public function save(): void
    {
        $data = $this->validate((new StoreQuoteConfigRequest)->rules());

        if ($this->editingId) {
            $config = QuoteConfig::findOrFail($this->editingId);
            $this->authorize('update', $config);
            $config->update($data);
            $message = __('dashboard.config.updated');
        } else {
            $this->authorize('create', QuoteConfig::class);
            $config = QuoteConfig::create($data);
            $message = __('dashboard.config.created');
        }

        if ($data['is_default'] ?? false) {
            $config->setAsDefault();
        } elseif ($this->editingId && ! ($data['is_default'] ?? false)) {
            $config->update(['is_default' => false]);
        }

        if (QuoteConfig::query()->where('is_default', true)->doesntExist()) {
            QuoteConfig::query()->orderBy('id')->first()?->setAsDefault();
        }

        session()->flash('success', $message);
        $this->closeForm();
    }

    public function delete(int $id): void
    {
        $config = QuoteConfig::findOrFail($id);
        $this->authorize('delete', $config);
        $wasDefault = $config->is_default;
        $config->delete();

        if ($wasDefault) {
            QuoteConfig::query()->orderBy('name')->first()?->setAsDefault();
        }

        session()->flash('success', __('dashboard.config.deleted'));
    }

    public function setDefault(int $id): void
    {
        $config = QuoteConfig::findOrFail($id);
        $this->authorize('update', $config);
        $config->update(['is_active' => true]);
        $config->setAsDefault();
        session()->flash('success', __('dashboard.config.default_set'));
    }

    public function render(): View
    {
        $query = QuoteConfig::query();

        if ($this->search !== '') {
            $term = '%'.$this->search.'%';
            $query->where(function ($builder) use ($term) {
                $builder->where('name', 'like', $term)
                    ->orWhere('description', 'like', $term);
            });
        }

        return view('livewire.dashboard.quote-configs-manager', [
            'configs' => $query->orderByDesc('is_default')->orderBy('name')->paginate(12),
        ]);
    }

    private function resetForm(): void
    {
        $defaults = QuoteConfig::default();

        $this->editingId = null;
        $this->name = '';
        $this->description = config('invoice.default_description');
        $this->unit_price = '0';
        $this->currency = 'MAD';
        $this->vat_rate = (string) config('invoice.default_vat_rate', 10);
        $this->eur_to_mad = (string) ($defaults?->eur_to_mad ?? 10.8500);
        $this->usd_to_mad = (string) ($defaults?->usd_to_mad ?? 9.9500);
        $this->is_active = true;
        $this->is_default = QuoteConfig::query()->doesntExist();
    }
}
