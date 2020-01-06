<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::group(['namespace' => 'Api\\'], function(){
  Route::post('auth/login',  'APILoginController@login');
  Route::get('auth/logout', 'APILoginController@logout');
  Route::post('auth/refresh', 'APILoginController@refresh');
  
});

Route::group(['middleware' => 'jwt.auth', 'namespace' => 'Api\\'], function(){
  Route::resource('pesssoas', 'PessoaController');
  Route::get('auth/me', 'PessoaController@me');
  Route::post('pesssoas/add', 'PessoaController@add');
});



