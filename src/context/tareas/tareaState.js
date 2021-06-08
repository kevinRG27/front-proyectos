import React,{useReducer} from 'react';

import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import {
        TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA
            } from '../../types';

import clienteAxios from '../../config/axios';

const TareaState = (props) => {

    const initialState = {
        tareasproyecto : [],
        errortarea : false,
        tareaSeleccionada : null
    };

    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //OBTENER TAREAS DE UN PROYECTO
    const obtenerTareas = async proyecto => {

        console.log(proyecto);

        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
            console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    //AGREGAR TAREA AL PROYECTO ACTUAL
    const agregarTarea = async tarea => {
        console.log(tarea)
        try {
            const resultado = await clienteAxios.post('/api/tareas',tarea)
            console.log(resultado);
            dispatch({
                type : AGREGAR_TAREA,
                payload : tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    //VALIDAR  Y MOSTRAR ERROR DE LA TAREA NUEVA
    const validarTarea = () => {
        dispatch({
            type : VALIDAR_TAREA
        })
    }

    //eliminar tarea por id
    const eliminarTarea = async (id, proyecto) =>{
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params : {proyecto}});
            dispatch({
                type : ELIMINAR_TAREA,
                payload : id
            })
        } catch (error) {
            console.log(error)
        }
    }

    //ACTUALIZAR TAREA EDITADA
    const actualizarTarea = async tarea =>{
        
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            console.log(resultado)
            dispatch({
                type : ACTUALIZAR_TAREA,
                payload : resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    //EXTRAER TAREA ACTUAL PARA EDITARLA
    const guardarTareaActual = tarea =>{
        dispatch({
            type : TAREA_ACTUAL,
            payload : tarea
        })
    }

    //LIMPIAR TAREA seleccionada
    const limpiarTarea = () => {
        dispatch({
            type : LIMPIAR_TAREA
        })
    }

    return ( 
        <tareaContext.Provider
            value={{
                tareasproyecto : state.tareasproyecto,
                errortarea : state.errortarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
     );
}
 
export default TareaState;
