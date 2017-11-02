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
                            <td className="floor_plan2">Работник</td>
                            <td className="floor_plan2">%</td>
                        </tr>
                        <tr>
                           <td className="floor_plan">Процес</td>
                           <td className="floor_plan">Машина</td> 
                           <td className="floor_plan">Н.Вр.</td> 
                           <td className="floor_plan">Дневен график</td>     
                           <td className="floor_plan">Изпълнени бройки</td>   
                           <td className="floor_plan">Буфер</td>       
                        </tr>
                    </tbody>
                </table>
            </Droppable>
        
        )
    }
}