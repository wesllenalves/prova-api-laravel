<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{   
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function Pessoas()
    {
        return $this->hasOne(\App\Models\Pessoas::class, 'users_id', 'id');
    }
}
