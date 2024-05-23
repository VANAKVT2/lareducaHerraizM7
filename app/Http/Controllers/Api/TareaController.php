<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tarea;
use App\Http\Requests\StoreTareaRequest;
use App\Http\Requests\UpdateTareaRequest;
use App\Http\Resources\TareaResource;
use Illuminate\Http\Response;

class TareaController extends Controller
{
    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return TareaResource::collection(
            Tarea::query()->orderBy('id_entrega', 'asc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     * @param  \App\Http\Requests\StoreTareaRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTareaRequest $request)
    {
        $data = $request->validated();
        $tarea = Tarea::create($data);
        return response(new TareaResource($tarea), 201);
    }

    /**
     * Display the specified resource.
     * @param  \App\Models\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function show(Tarea $tarea)
    {
        return new TareaResource($tarea);
    }

    /**
     * Update the specified resource in storage.
     * @param  \App\Http\Requests\UpdateTareaRequest  $request
     * @param  \App\Models\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTareaRequest $request, Tarea $tarea)
    {
        $data = $request->validated();
        $tarea->update($data);

        return new TareaResource($tarea);
    }
    /**
     * Remove the specified resource from storage.
     * @param  \App\Models\Tarea  $tarea
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tarea $tarea)
    {
        $tarea->delete();
        return response("", 204);
    }
}
