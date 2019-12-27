<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;

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
        $credentials = request(['email', 'password']);
        
        // try to auth and get the token using api authentication
        if (!$token = auth('api')->attempt($credentials)) {
            // if the credentials are wrong we send an unauthorized error in json format
            return response()->json(['error' => 'Unauthorized code:401'], 401);
        }
        return response()->json([
            'token' => $token,
            'type' => 'bearer', // you can ommit this
            'expires' => auth('api')->factory()->getTTL() * 60, // time to expiration
            
        ]);
    }

    public function refresh(){
        $token = $this->jwtAuth->getToken();
        $token = $this->jwtAuth->refresh($token);

        return response()->json(compact($token));
    }

    public function logout(){
        $token = $this->jwtAuth->getToken();
        $this->jwtAuth->invalidate($token);
        return response()->json(['logout']);
    }
}
