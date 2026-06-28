<?php

return [
    'legal_name' => env('INVOICE_LEGAL_NAME', 'TAXI RABAT AIRPORT'),
    'subtitle' => env('INVOICE_SUBTITLE', 'TRANSPORT TOURISTIQUE'),
    'address' => env('INVOICE_ADDRESS', 'Aéroport Rabat-Salé (RBA), Salé 11025'),
    'ice' => env('INVOICE_ICE', ''),
    'default_description' => 'Service de transport touristique',
    'default_vat_rate' => 10,
];
