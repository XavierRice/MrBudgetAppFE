import EditForm from "../components/EditForm";
import EditFormV2 from "../components/EditFormV2";

export default function Edit({transactionArr}) {
    return (
      <div className="New Edit">
        <h2>Edit</h2>
        <EditFormV2 transactionArr={transactionArr}/>
      </div>
    );
  }
  
