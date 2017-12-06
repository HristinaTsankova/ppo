import React from 'react';

export default class More extends React.Component {
    render() {
        return(
            <div className="col-md-10 more_bar">
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="first">Нормовреме</td>
                            <td className="first"></td>
                            <td className="first">Брой пуснати облекла</td>
                            <td className="first"></td>
                            <td className="first">Остават за пускане</td>
                            <td className="first"></td>
                        </tr>
                        <tr>
                            <td>Общо скроени бройки</td>
                            <td></td>
                            <td>Остават за кроене</td>
                            <td></td>
                            <td>Брой готови облекла</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Брой облекла във веригат</td>
                            <td></td>
                            
                        </tr>
                        <tr>
                            <td>Присъстващи</td>
                            <td></td>
                            <td>Отсъстващи</td>
                            <td></td>
                            <td>Работници от друга бригада</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}