<?php

namespace App\Http\Controllers\API;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Recherche l'utilisateur par email
        $user = User::where("email", $request->email)->first();

        // Vérifie si l'utilisateur existe et si le mot de passe correspond
        if (!$user || !Hash::check($request->password, $user->password)) {
            // Si l'utilisateur n'existe pas ou si le mot de passe est incorrect
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Si le mot de passe est correct, crée le token
        $token = $user->createToken($user->name)->plainTextToken;

        // Retourne la réponse avec le token et les données utilisateur
        return response()->json(['user' => $user, 'token' => $token], 200);
    }


    public function register(Request $request)
{
    // Validation des champs
    $request->validate([
        'nom' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6|confirmed',
    ]);

    // Création de l'utilisateur
    $user = User::create([
        'nom' => $request->nom,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    // Génération du token
    $token = $user->createToken($user->name)->plainTextToken;

    return response()->json([
        'user' => $user,
        'token' => $token
    ], 201);
}
public function logout(Request $request)
{
    // Supprime le token d'accès actuel
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Déconnexion réussie.'
    ]);
}
}
