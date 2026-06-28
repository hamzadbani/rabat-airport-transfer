<x-layouts.dashboard
    :title="__('dashboard.pages.dashboard.title')"
    :subtitle="__('dashboard.pages.dashboard.subtitle')"
    :show-week-range="true"
    :week-start="$weekStart"
    :week-end="$weekEnd"
>
    <section class="dashboard-panel">
        <div class="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <h2 class="font-display text-lg font-semibold text-slate-900">{{ __('dashboard.charts.section') }}</h2>
            <p class="text-sm text-slate-500">
                <span class="font-semibold text-slate-800">{{ number_format($totalReservations) }}</span> {{ __('dashboard.stats.total_reservations') }}
                <span class="mx-1">·</span>
                <span class="font-semibold text-slate-800">{{ number_format($driverCount) }}</span> {{ __('dashboard.stats.drivers') }}
                <span class="mx-1">·</span>
                <span class="font-semibold text-emerald-600">{{ number_format($todayCount) }}</span> {{ __('dashboard.stats.today') }}
            </p>
        </div>

        <div class="grid gap-5 lg:grid-cols-3">
            <div class="dashboard-chart-card">
                <h3 class="mb-3 text-sm font-semibold text-slate-700">{{ __('dashboard.charts.by_status') }}</h3>
                <div class="flex min-h-[220px] items-center justify-center">
                    <canvas id="chart-status"></canvas>
                </div>
            </div>

            <div class="dashboard-chart-card">
                <h3 class="mb-3 text-sm font-semibold text-slate-700">{{ __('dashboard.charts.daily') }}</h3>
                <div class="min-h-[220px]">
                    <canvas id="chart-daily"></canvas>
                </div>
            </div>

            <div class="dashboard-chart-card">
                <h3 class="mb-3 text-sm font-semibold text-slate-700">{{ __('dashboard.charts.top_drivers') }}</h3>
                <div class="min-h-[220px]">
                    <canvas id="chart-drivers"></canvas>
                </div>
            </div>
        </div>
    </section>

    <section class="dashboard-panel mt-5">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 class="font-display text-lg font-semibold text-slate-900">{{ __('dashboard.charts.calendar') }}</h2>
            <div class="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5 text-xs font-medium" x-data="{ view: 'timeGridWeek' }">
                <button type="button" @click="view='timeGridWeek'; window.dashboardCalendar?.changeView('timeGridWeek')" class="rounded-full px-3 py-1.5 transition" :class="view==='timeGridWeek' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'">{{ __('dashboard.charts.week') }}</button>
                <button type="button" @click="view='timeGridDay'; window.dashboardCalendar?.changeView('timeGridDay')" class="rounded-full px-3 py-1.5 transition" :class="view==='timeGridDay' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'">{{ __('dashboard.charts.day') }}</button>
            </div>
        </div>
        <div id="dashboard-calendar" class="dashboard-calendar"></div>
    </section>

    @push('head')
        <link href="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.css" rel="stylesheet">
    @endpush

    @push('scripts')
        <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                const calendarEl = document.getElementById('dashboard-calendar');
                if (calendarEl && window.FullCalendar) {
                    window.dashboardCalendar = new FullCalendar.Calendar(calendarEl, {
                        initialView: 'timeGridWeek',
                        initialDate: @json($calendarDate),
                        locale: @json(app()->getLocale()),
                        height: 'auto',
                        slotMinTime: '06:00:00',
                        slotMaxTime: '24:00:00',
                        allDaySlot: false,
                        nowIndicator: true,
                        headerToolbar: {
                            left: 'prev,next today',
                            center: 'title',
                            right: '',
                        },
                        buttonText: {
                            today: @json(__('dashboard.charts.today_btn')),
                        },
                        events: @json($calendarEvents),
                        eventClick(info) {
                            window.location.href = @json(route('dashboard.reservations')) + '?detail=' + info.event.id;
                        },
                    });
                    window.dashboardCalendar.render();
                }

                @php
                    $statusChartData = [
                        'planned' => (int) ($statusCounts['planned'] ?? 0),
                        'confirmed' => (int) ($statusCounts['confirmed'] ?? 0),
                        'cancelled' => (int) ($statusCounts['cancelled'] ?? 0),
                    ];
                @endphp
                const statusData = @json($statusChartData);
                new Chart(document.getElementById('chart-status'), {
                    type: 'doughnut',
                    data: {
                        labels: [@json(__('dashboard.status.planned')), @json(__('dashboard.status.confirmed')), @json(__('dashboard.status.cancelled'))],
                        datasets: [{
                            data: [statusData.planned, statusData.confirmed, statusData.cancelled],
                            backgroundColor: ['#f59e0b', '#16a34a', '#ef4444'],
                            borderWidth: 0,
                        }],
                    },
                    options: {
                        cutout: '62%',
                        plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true } } },
                    },
                });

                const dailyLabels = @json(array_keys($dailyCounts));
                const dailyValues = @json(array_values($dailyCounts));
                new Chart(document.getElementById('chart-daily'), {
                    type: 'line',
                    data: {
                        labels: dailyLabels.map(d => d.slice(5)),
                        datasets: [{
                            label: @json(__('dashboard.stats.total_reservations')),
                            data: dailyValues,
                            borderColor: '#16a34a',
                            backgroundColor: 'rgba(22, 163, 74, 0.08)',
                            fill: true,
                            tension: 0.35,
                            pointRadius: 0,
                            borderWidth: 2,
                        }],
                    },
                    options: {
                        scales: { x: { ticks: { maxTicksLimit: 8 }, grid: { display: false } }, y: { beginAtZero: true, ticks: { precision: 0 } } },
                        plugins: { legend: { display: false } },
                    },
                });

                const driverLabels = @json($topDrivers->pluck('name'));
                const driverValues = @json($topDrivers->pluck('total'));
                const driverColors = driverLabels.map((_, i) => i % 2 === 0 ? '#7c3aed' : '#c4b5fd');
                new Chart(document.getElementById('chart-drivers'), {
                    type: 'bar',
                    data: {
                        labels: driverLabels,
                        datasets: [{ data: driverValues, backgroundColor: driverColors, borderRadius: 6, barThickness: 18 }],
                    },
                    options: {
                        indexAxis: 'y',
                        scales: { x: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: '#f1f5f9' } }, y: { grid: { display: false } } },
                        plugins: { legend: { display: false } },
                    },
                });
            });
        </script>
    @endpush
</x-layouts.dashboard>
