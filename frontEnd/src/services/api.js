import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

/**
 * Fetch all projects from the backend.
 * Endpoint: GET /api/project/getAllProjects
 * Returns: { data: Project[] }
 */
export const fetchProjects = async () => {
    const response = await apiClient.get('/api/project/getAllProjects')
    // Backend wraps data in { message, data }
    return response.data?.data || []
}

export default apiClient
