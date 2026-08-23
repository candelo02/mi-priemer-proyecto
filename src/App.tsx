import React, { useState } from 'react'
import { Building2, Droplets, Trash2, Lightbulb, FileSearch } from 'lucide-react'
import TarjetaTramite from './components/TarjetaTramite'
import ConsultasPage from './pages/ConsultasPage'
import './App.css'

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inicio' | 'consultas'>('inicio')

  return (
    <div className="app">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="top-bar-badge">
            <Building2 size={16} /> Portal Institucional de Servicios y AtenciÃ³n Ciudadana
          </div>
          <div>
            <span>LÃ­nea Directa: 01-800-CIUDAD</span>
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
            Sistema Oficial de AtenciÃ³n, GestiÃ³n de TrÃ¡mites y Respuestas Ciudadanas
          </p>

          <div className="nav-tabs-container" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
            <button
              className={`nav-tab-btn ${activeTab === 'inicio' ? 'active' : ''}`}
              onClick={() => setActiveTab('inicio')}
              id="tab-btn-inicio"
            >
              <Building2 size={16} /> Inicio (TrÃ¡mites)
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'consultas' ? 'active' : ''}`}
              onClick={() => setActiveTab('consultas')}
              id="tab-btn-consultas"
            >
              <FileSearch size={16} /> Consultar Radicados PQRS
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="main-container">
        {activeTab === 'inicio' ? (
          <>
            <div className="section-header-box">
              <div>
                <h2 className="section-title">Respuestas</h2>
                <p className="section-description">
                  Consulta el catÃ¡logo de atenciÃ³n rÃ¡pida a reportes, solicitudes y trÃ¡mites municipales prioritarios.
                </p>
              </div>
              <span className="tag-counter">3 CategorÃ­as Activas</span>
            </div>

            <div className="tramites-grid">
              <TarjetaTramite
                titulo="Agua y Alcantarillado"
                descripcion="AtenciÃ³n inmediata a fugas de agua potable, suspensiÃ³n o cortes programados del servicio y mantenimiento preventivo o correctivo de la red de alcantarillado."
                categoria="Servicios BÃ¡sicos"
                icon={<Droplets size={24} />}
              />
              <TarjetaTramite
                titulo="RecolecciÃ³n de Basura"
                descripcion="InformaciÃ³n de horarios y rutas de camiones recolectores, reporte de acumulaciÃ³n inusual de residuos sÃ³lidos y limpieza en puntos crÃ­ticos del municipio."
                categoria="Limpia PÃºblica"
                icon={<Trash2 size={24} />}
              />
              <TarjetaTramite
                titulo="Alumbrado PÃºblico"
                descripcion="Reporte de lÃ¡mparas y luminarias apagadas, reparaciÃ³n de postes caÃ­dos o en riesgo y sustituciÃ³n de luminarias daÃ±adas."
                categoria="Alumbrado Urbano"
                icon={<Lightbulb size={24} />}
              />
            </div>
          </>
        ) : (
          <ConsultasPage />
        )}
      </main>

      {/* Footer */}
      <footer className="portal-footer">
        <div className="footer-content">
          <div>
            <strong>Gobierno Municipal</strong> â€” Sistema Oficial de Servicios y AtenciÃ³n Ciudadana
          </div>
          <div>Â© 2026 Todos los derechos reservados</div>
        </div>
      </footer>
    </div>
  )
}

export default App