<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Register a new user
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        try {
            Log::info('Tentative d\'inscription avec les données:', [
                'email' => $request->email,
                'nom' => $request->nom,
                'has_password' => !empty($request->password),
                'has_confirmation' => !empty($request->password_confirmation),
            ]);
            
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => [
                    'required',
                    'string',
                    'min:8',
                    'confirmed',
                ],
            ]);

            if ($validator->fails()) {
                Log::warning('Erreurs de validation lors de l\'inscription:', [
                    'errors' => $validator->errors()->toArray()
                ]);
                
                return response()->json([
                    'status' => false,
                    'message' => 'Erreurs de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Create user
            $user = User::create([
                'name' => $request->nom,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Create token
            $token = $user->createToken('auth_token')->plainTextToken;
            
            Log::info('Utilisateur inscrit avec succès', ['user_id' => $user->id]);
            
            return response()->json([
                'status' => true,
                'message' => 'Inscription réussie',
                'user' => $user,
                'token' => $token
            ], 201);
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'inscription:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => false,
                'message' => 'Erreur lors de l\'inscription: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Login user
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        try {
            Log::info('Tentative de connexion avec:', ['email' => $request->email]);
            
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Erreurs de validation',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Check credentials
            if (!Auth::attempt($request->only('email', 'password'))) {
                Log::warning('Échec de connexion avec des identifiants invalides', [
                    'email' => $request->email
                ]);
                
                return response()->json([
                    'status' => false,
                    'message' => 'Email ou mot de passe incorrect'
                ], 401);
            }
            
            $user = User::where('email', $request->email)->firstOrFail();
            
            // Revoke all previous tokens
            $user->tokens()->delete();
            
            // Create new token
            $token = $user->createToken('auth_token')->plainTextToken;
            
            Log::info('Connexion réussie', ['user_id' => $user->id]);

            return response()->json([
                'status' => true,
                'message' => 'Connexion réussie',
                'user' => $user,
                'token' => $token
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la connexion:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => false,
                'message' => 'Erreur lors de la connexion: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Logout user
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Si tu utilises un token classique, tu peux supprimer celui-ci comme suit
        $request->user()->tokens->each(function ($token) {
            $token->delete(); // Supprime tous les tokens API liés à l'utilisateur
        });
    
        return response()->json(['message' => 'Déconnecté avec succès']);
    }
} 