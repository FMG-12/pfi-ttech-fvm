import express from 'express'
import env from './src/middleware/env.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './src/swagger.js'

import productsRoutes from './src/routes/products.routes.js'
import authRoutes from './src/routes/auth.routes.js'
import userRoutes from './src/routes/user.routes.js'
import { authentication } from './src/middleware/auth.js'
import { logger } from './src/middleware/logger.js'

const app = express();

app.use(logger)

app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', env.CORS_ORIGIN)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
});

app.use(bodyParser.json());


// rutas
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api', authRoutes)
app.use('/api', authentication, productsRoutes)
app.use('/api', authentication, userRoutes)

app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;