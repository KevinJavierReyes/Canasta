import Amplify from '@aws-amplify/core';
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import awsconfig from './aws-exports';
import Auth from '@aws-amplify/auth';
import { createTodo } from './graphql/mutations'
Amplify.configure(awsconfig);
API.configure(awsconfig);
PubSub.configure(awsconfig);


const userRegister = document.getElementById("userregister")
const passRegister = document.getElementById("passregister")
const emailRegister = document.getElementById("emailregister")
const codeRegister = document.getElementById("coderegister")
const buttonRegister = document.getElementById("register")
const codesend = document.getElementById("codesend")


// Crear una nueva relacion canasta cliente
async function createNewTodo(quality,idCanasta,idUser) {
  const d = new Date();
  const day = d.getDate()
  const mounth = d.getMonth()
  const year = d.getFullYear()
  const todo = {date:`${day}/${mounth}/${year}`,quality:quality, idCanasta: idCanasta , description: "Comprada", idUser:idUser}
  return await API.graphql(graphqlOperation(createTodo, { input: todo }))
}

// createNewTodo("1","2","KevinJavierReyes").then( (evt) => {
//   console.log("Evento creado")
//   console.log(evt)
// })

import { listTodos } from './graphql/queries'

//Obtener a todos los usurios con filtro
async function getData(user) {
  API.graphql(graphqlOperation(listTodos)).then((evt) => {
    let itemsFilters = evt.data.listTodos.items.filter( item => item.idUser == user )
    console.log("Items : ")
    console.log(itemsFilters)
  })
}

// Obtener a todos los empreados
async function getDataAll() {
  API.graphql(graphqlOperation(listTodos)).then((evt) => {
    console.log("Items : ")
    console.log(evt)
  })
}


// Apenas carge la pagina se logea con credenciales estaticas, para no perder tiempo con el login 
// para la presentacion
async function loginLoad(){
  Auth.signIn("KevinJavierReyes", "KevinJavierReyes").then((res) => {
    const user = document.getElementById("user")
    user.innerHTML = res.username
  }).catch((err) => {
    console.log(err)
  })
}
loginLoad()

// Test de where in GraphQL
// API.graphql(graphqlOperation(listTodos, {
//   filter: {
//     idCanasta:"1"
//   }
// })).then(res=>console.log(res)).catch(res2=>console.log(res2))

// getData("KevinJavierReyes")


// Funcion para registrar usuario, con validacion por correo
buttonRegister.addEventListener('click', (evt) => {
  Auth.signUp({
    username: userRegister.value,
    password: passRegister.value,
    attributes: {
      email: emailRegister.value
    }
  }).then((res) => {
    console.log(res)
    alert("Te enviamos un correo con el codigo de activación")
  }).catch((err) => {
    console.log(err)
  })
})



const userLogin = document.getElementById("userLogin")
const passlogin = document.getElementById("passLogin")
const btnLogin = document.getElementById("login")


// Funcion para logearse
btnLogin.addEventListener('click', (evt) => {
  Auth.signIn(userLogin.value, passlogin.value).then((res) => {
    alert("Bienvenido !!!")
    console.log(res)
    console.log(Auth.currentSession())
  }).catch((err) => {
    console.log(err)
  })
})


const consultar = document.getElementById("consultar")


// Obtener session actual
consultar.addEventListener('click', async (evt) => {
  let r = await Auth.currentSession()
  console.log(r)
})



// Validacion de codigo enviado por correo, tenemos las pruebas en index444.html.
// 

// Auth.signUp({
//   username: "Kevin11",
//   password: "KevinJavierReyes",
//   attributes: {
//     email: "kevinjavier010@gmail.com"
//   }
// }).then((res) => {
//   console.log(res)
//   Auth.confirmSignUp("Kevin11",res.codeDeliveryDetails).then((res1) => {
//     console.log(res1)
//   }).catch((err) => { console.log(err) })
// }).catch((err) => {
//   console.log(err)
// })

// const MutationResult = document.getElementById('btn');

// MutationResult.addEventListener('click', (evt) => {

// })

// const MutationResult2 = document.getElementById('btn2');

// MutationResult2.addEventListener('click', (evt) => {
//   Auth.signUp()
// })