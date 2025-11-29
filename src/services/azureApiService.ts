// Azure Functions API Service
const API_BASE = process.env.REACT_APP_AZURE_FUNCTIONS_URL || 
  'https://pamperpro-functions-bqauh8afdnbeevfq.southafricanorth-01.azurewebsites.net/api'

export const azureApi: {
  // Users
  getUsers(): Promise<any>;
  getUser(id: number): Promise<any>;
  createUser(data: any): Promise<any>;
  updateUser(id: number, data: any): Promise<any>;
  deleteUser(id: number): Promise<void>;

  // Clients
  getClients(): Promise<any>;
  getClient(id: number): Promise<any>;
  createClient(data: any): Promise<any>;
  updateClient(id: number, data: any): Promise<any>;
  deleteClient(id: number): Promise<void>;

  // Professionals
  getProfessionals(): Promise<any>;
  getProfessional(id: number): Promise<any>;
  createProfessional(data: any): Promise<any>;
  updateProfessional(id: number, data: any): Promise<any>;
  deleteProfessional(id: number): Promise<void>;

  // Services
  getServices(): Promise<any>;
  getService(id: number): Promise<any>;
  createService(data: any): Promise<any>;
  updateService(id: number, data: any): Promise<any>;
  deleteService(id: number): Promise<void>;

  // Bookings
  getBookings(): Promise<any>;
  getBooking(id: number): Promise<any>;
  createBooking(data: any): Promise<any>;
  updateBooking(id: number, data: any): Promise<any>;
  deleteBooking(id: number): Promise<void>;

  // Payments
  getPayments(): Promise<any>;
  getPayment(id: number): Promise<any>;
  createPayment(data: any): Promise<any>;
  updatePayment(id: number, data: any): Promise<any>;
  deletePayment(id: number): Promise<void>;

  // Reviews
  getReviews(): Promise<any>;
  getReview(id: number): Promise<any>;
  createReview(data: any): Promise<any>;
  updateReview(id: number, data: any): Promise<any>;
  deleteReview(id: number): Promise<void>;

  // Professional Services
  getProfessionalServices(professionalId: number): Promise<any>;
  createProfessionalService(data: any): Promise<any>;
  updateProfessionalService(id: number, data: any): Promise<any>;
  deleteProfessionalService(id: number): Promise<boolean>;

  // Service Photos
  uploadServicePhoto(serviceId: number, file: File): Promise<any>;
  getServicePhotos(serviceId: number): Promise<any>;
  deleteServicePhoto(id: number): Promise<boolean>;

  // Initialize database
  initializeDatabase(): Promise<any>;
} = {
  // Users
  async getUsers() {
    const res = await fetch(`${API_BASE}/users`)
    return res.json()
  },
  async getUser(id: number) {
    const res = await fetch(`${API_BASE}/users?id=${id}`)
    return res.json()
  },
  async createUser(data: any) {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async updateUser(id: number, data: any) {
    const res = await fetch(`${API_BASE}/users?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async deleteUser(id: number) {
    await fetch(`${API_BASE}/users?id=${id}`, { method: 'DELETE' })
  },

  // Clients
  async getClients() {
    const res = await fetch(`${API_BASE}/clients`)
    return res.json()
  },
  async getClient(id: number) {
    const res = await fetch(`${API_BASE}/clients?id=${id}`)
    return res.json()
  },
  async createClient(data: any) {
    const res = await fetch(`${API_BASE}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async updateClient(id: number, data: any) {
    const res = await fetch(`${API_BASE}/clients?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async deleteClient(id: number) {
    await fetch(`${API_BASE}/clients?id=${id}`, { method: 'DELETE' })
  },

  // Professionals
  async getProfessionals() {
    const res = await fetch(`${API_BASE}/professionals`)
    return res.json()
  },
  async getProfessional(id: number) {
    const res = await fetch(`${API_BASE}/professionals?id=${id}`)
    return res.json()
  },
  async createProfessional(data: any) {
    const res = await fetch(`${API_BASE}/professionals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async updateProfessional(id: number, data: any) {
    const res = await fetch(`${API_BASE}/professionals?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async deleteProfessional(id: number) {
    await fetch(`${API_BASE}/professionals?id=${id}`, { method: 'DELETE' })
  },

  // Services
  async getServices() {
    const res = await fetch(`${API_BASE}/services`)
    return res.json()
  },
  async getService(id: number) {
    const res = await fetch(`${API_BASE}/services?id=${id}`)
    return res.json()
  },
  async createService(data: any) {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async updateService(id: number, data: any) {
    const res = await fetch(`${API_BASE}/services?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async deleteService(id: number) {
    await fetch(`${API_BASE}/services?id=${id}`, { method: 'DELETE' })
  },

  // Bookings
  async getBookings() {
    const res = await fetch(`${API_BASE}/bookings`)
    return res.json()
  },
  async getBooking(id: number) {
    const res = await fetch(`${API_BASE}/bookings?id=${id}`)
    return res.json()
  },
  async createBooking(data: any) {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async updateBooking(id: number, data: any) {
    const res = await fetch(`${API_BASE}/bookings?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async deleteBooking(id: number) {
    await fetch(`${API_BASE}/bookings?id=${id}`, { method: 'DELETE' })
  },

  // Payments
  async getPayments() {
    const res = await fetch(`${API_BASE}/payments`)
    return res.json()
  },
  async getPayment(id: number) {
    const res = await fetch(`${API_BASE}/payments?id=${id}`)
    return res.json()
  },
  async createPayment(data: any) {
    const res = await fetch(`${API_BASE}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async updatePayment(id: number, data: any) {
    const res = await fetch(`${API_BASE}/payments?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async deletePayment(id: number) {
    await fetch(`${API_BASE}/payments?id=${id}`, { method: 'DELETE' })
  },

  // Reviews
  async getReviews() {
    const res = await fetch(`${API_BASE}/reviews`)
    return res.json()
  },
  async getReview(id: number) {
    const res = await fetch(`${API_BASE}/reviews?id=${id}`)
    return res.json()
  },
  async createReview(data: any) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async updateReview(id: number, data: any) {
    const res = await fetch(`${API_BASE}/reviews?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  },
  async deleteReview(id: number) {
    await fetch(`${API_BASE}/reviews?id=${id}`, { method: 'DELETE' })
  },

  // Professional Services
  async getProfessionalServices(professionalId: number) {
    const res = await fetch(`${API_BASE}/professionalServices?professionalId=${professionalId}`)
    if (!res.ok) return { success: false, data: [] }
    return res.json()
  },
  async createProfessionalService(data: any) {
    const res = await fetch(`${API_BASE}/professionalServices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) return { success: false, error: 'Failed to create service' }
    return res.json()
  },
  async updateProfessionalService(id: number, data: any) {
    const res = await fetch(`${API_BASE}/professionalServices?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) return { success: false, error: 'Failed to update service' }
    return res.json()
  },
  async deleteProfessionalService(id: number) {
    const res = await fetch(`${API_BASE}/professionalServices?id=${id}`, { method: 'DELETE' })
    return res.ok
  },

  // Service Photos
  async uploadServicePhoto(serviceId: number, file: File) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('serviceId', serviceId.toString())
    
    const res = await fetch(`${API_BASE}/servicePhotos`, {
      method: 'POST',
      body: formData
    })
    if (!res.ok) return { success: false, error: 'Failed to upload photo' }
    return res.json()
  },
  async getServicePhotos(serviceId: number) {
    const res = await fetch(`${API_BASE}/servicePhotos?serviceId=${serviceId}`)
    if (!res.ok) return { success: false, data: [] }
    return res.json()
  },
  async deleteServicePhoto(id: number) {
    const res = await fetch(`${API_BASE}/servicePhotos?id=${id}`, { method: 'DELETE' })
    return res.ok
  },

  // Initialize database
  async initializeDatabase() {
    const res = await fetch(`${API_BASE}/initDb`, { method: 'POST' })
    return res.json()
  }
}
