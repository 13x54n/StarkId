'use client'

import React, { useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import logo from '@/public/logo.png';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { connectOnReload, disconnectWallet, handleConnectDapp } from '@/hooks/auth/auth';
import { useAuthenticationStore } from '@/hooks/auth/auth';
import { useRouter } from 'next/navigation'


const Navbar: React.FC = () => {
    const [connection, setConnection] = React.useState<any>(null)
    const [address, setAddress] = React.useState<string | null>(null)
    const imageUrl = 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    const storeUser = useAuthenticationStore(state => state?.storeUser)
    const router = useRouter()

    const handleConnect = async () => {
        const result = await handleConnectDapp();
        if (result) {
            const { wallet, connector, connectorData } = result;
            setConnection(wallet)
            setAddress(connectorData.account || null)
            storeUser({ wallet, connector, connectorData })
            router.push('/dashboard')
        }
    }

    const disconnect = async () => {
        await disconnectWallet()
    }

    useEffect(() => {
        (async () => {
            const result = await connectOnReload();

            if (result) {
                const { wallet, connector, connectorData } = result;
                setConnection(wallet)
                setAddress(connectorData.account || null)
                storeUser({ wallet, connector, connectorData })
                router.push('/dashboard')
            }
        })()
    }, [])
    return (
        <nav className='flex justify-between py-2 mx-[5vw] items-center bg-white text-black'>
            <Link href="/">
                <Image className='w-auto h-auto' src={logo} alt="Logo" width={110} height={25} />
            </Link>
            {
                address ?
                    <DropdownMenu>
                        <DropdownMenuTrigger className='outline-none'>
                            <div className='text-sm flex items-center gap-1.5 bg-gray-100 font-medium p-1 rounded-full pr-2'>
                                <Image alt="user profile image" src={imageUrl} width={6} height={6} className="w-6 h-6 object-cover rounded-full" />
                                {`${address.slice(0, 6)}...${address.slice(-3)}`}
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => disconnect()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    :
                    <button onClick={() => handleConnect()} className='bg-black text-white text-sm py-1.5 px-2 rounded-lg'><i className="ri-fingerprint-line"></i> Launch App</button>
            }

        </nav>
    );
};

export default Navbar;