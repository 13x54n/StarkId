'use client'
import { useAuthenticationStore } from '@/hooks/auth/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Dashboard: React.FC = () => {
    const authenticated = useAuthenticationStore(state => state?.authenticated)
    const router = useRouter()
    useEffect(() => {
        if (!authenticated) {
            router.push('/')
        }
    }
        , [authenticated])
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
        </div>
    );
};

export default Dashboard;