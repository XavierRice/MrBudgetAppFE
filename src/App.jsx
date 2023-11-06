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


function App() {

  const [transactionArr, setTransactionArr ] = useState([])
  const [totalAmount, setTotalAmount] = useState(0);
  const [storedTransactions, setStoredTrans] = useState([])

 useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactionArr) )
 }, [])
 
 useEffect(()=>{
 const jsonStringofItems = localStorage.getItem("transactions");
 setStoredTrans(JSON.parse(jsonStringofItems))
 }, [])

 console.log(storedTransactions)
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

