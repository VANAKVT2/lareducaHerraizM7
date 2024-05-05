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
        Schema::create('notas', function (Blueprint $table) {
            $table->unsignedBigInteger('id_usuario');
            $table->unsignedBigInteger('id_curso');
            $table->integer('nota_parcial_1');
            $table->integer('nota_parcial_2');
            $table->integer('nota_parcial_3');
            $table->integer('nota_final');
            $table->foreign('id_usuario')->references('id')->on('users');
            $table->foreign('id_curso')->references('id_curso')->on('cursos');
            $table->primary(['id_usuario', 'id_curso']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notas');
    }
};