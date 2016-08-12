import React from 'react'

import AltDataDemoStore from '../stores/AltDataDemoStore'
import AltDataDemoActions from '../actions/AltDataDemoActions'

import { Modal, Button } from 'react-bootstrap'


class AltDataDemo extends React.Component {

    constructor(props){
        super(props)
        this.state = AltDataDemoStore.getState()
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        AltDataDemoStore.listen(this.onChange)
        AltDataDemoActions.getCarts()
    }

    componentWillUnmount(){
        AltDataDemoStore.unlisten(this.onChange)
    }

    onChange(state){
        this.setState(state)
    }

    handleDismissClick(cart){
        AltDataDemoActions.toggleModal(cart)
    }

    handleCloseClick(){
        AltDataDemoActions.toggleModal(null)
    }

    handleOKClick(dismissCart, dismissComment){
        AltDataDemoActions.dismissCart(dismissCart, dismissComment)
    }

    render() {
        let nodes = this.state.carts.map((cart, i) => {
            return (
                <tr key={cart.userID} className="">
                    <td>{cart.createdDate}</td>
                    <td>{cart.firstName} {cart.lastName}</td>
                    <td>{cart.email} ({cart.emailUses} use{cart.emailUses > 1 ? "s" : ""})</td>
                    <td><Button bsSize="xsmall" onClick={this.handleDismissClick.bind(this, cart)}>Dismiss</Button></td>
                </tr>
            )
        })

        let errors = ""
        if(this.state.error){
        errors = (
                <div className="alert alert-error">
                    <h4 className="alert-heading">Oops!</h4>
                    <p>{this.state.error}</p>
                </div>
            )
        }
        return (
            <div>

                <div className="header-section row-fluid">
                    <div className="span12">
                        <h1>Abandoned Carts</h1>
                    </div>
                </div>

                {errors}
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Created</th>
                            <th>Name</th>
                            <th>Email (# uses)</th>
                            <th>Action</th>
                        </tr>                    
                    </thead>
                    <tbody>
                        {nodes}
                    </tbody>
                </table>
                <DismisDialog 
                    dismissCart={this.state.dismissCart}
                    handleCloseClick={this.handleCloseClick}
                    handleOKClick={this.handleOKClick}
                    />
            </div>
        )
    }
}

class DismisDialog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            'dismissComment': ''
        }
        this.handleCommentChange = this.handleCommentChange.bind(this)
    }

    handleCommentChange(e){
        this.setState({'dismissComment': e.target.value})
    }

    render(){
        return (
            <Modal show={this.props.dismissCart != null} onHide={this.props.handleCloseClick}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to permanently remove {this.props.dismissCart != null ? this.props.dismissCart.email : ''} from this list?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p></p>
                <div className="control-group">
                    <p>Comment (optional):</p>
                    <div className="controls">
                        <textarea className="input-xxlarge" rows="8" value={this.state.dismissComment} onChange={this.handleCommentChange}></textarea>
                    </div>
                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="primary" onClick={this.props.handleOKClick.bind(this, this.props.dismissCart, this.state.dismissComment)}>OK</Button>
                <Button onClick={this.props.handleCloseClick}>Cancel</Button>
              </Modal.Footer>
            </Modal>
        )
    }
}


export default AltDataDemo
