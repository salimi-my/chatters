'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LogoutButton from './LogoutButton';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  if (session)
    return (
      <header className='sticky top-0 z-50 bg-white flex justify-between items-center py-10 px-5 shadow-sm border-x'>
        <div className='flex space-x-2'>
          <Image
            className='rounded-full mx-2 object-contain w-auto h-auto'
            src={session.user?.image!}
            width={56}
            height={32}
            alt='Profile Picture'
          />

          <div>
            <p className='text-[#25d366]'>Logged in as:</p>
            <p className='font-bold text-lg'>{session.user?.name}</p>
          </div>
        </div>

        <LogoutButton />
      </header>
    );

  return (
    // <header className='sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm'>
    //   <div className='flex flex-col items-center space-y-5'>
    //     <div className='flex space-x-2 items-center'>
    //       <Image
    //         className='w-14 h-auto'
    //         src='/chatters-logo.png'
    //         width={56}
    //         height={32}
    //         alt='Logo'
    //       />

    //       <p className='text-[#25d366] font-semibold'>Welcome to Chatters</p>
    //     </div>

    //     <Link
    //       href='/auth/signin'
    //       className='bg-[#25d366] hover:opacity-80 text-white font-bold py-2 px-4 rounded'
    //     >
    //       Sign In
    //     </Link>
    //   </div>
    // </header>
    <></>
  );
}
