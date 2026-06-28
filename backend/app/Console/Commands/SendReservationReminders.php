<?php

namespace App\Console\Commands;

use App\Mail\ReservationReminderMail;
use App\Models\DispatchSetting;
use App\Models\Reservation;
use App\Support\DispatchMailRecipients;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendReservationReminders extends Command
{
    protected $signature = 'reservations:send-reminders';

    protected $description = 'Send email reminders for upcoming reservations';

    public function handle(): int
    {
        app()->setLocale(config('app.locale', 'fr'));

        $minutes = (int) DispatchSetting::instance()->reservation_reminder_minutes;

        if ($minutes <= 0) {
            $this->info('Reservation reminders disabled (minutes = 0).');

            return self::SUCCESS;
        }

        $recipients = DispatchMailRecipients::emails();

        if ($recipients === []) {
            $this->warn('No reminder recipients configured.');

            return self::FAILURE;
        }

        $windowStart = now()->addMinutes($minutes);
        $windowEnd = now()->addMinutes($minutes + 10);

        $reservations = Reservation::query()
            ->with(['driver:id,name', 'organization:id,name'])
            ->whereNull('reminder_sent_at')
            ->where('is_archived', false)
            ->whereIn('status', ['planned', 'confirmed'])
            ->whereBetween('date', [$windowStart, $windowEnd])
            ->orderBy('date')
            ->get();

        if ($reservations->isEmpty()) {
            $this->info('No reservations due for a reminder in this window.');

            return self::SUCCESS;
        }

        $sent = 0;

        foreach ($reservations as $reservation) {
            Mail::to($recipients)->send(new ReservationReminderMail($reservation, $minutes));

            $reservation->forceFill(['reminder_sent_at' => now()])->save();
            $sent++;
        }

        $this->info("Sent {$sent} reservation reminder(s).");

        return self::SUCCESS;
    }
}
