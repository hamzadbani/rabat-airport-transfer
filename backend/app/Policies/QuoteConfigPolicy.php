<?php

namespace App\Policies;

use App\Models\QuoteConfig;
use App\Models\User;
use App\Policies\Concerns\AdminOnly;

class QuoteConfigPolicy
{
    use AdminOnly;

    public function viewAny(User $user): bool
    {
        return false;
    }

    public function view(User $user, QuoteConfig $quoteConfig): bool
    {
        return false;
    }

    public function create(User $user): bool
    {
        return false;
    }

    public function update(User $user, QuoteConfig $quoteConfig): bool
    {
        return false;
    }

    public function delete(User $user, QuoteConfig $quoteConfig): bool
    {
        return false;
    }
}
