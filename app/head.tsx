export default function Head() {
  return (
    <>
      <title>Chatters</title>
      <meta content='width=device-width, initial-scale=1' name='viewport' />

      <meta name='title' content='Chatters' />
      <meta
        name='description'
        content='This is a simple chat app created using Next.js. This app created for educational purposes only.'
      />

      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://chatters.salimi.my/' />
      <meta property='og:title' content='Chatters' />
      <meta
        property='og:description'
        content='This is a simple chat app created using Next.js. This app created for educational purposes only.'
      />
      <meta property='og:image' content='/chatters.jpg' />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://chatters.salimi.my/' />
      <meta property='twitter:title' content='Chatters' />
      <meta
        property='twitter:description'
        content='This is a simple chat app created using Next.js. This app created for educational purposes only.'
      />
      <meta property='twitter:image' content='/chatters.jpg' />

      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest'></link>
      <meta name='robots' content='index, follow' />
    </>
  );
}
