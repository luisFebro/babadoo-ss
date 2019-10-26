import React from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { Link } from 'react-router-dom';
import { findAnItem } from '../../../../../redux/actions/globalActions';
import { showModalTextField } from '../../../../../redux/actions/modalActions';
// End Redux
// MENU COMPOSITION
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MessagesList from './MessagesList';
// END MENU COMPOSITION

// ICONS
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

export default function NotifDropDown() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const classes = useStyles();
    // Redux
    //> Set State
    let { allMessagesList, updatedUsers, _idUser, userName } = useStoreState(state => ({
        updatedUsers: state.userReducer.cases.updatedUsers,
        allMessagesList: state.userReducer.cases.allMessagesList,
        _idUser: state.userReducer.cases.currentUpdatedUser._id,
        userName: state.userReducer.cases.currentUpdatedUser.name,
    }));
    //> Dispatch Actions to Reducer
    const dispatch = useStoreDispatch();
    // End Redux

    const notificationButton = () => {
        return (
            <button
                className="shadow-elevation badge badge-warning"
                onClick={() => {
                    if(userName === "admin") userName = "Loja Babadoo";
                    const attachedObj = {
                        name: "Loja Babadoo", //this will replace the curr user name
                        propTitle: "Envio de Mensagem Instantânea",
                        propTxtBtn: "Enviar",
                        propSubTitle: "Escreva abaixo sua mensagem para loja",
                        mainSubject: "Mensagem",
                        mainKey: "message",
                        objToSend: {
                            messageList: {
                                sender: `${userName}`,
                                id: "123-dadsalkdas",
                                time: "12:45",
                                message: "", // this will be the message catch by modal text field
                            }
                        }
                    }
                    findAnItem(dispatch, updatedUsers, _idUser, attachedObj);
                    showModalTextField(dispatch);
                }}
            >Enviar Mensagem para Loja</button>
        );
    }
    return (
        <div style={{ float: 'right' }}>
            {/*Notification Button*/}
            <IconButton href="" className="no-outline" style={{ color: 'var(--mainWhite)' }} onClick={handleClick}>
                <i className="fas fa-bell animated bounce slow"></i>
            </IconButton>

            <StyledMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <h1
                    className="text-center text-main-container"
                >
                    <p>Suas Notificações</p>
                </h1>
                {allMessagesList.length === 0 ? (
                    <section>
                        <div
                            className="text-center text-sub-container">
                            Sem notificações
                        </div>
                        {userName !== 'admin' ? (
                            <div className="mt-3">
                                {notificationButton()}
                            </div>
                        ) : null }
                    </section>
                ) : (
                    <section>
                        <MessagesList data={allMessagesList} />
                        {userName !== 'admin' ? (
                            <div className="mt-3">
                                {notificationButton()}
                            </div>
                        ) : null }
                    </section>
                )}
            </StyledMenu>
        </div>
    );
}

