# Instalando

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

fastify.get('url')

```