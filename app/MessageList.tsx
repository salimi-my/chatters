'use client';
import React, { useEffect, useRef } from 'react';
import useSWR from 'swr';
import { clientPusher } from '../pusher';
import { Message } from '../typings';
import fetcher from '../utils/fetchMessages';
import MessageBox from './MessageBox';

type Props = {
  initialMessages: Message[];
};

function MessageList({ initialMessages }: Props) {
  const bottomRef = useRef<any>(null);

  const {
    data: messages,
    error,
    mutate
  } = useSWR<Message[]>('/api/getMessages', fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe('messages');

    channel.bind('new-message', async (data: Message) => {
      // check if user is the one sending the message
      if (messages?.find((message) => message.id === data.id)) return;

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [...messages!, data],
          rollbackOnError: true
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  useEffect(() => {
    // scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='space-y-5 px-5 pt-8 pb-32'>
      {(messages || initialMessages).map((message) => (
        <MessageBox key={message.id} message={message} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
