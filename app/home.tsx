import React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { FaPlay, FaDownload, FaEllipsisH } from 'react-icons/fa'

const Home = () => {
  return (
    <div style={styles.page}>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background-color: #f1f4f9;
        }
      `}</style>

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Mimi Patch</h1>
          <div style={styles.user}>
            <span>Hola, Usuario!</span>
            <IoIosNotificationsOutline size={24} />
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.section}>
            <label style={styles.label}>Estado del bebé:</label>
            <div style={styles.statusRow}>
              <input type="text" value="Tranquilo" readOnly style={styles.inputStatus} />
              <span style={styles.status}>Conectado</span>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.subtitle}>En Reproducción:</h3>
            <div style={styles.trackCard}>
              <img
                src="https://babysandkids.com.mx/cdn/shop/files/gigoteuse-bebe-gaze-coton-ete-vert-maison-charlotte-1_b9c3715c-7ee6-45eb-a9e3-43fd9da77d5e.jpg?v=1721753181&width=1445"
                alt="track"
                style={styles.image}
              />
              <div style={styles.trackInfo}>
                <strong style={styles.trackTitle}>Ruido Blanco</strong>
                <span style={styles.artist}>Leonid Kogan, Vivaldi, Mendelssohn</span>
              </div>
              <div style={styles.trackActions}>
                <FaPlay />
                <FaDownload style={{ marginLeft: '10px' }} />
                <FaEllipsisH style={{ marginLeft: '10px' }} />
              </div>
              <button style={styles.changeBtn}>Cambiar</button>
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.notificationBox}>
              <h3 style={styles.notificationTitle}>Notificaciones</h3>
              <div style={styles.notificationBubble}>
                Se detectó movimiento a las 8:30 AM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: '#f1f4f9',
  },
  container: {
    width: '100%',
    maxWidth: '920px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    flex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    margin: 0,
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 500,
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
  },
  section: {
    marginBottom: '2rem',
  },
  label: {
    fontWeight: 600,
    display: 'block',
    marginBottom: '0.5rem',
  },
  inputStatus: {
    width: '100%',
    padding: '0.7rem 1rem',
    fontSize: '1rem',
    border: '1px solid #b5d0f0',
    borderRadius: '12px',
    backgroundColor: '#eaf4ff',
    color: '#0088cc',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  status: {
    color: '#00c58e',
    fontWeight: 500,
  },
  subtitle: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: '0.5rem',
  },
  trackCard: {
    backgroundColor: '#f6f8fc',
    borderRadius: '15px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '1rem',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: '12px',
    objectFit: 'cover',
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: '1rem',
    marginBottom: '0.2rem',
    display: 'block',
  },
  artist: {
    fontSize: '0.9rem',
    color: '#666',
  },
  trackActions: {
    display: 'flex',
    alignItems: 'center',
  },
  changeBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  // Notificaciones inspiradas en tu Figma
  notificationBox: {
    border: '2px solid #d6c8f9',
    borderRadius: '20px',
    padding: '1.5rem',
    backgroundColor: '#f9f6ff',
  },
  notificationTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#333',
  },
  notificationBubble: {
    backgroundColor: '#d6c8f9',
    color: '#5e2ca5',
    padding: '0.75rem 1rem',
    borderRadius: '15px',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '0.95rem',
  },
}

export default Home
