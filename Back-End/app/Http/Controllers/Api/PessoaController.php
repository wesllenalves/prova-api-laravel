<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pessoas;
use App\Models\Users;
use Tymon\JWTAuth\JWTAuth;
use Auth;
use Illuminate\Support\Facades\Hash;

class PessoaController extends Controller
{   
    
     /**
     * @var JWTAuth
     */
    private $jwtAuth;
    public function __construct(JWTAuth $jwtAuth)
    {
        $this->jwtAuth = $jwtAuth;
    }



    public function me()
    {
        $userpessoa = Users::where('idusers', auth('api')->id())->with('pessoa')->firstOrFail();
        return response()->json($userpessoa);
    }



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {           
        return response()->json(Pessoas::with('user')->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function add(Request $request )
    {
        $users = new Users;

        $users->username = $request->get('username');
        $users->email = $request->get('email');
        $users->password = Hash::make($request->get('password'));
        $users->save();
        $id = $users->idusers;


        $pessoas = new Pessoas;

        $pessoas->no_pessoa = $request->get('no_pessoa');
        $pessoas->nu_cpf = $request->get('nu_cpf');
        $pessoas->email = $request->get('email');
        $pessoas->nu_telefone = $request->get('nu_telefone');
        $pessoas->nu_whatsapp = $request->get('nu_whatsapp');
        $pessoas->nu_rg = $request->get('nu_rg');
        $pessoas->users_id = $id;
        $pessoas->save();

        
        return response()->json([
            $users,
            $pessoas
        ], 200);
    }

    public function create(Request $request )
    {
        
        return $request;
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
        return response()->json(Pessoas::with('user')->findOrFail($id));
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
