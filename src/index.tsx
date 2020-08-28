import React from 'react';
import ReactDOM from 'react-dom';
import { Controller } from './components'
import './styles.scss';

ReactDOM.render(
  <>
    {process.env.REACT_APP_OMBD_KEY}
    <Controller />
  </>,
  document.getElementById('root')
);