'use client';
import { signOut } from 'next-auth/react';
import React from 'react';

function LogoutButton() {
  return (
    <button
      type='button'
      onClick={() => {
        signOut({
          callbackUrl: '/auth/signin'
        });
      }}
      className='bg-[#25d366] hover:opacity-80 text-white font-bold py-2 px-4 rounded'
    >
      Sign Out
    </button>
  );
}

export default LogoutButton;
