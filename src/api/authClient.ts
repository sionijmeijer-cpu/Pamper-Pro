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
  };
  error?: string;
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
 * Calls POST /api/auth-verify-email
 */
export async function verifyEmail(token: string): Promise<VerifyEmailResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth-verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
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
      return {
        success: false,
        message: (result.message as string) || 'Login failed',
        error: (result.error as string) || text || 'Invalid credentials',
      };
    }

    const result = parsedData as Record<string, unknown> || {};
    return {
      success: true,
      message: (result.message as string) || 'Login successful',
      token: result.token as string | undefined,
      user: result.user as { id: string; email: string; firstName: string; lastName: string } | undefined,
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
