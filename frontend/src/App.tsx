import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./components/auth/AuthProvider"
import { PrivateRoute } from "./routes/PrivateRoute"
import { AuthDebugger } from "./test"
import Sobre from "./pages/Sobre"
import Home from "./pages/Home"

export default function App() {
    return (
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/teste" element={<AuthDebugger />} />
                  <Route path="/" element={<Home />} />
                 <Route path="/sobre" element={<Sobre />} />

                  <Route element={<PrivateRoute />}>
                      <Route path="/teste2" element={<AuthDebugger />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </AuthProvider>
    )
}