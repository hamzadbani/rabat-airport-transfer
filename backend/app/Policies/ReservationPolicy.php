<?php

namespace App\Policies;

use App\Models\Reservation;
use App\Models\User;
use App\Policies\Concerns\AdminOnly;

class ReservationPolicy
{
    use AdminOnly;

    public function viewAny(User $user): bool
    {
        return false;
    }

    public function view(User $user, Reservation $reservation): bool
    {
        return false;
    }

    public function create(User $user): bool
    {
        return false;
    }

    public function update(User $user, Reservation $reservation): bool
    {
        return false;
    }

    public function delete(User $user, Reservation $reservation): bool
    {
        return false;
    }
}
