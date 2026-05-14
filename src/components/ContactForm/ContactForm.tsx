'use client';

import { useActionState } from 'react';
import { Alert, Box, Button, TextField } from '@mui/material';
import { submitContactForm } from '@/app/actions/submitContactForm';

type Props = {
  form: any;
};

function getConfirmationMessage(form: any) {
  const fallback = 'Thank you! Your message has been sent.';

  if (!form.confirmationMessage) return fallback;

  if (typeof form.confirmationMessage === 'string') {
    return form.confirmationMessage;
  }

  return fallback;
}

const initialState = {
  success: false,
  message: '',
};

export function ContactForm({ form }: Props) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <Box
      component="form"
      action={formAction}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <input type="hidden" name="form" value={form.id} />

      {state.success && <Alert severity="success">{getConfirmationMessage(form)}</Alert>}

      {form.fields?.map((field: any) => {
        const commonProps = {
          name: field.name,
          label: field.label,
          required: field.required,
          fullWidth: true,
        };

        switch (field.name) {
          case 'name':
            return <TextField key={field.id} {...commonProps} type="text" />;

          case 'email':
            return <TextField key={field.id} {...commonProps} type="email" />;

          case 'message':
            return <TextField key={field.id} {...commonProps} multiline minRows={5} />;

          default:
            return null;
        }
      })}

      {!state.success && state.message && <Alert severity="error">{state.message}</Alert>}

      <Box>
        <Button type="submit" variant="contained" size="large" disabled={isPending}>
          {isPending ? 'Sending...' : form.submitButtonLabel?.trim() || 'Submit'}
        </Button>
      </Box>
    </Box>
  );
}
