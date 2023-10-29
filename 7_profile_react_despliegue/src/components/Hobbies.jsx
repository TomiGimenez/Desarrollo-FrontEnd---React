import React from 'react';

function Hobbies() {
    // Datos ficticios de hobbies
    const hobbies = [
        {
            id: 1,
            nombre: 'Ir al gimanasio',
            descripcion: 'Hacer ejercicio y mantenerme en forma en el gimnasio.',
        },
        {
            id: 2,
            nombre: 'Fotografía',
            descripcion: 'Capturar momentos especiales con mi cámara.',
        },
        {
            id: 3,
            nombre: 'Entrenar básquet',
            descripcion: 'Mejorar mis habilidades en el básquetbol.',
        },
    ];

    return (
        <div className="container">
            <h2>Mis Hobbies</h2>
            <ul className="list-group">
                {hobbies.map((hobby) => (
                    <li key={hobby.id} className="list-group-item">
                        <h3>{hobby.nombre}</h3>
                        <p>{hobby.descripcion}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Hobbies;

