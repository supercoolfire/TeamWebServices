const swaggerAutogen = require('swagger-autogen');



// const host = 'localhost:3000';
// const host = 'localhost:3001';
const host = 'musicdatabase-64n3.onrender.com';

const doc = {
    info: {
        title: 'Designer Music'
    },
    host: host,
    basePath: '/',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);