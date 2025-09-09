import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import Stats from './components/Stats'

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Book Library</h1>
        <nav>
          <Link to="/">Books</Link>
          {' | '}
          <Link to="/new">Add Book</Link>
          {' | '}
          <Link to="/stats">Stats</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/new" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
    </div>
  )
}