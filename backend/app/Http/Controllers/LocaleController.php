<?php

namespace App\Http\Controllers;

use App\Http\Middleware\SetPublicLocale;
use Illuminate\Http\RedirectResponse;

class LocaleController extends Controller
{
    public function switch(string $locale): RedirectResponse
    {
        abort_unless(in_array($locale, SetPublicLocale::LOCALES, true), 404);

        session(['locale' => $locale]);

        return redirect()->back(fallback: route('home'));
    }
}
