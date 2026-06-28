<x-mail::message>
# {{ __('mail.reservation_reminder.heading') }}

{{ __('mail.reservation_reminder.intro', ['minutes' => $minutesBefore]) }}

<x-mail::panel>
**{{ __('mail.reservation_reminder.client') }}:** {{ $reservation->client_name }}

**{{ __('mail.reservation_reminder.phone') }}:** {{ $reservation->phone }}

**{{ __('mail.reservation_reminder.pickup') }}:** {{ $reservation->pickup_location }}

**{{ __('mail.reservation_reminder.dropoff') }}:** {{ $reservation->dropoff_location }}

**{{ __('mail.reservation_reminder.datetime') }}:** {{ $reservation->date?->format('d/m/Y H:i') }}

@if ($reservation->flight_number)
**{{ __('mail.reservation_reminder.flight') }}:** {{ $reservation->flight_number }}
@endif

**{{ __('mail.reservation_reminder.passengers') }}:** {{ $reservation->passengers }}

@if ($reservation->driver?->name)
**{{ __('mail.reservation_reminder.driver') }}:** {{ $reservation->driver->name }}
@endif

@if ($reservation->notes)
**{{ __('mail.reservation_reminder.notes') }}:** {{ $reservation->notes }}
@endif
</x-mail::panel>

<x-mail::button :url="route('dashboard.reservations')">
{{ __('mail.reservation_reminder.open_dashboard') }}
</x-mail::button>

{{ __('mail.reservation_reminder.footer') }}

{{ config('site.name') }}
</x-mail::message>
