import React from 'react'
import loading from '../../assets/Double Ring@1x-2.4s-200px-200px.gif'

const Spinner: React.FC = () => {
    return (
        <div className="loader-container">
            <img className="loader" src={loading} alt='loading'/>
        </div>
    )
}

export default Spinner