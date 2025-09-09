import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBooks, deleteBook } from '../api/BookService'

export default function BookList() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = async () => {
    setLoading(true)
    try {
      const res = await getBooks()
      setBooks(res.data)
    } catch (err) {
      setError('Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetch() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this book?')) return
    try {
      await deleteBook(id)
      await fetch()
    } catch {
      alert('Delete failed')
    }
  }

  if (loading) return <p>Loading books…</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>All Books</h2>
      {books.length === 0 ? <p>No books yet</p> : (
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Published</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(b => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.genre}</td>
                <td>{new Date(b.publishedDate).toLocaleDateString()}</td>
                <td>{b.rating}</td>
                <td>
                  <Link to={`/edit/${b.id}`}>Edit</Link>
                  {' | '}
                  <button onClick={() => handleDelete(b.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}