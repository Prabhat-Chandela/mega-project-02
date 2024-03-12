import React from 'react'
import {  LogoutBtn } from '../index'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {

    const authStatus = useSelector((state) => state.auth.status)

    const navItems = [
        {
          name: 'HOME',
          slug: "/",
          active: true
        },
        {
          name: "LOGIN",
          slug: "/login",
          active: !authStatus,
        },
        {
          name: "SIGNUP",
          slug: "/signup",
          active: !authStatus,
        },
        {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
        },
        {
          name: "Your Posts",
          slug: "/your-posts",
          active: authStatus,
        },
        {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
        },
      ]

  return (
    <header className='bg-white sm:fixed sm:top-0 sm:bottom-0 w-[15%] mx-auto py-7'>
   
      <nav className='flex flex-col items-start justify-center px-5 py-3 gap-y-16 w-full '>

        <div>

          <div className='text-black flex justify-center items-center'>
            {/* <Logo  width={"w-3"} className={'px-20 sm:px-24'} /> */}
            logo
          </div>

        </div>

        <ul className='flex flex-col gap-10 px-3 text-sm font-semibold items-center justify-center '>
          {navItems.map((item) => item.active ? (

            <li className='w-full' key={item.name}>

              <NavLink
                to={item.slug}
                className={({ isActive }) => ` tracking-wider rounded-lg px-3 py-1  duration-200 ${isActive ? 'text-orange-500 bg-black': 'text-orange-500 hover:text-black'}`}

              >{item.name}</NavLink>
            </li>

          ) : null)}

          {authStatus && (<li><LogoutBtn /></li>)}

        </ul>

      </nav>
   
  </header>
  )
}

export default Header