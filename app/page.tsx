import React from 'react';
import { Message } from '../typings';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import { unstable_getServerSession } from 'next-auth/next';
import { Providers } from './providers';

async function HomePage() {
  const data = await fetch(
    `${process.env.APP_URL || 'http://localhost:3000'}/api/getMessages`
  ).then((res) => res.json());

  const messages: Message[] = data.messages;

  const session = await unstable_getServerSession();

  return (
    <Providers session={session}>
      <main className='w-full bg-gray-50 border-x min-h-[calc(100vh-132px-91px)]'>
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Providers>
  );
}

export default HomePage;
