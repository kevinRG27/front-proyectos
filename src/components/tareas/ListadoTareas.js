import React,{Fragment, useContext} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import Tarea from './Tarea';

import proyectoContext from '../../context/proyectos/proyectoContext'; 
import tareaContext from '../../context/tareas/tareaContext'; 

const ListadoTareas = () => {

    //obtener proyectos d el state inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto,eliminarProyecto} = proyectosContext;

    //obtenr las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

    if(!proyecto) return <h1>Selecciona un Proyecto</h1>

    //Array destructuring para extraer proyectoActual
    const [proyectoActual] = proyecto;

    //Elimina un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }
    return (  

       <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className='listado-tareas'>
                {tareasproyecto.length === 0
                    ?
                    (<li className='tarea'><p>No hay Tareas</p></li>)
                    :
                    <TransitionGroup>
                        {tareasproyecto.map(tarea =>(
                            <CSSTransition
                                key = {tarea._id}
                                timeout = {200}
                                classNames='tarea'
                            >
                                <Tarea 
                                   tarea={tarea} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button
                type='button'
                className='btn btn-eliminar'
                onClick={onClickEliminar}
            >Eliminar &times;</button>
            
       </Fragment>
    );
}
 
export default ListadoTareas;