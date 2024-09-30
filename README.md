# Sistema de aluguel de materiais de construção

Olá!
Para executar o sistema, temos 2 opções:
- Utilizando Docker
- Executando localmente, usando nodeJS

## Utilizando Docker
Para executar o sistema utilizando Docker, basta executar o comando docker-compose up com o terminal no backend, e irá ser configurado o banco de dados e a api. E no frontend podemos executar os comandos `docker build . -t frontend` e `docker run -p 3000:3000 -d frontend`

## Executando localmente
Para executar o sistema localmente, é necessário instalar uma versão recente do nodeJS, preferencialmente se for uma versão LTS, primeiramente precisamos copiar os arquivos `.env.example` dentro das pastas `frontend` e `backend` e renomea-los para `.env`, fazendo as edições conforme necessário. Após esse processo, será necessário instalar as dependencias de cada pasta, para isso, entre na pasta e no terminal de sua escolha, digite o comando `npm install`. Após a instalação das dependencias, será necessário configurar o banco postgres, ou outro, conforme configuração feita no `.env`, criar o banco de dados com o nome configurado, e então com um terminal na pasta backend, rodar os comandos: `npm run migration:run` e `npm run seed:run` para que seja criada a estrutura do banco e os dados iniciais. Feito isso, podemos executar o backend em modo de desenvolvimento utilizando o comando `npm run start:dev`, logo após, podemos iniciar o frontend também em modo de desenvolvimento utilizando o comando `npm run dev`.