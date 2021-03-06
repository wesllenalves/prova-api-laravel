<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTbPessoas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tb_pessoas', function (Blueprint $table) {
            $table->foreign('users_id', 'fk_pessoas_users_id')->references('idusers')->on('tb_users')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tb_pessoas', function (Blueprint $table) {
            $table->dropForeign('fk_pessoas_users_id');
        });
    }
}
