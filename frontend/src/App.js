import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Admin from './components/Admin';
import { MyProvider } from './context/Mycontext'
import Update from './components/Update';

function App() {
  return (
    <MyProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/updateProduct/:id" element={<Update />} />
          </Routes>
        </BrowserRouter>
      </div>
    </MyProvider>
  );
}

export default App;
