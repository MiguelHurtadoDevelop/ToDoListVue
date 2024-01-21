import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
import { firebaseApp } from './firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Importa tus componentes aquí
import Home from './views/HomeView.vue'
import ListaNotas from './components/ListaNotas.vue'
import register from './components/register.vue'
import login from './components/login.vue'

//Se comprueba si has iniciado sesión
let estasIdentificado;

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    
    estasIdentificado = true;
    
    
    // ...
  } else {
    // User is signed out
    // ...
    estasIdentificado = false;
  }
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/listaNotas', name:"Notas",component: ListaNotas },
    { path: '/register', component: register },
    { path: '/login', component: login}
    // Agrega más rutas según sea necesario
  ],
})



router.beforeEach((to, from) => {
  if(to.name == "Notas" && !estasIdentificado){

    return false
  }else if(to.name == "Notas" && estasIdentificado){
    return true
    

  }
})
const app = createApp(App)

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})

app.use(router)

app.mount('#app') 