import React from 'react';
import Head from 'next/head';

import Footer from '../molecules/Footer';

export default ({ children }) => (
  <div>
    <Head>
      <title>VG.GG</title>
    </Head>
    {children}
    <Footer />
  </div>
);
