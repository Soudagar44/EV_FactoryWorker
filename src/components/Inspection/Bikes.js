import React, { useState } from 'react'
import Newbikes from "./Newbikes";
import PageHeader from "./Others/PageHeader";
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import useTable from "./Others/useTable";
import Controls from './Others/controls/Controls'
import { Paper,makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import * as Bikeservice from "./Bikeservice";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "./Others/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "./Others/Notification";
import ConfirmDialog from "./Others/controls/ConfirmDialog";

const useStyle = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    { id: 'fullName', label: 'Model Name' },
    { id: 'email', label: 'Manager Name' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Bikes() {

    const classes = useStyle();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(Bikeservice.getAllEmployees())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.includes(target.value))
            }
        })
    }

    const addOrEdit = (employee, resetForm) => {
        if (employee.id == 0)
            Bikeservice.insertEmployee(employee)
        else
            Bikeservice.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(Bikeservice.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        Bikeservice.deleteEmployee(id);
        setRecords(Bikeservice.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    return (
        <>
            <PageHeader
                title="Vehicles' Inspection"
                subTitle="Manufacturing in factory"
                icon={<TwoWheelerIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                
                 <Toolbar>
                    <Controls.Input
                        label="Search Model"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                     <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>

            <TblContainer>
                 <TblHead/>   
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
           </Paper>
           <Popup  title="Manufacturing Info"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
            
                <Newbikes
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
           </Popup>
           <Notification
            notify={notify}
            setNotify={setNotify}
           />
           <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
