import React from 'react'
import { Link } from 'react-router-dom'

export const Anchor = ({ classText, path, innerText }) => {
    return (
        <span className={classText}>
            <Link to={path} dangerouslySetInnerHTML={{ __html: innerText }}></Link>
        </span>
    )
}
