import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from '@mui/x-data-grid';
import { IconButton, Snackbar } from '@mui/material';
import { Delete } from '@mui/icons-material';

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
    {field: 'year', headerName: 'year', width: 80},
    {field: 'price', headerName: 'price', width: 100},
    {
      field: 'edit',
      headerName: '',
      width: 30,
      sortable: false,
      filterable: false,
      renderCell: row => <EditCar data={row} updateCar={updateCar} />
    },
    {
      field: 'delete',
      headerName: '',
      width: 30,
      sortable: false,
      filterable: false,
      renderCell: row => <IconButton onClick={() => onDelClick(row.id)} ><Delete color="error" /></IconButton>
    }
  ];

  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  const getHeaders = () => {
    const token = sessionStorage.getItem("jwt");
    return {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  };

  const fetchCars = () => {
    fetch('/api/cars', {
      headers: getHeaders()
    })
      .then(response => response.json())
      .then((data) => setCars(data))
      .catch(error => console.error(error))
  }

  const addCar = (car) => {
    fetch('/api/cars', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(car)
    })
    .then(response => {
      if (response.ok) {
        fetchCars();
      }
    })
  }

  const updateCar = (car) => {
    fetch('/api/cars', {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(car)
    })
    .then(response => {
      if (response.ok) {
        fetchCars();
      }
    })
  }

  const onDelClick = (id) => {
    if(window.confirm("정말로 삭제 하시겠습니까?")) {
      fetch(`/api/cars/${id}`, {method: 'DELETE', headers: getHeaders() })
        .then(response => {
          if(response.ok){
            fetchCars();
            setOpen(true);
          }
        })
        .catch(error => console.log(error));
    }
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