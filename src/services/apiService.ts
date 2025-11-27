const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-app.vercel.app/api'
  : 'http://localhost:3000/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function apiCall<T>(
  endpoint: string,
  method: string = 'GET',
  body?: any
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `API error: ${response.statusText}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

// Users API
export const usersApi = {
  list: () => apiCall('/users'),
  get: (id: number) => apiCall(`/users?id=${id}`),
  create: (data: any) => apiCall('/users', 'POST', data),
  update: (id: number, data: any) => apiCall(`/users?id=${id}`, 'PUT', data),
  delete: (id: number) => apiCall(`/users?id=${id}`, 'DELETE'),
};

// Clients API
export const clientsApi = {
  list: () => apiCall('/clients'),
  get: (id: number) => apiCall(`/clients?id=${id}`),
  getByUserId: (userId: number) => apiCall(`/clients?user_id=${userId}`),
  create: (data: any) => apiCall('/clients', 'POST', data),
  update: (id: number, data: any) => apiCall(`/clients?id=${id}`, 'PUT', data),
  delete: (id: number) => apiCall(`/clients?id=${id}`, 'DELETE'),
};

// Professionals API
export const professionalsApi = {
  list: () => apiCall('/professionals'),
  get: (id: number) => apiCall(`/professionals?id=${id}`),
  getByUserId: (userId: number) => apiCall(`/professionals?user_id=${userId}`),
  create: (data: any) => apiCall('/professionals', 'POST', data),
  update: (id: number, data: any) => apiCall(`/professionals?id=${id}`, 'PUT', data),
  delete: (id: number) => apiCall(`/professionals?id=${id}`, 'DELETE'),
};

// Services API
export const servicesApi = {
  list: () => apiCall('/services'),
  get: (id: number) => apiCall(`/services?id=${id}`),
  getByProfessionalId: (professionalId: number) =>
    apiCall(`/services?professional_id=${professionalId}`),
  create: (data: any) => apiCall('/services', 'POST', data),
  update: (id: number, data: any) => apiCall(`/services?id=${id}`, 'PUT', data),
  delete: (id: number) => apiCall(`/services?id=${id}`, 'DELETE'),
};

// Bookings API
export const bookingsApi = {
  list: () => apiCall('/bookings'),
  get: (id: number) => apiCall(`/bookings?id=${id}`),
  getByClientId: (clientId: number) =>
    apiCall(`/bookings?client_id=${clientId}`),
  getByProfessionalId: (professionalId: number) =>
    apiCall(`/bookings?professional_id=${professionalId}`),
  create: (data: any) => apiCall('/bookings', 'POST', data),
  update: (id: number, data: any) => apiCall(`/bookings?id=${id}`, 'PUT', data),
  delete: (id: number) => apiCall(`/bookings?id=${id}`, 'DELETE'),
};

// Payments API
export const paymentsApi = {
  list: () => apiCall('/payments'),
  get: (id: number) => apiCall(`/payments?id=${id}`),
  getByBookingId: (bookingId: number) =>
    apiCall(`/payments?booking_id=${bookingId}`),
  getByClientId: (clientId: number) =>
    apiCall(`/payments?client_id=${clientId}`),
  create: (data: any) => apiCall('/payments', 'POST', data),
  update: (id: number, data: any) => apiCall(`/payments?id=${id}`, 'PUT', data),
  delete: (id: number) => apiCall(`/payments?id=${id}`, 'DELETE'),
};

// Reviews API
export const reviewsApi = {
  list: () => apiCall('/reviews'),
  get: (id: number) => apiCall(`/reviews?id=${id}`),
  getByProfessionalId: (professionalId: number) =>
    apiCall(`/reviews?professional_id=${professionalId}`),
  create: (data: any) => apiCall('/reviews', 'POST', data),
  update: (id: number, data: any) => apiCall(`/reviews?id=${id}`, 'PUT', data),
  delete: (id: number) => apiCall(`/reviews?id=${id}`, 'DELETE'),
};

// Database initialization
export const dbApi = {
  init: () => apiCall('/init-db', 'POST'),
};
