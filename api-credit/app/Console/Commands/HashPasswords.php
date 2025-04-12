<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class HashPasswords extends Command
{
    // Nom de la commande artisan
    protected $signature = 'users:hash-passwords';
    
    // Description de la commande
    protected $description = 'Hash all plain text passwords in the users table';

    public function __construct()
    {
        parent::__construct();
    }

    // Méthode qui va être exécutée
    public function handle()
    {
        // Récupère tous les utilisateurs
        $users = User::all();

        foreach ($users as $user) {
            // Si le mot de passe n'est pas déjà haché (non bcrypt)
            if (!preg_match('/^\$2y\$/', $user->password)) {
                // Hache le mot de passe
                $user->password = Hash::make($user->password);
                $user->save(); // Sauvegarde l'utilisateur avec le mot de passe haché
                $this->info('Password hashed for user: ' . $user->email); // Affiche un message dans la console
            }
        }

        $this->info('All passwords have been hashed!');
    }
}
