<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    protected $fillable = [
        'type',
        'document_number',
        'reservation_id',
        'client_name',
        'client_email',
        'client_phone',
        'client_address',
        'client_ice',
        'trip_date',
        'trip_time',
        'pickup',
        'dropoff',
        'passengers',
        'children',
        'baggage',
        'description',
        'quantity',
        'unit_price',
        'vat_rate',
        'currency',
        'issued_at',
    ];

    protected function casts(): array
    {
        return [
            'trip_date' => 'date',
            'quantity' => 'integer',
            'unit_price' => 'decimal:2',
            'vat_rate' => 'decimal:2',
            'issued_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Invoice $invoice) {
            foreach (['client_email', 'client_phone', 'client_address', 'client_ice', 'pickup', 'dropoff', 'baggage'] as $field) {
                if ($invoice->{$field} === null) {
                    $invoice->{$field} = '';
                }
            }

            $invoice->passengers ??= 1;
            $invoice->children ??= 0;
        });
    }

    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    public function subtotal(): float
    {
        return (float) $this->quantity * (float) $this->unit_price;
    }

    public function vatAmount(): float
    {
        return $this->subtotal() * ((float) $this->vat_rate / 100);
    }

    public function total(): float
    {
        return $this->subtotal() + $this->vatAmount();
    }
}
