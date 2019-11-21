import React from 'react';
// Moment
import moment from 'moment';
import 'moment/locale/pt-br';
// End Moment
import uuidv1 from 'uuid/v1';
import ButtonYellow from '../../../../buttons/material-ui/ButtonYellow';
// Redux
import {useStoreState, useStoreDispatch} from 'easy-peasy';
import {Link} from 'react-router-dom';
import {findAnItem} from '../../../../../redux/actions/globalActions';
import {showModalTextField} from '../../../../../redux/actions/modalActions';
import MessagesList from './MessagesList';
// End Redux
// MATERIAL UI
// menu composition
import {withStyles} from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// badges
import Badge from '@material-ui/core/Badge';
// icons
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
// END MATERIAL UI

moment.updateLocale('pt-BR');

const StyledMenu = withStyles({
    paper: {
        width: '60%',
        padding: '0 5px',
        border: '2px solid var(--mainYellow)'
    }
})(props => (
    <Menu
        elevation={1}
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
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white
            }
        }
    }
}))(MenuItem);
const BorderedBadge = withStyles(theme => ({
    badge: {
        right: -3, //14
        top: 1, //18
        border: `2px solid var(--mainDark)`,
        // padding: '0 4px',
        backgroundColor: 'var(--mainRed)'
    }
}))(Badge);

const SendMsgToStoreBtn = (dispatch, allUsers, _idUser, userName) => {
    // Lesson: Never declare hooks here because hooks are meant to be at the top of every function.
    // Instead, pass all required props from the parent component which onws the hooks already.
    // https://reactjs.org/docs/error-decoder.html/?invariant=300
    return (
        <ButtonYellow
            text="Enviar Mensagem para Loja"
            className="mt-3 shadow-elevation badge badge-warning"
            onClick={() => {
                // change name form 'admin'to Loja Babadoo (this is how gonna be displayed to the user)
                if (userName === 'admin') userName = 'Loja Babadoo';
                const objToSend = {
                    name: 'Loja Babadoo', //this will replace the curr user name
                    propTitle: 'Envio de Mensagem Instantânea',
                    propTxtBtn: 'Enviar',
                    propSubTitle: 'Escreva abaixo sua mensagem para loja',
                    mainSubject: 'Mensagem',
                    mainKey: 'message',
                    objToSend: {
                        messageList: {
                            sender: `${userName}`,
                            id: uuidv1(),
                            time: moment(Date.now()).fromNow(), // n1 - change Date.now with createdAt from DB
                            message: '', // this will be the message catch by modal text field
                            isMessageChecked: false,
                            systemDate: Date.now,
                            history: {
                                senderMsgs: [],
                                recipientMsgs: []
                            }
                        }
                    }
                };
                findAnItem(dispatch, allUsers, _idUser, objToSend);
                showModalTextField(dispatch);
            }}
        ></ButtonYellow>
    );
};

export default function NotifDropDown() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    // Redux
    //> Set State
    let {allMessagesList, allUsers, _idUser, userName} = useStoreState(state => ({
        allUsers: state.userReducer.cases.allUsers,
        allMessagesList: state.userReducer.cases.allMessagesList,
        _idUser: state.userReducer.cases.currentUser._id,
        userName: state.userReducer.cases.currentUser.name
    }));
    //> Dispatch Actions to Reducer
    const dispatch = useStoreDispatch();
    // End Redux

    return (
        <div>
            {/*Notification Button*/}
            <IconButton href="" className="no-outline" style={{color: 'var(--mainWhite)'}} onClick={handleClick}>
                <BorderedBadge className="animated bounce slow" badgeContent={allMessagesList.length}>
                    <NotificationsIcon className="icon-svg" />
                </BorderedBadge>
            </IconButton>
            <StyledMenu id="customized-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {allMessagesList.length === 0 ? (
                    <section>
                        <div className="pb-3 text-center text-sub-container">Sem notificações</div>
                        <div>
                            {userName !== 'admin' ? SendMsgToStoreBtn(dispatch, allUsers, _idUser, userName) : null}
                        </div>
                    </section>
                ) : (
                    <section>
                        <div>
                            <h2 className="text-center text-sub-container pb-3">Suas Notificações</h2>
                            <p className="text-sub-container">Total: {allMessagesList.length}</p>
                            <MessagesList data={allMessagesList} />
                        </div>
                        <div>
                            {userName !== 'admin' ? SendMsgToStoreBtn(dispatch, allUsers, _idUser, userName) : null}
                        </div>
                    </section>
                )}
            </StyledMenu>
        </div>
    );
}

/* COMMENTS
n1: completed prior version of pt date: moment(Date.now()).format('Do MMM [às] h:mm a, YYYY[.]');
*/