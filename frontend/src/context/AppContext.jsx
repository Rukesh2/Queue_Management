import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)
    const [appointments, setAppointments] = useState([])
    const [isPollingEnabled, setIsPollingEnabled] = useState(true)

    // Getting Doctors using API
    const getDoctosData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // Getting User Profile using API
    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // Getting User Appointments using API
    const getUserAppointments = async (silent = true) => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            
            if (data.success) {
                setAppointments(data.appointments)
                
                // Check if any appointment is at position #1 or #2
                const urgentAppointments = data.appointments.filter(
                    apt => !apt.cancelled && !apt.isCompleted && (apt.queuePosition === 1 || apt.queuePosition === 2)
                )
                
                // Show notification for urgent positions (optional - can be removed if too noisy)
                if (!silent && urgentAppointments.length > 0) {
                    urgentAppointments.forEach(apt => {
                        if (apt.queuePosition === 1) {
                            toast.info(`🔔 It's your turn with Dr. ${apt.docData?.name}!`, {
                                autoClose: 8000,
                                position: "top-center"
                            })
                        } else if (apt.queuePosition === 2) {
                            toast.warning(`⚠️ You're next with Dr. ${apt.docData?.name}! Get ready.`, {
                                autoClose: 6000,
                                position: "top-center"
                            })
                        }
                    })
                }
            }
        } catch (error) {
            if (!silent) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    // Initial data load
    useEffect(() => {
        getDoctosData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
            getUserAppointments(true) // Initial silent load
        } else {
            setUserData(false)
            setAppointments([])
        }
    }, [token])

    // Global polling for appointments (every 30 seconds when logged in)
    useEffect(() => {
        if (!token || !isPollingEnabled) return

        // Set up polling interval
        const pollingInterval = setInterval(() => {
            getUserAppointments(true) // Silent background refresh
        }, 30000) // 30 seconds

        // Cleanup on unmount
        return () => clearInterval(pollingInterval)
    }, [token, isPollingEnabled])

    // Toggle polling on/off
    const togglePolling = () => {
        setIsPollingEnabled(prev => !prev)
        toast.info(isPollingEnabled ? 'Auto-refresh disabled' : 'Auto-refresh enabled', {
            autoClose: 2000
        })
    }

    const value = {
        doctors, 
        getDoctosData,
        currencySymbol,
        backendUrl,
        token, 
        setToken,
        userData, 
        setUserData, 
        loadUserProfileData,
        appointments,
        getUserAppointments,
        isPollingEnabled,
        togglePolling
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider