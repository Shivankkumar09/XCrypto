import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home.jsx"
import Header from "./components/Header.jsx"
import Exchanges from "./components/Exchanges.jsx"
import Coin from "./components/Coin.jsx"
import CoinDetails from "./components/CoinDetails.jsx"
import Footer from "./components/Footer.jsx"

function App() {
  

  return (
   <>
   <Router>
    <Header />
    <Routes>
     <Route path="/"  element={<Home />} />
     <Route path="/coin"  element={<Coin />} />
     <Route path="/exchanges"  element={<Exchanges />} />
     <Route path="/coin/:id"  element={<CoinDetails />} />
    </Routes>
    <Footer />
   </Router>

   </>
  )
}

export default App
