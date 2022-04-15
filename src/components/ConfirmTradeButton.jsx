import React from 'react'
import { useState } from 'react'
import LoadingOverlay from 'react-loading-overlay'

export function ConfirmTradeButton() {
  const [loading, setLoading] = useState(false)

  const triggerLike = ()=>{
      setLoading(true)
      setTimeout (()=>{
          setLoading(false)
      },2500)
  }

  return (
    <LoadingOverlay
        style = {{width:"100%", height:"100%"}}
        active={loading}
        spinner
        fadeSpeed="250"
        text="Cargando...">
                 <button className="confirm_button" onClick={triggerLike}>Confirmar Intercambio</button>
                 </LoadingOverlay>
  )
}
