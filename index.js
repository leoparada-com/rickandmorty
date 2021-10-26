/*
█░░░█▀▀░█▀█░█▀█░█▀█░█▀█░█▀█░█▀█░█▀█░░░█▀▀░█▀█░█░█░░
█░░░█▀▀░█░█░█▀▀░█▀█░██▀░█▀█░█░█░█▀█░░░█░░░█░█░█▀█░░
▀▀▀░▀▀▀░▀▀▀░▀░░░▀░▀░▀░▀░▀░▀░▀▀░░▀░▀░▀░▀▀▀░▀▀▀░▀░▀░░
https://leoparada.com
*/

// ------------------------------------------------------------------------
//https://www.notion.so/Rick-and-Morty-Challenge-84a1b794dc09429fb3178c2a24e7c217
// https://rickandmortyapi.com/

import fetch from 'node-fetch';

let numero_ejercicios = 3;
let cont_ejercicios   = 0

let startTime = new Date();
//console.log('Tiempo Inicio')
//console.log(startTime)

// =============================================================================================
// PREGUNTA 1: cuántas veces aparece la letra "l" (case insensitive) en los nombres de todos
//             los location
// =============================================================================================
let tiempo_1 = ejercicio('location','l')

// =============================================================================================
// PREGUNTA 2: cuántas veces aparece la letra "e" (case insensitive) en los nombres de todos
//             los episode.
// =============================================================================================
let tiempo_2 = ejercicio('episode','e')

// =============================================================================================
// PREGUNTA 3: cuántas veces aparece la letra "c" (case insensitive) en los nombres de todos 
//             los character.
// =============================================================================================
let tiempo_3 = ejercicio('character','c')

let array_tiempo = [];

//tiempo_total(tiempo_1,tiempo_2,tiempo_3)

// FUNCIONES ==============================================================


async function ejercicio(url,letra){
    
    let delta = [];

    let  url_2        = `https://rickandmortyapi.com/api/${url}`
    let response_2    = await fetch(url_2);
    let  data_2       = await response_2.json();

    let array_episode = []
    let count_page    = 1
    let aviso         = true;

    while(aviso){
       
        if (data_2.info.next!==null){
            
            // ---- CREACION DEL ARRAY CON LOS NOMBRES DE LOS EPISODIOS OFRECIDOS EN LA PAGINA 1
            if (count_page==1){
                    // SE REALIZA UNA CONEXION ${count_page} API PARA OBTENER LOS DATOS DE LA SIGUIENTE PAGINA   
                    url_2       = `https://rickandmortyapi.com/api/${url}`;
                   
                    response_2  = await fetch(url_2)
                    data_2      = await response_2.json()
                    count_page++                  

            }
            else{
                    // SE REALIZA UNA CONEXION ${count_page} API PARA OBTENER LOS DATOS DE LA SIGUIENTE PAGINA   
                    url_2       = `https://rickandmortyapi.com/api/episode?page=${count_page}`;
                    response_2  = await fetch(url_2)
                    data_2      = await response_2.json()
                    count_page++
            }
            // SE LLENA LA MATRIZ
            data_2.results.forEach(item => {
                                array_episode.push(item.name)
                                })
        }
        else{
            // EN CASO QUE SEA NULL SE AGREGARAN TAMBIEN LOS ULTIMOS DATOS PROVISTOS POR LA API Y SE TERMINA EL CICLO WHILE
                data_2.results.forEach(item => {
                array_episode.push(item.name)
                })
        let endTime = new Date();
        //console.log(endTime)
        
        delta = endTime - startTime; // diferencia de tiempo en milisegundos
        array_tiempo.push(delta)
        
        startTime = endTime;
        //console.log(delta)
        aviso = false;   
        }
    }

    // -------- [2.2] CONSTRUCCION DE UN OBJETO CON ESTADISTICA PARA LETRAS --------------
    let letra_episode  = letra
    let objeto_episode = []
    // EXTRACCION DE VALORES UNICOS (ESPACIO MUESTRAL)
    let uniqueItems = [...new Set(array_episode)] // se dejan solo los valores unicos

    uniqueItems.forEach(item=>{      
        objeto_episode.push({ name:item, 
                            numero_veces_letra_buscada:cuenta_letras(item,letra_episode)
                            })
    })

    // --------------------------------------------------------------------------
    // [2.3] SE COMUNICAN LOS RESULTADOS

    cont_ejercicios++
    
    console.log(`DESARROLLANDO EJERCICIO: ${url}`)
    console.log(`LETRA BUSCADA: ${letra}`)
    console.table(objeto_episode)
    if (numero_ejercicios == cont_ejercicios){
        console.log('EL TIEMPO TOTAL ES: ')
        let sum = 0;  
        array_tiempo.forEach(element => {
            sum = sum+element;
        });
        sum = sum/1000    
        console.log(`${sum} segundos`)
    } 
    
// =============================================================================================

return delta
}


function cuenta_letras(str,letra){
    // [1] ----------------------------------------------------------------
    // Se separa la palabra convirtiendola en un array

    let arr = str.split('');
    // https://dev.to/soyleninjs/6-formas-de-convertir-un-string-en-array-con-javascript-320n

    // [2] -----------------------------------------------------------------
    // Se cuenta el numero de letras
    let count   = 0;
    let letra_1 = [];
    let letra_2 = [];
        arr.forEach(element => {
            // comparacion de letras convertidas a minusculas para admitir 'case insensitive'

            letra_1 = element.toLowerCase()
            letra_2 = letra.toLowerCase()

            if (letra_1==letra_2){
                count++
            }

        });
    return count
    }