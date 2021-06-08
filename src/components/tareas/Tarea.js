import React,{useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';  
import tareaContext from '../../context/tareas/tareaContext';  

const Tarea = ({tarea}) => {

    //obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //obtener funcion de eliminartareas
    const tareasContext = useContext(tareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;

    //Extraer el proyectoActual
    const [proyectoActual] = proyecto;
     

     //handleEliminar
     const handleEliminar = id =>{
        eliminarTarea(id,proyectoActual._id);
        obtenerTareas(proyectoActual.id);
     }

     //funcion para modificar estado de tareas
     const cambiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }

        actualizarTarea(tarea)
     }

     //funcion para seleccionar tarea para editarla
     const seleccionarTarea = tarea => {         
        guardarTareaActual(tarea);
     }

    return (
        <li className='tarea sombra'>
            <p>{tarea.nombre}</p>

            <div className='estado'>
                {tarea.estado 
                ?
                    (
                        <button
                            type='button'
                            className='completo'
                            onClick={() => cambiarEstado(tarea)}
                        >Completo</button>
                    )
                :
                    (
                        <button
                            type='button'
                            className='incompleto'
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className='acciones'>
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={() => handleEliminar(tarea._id)}
                >Eliminar</button>
            </div>

        </li>
      );
}
 
export default Tarea ;