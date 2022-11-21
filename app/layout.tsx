import '../styles/globals.css';
import Header from './Header';
import { unstable_getServerSession } from 'next-auth/next';
import { Providers } from './providers';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession();
  return (
    <html>
      <head />
      <body className='container mx-auto h-full'>
        <Providers session={session}>
          <Header />
        </Providers>
        {children}
      </body>
    </html>
  );
}
