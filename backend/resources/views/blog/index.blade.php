@extends('layouts.site')

@section('title', 'Blog taxi Rabat aéroport | '.config('site.name'))
@section('description', 'Guides prix, conseils transfert aéroport Rabat-Salé (RBA) et réservation taxi au Maroc.')

@section('content')
<main class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
    <h1 class="font-display text-3xl font-bold text-slate-900">Blog — taxi & transfert Rabat</h1>
    <p class="mt-3 text-slate-600">Guides pratiques pour l'aéroport RBA, les tarifs et la réservation.</p>
    <ul class="mt-10 space-y-4">
        @foreach ($posts as $post)
            <li class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <a href="{{ route('blog.show', $post['slug']) }}" class="text-lg font-semibold text-brand-secondary hover:underline">
                    {{ $post['title'] }}
                </a>
                <p class="mt-2 text-sm text-slate-600">{{ $post['description'] }}</p>
            </li>
        @endforeach
    </ul>
</main>
@endsection
