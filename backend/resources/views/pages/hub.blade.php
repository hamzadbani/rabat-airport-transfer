@extends('layouts.site')

@section('title', $hub['title'].' | '.config('site.name'))
@section('description', $hub['description'])

@section('content')
<main class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <h1 class="font-display text-3xl font-bold text-slate-900">{{ $hub['title'] }}</h1>
    <p class="mt-4 text-slate-600">{{ $hub['description'] }}</p>
    <ul class="mt-8 space-y-3">
        @foreach ($hub['links'] as $link)
            <li>
                <a href="{{ $link['href'] }}" class="block rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-brand-secondary hover:bg-amber-50">
                    {{ $link['label'] }}
                </a>
            </li>
        @endforeach
    </ul>
</main>
@endsection
