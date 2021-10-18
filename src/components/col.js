import React from 'react'

export default function Col({ children, size, span }) {
    return (
        <div className={'col' + (size ? '-' + size : '') + (span ? '-' + span : '') }>
            {children}
        </div>
    )
}
