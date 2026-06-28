<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index(): JsonResponse
    {
        $reservations = Reservation::with(['driver', 'organization'])
            ->orderBy('date')
            ->get()
            ->map(fn (Reservation $r) => $this->format($r));

        return response()->json($reservations);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $this->validatePayload($request);
        $reservation = Reservation::create($validated);
        $reservation->load(['driver', 'organization']);

        return response()->json($this->format($reservation), 201);
    }

    public function update(Request $request, Reservation $reservation): JsonResponse
    {
        $validated = $this->validatePayload($request, partial: true);
        $reservation->update($validated);
        $reservation->load(['driver', 'organization']);

        return response()->json($this->format($reservation->fresh(['driver', 'organization'])));
    }

    public function destroy(Reservation $reservation): JsonResponse
    {
        $reservation->delete();

        return response()->json(null, 204);
    }

    /** @return array<string, mixed> */
    private function validatePayload(Request $request, bool $partial = false): array
    {
        $rules = [
            'clientName' => [$partial ? 'sometimes' : 'required', 'string', 'max:190'],
            'phone' => [$partial ? 'sometimes' : 'required', 'string', 'max:64'],
            'pickupLocation' => [$partial ? 'sometimes' : 'required', 'string', 'max:500'],
            'dropoffLocation' => [$partial ? 'sometimes' : 'required', 'string', 'max:500'],
            'flightNumber' => ['nullable', 'string', 'max:32'],
            'date' => [$partial ? 'sometimes' : 'required', 'date'],
            'end' => ['nullable', 'date'],
            'status' => ['sometimes', 'in:planned,confirmed,cancelled'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'passengers' => ['sometimes', 'integer', 'min:1'],
            'childrenCount' => ['sometimes', 'integer', 'min:0'],
            'baggage' => ['nullable', 'string', 'max:255'],
            'driverName' => ['nullable', 'string', 'max:190'],
            'driverId' => ['nullable', 'integer', 'exists:drivers,id'],
            'organizationId' => ['nullable', 'integer', 'exists:organizations,id'],
            'type' => ['sometimes', 'in:byAdmin,site web'],
        ];

        $validated = $request->validate($rules);

        $map = [
            'clientName' => 'client_name',
            'phone' => 'phone',
            'pickupLocation' => 'pickup_location',
            'dropoffLocation' => 'dropoff_location',
            'flightNumber' => 'flight_number',
            'date' => 'date',
            'end' => 'end_at',
            'status' => 'status',
            'price' => 'price',
            'passengers' => 'passengers',
            'childrenCount' => 'children_count',
            'baggage' => 'baggage',
            'driverName' => 'driver_name',
            'driverId' => 'driver_id',
            'organizationId' => 'organization_id',
            'type' => 'type',
        ];

        $payload = [];
        foreach ($map as $camel => $snake) {
            if (array_key_exists($camel, $validated)) {
                $payload[$snake] = $validated[$camel];
            }
        }

        if (! $partial) {
            $payload += [
                'flight_number' => $payload['flight_number'] ?? '',
                'status' => $payload['status'] ?? 'planned',
                'price' => $payload['price'] ?? 0,
                'passengers' => $payload['passengers'] ?? 1,
                'children_count' => $payload['children_count'] ?? 0,
                'baggage' => $payload['baggage'] ?? '',
                'driver_name' => $payload['driver_name'] ?? 'Non assigné',
                'type' => $payload['type'] ?? 'byAdmin',
            ];
        }

        return $payload;
    }

    /** @return array<string, mixed> */
    private function format(Reservation $r): array
    {
        return [
            'id' => $r->id,
            'clientName' => $r->client_name,
            'phone' => $r->phone,
            'pickupLocation' => $r->pickup_location,
            'dropoffLocation' => $r->dropoff_location,
            'flightNumber' => $r->flight_number,
            'date' => $r->date?->toIso8601String(),
            'end' => $r->end_at?->toIso8601String(),
            'status' => $r->status,
            'price' => (float) $r->price,
            'passengers' => (int) $r->passengers,
            'childrenCount' => (int) $r->children_count,
            'baggage' => $r->baggage,
            'driverName' => $r->driver_name,
            'driver' => $r->driver
                ? [
                    'id' => $r->driver->id,
                    'name' => $r->driver->name,
                    'phone' => $r->driver->phone,
                ]
                : null,
            'organization' => $r->organization
                ? [
                    'id' => $r->organization->id,
                    'name' => $r->organization->name,
                ]
                : null,
            'type' => $r->type,
        ];
    }
}
