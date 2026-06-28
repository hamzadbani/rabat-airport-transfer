<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\UpdateProfileRequest;
use App\Models\DispatchSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ProfileController extends Controller
{
    public function edit(): View
    {
        return view('dashboard.profile.edit', [
            'settings' => DispatchSetting::instance(),
        ]);
    }

    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        $user->email = $validated['email'];
        if (! empty($validated['password'])) {
            $user->password = $validated['password'];
        }
        $user->save();

        DispatchSetting::instance()->update([
            'reservation_reminder_minutes' => $validated['reservation_reminder_minutes'],
        ]);

        return back()->with('success', __('dashboard.profile.saved'));
    }
}
