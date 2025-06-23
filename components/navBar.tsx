import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { FaCog, FaHeart, FaHome, FaMusic } from 'react-icons/fa';

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { icon: <FaHome />, label: 'Home', path: '/' },
    { icon: <FaCog />, label: 'Config.', path: '/config' },
    { icon: <FaHeart />, label: 'Hist.', path: '/Notification' },
    { icon: <FaMusic />, label: 'Playlist', path: '/playlist' },
  ];

  return (
    <div style={styles.navbar}>
      {tabs.map((tab) => (
        <button
          key={tab.path}
          onClick={() => router.push(tab.path)}
          style={{
            ...styles.navItem,
            color: pathname === tab.path ? '#00b5ff' : '#777',
          }}
        >
          {tab.icon}
          <span style={styles.label}>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0.75rem 0',
    borderRadius: '20px 20px 0 0',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
    zIndex: 100,
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    outline: 'none',
  },
  label: {
    fontSize: '0.7rem',
    marginTop: '4px',
  },
};

export default NavBar;
