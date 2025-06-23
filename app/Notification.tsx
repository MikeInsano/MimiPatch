import NavBar from '@/components/navBar'
import React from 'react'

const notifications = [
  {
    date: 'Hoy',
    items: [{ time: '12:00 pm', message: 'Movimiento detectado' }],
  },
  {
    date: 'Ayer',
    items: [{ time: '1:00 pm', message: 'Movimiento detectado' }],
  },
  {
    date: '03-06-2025',
    items: [
      { time: '7:00 am', message: 'Movimiento detectado' },
      { time: '3:00 am', message: 'Movimiento detectado' },
    ],
  },
]

const NotificationHistory = () => {
  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Historial de Notificaciones</h2>
      <div style={styles.container}>
        {notifications.map((group, index) => (
          <div key={index} style={styles.group}>
            <p style={styles.date}>{group.date}</p>
            {group.items.map((item, i) => (
              <div key={i} style={styles.card}>
                <div style={styles.icon}>💙</div>
                <div>
                  <p style={styles.message}>{item.message}</p>
                  <p style={styles.time}>A las {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
        <NavBar />
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    background: '#f1f4f9',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#222',
    marginBottom: '1.5rem',
  },
  container: {
    background: '#fff',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  group: {
    marginBottom: '1.5rem',
  },
  date: {
    fontWeight: 600,
    color: '#222',
    marginBottom: '0.5rem',
  },
  card: {
    backgroundColor: '#f5f8ff',
    borderRadius: '15px',
    padding: '0.8rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '0.7rem',
  },
  icon: {
    fontSize: '1.5rem',
  },
  message: {
    fontWeight: 500,
    margin: 0,
    color: '#333',
  },
  time: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#666',
  },
}

export default NotificationHistory
