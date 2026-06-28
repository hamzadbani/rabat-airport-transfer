<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetPublicLocale
{
    /** @var list<string> */
    public const LOCALES = ['fr', 'en', 'ar'];

    public function handle(Request $request, Closure $next): Response
    {
        if ($request->is('admin', 'admin/*', 'api', 'api/*', 'dashboard', 'dashboard/*', 'login')) {
            return $next($request);
        }

        $locale = session('locale', 'fr');

        if ($request->has('lang')) {
            $queryLocale = $request->string('lang')->toString();
            if (in_array($queryLocale, self::LOCALES, true)) {
                $locale = $queryLocale;
                session(['locale' => $locale]);
            }
        }

        if (! in_array($locale, self::LOCALES, true)) {
            $locale = 'fr';
        }

        app()->setLocale($locale);

        return $next($request);
    }
}
