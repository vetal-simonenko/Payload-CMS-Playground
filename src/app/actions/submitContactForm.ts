'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

type State = {
  success: boolean;
  message: string;
};

export async function submitContactForm(prevState: State, formData: FormData): Promise<State> {
  try {
    const payload = await getPayload({ config });

    const formValue = formData.get('form');

    if (!formValue || typeof formValue !== 'string') {
      return {
        success: false,
        message: 'Form is required',
      };
    }

    const form = Number(formValue);

    const submissionData: {
      field: string;
      value: string;
    }[] = [];

    formData.forEach((value, key) => {
      if (
        key !== 'form' &&
        !key.startsWith('$ACTION_') &&
        typeof value === 'string' &&
        value.trim()
      ) {
        submissionData.push({
          field: key,
          value,
        });
      }
    });

    await payload.create({
      collection: 'form-submissions',
      data: {
        form,
        collection: 'forms',
        submissionData,
      },
    });

    return {
      success: true,
      message: 'Form submitted successfully',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}
