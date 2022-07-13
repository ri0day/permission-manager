import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking -tight">
          <Link
            to="/"
          >
            Permissions Manager
          </Link>
        </span>
      </div>
    </nav>
  )
}
