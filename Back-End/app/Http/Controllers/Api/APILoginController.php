<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//use JWTAuth;
use Tymon\JWTAuth\JWTAuth;
use App\Models\Users;
use Auth;

class APILoginController extends Controller
{   
    /**
     * @var JWTAuth
     */
    private $jwtAuth;
    
    public function __construct(JWTAuth $jwtAuth)
    {
        $this->jwtAuth = $jwtAuth;
    }

     //Please add this method
     public function login() {
        // get email and password from request
        $credentials = request(['username', 'password']);
        
        // try to auth and get the token using api authentication
        if (!$token = auth('api')->attempt($credentials)) {
            // if the credentials are wrong we send an unauthorized error in json format
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
        
        $user = Users::where('idusers', auth('api')->id())->with('pessoa')->firstOrFail();;

        return response()->json([
            'token' => $token,
            'type' => 'bearer', // you can ommit this
            'expires' => auth('api')->factory()->getTTL() * 60, // time to expiration
            'user' => $user,
            
        ]);
    }

    

    public function refresh(){
        $token = Auth::guard('api')->refresh();
        return response()->json([
            'status' => 'ok',
            'token' => $token,
            'expires_in' => Auth::guard('api')->factory()->getTTL() * 60
        ]);
    }

    public function logout(){
        $token = $this->jwtAuth->getToken();
        $this->jwtAuth->invalidate($token);
        return response()->json(['logout']);
    }
}
