import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

export default function Profile() {
    const { userInfo } = useContext(AuthContext)
    return (
        <div className="container" style={{ minHeight: '90vh' }}>
            <div className="row" style={{ minHeight: '90vh' }}>
                <div className="div d-flex justify-content-center align-items-center flex-column">
                <h2 className='text-center p-2'>Your Profile</h2>
                    <div className="border p-3 rounded-3">
                        <div className='fs-4 p-2'>User Name : <span className="">{userInfo.first_name} {userInfo.last_name}</span></div>
                        <div className='fs-4 p-2'>Email Address : <span className="">{userInfo.email}</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
