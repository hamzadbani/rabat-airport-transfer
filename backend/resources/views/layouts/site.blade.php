<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ ($isRtl ?? false) ? 'rtl' : 'ltr' }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', config('site.name'))</title>
    <meta name="description" content="@yield('description', __('landing.meta.description'))">
    @hasSection('canonical')
        <link rel="canonical" href="@yield('canonical')">
    @endif
    <link rel="alternate" hreflang="fr" href="{{ rtrim(config('site.url'), '/') }}/">
    <link rel="alternate" hreflang="en" href="{{ rtrim(config('site.url'), '/') }}/?lang=en">
    <link rel="alternate" hreflang="ar" href="{{ rtrim(config('site.url'), '/') }}/?lang=ar">
    <link rel="icon" href="/favicon.png" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#C9A227">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=dm-sans:400,500,600,700|outfit:500,600,700" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x/dist/cdn.min.js"></script>
    @stack('head')
</head>
<body class="bg-slate-50 font-sans text-slate-900 antialiased {{ ($isRtl ?? false) ? 'text-right' : '' }}">
    @include('partials.nav')
    @yield('content')
    @include('partials.footer')
    @if (request()->routeIs('home'))
        @include('partials.mobile-bar')
    @endif
    @stack('scripts')
</body>
</html>
