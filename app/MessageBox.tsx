import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { Message } from '../typings';
import Moment from 'react-moment';

type Props = {
  message: Message;
};

function MessageBox({ message }: Props) {
  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
      <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
        <Image
          className='rounded-full mx-2 shadow-md'
          src={message.profilePic}
          width={50}
          height={50}
          alt={message.username}
        />
      </div>

      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? 'text-[#25d366] text-right' : 'text-gray-700 text-left'
          }`}
        >
          {message.username}
        </p>
        <div
          className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
        >
          <div
            className={`px-3 py-2 rounded-lg w-fit text-gray-700 shadow-sm max-w-xs ${
              isUser
                ? 'bg-[#dcf8c6] ml-auto rounded-tr-none'
                : 'bg-gray-300 rounded-tl-none'
            }`}
          >
            <p>{message.message}</p>
          </div>

          <p
            className={`text-[0.65rem] italic px-2 text-gray-300 ${
              isUser && 'text-right'
            }`}
          >
            <Moment className='lowercase' fromNow ago>
              {new Date(message.created_at)}
            </Moment>{' '}
            ago
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
