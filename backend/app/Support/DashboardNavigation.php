<?php

namespace App\Support;

class DashboardNavigation
{
    /** @return list<array{route: string, label: string, icon: string, match: string}> */
    public static function items(): array
    {
        return config('dashboard.navigation', []);
    }

    public static function titleForRoute(?string $routeName = null): string
    {
        $routeName ??= request()->route()?->getName();

        foreach (self::items() as $item) {
            if (request()->routeIs($item['match'])) {
                return __($item['label']);
            }
        }

        return config('site.name');
    }
}
