<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        apiPrefix: 'api',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->redirectUsersTo(fn () => route('dashboard.index'));
        $middleware->statefulApi();
        $middleware->web(append: [
            \App\Http\Middleware\SetPublicLocale::class,
        ]);
        $middleware->alias([
            'admin' => \App\Http\Middleware\EnsureAdminUser::class,
            'dashboard.locale' => \App\Http\Middleware\SetDashboardLocale::class,
            'dashboard.noindex' => \App\Http\Middleware\PreventDashboardIndexing::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );
    })->create();
