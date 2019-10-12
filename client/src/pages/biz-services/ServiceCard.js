import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 100,
    width: 140,
  },
  text: {
    textAlign: "center",
    fontSize: "1.1em",
    fontWeight: "bold",

  }
}));

export default function ServiceCard({ data }) {
    const classes = useStyles();
    return (
          <DivWrapper class="col-4 col-md-4">
            <Paper className={classes.paper}>
              <Typography component="p" className={classes.text}>
                  {data.title}
              </Typography>
            </Paper>
            <section className="icon-container">
                <div>
                    <img src={data.icon}></img>
                </div>
            </section>
          </DivWrapper>
    );
}

const DivWrapper = styled.div`
    .icon-container > div {
        background: black;
    }
    .icon-container > div img {
        width: 50px,
        height: 50px,
    }
`;