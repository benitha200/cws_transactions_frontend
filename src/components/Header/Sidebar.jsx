import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState } from "react"
import React from 'react'
import logo from '../../assets/img/RwacofLogoCoulRVB.png'
import { Link } from "react-router-dom"

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true)
  
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-5 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text,to, active, alert }) {
  const { expanded } = useContext(SidebarContext)
  
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-teal-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
            <Link
    to={to}
    className="flex items-center"
    >
    {icon}

    <span
        className={`overflow-hidden transition-all ${
        expanded ? "w-52 ml-3" : "w-0"
        }`}
    >
        {text}
    </span>
    </Link>
      {/* {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-teal-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-teal-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )} */}
    </li>
  )
}