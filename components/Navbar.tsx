import React from 'react';
import Image from 'next/image';
import logo from '@/public/logo.png';

const Navbar: React.FC = () => {
  return (
    <div className='p-3 py-2 flex items-center justify-between mx-[5vw]'>
      <Image className='w-[120px] object-contain' src={logo} alt="StarkId Logo" />
      <button className='bg-black text-white text-sm px-2 py-1'>Launch App</button>
    </div>
  );
}

export default Navbar;
