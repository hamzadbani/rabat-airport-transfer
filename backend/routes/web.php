<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HubPageController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\RobotsController;
use App\Http\Controllers\SeoPageController;
use App\Http\Controllers\SitemapController;
use App\Support\SeoData;
use Illuminate\Support\Facades\Route;

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
