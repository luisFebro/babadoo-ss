import React, { Component } from 'react';

export default class Default extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                        <h1 className="display-3">404</h1>
                        <h1>error</h1>
                        <h1>page not found</h1>
                        <h3>
                            The requested
                            <br /><span className="text-danger">URL{this.props.location.pathname}</span><br />
                            was not found.
                        </h3>
                    </div>
                </div>
            </div>
        );
    }
}
