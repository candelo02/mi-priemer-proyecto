import React, { useState, useEffect, useCallback } from 'react'
import {
  Search,
  RotateCw,
  CircleAlert,
  CircleCheck,
  Clock,
  FileQuestion,
  FileText,
  Tag,
  User,
  Calendar,
  ShieldAlert,
  ChevronRight
} from 'lucide-react'
import './ConsultasPage.css'

export interface PqrsItem {
  id: string
  solicitante: string
  categoria: string
  descripcion: string
  estado: string
  fechaRadicacion: string
  plazoLegal: string
  respuestaOficial: string | null
}

interface ConsultasPageProps {
  onSeleccionarRadicado?: (id: string) => void
}

export const ConsultasPage: React.FC<ConsultasPageProps> = ({
  onSeleccionarRadicado
}) => {
  const [pqrsList, setPqrsList] = useState<PqrsItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas')

  const fetchPqrs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/pqrs')
      if (!response.ok) {
        throw new Error(`Error en el servidor (${response.status}: ${response.statusText})`)
      }
      const data = await response.json()
      if (Array.isArray(data)) {
        setPqrsList(data)
      } else if (data && Array.isArray(data.data)) {
        setPqrsList(data.data)
      } else {
        throw new Error('Formato de datos no vÃ¡lido')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'No se pudo establecer conexiÃ³n con el servidor.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPqrs()
  }, [fetchPqrs])

  const handleCardClick = (id: string) => {
    if (onSeleccionarRadicado) {
      onSeleccionarRadicado(id)
    } else {
      window.location.hash = `#/consultas/${id}`
    }
  }

  const filteredPqrs = pqrsList.filter((item) => {
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch =
      q === '' ||
      item.id.toLowerCase().includes(q) ||
      item.solicitante.toLowerCase().includes(q) ||
      item.descripcion.toLowerCase().includes(q) ||
      item.categoria.toLowerCase().includes(q) ||
      item.estado.toLowerCase().includes(q)

    const matchesCategory =
      selectedCategory === 'Todas' || item.categoria === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="consultas-page">
      {/* Encabezado con Buscador y Chips de CategorÃ­a */}
      <div className="consultas-search-header">
        <div className="search-box-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por NÂº Radicado, Nombre, CategorÃ­a o Estado..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="input-busqueda-pqrs"
          />
          {searchQuery && (
            <button
              className="btn-clear-search"
              onClick={() => setSearchQuery('')}
              title="Limpiar bÃºsqueda"
            >
              âœ•
            </button>
          )}
        </div>

        <div className="category-filters">
          {['Todas', 'Agua y Alcantarillado', 'RecolecciÃ³n de Basura', 'Alumbrado PÃºblico'].map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ESTADO 1: CARGANDO */}
      {loading && (
        <div className="state-card loading-state" id="state-loading">
          <RotateCw className="spin-icon" size={38} color="#003399" />
          <h3>Cargando trÃ¡mites y radicados...</h3>
          <p>Consultando el sistema de registro de atenciÃ³n ciudadana.</p>
        </div>
      )}

      {/* ESTADO 2: ERROR */}
      {!loading && error && (
        <div className="state-card error-state" id="state-error">
          <CircleAlert size={44} color="#dc2626" />
          <h3>Error de ConexiÃ³n</h3>
          <p>{error}</p>
          <button className="btn-retry" onClick={fetchPqrs} id="btn-reintentar-pqrs">
            <RotateCw size={16} /> Reintentar Consulta
          </button>
        </div>
      )}

      {/* ESTADO 3: VACÃO */}
      {!loading && !error && filteredPqrs.length === 0 && (
        <div className="state-card empty-state" id="state-empty">
          <FileQuestion size={44} color="#64748b" />
          <h3>No se encontraron trÃ¡mites</h3>
          <p>
            No hay radicados que coincidan con la bÃºsqueda "<strong>{searchQuery}</strong>"
            {selectedCategory !== 'Todas' && ` en la categorÃ­a "${selectedCategory}"`}.
          </p>
          <button
            className="btn-reset-filters"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('Todas')
            }}
          >
            Restablecer Filtros
          </button>
        </div>
      )}

      {/* ESTADO 4: LISTA CON DATOS */}
      {!loading && !error && filteredPqrs.length > 0 && (
        <div className="pqrs-grid" id="state-data-list">
          {filteredPqrs.map((item) => {
            const isResuelto = item.estado.toLowerCase().includes('resuelto')
            return (
              <article
                key={item.id}
                className="pqrs-card clickable-card"
                onClick={() => handleCardClick(item.id)}
                title="Haz clic para ver la ficha tÃ©cnica completa"
              >
                <div className="pqrs-card-header">
                  <span className="pqrs-radicado">
                    <FileText size={15} /> {item.id}
                  </span>
                  <span className={`status-badge ${isResuelto ? 'status-resuelto' : 'status-tramite'}`}>
                    {isResuelto ? <CircleCheck size={14} /> : <Clock size={14} />}
                    {item.estado}
                  </span>
                </div>

                <div className="pqrs-card-body">
                  <div className="pqrs-category-tag">
                    <Tag size={13} /> {item.categoria}
                  </div>
                  <h4 className="pqrs-solicitante">
                    <User size={16} /> {item.solicitante}
                  </h4>
                  <p className="pqrs-descripcion">{item.descripcion}</p>

                  <div className="pqrs-meta-row">
                    <span>
                      <Calendar size={14} /> Radicado: <strong>{item.fechaRadicacion}</strong>
                    </span>
                    <span>
                      <ShieldAlert size={14} /> Plazo: <strong>{item.plazoLegal}</strong>
                    </span>
                  </div>

                  {item.respuestaOficial && (
                    <div className="pqrs-respuesta-box">
                      <strong>Respuesta Oficial:</strong>
                      <p>{item.respuestaOficial}</p>
                    </div>
                  )}

                  <div className="ver-ficha-link">
                    <span>Ver Ficha TÃ©cnica</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ConsultasPage