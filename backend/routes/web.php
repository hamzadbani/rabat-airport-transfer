<?php

use App\Http\Controllers\Auth\DashboardAuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\Dashboard\BookingController as DashboardBookingController;
use App\Http\Controllers\Dashboard\DriverController as DashboardDriverController;
use App\Http\Controllers\Dashboard\InvoiceController;
use App\Http\Controllers\Dashboard\OrganizationController;
use App\Http\Controllers\Dashboard\PricingZoneController;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Http\Controllers\Dashboard\QuoteConfigController;
use App\Http\Controllers\Dashboard\ReservationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DashboardLocaleController;
use App\Http\Controllers\HubPageController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\RobotsController;
use App\Http\Controllers\SeoPageController;
use App\Http\Controllers\SitemapController;
use App\Support\SeoData;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/login', [DashboardAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [DashboardAuthController::class, 'login']);
    Route::redirect('/admin/login', '/login');
});

Route::redirect('/admin', '/dashboard')->middleware(['auth', 'admin']);

Route::post('/logout', [DashboardAuthController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');

Route::middleware(['auth', 'admin', 'dashboard.locale', 'dashboard.noindex'])
    ->prefix('dashboard')
    ->name('dashboard.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('index');
        Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations');
        Route::get('/bookings', [DashboardBookingController::class, 'index'])->name('bookings');
        Route::get('/drivers', [DashboardDriverController::class, 'index'])->name('drivers');
        Route::get('/facture', [InvoiceController::class, 'create'])->name('invoices.create');
        Route::post('/facture', [InvoiceController::class, 'store'])->name('invoices.store');
        Route::get('/facture/{invoice}/print', [InvoiceController::class, 'print'])->name('invoices.print');
        Route::get('/config-devis', [QuoteConfigController::class, 'index'])->name('config.index');
        Route::get('/organizations', [OrganizationController::class, 'index'])->name('organizations');
        Route::get('/pricing', [PricingZoneController::class, 'index'])->name('pricing');
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::get('/locale/{locale}', [DashboardLocaleController::class, 'switch'])
            ->whereIn('locale', ['fr', 'en'])
            ->name('locale.switch');
    });

Route::get('/', LandingController::class)->name('home');
Route::post('/book', [BookingController::class, 'store'])->name('book.store');

Route::get('/locale/{locale}', [LocaleController::class, 'switch'])
    ->whereIn('locale', ['fr', 'en', 'ar'])
    ->name('locale.switch');
Route::get('/en', fn () => redirect()->route('locale.switch', ['locale' => 'en']));
Route::get('/ar', fn () => redirect()->route('locale.switch', ['locale' => 'ar']));

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/guides', [HubPageController::class, 'guides'])->name('guides');
Route::get('/airport-guides', [HubPageController::class, 'airportGuides'])->name('airport-guides');
Route::get('/travel-tips', [HubPageController::class, 'travelTips'])->name('travel-tips');

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
Route::get('/robots.txt', RobotsController::class)->name('robots');

Route::get('/{slug}', [SeoPageController::class, 'show'])
    ->whereIn('slug', SeoData::slugs());
