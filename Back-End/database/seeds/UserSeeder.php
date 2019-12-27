<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {        
        Users::create([
            'username' => 'wesllenalves',
            'email' => 'wesllenalves@gmail.com',
            'email_verified_at' => new DateTime(),
            'password' => Hash::make('admin'),
        ]);
    }
}
