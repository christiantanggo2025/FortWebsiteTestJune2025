import Image from 'next/image';
const buttonStyle: React.CSSProperties = {
  backgroundColor: '#ff0000',
  color: '#fff',
  padding: '16px',
  fontSize: '18px',
  textAlign: 'center',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: 'bold'
};

export default function MenuTabs() {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      backgroundColor: '#000',
      color: '#fff',
      minHeight: '80vh',
      gap: '40px',
    }}>
      <div style={{
        flex: '1 1 400px',
        maxWidth: '500px',
      }}>
        <Image
          src="/images/menu-picture.jpg"
          alt="Menu"
          width={400}
          height={300}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <div style={{
        flex: '1 1 300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '400px',
      }}>
        <a href="/pdf/main-menu.pdf" target="_blank" rel="noopener noreferrer" style={buttonStyle}>
          Main Menu
        </a>
        <a href="/pdf/pizza-menu.pdf" target="_blank" rel="noopener noreferrer" style={buttonStyle}>
          Pizza Menu
        </a>
        <a href="/pdf/bike-night-menu.pdf" target="_blank" rel="noopener noreferrer" style={buttonStyle}>
          Bike Night Menu
        </a>
        <a href="/pdf/special-events-menu.pdf" target="_blank" rel="noopener noreferrer" style={buttonStyle}>
          Special Events Menu
        </a>
      </div>
    </div>
  );
}
