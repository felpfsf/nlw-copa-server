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

Para organizar melhor criar uma pasta `routes` e criar um arquivo separado para cada entidade.