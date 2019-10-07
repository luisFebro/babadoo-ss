import React from 'react';
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { closeSuccessSnackbar } from '../../data/redux/actions/snackbarActions';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


// function SlideTransition(props) {
//   return <Slide {...props} direction="up" />;
// }
// const handleClick = Transition => () => {
//    setState({
//      open: true,
//      Transition,
//    });
//  };

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function SuccessSnackbar() {
    // Redux
    const { isSuccessSnackbarOpen, snackbarMsg } = useStoreState(state => ({
        isSuccessSnackbarOpen: state.snackbarReducer.cases.isSuccessSnackbarOpen,
        snackbarMsg: state.snackbarReducer.cases.snackbarMsg,
    }))
    const dispatch = useStoreDispatch();
    // End Redux

    const classes = useStyles();

  return (
       <Snackbar
         open={isSuccessSnackbarOpen}
         anchorOrigin={{
           vertical: 'top',
           horizontal: 'center',
         }}
         autoHideDuration={4000}
         onClose={() => closeSuccessSnackbar(dispatch)}
         ContentProps={{
           'aria-describedby': 'message-id',
         }}
         message={<span id="message-id" className="text-default" ><i style={{color: 'var(--mainWhite)', fontSize: '1.7rem', paddingRight: '8px'}} className="far fa-check-circle"></i>{snackbarMsg}</span>}
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
  );
}