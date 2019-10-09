import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { closeSnackbarBlack } from '../../redux/actions/snackbarActions';
// End Redux
import { makeStyles } from '@material-ui/core/styles';
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
    const { isBlackSnackbarOpen, snackbarMsg } = useStoreState(state => ({
        isBlackSnackbarOpen: state.snackbarReducer.cases.isBlackSnackbarOpen,
        snackbarMsg: state.snackbarReducer.cases.snackbarMsg,
    }))
    const dispatch = useStoreDispatch();
    // End Redux
    const classes = useStyles();

  return (
     <div>
       <Snackbar
         open={isBlackSnackbarOpen}
         anchorOrigin={{
           vertical: 'top',
           horizontal: 'center',
         }}
         autoHideDuration={4000}
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

SnackbarBlack.propTypes = {
    closeBlackSnackbar: PropTypes.func,
}