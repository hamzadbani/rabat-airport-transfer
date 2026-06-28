<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\View\View;

class QuoteConfigController extends Controller
{
    public function index(): View
    {
        return view('dashboard.config-devis.index');
    }
}
