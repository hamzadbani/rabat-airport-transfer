<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TaxiRoutePrice;
use App\Models\TaxiZone;
use Illuminate\Http\JsonResponse;

class TaxiZoneController extends Controller
{
    public function index(): JsonResponse
    {
        $zones = TaxiZone::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn (TaxiZone $z) => [
                'id' => $z->id,
                'name' => $z->name,
                'slug' => $z->slug,
                'city' => $z->city,
                'region' => $z->region,
                'isAirport' => $z->is_airport,
                'latitude' => $z->latitude !== null ? (float) $z->latitude : null,
                'longitude' => $z->longitude !== null ? (float) $z->longitude : null,
            ]);

        return response()->json($zones);
    }

    public function prices(): JsonResponse
    {
        $prices = TaxiRoutePrice::with(['fromZone', 'toZone'])
            ->where('is_active', true)
            ->get()
            ->map(fn (TaxiRoutePrice $p) => [
                'id' => $p->id,
                'fromZoneId' => $p->from_zone_id,
                'toZoneId' => $p->to_zone_id,
                'fromZoneName' => $p->fromZone?->name,
                'toZoneName' => $p->toZone?->name,
                'vehicleType' => $p->vehicle_type,
                'daytimePrice' => (float) $p->daytime_price,
                'nighttimePrice' => (float) $p->nighttime_price,
                'returnPrice' => (float) $p->return_price,
                'vipPrice' => (float) $p->vip_price,
                'currency' => $p->currency,
                'estimatedDurationMinutes' => $p->estimated_duration_minutes,
                'estimatedDistanceKm' => $p->estimated_distance_km !== null ? (float) $p->estimated_distance_km : null,
            ]);

        return response()->json($prices);
    }
}
