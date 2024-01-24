import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { CSVLink } from 'react-csv';



export default function Transactions({customers}) {
    // const [customers, setCustomers] = useState(null);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [exportData, setExportData] = useState(null);

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
        { label: 'Paper GRN No', key: 'paper_grn_no' },
        { label: 'Batch No', key: 'batch_no' },
        
        
      ];

    const mapApiResponseToCustomers = (data) => {
        console.log(data)
        return data.map(item => {
            return {
                id: item.id,
                cws_name: item.cws_name,
                farmer_name: item.farmer_name,
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

   
    useEffect(() => {
        // generateReport(); // Initial fetch
        initFilters();
    },[]);

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
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                <span className="p-input-icon-left">
                    {/* <i className="pi pi-search" /> */}
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

   

    const header = renderHeader();

    return (
        <div className="card">
            <div className="flex justify-content-end m-3">
                {customers && (
                <CSVLink data={customers} headers={csvHeaders} filename="transactions.csv">
                    <Button type="button" icon="pi pi-file-excel" label="Download Excel" className="bg-teal-400 text-gray-100 p-3" onClick={exportCSV} />
                </CSVLink>
                )}
            </div>
            <DataTable value={customers} paginator showGridlines rows={10} loading={loading} dataKey="id"
                filters={filters} globalFilterFields={['cws_name', 'farmer_name', 'cherry_grade', 'price', 'paper_grn_no', 'transport', 'batch_no']} header={header}
                emptyMessage="No Transactions found.">
                
                <Column field="cws_name" sortable header="CWS Name" filter filterPlaceholder="Search by CWS Name" style={{ minWidth: '12rem' }} />
                <Column field="farmer_name" sortable header="Farmer Name" filter filterPlaceholder="Search by Farmer Name" style={{ minWidth: '12rem' }} />
                <Column field="purchase_date" sortable header="Purchase Date" style={{ minWidth: '10rem' }} />
                <Column field="has_card" header="Has Card" style={{ minWidth: '8rem' }} />
                <Column field="cherry_grade" sortable header="Cherry Grade" style={{ minWidth: '12rem' }} />
                <Column field="cherry_kg" header="Cherry Kg" style={{ minWidth: '10rem' }} />
                <Column field="price" header="Price" style={{ minWidth: '10rem' }} />
                <Column field="paper_grn_no" header="Paper GRN No" style={{ minWidth: '12rem' }} />
                <Column field="transport" header="Transport" style={{ minWidth: '10rem' }} />
                <Column field="batch_no" header="Batch Number" style={{ minWidth: '12rem' }} />
            </DataTable>
            {/* <CSVExporter target={exportData} fileName="transactions" /> */}
        </div>
    );
    
}