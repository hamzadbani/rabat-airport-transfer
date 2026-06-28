<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class HubPageController extends Controller
{
    public function guides(): View
    {
        return $this->render('guides');
    }

    public function airportGuides(): View
    {
        return $this->render('airport-guides');
    }

    public function travelTips(): View
    {
        return $this->render('travel-tips');
    }

    private function render(string $hubKey): View
    {
        $hubs = [
            'guides' => [
                'title' => 'Guides taxi Rabat & transferts Maroc',
                'description' => 'Guides pratiques : aéroport RBA, prix, réservation WhatsApp et liaisons inter-villes.',
                'links' => [
                    ['href' => '/taxi-rabat-aeroport/', 'label' => 'Taxi Rabat aéroport'],
                    ['href' => '/taxi-rabat-prix/', 'label' => 'Prix taxi Rabat'],
                    ['href' => '/rabat-casablanca-taxi/', 'label' => 'Rabat ↔ Casablanca'],
                    ['href' => '/reserver-taxi-rabat/', 'label' => 'Réserver un taxi Rabat'],
                ],
            ],
            'airport-guides' => [
                'title' => 'Guides aéroport Rabat-Salé (RBA)',
                'description' => 'Transferts, tarifs et conseils pour l\'aéroport Rabat-Salé.',
                'links' => [
                    ['href' => '/taxi-rabat-aeroport/', 'label' => 'Taxi Rabat aéroport'],
                    ['href' => '/transfert-rabat-aeroport/', 'label' => 'Transfert Rabat aéroport'],
                    ['href' => '/navette-aeroport-rabat/', 'label' => 'Navette aéroport Rabat'],
                    ['href' => '/blog/taxi-rabat-airport-price-2026/', 'label' => 'Prix aéroport Rabat 2026'],
                ],
            ],
            'travel-tips' => [
                'title' => 'Conseils voyage — taxi Rabat & Maroc',
                'description' => 'Astuces pour réserver, éviter les mauvaises surprises et voyager sereinement.',
                'links' => [
                    ['href' => '/blog/best-way-rabat-airport-to-city/', 'label' => 'Aéroport → centre-ville'],
                    ['href' => '/blog/uber-vs-taxi-rabat/', 'label' => 'Uber vs taxi Rabat'],
                    ['href' => '/taxi-rabat-whatsapp/', 'label' => 'Réserver par WhatsApp'],
                    ['href' => '/taxi-rabat-24-7/', 'label' => 'Taxi Rabat 24/7'],
                ],
            ],
        ];

        return view('pages.hub', ['hub' => $hubs[$hubKey]]);
    }
}
