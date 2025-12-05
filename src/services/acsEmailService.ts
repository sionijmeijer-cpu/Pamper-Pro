/**
 * ACS Email Service
 * Handles sending verification emails via Azure Communication Services
 */

export interface EmailSendRequest {
  email: string;
  token: string;
}

export interface EmailSendResponse {
  success: boolean;
  error?: string;
  messageId?: string;
}

/**
 * Send verification email via ACS
 */
export async function sendVerificationEmail(
  email: string,
  token: string
): Promise<EmailSendResponse> {
  try {
    const response = await fetch('/api/send-verification-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        token,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.error || 'Failed to send verification email',
      };
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    console.error('ACS email service error:', error);
    return {
      success: false,
      error: 'Failed to send verification email',
    };
  }
}

/**
 * Resend verification email
 */
export async function resendVerificationEmail(email: string, token: string): Promise<EmailSendResponse> {
  return sendVerificationEmail(email, token);
}
