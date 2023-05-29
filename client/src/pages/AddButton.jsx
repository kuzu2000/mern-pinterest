import React from 'react'
import { Link } from 'react-router-dom'
const AddButton = () => {
    return (
        <div className="addButton">
      <button><Link to="/create" className="link">+</Link></button>
    </div>
    )
}

export default AddButton
