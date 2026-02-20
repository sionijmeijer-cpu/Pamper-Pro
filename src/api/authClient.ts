/**
 * Auth API Client for Azure Functions
 * All calls go to /api/... endpoints which are proxied to Azure Functions
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface RegisterResponse {
  success: boolean;
  message: string;
  error?: string;
  emailSent?: boolean;
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
    id: string | number;
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
    isVerified?: boolean;
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
  role?: 'client' | 'professional' | 'vendor';
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
 * Calls POST /api/auth-signup
 * Backend sends verification email via Azure Communication Services
 */
export async function registerUser(data: RegisterPayload): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth-signup`, {
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
      emailSent: (result.emailSent as boolean) !== false,
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
        id: user.id as string | number,
        email: user.email as string,
        firstName: user.firstName as string,
        lastName: user.lastName as string,
        role: user.role as string | undefined,
        isVerified: user.isVerified as boolean | undefined,
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
 * Calls GET /api/users-me
 */
export async function getUserProfile(token: string): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/users-me`, {
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
 * Calls POST /api/users-me
 */
export async function updateUserProfile(token: string, data: { firstName?: string; lastName?: string; phone?: string; profileImage?: string; bio?: string }): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/users-me`, {
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

/**
 * Get professionals list
 * Calls GET /api/professionals
 */
export async function getProfessionals(filters?: { category?: string; city?: string; minRating?: number }): Promise<{ success: boolean; professionals?: any[]; error?: string }> {
  try {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.city) params.append('city', filters.city);
    if (filters?.minRating) params.append('minRating', filters.minRating.toString());

    const response = await fetch(`${API_BASE_URL}/professionals?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data: parsedData } = await safeParseJson(response);

    if (!response.ok) {
      const result = parsedData as Record<string, unknown> || {};
      return {
        success: false,
        error: (result.error as string) || 'Failed to fetch professionals',
      };
    }

    const result = parsedData as Record<string, unknown> || {};
    return {
      success: true,
      professionals: (result.professionals as any[]) || [],
    };
  } catch (error) {
    console.error('Get professionals error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to server',
    };
  }
}

/**
 * Get services for a professional
 * Calls GET /api/services?professionalId=...
 */
export async function getServices(professionalId: number): Promise<{ success: boolean; services?: any[]; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/services?professionalId=${professionalId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data: parsedData } = await safeParseJson(response);

    if (!response.ok) {
      const result = parsedData as Record<string, unknown> || {};
      return {
        success: false,
        error: (result.error as string) || 'Failed to fetch services',
      };
    }

    const result = parsedData as Record<string, unknown> || {};
    return {
      success: true,
      services: (result.services as any[]) || [],
    };
  } catch (error) {
    console.error('Get services error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to server',
    };
  }
}

/**
 * Create a booking
 * Calls POST /api/bookings
 */
export async function createBooking(token: string, data: { serviceId: number; professionalId: number; appointmentDate: string; notes?: string }): Promise<{ success: boolean; booking?: any; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
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
        error: (result.error as string) || 'Failed to create booking',
      };
    }

    const result = parsedData as Record<string, unknown> || {};
    return {
      success: true,
      booking: result.booking,
    };
  } catch (error) {
    console.error('Create booking error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to server',
    };
  }
}

/**
 * Get user bookings
 * Calls GET /api/bookings
 */
export async function getUserBookings(token: string): Promise<{ success: boolean; bookings?: any[]; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
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
        error: (result.error as string) || 'Failed to fetch bookings',
      };
    }

    const result = parsedData as Record<string, unknown> || {};
    return {
      success: true,
      bookings: (result.bookings as any[]) || [],
    };
  } catch (error) {
    console.error('Get bookings error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to server',
    };
  }
}

/**
 * Submit a review
 * Calls POST /api/reviews
 */
export async function submitReview(token: string, data: { bookingId: number; rating: number; comment?: string; title?: string }): Promise<{ success: boolean; review?: any; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
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
        error: (result.error as string) || 'Failed to submit review',
      };
    }

    const result = parsedData as Record<string, unknown> || {};
    return {
      success: true,
      review: result.review,
    };
  } catch (error) {
    console.error('Submit review error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to server',
    };
  }
}
