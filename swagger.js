const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Designer Music'
    },
    // host: 'localhost:3000',
    // schemes: ['http', 'https']
    host: 'project2-cqkb.onrender.com/',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this wil generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);