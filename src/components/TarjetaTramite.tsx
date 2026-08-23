import React from 'react'

export interface TarjetaTramiteProps {
  titulo: string
  descripcion: string
  categoria: string
  icono?: React.ReactNode
}

export const TarjetaTramite: React.FC<TarjetaTramiteProps> = ({
  titulo,
  descripcion,
  categoria,
  icono
}) => {
  return (
    <article className="tarjeta-tramite">
      <div className="tarjeta-header">
        <span className="categoria-badge">{categoria}</span>
        {icono && <div className="tarjeta-icono">{icono}</div>}
      </div>
      <h3 className="tarjeta-titulo">{titulo}</h3>
      <p className="tarjeta-descripcion">{descripcion}</p>
      <div className="tarjeta-footer">
        <button type="button" className="btn-tramite">
          Consultar Solicitud
        </button>
      </div>
    </article>
  )
}

export default TarjetaTramite