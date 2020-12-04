import React, { useEffect, useState } from 'react';
import { Paper, Card, CardMedia } from '@material-ui/core'

function Character({ propPersonaje, ...rest }) {

    const [personaje, setPersonaje] = useState(propPersonaje)

    // console.log(`${personaje.thumbnail.path}.${personaje.thumbnail.extension}`);

    return (
        <Paper className='card-root' elevation={5}>
            <img

                className='card-root-image'
                src={`${personaje.thumbnail.path}.${personaje.thumbnail.extension}`}
            ></img>
            <div className='description'>
                <h5>{personaje.name}</h5>

                <p>
                    {personaje.description}
                </p>

            </div>
        </Paper>
    );
}

export default Character;