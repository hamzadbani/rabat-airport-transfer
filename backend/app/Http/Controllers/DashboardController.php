<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Reservation;
use App\Support\ReservationFilters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(Request $request): View
    {
        $filters = ReservationFilters::fromRequest($request);
        $baseQuery = ReservationFilters::apply(Reservation::query(), $filters);

        $statusCounts = (clone $baseQuery)
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        $dailyCounts = [];
        for ($i = 41; $i >= 0; $i--) {
            $day = now()->subDays($i)->toDateString();
            $dailyCounts[$day] = (clone $baseQuery)->whereDate('date', $day)->count();
        }

        $unassignedCount = (clone $baseQuery)->whereNull('driver_id')->count();

        $topDriverRows = (clone $baseQuery)
            ->whereNotNull('driver_id')
            ->select('driver_id', DB::raw('count(*) as total'))
            ->groupBy('driver_id')
            ->orderByDesc('total')
            ->limit(4)
            ->get();

        $driverNames = Driver::query()
            ->whereIn('id', $topDriverRows->pluck('driver_id'))
            ->pluck('name', 'id');

        $topDrivers = $topDriverRows->map(fn ($row) => [
            'name' => $driverNames[$row->driver_id] ?? __('dashboard.common.unknown'),
            'total' => (int) $row->total,
        ]);

        if ($unassignedCount > 0) {
            $topDrivers = $topDrivers->push([
                'name' => __('dashboard.reservations.unassigned'),
                'total' => $unassignedCount,
            ])->sortByDesc('total')->take(5)->values();
        }

        $calendarEvents = (clone $baseQuery)
            ->with('driver:id,name')
            ->orderBy('date')
            ->get()
            ->map(fn (Reservation $r) => [
                'id' => $r->id,
                'title' => $r->client_name,
                'start' => $r->date?->toIso8601String(),
                'end' => $r->end_at?->toIso8601String(),
                'backgroundColor' => match ($r->status) {
                    'confirmed' => '#16a34a',
                    'cancelled' => '#dc2626',
                    default => '#f59e0b',
                },
                'borderColor' => 'transparent',
                'extendedProps' => [
                    'status' => $r->status,
                    'driver' => $r->driver?->name,
                    'route' => $r->pickup_location.' → '.$r->dropoff_location,
                ],
            ])
            ->values();

        $anchorDate = ! empty($filters['date'])
            ? \Carbon\Carbon::parse($filters['date'])
            : now();

        return view('dashboard.index', [
            'totalReservations' => (clone $baseQuery)->count(),
            'driverCount' => Driver::query()->count(),
            'todayCount' => (clone $baseQuery)->whereDate('date', now()->toDateString())->count(),
            'statusCounts' => $statusCounts,
            'dailyCounts' => $dailyCounts,
            'topDrivers' => $topDrivers,
            'calendarEvents' => $calendarEvents,
            'weekStart' => $anchorDate->copy()->locale(app()->getLocale())->startOfWeek(),
            'weekEnd' => $anchorDate->copy()->locale(app()->getLocale())->endOfWeek(),
            'calendarDate' => $anchorDate->toDateString(),
        ]);
    }
}
