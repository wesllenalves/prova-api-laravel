<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
// PLEASE ADD UnauthorizedHttpException class
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        
         // PLEASE ADD THIS LINES
         if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
            return response()->json(['error' => 'token_expired']);
        }
        else if ($exception instanceof \Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException) {
            return response()->json(['error' => 'Token has expired']);
        }
        else if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
            return response()->json(['error' => 'token_invalid']);
        }
        else if ($exception instanceof \Tymon\JWTAuth\Exceptions\JWTException) {
            return response()->json(['error' => $exception->getMessage()]);
        }
        else if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException){
            return response()->json(['error' => 'token_has_been_blacklisted']);
        }
        return parent::render($request, $exception);
    
    }
}
