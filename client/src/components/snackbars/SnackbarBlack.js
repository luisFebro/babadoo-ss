import React from 'react';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { closeSuccessSnackbar } from '../../data/redux/actions/snackbarActions';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function SnackbarBlack() {
    // Redux
    const { isSnackbarOpen, snackbarMsg } = useStoreState(state => ({
        isSnackbarOpen: state.snackbarReducer.cases.isSnackbarOpen,
        snackbarMsg: state.snackbarReducer.cases.snackbarMsg,
    }))
    const dispatch = useStoreDispatch();
    // End Redux
    const classes = useStyles();

  return (
     <div>
       <Snackbar
         open={isSnackbarOpen}
         anchorOrigin={{
           vertical: 'top',
           horizontal: 'center',
         }}
         autoHideDuration={4000}
         onClose={() => closeSuccessSnackbar(dispatch)}
         ContentProps={{
           'aria-describedby': 'message-id',
         }}
         message={<span id="message-id">{snackbarMsg}</span>}
         action={[
           <IconButton
             key="close"
             aria-label="close"
             color="inherit"
             className={classes.close}
             onClick={() => closeSuccessSnackbar(dispatch)}
           >
             <CloseIcon />
           </IconButton>,
         ]}
       />
     </div>
  );
}