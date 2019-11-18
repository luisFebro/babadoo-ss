import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { closeSnackbarBlack } from '../../redux/actions/snackbarActions';
import { setSuccessOff } from '../../redux/actions/globalActions';
// End Redux
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
    snackbar: {
        [theme.breakpoints.down('md')]: {
            // n2
            left: 190
        },
        [theme.breakpoints.down('xs')]: {
            // n2
            bottom: 85
        }
    },
    close: {
        padding: theme.spacing(0.5)
    },
    //icons colors
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.main
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    }
    //
}));

// const variantIcon = {
//   success: CheckCircleIcon,
//   warning: WarningIcon,
//   error: ErrorIcon,
//   info: InfoIcon,
// };

export default function SnackbarBlack() {
    // Redux
    const { isBlackSnackbarOpen, snackbar } = useStoreState(state => ({
        isBlackSnackbarOpen: state.snackbarReducer.cases.isBlackSnackbarOpen,
        snackbar: state.snackbarReducer.cases
    }));
    const dispatch = useStoreDispatch();
    const { snackbarMsg, snackbarTiming } = snackbar;
    // End Redux
    const classes = useStyles();

    return (
        <Snackbar
            className={clsx(classes.snackbar)}
            disableWindowBlurListener={true} //n1
            TransitionComponent={Slide}
            transitionDuration={{ enter: 300, exit: 300 }}
            style={{ zIndex: 1501 }}
            open={isBlackSnackbarOpen}
            autoHideDuration={snackbarTiming}
            resumeHideDuration={500} // n3
            onClose={() => closeSnackbarBlack(dispatch)}
            ContentProps={{
                'aria-describedby': 'message-id'
            }}
            message={
                <span id="message-id" className="text-default">
                    <i
                        style={{ color: 'var(--mainWhite)', fontSize: '1.7rem', paddingRight: '8px' }}
                        className="far fa-check-circle"
                    ></i>
                    {snackbarMsg}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={() => closeSnackbarBlack(dispatch)}
                >
                    <CloseIcon />
                </IconButton>
            ]}
        />
    );
}

/* COMMENTS
n1: If true, the autoHideDuration timer will expire even if the window is not focused.
n2: applied to mobile only
n3: The number of milliseconds to wait before dismissing after user interaction
*/
