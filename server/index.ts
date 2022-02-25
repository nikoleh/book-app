import express, { static as staticFiles } from 'express'
import { BookController } from './controllers'

const app = express()
const port = process.env.SERVER_PORT || 3000
const staticFilesLocation = process.env.STATIC_FILES_LOCATION || 'static'

app.use(staticFiles(staticFilesLocation))
app.use('/api/books', BookController)

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))