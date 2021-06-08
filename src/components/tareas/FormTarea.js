import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'; 
import tareaContext from '../../context/tareas/tareaContext'; 

const FormTarea = () => {

    //obtener proyectos d el state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //obtenr funcion del contextArea
    const tareasContext = useContext(tareaContext);
    const {tareaSeleccionada,errortarea,agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext;

    //effect que detecta tareaSeleccionada
    useEffect(() => {
        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada)
        }else{
            guardarTarea({
                nombre:''
            })
        }
    }, [ tareaSeleccionada ]);

    //state del formulario
    const [tarea, guardarTarea] = useState({
        nombre : ''
    });

    //extraer nombre para validar y reiniciar el form
    const {nombre} = tarea;

    //Si no hay proyecto seleccionado
    if(!proyecto) return null;

    //Array destructuring para extraer proyectoActual
    const [proyectoActual] = proyecto;

    //agregar tarea al state
    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();

        //validarFormulario
        if(nombre.trim() === ''){
            validarTarea();
            return
        }

        //Si es edicion o es nueva tarea
        if(tareaSeleccionada === null){
            //tarea nueva
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }else{
            //actualizar tarea existente
            actualizarTarea(tarea);
            
            //elimina tareaSeleccionada del state
            limpiarTarea();
        }
        //obtener y filtrar las nuevas tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        guardarTarea({
            nombre : ''
        })
    }

        return (  
        <div className='formulario'>
            <form
                onSubmit={onSubmit}
            >
                <div className='contenedor-input'>
                    <input 
                        type='text'
                        className='input-text'
                        placeholder='Nombre Tarea...'
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}
                    />
                </div> 
                <div className='contenedor-input'>
                    <input 
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea...'}
                    />
                </div> 
            </form>

            {errortarea ? <p className='mensaje error'>El nombre de la Tarea es obligatorio</p>:null}
        </div>
    );
}
 
export default FormTarea;