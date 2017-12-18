
import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom'


class ContainedModal extends Component {
  state = {
    show: true
  }

  componentWillMount() {
    if (this.props.displayModal) this.setState({show: this.props.displayModal})
    else this.setState({show: false})
  }

  sendToAddressPage() {
    this.props.history.push({
     pathname: '/addresses',
     query: {
       fromPath: '/',
       fromName: 'To dashboard'
     },
     state: { show: true }
    })

  }


  close() {
    this.setState({ show: false });
  }

  open() {
    this.setState({ show: true })
  }

  render() {
    console.log('statshow', this.state.show)
    if (!this.state.show) { return <div></div> }
    return (
      <div className="modal-container tip">

        <Modal
          show={this.state.show}
          onHide={() => this.close() }
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              {this.props.modalHeader}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.modalBody}
          </Modal.Body>
          <Modal.Footer>
            {this.props.sendToAddress ? <Button className="bttn pull-right" onClick={() => this.sendToAddressPage()}>Address Editor</Button> : <Button className="bttn pull-right" onClick={() => this.close() }>Ok got it!</Button> }
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default ContainedModal
