import React from 'react';

export default class Mashine extends React.Component {
    render() {
        return(
            <div>
                <div className="row">
                        <input type="search" className="form-control searching"/>
                </div>
                <table className="table users">
                        <thead>
                            <tr>
                                <th>Машина</th>
                                <th>Цех</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
            </div>
        )
    }
}