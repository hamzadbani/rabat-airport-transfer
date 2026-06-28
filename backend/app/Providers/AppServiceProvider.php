<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        View::composer(['layouts.site', 'partials.*', 'landing.*', 'seo.*', 'locale.*', 'blog.*', 'pages.*'], function ($view): void {
            $locale = app()->getLocale();
            $view->with('currentLocale', $locale);
            $view->with('isRtl', $locale === 'ar');
        });
    }
}
