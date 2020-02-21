import React from 'react'

import ReactAux from '../../../hoc/ReactAux'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.css'

const modal = (props) => (
  <ReactAux>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'trabslateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
      >
      {props.children}
    </div>
  </ReactAux>
);

export default modal;
