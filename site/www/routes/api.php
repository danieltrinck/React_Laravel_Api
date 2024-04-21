<?php

use App\Http\Controllers\AccountController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('login',    [AuthController::class,'login'    ]);
Route::post('register', [AuthController::class,'register' ]);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user',           [AuthController::class,    'user'     ]);
    Route::get('users',          [AuthController::class,    'users'    ]);
    Route::get('users/{id}',     [AccountController::class, 'getUser'  ]);
    Route::post('deposit/{id}',  [AccountController::class, 'deposit'  ]);
    Route::post('transfer/{id}', [AccountController::class, 'transfer' ]);
    Route::get('historic/{id}',  [AccountController::class, 'historic' ]);
    Route::post('logout',        [AuthController::class,    'logout'   ]);
});