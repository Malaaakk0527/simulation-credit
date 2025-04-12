<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Simulation;
use Illuminate\Http\Request;

class SimulationController extends Controller
{
    public function store(Request $request)
    {
        // Validation des données reçues
        $validated = $request->validate([
            'id_user' => 'required|exists:users,id_user',
            'id_type_credit' => 'required|exists:credit_types,id_type_credit',
            'montant' => 'required|numeric',
            'duree' => 'required|numeric|min:1|max:25', // Durée de 1 à 25 ans
        ]);

        // Définir le taux d'intérêt et les limites en fonction du type de crédit
        $taux = 0;
        $maxMontant = 0;
        $minMontant = 5000;

        // Récupérer les informations du type de crédit
        if ($validated['id_type_credit'] == 1) { // Exemple : 1 = crédit immobilier
            $taux = 4.2 / 100; // Taux immobilier
            $maxMontant = 10000000; // Montant maximum pour l'immobilier
        } elseif ($validated['id_type_credit'] == 2) { // Exemple : 2 = crédit consommation
            $taux = 6.5 / 100; // Taux consommation
            $maxMontant = 300000; // Montant maximum pour la consommation
        } else {
            return response()->json(['error' => 'Type de crédit invalide.'], 400);
        }

        // Vérification des conditions (montant et durée)
        if ($validated['montant'] < $minMontant || $validated['montant'] > $maxMontant) {
            return response()->json(['error' => 'Montant non valide.'], 400);
        }

        // Calcul du paiement mensuel en fonction du montant et de la durée
        $montant = $validated['montant'];
        $duree = $validated['duree'];
        $r = $taux / 12; // Taux mensuel
        $n = $duree * 12; // Nombre total de mensualités
        $M = $montant * ($r * pow(1 + $r, $n)) / (pow(1 + $r, $n) - 1); // Formule d'amortissement

        // Sauvegarder la simulation avec le paiement mensuel calculé
        $simulation = Simulation::create([
            'id_user' => $validated['id_user'],
            'id_type_credit' => $validated['id_type_credit'],
            'montant' => $montant,
            'duree' => $duree,
            'mensualite' => round($M, 2), // Arrondir le paiement mensuel
        ]);

        return response()->json($simulation, 201);
    }

    // Méthode pour récupérer les simulations d'un utilisateur
    public function getUserSimulations($userId)
    {
        $simulations = Simulation::where('id_user', $userId)
            ->with('creditType')
            ->get();
        return response()->json($simulations);
    }

    // Méthode pour afficher une simulation spécifique
    public function show($id)
    {
        $simulation = Simulation::with(['user', 'creditType'])->find($id);
        return response()->json($simulation);
    }
    public function destroy($id)
{
    $simulation = Simulation::find($id);

    if (!$simulation) {
        return response()->json(['error' => 'Simulation non trouvée.'], 404);
    }

    $simulation->delete();

    return response()->json(['message' => 'Simulation supprimée avec succès.']);
}
}