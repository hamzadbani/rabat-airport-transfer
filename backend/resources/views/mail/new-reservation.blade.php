<x-mail::message>
# {{ __('mail.new_reservation.heading') }}

{{ __('mail.new_reservation.intro') }}

<x-mail::panel>
**{{ __('mail.new_reservation.client') }}:** {{ $reservation->client_name }}

**{{ __('mail.new_reservation.phone') }}:** {{ $reservation->phone }}

**{{ __('mail.new_reservation.pickup') }}:** {{ $reservation->pickup_location }}

**{{ __('mail.new_reservation.dropoff') }}:** {{ $reservation->dropoff_location }}

**{{ __('mail.new_reservation.datetime') }}:** {{ $reservation->date?->format('d/m/Y H:i') }}

@if ($reservation->flight_number)
**{{ __('mail.new_reservation.flight') }}:** {{ $reservation->flight_number }}
@endif

**{{ __('mail.new_reservation.passengers') }}:** {{ $reservation->passengers }}

**{{ __('mail.new_reservation.source') }}:** {{ $reservation->source ?? '—' }}

@if ($reservation->organization?->name)
**{{ __('mail.new_reservation.organization') }}:** {{ $reservation->organization->name }}
@endif

@if ($reservation->driver?->name)
**{{ __('mail.new_reservation.driver') }}:** {{ $reservation->driver->name }}
@endif

@if ($reservation->notes)
**{{ __('mail.new_reservation.notes') }}:** {{ $reservation->notes }}
@endif
</x-mail::panel>

<x-mail::button :url="route('dashboard.reservations')">
{{ __('mail.new_reservation.open_dashboard') }}
</x-mail::button>

{{ config('site.name') }}
</x-mail::message>
