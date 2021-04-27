<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use JWTAuth;
use JWTAuthException;
use App\User;

class ApiController extends Controller
{

    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        $token = null;
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'invalid_email_or_password',
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'failed_to_create_token',
            ]);
        }
        $user = User::where('email',$request->get('email'))->select("id")->first();
        $userrole = User::where('email',$request->get('email'))->select("role")->first();
        $userkhid = User::where('email',$request->get('email'))->select("idkh")->first();
        return response()->json([
            'response' => 'success',
            'result' => [
                'token' => $token,
                'iduser' => $user,
                'roleuser' => $userrole,
                'userkhid' => $userkhid
            ],
        ]);
    }
    public function infouser($id)
    {
        $user = User::find($id);
        return $user->toJson();
    }
}