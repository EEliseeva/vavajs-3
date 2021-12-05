import React from 'react'

export default function Title({name, title}) {
    return (
        <div className="row">
            <div className="col">
                <h1>{name} {title}</h1>
            </div>
        </div>
    )
}
