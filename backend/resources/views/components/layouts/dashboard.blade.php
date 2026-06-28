@props([
    'title' => __('dashboard.pages.dashboard.title'),
    'subtitle' => __('dashboard.pages.dashboard.subtitle'),
    'showWeekRange' => false,
    'weekStart' => null,
    'weekEnd' => null,
])

@php
    $archive = request()->query('archive', 'active');
    $status = request()->query('status', 'all');
    $jumpDate = request()->query('date', '');
    $dashboardLocale = app()->getLocale();
@endphp

<!DOCTYPE html>
<html lang="{{ $dashboardLocale }}" class="h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>{{ $title }} — {{ config('site.name') }}</title>
    <link rel="icon" href="/favicon.png" type="image/png">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=dm-sans:400,500,600,700|outfit:500,600,700" rel="stylesheet">
    <script>
        (function () {
            try {
                var theme = localStorage.getItem('dashboard-theme');
                document.documentElement.classList.add(theme === 'dark' ? 'dashboard-theme-dark' : 'dashboard-theme-light');
            } catch (error) {
                document.documentElement.classList.add('dashboard-theme-light');
            }
        })();
    </script>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
    @stack('head')
</head>
<body class="dashboard-shell h-full font-sans antialiased">
    <div class="flex h-full min-h-screen">
        <div
            class="dashboard-sidebar-overlay fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
            data-dashboard-sidebar-overlay
            aria-hidden="true"
        ></div>

        <x-dashboard.sidebar />

        <div class="flex min-w-0 flex-1 flex-col lg:pl-[15.5rem]">
            <x-dashboard.navbar
                :title="$title"
                :subtitle="$subtitle"
                :archive="$archive"
                :status="$status"
                :jump-date="$jumpDate"
                :locale="$dashboardLocale"
                :show-week-range="$showWeekRange"
                :week-start="$weekStart"
                :week-end="$weekEnd"
            />

            <main class="flex-1 px-4 py-5 sm:px-6">
                @if (session('success'))
                    <div class="dashboard-flash dashboard-flash-success">{{ session('success') }}</div>
                @endif

                @if (session('error'))
                    <div class="dashboard-flash dashboard-flash-error">{{ session('error') }}</div>
                @endif

                {{ $slot }}
            </main>
        </div>
    </div>

    @livewireScripts
    <script>
        (function () {
            if (window.__dashboardSidebarReady) {
                return;
            }

            window.__dashboardSidebarReady = true;

            var root = document.documentElement;
            var openClass = 'dashboard-sidebar-open';

            function syncAria() {
                var open = root.classList.contains(openClass);
                document.querySelectorAll('[data-dashboard-sidebar-toggle]').forEach(function (button) {
                    button.setAttribute('aria-expanded', open ? 'true' : 'false');
                });
            }

            function closeSidebar() {
                root.classList.remove(openClass);
                syncAria();
            }

            document.addEventListener('click', function (event) {
                if (event.target.closest('[data-dashboard-sidebar-toggle]')) {
                    event.preventDefault();
                    root.classList.toggle(openClass);
                    syncAria();
                    return;
                }

                if (event.target.closest('[data-dashboard-sidebar-close]')) {
                    closeSidebar();
                    return;
                }

                if (event.target.closest('[data-dashboard-sidebar-overlay]')) {
                    closeSidebar();
                }
            });

            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    closeSidebar();
                }
            });

            syncAria();
        })();

        (function () {
            if (window.__dashboardThemeReady) {
                return;
            }

            window.__dashboardThemeReady = true;

            var storageKey = 'dashboard-theme';
            var root = document.documentElement;
            var lightClass = 'dashboard-theme-light';
            var darkClass = 'dashboard-theme-dark';

            function applyTheme(theme) {
                var isDark = theme === 'dark';
                root.classList.toggle(darkClass, isDark);
                root.classList.toggle(lightClass, !isDark);

                document.querySelectorAll('[data-dashboard-theme]').forEach(function (button) {
                    var active = button.getAttribute('data-dashboard-theme') === theme;
                    button.classList.toggle('dashboard-switcher__btn--active', active);
                    button.setAttribute('aria-pressed', active ? 'true' : 'false');
                });
            }

            function setTheme(theme) {
                if (theme !== 'light' && theme !== 'dark') {
                    theme = 'light';
                }

                try {
                    localStorage.setItem(storageKey, theme);
                } catch (error) {
                    // Ignore storage errors.
                }

                applyTheme(theme);
            }

            document.addEventListener('click', function (event) {
                var button = event.target.closest('[data-dashboard-theme]');
                if (!button) {
                    return;
                }

                event.preventDefault();
                setTheme(button.getAttribute('data-dashboard-theme'));
            });

            var savedTheme = 'light';
            try {
                savedTheme = localStorage.getItem(storageKey) || 'light';
            } catch (error) {
                savedTheme = 'light';
            }

            applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
        })();
    </script>
    @stack('scripts')
</body>
</html>
