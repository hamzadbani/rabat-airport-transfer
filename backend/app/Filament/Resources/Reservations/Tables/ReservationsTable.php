<?php

namespace App\Filament\Resources\Reservations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ReservationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('date', 'desc')
            ->columns([
                TextColumn::make('date')
                    ->label('Départ')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
                TextColumn::make('client_name')
                    ->label('Client')
                    ->searchable(),
                TextColumn::make('phone')
                    ->label('Tél.')
                    ->toggleable(),
                TextColumn::make('pickup_location')
                    ->label('Départ')
                    ->limit(28)
                    ->tooltip(fn ($record) => $record->pickup_location),
                TextColumn::make('dropoff_location')
                    ->label('Arrivée')
                    ->limit(28)
                    ->tooltip(fn ($record) => $record->dropoff_location),
                TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'confirmed' => 'success',
                        'planned' => 'warning',
                        'cancelled' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'confirmed' => 'Confirmée',
                        'planned' => 'Planifiée',
                        'cancelled' => 'Annulée',
                        default => $state,
                    }),
                TextColumn::make('price')
                    ->label('Prix')
                    ->money('MAD')
                    ->sortable(),
                TextColumn::make('driver.name')
                    ->label('Chauffeur')
                    ->placeholder('—'),
                TextColumn::make('type')
                    ->label('Source')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'planned' => 'Planifiée',
                        'confirmed' => 'Confirmée',
                        'cancelled' => 'Annulée',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
