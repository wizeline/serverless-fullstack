import React from 'react';
import {
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    alignItems: 'center',
    display: 'flex'
  },
  inner: {
    flex: '1'
  }
});

function App() {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        Hello
      </div>
    </Container>
  );
}

export default App;
