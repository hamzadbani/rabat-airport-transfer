<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DispatchSetting;
use Illuminate\Http\JsonResponse;

class DispatchSettingController extends Controller
{
    public function show(): JsonResponse
    {
        $settings = DispatchSetting::firstOrCreate(
            ['id' => 1],
            ['reservation_reminder_minutes' => 60]
        );

        return response()->json([
            'reservationReminderMinutes' => (int) $settings->reservation_reminder_minutes,
        ]);
    }
}
