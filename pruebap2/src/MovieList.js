import React, { useEffect, useState } from 'react';
import Grafico from './Grafico';
import { Table, Row, Col } from 'react-bootstrap'
import { FormattedMessage} from 'react-intl';


function List({ datos, ...rest }) {

    function tableRow(movie, index) {
        return (
            <tr key={index} >
                <td id={`id-${movie.id}`}>{movie.id}</td>
                <td id={`name-${movie.id}`}>{movie.name}</td>
                <td id={`directedBy-${movie.id}`}>{movie.channel}</td>
                <td id={`country-${movie.id}`}>{movie.description}</td>
            </tr>
        )
    }



    return (
        <div>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th> <FormattedMessage id='id' /></th>
                                <th> <FormattedMessage id='name' /></th>
                                <th><FormattedMessage id='channel' /></th>
                                <th> <FormattedMessage id='description' /></th>
                            </tr>
                        </thead>

                        <tbody>
                            {datos.map(tableRow)}
                        </tbody>

                    </Table>
                </Col>
            </Row>
            <Grafico datos={datos} />
        </div>
    );
}

export default List;