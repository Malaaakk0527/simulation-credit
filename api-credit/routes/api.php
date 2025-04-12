<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\SimulationController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CreditypeController;

// Routes pour les simulations (authentifiées)
Route::middleware('auth:sanctum')->post('/simulations', [SimulationController::class, 'store']);
Route::middleware('auth:sanctum')->get('/simulations/{id}', [SimulationController::class, 'show']);
Route::middleware('auth:sanctum')->get('/users/{userId}/simulations', [SimulationController::class, 'getUserSimulations']);
Route::middleware('auth:sanctum')->delete('/simulations/{id}', [SimulationController::class, 'destroy']);

// Routes pour les types de crédit
Route::get('/credit-types', [CreditypeController::class, 'index']);
Route::get('/credit-types/{id}', [CreditypeController::class, 'show']);

// Route pour se connecter
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Route pour obtenir l'utilisateur authentifié
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
