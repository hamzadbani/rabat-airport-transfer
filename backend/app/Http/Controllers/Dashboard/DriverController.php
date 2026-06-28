<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\View\View;

class DriverController extends Controller
{
    public function index(): View
    {
        return view('dashboard.drivers.index');
    }
}
