<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Register a new user
    public function register(Request $request)
    {
        // Validation directe par Request
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create user
        $user = User::create([
            'name' => $request->nom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return success
        return response()->json([
            'status' => true,
            'message' => 'Registered successfully',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    // Login user
    public function login(Request $request)
    {
        // Validation directe par Request
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Check if email and password match
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => false,
                'message' => 'Wrong email or password'
            ], 401);
        }

        // Get user
        $user = User::where('email', $request->email)->first();

        // Remove old tokens
        $user->tokens()->delete();

        // Create new token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return success
        return response()->json([
            'status' => true,
            'message' => 'Logged in successfully',
            'user' => $user,
            'token' => $token
        ]);
    }

    // Logout user
    public function logout(Request $request)
    {
        // Remove all tokens
        $request->user()->tokens()->delete();

        // Return success
        return response()->json(['message' => 'Logged out successfully']);
    }
}