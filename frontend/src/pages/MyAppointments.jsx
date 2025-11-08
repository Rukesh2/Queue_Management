import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import QueueStatusCard from '../components/QueueStatusCard'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')
    const [isPolling, setIsPolling] = useState(true)

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Format date - supports underscore (D_M_YYYY) and ISO (YYYY-MM-DD)
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

    // Render address lines
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

    // Get user appointments
    const getUserAppointments = async (showToast = false) => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            const appts = Array.isArray(data.appointments) ? data.appointments : []
            setAppointments(appts.reverse())
            
            if (showToast) {
                toast.success('Appointments refreshed')
            }
        } catch (error) {
            console.log(error)
            if (showToast) {
                toast.error(error.message)
            }
        }
    }

    // Update patient status (on-my-way, arrived)
    const updatePatientStatus = async (appointmentId, status) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/update-status',
                { appointmentId, status },
                { headers: { token } }
            )

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

    // Cancel appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/cancel-appointment',
                { appointmentId },
                { headers: { token } }
            )

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

    // Razorpay payment
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
                try {
                    const { data } = await axios.post(
                        backendUrl + "/api/user/verifyRazorpay",
                        response,
                        { headers: { token } }
                    );
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
            const { data } = await axios.post(
                backendUrl + '/api/user/payment-razorpay',
                { appointmentId },
                { headers: { token } }
            )
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
            const { data } = await axios.post(
                backendUrl + '/api/user/payment-stripe',
                { appointmentId },
                { headers: { token } }
            )
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

    // Initial load
    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    // Polling - refresh every 30 seconds
    useEffect(() => {
        if (!token || !isPolling) return

        const interval = setInterval(() => {
            getUserAppointments(false) // Silent refresh
        }, 30000) // 30 seconds

        return () => clearInterval(interval)
    }, [token, isPolling])

    return (
        <div>
            <div className='flex justify-between items-center pb-3 mt-12 border-b'>
                <p className='text-lg font-medium text-gray-600'>My appointments</p>
                <div className='flex gap-2 items-center'>
                    <button
                        onClick={() => getUserAppointments(true)}
                        className='text-sm px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all'
                    >
                        🔄 Refresh
                    </button>
                    <button
                        onClick={() => setIsPolling(!isPolling)}
                        className={`text-xs px-3 py-2 rounded-lg transition-all ${
                            isPolling 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        {isPolling ? '● Auto-refresh ON' : '○ Auto-refresh OFF'}
                    </button>
                </div>
            </div>

            <div className=''>
                {appointments.length === 0 ? (
                    <div className='text-center py-20'>
                        <p className='text-gray-500 text-lg'>No appointments found</p>
                        <button
                            onClick={() => navigate('/doctors')}
                            className='mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90'
                        >
                            Book an Appointment
                        </button>
                    </div>
                ) : (
                    appointments.map((item, index) => {
                        const docData = item.docData || {}
                        const [addrLine1, addrLine2] = renderAddressLines(docData.address)
                        const queuePosition = item.queuePosition ?? 1
                        const peopleAhead = item.peopleAhead ?? 0
                        const totalInSlot = item.totalInSlot ?? 1

                        return (
                            <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
                                <div>
                                    <img
                                        className='w-36 bg-[#EAEFFF] rounded-lg'
                                        src={docData.image || assets.doctor_placeholder}
                                        alt={docData.name || 'doctor'}
                                    />
                                </div>

                                <div className='flex-1 text-sm text-[#5E5E5E]'>
                                    <p className='text-[#262626] text-base font-semibold'>
                                        {docData.name || '—'}
                                    </p>
                                    <p>{docData.speciality || ''}</p>
                                    <p className='text-[#464646] font-medium mt-1'>Address:</p>
                                    <p>{addrLine1}</p>
                                    <p>{addrLine2}</p>
                                    <p className='mt-1'>
                                        <span className='text-sm text-[#3C3C3C] font-medium'>
                                            Date & Time:
                                        </span>{' '}
                                        {slotDateFormat(item.slotDate)} | {item.slotTime}
                                    </p>

                                    {/* Progressive Queue Status Card */}
                                    {!item.cancelled && !item.isCompleted && (
                                        <QueueStatusCard
                                            queuePosition={queuePosition}
                                            peopleAhead={peopleAhead}
                                            totalInSlot={totalInSlot}
                                            estimatedTime={item.estimatedTime || item.slotTime}
                                            suggestedArrival={item.suggestedArrival}
                                            patientStatus={item.patientStatus}
                                            onStatusUpdate={(status) => updatePatientStatus(item._id, status)}
                                        />
                                    )}
                                </div>

                                <div></div>

                                <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                                    {/* Payment buttons */}
                                    {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                        <button
                                            onClick={() => setPayment(item._id)}
                                            className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'
                                        >
                                            Pay Online
                                        </button>
                                    )}
                                    {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                        <>
                                            <button
                                                onClick={() => appointmentStripe(item._id)}
                                                className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 transition-all duration-300 flex items-center justify-center'
                                            >
                                                <img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="" />
                                            </button>
                                            <button
                                                onClick={() => appointmentRazorpay(item._id)}
                                                className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 transition-all duration-300 flex items-center justify-center'
                                            >
                                                <img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="" />
                                            </button>
                                        </>
                                    )}
                                    {!item.cancelled && item.payment && !item.isCompleted && (
                                        <button className='sm:min-w-48 py-2 border rounded text-[#696969] bg-[#EAEFFF]'>
                                            Paid
                                        </button>
                                    )}

                                    {/* Status buttons */}
                                    {item.isCompleted && (
                                        <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
                                            Completed
                                        </button>
                                    )}
                                    {!item.cancelled && !item.isCompleted && (
                                        <button
                                            onClick={() => cancelAppointment(item._id)}
                                            className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                                        >
                                            Cancel appointment
                                        </button>
                                    )}
                                    {item.cancelled && !item.isCompleted && (
                                        <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                                            Appointment cancelled
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default MyAppointments