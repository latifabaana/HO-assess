import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import MyMeals from './pages/MyMeals';
import {Routes, Route} from "react-router-dom"
import { AppProvider } from './context/context';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path = "/myMeals" element = {<MyMeals />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
