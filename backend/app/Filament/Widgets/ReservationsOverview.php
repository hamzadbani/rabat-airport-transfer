<?php

namespace App\Filament\Widgets;

use App\Models\Driver;
use App\Models\Reservation;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ReservationsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $active = Reservation::query()
            ->where('date', '>=', now()->startOfDay())
            ->where('status', '!=', 'cancelled');

        return [
            Stat::make('Réservations actives', (clone $active)->count())
                ->description('À venir')
                ->color('warning'),
            Stat::make('Confirmées', Reservation::where('status', 'confirmed')->where('date', '>=', now())->count())
                ->color('success'),
            Stat::make('Chauffeurs', Driver::count())
                ->color('primary'),
            Stat::make('CA indicatif (MAD)', number_format((clone $active)->sum('price'), 0, ',', ' '))
                ->description('Réservations actives'),
        ];
    }
}
