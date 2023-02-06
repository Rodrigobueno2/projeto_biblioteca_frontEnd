import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import styles from '../components/MenuFixoDoTop.module.css'

function MenuFixoDoTopo({nomeTela}) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container >
          <Navbar.Brand style={{fontSize:30, marginRight:100}}>{nomeTela}</Navbar.Brand>
          <Nav className="me-auto" style={{fontSize:25, margin:20}} >
          <Link to="/" className={styles.links}>Home</Link>
          <Link to="/usuarios" className={styles.links}>Usuários</Link>
          <Link to="/" className={styles.links}>Livros</Link>
          <Link to="/" className={styles.links}>Empréstimos</Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      
    </>
  );
}

export default MenuFixoDoTopo;