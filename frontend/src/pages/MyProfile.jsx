import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className='section-padding bg-light'>
            <div className='container-custom max-w-4xl'>
                
                {/* Page Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl md:text-4xl font-bold text-dark mb-2'>My Profile</h1>
                    <p className='text-gray-custom'>Manage your account information</p>
                </div>

                <div className='card p-8'>
                    
                    {/* Profile Picture Section */}
                    <div className='flex flex-col items-center mb-8 pb-8 border-b border-gray-200'>
                        {isEdit ? (
                            <label htmlFor='image' className='cursor-pointer group'>
                                <div className='relative'>
                                    <img 
                                        className='w-32 h-32 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary transition-all' 
                                        src={image ? URL.createObjectURL(image) : userData.image} 
                                        alt='Profile' 
                                    />
                                    <div className='absolute inset-0 bg-dark/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                        <img className='w-10' src={assets.upload_icon} alt='Upload' />
                                    </div>
                                </div>
                                <p className='text-center text-sm text-primary mt-3 font-semibold'>Click to change photo</p>
                                <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden accept='image/*' />
                            </label>
                        ) : (
                            <img 
                                className='w-32 h-32 rounded-full object-cover border-4 border-primary/20' 
                                src={userData.image} 
                                alt='Profile' 
                            />
                        )}

                        {/* Name */}
                        <div className='mt-6 text-center'>
                            {isEdit ? (
                                <input 
                                    className='text-3xl font-bold text-center bg-light rounded-button px-4 py-2 border-2 border-gray-200 focus:border-primary focus:outline-none max-w-md' 
                                    type='text' 
                                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                    value={userData.name} 
                                />
                            ) : (
                                <h2 className='text-3xl font-bold text-dark'>{userData.name}</h2>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className='mb-8'>
                        <h3 className='text-xl font-bold text-dark mb-4 flex items-center gap-2'>
                            <span className='text-2xl'>📧</span>
                            Contact Information
                        </h3>
                        
                        <div className='space-y-4'>
                            {/* Email */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <label className='font-semibold text-gray-custom'>Email:</label>
                                <div className='md:col-span-2'>
                                    <p className='text-dark bg-light px-4 py-3 rounded-button'>{userData.email}</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <label className='font-semibold text-gray-custom'>Phone:</label>
                                <div className='md:col-span-2'>
                                    {isEdit ? (
                                        <input 
                                            className='input-field' 
                                            type='text' 
                                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                            value={userData.phone} 
                                            placeholder='Enter phone number'
                                        />
                                    ) : (
                                        <p className='text-dark bg-light px-4 py-3 rounded-button'>{userData.phone || 'Not provided'}</p>
                                    )}
                                </div>
                            </div>

                            {/* Address */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <label className='font-semibold text-gray-custom'>Address:</label>
                                <div className='md:col-span-2'>
                                    {isEdit ? (
                                        <div className='space-y-2'>
                                            <input 
                                                className='input-field' 
                                                type='text' 
                                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                                value={userData.address.line1} 
                                                placeholder='Address Line 1'
                                            />
                                            <input 
                                                className='input-field' 
                                                type='text' 
                                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                                value={userData.address.line2} 
                                                placeholder='Address Line 2'
                                            />
                                        </div>
                                    ) : (
                                        <p className='text-dark bg-light px-4 py-3 rounded-button'>
                                            {userData.address.line1 || 'Not provided'}<br />
                                            {userData.address.line2}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className='mb-8'>
                        <h3 className='text-xl font-bold text-dark mb-4 flex items-center gap-2'>
                            <span className='text-2xl'>👤</span>
                            Basic Information
                        </h3>
                        
                        <div className='space-y-4'>
                            {/* Gender */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <label className='font-semibold text-gray-custom'>Gender:</label>
                                <div className='md:col-span-2'>
                                    {isEdit ? (
                                        <select 
                                            className='input-field' 
                                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                            value={userData.gender}
                                        >
                                            <option value='Not Selected'>Not Selected</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                            <option value='Other'>Other</option>
                                        </select>
                                    ) : (
                                        <p className='text-dark bg-light px-4 py-3 rounded-button'>{userData.gender || 'Not selected'}</p>
                                    )}
                                </div>
                            </div>

                            {/* Birthday */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <label className='font-semibold text-gray-custom'>Date of Birth:</label>
                                <div className='md:col-span-2'>
                                    {isEdit ? (
                                        <input 
                                            className='input-field' 
                                            type='date' 
                                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                            value={userData.dob} 
                                        />
                                    ) : (
                                        <p className='text-dark bg-light px-4 py-3 rounded-button'>
                                            {userData.dob ? new Date(userData.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not provided'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex justify-end gap-4 pt-6 border-t border-gray-200'>
                        {isEdit ? (
                            <>
                                <button 
                                    onClick={() => {
                                        setIsEdit(false)
                                        setImage(false)
                                        loadUserProfileData()
                                    }} 
                                    className='btn-outline'
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={updateUserProfileData} 
                                    className='btn-primary'
                                >
                                    Save Changes
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={() => setIsEdit(true)} 
                                className='btn-primary'
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile