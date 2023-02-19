import React, {useState} from 'react';
import { DataGrid, GridColDef, GridSelectionModel, GridCellParams } from '@mui/x-data-grid'; // Add GridSelectionModel
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks'; 
import { Button,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@mui/material'; 
import { HeroForm } from '../../components'; 
// import { maxHeight } from '@mui/system';


interface gridData{
    data:{
      id?:string;
    }
  }

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'marvel_id',
    headerName: 'Marvel Id',
    width: 80,
    editable: true,
  },
  {
    field: 'img',
    headerName: 'IMG',
    width: 110,
    renderCell: (params: GridCellParams) => (
      <img src={params.value} alt={params.value} style={{ height: '100%' }} />
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 160,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 500,
    editable: true,
  },

];

export const DataTable =  () => {
  
  let { heroData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridSelectionModel>([])

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    serverCalls.delete(`${gridData[0]}`)
    getData()
  }
  console.log(gridData) 
  if(localStorage.getItem('myAuth') === 'true'){
    return (
    <div style={{ height: '450px' , width: '100%' }}>
        <h2>Hero list</h2>
        
      <DataGrid
        rows={heroData}
        columns={columns}
        pageSize={3}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) =>{setData(newSelectionModel)}}
        getRowHeight={() => 100}
        {...heroData}
      />
      <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <DialogContentText>Drone id: {gridData[0]}</DialogContentText>
              <HeroForm id={`${gridData[0]}`}/>
          </DialogContent>
          <DialogActions>
            <Button onClick = {handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color = "primary">Done</Button> 
          </DialogActions>
      </Dialog>
    </div>
  );
}else{
  return (
    <div>
      <h3>Please Sign In to view the heroes</h3>
    </div>
    )
  }
}