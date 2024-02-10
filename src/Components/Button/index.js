import React from 'react'
import './styles.css'
function Button({text}) {
  return (
    <div>
        <button>
            {text}
        </button>
    </div>
  )
}

export default Button