import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

ButtonYellow.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

const useStyles = makeStyles({
    text: {
    textShadow: '1px 1px 3px black',
  }
})

const ColorButton = withStyles(theme => ({
  root: {
    fontWeight: 'bold',
    outline: 'none',
    textTransform: 'capitalize',
    color: 'var(--mainWhite)',
    backgroundColor: 'var(--mainYellow)',
    '&:hover': {
      backgroundColor: 'var(--mainYellow)',
    },
  },
}))(Button);

export default function ButtonYellow({ text, onClick }) {
    const classes = useStyles();
    return (
        <ColorButton onClick={onClick} variant="contained" color="primary">
            <span className={classes.text}>{ text }</span>
        </ColorButton>
    );
}