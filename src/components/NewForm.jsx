import { nanoid } from 'nanoid'
import { customAlphabet } from 'nanoid'
import "./NewForm.css"
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const NewForm = () => {
    const navigate = useNavigate();


    useEffect(() => {
        handledDate();
    }, [])

    const [showNewCategoryInput, setShowNewCategoryInput] = useState(false)
    const [transactionName, setTransactionName] = useState("");
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("");
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")
    const [nameError, setNameError] = useState("")
    const [amountError, setAmountError] = useState("")
    const [newCategory, setNewCategory] = useState("")

    async function postTransaction(transaction) {
        const nanoid = customAlphabet('1234567890', 4)
        transaction.id = parseInt(nanoid());
        const API = import.meta.env.VITE_REACT_APP_API_URL;

        try {
            const res = await fetch(`${API}/transactions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transaction)
            })
            if (res.ok) {
                navigate(`/transactions/${transaction.id}`)
            } else {
                console.log("your log couldnt enter", res.status)
            }
        } catch (error) {
            console.log("err while entry", error)
        }
    };

    function handledDate() {
        const currentDate = new Date(); //creating a new instance of Date obj that has information about the date
        const day = currentDate.getDate(); //getting the day of the month from the obj.
        const month = currentDate.getMonth() + 1; // Get the month , which is index 0.(0-11) and add 1 to make it (1-12).
        const year = currentDate.getFullYear(); // Get the year.
        const formattedDate = `${month}-${day}-${year}` // redo the order.
        setDate(formattedDate)
        console.log(formattedDate)

    };
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
            setAmountError("")
        }
    };
    function handleFrom(event) {
        const newEvent = event.target.value
        setFrom(newEvent)
        console.log(newEvent)
    };
    function handleCategory(event) {
        const selectedCategory = event.target.value
        if(selectedCategory === 'New'){
            setShowNewCategoryInput(true)
        }
        setCategory(selectedCategory)
        console.log(selectedCategory)
    };

    function handleNewCategory(event){
        event.preventDefault()
        const newCategory = event.target.value
        setNewCategory(newCategory)
        setShowNewCategoryInput(false)
    }

    function handleSubmit(event) {
        event.preventDefault();

        handleAmount(event);
        handleCategory(event);
        handleFrom(event);
        handleName(event);
        handledDate();

        const transaction = {

            transactionName: transactionName,
            amount: amount,
            date: date,
            from: from,
            category: category
        };

        postTransaction(transaction)
    };

    return (
        <div className="container">
            <h3 className="header">Transaction</h3>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input
                        className='form-control'
                        name="transaction_name"
                        type="text"
                        value={transactionName}
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
                        min={.01}
                        value={amount}
                        onChange={handleAmount}
                        required
                    />
                    <hr></hr>
                    {amountError != "" && <div className='error-message'>{nameError}</div>}
                    <hr></hr>
                    <input
                        className='form-control'
                        name="from"
                        type="text"
                        value={from}
                        onChange={handleFrom}
                        placeholder=" Where from?"
                    />
                    <hr></hr>
                    <select
                        className='form-select'
                        name="category"
                        onChange={handleCategory}
                        value={category}
                        required
                    >
                        <option value={"sampleCategory"}>Sample</option>
                        <option value={"firstClassCategory"}>First Class</option>
                        <option value={"Student Expense"}>Learning</option>
                        <option value={"New"}>NEW</option>
                    </select>
                    {showNewCategoryInput && (
                        <input
                            className='form-control'
                            type="text"
                            name="newCategory"
                            value={newCategory}
                            onChange={handleNewCategory}
                            placeholder="Enter New Category"
                            required
                        />
                    )}
                </form>
                <button type='submit'>Submit</button>
                <br />
                <Link to={`/transactions`}>
                    <button>Nevermind!</button>
                </Link>
            </div>
            <div className="card reviewTransactions">
                <p>{date}</p>
                <h4>{transactionName}</h4>
                <p>{amount}</p>
                <p>Business or Vender:{from}</p>
                <p>Category:{category}</p>
            </div>
        </div>
    );

};

export default NewForm;




