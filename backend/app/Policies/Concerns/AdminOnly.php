<?php

namespace App\Policies\Concerns;

use App\Models\User;

trait AdminOnly
{
    public function before(User $user, string $ability): ?bool
    {
        return $user->role === 'admin' ? true : false;
    }
}
