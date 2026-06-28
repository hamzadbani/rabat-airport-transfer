<x-layouts.dashboard
    :title="__('dashboard.pages.profile.title')"
    :subtitle="__('dashboard.pages.profile.subtitle')"
>
    <form method="POST" action="{{ route('dashboard.profile.update') }}" class="max-w-lg space-y-6">
        @csrf
        @method('PUT')

        <div class="dashboard-panel">
            <h2 class="mb-4 font-display text-lg font-semibold">{{ __('dashboard.profile.account') }}</h2>
            <div class="space-y-4">
                <div>
                    <label class="mb-1 block text-sm font-medium">{{ __('dashboard.auth.email') }}</label>
                    <input type="email" name="email" value="{{ old('email', auth()->user()->email) }}" class="w-full rounded-lg border px-3 py-2 text-sm" required>
                </div>
                <div>
                    <label class="mb-1 block text-sm font-medium">{{ __('dashboard.profile.current_password') }}</label>
                    <input type="password" name="current_password" class="w-full rounded-lg border px-3 py-2 text-sm" autocomplete="current-password">
                </div>
                <div>
                    <label class="mb-1 block text-sm font-medium">{{ __('dashboard.profile.new_password') }}</label>
                    <input type="password" name="password" class="w-full rounded-lg border px-3 py-2 text-sm" autocomplete="new-password">
                </div>
                <div>
                    <label class="mb-1 block text-sm font-medium">{{ __('dashboard.profile.confirm_password') }}</label>
                    <input type="password" name="password_confirmation" class="w-full rounded-lg border px-3 py-2 text-sm" autocomplete="new-password">
                </div>
            </div>
        </div>

        <div class="dashboard-panel">
            <h2 class="mb-4 font-display text-lg font-semibold">{{ __('dashboard.profile.reminders') }}</h2>
            <label class="mb-1 block text-sm font-medium">{{ __('dashboard.profile.reminder_minutes') }}</label>
            <input type="number" name="reservation_reminder_minutes" value="{{ old('reservation_reminder_minutes', $settings->reservation_reminder_minutes) }}" min="0" max="1440" step="5" class="w-full rounded-lg border px-3 py-2 text-sm" required>
        </div>

        <div class="dashboard-panel">
            <h2 class="mb-4 font-display text-lg font-semibold">{{ __('dashboard.profile.notifications') }}</h2>
            <button type="button" id="enable-push" class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">{{ __('dashboard.profile.enable_push') }}</button>
            <p id="push-status" class="mt-2 text-xs text-slate-500"></p>
        </div>

        <button type="submit" class="dashboard-btn-primary">{{ __('dashboard.common.save') }}</button>
    </form>

    @push('scripts')
        <script>
            document.getElementById('enable-push')?.addEventListener('click', async () => {
                const status = document.getElementById('push-status');
                if (!('Notification' in window)) { status.textContent = @json(__('dashboard.profile.push_unsupported')); return; }
                const permission = await Notification.requestPermission();
                status.textContent = permission === 'granted' ? @json(__('dashboard.profile.push_granted')) : @json(__('dashboard.profile.push_denied'));
            });
        </script>
    @endpush
</x-layouts.dashboard>
