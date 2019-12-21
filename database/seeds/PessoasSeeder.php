<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PessoasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tb_pessoas')->insert([            
            'no_pessoa' => 'wesllen',
            'nu_cpf' => '03230944150',
            'email' => 'wesllenalves@gmail.com',
            'nu_telefone' => '61981745695',
            'nu_whatsapp' => '61981745695',
            'nu_rg' => '2533652',
            'users_id' => '1',
        ]);
    }
}
