import React from 'react'

const Lengther = ({children,amount}) => {
    return (
        <span>
            {children.length > amount ? `${children.substr(0, amount)}...`: children}
        </span>
    )
}

export default Lengther