import express, { Request, Response } from 'express'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

// Middleware: CORS para desarrollo con Vite (puerto 5173)
app.use((_req: Request, res: Response, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(express.json())

/**
 * GET /api/pqrs
 * Retorna todos los radicados del archivo data/pqrs.json
 */
app.get('/api/pqrs', (_req: Request, res: Response) => {
  try {
    const filePath = join(__dirname, '..', 'data', 'pqrs.json')
    const raw = readFileSync(filePath, 'utf-8')
    const pqrs = JSON.parse(raw)

    res.status(200).json({
      ok: true,
      total: pqrs.length,
      data: pqrs,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'No se pudo leer el archivo de radicados.',
      error: String(error),
    })
  }
})

/**
 * GET /api/pqrs/:id
 * Retorna un radicado específico por su ID o por código parcial
 */
app.get('/api/pqrs/:id', (req: Request, res: Response) => {
  try {
    const filePath = join(__dirname, '..', 'data', 'pqrs.json')
    const raw = readFileSync(filePath, 'utf-8')
    const pqrs: Array<{ id: string }> = JSON.parse(raw)

    const targetId = req.params.id.toLowerCase()
    const item = pqrs.find(
      (p) =>
        p.id.toLowerCase() === targetId ||
        p.id.endsWith(`00${targetId}`) ||
        p.id.endsWith(`0${targetId}`) ||
        p.id === `PQRS-2026-0${targetId.padStart(2, '0')}` ||
        p.id === `PQRS-2026-${targetId.padStart(3, '0')}`
    )

    if (!item) {
      res.status(404).json({ ok: false, message: `Radicado ${req.params.id} no encontrado.` })
      return
    }

    res.status(200).json({ ok: true, data: item })
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error interno del servidor.', error: String(error) })
  }
})

app.listen(PORT, () => {
  console.log(`\n  API PQRS corriendo en: http://localhost:${PORT}`)
  console.log(`  Endpoint disponible: http://localhost:${PORT}/api/pqrs\n`)
})

export default app