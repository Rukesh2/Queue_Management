import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    
    // New fields for queue management
    estimatedTime: { type: String }, // Calculated appointment time (e.g., "06:24 PM")
    suggestedArrival: { type: String }, // When patient should arrive (e.g., "06:14 PM")
    
    // Notification tracking
    notificationSent: { type: Boolean, default: false }, // Track if "you're next" email was sent
    notificationSentAt: { type: Date }, // When notification was sent
    
    // Patient status tracking
    patientStatus: { 
        type: String, 
        enum: ['waiting', 'on-my-way', 'arrived', 'in-consultation', 'completed'],
        default: 'waiting'
    },
    statusUpdatedAt: { type: Date }
})

const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema)
export default appointmentModel