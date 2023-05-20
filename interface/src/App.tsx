import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from "./context/authContext"
import { RoutesPage } from "./routes"

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
