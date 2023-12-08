const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Users Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
    // host: 'project2-cqkb.onrender.com',
    // schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);