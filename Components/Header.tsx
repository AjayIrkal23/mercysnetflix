import React from 'react'
import { useState, useEffect } from 'react'
import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import useAuth from '../Hooks/useAuth'

export const Header = () => {
  const { logout } = useAuth()
  const [isScrolled, setisScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setisScrolled(true)
      } else {
        setisScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
  }, [])
  return (
    <header className={`${isScrolled ? 'bg-[#141414]' : 'bg-[gray]/30'}`}>
      <div className="flex items-center space-x-2 md:space-x-10 ">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          alt="Netflix logo"
          height={100}
          className="object-contain cursor-pointer"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">Tv Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">Popular & New</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden w-6 h-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="w-6 h-6 " onClick={logout} />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="rounded cursor-pointer"
          />
        </Link>
      </div>
    </header>
  )
}
