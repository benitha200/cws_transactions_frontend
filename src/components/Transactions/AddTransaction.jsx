import React, { useState,useEffect,useRef } from 'react';
import './FormPage.css';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';
import {openDB} from 'idb';
import logo from './../../assets/img/RwacofLogoCoulRVB.png';


const initializeIndexedDB=async()=>{
    const db=await openDB('offlineTransactions',1,{
        upgrade(db){
            db.createObjectStore('transactions',{keyPath:'id',autoIncrement:true});
        },
    });
    return db;
}
        

const AddTransaction = ({token,setToken,role,cwsname,cwscode,cws}) => {
    const occupations = [
        {name: 'Select Occupation'},
        { name: 'Site Collector', code: 'Site Collector' },
        { name: 'Farmer', code: 'Farmer' },
    ];
    const grades = [
        {name: 'Select Grade'},
        { name: 'CA', value: 'CA' },
        { name: 'CB', value: 'CB' },
        { name: 'NA', value: 'NA' },
        { name: 'NB', value: 'NB' },
    ];
    const defaultGrade=grades[0]
    const defaultOccupation = occupations[0];
    const [loading,setLoading]=useState(false)
    const [responsemessage,setResponsemessage]=useState()
    const [selectedFarmer, setSelectedFarmer] = useState(null);
    const [farmers, setFarmers] = useState([]);
    const [season,setSeason]=useState(new Date().getFullYear())
    const [price,setPrice]=useState(410)
    const toast = useRef(null);
    const [selectedOccupation, setSelectedOccupation] = useState(defaultOccupation);
    const [grade, setGrade] = useState(defaultGrade);
    const [selectedGradePrice,setSelectedGradePrice ]=useState()
    const [selectedGradeLimit,setSelectedGradeLimit]=useState()
    
    
    console.log(cws)

    // Find information for the selected grade
    // if (cws && grade) {
    //   const selectedGrade = cws.find(item => item.grade === grade[1]);
    //   console.log(grade[1])
      
    //   if (selectedGrade) {
    //     const { 
    //       price_per_kg: setSelectedGradePrice(price), 
    //       transport_limit: setSelectedGradeLimit(limit), 
    //     } = selectedGrade;
    
    //     console.log(`Grade ${selectedGrade.grade}: Price ${selectedGradePrice}, Limit ${selectedGradeLimit}`);
    //   }
    // }

    // if (cws) {
    //   if(grade){
    //        const selectedGrade = cws.find(item => item.grade === grade[1]);
      
    //   if (selectedGrade) {
    //     const { price_per_kg: price, transport_limit: limit } = selectedGrade;
    
    //     setSelectedGradePrice(price);
    //     setSelectedGradeLimit(limit);
    
    //     console.log(`Grade ${selectedGrade.grade}: Price ${price}, Limit ${limit}`);
    //   }
    //   }
   
    // }
    
  
    
    
   
    function get_farmers(){
        var requestOptions = {
        method: 'GET',
        headers: {
            "Authorization":`Bearer ${token}`
        },
        redirect: 'follow',
        };

        fetch("http://127.0.0.1:8000/api/farmers/", requestOptions)
        .then(response => response.json())
        .then(result => setFarmers(result))
        .catch(error => console.log('error', error));
    }
    const farmerOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.farmer_code} - {option.farmer_name}</div>
            </div>
        );
    };
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        // date:'',
        lastTwoDigitsOfYear: '',
        formattedMonth: '',
        formattedDay: '',
        farmerName: '',
        hasCard: false,
        pricePerKg: '',
        transportPerKg: '',
        cherryGrade: '',
        prebatch: '',
        batchNumber: '',
      });

    // Date utils

// const todayy = () => {
//   const now = new Date();
//   now.setHours(0,0,0,0);  
//   return now;
// }

// const yesterdayy = () => {
//   const now = todayy();
//   now.setDate(now.getDate() - 1);
//   return now;
// }




// // Validation 

// const isDateValid = (selectedDate) => {

//   const yesterday = yesterdayy();
//   const today = todayy();

//   return (
//     selectedDate >= yesterday && 
//     selectedDate <= today
//   );

// }

// Get price for grade
const getPriceForGrade = (grade) => {
  return grade.includes('A') ? 410 : 100;
}
const handleInputChange = (e) => {

  const {name, value} = e.target;

  // Date validation
  if(name === 'date') {
    const selected = new Date(value);
    const lastTwoDigitsOfYear = selected.getFullYear().toString().slice(-2);
    const formattedMonth = String(selected.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(selected.getDate()).padStart(2, '0');
    setFormData({
        ...formData,
        [name]: value,
        lastTwoDigitsOfYear,
        formattedMonth,
        formattedDay,
     });
    if(!isDateValid(selected)) {
      setFormData({
        ...formData,
        date: ''
      });
      alert('Please select today or yesterday');
      return;
    }
  }

  // Handle cherryGrade
  if(name === 'cherryGrade') {
    setGrade(value)
    const price = getPriceForGrade(value); 
    setPrice(price);
  }

  // Update form data 
  setFormData({
    ...formData,
    [name]: value 
  });

}    
    //   const handleInputChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     const selectedDate = new Date(e.target.value);
    //     const today = new Date();
    //     const yesterday = new Date();
    //     yesterday.setDate(today.getDate() - 1);
    
    //     if (name === 'date') {
    //       // Assuming 'date' is the name attribute for the date input
    //       const purchaseDate = new Date(value);
        
    //       // Extract last two digits of the year
    //       const lastTwoDigitsOfYear = purchaseDate.getFullYear().toString().slice(-2);
    //       const formattedMonth = String(purchaseDate.getMonth() + 1).padStart(2, '0');
    //       const formattedDay = String(purchaseDate.getDate()).padStart(2, '0');
    //       setFormData({
    //         ...formData,
    //         [name]: value,
    //         lastTwoDigitsOfYear,
    //         formattedMonth,
    //         formattedDay,
    //       });
    //     } else if (name === 'cherryGrade') {
    //       const price = value.includes('A') ? 410 : 100;
    //       setPrice(price);
        
    //       setFormData({
    //         ...formData,
    //         [name]: value,
    //       });
    //     } else {
    //       // Handle other input fields here
    //       if (selectedDate.toDateString() === today.toDateString() || selectedDate.toDateString() === yesterday.toDateString()) {
    //         setFormData({
    //           ...formData,
    //           [name]: value,
    //         });
    //       } else {
    //         // Reset the date if it's not valid
    //         setFormData({
    //           ...formData,
    //           date: ''
    //         });
    //         alert('Please select a valid date (today or yesterday)');
    //       }
    //     }
        
    // };
    
    
    
    //   useEffect(() => {
    //     get_farmers();
    // }, []);
    useEffect(() => {
        get_farmers();
      
        const handleOnlineStatusChange = () => {
          if (navigator.onLine) {
            synchronizeOfflineData();
          }
        };
      
        window.addEventListener('online', handleOnlineStatusChange);
      
        return () => {
          window.removeEventListener('online', handleOnlineStatusChange);
        };
      }, []);
      
    
    const handleSubmit = async (e) => {
        // print()
        e.preventDefault();

        const isOnline=navigator.onLine;
        if(!isOnline){
            const db = await initializeIndexedDB();
            const tx = db.transaction('transactions', 'readwrite');
            const store = tx.objectStore('transactions');
        
            const offlineTransaction = {
              data: {
                cws_name: cwsname,
                purchase_date:formData.date,
                farmer_code:selectedFarmer?.farmer_code || "",
                farmer_name:selectedFarmer?.farmer_name || "",
                season:season,
                cherry_kg:parseFloat(formData.pricePerKg),
                has_card:formData.hasCard ? 1:0,
                cherry_grade:formData.cherryGrade,
                price:parseFloat(price),
                paper_grn_no:formData.prebatch,
                transport:parseFloat(formData.transportPerKg),
                cws_code:cwscode
              },
              timestamp: new Date().getTime(),
            };
            await store.add(offlineTransaction);
            toast.current.show({ severity: 'info', summary: 'Offline', detail: 'Transaction saved offline' });

            // You can update the UI to reflect that the data is saved offline
            return;
        }
        const rawPayload = {
          "cws_name": cwsname,
          "purchase_date": formData.date,
          "farmer_code": selectedFarmer?.farmer_code || "",
          "farmer_name": selectedFarmer?.farmer_name || "",
          "season": season,
          "cherry_kg": parseFloat(formData.pricePerKg),
          "has_card": formData.hasCard ? 1 : 0,
          "cherry_grade": formData.cherryGrade,
          // "price": parseFloat(price),
          "paper_grn_no": formData.prebatch,
          "transport": parseFloat(formData.transportPerKg),
          "cws_code":cwscode
        };
    
        const requestOptions = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(rawPayload),
          redirect: 'follow',
        };
    
        try {
          setLoading(true);
    
          const response = await fetch("http://127.0.0.1:8000/api/processtransaction/", requestOptions);
          const result = await response.json();

          
    
          console.log(result);
          console.log(result.message);

          if (result && result.message) {
            setResponsemessage(result.message);
            toast.current.show({ severity: 'success', summary: 'Success', detail: result.message });

            // print recveipt
            const receiptWindow = window.open('', '_blank');
            receiptWindow.document.write(`<!-- index.html -->
            <!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="./receipt.css">
                    <title>Coffee Cherry Purchase Receipt</title>
                    <style>
                        body {
                            font-family: "Inter", sans-serif;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }

                        .card {
                            width: 300px; /* Adjusted width for Bluetooth POS */
                            height: 400px; /* Adjusted height for Bluetooth POS */
                            background-color: #fff;
                            padding: 10px;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }

                        .receipt_container {
                            text-align: left;
                        }

                        .logo_container {
                            margin-bottom: 10px;
                        }

                        .logo_container img {
                            max-width: 100%;
                            height: auto;
                            border-radius: 50%;
                            width: 60px;
                            height: 60px;
                        }

                        .title_container {
                            margin-bottom: 5px;
                        }

                        .title {
                            margin: 0;
                            font-size: 1rem;
                            font-weight: 600;
                            color: #0f737a;
                        }

                        .item_container {
                            margin-bottom: 5px;
                        }

                        .item_row {
                            margin-bottom: 5px;
                            display: flex;
                            justify-content: space-between;
                        }

                        .label {
                            font-size: 0.8rem;
                            flex-grow: 1;
                        }

                        .value {
                            font-size: 0.8rem;
                            font-weight: 600;
                        }

                        .dotted_line {
                            border-top: 1px dotted #212121;
                            margin: 10px 0;
                        }

                        .total_container {
                            margin-bottom: 5px;
                        }

                        .total_row {
                            display: flex;
                            justify-content: space-between;
                        }

                        .payment_container {
                            margin-bottom: 5px;
                        }

                        .payment_row {
                            display: flex;
                            justify-content: space-between;
                        }

                        .thank_you_container {
                            text-align: center;
                        }

                        .thank_you {
                            margin: 0;
                            font-size: 0.8rem;
                            color: #8B8E98;
                        }
                    </style>

                </head>

                <body>
                    <div class="card">
                        <div class="receipt_container">
                            <div class="logo_container">
                                <img src="./../../assets/img/RwacofLogoCoulRVB.png" alt="Logo">
                            </div>

                            <div class="title_container">
                                <p class="title">Coffee Cherry Purchase Receipt</p>
                            </div>

                            <div class="item_container">
                                <div class="item_row">
                                    <span class="label">Cherry Grade:</span>
                                    <span class="value">CA</span>
                                </div>

                                <div class="item_row">
                                    <span class="label">Quantity (Kg):</span>
                                    <span class="value">10</span>
                                </div>

                                <div class="item_row">
                                    <span class="label">Price per Kg:</span>
                                    <span class="value">Rwf 420</span>
                                </div>

                                <div class="item_row">
                                    <span class="label">Transport per Kg:</span>
                                    <span class="value">Rwf 10</span>
                                </div>

                                <div class="dotted_line"></div>

                                <div class="item_row total_row">
                                    <span class="label">Total:</span>
                                    <span class="value">Rwf 4300</span>
                                </div>
                            </div>

                            <div class="thank_you_container">
                                <p class="thank_you">Thank you for your supply!</p>
                            </div>
                        </div>
                    </div>
                </body>

                </html>
                `);
                receiptWindow.document.close();

                // Add an event listener for the afterprint event
                receiptWindow.addEventListener('afterprint', () => {
                    // Close the print window after printing
                    receiptWindow.close();
                });
                
                // Open print dialog
                receiptWindow.print();
                receiptWindow.close();


            setFormData({
                // date: '',
                farmerName: '',
                hasCard: false,
                pricePerKg: '',
                transportPerKg: '',
                cherryGrade: '',
                prebatch: '',
                batchNumber: '',
            });
        } else {
          toast.current.show({ severity: 'error', summary: 'Error', detail: result.error });
        }
        } catch (error) {
          console.error('Error submitting transaction:', error);
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error submitting transaction' });
        } finally {
          setLoading(false);
        }
        }

        const synchronizeOfflineData = async () => {
            const db = await initializeIndexedDB();
            const tx = db.transaction('transactions', 'readonly');
            const store = tx.objectStore('transactions');
            const offlineTransactions = await store.getAll();
          
            // Loop through offline transactions and submit them to the backend
            for (const offlineTransaction of offlineTransactions) {
              const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(offlineTransaction.data),
                redirect: 'follow',
              };
          
              try {
                const response = await fetch("http://127.0.0.1:8000/api/processtransaction/", requestOptions);
                const result = await response.json();
          
                // Handle the result as needed
                console.log(result);
          
                // Remove the synchronized transaction from IndexedDB
                const deleteTx = db.transaction('transactions', 'readwrite');
                const deleteStore = deleteTx.objectStore('transactions');
                await deleteStore.delete(offlineTransaction.id);
              } catch (error) {
                console.error('Error submitting transaction:', error);
              }
            }
          };
          
    
        // Constructing the raw payload based on formData
        
      
    
      return (
        <div className="d-flex">
        
        <form className="form_container" onSubmit={handleSubmit}>
        <div className='text-teal-600 text-pretty font-bold text-2xl'>ADD TRANSACTION</div>
        <hr className='border-teal-600 h-2'></hr>
        <div className='divider'></div>
          <div className="input_container">
            <label className="input_label w-25 " htmlFor="date">
            Purchase Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="input_field w-75"
              id="date"
              required
              autoComplete='off'
            />
          </div>
          <div className="input_container">
              <label className="input_label" htmlFor="customFarmerName">
                Farmer Name
              </label>
                    <Dropdown
                        value={selectedFarmer}
                        onChange={(e) => setSelectedFarmer(e.value)}
                        options={Array.isArray(farmers) ? farmers : []}
                        optionLabel="farmer_name"
                        placeholder="Select a Farmer"
                        itemTemplate={farmerOptionTemplate}
                        className="border-1 w-9"
                        filter
                        required
                    />
                </div>
          {formData.farmerName === 'other' && (
            <div className="input_container">
              <label className="input_label" htmlFor="customFarmerName">
                Farmer Name
              </label>
              <input
                type="text"
                name="customFarmerName"
                value={formData.customFarmerName}
                onChange={handleInputChange}
                className="input_field"
                id="customFarmerName"
                autoComplete='off'
              />
            </div>
          )}

        <div className="input_container">
            <label className="input_label" htmlFor="customFarmerName">
                Occupation
            </label>
            <Dropdown value={selectedOccupation} onChange={(e) => setSelectedOccupation(e.value)} options={occupations} optionLabel="name" 
                placeholder="Select Occupation" className="border-1 w-9"/>
        </div>
        <div className="input_container radio-group">
            <label className="input_label">Has Card</label>
            <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center">
                <RadioButton
                    inputId="hasCardYes"
                    name="hasCard"
                    value="Yes"
                    onChange={handleInputChange}
                    checked={formData.hasCard === 'Yes'}
                />
                <label htmlFor="hasCardYes" className="ml-2">Yes</label>
                </div>
                <div className="flex align-items-center">
                <RadioButton
                    inputId="hasCardNo"
                    name="hasCard"
                    value="No"
                    onChange={handleInputChange}
                    checked={formData.hasCard === 'No'}
                />
                <label htmlFor="hasCardNo" className="ml-2">No</label>
                </div>
            </div>
            </div>


          <div className="input_container">
            <label className="input_label" htmlFor="pricePerKg">
              Cherry Kg
            </label>
            <input
              type="text"
              name="pricePerKg"
              value={formData.pricePerKg}
              onChange={handleInputChange}
              className="input_field"
              id="pricePerKg"
              autoComplete='off'
            />
          </div>
          <div className="input_container">
            <label className="input_label" htmlFor="transportPerKg">
              Transport Per Kg
            </label>
            <input
              type="text"
              name="transportPerKg"
              value={formData.transportPerKg}
              onChange={handleInputChange}
              className="input_field"
              id="transportPerKg"
              autoComplete='off'
            />
          </div>
          <div className="input_container">
            <label className="input_label" htmlFor="customFarmerName">
                Cherry Grade
            </label>
            <Dropdown name='cherryGrade' value={formData.cherryGrade} onChange={handleInputChange} options={grades} optionLabel="name" 
                placeholder="Select Grade" className="border-1 w-9" id="cherryGrade"/>
       
            </div>
           

          
          <div className="input_container">
            <label className="input_label" htmlFor="prebatch">
              Paper GRN No
            </label>
            <input
              type="text"
              name="prebatch"
              value={formData.prebatch}
              onChange={handleInputChange}
              className="input_field"
              id="prebapaperch"
              autoComplete='off'
            />
          </div>
          <div className="input_container">
          <label className="input_label" htmlFor="batchNumber">
            Batch Number
            </label>
            <input
            type="text"
            name="batchNumber"
            value={`${formData.lastTwoDigitsOfYear}${cwscode}${formData.formattedDay}${formData.formattedMonth}${formData.cherryGrade}`}
            onChange={handleInputChange}
            className="input_field"
            id="batchNumber"
            readOnly
            />
          </div>
          {/* <div className="input_container">
            <input
            type="text"
            name="batchNumber"
            value={`${formData.lastTwoDigitsOfYear}${cwscode}${formData.formattedDay}${formData.formattedMonth}${formData.cherryGrade}`}
            onChange={handleInputChange}
            className="input_field"
            id="batchNumber"
            hidden
            />
          </div> */}
          <button className='sign-in_btn mb-12'>Submit</button>
        </form>
        <Toast ref={toast} />
        </div>
        
      );
    
}

export default AddTransaction;