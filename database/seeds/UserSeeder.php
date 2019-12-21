<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tb_users')->insert([
            'username' => 'wesllenalves',
            'email' => 'wesllenalves@gmail.com',
            'email_verified_at' => new DateTime(),
            'password' => '123456',
        ]);
        DB::table('tb_users')->insert([
            'username' => 'Fabio Carlos',
            'email' => 'fabioteste@gmail.com',
            'email_verified_at' => new DateTime(),
            'password' => '123456',
        ]);
    }
}
