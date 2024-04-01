import React from 'react'
import { Link } from 'react-router-dom'

export default function Pagination() {
  return (
    <div className='pagination'>
        <ul className="pagination">
            <li className="page-item disabled" aria-label="« Previous">
                <span className="page-link" aria-hidden="true">Previous</span>
            </li>
            <li className="page-item active" aria-current="page">
                <span className="page-link">1</span>
            </li>
            <li className="page-item">
                <Link className="page-link" to="#!">2</Link>
            </li>
            <li className="page-item">
                <Link className="page-link" to="#!">3</Link>
            </li>
            <li className="page-item">
                <Link className="page-link" to="#!">4</Link>
            </li>
            <li className="page-item">
                <Link className="page-link" to="#!">5</Link>
            </li>
            <li className="page-item">
                <Link className="page-link" to="#!" rel="next">Next</Link>
            </li>
        </ul>
    </div>
  )
}
