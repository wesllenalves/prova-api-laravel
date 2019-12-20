<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>
<p align="center"># Prova Api com laravel</p>

## Sobre a prova:

Uma prova para constatar a proficiência no framework laravel utilizando api.
Primeiro passo criando o projeto base utilizando **Laravel 6.0** 

## Perguntas:

> 1. Elaborar migrations das duas tabelas com relações, e elaborar uma seed com 1 pessoa que tem 1 usuário.

   - [x] Preparando o sistema
```
git clone https://github.com/wesllenalves/prova-api-laravel.git
```
```
cd prova-api-laravel
```
```
composer update
```
```
cp .env.example .env
php artisan key:generate
```
```
No banco de dados MYSQL adicionar o banco de dados a database chamada: prova-api-laravel
```


- [x] Elaborar Migration, Seeder, Models.

```
php artisan make:migration tb_users
php artisan make:migration tb_pessoa
php artisan make:migration add_foreign_keys_to_tb_pessoas
php artisan make:model Models/Users
php artisan make:model Models/Pessoas
```
__Migration tabela Users__

```
    Schema::create('tb_users', function (Blueprint $table) {
        $table->bigIncrements('id');
        $table->string('username');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
    });
```
__Migration tabela Pessoas__

```
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
```
> tabela de relacionamento entre users e pessoas
```
    Schema::table('tb_pessoas', function (Blueprint $table) {$table->foreign('users_id', 'tb_pessoas_users_id')->references('id')->on('tb_users')->onUpdate('CASCADE')->onDelete('CASCADE');
    });
```
__Model de Users__

```
    protected $fillable = [
        'username', 'email', 'password',
    ];

    public function Pessoas()
    {
        return $this->hasOne(\App\Models\Pessoas::class, 'users_id', 'id');
    }
```

__Model de Pessoas__

```
    protected $fillable = [
        'no_pessoa', 'nu_cpf', 'email', 'nu_telefone', 
        'nu_whatsapp', 'nu_rg'
    ];

    public function Users()
    {
        return $this->belongsTo(\App\Models\Users::class, 'users_id', 'id');
    }
```
__Executando a migrations com o seed__

```
php artisan migrate:fresh --seed
```
