import React, { useState } from 'react';
import { TextField, Stack, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit } from '@mui/icons-material';

export default function EditCar(props) {
  const [open, setOpen]  = useState(false);
  const [car, setCar] = useState({
    id: 0,
    brand: '',
    model: '',
    color: '',
    year: '',
    price: ''
  });

  const handleOpen = () => {
    console.log('Car info -> ', props)
    setCar({
      id: props.data.row.id,
      brand: props.data.row.brand,
      model: props.data.row.model,
      color: props.data.row.color,
      year: props.data.row.year,
      price: props.data.row.price
    });
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value });
  }

  const handleSave = () => {
    props.updateCar(car);
    handleClose();
  }

  return (
    <div>
      <IconButton onClick={handleOpen}><Edit color="primary" /></IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={2}>
            <TextField autoFocus placeholder="Brand" variant="standard" name="brand" value={car.brand} onChange={handleChange} />
            <TextField placeholder="Model" variant="standard" name="model" value={car.model} onChange={handleChange} />
            <TextField placeholder="Color" variant="standard" name="color" value={car.color} onChange={handleChange} />
            <TextField placeholder="Year" variant="standard" name="year" value={car.year} onChange={handleChange} />
            <TextField placeholder="Price" variant="standard" name="price" value={car.price} onChange={handleChange} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}