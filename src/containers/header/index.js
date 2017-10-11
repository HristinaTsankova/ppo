import React from 'react';



export default class Header extends React.Component{
   
    render() {
        return(
           
                <div className="container-fluid header">
                    <div className="col-md-2 col-xs-2 tab">
                        <div className="row">
                            <button type="submit" className="btn btn-success save">Запиши проценти</button>
                            <button type="reset" className="btn btn-danger del">Изтрий</button>
                        </div>
                    </div>
                    <div className="col-md-4 col-xs-10 tab">
                        <div className="col-md-5 col-xs-5">
                            <table className="table table-hover">
                                <tbody>
                                    <tr>
                                        <td>График V1234H</td>
                                        <td>151</td>
                                    </tr>
                                    <tr>
                                        <td>Работници</td>
                                        <td>23</td>
                                    </tr>
                                    <tr>
                                        <td>Отсъстващи</td>
                                        <td>2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6 col-xs-5">
                            <table className="table table-hover">
                                <tbody>
                                    <tr>
                                        <td>Актуален график</td>
                                        <td>151</td>
                                    </tr>
                                    <tr>
                                        <td>Скроено</td>
                                        <td>500</td>
                                    </tr>
                                    <tr>
                                        <td>Остават за пускане</td>
                                        <td>1700</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
                
       
        )
    }
}