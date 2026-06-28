<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuoteConfigRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:190'],
            'description' => ['nullable', 'string'],
            'unit_price' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'in:MAD,EUR,USD'],
            'vat_rate' => ['required', 'numeric', 'min:0', 'max:100'],
            'eur_to_mad' => ['required', 'numeric', 'min:0.0001'],
            'usd_to_mad' => ['required', 'numeric', 'min:0.0001'],
            'is_active' => ['boolean'],
            'is_default' => ['boolean'],
        ];
    }
}
