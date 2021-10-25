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

// =============================================================================================
// PREGUNTA 1: cuántas veces aparece la letra "l" (case insensitive) en los nombres de todos
//             los location
// =============================================================================================
let tiempo_1 =await ejercicio('location')

// =============================================================================================
// PREGUNTA 2: cuántas veces aparece la letra "e" (case insensitive) en los nombres de todos
//             los episode.
// =============================================================================================
let tiempo_2 = await ejercicio('episode')

// =============================================================================================
// PREGUNTA 3: cuántas veces aparece la letra "c" (case insensitive) en los nombres de todos 
//             los character.
// =============================================================================================
let tiempo_3 = await ejercicio('character')


tiempo_total(tiempo_1,tiempo_2,tiempo_3)

// FUNCIONES ==============================================================

function tiempo_total(tiempo_1,tiempo_2,tiempo_3){
    let tiempoTotal =  (tiempo_1+tiempo_2+tiempo_3);
    console.log(`El tiempo total es de ${tiempoTotal} milisegundos` )
    return tiempoTotal
}


async function ejercicio(url){
    var startTime = new Date();  

    let  url_2       = `https://rickandmortyapi.com/api/${url}`
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
        aviso = false;   
        }
    }

    // -------- [2.2] CONSTRUCCION DE UN OBJETO CON ESTADISTICA PARA LETRAS --------------
    let letra_episode  = 'e'
    let objeto_episode = []
    // EXTRACCION DE VALORES UNICOS (ESPACIO MUESTRAL)
    let uniqueItems = [...new Set(array_episode)] // se dejan solo los valores unicos

    uniqueItems.forEach(item=>{      
        objeto_episode.push({ name:item, 
                            numero_de_e:cuenta_letras(item,letra_episode)
                            })
    })

    // --------------------------------------------------------------------------
    // [2.3] SE COMUNICAN LOS RESULTADOS
    console.log(`DESARROLLANDO EJERCICIO: ${url}`)
    console.table(objeto_episode)

// =============================================================================================
var endTime = new Date();
var delta = endTime - startTime; // diferencia de tiempo en milisegundos
//console.log(delta)

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