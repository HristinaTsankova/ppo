import React from 'react';

export default class Header extends React.Component{
   
   
    render() {
        return(
           
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 col-sm-4">
                            <a href="/orders" className="btn btn-default ">Поръчки</a>
                            <a href="/cutting" className="btn btn-default ">Кроялна</a>
                        </div>
                        <div className="col-md-2 col-sm-2 logout">
                            <a href="/" className="btn btn-danger ">Изход</a>
                        </div>
                    </div>
                    
                </div>
                
       
        )
    }
}