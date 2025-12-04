const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ZamiKhaya API',
      version: '1.0.0',
      description: 'API documentation for ZamiKhaya'
    },
    servers: [
      { url: '/' }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

module.exports = swaggerJsdoc(options);
