<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pessoas;
use App\Models\Users;

class PessoaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {           
        return response()->json(Pessoas::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   

        if($request->get('users_id') == ''){
            return response()->json([
                'message' => 'Voce precisa adicionar um usuario de relacionamento'
            ], 404);
        }
        $users = Users::find($request->users_id);

        if(!$users){
            return response()->json([
                'message' => 'Usuario do relacionamento nao encontrado na tabela tb_users'
            ], 404);
        }
        $pessoas = Pessoas::create($request->all());
        return response()->json($pessoas, 201); 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Pessoas::findOrFail($id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
       $pessoas = Pessoas::find($id);
       if(!$pessoas){
            return response()->json([
                'message' => 'usuario não encontrado'
            ], 404);
       }

       $pessoas->fill($request->all());
       $pessoas->save();
       return response()->json($pessoas);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pessoas = Pessoas::find($id);

       if(!$pessoas){
            return response()->json([
                'message' => 'usuario não encontrado'
            ], 404);
       }

       $pessoas->delete($id);
       return response()->json([
            'message' => 'usuario Deletado com Sucesso'
        ], 200);
    }
}
