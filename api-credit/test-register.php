<?php
/**
 * Utilitaire de test d'enregistrement
 * 
 * Usage: php test-register.php depuis la racine du projet api-credit
 */

// Une fonction pour faire une requête cURL
function request($url, $method = 'GET', $data = null, $headers = []) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    
    // Ajout de la méthode
    if ($method !== 'GET') {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    }
    
    // Ajout des données
    if ($data) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        $headers[] = 'Content-Type: application/json';
    }
    
    // Ajout des headers
    if (!empty($headers)) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    }
    
    // Conserver les cookies
    curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookies.txt');
    curl_setopt($ch, CURLOPT_COOKIEFILE, 'cookies.txt');
    
    $response = curl_exec($ch);
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $header = substr($response, 0, $header_size);
    $body = substr($response, $header_size);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    curl_close($ch);
    
    return [
        'status' => $status,
        'headers' => $header,
        'body' => $body
    ];
}

// Effacer les cookies précédents
if (file_exists('cookies.txt')) {
    unlink('cookies.txt');
}

echo "Test de l'enregistrement\n";
echo "=======================\n\n";

// Étape 1: Récupérer le cookie CSRF de Sanctum
echo "Étape 1: Récupérer le cookie CSRF...\n";
$response = request('http://localhost:8000/csrf-cookie');
echo "Statut: " . $response['status'] . "\n";

// Extraire le cookie XSRF-TOKEN
preg_match('/XSRF-TOKEN=([^;]+)/', $response['headers'], $matches);
$csrfToken = isset($matches[1]) ? urldecode($matches[1]) : null;

if ($csrfToken) {
    echo "Cookie CSRF récupéré: " . substr($csrfToken, 0, 20) . "...\n\n";
} else {
    echo "Erreur: Impossible de récupérer le cookie CSRF!\n\n";
    exit(1);
}

// Étape 2: Tentative d'enregistrement
echo "Étape 2: Tentative d'enregistrement...\n";

// Générer un email unique
$email = 'test' . time() . '@example.com';
echo "Email utilisé: $email\n";

$response = request(
    'http://localhost:8000/api/register', 
    'POST', 
    [
        'nom' => 'Test User',
        'email' => $email,
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!'
    ], 
    [
        'X-XSRF-TOKEN: ' . $csrfToken, 
        'X-Requested-With: XMLHttpRequest'
    ]
);

echo "Statut: " . $response['status'] . "\n";
echo "Réponse: " . $response['body'] . "\n\n";

 