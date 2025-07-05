export const API = "http://localhost:1337/api"
export const register = `${API}/auth/local/register`

export const login = `${API}/auth/local`

export const currentUserUrl = (id)=> `${API}/users/${id}`

export const events = `${API}/events?populate=*`

export const event = (id) => `${API}/events/${id}`

export const imageRoute = (id) => `http://localhost:1337${id}`

export const accessibilityNeedsRoute = (id) => `${API}/accessibility-needs/${id}?populate=*`
