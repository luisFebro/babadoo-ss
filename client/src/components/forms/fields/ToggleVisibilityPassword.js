import React from 'react';
import PropTypes from 'prop-types';
import { useStoreDispatch } from 'easy-peasy';
import { Link } from 'react-router-dom';
import { closeModal } from '../../../redux/actions/modalActions';
// material ui
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
// end material ui

ToggleVisibilityPassword.propTypes = {
    onChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    setData: PropTypes.func.isRequired,
    showForgotPass: PropTypes.bool,
    error: PropTypes.bool
};

// this function requires useState in the parent with password, showPassword keys.
export default function ToggleVisibilityPassword({ onChange, data, setData, error, showForgotPass = true }) {
    const dispatch = useStoreDispatch();
    // Toggle Password Visibility Handlers
    const handleClickShowPassword = () => {
        setData({ ...data, showPassword: !data.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    // Render

    const showForgotPassLink = needDisplay => (
        needDisplay &&
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/cliente/trocar-senha">
                <Button
                    className="my-2"
                    onClick={() => closeModal(dispatch)}
                    size='small'
                >
                    Esqueceu sua senha?
                </Button>
            </Link>
        </div>
    );

    return (
        <FormControl fullWidth required>
            <InputLabel htmlFor="adornment-password" style={{color: error ? 'red' : 'black'}}>Senha</InputLabel>
            <Input
                id="adornment-password"
                label="Senha"
                type={data.showPassword ? 'text' : 'password'}
                name="password"
                error={error ? true : false}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {data.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            {showForgotPassLink(showForgotPass)}
        </FormControl>
    );
}
