import React from 'react'

import Modal from '../../components/UI/Modal/Modal'
import ReactAux from '../ReactAux'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {

    state = {
      error: null,
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(null, req => {
        this.setState({error: null})
        return req;
      })
      this.resInterceptor = axios.interceptors.response.use(res => res, err => {
        this.setState({error: err})
      })
    }

    componentWillUnmount(){
      console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    render () {
      return (
        <ReactAux>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}
            >
            {this.state.error && this.state.error.message}
          </Modal>
          < WrappedComponent {...this.props} />
        </ReactAux>
      )
    }
  }
}

export default withErrorHandler;
