@php
    $items = \App\Support\DashboardNavigation::items();
@endphp

<aside
    id="dashboard-sidebar"
    class="dashboard-sidebar fixed inset-y-0 left-0 z-50 flex w-[15.5rem] flex-col"
>
    <x-dashboard.brand variant="sidebar" />

    <nav class="min-h-0 flex-1 overflow-y-auto px-3 py-4" aria-label="{{ __('dashboard.nav.main') }}">
        <ul class="space-y-0.5">
            @foreach ($items as $item)
                @php $active = request()->routeIs($item['match']); @endphp
                <li>
                    <a
                        href="{{ route($item['route']) }}"
                        data-dashboard-sidebar-close
                        @class([
                            'dashboard-nav-link',
                            'dashboard-nav-link-active' => $active,
                        ])
                    >
                        <x-dashboard.icon :name="$item['icon']" class="h-[1.125rem] w-[1.125rem] shrink-0" />
                        <span>{{ __($item['label']) }}</span>
                    </a>
                </li>
            @endforeach
        </ul>
    </nav>

    <div class="shrink-0 border-t border-white/10 p-3">
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="dashboard-nav-link w-full border-0 bg-transparent text-left">
                <x-dashboard.icon name="logout" class="h-[1.125rem] w-[1.125rem] shrink-0" />
                <span>{{ __('dashboard.nav.logout') }}</span>
            </button>
        </form>
    </div>
</aside>
