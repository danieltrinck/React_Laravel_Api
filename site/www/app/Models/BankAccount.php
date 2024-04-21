<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'transfer',
        'deposit',
        'user_id',
        'to_id',
        'accounts_id',
        'value'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function to()
    {
        return $this->hasOne(User::class, 'id', 'to_id');
    }

    public function account()
    {
        return $this->hasOne(Account::class, 'id', 'accounts_id');
    }
}
