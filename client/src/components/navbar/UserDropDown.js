import React from "react";


import { withStyles, makeStyles } from "@material-ui/core/styles";
import history from "../../history";
// MENU COMPOSITION
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ButtonList from "../buttons/navbar-dropdown/ButtonList";
// END MENU COMPOSITION

// ICONS
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';
import IconButton from "@material-ui/core/IconButton";
// END ICONS


const useStyles = makeStyles({
  root: {
    color: 'var(--mainYellow)'
  },
});

const StyledMenu = withStyles({
    paper: {
        border: "2px solid var(--mainYellow)"
    }
})(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
      }}
      transformOrigin={{
          vertical: "top",
          horizontal: "center",
      }}
      {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        "&:focus": {
            backgroundColor: "var(--primary-red)",
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
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
      <div style={{ float: "right" }}>
          {/*Three dots points*/}
          <IconButton
              href=""
              className="no-outline"
              style={{color: "var(--mainWhite)"}}
              onClick={handleClick}
          >
              <i className="fas fa-user-friends"></i>
          </IconButton>
          {/*End Three dots points*/}

          <StyledMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
          >

              <StyledMenuItem
                    onClick={() => {
                        history.push("/cliente")
                        handleClose()
                    }}
                >
                  <ListItemIcon>
                      <AccountCircleTwoToneIcon fontSize="large" classes={{ root: classes.root }} />
                  </ListItemIcon>
                  <ListItemText primary="Minha Conta" />
              </StyledMenuItem>
              <StyledMenuItem
                    onClick={() => {
                        history.push("/cliente")
                        handleClose()
                    }}
                >
                  <ListItemIcon>
                      <LocalMallTwoToneIcon fontSize="large" classes={{ root: classes.root }} />
                  </ListItemIcon>
                  <ListItemText primary="Meus Pedidos" />
              </StyledMenuItem>
              <ButtonList />
          </StyledMenu>
      </div>
  );
}