// Generic API Services for Hospital Management System
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/method/dt_app.custom_api'

class ApiServices {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Generic API request method with error handling
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    }

    try {
      console.log(`Making API request to: ${url}`)
      console.log('Request config:', config)
      
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error - Status: ${response.status}, Response: ${errorText}`)
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
      }
      
      const data = await response.json()
      console.log('API Response:', data)
      return data
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // Generic GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${endpoint}?${queryString}` : endpoint
    
    return this.makeRequest(url, {
      method: 'GET',
    })
  }

  // Generic POST request
  async post(endpoint, data) {
    return this.makeRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Generic PUT request
  async put(endpoint, data) {
    return this.makeRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Generic DELETE request
  async delete(endpoint) {
    return this.makeRequest(endpoint, {
      method: 'DELETE',
    })
  }
}

// Create and export a singleton instance
const apiServices = new ApiServices()
export default apiServices
