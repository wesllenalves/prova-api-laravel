<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pessoas extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $casts = [
		'users_id' => 'int',		
	];


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'no_pessoa', 'nu_cpf', 'email', 'nu_telefone', 
        'nu_whatsapp', 'nu_rg'
    ];

    public function Users()
    {
        return $this->belongsTo(\App\Models\Users::class, 'users_id', 'id');
    }
}
