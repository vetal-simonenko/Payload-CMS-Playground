import React from 'react';
import { Box, Container } from '@mui/material';

import { Providers } from './providers';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <Providers>
          <Box
            id="wrapper"
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Header />

            <Box
              component="main"
              id="main"
              sx={{
                flexGrow: 1,
              }}
            >
              <Container maxWidth="lg">{children}</Container>
            </Box>

            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
