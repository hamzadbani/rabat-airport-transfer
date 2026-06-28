@extends('layouts.site')

@php
    $meta = $copy['meta'];
    $base = rtrim(config('site.url'), '/');
    $pageUrl = $base.'/'.$slug.'/';
    $wa = 'https://wa.me/'.config('site.whatsapp').'?text='.rawurlencode(__('site.seo.wa_prefix').' '.$copy['h1']);
    $schemaLang = match (app()->getLocale()) {
        'en' => 'en',
        'ar' => 'ar',
        default => 'fr-MA',
    };
@endphp

@section('title', $meta['title'])
@section('description', $meta['description'])
@section('canonical', $pageUrl)

@push('head')
<script type="application/ld+json">
{!! json_encode([
    '@context' => 'https://schema.org',
    '@graph' => [
        [
            '@type' => 'WebPage',
            '@id' => $pageUrl.'#webpage',
            'url' => $pageUrl,
            'name' => $meta['title'],
            'description' => $meta['description'],
            'inLanguage' => $schemaLang,
        ],
        [
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                ['@type' => 'ListItem', 'position' => 1, 'name' => __('site.seo.home'), 'item' => $base.'/'],
                ['@type' => 'ListItem', 'position' => 2, 'name' => $copy['h1'], 'item' => $pageUrl],
            ],
        ],
    ],
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}
</script>
@if (!empty($copy['faq']))
<script type="application/ld+json">
{!! json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'FAQPage',
    'mainEntity' => collect($copy['faq'])->map(fn ($f) => [
        '@type' => 'Question',
        'name' => $f['question'],
        'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f['answer']],
    ])->values()->all(),
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}
</script>
@endif
@endpush

@section('content')
<main class="mx-auto max-w-4xl px-4 py-10 pb-24 sm:px-6 sm:py-14 lg:pb-14">
    <nav class="text-sm text-slate-500">
        <a href="{{ route('home') }}" class="hover:text-brand-dark">{{ __('site.seo.home') }}</a>
        <span class="mx-2">/</span>
        <span class="text-slate-800">{{ $copy['h1'] }}</span>
    </nav>

    <header class="mt-6">
        <h1 class="font-display text-3xl font-bold text-slate-900 sm:text-4xl">{{ $copy['h1'] }}</h1>
        <p class="mt-4 text-lg text-slate-600">{{ $copy['heroSubtitle'] }}</p>
        @if (!empty($copy['trustBullets']))
            <ul class="mt-4 flex flex-wrap gap-2">
                @foreach ($copy['trustBullets'] as $bullet)
                    <li class="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900">{{ $bullet }}</li>
                @endforeach
            </ul>
        @endif
    </header>

    <div class="mt-8 flex flex-wrap gap-3">
        <a href="{{ $wa }}" class="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white">{{ __('site.nav.whatsapp') }}</a>
        <a href="tel:{{ config('site.phone_tel') }}" class="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold">{{ config('site.phone_display') }}</a>
        <a href="{{ route('home') }}#reserver" class="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white">{{ __('site.seo.form') }}</a>
    </div>

    <div class="prose prose-slate mt-10 max-w-none">
        @foreach ($copy['sections'] ?? [] as $section)
            <section class="mb-8">
                <h2 class="text-xl font-semibold text-slate-900">{{ $section['heading'] }}</h2>
                @foreach ($section['paragraphs'] as $p)
                    <p class="mt-3 text-slate-600 leading-relaxed">{{ $p }}</p>
                @endforeach
            </section>
        @endforeach

        @if (!empty($copy['aiBodyHtml']))
            <div class="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 text-slate-700">
                {!! $copy['aiBodyHtml'] !!}
            </div>
        @endif
    </div>

    @if (!empty($copy['faq']))
        <section class="mt-12" id="faq">
            <h2 class="text-xl font-bold text-slate-900">{{ __('site.seo.faq') }}</h2>
            <dl class="mt-6 space-y-4">
                @foreach ($copy['faq'] as $item)
                    <div class="rounded-xl border border-slate-200 bg-white p-4">
                        <dt class="font-semibold text-slate-900">{{ $item['question'] }}</dt>
                        <dd class="mt-2 text-sm text-slate-600">{{ $item['answer'] }}</dd>
                    </div>
                @endforeach
            </dl>
        </section>
    @endif

    @if (!empty($page['related']))
        <section class="mt-12 border-t border-slate-200 pt-10">
            <h2 class="text-lg font-semibold text-slate-900">{{ $copy['relatedSectionTitle'] ?? __('site.seo.related') }}</h2>
            <ul class="mt-4 grid gap-2 sm:grid-cols-2">
                @foreach ($page['related'] as $relatedId)
                    <li>
                        <a href="/{{ $relatedId }}/" class="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-brand-secondary hover:border-brand hover:bg-amber-50">
                            {{ str_replace('-', ' ', $relatedId) }}
                        </a>
                    </li>
                @endforeach
            </ul>
        </section>
    @endif
</main>

<div class="safe-area-pb fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
    <a href="{{ $wa }}" class="block w-full rounded-full bg-brand py-3 text-center text-sm font-bold text-white">{{ __('site.seo.book_whatsapp') }}</a>
</div>
@endsection
