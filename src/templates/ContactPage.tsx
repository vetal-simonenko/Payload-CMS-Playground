import { Hero } from '@/components/Hero';
import { Box, Container, Paper, Typography } from '@mui/material';
import { ContactForm } from '@/components/ContactForm/ContactForm';

type Props = {
  page: any;
};

export async function ContactPage({ page }: Props) {
  const form = page.form;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ mb: 2 }}>
        {page.title}
      </Typography>

      <Hero blocks={page.layout} />

      {form && (
        <Paper
          elevation={0}
          sx={{
            mt: 6,
            p: { xs: 3, md: 5 },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 1 }}>
              {form.title}
            </Typography>

            {form.description && (
              <Typography variant="body2" color="text.secondary">
                {form.description}
              </Typography>
            )}
          </Box>

          <ContactForm form={form} />
        </Paper>
      )}
    </Container>
  );
}
