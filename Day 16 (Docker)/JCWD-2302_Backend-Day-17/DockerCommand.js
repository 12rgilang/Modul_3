// Download Docker Images
// ---> docker pull redis:latest

// Show Docker Images List
// ---> docker images

// Create Container (docker container create --name "containerName" "imageName")
// ---> docker container create --name redis1 redis

// Show Docker Container List
// ---> docker container ls (Show Running Container Only)
// ---> docker container ls --all

// Running Container
// ---> docker container start redis-own

// Stop Running Container
// ---> docker container stop redis-own

// To Connect localhost to Container Port in Docker
// ---> docker container create --name redis-new -p 3001:6379 redis

// To Connect Redis-CLI in Docker from Localhost
// ---> Open WSL
// ---> redis-cli -p 3001

// ##### Build RestAPI Project
// ---> docker build -t restapi-own:v1 . 



// ##### Push Image to Dockerhub
// ---> docker login 
// ---> docker tag my-restapi-image:1.0 ryandefryan/my-restapi-image:1.0
// ---> docker push ryandefryan/my-restapi-image:1.0



// ##### Docker Volume
// 1. Pull Image MySql
// ---> docker pull mysql

// 2. Create Container 
// ---> docker container create --name mysql -p 2023:3306 -e MYSQL_ROOT_PASSWORD=password mysql

// 3. Create Volume
// ---> docker volume create mysql
// ---> docker volume ls
// ---> docker container create --name mysql_server -v mysql:/var/lib/mysql -p 2023:3306 -e MYSQL_ROOT_PASSWORD=password mysql
// ---> docker container start mysql_server
// ---> docker exec -it mysql_server mysql -u root -p
// ---> SHOW DATABASES;
// ---> CREATE DATABASE testing_db;
// ---> docker container stop mysql_server;
// ---> docker container rm mysql_server;


// ##### Docker Network
// 1. Create 1 Network
// ---> docker network create my_restapiexpress_network

// 2. Connect 2 Container into 1 Network (docker network connect "networkName" "containerName")
// ---> docker network connect my_restapiexpress_network mysql_server
// ---> docker network connect my_restapiexpress_network restapi_server
