import React,{Fragment, useState, useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';   

const NuevoProyecto = () => {

    //obtener el state fel form
    const proyectosContext = useContext(proyectoContext);
    const {formulario,errorFormulario,mostrarFormulario,agregarProyecto, mostrarError} = proyectosContext;

    //State para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre:''
    });

    //Extraer nombre de proyectos
    const {nombre} = proyecto;

    //Leer contenido del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    //Cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }

        //Agregar al state
        agregarProyecto(proyecto);

        //Reiniciar el form
        guardarProyecto({
            nombre : ''
        });
    }

    return (   
        <Fragment>
            <button
            type='button'
            className='btn btn-block btn-primario'
            onClick={() => mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>

            { formulario
                ?
                (
                    <form
                        className='formulario-nuevo-proyecto'
                        onSubmit={onSubmitProyecto}
                    >
                        <input
                            type='text'
                            className='input-text'
                            placeholder='Nombre Proyecto'
                            name='nombre'
                            onChange={onChangeProyecto}
                            value={nombre}
                        />

                        <input
                            type='submit'
                            className='btn btn-primario'
                            value='Agregar Proyecto'
                        />
                    </form>
                )
                :
                    null
            }

            { errorFormulario ? 
                <p className='mensaje error'>El nombre del proyecto es obligatorio</p>
            : null}
        </Fragment>
    );
}
 
export default NuevoProyecto;