<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('simulations', function (Blueprint $table) {
            $table->id('id_simulation');
            $table->unsignedBigInteger('id_user');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('id_type_credit');
            $table->foreign('id_type_credit')->references('id_type_credit')->on('credit_types')->onDelete('cascade');
            $table->decimal('montant', 10, 2);
            $table->decimal('mensualite', 10, 2);
            $table->integer('duree');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('simulations');
    }
};