import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { closeSnackbarBlack } from '../../redux/actions/snackbarActions';
import { setSuccessOff } from '../../redux/actions/globalActions';
// End Redux
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function SnackbarBlack() {
    // Redux
    const { isBlackSnackbarOpen, snackbar } = useStoreState(state => ({
        isBlackSnackbarOpen: state.snackbarReducer.cases.isBlackSnackbarOpen,
        snackbar: state.snackbarReducer.cases,
    }))
    const dispatch = useStoreDispatch();
    const { snackbarMsg, snackbarTiming } = snackbar;
    // End Redux
    const classes = useStyles();
    useEffect(() => {
        if(!isBlackSnackbarOpen) {
            setSuccessOff(dispatch);
        }
    }, [isBlackSnackbarOpen])

  return (
     <div>
       <Snackbar
         style={{zIndex: 1501}}
         open={isBlackSnackbarOpen}
         anchorOrigin={{
           vertical: 'top',
           horizontal: 'center',
         }}
         autoHideDuration={ snackbarTiming || 3000}
         onClose={() => closeSnackbarBlack(dispatch)}
         ContentProps={{
           'aria-describedby': 'message-id',
         }}
         message={<span
                    id="message-id"
                    className="text-default"
                  >
                  <i
                    style={{color: 'var(--mainWhite)', fontSize: '1.7rem', paddingRight: '8px'}}
                    className="far fa-check-circle"
                  >
                  </i>
                  {snackbarMsg}
                  </span>}
         action={[
           <IconButton
             key="close"
             aria-label="close"
             color="inherit"
             className={classes.close}
             onClick={() => closeSnackbarBlack(dispatch)}
           >
             <CloseIcon />
           </IconButton>,
         ]}
       />
     </div>
  );
}
