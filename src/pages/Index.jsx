import { useEffect, useState } from "react";
import TransactionsIndex from "../components/transactionsIndex";


function Index(props) {
  const [formattedNumber ,setFormattedNumber] = useState(0)
  const { transactions, setTransactions, setTotalAmount } = props
  const API = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {

    fetch(`${API}/transactions`)
      .then(((response) => (response.json())))

      .then((responseJSON) => {
        setTransactions(responseJSON)

        const totalAmount = responseJSON.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.amount;
        }, 0);

        const formattedAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(totalAmount);
        setFormattedNumber(formattedAmount)
        setTotalAmount(formattedAmount)
      })
      .catch((error) => console.error(error))
  }, []);



  return (
    <>
      <div className="Index">
        <h2>Index of Transactions</h2>
      </div>
      <TransactionsIndex transactions={transactions} />
    </>
  );

}

export default Index;