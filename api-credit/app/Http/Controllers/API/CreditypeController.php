<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CreditType;
use Illuminate\Http\Request;

class CreditypeController extends Controller
{
    public function index()
    {
        $creditTypes = CreditType::all();
        return response()->json($creditTypes);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
        ]);
        
        $creditType = CreditType::create([
            'nom' => $validated['nom'],
        ]);
        
        return response()->json($creditType, 201);
    }

    public function show($id)
    {
        $creditType = CreditType::find($id);
        
        if (!$creditType) {
            return response()->json(['error' => 'Type de crédit non trouvé'], 404);
        }
        
        return response()->json($creditType);
    }
}