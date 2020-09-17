import React, { useState, useEffect } from 'react'
import { Divider, Button } from '@material-ui/core';
import styled from 'styled-components'

const Titulo = styled.h1`
    text-align: center;
`;

function Ejercicio(props){
    const [resuelto, setResuelto] = useState(false);
    const [titulo, setTitulo] = useState('Placeholder');
    const [enunciado, setEnunciado] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat elit nec consectetur tristique. Aenean rhoncus, dui vel dictum tempus, nisi lectus tincidunt augue, a tincidunt massa ligula non elit. Maecenas molestie felis sit amet nulla volutpat efficitur a nec dolor. In pellentesque, diam et lacinia fringilla, metus elit rhoncus odio, ac laoreet tortor dui non lorem. Aliquam augue arcu, cursus et lobortis ullamcorper, consectetur vel tortor. Curabitur convallis orci vitae elit convallis fermentum. Sed gravida purus pretium malesuada iaculis. Aliquam sit amet libero sed mi molestie fringilla. Fusce convallis tellus sit amet quam bibendum, sed pharetra lorem dictum. Pellentesque pulvinar iaculis metus, vulputate sollicitudin tellus iaculis in. Nunc congue ornare ex, sit amet volutpat risus feugiat sed. Donec quis nibh gravida, hendrerit nulla in, pulvinar massa. Quisque sed diam vel leo pharetra ornare.');

    //TODO: manejar el verificar el cambio
    const cambiaResuelto = () => setResuelto(!resuelto);

    //ComponentDidMount para cargar por primera vez el estado del ejercicio actual.
    useEffect(() => {
        setTitulo(titulo);
    }, [resuelto]);

    return (
        <div>
            <Titulo>{titulo + resuelto}</Titulo>
            <Divider variant="middle"/>
            <p> { enunciado }</p>
            <Button onClick={cambiaResuelto} > Cliqueame </Button>
        </div>
    );
}



export default Ejercicio;


