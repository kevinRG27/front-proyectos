import React,{useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext'; 
import tareaContext from '../../context/tareas/tareaContext';   

const Proyecto = ({proyecto}) => {

    //obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    //obtenr funcion de obtenertareas
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;

    //funcion para agregar proyecto y a la vez tareas
    const seleccionarProyecto = id =>{
        proyectoActual(id); //fijar proyecto actual
        obtenerTareas(id);           // filtrar las tareas cuando se de clic
    }

    return ( 
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick= { () => seleccionarProyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyecto;