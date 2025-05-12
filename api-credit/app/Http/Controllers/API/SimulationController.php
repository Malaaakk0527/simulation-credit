<?php

namespace App\Http\Controllers\API;

use App\Models\Simulation;
use App\Models\CreditType;
use Illuminate\Http\JsonResponse;
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
    
        $creditType = CreditType::find($id_type_credit);
        
        $tauxAnnuel = $creditType->nom_type === 'consommation' ? 0.065 : 0.042;
        $tauxMensuel = $tauxAnnuel / 12;
        $nombreMensualites = $duree * 12;
    
       
      
        
        $mensualite = $montant * ($tauxMensuel * pow(1 + $tauxMensuel, $nombreMensualites)) 
                     / (pow(1 + $tauxMensuel, $nombreMensualites) - 1);
    
        return response()->json([
            'success' => true,
            'data' => [
                'type_credit' => $creditType->nom_type,
                'montant' => $montant,
                'mensualite' => round($mensualite, 2),
                'duree' => $duree,
                'taux_annuel' => number_format($tauxAnnuel * 100, 1, ',', '') . '%',
                'cout_total' => round(($mensualite * $nombreMensualites) - $montant, 2) // Coût des intérêts seuls
            ]
        ]);
    }

    public function saveSimulation(Request $request)
    {
        $request->validate([
            'montant' => 'required|numeric|min:1000',
            'duree' => 'required|integer|min:1|max:30',
            'id_type_credit' => 'required|exists:credit_types,id_type_credit',
            'mensualite' => 'required|numeric'
        ]);

        $montant = $request->montant;
        $duree = $request->duree;
        $id_type_credit = $request->id_type_credit;
        $mensualite = $request->mensualite;
        $userId = Auth::id();
        // verifier mensualite si il est correcte 
if{
    $mensualite = $montant * ($tauxMensuel * pow(1 + $tauxMensuel, $nombreMensualites)) 
                     / (pow(1 + $tauxMensuel, $nombreMensualites) - 1);
}
        
        try {
            $simulation = Simulation::create([
                'id_user' => $userId,
                'id_type_credit' => $id_type_credit,
                'montant' => $montant,
                'mensualite' => round($mensualite, 2),
                'duree' => $duree
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Simulation enregistrée avec succès',
                'data' => [
                    'simulation_id' => $simulation->id_simulation
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'enregistrement de la simulation'
            ], status: 500);
        }
    }

    public function getSimulations()
    {
        $simulations = Simulation::with('creditType')
            ->where('id_user', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($simulations);
    }
}