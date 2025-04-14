<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Les URI qui sont exclus de la vérification CSRF.
     *
     * @var array<int, string>
     */
    protected $except = [
        "/*",
        'api/test-no-csrf',
        'sanctum/csrf-cookie',
        'api/*',
        'webhook/*',
        'api/no-csrf-endpoint',
    ];
    
    /**
     * Les noms des en-têtes qui peuvent contenir le jeton CSRF.
     *
     * @var array<int, string>
     */
    protected $headerNames = [
        'X-CSRF-TOKEN',
        'X-XSRF-TOKEN',
    ];
} 