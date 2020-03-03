import React from 'react'

import ReactAux from '../../../hoc/ReactAux'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.css'

class Modal extends React.Component {

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render () {

    return(
      <ReactAux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'trabslateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
          >
          {this.props.children}
        </div>
      </ReactAux>
    )

  }

}

export default Modal;
