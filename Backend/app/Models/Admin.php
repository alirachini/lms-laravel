<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Admin extends Model
{
    use HasApiTokens, HasFactory, Notifiable;


    protected $fillable = [
        'username',
        'password',
        'email',
        'picture',
        'isActive',
    ];
}
