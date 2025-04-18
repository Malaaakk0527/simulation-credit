<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::create('credit_types', function (Blueprint $table) {
            $table->id('id_type_credit');
            $table->string('nom_type');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Insertion des types de crédit par défaut
        DB::table('credit_types')->insert([
            ['nom_type' => 'immobilier', 'description' => 'Crédit immobilier avec taux fixe de 4.2%'],
            ['nom_type' => 'consommation', 'description' => 'Crédit à la consommation avec taux fixe de 6.5%']
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('credit_types');
    }
}; 