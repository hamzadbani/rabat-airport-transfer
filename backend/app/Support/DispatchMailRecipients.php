<?php

namespace App\Support;

use App\Models\User;

class DispatchMailRecipients
{
    /** @return list<string> */
    public static function emails(): array
    {
        $configured = config('mail.notification_to') ?? config('mail.reminder_to');

        $emails = $configured !== null && $configured !== ''
            ? preg_split('/\s*,\s*/', (string) $configured) ?: []
            : [];

        if ($emails === []) {
            $emails = array_filter([
                config('site.email'),
            ]);
        }

        $adminEmails = User::query()
            ->where('role', 'admin')
            ->pluck('email')
            ->all();

        return array_values(array_unique(array_filter([...$emails, ...$adminEmails])));
    }
}
