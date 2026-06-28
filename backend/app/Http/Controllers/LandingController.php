<?php

namespace App\Http\Controllers;

use App\Models\TaxiRoutePrice;
use Illuminate\View\View;

class LandingController extends Controller
{
    public function __invoke(): View
    {
        $popularRoutes = collect();

        try {
            $popularRoutes = TaxiRoutePrice::with(['fromZone', 'toZone'])
                ->where('is_active', true)
                ->orderBy('daytime_price')
                ->limit(6)
                ->get();
        } catch (\Throwable) {
            // DB unavailable — static fallbacks in view
        }

        return view('landing.home', [
            'popularRoutes' => $popularRoutes,
            'faq' => trans('landing.faq.items'),
        ]);
    }
}
