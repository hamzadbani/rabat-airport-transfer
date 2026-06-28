<?php

namespace App\Filament\Resources\Drivers\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class DriverForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nom')
                    ->required(),
                TextInput::make('phone')
                    ->label('Téléphone')
                    ->tel()
                    ->required(),
                TextInput::make('vehicle')
                    ->label('Véhicule')
                    ->columnSpanFull(),
                TextInput::make('rating')
                    ->label('Note')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(5)
                    ->step(0.01)
                    ->default(0),
                Textarea::make('notes')
                    ->label('Notes')
                    ->columnSpanFull(),
            ])
            ->columns(2);
    }
}
