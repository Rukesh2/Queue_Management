import React from 'react'

const QueueStatusCard = ({
    queuePosition,
    peopleAhead,
    totalInSlot,
    estimatedTime,
    suggestedArrival,
    patientStatus,
    onStatusUpdate
}) => {
    
    // Determine which UI to show based on position
    const getStatusType = () => {
        if (queuePosition === 1) return 'your-turn'
        if (queuePosition === 2) return 'next-in-line'
        if (queuePosition <= 3) return 'coming-soon'
        return 'waiting'
    }

    const statusType = getStatusType()

    // YOUR TURN (Position #1)
    if (statusType === 'your-turn') {
        return (
            <div className='mt-3 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-500 shadow-lg'>
                <div className='text-center'>
                    <div className='text-4xl mb-2'>🔔</div>
                    <h3 className='text-2xl font-bold text-green-800 mb-2'>
                        IT'S YOUR TURN!
                    </h3>
                    <p className='text-green-700 font-medium mb-4'>
                        The doctor is ready to see you now
                    </p>
                </div>

                <div className='bg-white rounded-lg p-4 mb-4'>
                    <p className='text-center text-gray-700 font-medium'>
                        📍 Please proceed to the consultation room
                    </p>
                </div>

                {patientStatus !== 'arrived' && (
                    <button
                        onClick={() => onStatusUpdate('arrived')}
                        className='w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all flex items-center justify-center gap-2'
                    >
                        <span>✅</span>
                        <span>I've Arrived - Start Consultation</span>
                    </button>
                )}

                {patientStatus === 'arrived' && (
                    <div className='bg-green-100 text-green-800 py-3 rounded-lg text-center font-medium'>
                        ✓ Marked as Arrived
                    </div>
                )}
            </div>
        )
    }

    // NEXT IN LINE (Position #2)
    if (statusType === 'next-in-line') {
        return (
            <div className='mt-3 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-400 shadow-lg'>
                <div className='text-center mb-4'>
                    <div className='text-4xl mb-2'>⚠️</div>
                    <h3 className='text-2xl font-bold text-orange-800 mb-1'>
                        GET READY!
                    </h3>
                    <p className='text-orange-700 font-medium'>
                        You're next in line (Position #{queuePosition})
                    </p>
                </div>

                <div className='grid grid-cols-3 gap-3 mb-4'>
                    <div className='bg-white rounded-lg p-3 text-center'>
                        <p className='text-xs text-gray-600'>Position</p>
                        <p className='text-2xl font-bold text-orange-600'>{queuePosition}</p>
                    </div>
                    <div className='bg-white rounded-lg p-3 text-center'>
                        <p className='text-xs text-gray-600'>Ahead</p>
                        <p className='text-2xl font-bold text-orange-600'>{peopleAhead}</p>
                    </div>
                    <div className='bg-white rounded-lg p-3 text-center'>
                        <p className='text-xs text-gray-600'>Total</p>
                        <p className='text-2xl font-bold text-orange-600'>{totalInSlot}/5</p>
                    </div>
                </div>

                <div className='bg-white rounded-lg p-4 mb-4'>
                    <p className='text-sm text-gray-600 mb-1'>⏰ Estimated Time:</p>
                    <p className='text-2xl font-bold text-gray-800'>{estimatedTime}</p>
                    {suggestedArrival && (
                        <p className='text-sm text-gray-600 mt-2'>
                            Suggested Arrival: <span className='font-bold'>{suggestedArrival}</span>
                        </p>
                    )}
                </div>

                <div className='space-y-2'>
                    {patientStatus !== 'on-my-way' && patientStatus !== 'arrived' && (
                        <button
                            onClick={() => onStatusUpdate('on-my-way')}
                            className='w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-all flex items-center justify-center gap-2'
                        >
                            <span>🚗</span>
                            <span>I'm on My Way</span>
                        </button>
                    )}

                    {patientStatus === 'on-my-way' && (
                        <button
                            onClick={() => onStatusUpdate('arrived')}
                            className='w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-all flex items-center justify-center gap-2'
                        >
                            <span>✅</span>
                            <span>I've Arrived</span>
                        </button>
                    )}

                    {patientStatus === 'arrived' && (
                        <div className='bg-green-100 text-green-800 py-3 rounded-lg text-center font-medium'>
                            ✓ You've Arrived - Please Wait
                        </div>
                    )}
                </div>

                <p className='text-xs text-orange-700 text-center mt-3'>
                    📱 Please start heading to the clinic soon
                </p>
            </div>
        )
    }

    // COMING SOON (Position #3)
    if (statusType === 'coming-soon') {
        return (
            <div className='mt-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-300 shadow-md'>
                <div className='flex items-center gap-3 mb-3'>
                    <div className='text-3xl'>⏳</div>
                    <div>
                        <h3 className='text-lg font-bold text-blue-800'>Coming Up Soon</h3>
                        <p className='text-sm text-blue-600'>Position #{queuePosition} of {totalInSlot}</p>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-2 mb-3'>
                    <div className='bg-white rounded-lg p-2 text-center'>
                        <p className='text-xs text-gray-600'>Position</p>
                        <p className='text-xl font-bold text-blue-600'>{queuePosition}</p>
                    </div>
                    <div className='bg-white rounded-lg p-2 text-center'>
                        <p className='text-xs text-gray-600'>Ahead</p>
                        <p className='text-xl font-bold text-blue-600'>{peopleAhead}</p>
                    </div>
                    <div className='bg-white rounded-lg p-2 text-center'>
                        <p className='text-xs text-gray-600'>Estimated</p>
                        <p className='text-sm font-bold text-blue-600'>{estimatedTime}</p>
                    </div>
                </div>

                {suggestedArrival && (
                    <div className='bg-white rounded-lg p-3 border-l-4 border-blue-500'>
                        <p className='text-xs text-gray-600 mb-1'>⏰ When to Arrive:</p>
                        <p className='text-lg font-bold text-blue-800'>{suggestedArrival}</p>
                        <p className='text-xs text-gray-500 mt-1'>
                            Don't come before this time to avoid waiting
                        </p>
                    </div>
                )}

                <p className='text-xs text-blue-600 text-center mt-3'>
                    💡 Start preparing - your turn is coming soon!
                </p>
            </div>
        )
    }

    // WAITING (Position #4-5)
    return (
        <div className='mt-3 p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-300'>
            <div className='flex items-center gap-3 mb-3'>
                <div className='text-2xl'>📍</div>
                <div>
                    <h3 className='text-base font-bold text-gray-800'>Your Position</h3>
                    <p className='text-sm text-gray-600'>#{queuePosition} of {totalInSlot}</p>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-3 mb-3'>
                <div className='bg-white rounded-lg p-3 text-center border'>
                    <p className='text-xs text-gray-600'>People Ahead</p>
                    <p className='text-2xl font-bold text-gray-700'>{peopleAhead}</p>
                </div>
                <div className='bg-white rounded-lg p-3 text-center border'>
                    <p className='text-xs text-gray-600'>Estimated Time</p>
                    <p className='text-base font-bold text-gray-700'>{estimatedTime}</p>
                </div>
            </div>

            {suggestedArrival && (
                <div className='bg-blue-50 rounded-lg p-3 mb-3 border border-blue-200'>
                    <p className='text-xs text-gray-600 mb-1'>⏰ Suggested Arrival:</p>
                    <p className='text-lg font-bold text-blue-700'>{suggestedArrival}</p>
                </div>
            )}

            <div className='bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded'>
                <p className='text-sm text-yellow-800'>
                    <strong>⏱️ Relax!</strong> You have time. Come back closer to your estimated time.
                </p>
            </div>

            <p className='text-xs text-gray-500 text-center mt-3'>
                You'll be notified when you're next in line
            </p>
        </div>
    )
}

export default QueueStatusCard