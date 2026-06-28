<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    public function rules(): array
    {
        return [
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
            'status' => ['required', 'in:planned,confirmed,cancelled'],
            'trip_mode' => ['required', 'in:one_way,round_trip'],
            'source' => ['required', 'in:website,google_ads,phone,whatsapp'],
        ];
    }
}
