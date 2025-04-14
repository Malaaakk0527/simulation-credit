<?php

use Illuminate\Support\Facades\Route;

// Manual CSRF cookie route with CORS headers
Route::options('sanctum/csrf-cookie', function () {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', 'http://localhost:3000')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-XSRF-TOKEN, X-CSRF-TOKEN, Authorization, Accept, Origin')
        ->header('Access-Control-Allow-Credentials', 'true')
        ->header('Access-Control-Max-Age', '86400');
});
