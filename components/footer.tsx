import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className='text-center text-sm mt-4'>
            <p>&copy; {new Date().getFullYear()} StarkId. All rights reserved.</p>
        </footer>
    );
};

export default Footer;