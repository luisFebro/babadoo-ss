import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

ButtonMulti.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    iconFontAwesome: PropTypes.string,
    variant: PropTypes.oneOf(['link', 'contained', 'outlined']),
    props: PropTypes.shape({
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        backColorOnHover: PropTypes.string,
        textTransform: PropTypes.oneOf(['uppercase', 'lowercase', 'capitalize']),
    }),
};

const useStyles = makeStyles({
    sText: {
        textShadow: '1px 1px 3px black',
        fontWeight: 'bold',
        textTransform: props => props.textTransform || 'uppercase',
    },
    sIcon: {
        marginLeft: '5px',
        fontSize: '1.9em'
    },
    sBtnColors: {
        color: props => props.color,
        backgroundColor: props => props.backgroundColor,
        '&:hover': {
            backgroundColor: props => props.backColorOnHover
        }
    }
});

const CustomizedButton = withStyles(theme => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(1),
        outline: 'none',
        boxShadow: false && '0 14px 34px rgba(0, 0, 0, 0.20), 0 10px 8px rgba(0, 0, 0, 0.12)' // soft shadow elevation
    }
}))(Button);

export default function ButtonMulti({ children, onClick, iconFontAwesome, variant="contained", ...props }) {
    const { sText, sBtnColors, sIcon } = useStyles(props);

    const showIcon = iconFontAwesome => (
        iconFontAwesome &&
        <i className={clsx(iconFontAwesome, sIcon)}></i>
    );

    return (
        <CustomizedButton
            className={sBtnColors}
            onClick={onClick}
            variant={(variant === 'link') ? null : variant}
            color="primary"
        >
            <span className={(variant !== ('outlined' || 'link')) ? sText : null}>{children}</span>
            {showIcon(iconFontAwesome)}
        </CustomizedButton>
    );
}
