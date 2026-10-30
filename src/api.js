const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

async function request(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: options.body
            ? { 'Content-Type': 'application/json', ...options.headers }
            : options.headers,
    })

    const contentType = response.headers.get('content-type')
    const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text()

    if (!response.ok) {
        const message = typeof data === 'object' && data !== null && (data.error || data.message)
            ? data.error || data.message
            : `Request failed with status ${response.status}`
        const error = new Error(message)
        error.status = response.status
        throw error
    }

    return data
}

export const api = {
    get(path) {
        return request(path)
    },
    post(path, body) {
        return request(path, {
            method: 'POST',
            body: JSON.stringify(body),
        })
    },
}
