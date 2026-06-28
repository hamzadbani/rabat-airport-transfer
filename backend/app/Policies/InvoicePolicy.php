<?php

namespace App\Policies;

use App\Models\Invoice;
use App\Models\User;
use App\Policies\Concerns\AdminOnly;

class InvoicePolicy
{
    use AdminOnly;

    public function viewAny(User $user): bool
    {
        return false;
    }

    public function view(User $user, Invoice $invoice): bool
    {
        return false;
    }

    public function create(User $user): bool
    {
        return false;
    }

    public function update(User $user, Invoice $invoice): bool
    {
        return false;
    }

    public function delete(User $user, Invoice $invoice): bool
    {
        return false;
    }
}
