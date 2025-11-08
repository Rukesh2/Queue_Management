import nodemailer from 'nodemailer';

// Create transporter with Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD // Your Gmail App Password
    }
});

// Email template for "You're Next" notification
const getYoureNextEmailTemplate = (appointmentData) => {
    const { userData, docData, slotDate, slotTime, estimatedTime, suggestedArrival, queuePosition } = appointmentData;
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .header h1 { margin: 0; font-size: 28px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .alert-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .info-box { background: white; border: 2px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 10px; }
            .time-box { background: #667eea; color: white; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0; }
            .time-box h2 { margin: 0 0 10px 0; font-size: 24px; }
            .time-box p { margin: 5px 0; font-size: 18px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .emoji { font-size: 24px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔔 Your Turn is Coming Up!</h1>
            </div>
            <div class="content">
                <div class="alert-box">
                    <p style="margin: 0; font-size: 18px; font-weight: bold;">
                        ⚠️ You're Next in Line! Only 1 person ahead of you.
                    </p>
                </div>
                
                <p>Dear ${userData.name},</p>
                
                <p>Your appointment with <strong>Dr. ${docData.name}</strong> is coming up soon!</p>
                
                <div class="info-box">
                    <h3 style="margin-top: 0;">📅 Appointment Details:</h3>
                    <p><strong>Date:</strong> ${formatDate(slotDate)}</p>
                    <p><strong>Original Slot:</strong> ${slotTime}</p>
                    <p><strong>Your Position:</strong> #${queuePosition} of 5</p>
                    <p><strong>Estimated Time:</strong> ${estimatedTime}</p>
                </div>
                
                <div class="time-box">
                    <h2>⏰ WHEN TO ARRIVE</h2>
                    <p style="font-size: 28px; font-weight: bold;">${suggestedArrival}</p>
                    <p style="font-size: 14px; margin-top: 15px;">
                        Please arrive between ${getEarliestArrival(suggestedArrival)} - ${suggestedArrival}
                    </p>
                </div>
                
                <div style="background: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>✅ DO:</strong></p>
                    <ul style="margin: 10px 0;">
                        <li>Arrive at the suggested time (${suggestedArrival})</li>
                        <li>Come 5-10 minutes early to check in</li>
                        <li>Have your documents ready</li>
                    </ul>
                </div>
                
                <div style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>❌ DON'T:</strong></p>
                    <ul style="margin: 10px 0;">
                        <li>Don't arrive at the slot start time (${slotTime})</li>
                        <li>Don't come too early - you'll wait unnecessarily</li>
                        <li>Don't be late - the doctor will move to the next patient</li>
                    </ul>
                </div>
                
                <p style="margin-top: 30px;">
                    <strong>Location:</strong><br>
                    ${docData.address.line1}<br>
                    ${docData.address.line2}
                </p>
                
                <p style="margin-top: 20px; font-size: 14px; color: #666;">
                    If you need to reschedule, please cancel this appointment in advance through your dashboard.
                </p>
            </div>
            
            <div class="footer">
                <p>This is an automated notification from your appointment booking system.</p>
                <p>© ${new Date().getFullYear()} Healthcare Appointment System</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

// Helper function to format date
const formatDate = (slotDate) => {
    const [year, month, day] = slotDate.split('-');
    const date = new Date(year, month - 1, day);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[date.getMonth()]} ${year}`;
};

// Helper to calculate earliest arrival (5 min before suggested)
const getEarliestArrival = (suggestedArrival) => {
    const [time, modifier] = suggestedArrival.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    
    minutes -= 5;
    if (minutes < 0) {
        minutes += 60;
        hours -= 1;
        if (hours < 0) hours = 23;
    }
    
    const newModifier = hours >= 12 ? 'PM' : 'AM';
    const newHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
    
    return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${newModifier}`;
};

// Send "You're Next" notification email
export const sendYoureNextEmail = async (appointmentData) => {
    try {
        const { userData } = appointmentData;
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userData.email,
            subject: '🔔 Your Appointment is Coming Up - You\'re Next!',
            html: getYoureNextEmailTemplate(appointmentData)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

// Send appointment confirmation email (can be used when booking)
export const sendAppointmentConfirmation = async (appointmentData) => {
    try {
        const { userData, docData, slotDate, slotTime, estimatedTime, suggestedArrival, queuePosition } = appointmentData;
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userData.email,
            subject: '✅ Appointment Confirmed',
            html: `
                <h2>Appointment Confirmed!</h2>
                <p>Dear ${userData.name},</p>
                <p>Your appointment has been successfully booked.</p>
                <h3>Details:</h3>
                <ul>
                    <li><strong>Doctor:</strong> Dr. ${docData.name}</li>
                    <li><strong>Date:</strong> ${formatDate(slotDate)}</li>
                    <li><strong>Time Slot:</strong> ${slotTime}</li>
                    <li><strong>Your Position:</strong> #${queuePosition} of 5</li>
                    <li><strong>Estimated Time:</strong> ${estimatedTime}</li>
                    <li><strong>Suggested Arrival:</strong> ${suggestedArrival}</li>
                </ul>
                <p><strong>Important:</strong> Please arrive at ${suggestedArrival}, not at the slot start time.</p>
                <p>You will receive another notification when you're next in line.</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        return { success: false, error: error.message };
    }
};

export default { sendYoureNextEmail, sendAppointmentConfirmation };