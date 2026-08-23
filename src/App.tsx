import React, { useState, useEffect } from 'react'
import { Building2, Droplets, Trash2, Lightbulb, FileSearch } from 'lucide-react'
import TarjetaTramite from './components/TarjetaTramite'
import ConsultasPage from './pages/ConsultasPage'
import DetalleConsultaPage from './pages/DetalleConsultaPage'
import './App.css'

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inicio' | 'consultas' | 'detalle'>('inicio')
  const [selectedRadicadoId, setSelectedRadicadoId] = useState<string>('')

  // Sincronizar ruta / hash de la URL
  useEffect(() => {
    const handleHashOrUrl = () => {
      const path = window.location.pathname
      const hash = window.location.hash
      const params = new URLSearchParams(window.location.search)

      if (params.has('id')) {
        setSelectedRadicadoId(params.get('id') || '')
        setActiveTab('detalle')
      } else if (path.includes('/consultas/') || hash.startsWith('#/consultas/')) {
        const idFromPath = path.split('/consultas/')[1] || hash.replace('#/consultas/', '')
        if (idFromPath) {
          setSelectedRadicadoId(idFromPath)
          setActiveTab('detalle')
        } else {
          setActiveTab('consultas')
        }
      } else if (hash === '#/consultas') {
        setActiveTab('consultas')
      }
    }

    handleHashOrUrl()
    window.addEventListener('hashchange', handleHashOrUrl)
    window.addEventListener('popstate', handleHashOrUrl)
    return () => {
      window.removeEventListener('hashchange', handleHashOrUrl)
      window.removeEventListener('popstate', handleHashOrUrl)
    }
  }, [])

  const handleSeleccionarRadicado = (id: string) => {
    setSelectedRadicadoId(id)
    setActiveTab('detalle')
    window.location.hash = `#/consultas/${id}`
  }

  const handleVolverAConsultas = () => {
    setActiveTab('consultas')
    window.location.hash = '#/consultas'
  }

  return (
    <div className="app">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="top-bar-badge">
            <Building2 size={16} /> Portal Institucional de Servicios y Atención Ciudadana
          </div>
          <div>
            <span>Línea Directa: 01-800-CIUDAD</span>
          </div>
        </div>
      </div>

      {/* Portal Header */}
      <header className="portal-header">
        <div className="portal-header-content">
          <div className="escudo-container">
            <Building2 size={36} />
          </div>
          <h1 className="portal-title">Gobierno Municipal</h1>
          <p className="portal-subtitle">
            Sistema Oficial de Atenciónón, gestión de trámites y Respuestas Ciudadanas
          </p>

          <div className="nav-tabs-container" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
            <button
              className={`nav-tab-btn ${activeTab === 'inicio' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('inicio')
                window.location.hash = '#/'
              }}
              id="tab-btn-inicio"
            >
              <Building2 size={16} /> Inicio (trámites)
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'consultas' || activeTab === 'detalle' ? 'active' : ''}`}
              onClick={handleVolverAConsultas}
              id="tab-btn-consultas"
            >
              <FileSearch size={16} /> Consultar Radicados PQRS
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="main-container">
        {activeTab === 'inicio' && (
          <>
            <div className="section-header-box">
              <div>
                <h2 className="section-title">Respuestas</h2>
                <p className="section-description">
                  Consulta el catálogo de Atenciónón rápida a reportes, solicitudes y trámites municipales prioritarios.
                </p>
              </div>
              <span className="tag-counter">3 Categorías Activas</span>
            </div>

            <div className="tramites-grid">
              <TarjetaTramite
                titulo="Agua y Alcantarillado"
                descripcion="Atención inmediata a fugas de agua potable, suspensión o cortes programados del servicio y mantenimiento preventivo o correctivo de la red de alcantarillado."
                categoria="Servicios Básicos"
                icon={<Droplets size={24} />}
              />
              <TarjetaTramite
                titulo="Recolección de Basura"
                descripcion="información de horarios y rutas de camiones recolectores, reporte de acumulación inusual de residuos sólidos y limpieza en puntos críticos del municipio."
                categoria="Limpia Pública"
                icon={<Trash2 size={24} />}
              />
              <TarjetaTramite
                titulo="Alumbrado Público"
                descripcion="Reporte de lámparas y luminarias apagadas, reparación de postes caídos o en riesgo y sustitución de luminarias dañadas."
                categoria="Alumbrado Urbano"
                icon={<Lightbulb size={24} />}
              />
            </div>
          </>
        )}

        {activeTab === 'consultas' && (
          <ConsultasPage onSeleccionarRadicado={handleSeleccionarRadicado} />
        )}

        {activeTab === 'detalle' && (
          <DetalleConsultaPage
            radicadoId={selectedRadicadoId}
            onVolver={handleVolverAConsultas}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="portal-footer">
        <div className="footer-content">
          <div>
            <strong>Gobierno Municipal</strong> — Sistema Oficial de Servicios y Atención Ciudadana
          </div>
          <div>Â© 2026 Todos los derechos reservados</div>
        </div>
      </footer>
    </div>
  )
}

export default App