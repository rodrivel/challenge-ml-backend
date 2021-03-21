# Challenge MercadoLibre - Backend

NodeJs app that exposes an API to handle requests for listing or retrieving MercadoLibre items.


## Installation

There are two ways of running the application.
- conteinerized with docker.
- locally with nodejs.

The default port in both cases is 5000, so once the app is running you will be able to find it in your browser at localhost:5000.

### Docker

You'll need to have docker installed on your machine.
Then, in the root of the project, run the following commands.
```sh
sudo docker build -t meli-backend .
sudo docker run -d -p 5000:5000 --name backend-container meli-backend
```

> Note: To stop and remove the container:
```sh
sudo docker rm -f backend-container
```
### Locally

You'll need to have nodejs v12+ and npm v6.14+ installed on your machine.
Then, in the root of the project, run the following commands.
```sh
npm i
npm run dev
```

## How to run tests

Having set up the app locally, you are able to check and see a coverage report with the command. 
```sh
npm run test
```


## API DOCS

You can interact with the API [here](http://localhost:5000/api-docs/)

### Need to regenerate docs due to changes on it definitions?
```sh
npm run swagger-autogen
```

