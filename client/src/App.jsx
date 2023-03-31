import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import CreateRecipes from './pages/CreateRecipes';
import SavedRecipes from './pages/SavedRecipes';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/create-recipe' element={<CreateRecipes />} />
          <Route path='/saved-recipes' element={<SavedRecipes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
