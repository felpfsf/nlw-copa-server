# Instruções Gerais

Projeto desenvolvido durante a NLW Copa

## Instalando / Iniciando o Projeto

- [ ] ``npm init -y`` => **inicia as configurações padrão**
- [ ] ``npm i typescript -D`` => **instala o typescript**
- [ ] ``npx tsc --init`` => **inicia o typescript criando um arquivo de confi ``tsconfig.json``, altera o target para ``ES2020``**
- [ ] ``npm i fastify`` => **instala o fastify, uma alternativa ao Express**
- [ ] ``npm tsx -D`` => **inicia o processo de compilação do typescript automaticamente, configurar no arquivo ``package.json`` em scripts ``"dev":"tsx watch src/server.ts"``, o ``watch`` serve para monitorar qualquer alteração no arquivo e fazer o live update**
- [ ] ``npm i prisma -D`` => **instala o ORM Prisma em produção**
- [ ] ``npm i @prisma/client`` => **instala o pacote client para se conectar à aplicação**
- [ ] ``npx prisma init --datasource-provider SQLite`` => **utilizar o BD SQLite ao invés do Postgres que vem por padrão no Prisma**
- [ ] ``npx prisma migrate dev`` => **versionamento do banco de dados**
- [ ] ``npx prisma studio`` => **abre a ferramenta de visualização e manipulação do banco de dados no navegador, pode adicionar ``--port 1234`` caso tenha algum conflito de porta**
- [ ] ``npm i prisma-erd-generator @mermaid-js/mermaid-cli -D`` => **cria um modelo relacional de banco de dados**
- [ ] ``npm i @fastify/cors`` => ****

## Criando rotas

```js
Rota de Pools(bolão):
  http://localhost:3333/pools/count
  http://localhost:3333/pools/

fastify.get('url', async () => {})

fastify.post('url', async () => {})

```

## Populando o banco de dados com seed

Em ``package.json`` adicionar o comando ``"prisma":{"seed":"tsx <caminho do arquivo seed>"}``

- [ ] ``npx prisma db seed`` => **comando que inicia o arquivo contendo os dados para popular o BD**

## Criando método post

``fastify.post()`` passando o ``request`` e ``reply``. A requisição será o titulo do bolão e no retorno a resposta com o ``status`` ``201``, status de sucesso mais descritivo, enviando o json na confirmação

## Validando os dados

- [ ] ``npm i zod`` => ZOD é uma lib de validação de dados

## UUID

- [ ] ``npm i short-unique-id`` => instala uma lib de geração de IDs únicos com uma probabilidade baixa de colisão

## Criando Rotas

Para organizar melhor criar uma pasta `routes` e criar um arquivo separado para cada entidade. Cada arquivo terá uma função principal `async` com o `fastify` como argumento, seu tipo será de `FastifyInstance` e dentro dela a função `get` e `post` previamente criada em `server.ts`. Para usar essa função em server.ts é necessário importar ela através do método `register()` do *fastify* passando o nome da função/rota como parâmetro, ficando assim await `fastify.register(poolRoutes)`

## Autenticação de usuário

Em `auth.ts` criar um método post do fastify com uma rota e um request para receber o `access_token`, a chave de autenticação do Google. Para validar as informações é utilizado a lib `zod`.

Para receber a autorização do Google é utilizado o método `fetch` passando a URL da api do Google, `'https://www.googleapis.com/oauth2/v2/userinfo'` e com o método `GET` e no `header` o token de acesso(`access_token`).

As informação são recebidas em um formato `json` e armazenadas em uma *const* `userData`, para validar essas info utilizando a `zod` é criado um `schema` com as informações vinda da requisição, como *id, email, nome e avatar*. Então as informações vindas da resposta são parseadas nesse *schema*, validando essas informações e depois passada para outra *const* chamada `userInfo`.

### JWT - JSON Web Token

- [ ] `npm i @fastify/jwt` => pacote do fastify para poder usar JWT
- [ ] `fastify.register` => secret precisa ser alguma chave e qdo for subir na produção é necessário armazenar ela em uma variável de ambiente.
- [ ] process.env.SECRET_API => forma como importar a variável de ambiente, com typescript utilizar o `as string`
- [ ] `token` => Em `auth.ts` uma const *token* que vai receber um *hash* com as informações do usuário...***ATENÇÃO: NÃO SE DEVE PASSAR NENHUMA INFO SENSÍVEL***...através do método `sign()` do `fastify/jwt`. As informações que vão para esse token são o nome, o avatarUrl, o sub(userId) e a data que o token irá expirar.
- [ ] `jwtVerify()` => método que irá verificar se o token é válido, dessa forma garante que é o usuário correto que está acessando a rota. Esse método pode ser exportado como um plugin/middleware e assim será reutilizado mais vezes na aplicação.
  Na rota /me é importado esse plugin/middleware recém criado através de onRequest e nele é passado o plugin como um array

## Cadastrando usuário no banco

Depois de efetuada a autenticação é buscado pelo googleId do usuário no banco, caso não tenha nenhum valor igual então se trata de um usuário novo e é gravado suas informações no banco através do método `create()` do *prisma*. Nele é passado um objeto data com o `id, email, nome e avatar`
