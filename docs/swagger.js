const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: "API Docs",
        description: "Description"
    },
    host: "localhost:5000"
}

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);