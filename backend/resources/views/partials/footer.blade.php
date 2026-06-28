@php
    $section = fn (string $id) => route('home')."#{$id}";
@endphp
<footer class="border-t border-slate-200 bg-slate-900 text-slate-300">
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
            <div class="footer-logo">
                <a href="{{ route('home') }}" aria-label="{{ config('site.name') }}">
                    <img src="/assets/new-logo-taxi-rabat-removebg-preview.png"
                        alt="{{ config('site.name') }}"
                        width="380"
                        height="109"
                        class="brightness-110">
                </a>
            </div>
                <p class="mt-4 text-sm leading-relaxed text-slate-400">
                    {{ __('site.footer.tagline') }}
                </p>
            </div>
            <div>
                <h4 class="text-sm font-semibold uppercase tracking-wider text-white">{{ __('site.footer.quick_links') }}</h4>
                <ul class="mt-4 space-y-2 text-sm">
                    <li><a href="{{ $section('accueil') }}" class="hover:text-brand">{{ __('site.nav.home') }}</a></li>
                    <li><a href="{{ $section('apropos') }}" class="hover:text-brand">{{ __('site.nav.about') }}</a></li>
                    <li><a href="{{ $section('avis') }}" class="hover:text-brand">{{ __('site.nav.reviews') }}</a></li>
                    <li><a href="{{ $section('services') }}" class="hover:text-brand">{{ __('site.nav.services') }}</a></li>
                    <li><a href="{{ $section('tarifs') }}" class="hover:text-brand">{{ __('site.nav.pricing') }}</a></li>
                    <li><a href="{{ $section('contact') }}" class="hover:text-brand">{{ __('site.nav.contact') }}</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-sm font-semibold uppercase tracking-wider text-white">{{ __('site.footer.local_seo') }}</h4>
                <ul class="mt-4 space-y-2 text-sm">
                    @foreach (__('site.footer.seo_links') as $link)
                        <li><a href="{{ $link['href'] }}" class="hover:text-brand">{{ $link['label'] }}</a></li>
                    @endforeach
                    <li><a href="{{ route('blog.index') }}" class="hover:text-brand">{{ __('site.footer.blog') }}</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-sm font-semibold uppercase tracking-wider text-white">{{ __('site.footer.contact_title') }}</h4>
                <ul class="mt-4 space-y-2 text-sm">
                    <li><a href="tel:{{ config('site.phone_tel') }}" class="hover:text-brand">{{ config('site.phone_display') }}</a></li>
                    <li><a href="mailto:{{ config('site.email') }}" class="hover:text-brand">{{ config('site.email') }}</a></li>
                    <li>{{ __('site.footer.hours') }}</li>
                </ul>
            </div>
        </div>
        <div class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
            <p>© {{ date('Y') }} {{ config('site.name') }}. {{ __('site.footer.rights') }}</p>
            <p class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <a href="{{ route('sitemap') }}" class="hover:text-brand">{{ __('site.footer.sitemap') }}</a>
                <span aria-hidden="true">·</span>
                <span>
                    {{ __('site.footer.created_by') }}
                    <a href="{{ config('site.developer.url') }}" target="_blank" rel="noopener noreferrer" class="hover:text-brand">
                        {{ config('site.developer.name') }}
                    </a>
                </span>
            </p>
        </div>
    </div>
</footer>
