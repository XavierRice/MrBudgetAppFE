
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

const EditFormV2 = ({ transactionArr }) => {
    const { id } = useParams();  // this returns the id as a string which i always forget
    const navigate = useNavigate();

    const [amountError, setAmountError] = useState("")
    const [nameError, setNameError] = useState("")
    const [transaction, setTransaction] = useState({
        transaction_name: "",
        amount: 0,
        date: "",
        from: "",
        category: ""
    } || transaction)

    useEffect(() => {      //I was getting some issues with resolving to the DOM so i tried a use Effect so that i would load first.
        const transactionToEdit = transactionArr.find(transId => transId.id === parseInt(id))  // so im turning the id into a number here.
        setTransaction(transactionToEdit)
    }, [id]);

    function handleTextChange(event) {
        const value = event.target.id

        if (value === "transaction_name") {
            const transactionName = event.target.value
            if (transactionName.trim() == "") {
                setNameError("You have to enter a name")
            } else {
                setTransaction({
                    ...transaction,
                    [value]: transactionName.trim()
                });
            }
        };
        if (value === "amount") {
            let numberAmount = parseFloat(event.target.value)
            if (isNaN(numberAmount) || numberAmount <= 0) {
                setAmountError("Amount has got to be money of some kind")
            } else {
                setTransaction({
                    ...transaction,
                    [value]: transactionName.trim()
                });
            }
        }
        setTransaction({
            ...transaction,
            [event.target.id]: event.target.value,
        });
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(!isSubmitting);

        try {
            const API = import.meta.env.VITE_REACT_APP_API_URL;
            const response = await fetch(`${API}/transactions/${id}`, {
                method: "PUT",
                body: JSON.stringify(transaction),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 404) {
                throw new Error("There is no transaction here")
            }
            if (!response.ok) {
                throw new Error("Network request failed");
            }
            navigate(`/transactions/${id}`);
        } catch (error) {
            console.error("Error editing transaction:", error);
        } finally {
            console.log(transaction)                                         //finally is in the try/catch family. cuz to then. Its for a block of code that will run, at the end, regardless of error/out come
            setIsSubmitting(!valid);
        }
    };

    return (
        <div className="container">
            <h3 className="header">Transaction</h3>
            <div className="form">
                {transaction ? (

                    <form onSubmit={handleSubmit}>
                        <input
                            className='form-control'
                            name="transaction_name"
                            type="text"
                            id="transaction_name"
                            value={transaction.transaction_name}
                            onChange={handleTextChange}
                            placeholder="Name of the Transaction"
                            required
                        />
                        <hr></hr>
                        {nameError != "" && <div className='error-message'>{nameError}</div>}
                        <hr></hr>
                        <input
                            className='form-control'
                            name="amount"
                            type="text"
                            id={"amount"}
                            min={.01}
                            value={transaction.amount}
                            onChange={handleTextChange}
                            required
                        />
                        <hr></hr>
                        {amountError != "" && <div className='error-message'>{amountError}</div>}
                        <hr></hr>
                        <input
                            className='form-control'
                            name="from"
                            type="text"
                            id={'from'}
                            value={transaction.from}
                            onChange={handleTextChange}
                            placeholder=" Where from?"
                        />
                        <hr></hr>
                        <select
                            className='form-select'
                            name="category"
                            id={'category'}
                            value={transaction.category}
                            onChange={handleTextChange}
                            required
                        >
                            <option value={"sampleCategory"}>Sample</option>
                            <option value={"firstClassCategory"}>First Class</option>
                            <option value={"Student Expense"}>Learning</option>
                        </select>
                    </form>
                ) : (
                    <p>transaction loading...</p>
                )}
                <button onClick={handleSubmit}>Submit</button>
                <br />
                <Link to={`/transactions`}>
                    <button>Nevermind!</button>
                </Link>
            </div>
        </div>
    );

};

export default EditFormV2;




