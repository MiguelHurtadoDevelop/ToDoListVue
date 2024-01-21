<script setup>
import { useCollection } from 'vuefire'
import { collection, addDoc, query, where, doc, updateDoc, deleteDoc} from 'firebase/firestore'
import { useFirestore, getCurrentUser } from 'vuefire'
import { getAuth, signInWithPopup } from "firebase/auth";


let usuario = getAuth().currentUser
const db = useFirestore()
let col = collection(db, 'todos');
  let que = query(col,where("usuario", "==", usuario.uid));

  const todos = useCollection(que);
 let miNuevaNota = "";


function nuevaNota()
{
  const docRef = addDoc(collection(db, "todos"), {
      text: miNuevaNota,
      prioridad: "Media",
      usuario: usuario.uid
  });
  miNuevaNota = "";
}

async function cambiarPrioridad(index, prioridad) {
  let prioridadTexto = "Media";
  if(prioridad == 0) {
    prioridadTexto = "Baja";
  } else if(prioridad == 1) {
    prioridadTexto = "Media";
  } else if(prioridad == 2) {
    prioridadTexto = "Alta";
  }

  const nota = todos.value[index];
  const notaRef = doc(db, 'todos', nota.id);
  await updateDoc(notaRef, { prioridad: prioridadTexto });
}

async function eliminarTarea(index) {
  const nota = todos.value[index];
  const notaRef = doc(db, 'todos', nota.id);
  await deleteDoc(notaRef);
}

async function completarTarea(index) {
  const nota = todos.value[index];
  const notaRef = doc(db, 'todos', nota.id);
  await updateDoc(notaRef, { completada: !nota.completada });
}

async function eliminarTareasCompletadas() {
  const tareasCompletadas = todos.value.filter(todo => todo.completada);

  for (const tarea of tareasCompletadas) {
    const notaRef = doc(db, 'todos', tarea.id);
    await deleteDoc(notaRef);
  }
}

</script>

<template>
  <div class="notas-app">
    <input type="text" v-model="miNuevaNota" @keyup.enter="nuevaNota" placeholder="Agregar nueva nota">
    <button @click="nuevaNota" class="rojo">Nueva Nota</button>
    <p>Notas de {{ usuario.displayName }}</p>
    <button @click="eliminarTareasCompletadas()" class="rojo">Eliminar Tareas Completadas</button>

    <ul class="lista-notas">
      <li v-for="(todo, index) in todos" :key="index" class="nota-item">
        <div class="nota-info">
          <h2>{{ todo.text }}</h2>
          <p>Prioridad: {{ todo.prioridad }}</p>
          <button @click="cambiarPrioridad(index, 0)" class="rojo">Baja</button>
          <button @click="cambiarPrioridad(index, 1)" class="rojo">Media</button>
          <button @click="cambiarPrioridad(index, 2)" class="rojo">Alta</button>
          <p>Completada: {{ todo.completada ? 'Sí' : 'No' }}</p>
        </div>
        <div class="nota-buttons">
          
          <button @click="eliminarTarea(index)" class="rojo">Eliminar</button>
          <button @click="completarTarea(index)" class="rojo">{{ todo.completada ? 'Desmarcar' : 'Completar' }}</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.notas-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

input {
  padding: 10px;
  margin-right: 10px;
  width: 60%;
}

button {
  padding: 10px;
  cursor: pointer;
  background-color: #e74c3c; /* Rojo */
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

button:hover {
  background-color: #c0392b; /* Tono más oscuro de rojo al pasar el mouse */
}

.rojo {
  background-color: #e74c3c;
}

.lista-notas {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.nota-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.nota-info {
  flex-basis: 70%;
}

.nota-buttons {
  flex-basis: 30%;
  display: flex;
  flex-direction: column; /* Cambio a disposición en columna */
  align-items: flex-end; /* Alineación a la derecha */
}

.nota-buttons button {
  width: 100%;
  margin-bottom: 5px;
}
</style>
```