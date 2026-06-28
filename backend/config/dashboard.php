<?php

return [
  'navigation' => [
        [
            'route' => 'dashboard.index',
            'label' => 'dashboard.nav.dashboard',
            'icon' => 'home',
            'match' => 'dashboard.index',
        ],
        [
            'route' => 'dashboard.reservations',
            'label' => 'dashboard.nav.reservations',
            'icon' => 'calendar',
            'match' => 'dashboard.reservations',
        ],
        [
            'route' => 'dashboard.bookings',
            'label' => 'dashboard.nav.bookings',
            'icon' => 'building',
            'match' => 'dashboard.bookings',
        ],
        [
            'route' => 'dashboard.drivers',
            'label' => 'dashboard.nav.drivers',
            'icon' => 'users',
            'match' => 'dashboard.drivers',
        ],
        [
            'route' => 'dashboard.invoices.create',
            'label' => 'dashboard.nav.invoices',
            'icon' => 'document',
            'match' => 'dashboard.invoices.*',
        ],
        [
            'route' => 'dashboard.config.index',
            'label' => 'dashboard.nav.quote_config',
            'icon' => 'cog',
            'match' => 'dashboard.config.*',
        ],
        [
            'route' => 'dashboard.organizations',
            'label' => 'dashboard.nav.organizations',
            'icon' => 'office',
            'match' => 'dashboard.organizations',
        ],
        [
            'route' => 'dashboard.pricing',
            'label' => 'dashboard.nav.pricing',
            'icon' => 'map',
            'match' => 'dashboard.pricing',
        ],
        [
            'route' => 'dashboard.profile.edit',
            'label' => 'dashboard.nav.profile',
            'icon' => 'user',
            'match' => 'dashboard.profile.*',
        ],
    ],
];
