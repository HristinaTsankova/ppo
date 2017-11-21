import React from 'react';

export default class More extends React.Component {
    render() {
        return(
            <div className="col-md-7 more_bar">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Нормовреме</td>
                            <td></td>
                            <td>Брой пуснати облекла</td>
                            <td></td>
                            <td>Остават за пускане</td>
                            <td></td>
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
                            <td>Присъстващи</td>
                            <td></td>
                            <td>Отсъстващи</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Работници от друга бригада</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}