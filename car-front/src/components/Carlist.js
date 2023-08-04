import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import { Snackbar } from '@mui/material';
import AddCar from './AddCar';
import EditCar from './EditCar'

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function Carlist() {
  const columns = [
    {field: 'brand', headerName: 'brand', width: 200},
    {field: 'model', headerName: 'model', width: 200},
    {field: 'color', headerName: 'color', width: 200},
    {field: 'year', headerName: 'year', width: 150},
    {field: 'price', headerName: 'price', width: 150},
    {
      field: 'edit',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: row => <EditCar data={row} updateCar={updateCar} />
    },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      filterable: false,
      renderCell: row => <button onClick={() => onDelClick(row.id)} >Delete</button>
    }
  ];

  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  const onDelClick = (id) => {
    if(window.confirm("정말로 삭제 하시겠습니까?")) {
      fetch('http://localhost:5000/api/cars/' + id, {method: 'DELETE'})
        .then(response => {
          if(response.ok){
            fetchCars();
            setOpen(true);
          }
        })
        .catch(error => console.log(error));
    }
  }

  const fetchCars = () => {
    fetch('http://localhost:5000/api/cars')
      .then(response => response.json())
      .then((data) => setCars(data))
      .catch(error => console.error(error))
  }

  const addCar = (car) => {
    fetch('http://localhost:5000/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car)
    })
    .then(response => {
      if (response.ok) {
        fetchCars();
      }
    })
  }

  const updateCar = (car) => {
    fetch('http://localhost:5000/api/cars', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car)
    })
    .then(response => {
      if (response.ok) {
        fetchCars();
      }
    })
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      <AddCar addCar={addCar} />
      <div style={{ hegith: 500, width: '100%'}}>
        <DataGrid
          rows={cars}
          columns={columns}
          disableRowSelectionOnClick={true}
          disableColumnSelector={true}
          getRowId={ row => row.id }
          components={{ Toolbar: CustomToolbar }}
        >
        </DataGrid>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car delete"
        />
      </div>
    </>
  );
}