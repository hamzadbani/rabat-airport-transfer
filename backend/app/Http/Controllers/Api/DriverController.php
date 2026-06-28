<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    public function index(): JsonResponse
    {
        $drivers = Driver::orderBy('name')->get()->map(fn (Driver $d) => $this->format($d));

        return response()->json($drivers);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:190'],
            'phone' => ['required', 'string', 'max:64'],
            'vehicle' => ['nullable', 'string', 'max:190'],
            'rating' => ['nullable', 'numeric', 'min:0', 'max:5'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $driver = Driver::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'vehicle' => $validated['vehicle'] ?? '',
            'rating' => $validated['rating'] ?? 0,
            'notes' => $validated['notes'] ?? '',
        ]);

        return response()->json($this->format($driver), 201);
    }

    public function update(Request $request, Driver $driver): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:190'],
            'phone' => ['sometimes', 'string', 'max:64'],
            'vehicle' => ['nullable', 'string', 'max:190'],
            'rating' => ['nullable', 'numeric', 'min:0', 'max:5'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $driver->update($validated);

        return response()->json($this->format($driver->fresh()));
    }

    public function destroy(Driver $driver): JsonResponse
    {
        $driver->delete();

        return response()->json(null, 204);
    }

    /** @return array<string, mixed> */
    private function format(Driver $d): array
    {
        return [
            'id' => $d->id,
            'name' => $d->name,
            'phone' => $d->phone,
            'vehicle' => $d->vehicle,
            'rating' => (float) $d->rating,
            'notes' => $d->notes,
            'hasPhoto' => false,
        ];
    }
}
