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
        // Check if input is valid
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // If input is invalid, return error
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid input',
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
        // Check if input is valid
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // If input is invalid, return error
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid input',
                'errors' => $validator->errors()
            ], 422);
        }

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