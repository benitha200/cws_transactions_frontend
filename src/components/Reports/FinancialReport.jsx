// FinancialReport.jsx

import React, { useState } from 'react';
import './reports.css';
import Transactions from '../Transactions/Transactions';

const FinancialReport = ({ date, onDateChange }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const mapApiResponseToCustomers = (data) => {
    console.log(data)
    return data.map(item => {
        return {
            id: item.id,
            cws_name: item.cws_name,
            farmer_name: item.farmer_name,
            farmer_code:item.farmer_code,
            purchase_date: item.purchase_date,
            cherry_kg: parseFloat(item.cherry_kg),
            has_card: item.has_card === 1,
            cherry_grade: item.cherry_grade,
            price: parseFloat(item.price),
            paper_grn_no: item.paper_grn_no,
            transport: parseFloat(item.transport),
            batch_no: item.batch_no,
            // created_at: new Date(item.created_at),
        };
    });
};

  const generateReport = async () => {
    console.log('Generate report for date:', date);

    if (date) {
      // const formattedDate = date.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
      const formattedDate = date;
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "date": formattedDate
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      try {
        setLoading(true);

        const response = await fetch("http://127.0.0.1:8000/api/getfinancialreport/", requestOptions);
        const data = await response.json();

        console.log(data);

        const mappedData = mapApiResponseToCustomers(data);
        setCustomers(mappedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching financial report:', error);
        setLoading(false);
      }
    }
  };

  // Call generateReport when the component mounts or when the date changes
  React.useEffect(() => {
    generateReport();
  }, [date]);

  return (
    <div className='w-75'>
      <div className='text-teal-600 text-pretty font-bold text-2xl'>DAILY REPORT</div>
      <form action="" className='flex flex-row flex-wrap mt-4'>
        <div className='flex flex-row flex-wrap items-center ml-4'>
          <label className='text-dark p-2 text-sm'>Select Date</label>
          <input
            placeholder="First"
            className="input mb-4"
            name="date"
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
        {/* <button
          className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-2 rounded ml-2"
          onClick={(e) => {
            e.preventDefault();
            generateReport();
          }}
        >
          Generate
        </button> */}
      </form>
      <Transactions customers={customers} loading={loading} />
    </div>
  );
};

export default FinancialReport;
