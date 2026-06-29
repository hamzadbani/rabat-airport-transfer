<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ ($isRtl ?? false) ? 'rtl' : 'ltr' }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @php
        $seoCanonical = trim($__env->yieldContent('canonical')) ?: rtrim(config('site.url'), '/').'/';
        $seoTitle = trim($__env->yieldContent('title')) ?: config('site.name');
        $seoDescription = trim($__env->yieldContent('description')) ?: __('landing.meta.description');
    @endphp
    <title>{{ $seoTitle }}</title>
    <meta name="description" content="{{ $seoDescription }}">
    <link rel="canonical" href="{{ $seoCanonical }}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ config('site.name') }}">
    <meta property="og:title" content="{{ $seoTitle }}">
    <meta property="og:description" content="{{ $seoDescription }}">
    <meta property="og:url" content="{{ $seoCanonical }}">
    <meta property="og:image" content="{{ rtrim(config('site.url'), '/') }}{{ config('site.media.hero_image', config('site.logo')) }}">
    <meta property="og:locale" content="{{ app()->getLocale() === 'ar' ? 'ar_MA' : (app()->getLocale() === 'en' ? 'en_US' : 'fr_MA') }}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $seoTitle }}">
    <meta name="twitter:description" content="{{ $seoDescription }}">
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
