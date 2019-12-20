<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TbPessoa extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_pessoas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('no_pessoa');
            $table->string('nu_cpf');
            $table->string('email');
            $table->string('nu_telefone');
            $table->string('nu_whatsapp');
            $table->string('nu_rg');
            $table->bigInteger('users_id')->index('tb_pessoas_users_id')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_pessoas');
    }
}
