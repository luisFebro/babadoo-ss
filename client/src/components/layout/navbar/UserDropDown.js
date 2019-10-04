import React, { Fragment } from 'react';

import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// MENU COMPOSITION
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
/*SOCIAL BUTTONS*/
import EmailAuth from '../../buttons/navbar-dropdown/EmailAuth';
import GoogleAuth from '../../buttons/navbar-dropdown/social-buttons/GoogleAuth';
import FacebookAuth from '../../buttons/navbar-dropdown/social-buttons/FacebookAuth';
import InstagramAuth from '../../buttons/navbar-dropdown/social-buttons/InstagramAuth';
/*END SOCIAL BUTTONS*/
// END MENU COMPOSITION

// ICONS
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';
import IconButton from '@material-ui/core/IconButton';
// END ICONS

const useStyles = makeStyles({
    root: {
        color: 'var(--mainYellow)'
    }
});

const StyledMenu = withStyles({
    paper: {
        padding: "0 5px",
        border: '2px solid var(--mainYellow)'
    }
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        padding: 0,
        width: '100%',
        margin: 'auto',
        '&:focus': {
            backgroundColor: 'var(--primary-red)',
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white
            }
        }
    }
}))(MenuItem);

export default function UserDropDown() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const classes = useStyles();
    const isLoggedIn = useStoreState(state => state.dataLogin.isLoggedIn);
    console.log("isLoggedIn", isLoggedIn);

    return (
        <Fragment style={{ float: 'right' }}>
            {/*Icon login*/}
            <IconButton href="" className="no-outline" style={{ color: 'var(--mainWhite)' }} onClick={handleClick}>
                <i className="fas fa-user-friends"></i>
            </IconButton>
            {/*Icon login*/}

            {isLoggedIn ?
                <StyledMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <h1 className="text-center text-main-container">Seja Bem-Vindo(a)!</h1>
                     <StyledMenuItem
                         onClick={handleClose}
                     >
                         <ListItemIcon>
                             <AccountCircleTwoToneIcon fontSize="large" classes={{ root: classes.root }} />
                         </ListItemIcon>
                         <ListItemText primary="Minha Conta" />
                     </StyledMenuItem>
                     <StyledMenuItem
                         onClick={handleClose}
                     >
                         <ListItemIcon>
                             <LocalMallTwoToneIcon fontSize="large" classes={{ root: classes.root }} />
                         </ListItemIcon>
                         <ListItemText primary="Meus Pedidos" />
                     </StyledMenuItem>
                 </StyledMenu> :

                <StyledMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <h1 className="text-center text-main-container">Conectar a Loja</h1>
                    <h2 className="text-center text-sub-container">Entre ou registre sua conta<br /> em um só lugar!<br />Selecione uma Opção:</h2>
                    <StyledMenuItem
                        onClick={handleClose}
                    >
                        <EmailAuth />
                    </StyledMenuItem>
                    <StyledMenuItem
                        onClick={handleClose}
                    >
                        <GoogleAuth />
                    </StyledMenuItem>
                    <StyledMenuItem
                        onClick={handleClose}
                    >
                        <FacebookAuth onClick={handleClose} />
                    </StyledMenuItem>
                    <StyledMenuItem
                        onClick={handleClose}
                    >
                        <InstagramAuth onClick={handleClose} />
                    </StyledMenuItem>
                </StyledMenu>
            }
        </Fragment>
    );
}

