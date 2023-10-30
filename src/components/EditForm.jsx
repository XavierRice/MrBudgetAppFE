import { useState , useEffect} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function EditForm({transactionArr}) {
    
    const { id } = useParams();  // this returns the id as a string which i always forget
    const navigate = useNavigate();

  
    let [ currentTransaction, setCurrentTransaction] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [option, setOption] = useState("transaction_name");
    const [value, setValue] = useState("")

    useEffect( () => {      //I was getting some issues with resolving to the DOM so i tried a use Effect so that i would load first.
      const transactionToEdit = transactionArr.find( transId => transId.id === parseInt(id))  // so im turning the id into a number here.
        setCurrentTransaction(transactionToEdit)
        setValue((prevValue) =>{
            return currentTransaction['transaction_name']
        })
    }, [id])

    const handleOption = (event) => {
        console.log(event.target.value)
        const newOption = event.target.value
        setOption(newOption) 
        setValue(currentTransaction[newOption])    
        console.log(newOption)
    };

    const handleValue = (event) => {
        const inputValue = event.target.value;
        const modifiedInput = option === "amount" ? parseFloat(inputValue) : inputValue
        setValue(modifiedInput)
        console.log(modifiedInput)
    };

    const handleEditSumbit = async (event) => {
        const valid = true
        event.preventDefault();
        handleValue(event);
        handleOption(event);
        console.log(option, value);
        setIsSubmitting(valid);
        const transaction = { [option]: value };

        try {
            const API = import.meta.env.VITE_REACT_APP_API_URL;
            const response = await fetch(`${API}/transactions/${id}`, {
                method: "PUT",
                body: JSON.stringify(transaction),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 404){
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
        <div className="Edit">
            <form onSubmit={handleEditSumbit}>
                <label htmlFor="option">Option:</label>
                <select
                className="form-select"
                    name="option"
                    onChange={handleOption}
                    value={option}
                    required
                >
                    <option value={"transaction_name"}>Name of the Transaction</option>
                    <option value={"amount"}>Amount</option>
                    <option value={"date"}> Date</option>
                    <option value={"from"}>From</option>
                    <option value={"category"}> Category</option>
                </select>

                <label htmlFor="value">Changes:</label>
                <input
                className="form-control"
                    id="value"
                    type="text"
                    onChange={handleValue}
                    value={value}
                    required
                />
                <br />
                <br />
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </form>
            <br />
            <Link to={`/transactions`}>
                <button>Nevermind!</button>
            </Link>
        </div>
    )

};


export default EditForm;


