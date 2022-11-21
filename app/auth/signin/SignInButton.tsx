'use client';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

function SignInButton({ providers }: Props) {
  return (
    <div className='flex justify-center'>
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button
            type='button'
            className='bg-white hover:opacity-80 font-semibold py-[5px] px-4 rounded flex justify-center items-center border shadow-sm'
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            <Image
              className='w-7 h-7 mr-2'
              src='/google.svg'
              width={28}
              height={28}
              alt='Sign In with Google'
            />
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SignInButton;
