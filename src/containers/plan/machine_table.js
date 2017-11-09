import React from 'react';



export default class MachineTable extends React.Component {
  
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

  
  render() {
    return (
      
        <div className="margin-top-10">
          
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="floor_plan2">{this.props.spot.user}</td>
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