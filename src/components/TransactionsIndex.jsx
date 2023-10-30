
import { Link } from "react-router-dom"
import "./TransactionsIndex.css"

export default function TransactionsIndex({transactions}) {

    return (
        <div className="container">
            <section>
                {transactions.map((transaction, index) => {
                    return (
                        <div className="small-grey-card" key={index} style={{ backgroundColor: transaction.account < 2200.00 ? 'rgb(255, 0, 0)' : 'rgb(83, 159, 225)' }}>
                                <p className="card-title">{transaction.from}</p>
                                <h4 className="card-text">{transaction.date}</h4>
                                <p className="card-text">{transaction.amount}</p>
                                <Link to={`/transactions/${transaction.id}`}> Go to: {transactions.title}</Link>
                        </div>
                    )
                })}
            </section>
        </div>
    )

};


