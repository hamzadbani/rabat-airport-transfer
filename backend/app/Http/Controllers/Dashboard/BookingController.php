<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Support\ReservationFilters;
use Illuminate\Http\Request;
use Illuminate\View\View;

class BookingController extends Controller
{
    public function index(Request $request): View
    {
        return view('dashboard.bookings.index', [
            'filters' => ReservationFilters::fromRequest($request),
        ]);
    }
}
