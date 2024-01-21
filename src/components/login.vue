<script setup>
import { ref } from 'vue';
import { getAuth} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { useRouter } from 'vue-router';


const router = useRouter();
const auth = getAuth();
const provider = new GoogleAuthProvider();

const email = ref(''); // Define la variable email
const password = ref(''); // Define la variable password



function iniciarSesion(){
  console.log("iniciando sesion");
  
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.push({ path: '/listaNotas' }).catch(error => {
      console.error("Error al navegar: ", error);
    });
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
  });
}
    function iniciarSesionConGoogle()
    {
        
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          router.push({ path: '/listaNotas' }).catch(error => {
            console.error("Error al navegar: ", error);
          });
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);

          console.log(errorCode);
          // ...
        });
    
    }

</script>

<template>
  <div class="login-form">
    <h3>Iniciar Sesión</h3>
    <input placeholder="Email" type="email" v-model="email" class="input-field">
    <input placeholder="Contraseña" type="password" v-model="password" class="input-field">
    <button @click="iniciarSesion" class="submit-button">Iniciar Sesión</button>
    <button @click="iniciarSesionConGoogle" class="google-button">Iniciar Sesión con Google</button>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 300px;
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

.submit-button, .google-button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #e74c3c; /* Rojo */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.submit-button:hover, .google-button:hover {
  background-color: #c0392b; /* Tono más oscuro de rojo al pasar el mouse */
}

</style>
```