//- A user can click on a specific log and see more details
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"


function ShowDetails() {
    const [transaction, setTransactions] = useState([])
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)

    useEffect(() => {

     const API = import.meta.env.VITE_REACT_APP_API_URL;

        const fetchedTransaction = async () => {

            try {
                const res = await fetch(`${API}/transactions/${id}`)
                const newTransaction = await res.json();
                setTransactions(newTransaction)
            } catch (err) {
                console.error(err)
            }
        }
        fetchedTransaction();
    }, [id])

    const handleDelete = () => {
        const API = import.meta.env.VITE_REACT_APP_API_URL;

        fetch(`${API}/transactions/${id}`, { method: "DELETE" })
            .then(() => {
                navigate(`/transactions`);
            })
            .catch((error) => console.error(error));
    };


    return (

        <div key={id} className="container show">
            <div className="card transactions">
                <h1 className="card-text">{transaction.id}</h1>
                <h3>{transaction.date}</h3>
                <section>
                    <p>{transaction.amount}</p>
                </section>
                <h4>{transaction.transaction_name}</h4>
                <h5>{transaction.category}</h5>
            </div>
            <div className="showNavigation">
                <div>
                    {" "}
                    <Link to={`/transactions`}>
                        <button>Back</button>
                    </Link>
                </div>
                <div>
                    {" "}
                    <Link to={`/transactions/${id}/edit`}>
                        <button>Edit</button>
                    </Link>
                </div>
            </div>
            <div>
                <div>
                    <button onClick={handleDelete}> Delete</button>
                </div>
            </div>
        </div>
    )
}


export default ShowDetails;