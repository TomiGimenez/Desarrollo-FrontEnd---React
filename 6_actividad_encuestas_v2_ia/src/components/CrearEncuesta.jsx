import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
                        maxLength: { value: 50, message: 'El título debe tener menos de 50 caracteres' }
                    })}
                />
                {errors.titulo && <p>{errors.titulo.message}</p>}
                <label>Descripción:</label>
                <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    {...register("descripcion", {
                        required: 'Este campo es obligatorio',
                        maxLength: { value: 200, message: 'La descripción debe tener menos de 200 caracteres' }
                    })}
                />
                {errors.descripcion && <p>{errors.descripcion.message}</p>}

                {/* Agregar campos adicionales */}
                <label>Pregunta:</label>
                <input
                    type="text"
                    id="pregunta"
                    name="pregunta"
                    value={pregunta}
                    onChange={(e) => setPregunta(e.target.value)}
                />

                <label>Opción:</label>
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
                <input
                    type="text"
                    id="opcion"
                    name="opcion"
                    value={opcion}
                    onChange={(e) => setOpcion(e.target.value)}
                />
                <button type="button" onClick={agregarOpcion}>Agregar Opción</button>

                {/* Validaciones para preguntas y opciones */}
                {opciones.length >= 2 ? (
                    <button type="button" onClick={agregarPregunta}>Agregar Pregunta</button>
                ) : null}
                
                {hayPreguntas ? (
                        <div>
                            {/* Mostrar las preguntas con sus opciones antes de guardar la encuesta */}
                            <h2>Preguntas:</h2>
                            {preguntas.map((pregunta, index) => (
                                <div key={index}>
                                    <h3>{pregunta.pregunta}</h3>
                                    <ul>
                                        {pregunta.opciones.map((opcion, index) => (
                                            <li key={index}>{opcion.texto}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <button type="submit">Guardar Encuesta</button>
                        </div>
                    ): null}

            </form>
        </div>
    )
}

export default CrearEncuesta;