<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('simulations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user'); // Clé étrangère vers la table users
            $table->unsignedBigInteger('id_type_credit'); // Clé étrangère vers la table credit_types
            $table->decimal('montant', 10, 2); // Montant du crédit
            $table->decimal('mensualite', 10, 2); // Mensualité calculée pour la simulation
            $table->timestamps();

            // Définir les relations
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_type_credit')->references('id_type_credit')->on('credit_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simulations');
    }
};