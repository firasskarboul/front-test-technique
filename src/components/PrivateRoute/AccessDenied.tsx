import React from 'react'
import noAccess from '../../assets/images/noAccess.jpg'

const AccessDenied: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <img src={noAccess} className=' w-96 h-96' />
            <h1>Access Denied!</h1>
            <h1>You may have to login to see your bookings</h1>
        </div>
    )
}

export default AccessDenied