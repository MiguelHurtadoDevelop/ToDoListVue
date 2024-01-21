<script setup>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const auth = getAuth();
const router = useRouter();

let usuario = ref(null);

let unsubscribe;

onMounted(() => {
  unsubscribe = onAuthStateChanged(auth, (user) => {
    usuario.value = user;
  });
});

onUnmounted(() => {
  unsubscribe();
});

function cerrarSesion() {
  signOut(auth).then(() => {
    // Sign-out successful.
    usuario.value = null;
    router.push({ path: '/' });
  }).catch((error) => {
    // An error happened.
  });
}

function register() {
  router.push({ path: '/register' });
}

function incioDeSesion() {
  router.push('/login');
}
</script>

<template>
  <div class="header">
    <h1 class="logo">RecordaApp</h1>
    <nav>
      <router-link to="/" class="nav-link">Inicio</router-link>
      <router-link v-if="usuario" to="/ListaNotas" class="nav-link">Mis Notas</router-link>
    </nav>

    <div class="user-section">
      <div v-if="usuario" class="welcome">
        Bienvenido {{ usuario.displayName }}
        <button @click="cerrarSesion()" class="logout-button">Cerrar Sesión</button>
      </div>
      <div v-else class="auth-buttons">
        <button @click="register()" class="auth-button">Registrarse</button>
        <button @click="incioDeSesion()" class="auth-button">Iniciar Sesión</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: black;
  color: #fff;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 2em;
  margin: 0;
}

nav {
  display: flex;
}

.nav-link {
  margin-right: 20px;
  color: #fff;
  text-decoration: none;
  font-size: 1.2em;
}

.user-section {
  display: flex;
  align-items: center;
}

.welcome {
  margin-right: 20px;
}

.logout-button, .auth-button {
  background-color: #fff;
  color:      #e74c3c ; /*rojo*/
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.logout-button:hover, .auth-button:hover {
  background-color: #e74c3c; /*rojo*/
  color: #fff;
}
</style>
