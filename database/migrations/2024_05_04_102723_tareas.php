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
        Schema::create('tareas', function (Blueprint $table) {
            $table->id('id_entrega');
            $table->unsignedBigInteger('id_curso');
            $table->string('nombre_entrega');
            $table->integer('puntuacion_maxima')->between(0, 100);
            $table->date('fecha_inicio');
            $table->date('fecha_final');
            $table->integer('parcial_entrega')->between(1, 3);
            $table->foreign('id_curso')->references('id_curso')->on('cursos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tareas');
    }
};
