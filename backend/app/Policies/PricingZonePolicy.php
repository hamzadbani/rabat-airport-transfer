<?php

namespace App\Policies;

use App\Models\PricingZone;
use App\Models\User;
use App\Policies\Concerns\AdminOnly;

class PricingZonePolicy
{
    use AdminOnly;

    public function viewAny(User $user): bool
    {
        return false;
    }

    public function view(User $user, PricingZone $pricingZone): bool
    {
        return false;
    }

    public function create(User $user): bool
    {
        return false;
    }

    public function update(User $user, PricingZone $pricingZone): bool
    {
        return false;
    }

    public function delete(User $user, PricingZone $pricingZone): bool
    {
        return false;
    }
}
