<?php

namespace App\Support;

use App\Mail\NewReservationMail;
use App\Models\Reservation;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ReservationNotifier
{
    public static function notifyCreated(Reservation $reservation): void
    {
        $recipients = DispatchMailRecipients::emails();

        if ($recipients === []) {
            return;
        }

        $reservation->loadMissing(['driver:id,name', 'organization:id,name']);

        app()->setLocale(config('app.locale', 'fr'));

        try {
            Mail::to($recipients)->send(new NewReservationMail($reservation));
        } catch (\Throwable $exception) {
            Log::error('Failed to send new reservation email.', [
                'reservation_id' => $reservation->id,
                'message' => $exception->getMessage(),
            ]);
        }
    }
}
