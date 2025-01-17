// @ts-nocheck
'use client'

import { useAuthenticationStore } from '@/hooks/auth/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Dashboard: React.FC = () => {
    const authenticated = useAuthenticationStore(state => state?.authenticated)
    const user = useAuthenticationStore(state => state?.user)

    const router = useRouter()
    useEffect(() => {
        if (!authenticated) {
            router.push('/')
        }
    }
        , [authenticated])
    return (
        <div className='mx-[5vw] p-4'>
            <div className='flex items-start gap-2'>
                <div className='flex-1 flex flex-col items-center justify-center gap-5 min-h-[60vh]'>
                    <h1 className='text-xl'>Address Screening</h1>
                    <div className='border p-2 px-3 rounded-lg'>
                        <input type="text" className='w-[30vw]' placeholder='Search for an address' />
                        <i className="ri-search-line"></i>
                    </div>

                    <p>🔥 Hot Addresses</p>
                </div>
                <div className='w-[12vw]'>
                    <div className="w-full">
                        <Image alt='' className="w-full object-contain" width={500} height={500} src="https://ik.imagekit.io/lexy/Screenshot%20from%202025-01-16%2020-28-11.png?updatedAt=1737077320967" />
                    </div>
                    <p>
                        {user?.connectorData?.account && user.connectorData.account.slice(0, 8) + '...' + user.connectorData.account.slice(-5)}
                    </p>
                    <p>
                        notsolexy.starkid
                    </p>
                    <button className='bg-black text-white w-full text-sm'>Mint</button>
                    <hr className='my-2' />
                    <p>Where do you stand?</p>

                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full w-[45%]"></div>
                    </div>

                    <p>45% Human Score</p>

                    <p className='text-sm'>Complete quests and prove that you’re human!</p>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;