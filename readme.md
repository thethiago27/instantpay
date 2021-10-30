# InstantPay

InstantPay é uma API de pagamento instantâneo entre usuários.

# TODO
- Adicionar a API do Stripe para permitir os usuários adicionarem dinheiro as suas carteiras.
- Criar um blockchain para salvar todas as transações

## Tecnlogias

- NodeJs
- MongoDB

## Instalação

1 - Clone & Install
```bash
git clone https://github.com/thethiago27/instantpay
cd instantpay

yarn

```

2 - Configurando as variáveis de ambiente

JWT_SECRET: Sua chave de assinatura para JWT
MONGO_DB_NAME: Nome do banco de dados
MONGO_URI: Url de conexão para o MongoDB


3 - Configurando o MongoDB

-   Crie uma collection chamada "balance"
-   Importe o db.json para popular o seu banco.

3 - Executando

```bash
yarn build
yarn start

```

## Consultas

Sempre que for fazer uma requisição de método GET /payment é obrigatório passar o header Authorization
com um JWT, assinado e com o parâmetro { userId: "<token>" }
 
ROTAS:
 
[POST] /payment/create - Cria um novo pagamento
[POST] /wallet - Cria uma carteira para o usuário
 
Exemplo de requisição
 
```json
{
    "from": "38d7dhs230-7djsh23-ld-4d",
    "amount": 1
}
```
 
FROM: Id do usuário que irá receber o pagamento
AMOUNT: Valor que usuário irá receber



