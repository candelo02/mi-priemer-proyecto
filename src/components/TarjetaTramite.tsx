import React from 'react'

export interface TarjetaTramiteProps {
  titulo: string
  descripcion: string
  categoria: string
  icon?: React.ReactNode
}

export const TarjetaTramite: React.FC<TarjetaTramiteProps> = ({
  titulo,
  descripcion,
  categoria,
  icon
}) => {
  const idSlug = `tramite-${titulo.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <article className="tarjeta-tramite" id={idSlug}>
      <div className="tarjeta-header">
        <span className="tarjeta-categoria">{categoria}</span>
        {icon && <div className="tarjeta-icon">{icon}</div>}
      </div>
      <h3 className="tarjeta-titulo">{titulo}</h3>
      <p className="tarjeta-descripcion">{descripcion}</p>
      <div className="tarjeta-footer">
        <button className="btn-tramite" type="button">
          Consultar Trámite
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default TarjetaTramite