<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreParticipacionRequest;
use App\Http\Requests\UpdateParticipacionRequest;
use App\Http\Resources\ParticipacionResource;
use App\Models\Participacion;
use Illuminate\Support\Facades\Log;

class ParticipacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $participaciones = Participacion::orderBy('id_curso', 'asc')->paginate(10);
        return ParticipacionResource::collection($participaciones);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreParticipacionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreParticipacionRequest $request)
    {
        $data = $request->validated();
        $participacion = Participacion::create($data);
        return response(new ParticipacionResource($participacion), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Participacion  $participacion
     * @return \Illuminate\Http\Response
     */
    public function show(Participacion $participacion)
    {
        return new ParticipacionResource($participacion);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateParticipacionRequest  $request
     * @param  \App\Models\Participacion  $participacion
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateParticipacionRequest $request, Participacion $participacion)
    {
        $data = $request->validated();
        $participacion->update($data);
        return new ParticipacionResource($participacion);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Participacion  $participacion
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_usuario, $id_curso)
    {
        $mysqli = new \mysqli("localhost", "root", "", "lareduca");
        $DELETE = $mysqli->query("DELETE FROM participacion WHERE id_usuario = $id_usuario AND id_curso = $id_curso");
        $result = $mysqli->query("SELECT id_usuario FROM participacion WHERE id_curso = $id_curso AND id_usuario = $id_usuario");
        $resultString = "";
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $resultString .= $row["id_usuario"] . ", ";
            }
        }
        Log::alert("BORRADO EL USUARIO: " . rtrim($resultString, ", DEL CURSO CON ID "));
    }
}
