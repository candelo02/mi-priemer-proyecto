import React, { useState, useEffect } from 'react'
import './ConsultasPage.css'

export interface PqrsItem {
  id: string
  solicitante: string
  categoria: string
  descripcion: string
  estado: 'En tramite' | 'Resuelto' | string
  fechaRadicacion: string
  plazoLegal: string
  respuestaOficial: string | null
}

export const ConsultasPage: React.FC = () => {
  const [pqrsList, setPqrsList] = useState<PqrsItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas')
  const [estadoFiltro, setEstadoFiltro] = useState<string>('Todos')

  const fetchPqrs = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/pqrs')
      if (!response.ok) {
        throw new Error(`Error al consultar el servidor (${response.status})`)
      }
      const data = await response.json()
      if (data.ok && Array.isArray(data.data)) {
        setPqrsList(data.data)
      } else {
        throw new Error('El formato de respuesta recibido no es vÃ¡lido.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo establecer conexiÃ³n con el servicio de trÃ¡mites.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPqrs()
  }, [])

  // Filtrado en tiempo real
  const filteredPqrs = pqrsList.filter((item) => {
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch =
      query === '' ||
      item.id.toLowerCase().includes(query) ||
      item.solicitante.toLowerCase().includes(query) ||
      item.descripcion.toLowerCase().includes(query) ||
      item.categoria.toLowerCase().includes(query)

    const matchesCategoria =
      categoriaFiltro === 'Todas' || item.categoria === categoriaFiltro

    const matchesEstado =
      estadoFiltro === 'Todos' || item.estado.toLowerCase() === estadoFiltro.toLowerCase()

    return matchesSearch && matchesCategoria && matchesEstado
  })

  return (
    <div className="consultas-container">
      {/* Encabezado de la SecciÃ³n de Consultas */}
      <div className="consultas-header">
        <h2>Consulta y Seguimiento de Radicados PQRS</h2>
        <p>Consulte en tiempo real el estado de trÃ¡mites y solicitudes registradas ante la administraciÃ³n municipal.</p>
      </div>

      {/* Barra de BÃºsqueda y Filtros en Tiempo Real */}
      <div className="busqueda-bar">
        <div className="input-group">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por radicado (ej: PQRS-2026-001), solicitante o palabras clave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')} title="Limpiar bÃºsqueda">
              âœ•
            </button>
          )}
        </div>

        <div className="filtros-group">
          <select 
            className="filter-select"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="Todas">Todas las CategorÃ­as</option>
            <option value="Agua y Alcantarillado">Agua y Alcantarillado</option>
            <option value="Recoleccion de Basura">RecolecciÃ³n de Basura</option>
            <option value="Alumbrado Publico">Alumbrado PÃºblico</option>
          </select>

          <select 
            className="filter-select"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
          >
            <option value="Todos">Todos los Estados</option>
            <option value="En tramite">En trÃ¡mite</option>
            <option value="Resuelto">Resuelto</option>
          </select>
        </div>
      </div>

      {/* ESTADO 1: CARGANDO */}
      {loading && (
        <div className="state-box loading-box">
          <div className="spinner"></div>
          <h3>Cargando informaciÃ³n de trÃ¡mites...</h3>
          <p>Obteniendo los radicados de la base de datos oficial del sistema municipal.</p>
        </div>
      )}

      {/* ESTADO 2: ERROR */}
      {!loading && error && (
        <div className="state-box error-box">
          <div className="error-icon">âš ï¸</div>
          <h3>Error de ConexiÃ³n al Servidor</h3>
          <p>{error}</p>
          <p className="error-hint">Sugerencia: asegÃºrese de que la API Express estÃ© iniciada (`npm run dev:api`).</p>
          <button className="btn-retry" onClick={fetchPqrs}>
            ðŸ”„ Reintentar ConexiÃ³n
          </button>
        </div>
      )}

      {/* ESTADO 3: VACÃO */}
      {!loading && !error && filteredPqrs.length === 0 && (
        <div className="state-box empty-box">
          <div className="empty-icon">ðŸ”</div>
          <h3>No se encontraron trÃ¡mites</h3>
          <p>No existen radicados que coincidan con el tÃ©rmino "{searchQuery}" o con los filtros seleccionados.</p>
          <button 
            className="btn-reset-filters"
            onClick={() => {
              setSearchQuery('')
              setCategoriaFiltro('Todas')
              setEstadoFiltro('Todos')
            }}
          >
            Restablecer Filtros
          </button>
        </div>
      )}

      {/* ESTADO 4: LISTA CON DATOS */}
      {!loading && !error && filteredPqrs.length > 0 && (
        <div className="resultados-section">
          <div className="counter-summary">
            Mostrando <strong>{filteredPqrs.length}</strong> de <strong>{pqrsList.length}</strong> radicados registrados
          </div>

          <div className="pqrs-grid">
            {filteredPqrs.map((item) => {
              const isResuelto = item.estado.toLowerCase().includes('resuelto')
              return (
                <div key={item.id} className="pqrs-card">
                  <div className="pqrs-card-header">
                    <span className="radicado-id">{item.id}</span>
                    <span className={`status-badge ${isResuelto ? 'badge-resuelto' : 'badge-tramite'}`}>
                      {isResuelto ? 'âœ“ Resuelto' : 'â³ En trÃ¡mite'}
                    </span>
                  </div>

                  <div className="pqrs-card-body">
                    <span className="cat-tag">{item.categoria}</span>
                    <h4 className="solicitante-name">{item.solicitante}</h4>
                    <p className="descripcion-text">{item.descripcion}</p>

                    <div className="meta-fechas">
                      <span><strong>RadicaciÃ³n:</strong> {item.fechaRadicacion}</span>
                      <span><strong>Plazo Legal:</strong> {item.plazoLegal}</span>
                    </div>

                    {isResuelto && item.respuestaOficial && (
                      <div className="respuesta-oficial-box">
                        <div className="respuesta-header">
                          <span className="respuesta-icon">ðŸ’¬</span>
                          <strong>Respuesta Oficial:</strong>
                        </div>
                        <p>{item.respuestaOficial}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ConsultasPage