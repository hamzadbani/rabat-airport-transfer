<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\Reservation;
use App\Support\ReservationFilters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class ReservationController extends Controller
{
    public function index(Request $request): View
    {
        return view('dashboard.reservations.index', [
            'filters' => ReservationFilters::fromRequest($request),
        ]);
    }
}
