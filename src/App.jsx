// DEPENDENCIES
import { useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

//PAGES
import Home from "./pages/Home";
import Index from "./pages/Index";
import Show from "./pages/Show";
import Edit from "./pages/Edit";

//Components
import NavBar from "./components/NavBar";
import NewForm from "./components/NewForm";
import Footer from "./components/Footer";
import BarChart from "./components/BarChart";
//import Header from "./components/Header";
//import EditFormV2 from "./components/EditFormV2";

function App() {

  const [transactionArr, setTransactionArr ] = useState([])
  const [totalAmount, setTotalAmount] = useState(0);
  const [storedTransactions, setStoredTrans] = useState([])

 useEffect(() => {
  setStoredTrans(localStorage.setItem("transactions", transactionArr ))
  console.log(storedTransactions)
 }, [transactionArr])
 
  return (
    
    <div className="App">
      <NavBar totalAmount={totalAmount}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Index setTransactions={setTransactionArr} transactions={transactionArr} setTotalAmount={setTotalAmount} />} />
        <Route path="/transactions/:id" element={<Show />} />
        <Route path="/transactions/:id/edit" element={<Edit transactionArr={transactionArr} />} />
        <Route path="/transactions/new" element={<NewForm />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;

//<Header totalAmount={totalAmount}/>
//<Route path="/transactions/chart" element={<BarChart transactionArr={transactionArr} />} />