import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBook, createBook, updateBook } from '../api/BookService'

const initial = {
  title: '', author: '', genre: '', publishedDate: '', rating: 3
}

export default function BookForm() {
  const { id } = useParams()
  const editMode = Boolean(id)
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    getBook(id).then(res => setForm(res.data)).catch(() => setError('Failed to load')).finally(() => setLoading(false))
  }, [id])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value, 10) : value }))
  }

  const validate = () => {
    if (!form.title.trim()) return 'Title is required'
    if (!form.author.trim()) return 'Author is required'
    if (form.rating < 1 || form.rating > 5) return 'Rating must be 1-5'
    return null
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (v) { setError(v); return }

    try {
      if (editMode) {
        await updateBook(id, form)
      } else {
        await createBook(form)
      }
      navigate('/')
    } catch (err) {
      setError('Save failed')
    }
  }

  if (loading) return <p>Loading…</p>

  return (
    <div>
      <h2>{editMode ? 'Edit Book' : 'Add Book'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit} className="book-form">
        <label>
          Title
          <input name="title" value={form.title} onChange={onChange} required />
        </label>
        <label>
          Author
          <input name="author" value={form.author} onChange={onChange} required />
        </label>
        <label>
          Genre
          <input name="genre" value={form.genre} onChange={onChange} />
        </label>
        <label>
          Published Date
          <input type="date" name="publishedDate" value={form.publishedDate ? new Date(form.publishedDate).toISOString().split('T')[0] : ''} onChange={onChange} />
        </label>
        <label>
          Rating
          <input type="number" name="rating" min="1" max="5" value={form.rating} onChange={onChange} />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  )
}