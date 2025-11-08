import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';
import { sendYoureNextEmail } from './emailService.js';

// Check queue positions and send notifications
const checkQueueAndNotify = async () => {
    try {
        console.log('🔍 Checking queue positions...');
        
        // Get today's date in YYYY-MM-DD format
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;
        
        // Find all appointments for today that are not cancelled, not completed, and notification not sent
        const todaysAppointments = await appointmentModel.find({
            slotDate: todayStr,
            cancelled: false,
            isCompleted: false,
            notificationSent: false
        });

        console.log(`Found ${todaysAppointments.length} appointments for today without notifications`);

        // Group appointments by doctor and slot
        const groupedAppointments = {};
        
        for (const appointment of todaysAppointments) {
            const key = `${appointment.docId}_${appointment.slotTime}`;
            if (!groupedAppointments[key]) {
                groupedAppointments[key] = [];
            }
            groupedAppointments[key].push(appointment);
        }

        // Check each slot
        for (const [key, appointments] of Object.entries(groupedAppointments)) {
            const [docId, slotTime] = key.split('_');
            
            // Get doctor's current queue
            const doctor = await doctorModel.findById(docId);
            if (!doctor) continue;

            const slotQueue = doctor.slots_booked[todayStr]?.[slotTime] || [];
            
            // For each appointment, check if they're at position #2 (1 person ahead)
            for (const appointment of appointments) {
                const position = slotQueue.indexOf(appointment._id.toString()) + 1;
                
                // Send notification if position is 2 (next in line)
                if (position === 2) {
                    console.log(`📧 Sending notification to ${appointment.userData.name} - Position #${position}`);
                    
                    const emailData = {
                        userData: appointment.userData,
                        docData: appointment.docData,
                        slotDate: appointment.slotDate,
                        slotTime: appointment.slotTime,
                        estimatedTime: appointment.estimatedTime,
                        suggestedArrival: appointment.suggestedArrival,
                        queuePosition: position
                    };
                    
                    const result = await sendYoureNextEmail(emailData);
                    
                    if (result.success) {
                        // Mark notification as sent
                        await appointmentModel.findByIdAndUpdate(appointment._id, {
                            notificationSent: true,
                            notificationSentAt: new Date()
                        });
                        console.log(`✅ Notification sent successfully to ${appointment.userData.email}`);
                    } else {
                        console.log(`❌ Failed to send notification: ${result.error}`);
                    }
                }
            }
        }
        
        console.log('✅ Queue check completed');
    } catch (error) {
        console.error('❌ Error in queue monitor:', error);
    }
};

// Start the queue monitoring service (runs every 2 minutes)
export const startQueueMonitor = () => {
    console.log('🚀 Starting queue monitor service...');
    
    // Run immediately on startup
    checkQueueAndNotify();
    
    // Then run every 2 minutes (120000 ms)
    setInterval(checkQueueAndNotify, 120000);
    
    console.log('✅ Queue monitor service started - checking every 2 minutes');
};

export default { startQueueMonitor, checkQueueAndNotify };