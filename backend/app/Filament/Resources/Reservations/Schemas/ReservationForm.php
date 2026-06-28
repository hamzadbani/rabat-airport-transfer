<?php

namespace App\Filament\Resources\Reservations\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ReservationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('client_name')
                    ->label('Client')
                    ->required()
                    ->maxLength(190),
                TextInput::make('phone')
                    ->label('Téléphone')
                    ->tel()
                    ->required(),
                TextInput::make('pickup_location')
                    ->label('Départ')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('dropoff_location')
                    ->label('Arrivée')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('flight_number')
                    ->label('N° vol')
                    ->maxLength(32),
                DateTimePicker::make('date')
                    ->label('Date / heure départ')
                    ->required(),
                DateTimePicker::make('end_at')
                    ->label('Fin (optionnel)'),
                Select::make('status')
                    ->label('Statut')
                    ->options([
                        'planned' => 'Planifiée',
                        'confirmed' => 'Confirmée',
                        'cancelled' => 'Annulée',
                    ])
                    ->required()
                    ->default('planned'),
                TextInput::make('price')
                    ->label('Prix (MAD)')
                    ->numeric()
                    ->default(0),
                TextInput::make('passengers')
                    ->label('Passagers')
                    ->numeric()
                    ->default(1)
                    ->minValue(1),
                TextInput::make('children_count')
                    ->label('Enfants')
                    ->numeric()
                    ->default(0),
                TextInput::make('baggage')
                    ->label('Bagages')
                    ->maxLength(255),
                Select::make('driver_id')
                    ->label('Chauffeur')
                    ->relationship('driver', 'name')
                    ->searchable()
                    ->preload(),
                Select::make('type')
                    ->label('Source')
                    ->options([
                        'site web' => 'Site web',
                        'byAdmin' => 'Admin',
                    ])
                    ->default('byAdmin'),
            ])
            ->columns(2);
    }
}
