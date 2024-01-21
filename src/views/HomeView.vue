<script setup>
// Puedes agregar lógica adicional aquí
</script>

<template>
  <div class="landing-page">
    <div class="content">
      <div class="text">
        <h1 class="animated-text">RecordaApp</h1>
        <p>Tu aplicación de recordatorios personal</p>

        <section>
          <h2>Características Principales</h2>
          <ul>
            <li>Organiza tus tareas y recordatorios de manera fácil.</li>
            <li>Establece prioridades para tus tareas.</li>
            <li>Marca tareas como completadas cuando hayas terminado.</li>
          </ul>
        </section>

        <section>
          <h2>¡Comienza Ahora!</h2>
          <p>Regístrate o inicia sesión para empezar a utilizar RecordaApp y mantener tus tareas al día.</p>
          
        </section>
      </div>

      <div class="image-container">
        <img src="https://fotografias.lasexta.com/clipping/cmsimages01/2019/10/25/17B3C1D4-8C29-4226-978D-97DB7076EB10/98.jpg?crop=1300,731,x0,y8&width=1900&height=1069&optimize=high&format=webply" alt="Ilustración RecordaApp" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Puedes agregar estilos adicionales aquí */
.landing-page {
  display: flex;
  font-size: 1.5rem;
  border-radius: 90px;
  background-color: #e74c3c; /* Color rojo principal */
  color: #fff;
  padding: 50px 0;
  height: 70vh;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  flex-basis: 60%;
  text-align: left;
}

h1 {
  font-size: 3em;
  margin-bottom: 10px;
}

.animated-text {
  animation: fadeInLeft 1.5s ease-out;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

section {
  margin: 30px 0;
}

h2 {
  font-size: 2em;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.image-container {
  flex-basis: 40%;
  text-align: right;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>




