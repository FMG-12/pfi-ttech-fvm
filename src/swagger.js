const swaggerSpec = {
    openapi: '3.1.1',
    info: {
        title: 'PFI TTECH API',
        version: '1.0.0',
        description: 'Proyecto Final Integrador - Talento Tech',
    },
    servers: [
        { url: '/api', description: 'Producción' },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Product: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: 'xxxyyyzzz' },
                    name: { type: 'string', example: 'Remera de mujer básica' },
                    price: { type: 'number', example: 29.99 },
                    description: { type: 'string', example: 'Remera básica de algodón' },
                    category: { type: 'string', example: 'women' },
                    currency: { type: 'string', example: 'USD' },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    paths: {
        '/login': {
            post: {
                tags: ['Auth'],
                summary: 'Iniciar sesión',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string', format: 'email', example: 'admin@gmail.com' },
                                    password: { type: 'string', example: '123456' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Token',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        token: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    400: { description: 'Email y contraseña requeridos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                    401: { description: 'Credenciales incorrectas', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                },
            },
        },
        '/register': {
            post: {
                tags: ['Usuarios'],
                summary: 'Crear usuario',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string', format: 'email', example: 'usuario@gmail.com' },
                                    password: { type: 'string', example: '123456' },
                                    role: { type: 'string', enum: ['user', 'admin'], default: 'user' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: { description: 'Usuario creado' },
                    400: { description: 'Faltan campos requeridos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                    401: { description: 'Token inválido o ausente', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                    403: { description: 'Sin permisos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                },
            },
        },
        '/update': {
            put: {
                tags: ['Usuarios'],
                summary: 'Actualizar datos de mi usuario',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string', format: 'email' },
                                    password: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: { description: 'Usuario actualizado' },
                    401: { description: 'Token inválido o ausente', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                },
            },
        },
        '/products': {
            get: {
                tags: ['Productos'],
                summary: 'Listar productos (Filtros opcionales)',
                security: [{ bearerAuth: [] }],
                parameters: [
                    { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Filtrar por categoría: men / women / kids' },
                    { name: 'minPrice', in: 'query', schema: { type: 'number' }, description: 'Precio mínimo' },
                    { name: 'maxPrice', in: 'query', schema: { type: 'number' }, description: 'Precio máximo' },
                    { name: 'currency', in: 'query', schema: { type: 'string' }, description: 'Moneda (USD, ARS, ARA)' },
                ],
                responses: {
                    200: {
                        description: 'Lista de productos',
                        content: {
                            'application/json': {
                                schema: { type: 'array', items: { $ref: '#/components/schemas/Product' } },
                            },
                        },
                    },
                    400: { description: 'Parámetros inválidos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                    401: { description: 'Token inválido o ausente', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                },
            },
        },
        '/products/{id}': {
            get: {
                tags: ['Productos'],
                summary: 'Obtener producto por ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                ],
                responses: {
                    200: { description: 'Producto', content: { 'application/json': { schema: { $ref: '#/components/schemas/Product' } } } },
                    401: { description: 'Token inválido o ausente', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                    404: { description: 'Producto no encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                },
            },
            delete: {
                tags: ['Productos'],
                summary: 'Eliminar producto por ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                    { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                ],
                responses: {
                    200: {
                        description: 'Producto eliminado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' },
                                        product: { $ref: '#/components/schemas/Product' },
                                    },
                                },
                            },
                        },
                    },
                    400: { description: 'ID requerido', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                    401: { description: 'Token inválido o ausente', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                },
            },
        },
        '/products/create': {
            post: {
                tags: ['Productos'],
                summary: 'Crear producto',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['name', 'price'],
                                properties: {
                                    name: { type: 'string', example: 'Remera de hombre básica' },
                                    price: { type: 'number', example: 29.99 },
                                    description: { type: 'string', example: 'Remera blanca de algodon' },
                                    category: { type: 'string', example: 'men' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Producto creado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' },
                                        id: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    400: { description: 'Faltan campos requeridos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                    401: { description: 'Token inválido o ausente', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                },
            },
        },
    },
}

export default swaggerSpec
