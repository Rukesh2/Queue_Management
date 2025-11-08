import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const doc = doctors.find((d) => d._id === docId)
        setDocInfo(doc || null)
    }

    const getBookedCountFor = (slots_booked = {}, dateObj, slotTime) => {
        const year = dateObj.getFullYear()
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
        const day = dateObj.getDate().toString().padStart(2, '0')
        const isoKey = `${year}-${month}-${day}`

        const underscoreKey = `${dateObj.getDate()}_${dateObj.getMonth() + 1}_${dateObj.getFullYear()}`

        let bookedCount = 0
        if (slots_booked[isoKey] && slots_booked[isoKey][slotTime]) {
            bookedCount = slots_booked[isoKey][slotTime].length
        } else if (slots_booked[underscoreKey] && slots_booked[underscoreKey][slotTime]) {
            bookedCount = slots_booked[underscoreKey][slotTime].length
        }
        return bookedCount
    }

    const getAvailableSolts = () => {
        setDocSlots([])

        if (!docInfo) return

        const validSlots = [
            "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
            "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
            "05:00 PM", "06:00 PM", "07:00 PM"
        ]

        const today = new Date()
        const newDocSlots = []

        for (let i = 0; i < 30; i++) {
            const currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)
            currentDate.setHours(0, 0, 0, 0)

            const timeSlots = []

            for (let slotTimeVal of validSlots) {
                const bookedCount = getBookedCountFor(docInfo.slots_booked || {}, currentDate, slotTimeVal)
                const isSlotAvailable = bookedCount < 10

                if (i === 0) {
                    const now = new Date()
                    const [timePart, modifier] = slotTimeVal.split(' ')
                    let [hours, minutes] = timePart.split(':')

                    hours = parseInt(hours, 10)
                    minutes = parseInt(minutes, 10)

                    if (modifier === 'PM' && hours !== 12) {
                        hours += 12
                    }
                    if (modifier === 'AM' && hours === 12) {
                        hours = 0
                    }

                    const slotDateTime = new Date(currentDate)
                    slotDateTime.setHours(hours, minutes, 0, 0)

                    if (slotDateTime <= now) {
                        continue
                    }
                }

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: slotTimeVal,
                        available: 10 - bookedCount
                    })
                }
            }

            if (timeSlots.length > 0) {
                newDocSlots.push(timeSlots)
            }
        }

        setDocSlots(newDocSlots)
        if (slotIndex >= newDocSlots.length) {
            setSlotIndex(0)
            setSlotTime('')
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        if (!slotTime) {
            return toast.warning('Please select a time slot')
        }

        if (!docSlots || !docSlots[slotIndex] || !docSlots[slotIndex][0]) {
            return toast.error('Selected slot date is invalid. Please reselect.')
        }

        const date = docSlots[slotIndex][0].datetime
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        const slotDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/book-appointment',
                { docId, slotDate, slotTime },
                { headers: { token } }
            )

            if (data.success) {
                toast.success(data.message)

                setDocSlots(prev => {
                    const clone = prev.map(daySlots => daySlots.map(slot => ({ ...slot })))
                    if (clone[slotIndex]) {
                        const found = clone[slotIndex].find(s => s.time === slotTime)
                        if (found) {
                            found.available = Math.max(0, found.available - 1)
                        }
                    }
                    return clone
                })

                await getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message || 'Booking failed')
        }
    }

    useEffect(() => {
        if (doctors && doctors.length > 0) {
            const updated = doctors.find(d => d._id === docId)
            setDocInfo(updated || null)
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        } else {
            setDocSlots([])
        }
    }, [docInfo])

    useEffect(() => {
        if (doctors && doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    return docInfo ? (
        <div className='section-padding bg-light'>
            <div className='container-custom'>

                {/* Doctor Profile Card */}
                <div className='card overflow-hidden mb-12'>
                    <div className='flex flex-col lg:flex-row gap-8'>
                        
                        {/* Doctor Image */}
                        <div className='lg:w-1/3'>
                            <div className='relative overflow-hidden'>
                                <img 
                                    className='w-full h-full object-cover' 
                                    src={docInfo.image} 
                                    alt={docInfo.name} 
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent'></div>
                            </div>
                        </div>

                        {/* Doctor Info */}
                        <div className='flex-1 p-8 lg:p-10'>
                            {/* Name & Verification */}
                            <div className='flex items-start justify-between mb-4'>
                                <div>
                                    <h1 className='text-3xl md:text-4xl font-bold text-dark mb-2 flex items-center gap-3'>
                                        {docInfo.name}
                                        <img className='w-6 h-6' src={assets.verified_icon} alt="Verified" />
                                    </h1>
                                    <div className='flex flex-wrap items-center gap-3 text-gray-custom'>
                                        <span className='font-semibold text-dark'>{docInfo.degree}</span>
                                        <span>•</span>
                                        <span className='text-primary font-semibold'>{docInfo.speciality}</span>
                                        <span className='inline-block bg-accent/10 text-primary px-3 py-1 rounded-full text-sm font-semibold'>
                                            {docInfo.experience}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* About Section */}
                            <div className='mb-6'>
                                <h3 className='flex items-center gap-2 text-lg font-bold text-dark mb-3'>
                                    <img className='w-4' src={assets.info_icon} alt="Info" />
                                    About Doctor
                                </h3>
                                <p className='text-gray-custom leading-relaxed'>
                                    {docInfo.about}
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
                                <div className='bg-light rounded-button p-4 text-center'>
                                    <p className='text-2xl font-bold text-primary mb-1'>4.8★</p>
                                    <p className='text-xs text-gray-custom'>Rating</p>
                                </div>
                                <div className='bg-light rounded-button p-4 text-center'>
                                    <p className='text-2xl font-bold text-primary mb-1'>500+</p>
                                    <p className='text-xs text-gray-custom'>Patients</p>
                                </div>
                                <div className='bg-light rounded-button p-4 text-center'>
                                    <p className='text-2xl font-bold text-primary mb-1'>{docInfo.experience}</p>
                                    <p className='text-xs text-gray-custom'>Experience</p>
                                </div>
                                <div className='bg-light rounded-button p-4 text-center'>
                                    <p className='text-2xl font-bold text-primary mb-1'>24/7</p>
                                    <p className='text-xs text-gray-custom'>Available</p>
                                </div>
                            </div>

                            {/* Fee */}
                            <div className='bg-gradient-to-r from-primary/5 to-accent/5 rounded-button p-4 border-l-4 border-primary'>
                                <p className='text-gray-custom text-sm mb-1'>Consultation Fee</p>
                                <p className='text-2xl font-bold text-dark'>
                                    {currencySymbol}{docInfo.fees}
                                    <span className='text-sm font-normal text-gray-custom ml-2'>per session</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Section */}
                <div className='card p-8'>
                    <h2 className='text-2xl font-bold text-dark mb-2'>Book Your Appointment</h2>
                    <p className='text-gray-custom mb-6'>
                        Select a date and time slot • Available for next 30 days • 9:00 AM - 7:00 PM • Max 10 people per slot
                    </p>

                    {/* Date Selection */}
                    <div className='mb-8'>
                        <h3 className='text-lg font-semibold text-dark mb-4'>Select Date</h3>
                        <div className='flex gap-3 overflow-x-auto pb-2'>
                            {docSlots.length > 0 && docSlots.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSlotIndex(index)
                                        setSlotTime('')
                                    }}
                                    className={`flex-shrink-0 text-center py-4 px-6 rounded-button border-2 transition-all ${
                                        slotIndex === index 
                                            ? 'bg-primary text-white border-primary shadow-button' 
                                            : 'bg-white text-dark border-gray-200 hover:border-primary'
                                    }`}
                                >
                                    <p className='text-xs font-semibold mb-1'>
                                        {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                                    </p>
                                    <p className='text-2xl font-bold'>
                                        {item[0] && item[0].datetime.getDate()}
                                    </p>
                                    <p className='text-xs mt-1'>
                                        {item[0] && item[0].datetime.toLocaleDateString('en-US', { month: 'short' })}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Slot Selection */}
                    <div className='mb-8'>
                        <h3 className='text-lg font-semibold text-dark mb-4'>Select Time Slot</h3>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>
                            {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSlotTime(item.time)}
                                    className={`p-4 rounded-button border-2 transition-all text-center ${
                                        item.time === slotTime 
                                            ? 'bg-primary text-white border-primary shadow-button' 
                                            : 'bg-white text-dark border-gray-200 hover:border-primary'
                                    }`}
                                >
                                    <p className='font-semibold mb-1'>{item.time}</p>
                                    <p className={`text-xs ${item.time === slotTime ? 'text-white/80' : 'text-gray-custom'}`}>
                                        {item.available} slots left
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Book Button */}
                    <div className='flex justify-center'>
                        <button 
                            onClick={bookAppointment} 
                            className='btn-primary text-base px-12 py-4'
                        >
                            Confirm Appointment
                        </button>
                    </div>
                </div>

                {/* Related Doctors */}
                <div className='mt-16'>
                    <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
                </div>
            </div>
        </div>
    ) : null
}

export default Appointment