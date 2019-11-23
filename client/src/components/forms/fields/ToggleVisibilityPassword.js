import React from 'react';
import PropTypes from 'prop-types';
// material ui
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// end material ui

ToggleVisibilityPassword.propTypes = {
    onChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    setData: PropTypes.func.isRequired
    // error: PropTypes.string.isRequired,
};

// this function requires useState in the parent with password, showPassword keys.
export default function ToggleVisibilityPassword({ onChange, data, setData, error }) {
    // Toggle Password Visibility Handlers
    const handleClickShowPassword = () => {
        setData({ ...data, showPassword: !data.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    // Toggle Password Visibility Handlers

    return (
        <FormControl fullWidth required>
            <InputLabel htmlFor="adornment-password" className={{color: error ? 'red' : 'black'}}>Senha</InputLabel>
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
        </FormControl>
    );
}
