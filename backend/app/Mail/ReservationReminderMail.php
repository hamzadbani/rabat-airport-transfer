<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservationReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Reservation $reservation,
        public int $minutesBefore,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __('mail.reservation_reminder.subject', [
                'client' => $this->reservation->client_name,
                'time' => $this->reservation->date?->format('d/m/Y H:i'),
            ]),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.reservation-reminder',
        );
    }
}
