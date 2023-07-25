const options = {
  definition: {
    failOnErrors: true,
    openapi: '3.0.0',
    info: {
      title: 'Gear shop',
      version: '1.0.0',
      description: 'This is a Gear Shop Server',
      contact: {
        name: 'Nguyen Minh Khoa',
        url: 'https://github.com/ngkhoa07zzz',
        email: 'nmkhoacd07@gmail.com',
      },
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          value: 'Bearer <JWT token here',
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

export { options };
