import React, { useState, useEffect, useCallback } from 'react'
import {
  ArrowLeft,
  Copy,
  Check,
  FileText,
  User,
  Tag,
  Calendar,
  ShieldAlert,
  Building2,
  CircleCheck,
  Clock,
  RotateCw,
  Share2,
  CheckCircle2
} from 'lucide-react'
import './DetalleConsultaPage.css'

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

interface DetalleConsultaPageProps {
  radicadoId?: string
  onVolver?: () => void
}

export const DetalleConsultaPage: React.FC<DetalleConsultaPageProps> = ({
  radicadoId,
  onVolver
}) => {
  const [item, setItem] = useState<PqrsItem | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [copiado, setCopiado] = useState<boolean>(false)

  // Extraer el ID desde la prop, hash, o query param
  const activeId =
    radicadoId ||
    new URLSearchParams(window.location.search).get('id') ||
    window.location.hash.replace('#/consultas/', '').replace('#', '') ||
    'PQRS-2026-001'

  const fetchDetalle = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Intentar consultar el endpoint individual o la lista completa
      let found: PqrsItem | null = null
      try {
        const resSingle = await fetch(`/api/pqrs/${activeId}`)
        if (resSingle.ok) {
          const singleData = await resSingle.json()
          if (singleData.data) found = singleData.data
        }
      } catch {
        // Fallback si falla el endpoint individual
      }

      if (!found) {
        const resList = await fetch('/api/pqrs')
        if (!resList.ok) throw new Error(`Error (${resList.status})`)
        const listData = await resList.json()
        const items: PqrsItem[] = Array.isArray(listData) ? listData : listData.data || []
        
        // Buscar por ID exacto o por Ã­ndice numérico (ej: /consultas/1 -> PQRS-2026-001)
        found = items.find(
          (p) =>
            p.id.toLowerCase() === activeId.toLowerCase() ||
            p.id.endsWith(`00${activeId}`) ||
            p.id.endsWith(`0${activeId}`) ||
            p.id === `PQRS-2026-0${activeId.padStart(2, '0')}` ||
            p.id === `PQRS-2026-${activeId.padStart(3, '0')}`
        ) || items[0] || null
      }

      if (!found) {
        throw new Error(`No se encontró el radicado ${activeId}`)
      }

      setItem(found)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cargar el detalle del radicado.')
    } finally {
      setLoading(false)
    }
  }, [activeId])

  useEffect(() => {
    fetchDetalle()
  }, [fetchDetalle])

  // Copiar Enlace al portapapeles
  const handleCopiarEnlace = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#/consultas/${item?.id || activeId}`
    navigator.clipboard.writeText(shareUrl)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2500)
  }

  // Manejar el retorno a la lista de consultas
  const handleVolver = () => {
    if (onVolver) {
      onVolver()
    } else {
      window.location.hash = '#/consultas'
    }
  }

  if (loading) {
    return (
      <div className="detalle-state-card">
        <RotateCw className="spin-icon" size={40} color="#003399" />
        <h3>Cargando Ficha Técnica...</h3>
        <p>Obteniendo el expediente completo del radicado {activeId}.</p>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="detalle-state-card error">
        <ShieldAlert size={48} color="#dc2626" />
        <h3>No se pudo cargar el radicado</h3>
        <p>{error || 'El radicado solicitado no existe en el sistema.'}</p>
        <button className="btn-volver-consultas" onClick={handleVolver}>
          <ArrowLeft size={18} /> Volver a Consultas
        </button>
      </div>
    )
  }

  const isResuelto = item.estado.toLowerCase().includes('resuelto')

  return (
    <div className="detalle-page-container">
      {/* Botón Superior para Volver */}
      <div className="top-navigation-bar">
        <button className="btn-back-link" onClick={handleVolver}>
          <ArrowLeft size={18} /> Volver a Consultas
        </button>
        <div className="action-buttons-group">
          <button
            className={`btn-copiar-enlace ${copiado ? 'copiado' : ''}`}
            onClick={handleCopiarEnlace}
            title="Copiar enlace directo de este radicado"
          >
            {copiado ? (
              <>
                <Check size={18} /> Â¡Enlace Copiado!
              </>
            ) : (
              <>
                <Copy size={18} /> Copiar Enlace
              </>
            )}
          </button>
        </div>
      </div>

      {/* Ficha Técnica Principal */}
      <div className="ficha-tecnica-card">
        {/* Encabezado Ficha Técnica */}
        <div className="ficha-header">
          <div className="ficha-title-box">
            <div className="badge-expediente">Expediente Oficial PQRS</div>
            <h2 className="ficha-radicado-id">
              <FileText size={28} /> {item.id}
            </h2>
          </div>
          <div className="ficha-status-box">
            <span className={`status-badge-large ${isResuelto ? 'resuelto' : 'tramite'}`}>
              {isResuelto ? <CircleCheck size={18} /> : <Clock size={18} />}
              {item.estado}
            </span>
          </div>
        </div>

        {/* Rejilla de información General */}
        <div className="info-grid-section">
          <div className="info-item">
            <span className="info-label">
              <User size={16} /> Solicitante / Ciudadano:
            </span>
            <span className="info-value text-bold">{item.solicitante}</span>
          </div>

          <div className="info-item">
            <span className="info-label">
              <Tag size={16} /> Categoría del Servicio:
            </span>
            <span className="info-value category-chip">{item.categoria}</span>
          </div>

          <div className="info-item">
            <span className="info-label">
              <Calendar size={16} /> Fecha de Radicación:
            </span>
            <span className="info-value">{item.fechaRadicacion}</span>
          </div>

          <div className="info-item">
            <span className="info-label">
              <ShieldAlert size={16} /> Plazo Legal Respuesta:
            </span>
            <span className="info-value highlight-plazo">{item.plazoLegal}</span>
          </div>

          <div className="info-item full-width">
            <span className="info-label">
              <Building2 size={16} /> Dependencia Asignada:
            </span>
            <span className="info-value">
              SecretarÃ­a de Servicios Públicos y Atenciónón Ciudadana — Municipalidad
            </span>
          </div>
        </div>

        {/* Sección: Descripción del Trámite */}
        <div className="detalle-block-section">
          <h3 className="block-title">Descripción Detallada de la Solicitud</h3>
          <div className="descripcion-content-box">
            <p>{item.descripcion}</p>
          </div>
        </div>

        {/* Sección: Respuesta Oficial o Estado de Atenciónón */}
        <div className="detalle-block-section">
          <h3 className="block-title">Respuesta Oficial y Dictamen Téchnico</h3>

          {isResuelto && item.respuestaOficial ? (
            <div className="respuesta-oficial-card">
              <div className="respuesta-card-header">
                <CheckCircle2 size={22} color="#15803d" />
                <span>Dictamen Final Emitido</span>
              </div>
              <p className="respuesta-text">{item.respuestaOficial}</p>
            </div>
          ) : (
            <div className="en-tramite-card">
              <div className="en-tramite-header">
                <Clock size={22} color="#b45309" />
                <span>Trámite en Proceso de Atenciónón</span>
              </div>
              <p>
                La solicitud se encuentra asignada al equipo técnico de cuadrilla para inspección en terreno dentro del plazo legal estipulado.
              </p>
            </div>
          )}
        </div>

        {/* Footer / Acciones de la Ficha Técnica */}
        <div className="ficha-footer-actions">
          <button className="btn-secondary-action" onClick={handleVolver}>
            <ArrowLeft size={18} /> Volver a Consultas
          </button>

          <button
            className={`btn-primary-action ${copiado ? 'success' : ''}`}
            onClick={handleCopiarEnlace}
          >
            {copiado ? (
              <>
                <Check size={18} /> Enlace Copiado al Portapapeles
              </>
            ) : (
              <>
                <Share2 size={18} /> Copiar Enlace Directo
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetalleConsultaPage