import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-soft'>
      <div className='container-custom flex items-center justify-between py-4'>
        {/* Logo */}
        <div onClick={() => navigate('/')} className='cursor-pointer transform hover:scale-105 transition-transform duration-300'>
          <img className='w-64 md:w-72 lg:w-80' src={assets.logo} alt="MediQueue Logo" />
        </div>

        {/* Desktop Navigation */}
        <ul className='md:flex items-center gap-8 font-medium hidden'>
          <NavLink to='/' className='group'>
            <li className='py-2 text-dark hover:text-primary transition-colors duration-300'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300 hidden' />
          </NavLink>
          <NavLink to='/doctors' className='group'>
            <li className='py-2 text-dark hover:text-primary transition-colors duration-300'>ALL DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300 hidden' />
          </NavLink>
          <NavLink to='/about' className='group'>
            <li className='py-2 text-dark hover:text-primary transition-colors duration-300'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300 hidden' />
          </NavLink>
          <NavLink to='/contact' className='group'>
            <li className='py-2 text-dark hover:text-primary transition-colors duration-300'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300 hidden' />
          </NavLink>
        </ul>

        {/* User Actions */}
        <div className='flex items-center gap-4'>
          {
            token && userData
              ? <div className='flex items-center gap-3 cursor-pointer group relative'>
                  <div className='flex items-center gap-2 px-4 py-2 rounded-button bg-light hover:bg-primary/10 transition-all duration-300'>
                    <img className='w-9 h-9 rounded-full object-cover ring-2 ring-primary/20' src={userData.image} alt="Profile" />
                    <img className='w-3' src={assets.dropdown_icon} alt="Dropdown" />
                  </div>
                  <div className='absolute top-0 right-0 pt-16 text-base font-medium z-20 hidden group-hover:block'>
                    <div className='min-w-52 bg-white rounded-card shadow-card-hover border border-gray-100 overflow-hidden'>
                      <div className='bg-gradient-to-r from-primary to-accent p-4 text-white'>
                        <p className='font-semibold'>{userData.name || 'User'}</p>
                        <p className='text-sm opacity-90'>{userData.email}</p>
                      </div>
                      <div className='flex flex-col'>
                        <p onClick={() => navigate('/my-profile')} className='px-5 py-3 hover:bg-light cursor-pointer transition-colors border-b border-gray-100'>
                          My Profile
                        </p>
                        <p onClick={() => navigate('/my-appointments')} className='px-5 py-3 hover:bg-light cursor-pointer transition-colors border-b border-gray-100'>
                          My Appointments
                        </p>
                        <p onClick={logout} className='px-5 py-3 hover:bg-secondary/10 text-secondary cursor-pointer transition-colors font-medium'>
                          Logout
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              : <button onClick={() => navigate('/login')} className='btn-primary hidden md:block'>
                  Get Started
                </button>
          }
          
          {/* Mobile Menu Button */}
          <button onClick={() => setShowMenu(true)} className='w-10 h-10 md:hidden flex items-center justify-center rounded-button hover:bg-light transition-colors'>
            <img className='w-6' src={assets.menu_icon} alt="Menu" />
          </button>

          {/* Mobile Menu */}
          <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-50 overflow-hidden bg-white transition-all duration-300`}>
            <div className='flex items-center justify-between px-6 py-5 border-b border-gray-200'>
              <img src={assets.logo} className='w-44' alt="MediQueue Logo" />
              <button onClick={() => setShowMenu(false)} className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-light transition-colors'>
                <img src={assets.cross_icon} className='w-7' alt="Close" />
              </button>
            </div>
            <ul className='flex flex-col gap-1 mt-6 px-6 text-lg font-medium'>
              <NavLink onClick={() => setShowMenu(false)} to='/'>
                <p className='px-5 py-3 rounded-button hover:bg-light transition-colors'>HOME</p>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
                <p className='px-5 py-3 rounded-button hover:bg-light transition-colors'>ALL DOCTORS</p>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/about'>
                <p className='px-5 py-3 rounded-button hover:bg-light transition-colors'>ABOUT</p>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/contact'>
                <p className='px-5 py-3 rounded-button hover:bg-light transition-colors'>CONTACT</p>
              </NavLink>
            </ul>
            
            {!token && (
              <div className='px-6 mt-8'>
                <button onClick={() => { navigate('/login'); setShowMenu(false); }} className='btn-primary w-full'>
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar