<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'value'
    ];

    public function getValueAttribute($value)
    {
        if($value > 0){
            return $this->attributes['value'] = number_format($value, 2,',','.');
        }else{
            return $this->attributes['value'] = $value;
        }
    }
}
