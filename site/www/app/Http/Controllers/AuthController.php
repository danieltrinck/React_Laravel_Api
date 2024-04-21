<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    protected $users;

    public function __construct(
        User           $users
    ){
        $this->users = $users;
    }

    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken('AppName');
        return response(['token' => $token->plainTextToken], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $token = auth()->user()->createToken('AppName');

            return response(['token' => $token->plainTextToken], 200);
        }

        return response(['error' => 'E-mail ou Senha inválidos'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    }

    public function user(Request $request)
    {   //Devolve o usuário logado via token
        return $this->users->with('account')->where('id',$request->user()->id)->first();
    }

    public function users(Request $request)
    {   //Devolve todos os usuarios cadastrados
        return $this->users->with('account')->orderBy('id','desc')->paginate('10');
    }
}
