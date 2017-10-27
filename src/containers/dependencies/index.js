import React from 'react';
import {sortBy} from 'lodash';
import Header from '../header';
import Parent from './parent';
import AddParent from './addParent'

const getProcessParents = (processes) => processes.reduce((all, process) => {

  all[process.id] = all[process.id] || []

  process.children.forEach((childId) => {
    all[childId] = all[childId]
      ? all[childId].concat(process)
      : [process]
  })
  return all
}, {})

class Dependencies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: null,
      selected: null,
      processesWithParents: null
    }

    this.renderRow = this.renderRow.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onParentDelete = this.onParentDelete.bind(this);
    this.makeOnAddParent = this.makeOnAddParent.bind(this);
  }

  getProcessById(id) {
    if (!this.state.order) 
      return null
    return this.state.order.order_processes.filter(process => process.id === id)[0]
  }

  fetchProcessById(pId) {
    const {id} = this.props.match.params
    const request = {
      method: 'GET',
      headers: ({'Access': 'application/vnd.elitex-v1+json', 'Content-Type': 'application/json', 'Authorization': "access_token=-fKJ0-fsGTCwNcyDg1BMUQ"})
    };
    fetch(`http://178.62.112.203/api/fp/orders/${id}`, request).then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        ...this.state,
        order: json,
        processesWithParents: getProcessParents(json.order_processes)
      })
    });

  }

  componentDidMount() {
    this.fetchProcessById();
  }

  onItemClick(selected) {
    const currentlySelected = this.state.selected
    if (currentlySelected && currentlySelected.id === selected.id) 
      return
    this.setState({
      ...this.state,
      selected
    })
  }

  makeOnAddParent(processId) {
    return selection => {
      const parent = selection[0]
      
      if (!parent)
        return
      
      const parentExists = this.state.processesWithParents[processId]
        .filter(pr => pr.id === parent.id).length > 0
        
      if (parentExists)
        return
        
      const newParents = this.state.processesWithParents
      newParents[processId].push(parent);
      this.setState({
        ...this.state,
        processesWithParents: newParents
      })
    }
  }

  onParentDelete(id, parentId) {
    const newpr = {
      ...this.state.processesWithParents
    }
    const newParents = newpr[id].filter(parent => parent.id !== parentId)
    this.setState({
      // ...this.state,
      processesWithParents: {
        ...this.state.processesWithParents,
        [id]: newParents
      }
    })
  }

  renderParents(rowData) {

    const {processesWithParents} = this.state

    if (!processesWithParents) 
      return null

    const parents = processesWithParents[rowData.id]

    return parents.map((parent, i) => (
      <Parent key={i} parent={parent} onDelete= {() => this.onParentDelete(rowData.id, parent.id)}/>
    ))
  }

  renderRow(rowData, i) {
    const active = this.state.selected && this.state.selected.id === rowData.id
    const className = active
      ? 'active'
      : ''
    return (
      <tr className={className} key={i} onClick={() => this.onItemClick(rowData)}>
        <td className="tech">{rowData.serial_number}</td>
        <td className="tech">{rowData.name}</td>
        <td className="tech">{rowData.aligned_time}</td>
        <td className="tech"></td>
        <td className="view_dep">
          {
            active
              &&
            <AddParent 
              options={this.state.order.order_processes}
              onAdd={this.makeOnAddParent(rowData.id)}
              labelKey="name"/>
          }
            
        </td>
        <td className="parentTD">
          {this.renderParents(rowData)}
        </td>

      </tr>
    )
  }
  

  render() {

    if (!this.state.order) {
      return (
        <h1>Loading</h1>
      )
    }

    const processes = sortBy(this.state.order.order_processes, 'serial_number')

    const rows = processes.map(this.renderRow)
 
    return (
      <div>
        <Header/>
        <div className="row bar">
          <table className="table modelss">
            <thead>
              <tr>
                <th>Модел</th>
                <th>Поръчка №</th>
                <th>Бройки</th>
                <th>Бригади</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tech">{this.state.order.name}</td>
                <td className="tech">{this.state.order.identification_number}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="container dep">
          <h2 className="title">Последователност на процеси</h2>
          <table className="table">
            <thead>
              <tr>
                <th>№</th>
                <th>Процес</th>
                <th>Н.вр.</th>
                <th>Буфер</th>
                <th colSpan="2">Взаимовръзки</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>

          <div className="row">
            <a href="/orders/:id/plan" className="btn btn-success">Продължи</a>
          </div>
        </div>
      </div>
    );
  }
};

export default Dependencies