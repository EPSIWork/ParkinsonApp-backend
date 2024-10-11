import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Parkinsonia API',
      version: '1.0.0',
      description: 'API for Parkinsonia',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/infrastructure/api/routes/*.ts'], // path to the API docs
};

const swaggerSpecs = swaggerJsDoc(options);

export default swaggerSpecs;