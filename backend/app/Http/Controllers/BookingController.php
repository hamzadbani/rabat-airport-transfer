<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'client_name' => ['required', 'string', 'max:190'],
            'phone' => ['required', 'string', 'max:64'],
            'pickup_location' => ['required', 'string', 'max:500'],
            'dropoff_location' => ['required', 'string', 'max:500'],
            'date' => ['required', 'date'],
            'time' => ['required', 'date_format:H:i'],
            'flight_number' => ['nullable', 'string', 'max:32'],
            'passengers' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $datetime = $validated['date'].' '.$validated['time'].':00';

        Reservation::create([
            'client_name' => $validated['client_name'],
            'phone' => $validated['phone'],
            'pickup_location' => $validated['pickup_location'],
            'dropoff_location' => $validated['dropoff_location'],
            'flight_number' => $validated['flight_number'] ?? '',
            'date' => $datetime,
            'passengers' => $validated['passengers'] ?? 1,
            'status' => 'planned',
            'type' => 'site web',
        ]);

        $message = implode("\n", [
            'Bonjour Taxi Rabat Airport,',
            'Je souhaite réserver un transfert :',
            '*Nom* : '.$validated['client_name'],
            '*Téléphone* : '.$validated['phone'],
            '*Départ* : '.$validated['pickup_location'],
            '*Arrivée* : '.$validated['dropoff_location'],
            '*Date* : '.$validated['date'],
            '*Heure* : '.$validated['time'],
            '*N° vol* : '.($validated['flight_number'] ?? '—'),
            '*Passagers* : '.($validated['passengers'] ?? 1),
        ]);

        $whatsapp = config('site.whatsapp');
        $url = 'https://wa.me/'.$whatsapp.'?text='.rawurlencode($message);

        return redirect()->away($url);
    }
}
