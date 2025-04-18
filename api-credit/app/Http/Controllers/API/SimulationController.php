<?php

namespace App\Http\Controllers\API;

use App\Models\Simulation;
use App\Models\CreditType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class SimulationController extends Controller
{
    public function calculate(Request $request)
    {
        $request->validate([
            'montant' => 'required|numeric|min:1000',
            'duree' => 'required|integer|min:1|max:30',
            'id_type_credit' => 'required|exists:credit_types,id_type_credit'
        ]);

        $montant = $request->montant;
        $duree = $request->duree;
        $id_type_credit = $request->id_type_credit;

        // Récupérer le type de crédit
        $creditType = CreditType::find($id_type_credit);
        
        // Définir le taux d'intérêt en fonction du type de crédit
        $tauxAnnuel = 0;
        if ($creditType->nom_type === 'consommation') {
            $tauxAnnuel = 0.065; // 6.5% pour crédit consommation
        } elseif ($creditType->nom_type === 'immobilier') {
            $tauxAnnuel = 0.042; // 4.2% pour crédit immobilier
        }

        // Calculer les mensualités
        $tauxMensuel = $tauxAnnuel / 12;
        $nombreMensualites = $duree * 12;
        
        // Formule de calcul de la mensualité
        $mensualite = $montant * ($tauxMensuel * pow(1 + $tauxMensuel, $nombreMensualites)) 
                     / (pow(1 + $tauxMensuel, $nombreMensualites) - 1);

        // Créer la simulation
        $simulation = Simulation::create([
            'id_user' => Auth::id(),
            'id_type_credit' => $id_type_credit,
            'montant' => $montant,
            'mensualite' => round($mensualite, 2),
            'duree' => $duree
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'simulation_id' => $simulation->id_simulation,
                'type_credit' => $creditType->nom_type,
                'montant' => $montant,
                'mensualite' => round($mensualite, 2),
                'duree' => $duree,
                'taux_annuel' => ($tauxAnnuel * 100) . '%',
                'cout_total' => round($mensualite * $nombreMensualites, 2)
            ]
        ]);
    }

    public function index()
    {
        $simulations = Simulation::with('creditType')
            ->where('id_user', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['simulations' => $simulations]);
    }

    
} 