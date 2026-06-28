@props([
    'title',
    'subtitle',
    'archive' => 'active',
    'status' => 'all',
    'jumpDate' => '',
    'locale' => 'fr',
    'weekStart' => null,
    'weekEnd' => null,
    'showWeekRange' => false,
])

@php
    $filterParams = fn (array $overrides = []) => array_filter(array_merge([
        'archive' => $archive,
        'status' => $status,
        'date' => $jumpDate ?: null,
    ], $overrides), fn ($value) => $value !== null && $value !== '');
@endphp

<header class="dashboard-header sticky top-0 z-30 backdrop-blur">
    <div class="px-4 py-4 sm:px-6">
        <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="flex min-w-0 items-start gap-3">
                <button
                    type="button"
                    class="dashboard-icon-btn relative z-[70] mt-0.5 lg:hidden"
                    data-dashboard-sidebar-toggle
                    aria-controls="dashboard-sidebar"
                    aria-expanded="false"
                    aria-label="{{ __('dashboard.nav.open_menu') }}"
                >
                    <x-dashboard.icon name="menu" class="h-5 w-5" />
                </button>
                <div>
                    <h1 class="dashboard-header__title font-display text-2xl font-semibold tracking-tight">{{ $title }}</h1>
                    <p class="dashboard-header__subtitle mt-1 max-w-2xl text-sm leading-relaxed">{{ $subtitle }}</p>
                    @if ($showWeekRange && $weekStart && $weekEnd)
                        <p class="dashboard-header__meta mt-2 text-sm font-medium">
                            {{ $weekStart->isoFormat('ddd D MMM YYYY') }}
                            <span class="dashboard-header__meta-sep mx-1">→</span>
                            {{ $weekEnd->isoFormat('ddd D MMM YYYY') }}
                        </p>
                    @endif
                </div>
            </div>

            <div class="dashboard-header__tools">
                <div class="dashboard-switcher" role="group" aria-label="{{ __('dashboard.theme.label') }}">
                    <button
                        type="button"
                        class="dashboard-switcher__btn"
                        data-dashboard-theme="light"
                        aria-pressed="false"
                    >
                        <x-dashboard.icon name="sun" class="h-3.5 w-3.5" />
                        {{ __('dashboard.theme.light') }}
                    </button>
                    <button
                        type="button"
                        class="dashboard-switcher__btn"
                        data-dashboard-theme="dark"
                        aria-pressed="false"
                    >
                        <x-dashboard.icon name="moon" class="h-3.5 w-3.5" />
                        {{ __('dashboard.theme.dark') }}
                    </button>
                </div>

                <div class="dashboard-switcher" role="group" aria-label="{{ __('dashboard.locale.label') }}">
                    <a
                        href="{{ route('dashboard.locale.switch', 'fr') }}"
                        @class([
                            'dashboard-switcher__btn',
                            'dashboard-switcher__btn--active' => $locale === 'fr',
                        ])
                    >FR</a>
                    <a
                        href="{{ route('dashboard.locale.switch', 'en') }}"
                        @class([
                            'dashboard-switcher__btn',
                            'dashboard-switcher__btn--active' => $locale === 'en',
                        ])
                    >EN</a>
                </div>
            </div>
        </div>

        <div class="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div class="flex flex-wrap items-center gap-3">
                <form method="GET" action="{{ url()->current() }}" class="flex items-center gap-2">
                    <input type="hidden" name="archive" value="{{ $archive }}">
                    <input type="hidden" name="status" value="{{ $status }}">
                    <label for="jump-date" class="dashboard-header__label text-xs font-medium">{{ __('dashboard.filters.jump_date') }}</label>
                    <input
                        id="jump-date"
                        type="date"
                        name="date"
                        value="{{ $jumpDate }}"
                        class="dashboard-input-date"
                        onchange="this.form.submit()"
                    >
                </form>

                <div class="dashboard-divider hidden h-6 w-px bg-slate-200 sm:block"></div>

                <div class="flex flex-wrap items-center gap-2">
                    <span class="dashboard-header__label text-xs font-medium">{{ __('dashboard.filters.period') }}</span>
                    @foreach (['active', 'archive', 'all'] as $key)
                        <a
                            href="{{ url()->current() . '?' . http_build_query($filterParams(['archive' => $key])) }}"
                            @class([
                                'dashboard-pill',
                                'dashboard-pill-active' => $archive === $key,
                            ])
                        >{{ __('dashboard.filters.archive.' . $key) }}</a>
                    @endforeach
                </div>

                <div class="flex flex-wrap items-center gap-2">
                    <span class="dashboard-header__label text-xs font-medium">{{ __('dashboard.filters.status_label') }}</span>
                    @foreach (['all', 'planned', 'confirmed', 'cancelled'] as $key)
                        <a
                            href="{{ url()->current() . '?' . http_build_query($filterParams(['status' => $key])) }}"
                            @class([
                                'dashboard-pill',
                                'dashboard-pill-status' => $status === $key,
                            ])
                        >{{ __('dashboard.filters.status.' . $key) }}</a>
                    @endforeach
                </div>
            </div>

            <a href="{{ route('dashboard.reservations', ['new' => 1]) }}" class="dashboard-btn-primary">
                <x-dashboard.icon name="plus" class="h-4 w-4" />
                {{ __('dashboard.actions.new_reservation') }}
            </a>
        </div>
    </div>
</header>
