'use client';
import React, { FormEvent, useState } from 'react';
import useSWR from 'swr';
import { v4 as uuid } from 'uuid';
import { Message } from '../typings';
import fetcher from '../utils/fetchMessages';
import { unstable_getServerSession } from 'next-auth/next';

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

function ChatInput({ session }: Props) {
  const [input, setInput] = useState('');
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const messageToSend = input;

    setInput('');

    const id = uuid();

    const message: Message = {
      id: id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message
        })
      }).then((res) => res.json());

      return [...messages!, data.message];
    };

    await mutate(uploadMessageToUpstash, {
      optimisticData: [...messages!, message],
      rollbackOnError: true
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className='container flex fixed bottom-0 z-50 px-5 py-5 space-x-2 border-t border-gray-100 bg-white border-r'
    >
      <input
        type='text'
        value={input}
        disabled={!session}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter message here...'
        className='w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed'
      />
      <button
        type='submit'
        disabled={!input}
        className='bg-[#25d366] hover:opacity-80 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
