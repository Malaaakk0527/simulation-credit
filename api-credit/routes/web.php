<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CreditypeController;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// Routes pour les types de crédit (accessibles depuis le frontend)
Route::post('/credit-types', [CreditypeController::class, 'store']);

require __DIR__.'/auth.php';
