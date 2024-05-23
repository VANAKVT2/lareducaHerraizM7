<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CursoController;
use App\Http\Controllers\Api\ParticipacionController;
use App\Http\Controllers\Api\TareaController;
use App\Http\Controllers\Api\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/participaciones', ParticipacionController::class);
    Route::apiResource('/cursos', CursoController::class);
    Route::delete('/participaciones/{id_usuario}/{id_curso}', [ParticipacionController::class, 'destroy']);
    Route::apiResource('/tareas', TareaController::class);
    Route::post('/puntuaciones', [UserController::class, 'puntuarJuego']);
});

Route::post("/signup", [AuthController::class, "signup"]);
Route::post("/login", [AuthController::class, "login"]);
