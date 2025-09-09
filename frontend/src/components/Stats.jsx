import React, { useEffect, useState } from 'react'
import { getStats } from '../api/BookService'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function Stats() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStats().then(res => {
      const stats = res.data
      const labels = stats.map(s => s.genre)
      const counts = stats.map(s => s.count)
      setData({ labels, datasets: [{ label: 'Books per Genre', data: counts }] })
    }).catch(() => setData({ labels: [], datasets: [] })).finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading stats…</p>
  if (!data) return <p>No stats available</p>

  return (
    <div>
      <h2>Statistics</h2>
      <Bar data={data} />
    </div>
  )
}