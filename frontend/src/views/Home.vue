<template>
    <div class="app container-fluid">
        <header class="row">
            <div class="col-12">
                <HeaderPage />
            </div>
        </header>
        <main class="row">
            <div class="col-12">
                <ContentPage />
            </div>
        </main>
        <footer class="row">
            <div class="col-12">
                <FooterPage />
            </div>
        </footer>
    </div>
</template>

<script setup>
import ContentPage from '../components/Content.vue'
import FooterPage from '../components/Footer.vue'
import HeaderPage from '../components/Header.vue'
</script>
