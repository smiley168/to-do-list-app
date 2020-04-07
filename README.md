TODO: Add install and usage instructions

### How to start the Server

cd server

docker-compose up -d

// wait for a few seconds for the docker container to finish initializing

prisma deploy

// the graphiQL should be running in http://localhost:4466/



### How to start the Client

cd app

// if first time, run 'npm install' to get all the npm dependencies

npm install

npm run start

![Image of Todolist app](https://github.com/smiley168/to-do-list-app/blob/feature/todo-list/app/public/screencastToDoListApp.gif)

