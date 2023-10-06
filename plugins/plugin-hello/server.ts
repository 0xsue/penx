import { join } from 'path'
import cors from 'cors'
import express, { Express, Request, Response } from 'express'
import jetpack from 'fs-jetpack'

const port = process.env.PORT || 5001

const app: Express = express()
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.get('/manifest.json', (req: Request, res: Response) => {
  const manifest = jetpack.read('./manifest.json', 'json')
  res.json(manifest)
})

app.get('/code', (req: Request, res: Response) => {
  const manifest = jetpack.read('./manifest.json', 'json')
  const code = jetpack.read(join(__dirname, manifest.main), 'utf8')
  res.send(code)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})