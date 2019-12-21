<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pessoas extends Model
{
    protected $table = 'tb_pessoas';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'id';
    protected $casts = [		
		'users_id' => 'int',		
    ];
    public $timestamps = true;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'no_pessoa', 'nu_cpf', 'email', 'nu_telefone', 
        'nu_whatsapp', 'nu_rg', 'users_id'
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\Users::class, 'users_id', 'idusers');
    }
}
