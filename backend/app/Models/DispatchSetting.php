<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DispatchSetting extends Model
{
    public $incrementing = false;

    protected $primaryKey = 'id';

    protected $fillable = ['id', 'reservation_reminder_minutes'];

    protected function casts(): array
    {
        return [
            'id' => 'integer',
        ];
    }
}
