import React from 'react';
import Header from '../header';

export default class Cutting extends React.Component{
  render() {
    return(
      <div>
        <Header/>
        <div className="container">
          
          <table className="table cutting">
            <thead>
              <tr>
                <th>Бригада 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Дата кроене</td>
                <td></td>
              </tr>
              <tr>
                <td>Модел</td>
                <td></td>
              </tr>
              <tr>
                <td>Дневен график</td>
                <td></td>
              </tr>
              <tr>
                <td>Минимален буфер</td>
                <td></td>
              </tr>
              <tr>
                <td>Наличен буфер</td>
                <td></td>
              </tr>
              <tr>
                <td>За кроене</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}