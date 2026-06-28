<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class StorePricingZoneRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:190'],
            'city' => ['required', 'string', 'max:190'],
            'region' => ['nullable', 'string', 'max:190'],
            'is_airport' => ['boolean'],
            'radius_km' => ['required', 'numeric', 'min:0'],
            'day_price' => ['required', 'numeric', 'min:0'],
            'night_price' => ['required', 'numeric', 'min:0'],
            'currency' => ['required', 'in:MAD,EUR,USD'],
            'is_active' => ['boolean'],
            'lat' => ['nullable', 'numeric'],
            'lng' => ['nullable', 'numeric'],
        ];
    }
}
