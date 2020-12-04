import React from 'react';
import { Card } from 'react-bootstrap';

function MovieDetail({ movie, ...rest }) {


    return (
        <div>
            <Card style={{ width: '40rem' }}>
                <Card.Img variant="top" src={movie.poster} />
                <Card.Body>
                    <Card.Title>{movie.name}</Card.Title>
                    <Card.Text>
                        {movie.description}
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
    );
}

export default MovieDetail;