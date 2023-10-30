
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

const EditFormV2 = ({ transactionArr }) => {
    const { id } = useParams();  // this returns the id as a string which i always forget
    const navigate = useNavigate();

    const [nameError, setNameError] = useState("");
    const [amountError, setAmountError] = useState("");
    const [transactionName, setTransactionName] = useState("")
    const [amount, setAmount] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false);
    let [submittedTransaction, setSubmittedTransaction] = useState(null)
    const [editedTransaction, setEditedTransaction] = useState({

        transaction_name: "",
        amount: null,
        date: "",
        from: "",
        category: ""
    });

    useEffect(() => {      //I was getting some issues with resolving to the DOM so i tried a use Effect so that i would load first.
        const transactionToEdit = transactionArr.find(transId => transId.id === parseInt(id))  // so im turning the id into a number here.
        setSubmittedTransaction(transactionToEdit)
    }, [id]);

    function handleName(event) {
        const newTransaction = event.target.value
        console.log(newTransaction)
        if (newTransaction.trim() === "") {
            setNameError("You gotta name it something!")
        } else {
            setNameError("")
            setTransactionName(newTransaction.trim())
        }
    };

    function handleAmount(event) {
        let numberAmount = parseFloat(event.target.value)
        if (isNaN(numberAmount) || numberAmount <= 0) {                                 // learned isNAN after trying numberAmount ===Nan which wasnt working. Give truthy/falsey value if value is NaN
            setAmountError("Amount has got to be money of some kind")
        } else {
            setAmount(numberAmount)
        }
    };

    function handleTextChange(event) {
        setEditedTransaction({
            ...submittedTransaction,
            [event.target.id]: event.target.value,
        });
    }

    const handleSubmit = async (event) => {
        const valid = true
        event.preventDefault();
        handleAmount();
        handleName();
        setIsSubmitting(valid);
        setEditedTransaction({
            ...submittedTransaction,
            ...editedTransaction,
            amount: amount,
            transaction_name: transactionName,
        })

        try {
            const API = import.meta.env.VITE_REACT_APP_API_URL;
            const response = await fetch(`${API}/transactions/${id}`, {
                method: "PUT",
                body: JSON.stringify(editedTransaction),
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
            console.log(editedTransaction)                                         //finally is in the try/catch family. cuz to then. Its for a block of code that will run, at the end, regardless of error/out come
            setIsSubmitting(!valid);
        }
    };

    return (
        <div className="container">
            <h3 className="header">Transaction</h3>
            <div className="form">
                {submittedTransaction ? (

                    <form onSubmit={handleSubmit}>
                    <input
                        className='form-control'
                        name="transaction_name"
                        type="text"
                        id="transaction_name"
                        value={submittedTransaction.transaction_name}
                        onChange={handleName}
                        placeholder="Name of the Transaction"
                        required
                        />
                    <hr></hr>
                    {nameError != "" && <div className='error-message'>{nameError}</div>}
                    <hr></hr>
                    <input
                        className='form-control'
                        name="amount"
                        type="number"
                        id={"amount"}
                        min={.01}
                        value={submittedTransaction.amount}
                        onChange={handleAmount}
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
                        value={submittedTransaction.from}
                        onChange={handleTextChange}
                        placeholder=" Where from?"
                        />
                    <hr></hr>
                    <select
                        className='form-select'
                        name="category"
                        id={'category'}
                        value={submittedTransaction.category}
                        onChange={handleTextChange}
                        required
                        >
                        <option value={"sampleCategory"}>Sample</option>
                        <option value={"firstClassCategory"}>First Class</option>
                        <option value={"Student Expense"}>Learning</option>
                    </select>
                </form>
                    ): (
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




