import React from 'react';
import { Droppable } from 'react-drag-and-drop';


export default class MachineTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.onDrop = this.onDrop.bind(this);
  }
  renderProcess(process, idx) {
    return (
      <tr key={idx + process.toString()}>
        <td className="floor_plan">{process}</td>
        <td className="floor_plan"></td>
        <td className="floor_plan"></td>
        <td className="floor_plan"></td>
        <td className="floor_plan"></td>
        <td className="floor_plan"></td>
      </tr>
    )
  }

  onDrop (data) {
    console.log(data);
    
  }
  render() {
    return (
      
        <div className="margin-top-10">
          
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="floor_plan2"><Droppable
                    types={['plan']}
                    onDrop={this.onDrop}>{this.props.spot.user}</Droppable></td>
                  <td className="floor_plan2"></td>
                </tr>
                {this.props.spot.processes.map((process, idx) => {
                  return this.renderProcess(process, idx)
                })}
              </tbody>
            </table>
            
        </div>
    )
  }
}