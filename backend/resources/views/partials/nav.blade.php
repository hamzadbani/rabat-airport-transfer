@php
    $wa = 'https://wa.me/'.config('site.whatsapp').'?text='.rawurlencode(__('site.booking.wa_intro'));
    $section = fn (string $id) => request()->routeIs('home') ? "#{$id}" : route('home')."#{$id}";
    $isAdmin = auth()->check() && auth()->user()?->role === 'admin';
    $authHref = $isAdmin ? route('dashboard.index') : '/login';
    $authLabel = $isAdmin ? __('site.nav.dashboard') : __('site.nav.login');
    $navLinks = [
        ['label' => __('site.nav.home'), 'href' => $section('accueil')],
        ['label' => __('site.nav.about'), 'href' => $section('apropos')],
        ['label' => __('site.nav.reviews'), 'href' => $section('avis')],
        ['label' => __('site.nav.services'), 'href' => $section('services')],
        ['label' => __('site.nav.pricing'), 'href' => $section('tarifs')],
    ];
    $locales = [
        'fr' => ['flag' => '🇫🇷', 'code' => 'FR'],
        'en' => ['flag' => '🇬🇧', 'code' => 'EN'],
        'ar' => ['flag' => '🇲🇦', 'code' => 'AR'],
    ];
@endphp
<header class="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur" x-data="{ open: false }">
    <div class="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-6 lg:py-3">
        <div class="navbar-logo">
            <a href="{{ $section('accueil') }}" aria-label="{{ config('site.name') }}">
                <img src="/assets/new-logo-taxi-rabat-removebg-preview.png"
                    alt="{{ config('site.name') }}"
                    width="380"
                    height="109"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high">
            </a>
        </div>

        <nav class="hidden min-w-0 flex-1 items-center justify-center gap-5 text-sm font-medium text-slate-700 lg:flex xl:gap-8" aria-label="{{ __('site.nav.main') }}">
            @foreach ($navLinks as $link)
                <a href="{{ $link['href'] }}" class="whitespace-nowrap transition hover:text-brand-dark">{{ $link['label'] }}</a>
            @endforeach
        </nav>

        <div class="relative z-20 hidden shrink-0 items-center gap-2 lg:flex">
            <select id="locale-select"
                class="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm font-semibold text-slate-700 outline-none ring-brand focus:ring-2"
                aria-label="Select language"
                onchange="window.location.href = this.value">
                @foreach ($locales as $locale => $meta)
                    <option value="{{ route('locale.switch', $locale) }}" @selected(app()->getLocale() === $locale)>
                        {{ $meta['flag'] }} {{ $meta['code'] }}
                    </option>
                @endforeach
            </select>
            <a href="{{ $section('contact') }}"
                class="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-brand">
                {{ __('site.nav.contact') }}
            </a>
            <a href="{{ $authHref }}"
                class="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-brand-secondary hover:text-brand-secondary">
                {{ $authLabel }}
            </a>
            <a href="tel:{{ config('site.phone_tel') }}"
                class="inline-flex items-center rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark">
                {{ __('site.nav.call') }}
            </a>
        </div>

        <button type="button"
            class="mobile-nav-toggle inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm lg:hidden"
            aria-label="{{ __('site.nav.open_menu') }}"
            :aria-expanded="open.toString()"
            @click="open = !open">
            <svg class="icon-open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 5h16M4 12h16M4 19h16"/></svg>
            <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
    </div>

    <div
        x-show="open"
        x-cloak
        x-transition
        @click.outside="open = false"
        class="border-t border-slate-200 bg-white lg:hidden"
    >
        <nav class="mx-auto max-w-[1400px] px-3 py-4 sm:px-6" aria-label="{{ __('site.nav.mobile') }}">
            <ul class="space-y-1">
                @foreach ($navLinks as $link)
                    <li>
                        <a href="{{ $link['href'] }}" @click="open = false"
                            class="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50">
                            {{ $link['label'] }}
                        </a>
                    </li>
                @endforeach
            </ul>
            <div class="mt-4 border-t border-slate-100 pt-4">
                <select id="locale-select-mobile"
                    class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 outline-none ring-brand focus:ring-2"
                    aria-label="Select language"
                    onchange="window.location.href = this.value">
                    @foreach ($locales as $locale => $meta)
                        <option value="{{ route('locale.switch', $locale) }}" @selected(app()->getLocale() === $locale)>
                            {{ $meta['flag'] }} {{ $meta['code'] }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="mt-4 flex flex-col gap-2">
                <a href="{{ $section('contact') }}" @click="open = false"
                    class="rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold">{{ __('site.nav.contact') }}</a>
                <a href="{{ $authHref }}"
                    class="rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold">{{ $authLabel }}</a>
                <a href="tel:{{ config('site.phone_tel') }}" @click="open = false"
                    class="rounded-lg bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white">{{ __('site.nav.call') }}</a>
                <a href="{{ $wa }}" target="_blank" rel="noopener" @click="open = false"
                    class="rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white">{{ __('site.nav.whatsapp') }}</a>
            </div>
        </nav>
    </div>
</header>
