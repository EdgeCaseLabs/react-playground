import React from 'react';

class TestPage extends React.Component {
    render(){
        return (
            <div>

                <h1>Alert Boxes</h1>
                <div className="alert alert-success" role="alert">
                  <strong>Well done!</strong> You successfully read this important alert message.
                </div>

                <h1>Font Awesome</h1>
                <i className="fa fa-camera-retro fa-lg"></i> fa-lg
                <i className="fa fa-camera-retro fa-5x"></i> fa-5x
            </div>
        )
    }
}


export default TestPage;