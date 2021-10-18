import React from 'react'

export default function Row({ children }) {
    return (
        <div className="row" style={{marginBlock:'10px'}}>
            {children}
        </div>
    )
}
