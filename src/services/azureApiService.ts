// Azure Functions API Service
const API_BASE = process.env.REACT_APP_AZURE_FUNCTIONS_URL || 
  'https://pamperpro-functions-bqauh8afdnbeevfq.southafricanorth-01.azurewebsites.net/api'

export const azureApi = {
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

  // Initialize database
  async initializeDatabase() {
    const res = await fetch(`${API_BASE}/initDb`, { method: 'POST' })
    return res.json()
  }
}
