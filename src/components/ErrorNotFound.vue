<template>
<div class="row justify-content-center">
    <div class="col-12 col-md-6 col-xl-6 my-5">
        
        <div class="text-center">
        
        <!-- Preheading -->
        <h6 class="text-uppercase text-muted mb-4">
            404 error
        </h6>

        <!-- Heading -->
        <h1 class="display-4 mb-3">
            Pagina no encontrada 😭
        </h1>

        <!-- Subheading -->
        <p class="text-muted mb-4">
            Looks like you ended up here by accident? 
        </p>

        <!-- Button -->
        <router-link to="/dashboard" class="btn btn-lg btn-primary text-white">
            Regresar al dashboard</router-link>
        
        
        </div>

    </div>
</div>
</template>
<script>
export default {
  name: "ErrorNotFound",
};
</script>