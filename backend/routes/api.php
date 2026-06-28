<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DispatchSettingController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\OrganizationController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\TaxiZoneController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/settings', [DispatchSettingController::class, 'show']);
    Route::apiResource('drivers', DriverController::class);
    Route::apiResource('organizations', OrganizationController::class);
    Route::apiResource('reservations', ReservationController::class);
    Route::get('/zones', [TaxiZoneController::class, 'index']);
    Route::get('/route-prices', [TaxiZoneController::class, 'prices']);
});
