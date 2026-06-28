@php
    $presets = $presets ?? __('site.booking.presets');
    $defaultFrom = $defaultFrom ?? __('site.booking.default_from');
@endphp
<div id="reserver" class="rounded-2xl border border-white/10 bg-white p-5 text-slate-900 shadow-2xl sm:p-6">
    <h2 class="text-lg font-semibold text-slate-900">{{ __('site.booking.title') }}</h2>
    <p class="mt-1 text-sm text-slate-500">{{ __('site.booking.subtitle') }}</p>

    <div class="mt-4 flex flex-wrap gap-2">
        @foreach ($presets as $preset)
            <button type="button"
                class="preset-route rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:border-brand hover:bg-amber-50"
                data-from="{{ $preset['from'] }}"
                data-to="{{ $preset['to'] }}">
                {{ Str::limit($preset['from'], 18) }} → {{ Str::limit($preset['to'], 18) }}
            </button>
        @endforeach
    </div>

    <form action="{{ route('book.store') }}" method="POST" class="mt-5 space-y-4" id="booking-form">
        @csrf
        <div class="grid gap-4 sm:grid-cols-2">
            <div>
                <label for="client_name" class="mb-1 block text-sm font-medium">{{ __('site.booking.name') }}</label>
                <input required name="client_name" id="client_name" value="{{ old('client_name') }}"
                    class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-brand focus:ring-2">
            </div>
            <div>
                <label for="phone" class="mb-1 block text-sm font-medium">{{ __('site.booking.phone') }}</label>
                <input required type="tel" name="phone" id="phone" value="{{ old('phone') }}" placeholder="+212 6…"
                    class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-brand focus:ring-2">
            </div>
        </div>
        <div>
            <label for="pickup_location" class="mb-1 block text-sm font-medium">{{ __('site.booking.departure') }}</label>
            <input required name="pickup_location" id="pickup_location" value="{{ old('pickup_location', $defaultFrom) }}"
                class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-brand focus:ring-2">
        </div>
        <div>
            <label for="dropoff_location" class="mb-1 block text-sm font-medium">{{ __('site.booking.arrival') }}</label>
            <input required name="dropoff_location" id="dropoff_location" value="{{ old('dropoff_location') }}"
                placeholder="{{ __('site.booking.arrival_placeholder') }}"
                class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-brand focus:ring-2">
        </div>
        <div class="grid gap-4 sm:grid-cols-3">
            <div>
                <label for="date" class="mb-1 block text-sm font-medium">{{ __('site.booking.date') }}</label>
                <input required type="date" name="date" id="date" value="{{ old('date', now()->format('Y-m-d')) }}"
                    class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-brand focus:ring-2">
            </div>
            <div>
                <label for="time" class="mb-1 block text-sm font-medium">{{ __('site.booking.time') }}</label>
                <input required type="time" name="time" id="time" value="{{ old('time', '12:00') }}"
                    class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-brand focus:ring-2">
            </div>
            <div>
                <label for="passengers" class="mb-1 block text-sm font-medium">{{ __('site.booking.passengers') }}</label>
                <input type="number" name="passengers" id="passengers" min="1" max="50" value="{{ old('passengers', 1) }}"
                    class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none ring-brand focus:ring-2">
            </div>
        </div>
        <div>
            <label for="flight_number" class="mb-1 block text-sm font-medium">{{ __('site.booking.flight') }} <span class="text-slate-400">({{ __('site.booking.optional') }})</span></label>
            <input name="flight_number" id="flight_number" value="{{ old('flight_number') }}" placeholder="AT721, FR8821…"
                class="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm uppercase outline-none ring-brand focus:ring-2">
        </div>
        @if ($errors->any())
            <ul class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        @endif
        <button type="submit" class="w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-white shadow-lg hover:bg-brand-dark">
            {{ __('site.booking.submit') }}
        </button>
    </form>
</div>

@push('scripts')
<script>
document.querySelectorAll('.preset-route').forEach((btn) => {
    btn.addEventListener('click', () => {
        document.getElementById('pickup_location').value = btn.dataset.from;
        document.getElementById('dropoff_location').value = btn.dataset.to;
    });
});
</script>
@endpush
