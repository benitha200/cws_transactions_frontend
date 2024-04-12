import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { CSVLink } from 'react-csv';
import { Tag } from 'primereact/tag';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';

export default function Transactions({ customers, dailytotal }) {
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exportData, setExportData] = useState(null);
  const [grades] = useState(['CA', 'CB', 'NA', 'NB']);

  const exportCSV = () => {
    setExportData(customers);
  };

  const csvHeaders = [
    { label: 'CWS Name', key: 'cws_name' },
    { label: 'Farmer Name', key: 'farmer_name' },
    { label: 'Farmer Code', key: 'farmer_code' },
    { label: 'Purchase Date', key: 'purchase_date' },
    { label: 'Has Card', key: 'has_card' },
    { label: 'Cherry Grade', key: 'cherry_grade' },
    { label: 'Cherry Kg', key: 'cherry_kg' },
    { label: 'Price', key: 'price' },
    { label: 'Transport', key: 'transport' },
    { label: 'GRN No', key: 'grn_no' },
    { label: 'Batch No', key: 'batch_no' },
  ];

  const getSeverity = (value) => {
    switch (value) {
      case 'CA':
        return 'success';

      case 'CB':
        return 'success';

      case 'NA':
      case 'NB':
        return 'primary';

      default:
        return null;
    }
  };

  const mapApiResponseToCustomers = (data) => {
    console.log(data);
    return data.map((item) => {
      return {
        id: item.id,
        cws_name: item.cws_name,
        farmer_name: item.farmer_name,
        purchase_date: item.purchase_date,
        cherry_kg: parseFloat(item.cherry_kg),
        has_card: item.has_card === 1,
        cherry_grade: item.cherry_grade,
        price: parseFloat(item.price),
        grn_no: item.grn_no,
        transport: parseFloat(item.transport),
        batch_no: item.batch_no,
        // created_at: new Date(item.created_at),
      };
    });
  };

  // const onRowEditComplete = (e) => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
    
  //   var raw = JSON.stringify({
  //     "pk": 168,
  //     "cws_name": "GASEKE CWS",
  //     "cws_code": "GAS",
  //     "purchase_date": "2024-02-09",
  //     "farmer_code": "RW-GAS-0061",
  //     "farmer_name": "FELIX NTIBAZIYAREMYE",
  //     "season": 2024,
  //     "cherry_kg": 20.5,
  //     "has_card": 1,
  //     "cherry_grade": "CA",
  //     "price": 15.75,
  //     "paper_grn_no": "GRN123",
  //     "transport": 5.25,
  //     "batch_no": "24GAS0209CA",
  //     "occupation": "Site Collector",
  //     "synced": 1,
  //     "id_no": 123,
  //     "created_at": "2024-02-09"
  //   });
    
  //   var requestOptions = {
  //     method: 'PUT',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };
    
  //   fetch("http://127.0.0.1:8000/api/edittransaction/168/", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // };

  const onRowEditComplete = (e) => {
    const editedRow = e.newData; // Extract the edited row data

    console.log("onRowEditComplete called", e);
    console.log("edited",editedRow);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Create the payload using the edited row data
    const raw = JSON.stringify({
        pk: editedRow.id,
        cws_name: editedRow.cws_name,
        cws_code: editedRow.cws_code,
        purchase_date: editedRow.purchase_date,
        farmer_code: editedRow.farmer_code,
        farmer_name: editedRow.farmer_name,
        season: editedRow.season,
        cherry_kg: editedRow.cherry_kg,
        has_card: editedRow.has_card,
        cherry_grade: editedRow.cherry_grade,
        price: editedRow.price,
        grn_no: editedRow.grn_no,
        transport: editedRow.transport,
        batch_no: editedRow.batch_no,
        occupation: editedRow.occupation,
        synced: editedRow.synced,
        id_no: editedRow.id_no,
        created_at: editedRow.created_at,
    });

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`http://127.0.0.1:8000/api/edittransaction/${editedRow.id}/`, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          
        })
        .catch(error => console.log('error', error));

    location.reload(true);
};


  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const GradeEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={grades}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Grade"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };

  const allowEdit = (rowData) => {
    // Adjust the condition based on your requirement
    return rowData.name !== 'Blue Band';
  };

  useEffect(() => {
    initFilters();
  }, []);

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      'country.name': {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue('');
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
        <span className="p-input-icon-left">
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <div className="flex justify-content-end m-2">
        {/* <div className="flex flex-column">
             <span className='text-black-600 text-sl font-bold'>Total Purchase:<span className='text-sl text-teal-600 font-bold p-2'>{dailytotal} RWF</span></span>
             <span className='text-black-600 text-sl font-bold'>Total Cherry A :<span className='text-sl text-teal-600 font-bold p-2'>{dailytotal} Kg</span></span>
             <span className='text-black-600 text-sl font-bold'>Total Cherry B :<span className='text-sl text-teal-600 font-bold p-2'>{dailytotal} Kg</span></span>
            </div>  */}
        {customers && (
          <CSVLink
            data={customers}
            headers={csvHeaders}
            filename="transactions.csv"
          >
            <Button
              type="button"
              icon="pi pi-file-excel"
              label="Download Excel"
              className="bg-teal-400 text-gray-100 p-3"
              onClick={exportCSV}
            />
          </CSVLink>
          
        )}
        
      </div>
      <DataTable
        value={customers}
        editMode="row"
        onRowEditComplete={onRowEditComplete}
        paginator
        showGridlines
        rows={10}
        loading={loading}
        dataKey="id"
        filters={filters}
        globalFilterFields={[
          'cws_name',
          'farmer_name',
          'cherry_grade',
          'price',
          'grn_no',
          'transport',
          'batch_no',
        ]}
        header={header}
        tableStyle={{ minWidth: '30rem',maxWidth:'30rem' }}
        emptyMessage="No Transactions found."
      >
        <Column
          field="id"
          sortable
          header="Transaction Id"
          filter
          filterPlaceholder="transaction Id"
          style={{ minWidth: '2rem', maxWidth: '10rem' }}
        />
        <Column
          field="cws_name"
          sortable
          header="CWS Name"
          filter
          filterPlaceholder="Search by CWS Name"
          style={{ minWidth: '10rem', maxWidth: '12rem' }}
        />
        <Column
          field="cws_code"
          sortable
          header="CWS Code"
          filter
          filterPlaceholder="Search by CWS Name"
          style={{ minWidth: '10rem', maxWidth: '12rem' }}
        />

        <Column
          field="farmer_name"
          sortable
          header="Farmer Name"
          filter
          filterPlaceholder="Search by Farmer Name"
          style={{ minWidth: '14rem', maxWidth: '18rem'}}
        />
         <Column
          field="plot_name"
          sortable
          header="Plot Name"
          filter
          filterPlaceholder="Search by Plot Name"
          style={{ minWidth: '14rem', maxWidth: '18rem'}}
        />
        <Column
          field="purchase_date"
          sortable
          header="Purchase Date"
          style={{ minWidth: '10rem', maxWidth: '12rem' }}
        />
        <Column
          field="has_card"
          header="Has Card"
          style={{ minWidth: '8rem', maxWidth: '8rem'}}
          body={(rowData) => rowData.has_card === 1 ? 'Yes' : 'No'}
        />
        <Column
          field="cherry_grade"
          sortable
          header="Cherry Grade"
          style={{ minWidth: '9rem', maxWidth: '10rem' }}
          filterPlaceholder="Search by cherry grade"
          filter
        //   editor={(options) => textEditor(options)}
          // editor={(options) => GradeEditor(options)}
        />
        <Column
          field="cherry_kg"
          header="Cherry Kg"
          style={{ minWidth: '5rem', maxWidth: '8rem' }}
          editor={(options) => textEditor(options)}
        />
        <Column
          field="price"
          header="Price"
          style={{ minWidth: '5rem', maxWidth: '8rem' }}
          
        />
        <Column
          field="total"
          header="Total (RWF)"
          style={{ minWidth: '5rem', maxWidth: '8rem' }}
          
        />
        <Column
          field="grn_no"
          header="Transaction No"
          style={{ minWidth: '8rem', maxWidth: '10rem'}}
        />
        <Column
          field="transport"
          header="Transport"
          style={{ minWidth: '5rem', maxWidth: '10rem' }}
          editor={(options) => textEditor(options)}
        />
        <Column
          field="batch_no"
          header="Batch Number"
          style={{ minWidth: '8rem', maxWidth: '10rem' }}
        />
        <Column
          rowEditor
          headerStyle={{ width: '10%', minWidth: '5rem', maxWidth: '7rem' }}
          bodyStyle={{ textAlign: 'center' }}
        ></Column>
      </DataTable>
    </div>
  );
}
