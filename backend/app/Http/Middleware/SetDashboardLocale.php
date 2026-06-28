<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetDashboardLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $locale = session('dashboard_locale', 'fr');

        if ($request->has('lang') && in_array($request->query('lang'), ['fr', 'en'], true)) {
            $locale = $request->query('lang');
            session(['dashboard_locale' => $locale]);
        }

        app()->setLocale($locale);

        return $next($request);
    }
}
