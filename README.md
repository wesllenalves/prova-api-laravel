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


> 2. Criar um CRUD de API para Pessoa, e toda vez que inserir uma pessoa, inserir usuário também relacionado.

__Executando a criação Controller__

`<Estou utilizando o recursos` **--resource** `que vai criar os principais methods para uma api. É criando uma pasta para armazenar esse controller.>`

```
php artisan make:controller Api/PessoaController --resource
```
`<methods ` **PessoaController** ` implementados>`

- [x] index
```
public function index()
{           
    return response()->json(Pessoas::all());
}
```
- [x] store
```
public function store(Request $request)
{   

    if($request->get('users_id') == ''){
        return response()->json([
            'message' => 'Voce precisa adicionar um usuario de relacionamento'
        ], 404);
    }
    $users = Users::find($request->users_id);

    if(!$users){
        return response()->json([
            'message' => 'Usuario do relacionamento nao encontrado na tabela tb_users'
        ], 404);
    }
    $pessoas = Pessoas::create($request->all());
    return response()->json($pessoas, 201); 
}
```
- [x] show
```
public function show($id)
{
    response()->json(Pessoas::findOrFail($id));
}

public function update(Request $request, $id)
{
    $pessoas = Pessoas::find($id);
    if(!$pessoas){
        return response()->json([
            'message' => 'usuario não encontrado'
        ], 404);
    }

    $pessoas->fill($request->all());
    $pessoas->save();
    return response()->json($pessoas);
}
```
- [x] destroy
```
public function destroy($id)
{
    $pessoas = Pessoas::find($id);

    if(!$pessoas){
        return response()->json([
            'message' => 'usuario não encontrado'
        ], 404);
    }

    $pessoas->delete($id);
    return response()->json([
        'message' => 'usuario Deletado com Sucesso'
    ], 200);
}
```


__Criação das Rotas__

`<Crio uma rota que já abstrai todos os methods:index, show, stored, update e delete. É filtro para ignora os methods: create e edit.>`
```
Route::resource('pesssoas', 'Api\PessoaController', 
['except' => [
  'create', 'edit'
]]);
```

__Executando o projeto__
`<Depois de tudo implementado e so iniciar o servidor e consumir a api pela sua url com para fim didaticos utilize o postman>`
```php artisan serve
```
`<A url de acesso Local sera 'http://127.0.0.1:8000/api/pesssoas' sem aspas>`

## Prints de funcionamento no Postman:

`<Get de todas as Pessoas>`

![Image POSTMAN index](https://github.com/wesllenalves/prova-api-laravel/get-capture-index.GIF)

`<Get de Pesssoas por id>`

![Image POSTMAN show](https://github.com/wesllenalves/prova-api-laravel/get-capture-show.GIF)

`<POST de criação de Pessoas>`

![Image POSTMAN store](https://github.com/wesllenalves/prova-api-laravel/get-capture-store.GIF)

`<PUT de atualização de Pessoas>`

![Image POSTMAN update](https://github.com/wesllenalves/prova-api-laravel/get-capture-update.GIF)


`<DELETE a excluição da Pessoas por id>`

![Image POSTMAN delete](https://github.com/wesllenalves/prova-api-laravel/get-capture-delete.GIF)


