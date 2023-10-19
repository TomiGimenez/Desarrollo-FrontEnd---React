import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CrearEncuesta = ({ agregarEncuesta }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [pregunta, setPregunta] = useState('');
    const [preguntas, setPreguntas] = useState([]);
    const [opcion, setOpcion] = useState('');
    const [opciones, setOpciones] = useState([]);
    const [hayPreguntas, setHayPreguntas] = useState(false);

    const onSubmit = (data) => {
        const nuevaEncuesta = {
            titulo: data.titulo,
            descripcion: data.descripcion,
            preguntas: preguntas,
        };
        console.log(nuevaEncuesta);
        agregarEncuesta(nuevaEncuesta);
        reset();
        navigate('/');
    };

    const agregarOpcion = () => {
        if (opcion.trim() !== '') {
            const newOpcion = {
                id: opciones.length + 1,
                texto: opcion
            };
            setOpciones([...opciones, newOpcion]);
            setOpcion('');
        }
    };

    const agregarPregunta = () => {
        if (pregunta.trim() !== '') {
            setHayPreguntas(true);
            const newPregunta = {
                id: preguntas.length + 1,
                pregunta: pregunta,
                opciones: [...opciones]
            };
            console.log(newPregunta);
            setPreguntas([...preguntas, newPregunta]);
            setPregunta('');
            setOpciones([]);
            setOpcion('');
        }
    };

    return (
        <div>
            <h1>Crear Nueva Encuesta</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Título:</label>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    {...register("titulo", {
                        required: 'Este campo es obligatorio',
                        maxLength: {
                            value: 50, message: 'El título debe tener menos de 50 caracteres'
                        }
                    })}
                />
                {errors.titulo && <p>{errors.titulo.message}</p>}
                <label>Descripción:</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    {...register("descripcion", {
                        maxLength: {
                            value: 200, message: 'La descripción debe tener menos de 200 caracteres'
                        }
                    })}
                />
                {errors.descripcion &&
                    <p>{errors.descripcion.message}</p>}
                <label>Pregunta:</label>
                <input
                    type="text"
                    id="pregunta"
                    name="pregunta"
                    value={pregunta}
                    onChange={(e) => setPregunta(e.target.value)}
                />                   
                <div>
                    <label>Opciones:</label>
                </div>
                {opciones.map((item, index) => (

                    <div key={index}>
                        
                        <input
                            type="text"
                            value={item.texto}
                            onChange={(e) => {
                                const updatedOptions = [...opciones];
                                updatedOptions[index].texto = e.target.value;
                                setOpciones(updatedOptions);
                            }}
                        />
                    </div>
                ))}

                <div>
                    <input
                        type="text"
                        id="opcion"
                        name="opcion"
                        value={opcion}
                        onChange={(e) => setOpcion(e.target.value)}
                    />
                    <button type="button" onClick={agregarOpcion}>Guardar Opción</button>
                </div>     
                
                {opciones.length >= 3 ? (
                    <div>
                        <br />
                        <button type="button" onClick={agregarPregunta}>Guardar Pregunta</button>
                    </div>
                ) : null }

                <div>
                    {preguntas.length > 0 ? (
                        <h2>Preguntas:</h2>
                    ) : null }
                    
                    {preguntas.map((pregunta, index) => (
                        <div key={index}>
                            <p>Pregunta {index + 1}: {pregunta.pregunta}</p>
                            <ul>
                                {pregunta.opciones.map((opcion, i) => (
                                    <li key={i}>{opcion.texto}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                {hayPreguntas && (
                    <button type="submit">Guardar Encuesta</button>
                )}
            </form>
        </div>
    );
};

export default CrearEncuesta;
