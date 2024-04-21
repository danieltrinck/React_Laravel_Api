## Instalação

Para gerar a instalação
    - docker-compose build
    - docker-compose up -d

## Configurando Laravel
    - Após criar o container Mysql8, inspecionar e pegar o IP do banco de dados. Acrescentar o IP no .env em site/www/.env
    - Criar o banco de dados "ultralink"
    - Rodar os comandos migrate e seed para gerar os dados no banco de dados
    - docker exec -it php php artisan migrate
    - docker exec -it php php artisan db:seed