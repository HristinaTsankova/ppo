import React from 'react';

import { Droppable } from 'react-drag-and-drop';


export default class MachineTable extends React.Component {
    render() {
        return(
           
            <Droppable 
                type={['plan']}
                onDrop={this.onDrop}>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td className="floor_plan2"></td>
                            <td className="floor_plan2"></td>
                        </tr>
                        <tr>
                           <td className="floor_plan"></td>
                           <td className="floor_plan"></td> 
                           <td className="floor_plan"></td> 
                           <td className="floor_plan"></td>     
                           <td className="floor_plan"></td>   
                           <td className="floor_plan"></td>       
                        </tr>
                    </tbody>
                </table>
            </Droppable>
        
        )
    }
}