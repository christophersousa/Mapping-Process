import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from "./context/authContext"
import { RoutesPage } from "./routes"
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
            <RoutesPage/>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
