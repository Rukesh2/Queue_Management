import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        if (!slotDate) return ''

        if (slotDate.includes('_')) {
            const parts = slotDate.split('_')
            const d = parts[0]
            const m = Number(parts[1])
            const y = parts[2]
            const monthName = months[m - 1] || ''
            return `${d} ${monthName} ${y}`
        }

        if (slotDate.includes('-')) {
            const parts = slotDate.split('-')
            if (parts.length === 3) {
                const y = parts[0]
                const m = Number(parts[1])
                const d = Number(parts[2])
                const monthName = months[m - 1] || ''
                return `${d} ${monthName} ${y}`
            }
        }

        const dt = new Date(slotDate)
        if (!isNaN(dt.getTime())) {
            return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`
        }

        return slotDate
    }

    const renderAddressLines = (address) => {
        if (!address) return ['', '']
        if (typeof address === 'string') {
            const parts = address.split('\n').map(p => p.trim()).filter(Boolean)
            return [parts[0] || '', parts[1] || '']
        }
        if (Array.isArray(address)) {
            return [address[0] || '', address[1] || '']
        }
        return [address.line1 || '', address.line2 || '']
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            const appts = Array.isArray(data.appointments) ? data.appointments : []
            setAppointments(appts.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className='section-padding bg-light'>
            <div className='container-custom'>
                
                {/* Page Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl md:text-4xl font-bold text-dark mb-2'>My Appointments</h1>
                    <p className='text-gray-custom'>View and manage your upcoming appointments</p>
                </div>

                {/* Appointments List */}
                <div className='space-y-6'>
                    {appointments.length === 0 ? (
                        <div className='card p-12 text-center'>
                            <div className='w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center'>
                                <span className='text-4xl'>📅</span>
                            </div>
                            <h3 className='text-xl font-semibold text-dark mb-2'>No Appointments Yet</h3>
                            <p className='text-gray-custom mb-6'>Book your first appointment to get started</p>
                            <button onClick={() => navigate('/doctors')} className='btn-primary'>
                                Find Doctors
                            </button>
                        </div>
                    ) : (
                        appointments.map((item, index) => {
                            const docData = item.docData || {}
                            const [addrLine1, addrLine2] = renderAddressLines(docData.address)
                            const queuePosition = (item.queuePosition !== undefined && item.queuePosition !== null) ? item.queuePosition : 1
                            const peopleAhead = (item.peopleAhead !== undefined && item.peopleAhead !== null) ? item.peopleAhead : 0
                            const totalInSlot = (item.totalInSlot !== undefined && item.totalInSlot !== null) ? item.totalInSlot : 1

                            return (
                                <div key={index} className='card overflow-hidden'>
                                    <div className='flex flex-col lg:flex-row'>
                                        
                                        {/* Doctor Image */}
                                        <div className='lg:w-64 flex-shrink-0'>
                                            <img 
                                                className='w-full h-64 lg:h-full object-cover' 
                                                src={docData.image || assets.doctor_placeholder} 
                                                alt={docData.name || 'doctor'} 
                                            />
                                        </div>

                                        {/* Appointment Details */}
                                        <div className='flex-1 p-6 lg:p-8'>
                                            <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4'>
                                                <div>
                                                    <h3 className='text-2xl font-bold text-dark mb-2'>{docData.name || '—'}</h3>
                                                    <p className='text-primary font-semibold mb-3'>{docData.speciality || ''}</p>
                                                    
                                                    {/* Address */}
                                                    <div className='text-sm text-gray-custom mb-4'>
                                                        <p className='font-semibold text-dark mb-1'>📍 Clinic Address:</p>
                                                        <p>{addrLine1}</p>
                                                        <p>{addrLine2}</p>
                                                    </div>

                                                    {/* Date & Time */}
                                                    <div className='inline-block bg-accent/10 px-4 py-2 rounded-button'>
                                                        <p className='text-sm'>
                                                            <span className='font-semibold text-dark'>📅 </span>
                                                            {slotDateFormat(item.slotDate)} at {item.slotTime}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Status Badge */}
                                                <div>
                                                    {item.isCompleted && (
                                                        <span className='inline-block bg-success/10 text-success px-4 py-2 rounded-button font-semibold border-2 border-success/20'>
                                                            ✓ Completed
                                                        </span>
                                                    )}
                                                    {item.cancelled && !item.isCompleted && (
                                                        <span className='inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-button font-semibold border-2 border-secondary/20'>
                                                            ✕ Cancelled
                                                        </span>
                                                    )}
                                                    {!item.cancelled && item.payment && !item.isCompleted && (
                                                        <span className='inline-block bg-primary/10 text-primary px-4 py-2 rounded-button font-semibold border-2 border-primary/20'>
                                                            ✓ Paid
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Queue Information */}
                                            {!item.cancelled && !item.isCompleted && (
                                                <div className='bg-gradient-to-r from-primary/5 to-accent/5 rounded-button p-5 mb-4 border-l-4 border-primary'>
                                                    <h4 className='font-bold text-dark mb-3 flex items-center gap-2'>
                                                        <span className='text-xl'>📊</span>
                                                        Queue Information
                                                    </h4>
                                                    <div className='grid grid-cols-3 gap-4 text-center'>
                                                        <div>
                                                            <p className='text-3xl font-bold text-primary mb-1'>{queuePosition}</p>
                                                            <p className='text-xs text-gray-custom'>Your Position</p>
                                                        </div>
                                                        <div>
                                                            <p className='text-3xl font-bold text-warning mb-1'>{peopleAhead}</p>
                                                            <p className='text-xs text-gray-custom'>People Ahead</p>
                                                        </div>
                                                        <div>
                                                            <p className='text-3xl font-bold text-success mb-1'>{totalInSlot}/10</p>
                                                            <p className='text-xs text-gray-custom'>Total in Slot</p>
                                                        </div>
                                                    </div>
                                                    {queuePosition === 1 && (
                                                        <p className='mt-3 text-sm text-success font-semibold text-center'>
                                                            ✓ You're first in line!
                                                        </p>
                                                    )}
                                                    {peopleAhead > 0 && (
                                                        <p className='mt-3 text-sm text-gray-custom text-center'>
                                                            ⏱️ {peopleAhead} {peopleAhead === 1 ? 'person' : 'people'} ahead of you
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className='flex flex-wrap gap-3'>
                                                {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                                    <button 
                                                        onClick={() => setPayment(item._id)} 
                                                        className='btn-primary'
                                                    >
                                                        Pay Online
                                                    </button>
                                                )}
                                                
                                                {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                                    <>
                                                        <button 
                                                            onClick={() => appointmentStripe(item._id)} 
                                                            className='btn-outline flex items-center gap-2'
                                                        >
                                                            <img className='h-5' src={assets.stripe_logo} alt='Stripe' />
                                                        </button>
                                                        <button 
                                                            onClick={() => appointmentRazorpay(item._id)} 
                                                            className='btn-outline flex items-center gap-2'
                                                        >
                                                            <img className='h-5' src={assets.razorpay_logo} alt='Razorpay' />
                                                        </button>
                                                    </>
                                                )}

                                                {!item.cancelled && !item.isCompleted && (
                                                    <button 
                                                        onClick={() => cancelAppointment(item._id)} 
                                                        className='btn-outline !border-secondary !text-secondary hover:!bg-secondary hover:!text-white'
                                                    >
                                                        Cancel Appointment
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyAppointments