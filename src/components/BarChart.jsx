import { Bar } from 'react-chartjs-2';

const BarChart = ({transactionArr}) => {
  const labels = transactionArr.map(transaction => transaction.transaction_name);
  const amounts = transactionArr.map(transaction => transaction.amount);


    return (
      <div className="chart">
        <Bar
          data={{
            labels: labels,
            datasets: [{
              label: 'Amount',
              data: amounts,
              backgroundColor: 'steelblue'
            }]
          }}
          options={{
            scales: {
              x: {
                type: 'linear', 
                ticks:{
                  callback:function(value, index, values){
                    return labels[index];
                  }
                }
              },
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      </div>
    );
  };
 
  export default BarChart;