<?php

namespace Database\Seeders;

use App\Models\DispatchSetting;
use App\Models\Driver;
use App\Models\Invoice;
use App\Models\Organization;
use App\Models\PricingZone;
use App\Models\QuoteConfig;
use App\Models\Reservation;
use App\Models\TaxiRoutePrice;
use App\Models\TaxiZone;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->delete();

        User::create([
            'name' => 'Admin Taxi Rabat',
            'email' => 'admin@taxirabatairport.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        DispatchSetting::query()->updateOrCreate(
            ['id' => 1],
            [
                'reservation_reminder_minutes' => 60,
                'eur_to_mad' => 10.8500,
                'usd_to_mad' => 9.9500,
            ],
        );

        $standardQuote = QuoteConfig::query()->updateOrCreate(
            ['name' => 'Transfert aéroport standard'],
            [
                'description' => 'Service de transport touristique',
                'unit_price' => 350,
                'currency' => 'MAD',
                'vat_rate' => 10,
                'eur_to_mad' => 10.8500,
                'usd_to_mad' => 9.9500,
                'is_active' => true,
                'is_default' => true,
            ],
        );

        QuoteConfig::query()->updateOrCreate(
            ['name' => 'Devis partenaire EUR'],
            [
                'description' => 'Transfert partenaire — facturation en euros',
                'unit_price' => 45,
                'currency' => 'EUR',
                'vat_rate' => 10,
                'eur_to_mad' => 10.8500,
                'usd_to_mad' => 9.9500,
                'is_active' => true,
                'is_default' => false,
            ],
        );

        $standardQuote->setAsDefault();

        Organization::query()->updateOrCreate(
            ['name' => config('site.default_organization_name', config('site.name'))],
            [
                'notes' => 'Organisation interne par défaut',
                'phone' => config('site.phone_display'),
            ],
        );

        $drivers = collect([
            ['name' => 'Hassan Amrani', 'phone' => '+212 6 10 20 30 40', 'vehicle' => 'Mercedes E-Class · 48-A-901', 'rating' => 4.92, 'notes' => 'Aéroport RBA · matin'],
            ['name' => 'Karim El Idrissi', 'phone' => '+212 6 20 30 40 50', 'vehicle' => 'Toyota Corolla · 12-R-772', 'rating' => 4.85, 'notes' => 'Rabat centre · longue distance'],
            ['name' => 'Youssef Bennani', 'phone' => '+212 6 30 40 50 60', 'vehicle' => 'Skoda Octavia · 55-B-204', 'rating' => 4.88, 'notes' => 'Salé · transferts hôtel'],
        ])->map(fn (array $d) => Driver::create($d));

        Organization::create([
            'name' => 'Hôtel La Tour Hassan',
            'notes' => 'Partenaire hôtel 5* Rabat',
            'phone' => '+212 537 68 62 00',
        ]);

        Organization::create([
            'name' => 'Royal Air Maroc Crew',
            'notes' => 'Transferts équipage',
            'phone' => '+212 537 90 90 90',
        ]);

        $rba = TaxiZone::create([
            'name' => 'Aéroport Rabat–Salé (RBA)',
            'slug' => 'rabat-airport-sale',
            'city' => 'Salé',
            'region' => 'Rabat-Salé-Kénitra',
            'is_airport' => true,
            'latitude' => 34.0515,
            'longitude' => -6.7515,
            'seo_name' => 'Taxi aéroport Rabat-Salé RBA',
            'sort_order' => 1,
        ]);

        $rabat = TaxiZone::create([
            'name' => 'Rabat centre',
            'slug' => 'rabat',
            'city' => 'Rabat',
            'region' => 'Rabat-Salé-Kénitra',
            'latitude' => 34.0209,
            'longitude' => -6.8416,
            'seo_name' => 'Taxi Rabat',
            'sort_order' => 2,
        ]);

        $sale = TaxiZone::create([
            'name' => 'Salé',
            'slug' => 'sale',
            'city' => 'Salé',
            'region' => 'Rabat-Salé-Kénitra',
            'latitude' => 34.0331,
            'longitude' => -6.7981,
            'seo_name' => 'Taxi Salé',
            'sort_order' => 3,
        ]);

        $temara = TaxiZone::create([
            'name' => 'Témara',
            'slug' => 'temara',
            'city' => 'Témara',
            'region' => 'Rabat-Salé-Kénitra',
            'latitude' => 33.9287,
            'longitude' => -6.9066,
            'seo_name' => 'Taxi Témara',
            'sort_order' => 4,
        ]);

        $cmn = TaxiZone::create([
            'name' => 'Aéroport Mohammed V (CMN)',
            'slug' => 'casablanca-airport-cmn',
            'city' => 'Nouaceur',
            'region' => 'Casablanca-Settat',
            'is_airport' => true,
            'latitude' => 33.3675,
            'longitude' => -7.5898,
            'seo_name' => 'Taxi aéroport Casablanca CMN',
            'sort_order' => 5,
        ]);

        $casablanca = TaxiZone::create([
            'name' => 'Casablanca',
            'slug' => 'casablanca',
            'city' => 'Casablanca',
            'region' => 'Casablanca-Settat',
            'latitude' => 33.5731,
            'longitude' => -7.5898,
            'seo_name' => 'Transfert taxi Casablanca',
            'sort_order' => 6,
        ]);

        $routes = [
            [$rba->id, $rabat->id, 120, 140, 220, 160, 20, 12],
            [$rba->id, $sale->id, 100, 120, 190, 140, 18, 10],
            [$rba->id, $temara->id, 150, 170, 280, 200, 25, 18],
            [$rabat->id, $cmn->id, 750, 800, 1400, 900, 75, 95],
            [$rabat->id, $casablanca->id, 700, 750, 1300, 850, 70, 90],
            [$cmn->id, $rabat->id, 750, 800, 1400, 900, 85, 110],
        ];

        foreach ($routes as [$from, $to, $day, $night, $ret, $vip, $mins, $km]) {
            TaxiRoutePrice::create([
                'from_zone_id' => $from,
                'to_zone_id' => $to,
                'vehicle_type' => 'standard',
                'daytime_price' => $day,
                'nighttime_price' => $night,
                'return_price' => $ret,
                'vip_price' => $vip,
                'extra_luggage_price' => 15,
                'child_seat_price' => 50,
                'estimated_duration_minutes' => $mins,
                'estimated_distance_km' => $km,
            ]);
        }

        PricingZone::create([
            'name' => 'Aéroport Rabat–Salé (RBA)',
            'city' => 'Salé',
            'region' => 'Rabat-Salé-Kénitra',
            'is_airport' => true,
            'radius_km' => 5,
            'day_price' => 120,
            'night_price' => 140,
            'currency' => 'MAD',
            'is_active' => true,
            'lat' => 34.0515,
            'lng' => -6.7515,
        ]);

        PricingZone::create([
            'name' => 'Rabat centre',
            'city' => 'Rabat',
            'region' => 'Rabat-Salé-Kénitra',
            'is_airport' => false,
            'radius_km' => 8,
            'day_price' => 80,
            'night_price' => 95,
            'currency' => 'MAD',
            'is_active' => true,
            'lat' => 34.0209,
            'lng' => -6.8416,
        ]);

        PricingZone::create([
            'name' => 'Salé',
            'city' => 'Salé',
            'region' => 'Rabat-Salé-Kénitra',
            'is_airport' => false,
            'radius_km' => 6,
            'day_price' => 70,
            'night_price' => 85,
            'currency' => 'MAD',
            'is_active' => true,
            'lat' => 34.0331,
            'lng' => -6.7981,
        ]);

        $hotelOrg = Organization::query()->where('name', 'Hôtel La Tour Hassan')->first();
        $hassan = $drivers[0];
        $karim = $drivers[1];

        $sophie = Reservation::create([
            'client_name' => 'Sophie Martin',
            'phone' => '+33 6 12 34 56 78',
            'pickup_location' => 'Aéroport Rabat-Salé (RBA) — Arrivées',
            'dropoff_location' => 'Hôtel La Tour Hassan, Rabat',
            'flight_number' => 'AT721',
            'date' => now()->addDay()->setTime(14, 30),
            'end_at' => now()->addDay()->setTime(15, 15),
            'status' => 'confirmed',
            'price' => 120,
            'currency' => 'MAD',
            'passengers' => 2,
            'baggage' => '2 valises',
            'notes' => 'Client VIP — accueil avec pancarte',
            'driver_name' => $hassan->name,
            'driver_id' => $hassan->id,
            'organization_id' => $hotelOrg?->id,
            'trip_mode' => 'one_way',
            'source' => 'website',
            'type' => 'site web',
        ]);

        Reservation::create([
            'client_name' => 'Ahmed Benjelloun',
            'phone' => '+212 6 55 44 33 22',
            'pickup_location' => 'Hay Riad, Rabat',
            'dropoff_location' => 'Aéroport Rabat-Salé (RBA)',
            'flight_number' => 'AT450',
            'date' => now()->addDays(2)->setTime(6, 0),
            'end_at' => now()->addDays(2)->setTime(6, 45),
            'status' => 'planned',
            'price' => 120,
            'currency' => 'MAD',
            'passengers' => 1,
            'driver_name' => 'Non assigné',
            'trip_mode' => 'one_way',
            'source' => 'phone',
            'type' => 'site web',
        ]);

        Reservation::create([
            'client_name' => 'Claire Dubois',
            'phone' => '+33 6 11 22 33 44',
            'pickup_location' => 'Agdal, Rabat',
            'dropoff_location' => 'Aéroport Mohammed V, Casablanca',
            'date' => now()->addDays(3)->setTime(8, 0),
            'end_at' => now()->addDays(3)->setTime(9, 30),
            'status' => 'planned',
            'price' => 750,
            'currency' => 'MAD',
            'passengers' => 3,
            'children_count' => 1,
            'baggage' => '3 valises + poussette',
            'driver_name' => $karim->name,
            'driver_id' => $karim->id,
            'trip_mode' => 'round_trip',
            'source' => 'google_ads',
            'type' => 'byAdmin',
        ]);

        Reservation::create([
            'client_name' => 'Mohamed Tazi',
            'phone' => '+212 6 98 76 54 32',
            'pickup_location' => 'Salé — Bab Lamrissa',
            'dropoff_location' => 'Témara Plage',
            'date' => now()->subDay()->setTime(17, 0),
            'end_at' => now()->subDay()->setTime(17, 45),
            'status' => 'cancelled',
            'price' => 150,
            'currency' => 'MAD',
            'passengers' => 2,
            'driver_name' => 'Non assigné',
            'is_archived' => true,
            'trip_mode' => 'one_way',
            'source' => 'whatsapp',
            'type' => 'site web',
        ]);

        Reservation::create([
            'client_name' => 'Fatima Zahra',
            'phone' => '+212 6 77 88 99 00',
            'pickup_location' => 'Aéroport Rabat-Salé (RBA)',
            'dropoff_location' => 'Université Mohammed V, Agdal',
            'flight_number' => 'FR8821',
            'date' => now()->addDays(5)->setTime(22, 15),
            'end_at' => now()->addDays(5)->setTime(23, 0),
            'status' => 'confirmed',
            'price' => 140,
            'currency' => 'MAD',
            'passengers' => 1,
            'driver_name' => $hassan->name,
            'driver_id' => $hassan->id,
            'trip_mode' => 'one_way',
            'source' => 'website',
            'type' => 'site web',
        ]);

        Invoice::create([
            'type' => 'invoice',
            'document_number' => 'FAC-'.now()->format('Ymd-Hi'),
            'reservation_id' => $sophie->id,
            'client_name' => $sophie->client_name,
            'client_email' => 'sophie.martin@example.com',
            'client_phone' => $sophie->client_phone,
            'client_address' => '12 rue de Rivoli, Paris',
            'trip_date' => $sophie->trip_date,
            'trip_time' => $sophie->trip_time,
            'pickup' => $sophie->pickup_address,
            'dropoff' => $sophie->dropoff_address,
            'passengers' => $sophie->passengers,
            'baggage' => $sophie->baggage,
            'description' => 'Transfert aéroport Rabat-Salé → Hôtel La Tour Hassan',
            'quantity' => 1,
            'unit_price' => 120,
            'vat_rate' => 20,
            'currency' => 'MAD',
            'issued_at' => now(),
        ]);
    }
}
