<template>

    <div class="login d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">

        <!-- Auth Navigation -->
        <div class="auth-nav mb-4">
            <button @click="$router.push('/login')" :class="isLogin ? 'btn btn-secondary' : 'btn btn-light'"
                class="me-2">Login</button>
            <button @click="$router.push('/register')"
                :class="!isLogin ? 'btn btn-warning' : 'btn btn-light'">Register</button>
        </div>

        <!-- Login Card -->
        <div class="login-content bg-white rounded shadow p-3 pb-1" style="width: 400px;">
            <h3 class="text-center mb-4">Login</h3>
            <form class="mb-3">
                <!-- Email Input -->
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" placeholder="you@example.com" v-model="email" class="form-control"
                        required>
                </div>

                <!-- Password Input -->
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" v-model="password" placeholder="**********"
                        class="form-control" required>
                </div>

                <!-- Remember Me -->
                <div class="form-check mb-3">
                    <input type="checkbox" id="checkbox" class="form-check-input">
                    <label for="checkbox" class="form-check-label">Remember Me</label>
                </div>

                <!-- Login Button -->
                <div class="mb-4">
                    <button type="submit" class="btn btn-warning w-100">Login</button>
                </div>

                <!-- Alternate Log In -->
                <div class="alternate-log-in d-flex flex-column align-items-center">
                    <button class="btn btn-danger w-100 mb-2">
                        <i class="bi bi-google"></i> Continue with Google
                    </button>
                    <button class="btn btn-primary w-100">
                        <i class="bi bi-facebook"></i> Continue with Facebook
                    </button>

                    <p class="mt-3"><router-link to="/" class="text-decoration-none "
                            style="color: #000000 ;"><strong>Click</strong></router-link> to continue without login</p>
                </div>
            </form>
        </div>
    </div>
</template>




<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

const isLogin = ref(true); // Başlangıçta login sayfasında kalması için
const email = ref("");
const password = ref("");
</script>





<style scoped>
.login {
    background-color: #f8f9fa;
    /* Sayfa arka plan rengi */
}

.login-content {
    background-color: #ffffff;
    /* Kart arka plan rengi */
    border-radius: 8px;
    /* Yuvarlatılmış köşeler */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Gölgelendirme efekti */
}

.login-content::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 165, 0, 0.1);
    z-index: -1;
    border-radius: 8px;
}

input:focus {
    outline: none;
    box-shadow: none;
}
</style>
