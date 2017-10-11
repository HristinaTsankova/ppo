import React from 'react';
import { sortBy } from 'lodash';
import { withRouter } from 'react-router';
import { Typeahead } from 'react-bootstrap-typeahead';
//import Parent from '../parent';

const fakeOrder = {"id":46,"name":"болеро с бие","model":"2427-1","identification_number":"кл:14:/пор:46","client_name":"Андроид","client_model":"IGLOO-TIBET","client_identification_number":"тест 2","order_distributions":[{"id":240,"size":"4","color":"а","number":100},{"id":237,"size":"1","color":"а","number":100},{"id":238,"size":"2","color":"а","number":100},{"id":239,"size":"3","color":"а","number":100},{"id":241,"size":"5","color":"а","number":100},{"id":242,"size":"7","color":"hgjghjhg","number":66}],"order_processes":[{"id":553,"name":"ПРИКАЧВА БИЕ ПО ПОДГЪВ РЪКАВИ, РЕЖЕ","serial_number":3,"aligned_time":2.6,"separate":false,"machine_type":{"id":10,"name":"БИЕТАРКА"},"children"
    :[
        552,
        551
    ]},{"id":552,"name":"СГЛОБЯВА РАМА С ЛАСЕ Х 2, МЕРИ СИМЕТРИЯ","serial_number":2,"aligned_time":1.8,"separate":false,"machine_type":{"id":1,"name":"ПРАВА"},"children":[
        551,
        565,
        562
    ]},{"id":551,"name":"НАШИВА БИЕ Х 1","serial_number":1,"aligned_time":0.3,"separate":false,"machine_type":{"id":1,"name":"ПРАВА"},"children":[]},{"id":565,"name":"hgjhgjh","serial_number":15,"aligned_time":1.0,"separate":false,"machine_type":{"id":15,"name":"КОПЧАРКА"},"children":[]},{"id":562,"name":"ОТК","serial_number":12,"aligned_time":2.8,"separate":false,"machine_type":{"id":6,"name":"РЪЧНО"},"children":[]},{"id":564,"name":"ОПАКОВКА, СТРЕЛЯ ЕТИКЕТ, СГЪВА ПО КАРТОН, СЛАГА В ПЛИК, ЗАСИЧА ПО ЗАДАНИЕ, ПОДРЕЖДА В КАШОНИ","serial_number":14,"aligned_time":1.9,"separate":false,"machine_type":{"id":6,"name":"РЪЧНО"},"children":[]},{"id":563,"name":"ГЛАДЕНЕ","serial_number":13,"aligned_time":3.3,"separate":false,"machine_type":{"id":9,"name":"ЮТИЯ"},"children":[]},{"id":561,"name":"МЕРИ СРЕДА И ПРИКАЧВА ФИРМЕНА МАРКА С РАЗМЕР НА ВРАТНА ИЗВИВКА","serial_number":11,"aligned_time":0.9,"separate":false,"machine_type":{"id":1,"name":"ПРАВА"},"children":[]},{"id":560,"name":"ЗАГЪВА КОНЕЦ И ЗАТЯГА БИЕТА Х 4","serial_number":10,"aligned_time":2.4,"separate":false,"machine_type":{"id":5,"name":"ПОНТ"},"children":[]},{"id":559,"name":"СГЛОБЯВА СТРАНИЧЕН ШЕВ, РЕЖЕ МАРКА ОТ ЛЕНТА, БЕЛЕЖИ И ПОСТАВЯ","serial_number":9,"aligned_time":2.0,"separate":false,"machine_type":{"id":2,"name":"3КО ОВЕРЛОГ"},"children":[]},{"id":558,"name":"ЗАТЯГА БИЕТА ПРИ ПОДГЪВ РЪКАВИ Х 2","serial_number":8,"aligned_time":0.8,"separate":false,"machine_type":{"id":1,"name":"ПРАВА"},"children":[]},{"id":557,"name":"ПРИКАЧВА РЪКАВИ НА ОТВОРЕН СТРАНИЧЕН ШЕВ","serial_number":7,"aligned_time":2.4,"separate":false,"machine_type":{"id":2,"name":"3КО ОВЕРЛОГ"},"children":[]},{"id":556,"name":"ЗАТЯГА БИЕТА ПРИ ПОДГЪВ ТЯЛО Х 2","serial_number":6,"aligned_time":0.8,"separate":false,"machine_type":{"id":1,"name":"ПРАВА"},"children":[]},{"id":555,"name":"ПРИКАЧВА БИЕ ПО ПОДГЪВ ПРЕДНИ ЧАСТИ, БОРД И ВРАТНА ИЗВИВКА, РЕЖЕ, ВНИМАВА НА ИЗВИВКИТЕ","serial_number":5,"aligned_time":5.0,"separate":false,"machine_type":{"id":10,"name":"БИЕТАРКА"},"children":[]},{"id":554,"name":"ПРИКАЧВА БИЕ ПО ПОДГЪВ ГРЪБ, РЕЖЕ","serial_number":4,"aligned_time":1.6,"separate":false,"machine_type":{"id":10,"name":"БИЕТАРКА"},"children":[]}],"order_batches":[{"id":721,"order_id":46,"number":3,"position":55,"made_pieces":0,"remaining_pieces":3,"features":"вп","order_distribution_id":241},{"id":720,"order_id":46,"number":3,"position":54,"made_pieces":0,"remaining_pieces":3,"features":"вп","order_distribution_id":240},{"id":719,"order_id":46,"number":3,"position":53,"made_pieces":0,"remaining_pieces":3,"features":"вп","order_distribution_id":239},{"id":718,"order_id":46,"number":3,"position":52,"made_pieces":0,"remaining_pieces":3,"features":"вп","order_distribution_id":238},{"id":717,"order_id":46,"number":3,"position":51,"made_pieces":0,"remaining_pieces":3,"features":"вп","order_distribution_id":237},{"id":716,"order_id":46,"number":18,"position":50,"made_pieces":0,"remaining_pieces":18,"features":"","order_distribution_id":241},{"id":715,"order_id":46,"number":18,"position":49,"made_pieces":0,"remaining_pieces":18,"features":"","order_distribution_id":240},{"id":714,"order_id":46,"number":18,"position":48,"made_pieces":0,"remaining_pieces":18,"features":"","order_distribution_id":239},{"id":713,"order_id":46,"number":18,"position":47,"made_pieces":0,"remaining_pieces":18,"features":"","order_distribution_id":238},{"id":712,"order_id":46,"number":18,"position":46,"made_pieces":0,"remaining_pieces":18,"features":"","order_distribution_id":237},{"id":711,"order_id":46,"number":6,"position":45,"made_pieces":0,"remaining_pieces":6,"features":"","order_distribution_id":241},{"id":710,"order_id":46,"number":6,"position":44,"made_pieces":0,"remaining_pieces":6,"features":"","order_distribution_id":240},{"id":709,"order_id":46,"number":6,"position":43,"made_pieces":0,"remaining_pieces":6,"features":"","order_distribution_id":239},{"id":708,"order_id":46,"number":6,"position":42,"made_pieces":0,"remaining_pieces":6,"features":"","order_distribution_id":238},{"id":707,"order_id":46,"number":6,"position":41,"made_pieces":0,"remaining_pieces":6,"features":"","order_distribution_id":237},{"id":706,"order_id":46,"number":14,"position":40,"made_pieces":0,"remaining_pieces":14,"features":"","order_distribution_id":241},{"id":705,"order_id":46,"number":14,"position":39,"made_pieces":0,"remaining_pieces":14,"features":"","order_distribution_id":240},{"id":704,"order_id":46,"number":14,"position":38,"made_pieces":0,"remaining_pieces":14,"features":"","order_distribution_id":239},{"id":703,"order_id":46,"number":14,"position":37,"made_pieces":0,"remaining_pieces":14,"features":"","order_distribution_id":238},{"id":702,"order_id":46,"number":14,"position":36,"made_pieces":0,"remaining_pieces":14,"features":"","order_distribution_id":237},{"id":701,"order_id":46,"number":7,"position":35,"made_pieces":0,"remaining_pieces":7,"features":"","order_distribution_id":241},{"id":700,"order_id":46,"number":7,"position":34,"made_pieces":0,"remaining_pieces":7,"features":"","order_distribution_id":240},{"id":699,"order_id":46,"number":7,"position":33,"made_pieces":0,"remaining_pieces":7,"features":"","order_distribution_id":239},{"id":698,"order_id":46,"number":7,"position":32,"made_pieces":0,"remaining_pieces":7,"features":"","order_distribution_id":238},{"id":697,"order_id":46,"number":7,"position":31,"made_pieces":0,"remaining_pieces":7,"features":"","order_distribution_id":237},{"id":696,"order_id":46,"number":5,"position":30,"made_pieces":0,"remaining_pieces":5,"features":"","order_distribution_id":241},{"id":695,"order_id":46,"number":5,"position":29,"made_pieces":0,"remaining_pieces":5,"features":"","order_distribution_id":240},{"id":694,"order_id":46,"number":5,"position":28,"made_pieces":0,"remaining_pieces":5,"features":"","order_distribution_id":239},{"id":693,"order_id":46,"number":5,"position":27,"made_pieces":0,"remaining_pieces":5,"features":"","order_distribution_id":238},{"id":692,"order_id":46,"number":5,"position":26,"made_pieces":0,"remaining_pieces":5,"features":"","order_distribution_id":237},{"id":691,"order_id":46,"number":11,"position":25,"made_pieces":0,"remaining_pieces":11,"features":"","order_distribution_id":240},{"id":690,"order_id":46,"number":12,"position":24,"made_pieces":0,"remaining_pieces":12,"features":"","order_distribution_id":241},{"id":689,"order_id":46,"number":12,"position":23,"made_pieces":0,"remaining_pieces":12,"features":"","order_distribution_id":240},{"id":688,"order_id":46,"number":12,"position":22,"made_pieces":0,"remaining_pieces":12,"features":"","order_distribution_id":239},{"id":687,"order_id":46,"number":12,"position":21,"made_pieces":0,"remaining_pieces":12,"features":"","order_distribution_id":238},{"id":686,"order_id":46,"number":12,"position":20,"made_pieces":0,"remaining_pieces":12,"features":"","order_distribution_id":237},{"id":685,"order_id":46,"number":11,"position":19,"made_pieces":0,"remaining_pieces":11,"features":"","order_distribution_id":241},{"id":684,"order_id":46,"number":11,"position":18,"made_pieces":0,"remaining_pieces":11,"features":"","order_distribution_id":239},{"id":683,"order_id":46,"number":11,"position":17,"made_pieces":0,"remaining_pieces":11,"features":"","order_distribution_id":238},{"id":682,"order_id":46,"number":11,"position":16,"made_pieces":0,"remaining_pieces":11,"features":"","order_distribution_id":237},{"id":681,"order_id":46,"number":10,"position":15,"made_pieces":0,"remaining_pieces":10,"features":"","order_distribution_id":241},{"id":680,"order_id":46,"number":10,"position":14,"made_pieces":0,"remaining_pieces":10,"features":"","order_distribution_id":240},{"id":679,"order_id":46,"number":10,"position":13,"made_pieces":0,"remaining_pieces":10,"features":"","order_distribution_id":239},{"id":678,"order_id":46,"number":10,"position":12,"made_pieces":0,"remaining_pieces":10,"features":"","order_distribution_id":238},{"id":677,"order_id":46,"number":10,"position":11,"made_pieces":0,"remaining_pieces":10,"features":"","order_distribution_id":237},{"id":676,"order_id":46,"number":9,"position":10,"made_pieces":0,"remaining_pieces":9,"features":"","order_distribution_id":241},{"id":675,"order_id":46,"number":9,"position":9,"made_pieces":0,"remaining_pieces":9,"features":"","order_distribution_id":240},{"id":674,"order_id":46,"number":9,"position":8,"made_pieces":0,"remaining_pieces":9,"features":"","order_distribution_id":239},{"id":673,"order_id":46,"number":9,"position":7,"made_pieces":0,"remaining_pieces":9,"features":"","order_distribution_id":238},{"id":672,"order_id":46,"number":9,"position":6,"made_pieces":0,"remaining_pieces":9,"features":"","order_distribution_id":237},{"id":671,"order_id":46,"number":8,"position":5,"made_pieces":0,"remaining_pieces":8,"features":"","order_distribution_id":241},{"id":670,"order_id":46,"number":8,"position":4,"made_pieces":0,"remaining_pieces":8,"features":"","order_distribution_id":240},{"id":669,"order_id":46,"number":8,"position":3,"made_pieces":0,"remaining_pieces":8,"features":"","order_distribution_id":239},{"id":668,"order_id":46,"number":8,"position":2,"made_pieces":0,"remaining_pieces":8,"features":"","order_distribution_id":238},{"id":667,"order_id":46,"number":8,"position":1,"made_pieces":0,"remaining_pieces":8,"features":"","order_distribution_id":237}],"departments":[{"id":2,"name":"Цех 1","type":"TailorDepartment","users":[{"id":3,"name":"Ася Колибаровска","department_id":2,"roles":["Шивач"]},{"id":4,"name":"Анелия Юрукова","department_id":2,"roles":["Шивач"]},{"id":15,"name":"Пробен таблет 1","department_id":2,"roles":["Шивач"]},{"id":16,"name":"пробен таблет 2","department_id":2,"roles":["Шивач"]},{"id":2,"name":"Ася Юрукова","department_id":2,"roles":["Шивач"]}]},{"id":3,"name":"Цех 2","type":"TailorDepartment","users":[{"id":8,"name":"латинка","department_id":3,"roles":["Шивач"]},{"id":11,"name":"севда","department_id":3,"roles":["Шивач"]}]}]}

const getProcessParents = (processes) =>
    processes.reduce((all, process) => {
        console.log('adf', process.id)

        all[process.id] = all[process.id] || []

        process.children.forEach((childId) => {
            all[childId] = all[childId] ? all[childId].concat(process) : [process]
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
        this.onProcessSelected = this.onProcessSelected.bind(this);
        this.onParentDelete = this.onParentDelete.bind(this);
        
    }

    getProcessById (id) {
        if(!this.state.order) return null
        return this.state.order.order_processes.filter(process =>
            process.id === id
        )[0]
    }

    fetchProcessById(pId) {
        const { id } = this.props.match.params
        const request = {
            method: 'GET',
            headers: ({
                'Access': 'application/vnd.elitex-v1+json',
                'Content-Type': 'application/json',
                'Authorization': "access_token=-fKJ0-fsGTCwNcyDg1BMUQ" ,
            }),
            
            
        };
        fetch(`http://178.62.112.203/api/fp/orders/${id}`, request)
        .then( (response) => {
            return response.json()
        })
        .then( (json) => {
            this.setState({
                ...this.state,
                order: json,
                processesWithParents: getProcessParents(json.order_processes)
            })
        });
          
    }
    fakeFetchProcess () {
        this.setState({
            ...this.state,
            order: fakeOrder,
            processesWithParents: getProcessParents(fakeOrder.order_processes)
        })
    }

    componentDidMount() {
        // this.fetchProcessById();
        this.fakeFetchProcess();
    }
    
    onItemClick (selected) {
        this.setState({
            ...this.state,
            selected
        })
    }

    onProcessSelected (selection) {
        const updatedProcess = {
            ...this.state.selected,
            children: [
                ...this.state.selected.children,
                selection[0].id
            ]
        }
        const newOrder = {
            ...this.state.order,
            order_processes:
                this.state.order.order_processes.map(pr => {
                    if(pr.id !== updatedProcess.id)
                        return pr
                    else
                        return updatedProcess
                })
        }
        this.setState({
            ...this.state,
            order: newOrder
        })
    }
    
    

    onParentDelete (id, parentId) {
        console.log('should delete');
        const newpr = this.state.processesWithParents
        newpr[id] = newpr[id].splice(newpr[id].indexOf(parentId), 1)
        this.setState({
            ...this.state,
             processeswithparents: newpr
        })
    }

    renderParents (rowData) {

        const { processesWithParents } = this.state

        if(!processesWithParents) return null

        const parents = processesWithParents[rowData.id]

        console.log(rowData.id, parents)

        // const fakeData = [{"id":553,"serial_number":3},{"id":552,"serial_number":2}]
        
        // return rowData.children.map(child => (
        return parents.map(parent => (
            
                <Parent parent={parent} onDelete = {() => this.onParentDelete(rowData.id, parent.id)}/>
        
        ))
    }
    
    renderRow (rowData, i) {
        const active = this.state.selected && this.state.selected.id === rowData.id
        const className = active
            ? 'active'
            : ''
        return (
            <tr className={className} key={i} onClick={() => this.onItemClick(rowData)}>
                <td>{rowData.serial_number}</td>
                <td className="tech">{rowData.name}</td>
                <td>{rowData.aligned_time}</td>
               <td className="view_dep">
                {
                    active &&    
                        <Typeahead
                            options={this.state.order.order_processes}
                            onChange={this.onProcessSelected}
                            labelKey="name" />
                }

                
                 </td>
                 <td className="parentTD">
                     { this.renderParents(rowData) }
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

      const processes = sortBy(
        this.state.order.order_processes,
        'serial_number'
      )

      console.log(this.state.order)
      console.log(Object.keys(this.state.order.order_processes).length);
      console.log(Object.keys(this.state.processesWithParents).length)
      const rows = processes.map(this.renderRow)
      return (
          <div>
            
            <div className="container dep">
                <h2 className="title">Технологии и взаимовръзки</h2>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>№</td>
                            <td>Процес</td>
                            <td>Н.вр.</td>
                            
                        </tr>
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

class Parent extends React.Component {
    state = {
       showDel : false
    };

    constructor(props) {
      super(props);
      this.showDelForm = this.showDelForm.bind(this);
    }

    showDelForm = () => {
      const {showDel} = this.state;
      this.setState({showDel : !showDel})
    }

    render() {
    const { parent, onParentDelete, rowData } = this.props
      return(
        <div className="child">
            <span className="parentDel">
            {
            this.state.showDel &&
            <button className="btn btn-circle btn-danger dependencies" onClick={ () => onParentDelete(rowData, parent.id)}>-</button>}
            </span>
            <span className="parent" onClick={this.showDelForm}>
                {parent.serial_number}
            </span>
          
        </div>
      )
    }
}



export default withRouter(Dependencies)