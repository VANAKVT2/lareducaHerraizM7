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
        Schema::create('tareas_entregadas', function (Blueprint $table) {
            $table->unsignedBigInteger('id_entrega');
            $table->unsignedBigInteger('id_usuario');
            $table->boolean('correccion')->default(false);
            $table->integer('nota');
            $table->date('fecha_entrega');
            $table->boolean('a_tiempo')->default(true);
            $table->foreign('id_entrega')->references('id_entrega')->on('tareas');
            $table->foreign('id_usuario')->references('id')->on('users');
            $table->primary(['id_entrega', 'id_usuario']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tareas_entregadas');
    }
};
