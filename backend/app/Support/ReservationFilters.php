<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ReservationFilters
{
    public static function fromRequest(Request $request): array
    {
        return [
            'archive' => $request->query('archive', 'active'),
            'status' => $request->query('status', 'all'),
            'date' => $request->query('date', ''),
        ];
    }

    public static function apply(Builder $query, array $filters): Builder
    {
        $archive = $filters['archive'] ?? 'active';
        $status = $filters['status'] ?? 'all';

        if ($archive === 'active') {
            $query->where('is_archived', false);
        } elseif ($archive === 'archive') {
            $query->where('is_archived', true);
        }

        if (in_array($status, ['planned', 'confirmed', 'cancelled'], true)) {
            $query->where('status', $status);
        }

        if (! empty($filters['date'])) {
            $query->whereDate('date', $filters['date']);
        }

        return $query;
    }
}
