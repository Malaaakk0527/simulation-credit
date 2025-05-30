<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\SimulationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Routes publiques pour l'authentification
Route::post('/register', [AuthController::class, 'register']); // Inscription d'un nouvel utilisateur
Route::post('/login', [AuthController::class, 'login']);       // Connexion d'un utilisateur

// Routes protégées : accessibles uniquement aux utilisateurs authentifiés via Sanctum
Route::middleware('auth:sanctum')->group(function () {

    // Récupérer les informations de l'utilisateur connecté 
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Déconnexion de l'utilisateur (suppression du token de session)
    Route::post('/logout', [AuthController::class, 'logout']);

    // Lancer un calcul de simulation (fonctionnalité protégée)
    Route::post('/simulations/calculate', [SimulationController::class, 'calculate']);
    
    // Enregistrer une simulation dans la base de données
    Route::post('/simulations/save', [SimulationController::class, 'saveSimulation']);

    // Obtenir la liste des simulations enregistrées (fonctionnalité protégée)
   
    Route::get('/getSimulations', [SimulationController::class, 'getSimulations']);
});
