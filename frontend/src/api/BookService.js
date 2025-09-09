import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'https://localhost:5001'
const client = axios.create({ baseURL: API_BASE + '/api' })

export const getBooks = () => client.get('/books')
export const getBook = (id) => client.get(`/books/${id}`)
export const createBook = (book) => client.post('/books', book)
export const updateBook = (id, book) => client.put(`/books/${id}`, book)
export const deleteBook = (id) => client.delete(`/books/${id}`)
export const getStats = () => client.get('/books/stats')