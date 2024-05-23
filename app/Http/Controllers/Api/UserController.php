<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    /**
     *@return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UserResource::collection(
            User::query()->orderBy('id', 'asc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Requests\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Requests\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response("", 204);
    }

    /**
     * Update user's game score.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function puntuarJuego(Request $request)
    {
        $puntuacion = $request->input('puntuacion');
        $id_usuario = $request->input('id_usuario');
        $nombre_juego = $request->input('nombre_juego');

        Log::info("JAJJAJAJAJ REQUEST JAJAJ: ", $request->all());

        $mysqli = new \mysqli("localhost", "root", "", "lareduca");
        switch ($nombre_juego) {
            case "piano":
                $sql = "UPDATE users SET puntuacion_piano = ? WHERE id = ?";
                $stmt = $mysqli->prepare($sql);
                $stmt->bind_param("ii", $puntuacion, $id_usuario);
                $stmt->execute();
                $stmt->close();
                $mysqli->close();
                break;
            case "ahorcado":
                $sql = "UPDATE users SET puntuacion_ahorcado = ? WHERE id = ?";
                $stmt = $mysqli->prepare($sql);
                $stmt->bind_param("ii", $puntuacion, $id_usuario);
                $stmt->execute();
                $stmt->close();
                $mysqli->close();
                break;
        }

        return response("Score updated", 200);
    }
}
