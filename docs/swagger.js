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
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' }
          }
        },
        Property: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            type: { type: 'string' },
            location: { type: 'string' },
            area: { type: 'string' },
            coordinates: {
              type: 'object',
              properties: { lat: { type: 'number' }, lng: { type: 'number' } }
            },
            price: { type: 'number' },
            description: { type: 'string' },
            images: { type: 'array', items: { type: 'string' } }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

// Generate base spec from JSDoc comments (if any)
const generatedSpec = swaggerJsdoc(options);

// Explicitly add common paths so UI shows operations even without JSDoc comments
generatedSpec.paths = generatedSpec.paths || {};

const paths = {
  '/zam/register': {
    post: {
      tags: ['Auth'],
      summary: 'Register a new user or landlord',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                role: { type: 'string' },
                address: { type: 'string' }
              }
            }
          }
        }
      },
      responses: {
        '201': { description: 'User registered' },
        '400': { description: 'Invalid input' }
      }
    }
  },
  '/zam/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } } }
          }
        }
      },
      responses: { '200': { description: 'Logged in' }, '401': { description: 'Invalid credentials' } }
    }
  },
  '/zam/profile': {
    get: {
      tags: ['Auth'],
      summary: 'Get current user profile',
      security: [{ bearerAuth: [] }],
      responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } } }, '401': { description: 'Unauthorized' } }
    }
  },
  '/zam/properties': {
    get: {
      tags: ['Properties'],
      summary: 'List properties',
      responses: { '200': { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Property' } } } } } }
    },
    post: {
      tags: ['Properties'],
      summary: 'Create property',
      requestBody: {
        required: true,
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/Property' } }
        }
      },
      responses: { '201': { description: 'Created' }, '400': { description: 'Invalid data' } }
    }
  },
  '/zam/properties/{id}': {
    get: {
      tags: ['Properties'],
      summary: 'Get property by id',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Property' } } } }, '404': { description: 'Not found' } }
    },
    put: {
      tags: ['Properties'],
      summary: 'Update property',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Property' } } } },
      responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } }
    },
    delete: {
      tags: ['Properties'],
      summary: 'Delete property',
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } }
    }
  }
};

// Merge explicit paths with any generated ones
generatedSpec.paths = Object.assign({}, paths, generatedSpec.paths);

module.exports = generatedSpec;
