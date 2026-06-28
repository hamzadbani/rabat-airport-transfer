@extends('layouts.site')

@section('title', __('landing.meta.title'))
@section('description', __('landing.meta.description'))

@push('head')
<script type="application/ld+json">
{!! json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'LocalBusiness',
    'name' => config('site.name'),
    'description' => config('site.tagline'),
    'url' => config('site.url'),
    'telephone' => config('site.phone_tel'),
    'email' => config('site.email'),
    'priceRange' => '$$$',
    'address' => [
        '@type' => 'PostalAddress',
        'addressLocality' => config('site.address.city'),
        'addressRegion' => config('site.address.region'),
        'addressCountry' => config('site.address.country'),
    ],
    'geo' => [
        '@type' => 'GeoCoordinates',
        'latitude' => config('site.geo.lat'),
        'longitude' => config('site.geo.lng'),
    ],
    'areaServed' => ['Rabat', 'Salé', 'Casablanca', 'Maroc'],
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}
</script>
@if (!empty($faq))
<script type="application/ld+json">
{!! json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => collect($faq)->map(fn ($item) => [
        '@type' => 'Question',
        'name' => $item['q'],
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => $item['a']],
    ])->values()->all(),
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}
</script>
@endif
<script src="https://elfsightcdn.com/platform.js" async></script>
@endpush

@section('content')
@php
    $wa = 'https://wa.me/'.config('site.whatsapp').'?text='.rawurlencode(__('site.booking.wa_intro'));
@endphp
<main>
    <section id="accueil" class="relative flex min-h-[620px] items-center overflow-hidden text-white lg:min-h-[720px]" aria-label="{{ __('site.nav.home') }}">
        <video
            class="absolute inset-0 h-full w-full object-cover"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            poster="{{ config('site.media.hero_poster') }}"
            aria-label="{{ __('landing.hero.title') }}">
            <source src="{{ config('site.media.hero_video') }}" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/65 to-teal-950/50" aria-hidden="true"></div>
        <div class="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-start lg:py-24">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{{ __('landing.hero.eyebrow') }}</p>
                <h1 class="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.65rem]">
                    {{ __('landing.hero.title') }}
                </h1>
                <p class="mt-4 max-w-xl text-base text-slate-200 sm:text-lg">
                    {{ __('landing.hero.lead') }}
                </p>
                <ul class="mt-6 flex flex-wrap gap-2">
                    @foreach (__('landing.hero.badges') as $badge)
                        <li class="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100 backdrop-blur-sm">{{ $badge }}</li>
                    @endforeach
                </ul>
            </div>
            @include('partials.booking-form')
        </div>
    </section>

    <section id="apropos" class="bg-white py-16" aria-label="{{ __('site.nav.about') }}">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
            <p class="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">{{ __('landing.about.label') }}</p>
            <h2 class="mt-3 text-center font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                {{ __('landing.about.title') }}<br>
                <span class="text-brand-accent">{{ __('landing.about.title_accent') }}</span>
            </h2>
            <div class="mt-12 grid items-center gap-10 lg:grid-cols-2">
                <div class="relative overflow-hidden rounded-2xl shadow-lg">
                    <img
                        src="{{ config('site.media.about') }}"
                        alt="{{ __('landing.about.image_alt') }}"
                        width="800"
                        height="600"
                        class="aspect-[4/3] w-full object-cover"
                        loading="lazy"
                        decoding="async">
                    <div class="absolute bottom-4 {{ ($isRtl ?? false) ? 'right-4' : 'left-4' }} rounded-xl bg-brand px-5 py-3 text-white shadow-lg">
                        <p class="text-3xl font-bold leading-none">15+</p>
                        <p class="mt-1 text-xs font-medium uppercase tracking-wide text-white/90">{{ __('landing.about.years') }}</p>
                    </div>
                </div>
                <div>
                    <p class="text-slate-600 leading-relaxed">{{ __('landing.about.body') }}</p>
                    <div class="mt-8 grid gap-4 sm:grid-cols-2">
                        @foreach (__('landing.about.stats') as $stat)
                            <div class="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
                                <p class="text-2xl font-bold text-brand">{{ $stat['value'] }}</p>
                                <p class="mt-1 text-xs font-medium text-slate-600">{{ $stat['label'] }}</p>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>

            <div class="mt-24 border-t border-slate-100 pt-16 sm:mt-28">
                <h2 class="text-center font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                    {{ __('landing.why_choose.title') }}
                    <span class="text-brand-accent">{{ __('landing.why_choose.title_highlight') }}</span>?
                </h2>
                <div class="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
                    @foreach (__('landing.why_choose.items') as $index => $item)
                        <article class="rounded-xl border border-slate-200 bg-slate-50 p-5 text-left shadow-sm transition hover:border-brand/30 hover:shadow-md">
                            <div class="mb-3 inline-flex rounded-lg bg-brand/10 p-2 text-brand-dark" aria-hidden="true">
                                @if ($index === 0)
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                @elseif ($index === 1)
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                @else
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                                @endif
                            </div>
                            <h3 class="text-base font-semibold text-slate-900">{{ $item['title'] }}</h3>
                            <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ $item['desc'] }}</p>
                        </article>
                    @endforeach
                </div>
            </div>
        </div>
    </section>

    <section id="avis" class="border-y border-slate-200 bg-slate-50 py-16" aria-label="{{ __('site.nav.reviews') }}">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
            <p class="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">{{ __('landing.reviews.label') }}</p>
            <h2 class="mt-3 text-center font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                {{ __('landing.reviews.title') }} <span class="text-brand">{{ __('landing.reviews.title_accent') }}</span>
            </h2>
            <p class="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600">{{ __('landing.reviews.subtitle') }}</p>
            <div class="mt-10 min-h-[280px] rounded-2xl border border-slate-200 bg-white p-4">
                <div class="elfsight-app-851803ef-af1a-41aa-8c98-2ee07489ede3" data-elfsight-app-lazy="true"></div>
            </div>
            <p class="mt-4 text-center text-xs text-slate-500">{{ __('landing.reviews.disclaimer') }}</p>
        </div>
    </section>

    <section id="services" class="bg-white py-16" aria-label="{{ __('site.nav.services') }}">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">{{ __('landing.services.label') }}</p>
            <h2 class="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                {{ __('landing.services.title') }} <span class="text-brand">{{ __('landing.services.title_accent') }}</span>
            </h2>
            <div class="mt-10 grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-4">
                @foreach (__('landing.services.items') as $service)
                    @php($serviceImage = config('site.media.services')[$service['id']] ?? null)
                    <article id="{{ $service['id'] }}" class="group flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand/40 hover:shadow-md">
                        @if ($serviceImage)
                            <div class="h-48 shrink-0 overflow-hidden bg-slate-100">
                                <img
                                    src="{{ $serviceImage }}"
                                    alt="{{ $service['title'] }} — {{ config('site.name') }}"
                                    width="640"
                                    height="384"
                                    class="size-full object-cover object-center transition duration-500 group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async">
                            </div>
                        @endif
                        <div class="flex flex-1 flex-col p-6">
                            <div class="mb-4 inline-flex w-fit rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand-dark">{{ __('landing.services.badge') }}</div>
                            <h3 class="min-h-14 text-lg font-semibold leading-snug text-slate-900 line-clamp-2">{{ $service['title'] }}</h3>
                            <p class="mt-2 min-h-24 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-4">{{ $service['desc'] }}</p>
                        </div>
                    </article>
                @endforeach
            </div>
        </div>
    </section>

    <section id="tarifs" class="border-y border-slate-200 bg-slate-50 py-16" aria-label="{{ __('site.nav.pricing') }}">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
            <p class="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">{{ __('landing.pricing.label') }}</p>
            <h2 class="mt-3 text-center font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                {{ __('landing.pricing.title') }} <span class="text-brand">{{ __('landing.pricing.title_accent') }}</span>
            </h2>
            <p class="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600">{{ __('landing.pricing.subtitle') }}</p>

            <div class="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div class="grid lg:grid-cols-2">
                    <div class="relative min-h-[240px] lg:min-h-full">
                        <img
                            src="{{ config('site.media.pricing') }}"
                            alt="{{ __('landing.pricing.image_alt') }}"
                            width="800"
                            height="600"
                            class="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                            decoding="async">
                    </div>
                    <div class="flex flex-col justify-center p-6 sm:p-8">
                        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">{{ __('landing.pricing.label') }}</p>
                        <h3 class="mt-2 font-display text-xl font-bold text-slate-900 sm:text-2xl">
                            {{ __('landing.pricing.title') }} <span class="text-brand">{{ __('landing.pricing.title_accent') }}</span>
                        </h3>
                        <p class="mt-3 text-sm leading-relaxed text-slate-600">{{ __('landing.pricing.subtitle') }}</p>
                    </div>
                </div>
            </div>

            <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                @forelse ($popularRoutes as $route)
                    <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p class="text-sm font-medium text-slate-900">{{ $route->fromZone?->name }}</p>
                        <p class="text-xs text-slate-500">→ {{ $route->toZone?->name }}</p>
                        <p class="mt-4 text-2xl font-bold text-brand">{{ number_format($route->daytime_price, 0, ',', ' ') }} <span class="text-sm font-medium text-slate-500">{{ __('landing.pricing.currency') }}</span></p>
                    </article>
                @empty
                    @foreach (__('landing.pricing.fallback') as $fallback)
                        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p class="text-sm font-medium text-slate-900">{{ $fallback['from'] }}</p>
                            <p class="text-xs text-slate-500">→ {{ $fallback['to'] }}</p>
                            <p class="mt-4 text-2xl font-bold text-brand">{{ __('landing.pricing.from') }} {{ $fallback['price'] }} <span class="text-sm font-medium text-slate-500">{{ __('landing.pricing.currency') }}</span></p>
                        </article>
                    @endforeach
                @endforelse
            </div>
            <p class="mt-8 text-center text-sm text-slate-600">
                {{ __('landing.pricing.quote') }}
                <a href="{{ $wa }}" class="font-semibold text-brand-dark hover:underline">{{ __('landing.pricing.quote_link') }}</a>
            </p>
        </div>
    </section>

    <section id="contact" class="border-t border-slate-200 bg-white py-16" aria-label="{{ __('site.nav.contact') }}">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
            <p class="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">{{ __('landing.contact.label') }}</p>
            <h2 class="mt-3 text-center font-display text-2xl font-bold text-slate-900">{{ __('landing.contact.title') }}</h2>
            <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <a href="tel:{{ config('site.phone_tel') }}" class="rounded-2xl border border-slate-200 p-5 transition hover:border-brand hover:shadow-md">
                    <p class="text-xs font-semibold uppercase text-brand-secondary">{{ __('landing.contact.phone_title') }}</p>
                    <p class="mt-2 font-semibold text-slate-900">{{ config('site.phone_display') }}</p>
                    <p class="mt-1 text-sm text-slate-500">{{ __('landing.contact.phone_hint') }}</p>
                </a>
                <a href="mailto:{{ config('site.email') }}" class="rounded-2xl border border-slate-200 p-5 transition hover:border-brand hover:shadow-md">
                    <p class="text-xs font-semibold uppercase text-brand-secondary">{{ __('landing.contact.email_title') }}</p>
                    <p class="mt-2 text-sm font-semibold text-slate-900 break-all">{{ config('site.email') }}</p>
                    <p class="mt-1 text-sm text-slate-500">{{ __('landing.contact.email_hint') }}</p>
                </a>
                <a href="{{ $wa }}" target="_blank" rel="noopener" class="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 transition hover:shadow-md">
                    <p class="text-xs font-semibold uppercase text-emerald-700">{{ __('landing.contact.whatsapp_title') }}</p>
                    <p class="mt-2 font-semibold text-slate-900">{{ config('site.phone_display') }}</p>
                    <p class="mt-1 text-sm text-slate-500">{{ __('landing.contact.whatsapp_hint') }}</p>
                </a>
                <div class="rounded-2xl border border-slate-200 p-5">
                    <p class="text-xs font-semibold uppercase text-brand-secondary">{{ __('landing.contact.address_title') }}</p>
                    <p class="mt-2 font-semibold text-slate-900">{{ __('landing.contact.address') }}</p>
                    <p class="mt-1 text-sm text-slate-500">{{ __('landing.contact.address_hint') }}</p>
                </div>
            </div>

            <div class="mt-10 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <iframe
                    src="{{ config('site.maps_embed') }}"
                    width="400"
                    height="300"
                    class="aspect-[4/3] h-auto min-h-[280px] w-full sm:min-h-[360px]"
                    style="border:0;"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="strict-origin-when-cross-origin"
                    title="{{ __('landing.contact.map_title') }}"></iframe>
            </div>
        </div>
    </section>

    @if (!empty($faq))
    <section id="faq" class="border-t border-slate-200 bg-slate-50 py-16" aria-labelledby="faq-title">
        <div class="mx-auto max-w-3xl px-4 sm:px-6">
            <p class="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">{{ __('landing.faq.label') }}</p>
            <h2 id="faq-title" class="mt-3 text-center font-display text-2xl font-bold text-slate-900">{{ __('landing.faq.title') }}</h2>
            <div id="ai-answer" class="mt-8 rounded-xl border border-brand/20 bg-amber-50/80 p-5 text-sm text-slate-700">
                <p class="font-semibold text-slate-900">{{ __('landing.faq.summary_title') }}</p>
                <p class="mt-2">{{ __('landing.faq.summary') }}</p>
            </div>
            <dl class="mt-8 space-y-4">
                @foreach ($faq as $item)
                    <div class="rounded-xl border border-slate-200 bg-white p-5">
                        <dt class="font-semibold text-slate-900">{{ $item['q'] }}</dt>
                        <dd class="mt-2 text-sm leading-relaxed text-slate-600">{{ $item['a'] }}</dd>
                    </div>
                @endforeach
            </dl>
            <nav class="mt-8 flex flex-wrap justify-center gap-3 text-sm" aria-label="{{ __('landing.faq.links_label') }}">
                @foreach (__('landing.faq.links') as $link)
                    <a href="{{ $link['href'] }}" class="rounded-full border border-slate-200 bg-white px-4 py-2 hover:border-brand">{{ $link['label'] }}</a>
                @endforeach
            </nav>
        </div>
    </section>
    @endif
</main>
@endsection
