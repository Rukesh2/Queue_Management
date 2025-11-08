import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-[85vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-light via-white to-accent/5'>
      <div className='w-full max-w-md'>
        
        {/* Card Container */}
        <div className='card p-8 md:p-10'>
          
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-block p-4 bg-primary/10 rounded-full mb-4'>
              <svg className='w-12 h-12 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
              </svg>
            </div>
            <h2 className='text-3xl font-bold text-dark mb-2'>
              {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className='text-gray-custom'>
              {state === 'Sign Up' 
                ? 'Sign up to book your first appointment' 
                : 'Log in to manage your appointments'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className='space-y-5'>
            
            {/* Name Field (Sign Up Only) */}
            {state === 'Sign Up' && (
              <div>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Full Name
                </label>
                <input 
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                  className='input-field' 
                  type='text' 
                  placeholder='Enter your full name'
                  required 
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className='block text-sm font-semibold text-dark mb-2'>
                Email Address
              </label>
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                className='input-field' 
                type='email' 
                placeholder='Enter your email'
                required 
              />
            </div>

            {/* Password Field */}
            <div>
              <label className='block text-sm font-semibold text-dark mb-2'>
                Password
              </label>
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                className='input-field' 
                type='password' 
                placeholder='Enter your password'
                required 
              />
              {state === 'Sign Up' && (
                <p className='text-xs text-gray-custom mt-2'>
                  Must be at least 8 characters long
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type='submit'
              className='btn-primary w-full text-base'
            >
              {state === 'Sign Up' ? 'Create Account' : 'Log In'}
            </button>

            {/* Divider */}
            <div className='relative my-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-200'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-4 bg-white text-gray-custom'>or</span>
              </div>
            </div>

            {/* Toggle State */}
            <div className='text-center'>
              {state === 'Sign Up' ? (
                <p className='text-gray-custom'>
                  Already have an account?{' '}
                  <button 
                    type='button'
                    onClick={() => setState('Login')} 
                    className='text-primary font-semibold hover:underline'
                  >
                    Log in here
                  </button>
                </p>
              ) : (
                <p className='text-gray-custom'>
                  Don't have an account?{' '}
                  <button 
                    type='button'
                    onClick={() => setState('Sign Up')} 
                    className='text-primary font-semibold hover:underline'
                  >
                    Sign up here
                  </button>
                </p>
              )}
            </div>
          </form>

          {/* Features List */}
          <div className='mt-8 pt-8 border-t border-gray-200'>
            <p className='text-sm font-semibold text-dark mb-4'>Why choose us?</p>
            <div className='space-y-3'>
              <div className='flex items-start gap-3'>
                <div className='w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <span className='text-success text-xs'>✓</span>
                </div>
                <p className='text-sm text-gray-custom'>Verified doctors with years of experience</p>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <span className='text-success text-xs'>✓</span>
                </div>
                <p className='text-sm text-gray-custom'>Quick and hassle-free booking process</p>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-5 h-5 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                  <span className='text-success text-xs'>✓</span>
                </div>
                <p className='text-sm text-gray-custom'>24/7 customer support for your convenience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <p className='text-center text-xs text-gray-custom mt-6'>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default Login