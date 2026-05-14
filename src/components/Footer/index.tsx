import { getPayload } from 'payload';
import config from '@payload-config';

import { Box, Container, Divider, Typography } from '@mui/material';

const Footer = async () => {
  const payload = await getPayload({ config });

  const footer = await payload.findGlobal({
    slug: 'footer',
  });

  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            py: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary" align={'center'}>
            {footer.copyright}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
