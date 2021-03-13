import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

function DialogBox(props) {
  let open = props.open;

  let content = props.content;
  let onConfirm = props.onConfirm;
  let onCancel = props.onCancel;

  let handleCancel = () => {
    onCancel();
  };

  let handleConfirm = () => {
    onConfirm();
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent>{content}</DialogContent>

        <DialogActions>
          <Button onClick={handleConfirm}>Ok</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogBox;
