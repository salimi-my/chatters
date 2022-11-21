import React from 'react';
import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import SignInButton from './SignInButton';

async function SignInPage() {
  const providers = await getProviders();
  return (
    <div className='grid justify-center h-screen items-center'>
      <div className='flex flex-col items-center'>
        <p className='text-[#25d366] font-semibold text-2xl'>
          Welcome to Chatters
        </p>
        <Image
          className='w-72 h-auto mx-2 object-cover'
          width={288}
          height={288}
          src='/chatters-logo.png'
          alt='Chatter Logo'
          priority
        />

        <SignInButton providers={providers} />
      </div>
    </div>
  );
}

export default SignInPage;
