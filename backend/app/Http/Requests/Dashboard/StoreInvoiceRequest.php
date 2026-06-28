<?php

namespace App\Http\Requests\Dashboard;

use App\Models\QuoteCurrency;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        return [
            'type' => ['required', 'in:invoice,quote'],
            'client_name' => ['required', 'string', 'max:190'],
            'client_email' => ['nullable', 'email', 'max:190'],
            'client_phone' => ['nullable', 'string', 'max:64'],
            'client_address' => ['nullable', 'string', 'max:500'],
            'client_address_line2' => ['nullable', 'string', 'max:500'],
            'client_ice' => ['nullable', 'string', 'max:64'],
            'issued_at' => ['required', 'date'],
            'trip_date' => ['nullable', 'date'],
            'trip_time' => ['nullable', 'date_format:H:i'],
            'pickup' => ['nullable', 'string', 'max:500'],
            'dropoff' => ['nullable', 'string', 'max:500'],
            'passengers' => ['nullable', 'integer', 'min:1'],
            'children' => ['nullable', 'integer', 'min:0'],
            'baggage' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'quantity' => ['required', 'integer', 'min:1'],
            'unit_price' => ['required', 'numeric', 'min:0'],
            'vat_rate' => ['required', 'numeric', 'min:0', 'max:100'],
            'currency' => ['required', 'string', Rule::in(QuoteCurrency::codes())],
            'reservation_id' => ['nullable', 'integer', 'exists:reservations,id'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $emptyToNull = [
            'client_email', 'client_phone', 'client_address', 'client_ice',
            'pickup', 'dropoff', 'baggage', 'description', 'trip_date', 'trip_time',
        ];

        $merge = [];
        foreach ($emptyToNull as $field) {
            if ($this->input($field) === '') {
                $merge[$field] = null;
            }
        }

        $this->merge($merge);
    }
}
