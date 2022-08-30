import React from "react";

import { styled } from "@mui/material/styles";
import {
  Button,
  Dialog,
  Typography,
  DialogContent,
  DialogActions,
} from "@mui/material";

import "./style.scss";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DeleteDish = ({ indexDish, openDeleteWindow, removeDish }) => (
  <BootstrapDialog
    className="delete-wrapper"
    aria-labelledby="customized-dialog-title"
    open={indexDish > -1}
  >
    <Typography id="customized-dialog-title">Delete dish</Typography>
    <DialogContent dividers>
      <Typography className="delete-question" gutterBottom>
        Do you really want to delete the dish?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => openDeleteWindow(-1)} className="button">
        Сancel
      </Button>
      <Button autoFocus onClick={() => removeDish()} className="button">
        Delete
      </Button>
    </DialogActions>
  </BootstrapDialog>
);
export default DeleteDish;
