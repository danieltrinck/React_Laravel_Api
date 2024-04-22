<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    use HasFactory;
    protected $table = 'users_address';
    protected $fillable = [
        'user_id',
        'address',
        'neighborhood',
        'cep',
        'complement',
        'city',
        'number',
        'uf',
        'cpf',
        'birthday'
    ];
}
