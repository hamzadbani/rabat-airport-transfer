@extends('layouts.site')

@section('title', $post['title'].' | '.config('site.name'))
@section('description', $post['description'])

@section('content')
@php
    $wa = 'https://wa.me/'.config('site.whatsapp').'?text='.rawurlencode($post['cta'] ?? 'Bonjour, je souhaite réserver un transfert.');
@endphp
<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <nav class="text-sm text-slate-500">
        <a href="{{ route('blog.index') }}" class="hover:text-brand-dark">Blog</a>
    </nav>
    <article class="mt-6">
        <h1 class="font-display text-3xl font-bold text-slate-900">{{ $post['title'] }}</h1>
        <p class="mt-4 text-lg text-slate-600">{{ $post['intro'] }}</p>
        @foreach ($post['sections'] as $section)
            <section class="mt-8">
                <h2 class="text-xl font-semibold text-slate-900">{{ $section['heading'] }}</h2>
                @foreach ($section['body'] as $paragraph)
                    <p class="mt-3 text-slate-600 leading-relaxed">{{ $paragraph }}</p>
                @endforeach
            </section>
        @endforeach
        <p class="mt-10 rounded-xl bg-amber-50 p-4 text-slate-800">{{ $post['cta'] }}</p>
        <a href="{{ $wa }}" class="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-white">WhatsApp</a>
    </article>
</main>
@endsection
