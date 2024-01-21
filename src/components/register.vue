<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const email = ref(''); // Define la variable email
const password = ref(''); // Define la variable password
const displayName = ref(''); // Define la variable displayName

function crearUsuario() {
  console.log("Registrando");
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      // Obtén el usuario recién creado
      const user = userCredential.user;

      // Actualiza el perfil del usuario con el displayName
      await updateProfile(user, { displayName: displayName.value });

      console.log('Usuario registrado:', user);

      // Puedes redirigir al usuario o realizar otras acciones después del registro
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error('Error al registrar el usuario:', errorCode, errorMessage);
    });
}
</script>

<template>
  <div class="register-form">
    <h3>Registro</h3>
    <input placeholder="Email" type="email" v-model="email" class="input-field">
    <input placeholder="Contraseña" type="password" v-model="password" class="input-field">
    <input placeholder="Nombre" type="text" v-model="displayName" class="input-field">
    <button @click="crearUsuario" class="submit-button">Crear Usuario</button>
  </div>
</template>

<style scoped>
.register-form {
  max-width: 30%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h3 {
  text-align: center;
  color: #333;
}

.input-field {
  width: 94%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #e74c3c; /* Verde */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.submit-button:hover {
  background-color: #c0392b; /* Tono más oscuro de verde al pasar el mouse */
}
</style>


