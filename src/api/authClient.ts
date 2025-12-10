/**
 * Auth API Client for Azure Functions
 * All calls go to /api/... endpoints which are proxied to Azure Functions
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface RegisterResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
  };
  error?: string;
  emailNotVerified?: boolean;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  promoCode?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Safely parse JSON response, handling empty or non-JSON responses
 */
async function safeParseJson(response: Response): Promise<{ data: unknown; text: string }> {
  let text = '';
  let data = null;

  try {
    text = await response.text();
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    console.error('Failed to parse JSON', e, text);
    data = null;
  }

  return { data, text };
}

/**
 * Register a new user
 * Calls POST /api/auth-register
 * Backend sends verification email via SendGrid
 */
export async function registerUser(data: RegisterPayload): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth-register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const { data: parsedData, text } = await safeParseJson(response);

    if (!response.ok) {
      const result = parsedData as Record<string, unknown> || {};
      return {
        success: false,
        message: (result.message as string) || 'Registration failed',
        error: (result.error as string) || text || 'Unknown error occurred',
      };
    }

    const result = parsedData as Record<string, unknown> || {};
    return {
      success: true,
      message: (result.message as string) || 'Registration successful. Check your email to verify your account.',
    };
  } catch (error) {
    console.error('Register error:', error);
    return {
      success: false,
      message: 'Network error',
      error: error instanceof Error ? error.message : 'Failed to connect to server',
    };
  }
}

/**
 * Verify user email with token from email link
 * Calls GET /api/verify-email?token=... OR POST /api/verify-email with body
 */
export async function verifyEmail(token: string): Promise<VerifyEmailResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/verify-email?token=${encodeURIComponent(token)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data: parsedData, text } = await safeParseJson(response);

    if (!response.ok) {
      const result = parsedData as Record<string, unknown> || {};
      return {
        success: false,
        message: (result.message as string) || 'Email verification failed',
        error: (result.error as string) || text || 'Invalid or expired token',
      };
    }

    const result = parsedData as Record<string, unknown> || {};
    return {
      success: true,
      message: (result.message as string) || 'Email verified successfully! You can now log in.',
    };
  } catch (error) {
    console.error('Verify email error:', error);
    return {
      success: false,
      message: 'Network error',
      error: error instanceof Error ? error.message : 'Failed to connect to server',
    };
  }
}

/**
 * Login user with email and password
 * Calls POST /api/auth-login
 */
export async function loginUser(data: LoginPayload): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const { data: parsedData, text } = await safeParseJson(response);

    if (!response.ok) {
      const result = parsedData as Record<string, unknown> || {};
      const error = (result.error as string) || text || 'Invalid credentials';
      
      // Check if email not verified
      if (error === 'Email not verified' || response.status === 403) {
        return {
          success: false,
          message: (result.message as string) || 'Please verify your email before logging in.',
          error: error,
          emailNotVerified: true,
        };
      }
      
      return {
        success: false,
        message: (result.message as string) || 'Login failed',
        error: error,
      };
    }

    const result = parsedData as Record<string, unknown> || {};
    const user = result.user as Record<string, unknown> | undefined;
    return {
      success: true,
      message: (result.message as string) || 'Login successful',
      token: result.token as string | undefined,
      user: user ? {
        id: user.id as string,
        email: user.email as string,
        firstName: user.firstName as string,
        lastName: user.lastName as string,
        role: user.role as string | undefined,
      } : undefined,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Network error',
      error: error instanceof Error ? error.message : 'Failed to connect to server',
    };
  }
}

/**
 * Resend verification email
 * Calls POST /api/resend-verification
 */
export async function resendVerificationEmail(email: string): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const { data: parsedData, text } = await safeParseJson(response);

    if (!response.ok) {
      const result = parsedData as Record<string, unknown> || {};
      const error = (result.error as string) || text;
      
      if (error === 'NO_SUCH_USER') {
        return {
          success: false,
          message: 'No account found with this email address.',
          error,
        };
      }
      
      if (error === 'ALREADY_VERIFIED') {
        return {
          success: false,
          message: 'This email is already verified. You can log in now.',
          error,
        };
      }
      
      if (error === 'SEND_FAILED') {
        return {
          success: false,
          message: 'Failed to send verification email. Please try again later.',
          error,
        };
      }
      
      return {
        success: false,
        message: 'Failed to resend verification email.',
        error,
      };
    }

    const result = parsedData as Record<string, unknown> || {};
    return {
      success: true,
      message: (result.message as string) || 'Verification email sent! Check your inbox.',
    };
  } catch (error) {
    console.error('Resend verification error:', error);
    return {
      success: false,
      message: 'Network error',
      error: error instanceof Error ? error.message : 'Failed to connect to server',
    };
  }
}

/**
 * Get current user profile
 * Calls GET /api/users/me
 */
export async function getUserProfile(token: string): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const { data: parsedData } = await safeParseJson(response);

    if (!response.ok) {
      const result = parsedData as Record<string, unknown> || {};
      return {
        success: false,
        error: (result.error as string) || 'Failed to fetch profile',
      };
    }

    const result = parsedData as Record<string, unknown> || {};
    return {
      success: true,
      user: result.user,
    };
  } catch (error) {
    console.error('Get profile error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to server',
    };
  }
}

/**
 * Update user profile
 * Calls POST /api/users/me
 */
export async function updateUserProfile(token: string, data: { firstName?: string; lastName?: string; phone?: string }): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const { data: parsedData } = await safeParseJson(response);

    if (!response.ok) {
      const result = parsedData as Record<string, unknown> || {};
      return {
        success: false,
        error: (result.error as string) || 'Failed to update profile',
      };
    }

    const result = parsedData as Record<string, unknown> || {};
    return {
      success: true,
      user: result.user,
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to server',
    };
  }
}
