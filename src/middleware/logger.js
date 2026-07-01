import { appendFileSync, mkdirSync } from 'fs' //https://www.w3schools.com/nodejs/nodejs_path.asp
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LOG_DIR = join(__dirname, '../../logs')
const LOG_PATH = join(LOG_DIR, 'app.log')

mkdirSync(LOG_DIR, { recursive: true })

export const logger = (req, res, next) => {
    res.on('finish', () => {
        const line = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode}\n`
        try {
            appendFileSync(LOG_PATH, line)
        } catch (_) {}
    })
    next()
}
