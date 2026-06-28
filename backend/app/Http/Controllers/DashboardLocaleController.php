<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DashboardLocaleController extends Controller
{
    public function switch(Request $request, string $locale): RedirectResponse
    {
        if (! in_array($locale, ['fr', 'en'], true)) {
            abort(404);
        }

        session(['dashboard_locale' => $locale]);

        return redirect()->back();
    }
}
