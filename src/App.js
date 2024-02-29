import Navbar from './Components/navbar'; // Importa il componente Header
import Footer from './Components/footer'; // Importa il componente Footer
import Home from './Pages/home.jsx'// Importa il componente Home
function App() {
  return (
    <div className="App">
      <Navbar /> 
      <main>
        <Home />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
