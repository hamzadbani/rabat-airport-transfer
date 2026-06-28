<?php

namespace App\Policies;

use App\Models\Driver;
use App\Models\User;
use App\Policies\Concerns\AdminOnly;

class DriverPolicy
{
    use AdminOnly;

    public function viewAny(User $user): bool
    {
        return false;
    }

    public function view(User $user, Driver $driver): bool
    {
        return false;
    }

    public function create(User $user): bool
    {
        return false;
    }

    public function update(User $user, Driver $driver): bool
    {
        return false;
    }

    public function delete(User $user, Driver $driver): bool
    {
        return false;
    }
}
