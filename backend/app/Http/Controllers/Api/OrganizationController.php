<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    public function index(): JsonResponse
    {
        $items = Organization::orderBy('name')->get()->map(fn (Organization $o) => $this->format($o));

        return response()->json($items);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:190'],
            'notes' => ['nullable', 'string', 'max:500'],
            'phone' => ['nullable', 'string', 'max:32'],
        ]);

        $org = Organization::create([
            'name' => $validated['name'],
            'notes' => $validated['notes'] ?? '',
            'phone' => $validated['phone'] ?? '',
        ]);

        return response()->json($this->format($org), 201);
    }

    public function update(Request $request, Organization $organization): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:190'],
            'notes' => ['nullable', 'string', 'max:500'],
            'phone' => ['nullable', 'string', 'max:32'],
        ]);

        $organization->update($validated);

        return response()->json($this->format($organization->fresh()));
    }

    public function destroy(Organization $organization): JsonResponse
    {
        $organization->delete();

        return response()->json(null, 204);
    }

    /** @return array<string, mixed> */
    private function format(Organization $o): array
    {
        return [
            'id' => (string) $o->id,
            'name' => $o->name,
            'notes' => $o->notes,
            'phone' => $o->phone,
        ];
    }
}
