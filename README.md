## Baixando os arquivos
    -  git clone https://github.com/danieltrinck/React_Laravel_Api.git .
    
## Carregando os containers
    - docker-compose build
    - docker-compose up -d

## Configurando Laravel
    - Após criar o container Mysql8, inspecionar e pegar o IP do banco de dados. Acrescentar o IP no .env em site/www/.env
    - Rodar os comandos migrate e seed para gerar os dados no banco de dados
    - docker exec -it php php artisan migrate
    - docker exec -it php php artisan db:seed