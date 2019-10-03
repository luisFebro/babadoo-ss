import React from 'react';

import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// MENU COMPOSITION
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonList from '../../buttons/navbar-dropdown/ButtonList';
/*SOCIAL BUTTONS*/
import FacebookAuth from '../../buttons/navbar-dropdown/social-buttons/FacebookAuth';
import GoogleAuth from '../../buttons/navbar-dropdown/social-buttons/GoogleAuth';
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

    return (
        <div style={{ float: 'right' }}>
            {/*Icon login*/}
            <IconButton href="" className="no-outline" style={{ color: 'var(--mainWhite)' }} onClick={handleClick}>
                <i className="fas fa-user-friends"></i>
            </IconButton>
            {/*Icon login*/}

            <StyledMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <Link to="/cliente">
                    <StyledMenuItem
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <AccountCircleTwoToneIcon fontSize="large" classes={{ root: classes.root }} />
                        </ListItemIcon>
                        <ListItemText primary="Minha Conta" />
                    </StyledMenuItem>
                </Link>
                <StyledMenuItem
                    onClick={() => {handleClose();}}
                >
                    <ListItemIcon>
                        <LocalMallTwoToneIcon fontSize="large" classes={{ root: classes.root }} />
                    </ListItemIcon>
                    <ListItemText primary="Meus Pedidos" />
                </StyledMenuItem>
                <ButtonList />
                <GoogleAuth />
                <FacebookAuth />
            </StyledMenu>
        </div>
    );
}
