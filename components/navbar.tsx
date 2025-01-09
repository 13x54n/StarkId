'use client'
import React from 'react';
import Link from 'next/link'
import Image from 'next/image';
import logo from '@/public/logo.png';
import {
    type ConnectOptions,
    type DisconnectOptions,
    connect,
    disconnect,
} from "get-starknet"
import { useState } from "react"

const Navbar: React.FC = () => {
    const [walletName, setWalletName] = useState("")
    const [loading, setLoading] = useState(false)

    function handleConnect(options?: ConnectOptions) {
        return async () => {
            setLoading(true)
            const res = await connect(options)
            console.log(res)
            setWalletName(res?.name || "")
            setLoading(false)
        }
    }

    function handleDisconnect(options?: DisconnectOptions) {
        return async () => {
            setLoading(true)
            await disconnect(options)
            setWalletName("")
            setLoading(false)
        }
    }

    return (
        <nav className='flex justify-between py-2 mx-[5vw] items-center bg-white text-black'>
            <Link href="/">
                <Image src={logo} alt="Logo" width={110} height={25} />
            </Link>
            {
                walletName ? (

                    <div>{walletName}<button disabled={loading} onClick={handleDisconnect()}>Disconnect</button></div>
                ) : (
                    <button disabled={loading} onClick={handleConnect()}>Connect Wallet</button>
                )
            }
        </nav>
    );
};

export default Navbar;