<template>
    <div class="register d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">


        <!-- Auth Navigation -->
        <div class="auth-nav mb-4">
            <button @click="$router.push('/login')" :class="isRegister ? 'btn btn-light' : 'btn btn-warning'"
                class="me-2">Login</button>
            <button @click="$router.push('/register')"
                :class="!isRegister ? 'btn btn-light' : 'btn btn-secondary'">Register</button>
        </div>

        <!-- Register Card -->
        <div class="register-content bg-white rounded shadow p-4 pb-1 " style="width: 400px;">
            <h3 class="text-center mb-4">Register</h3>
            <form class="mb-3" @submit.prevent="handleSubmit">
                <!-- Name Input -->
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" id="name" placeholder="Your Name" v-model="name" class="form-control">
                </div>

                <!-- Email Input -->
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" placeholder="you@example.com" v-model="email" class="form-control">
                </div>

                <!-- Password Input -->
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" v-model="password" placeholder="**********"
                        class="form-control">
                </div>

                <!-- Confirm Password Input -->
                <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="**********"
                        class="form-control">
                </div>

                <!-- Register Button -->
                <div class="mb-3">
                    <button type="submit" class="btn btn-warning w-100">Register</button>
                </div>

                <!-- Alternate Log In -->
                <div class="alternate-log-in d-flex flex-column align-items-center">
                    <button @click="googleLogin" class="btn btn-danger w-100 mb-2">
                        <i class="bi bi-google"></i> Continue with Google
                    </button>
                    <button @click="facebookLogin" class="btn btn-primary w-100">
                        <i class="bi bi-facebook"></i> Continue with Facebook
                    </button>
                    <p class="mt-3"><router-link to="/" class="text-decoration-none "
                            style="color: #000000 ;"><strong>Click</strong></router-link> to continue without register
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import axios from 'axios';

const router = useRouter();

const isRegister = ref(true); // Başlangıçta register sayfasında kalması için
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Kayıt işlemini gerçekleştiren fonksiyon

const googleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
}
const handleSubmit = async () => {
    // Şifreler eşleşiyor mu kontrolü
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
    }
    try {
        // Backend'e POST isteği gönderme
        const response = await axios.post('http://localhost:3000/users/register', {
            name: name.value,
            email: email.value,
            password: password.value,
        });
        console.log("User created: ", response.data);
        router.push('/login'); 
    } catch (error) {
        console.error("Registration error:", error);
        console.log(error.response);
    }
    name.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";

};
</script>

<style scoped>
.register {
    background-color: #f8f9fa;
    /* Sayfa arka plan rengi */
}

.register-content {
    background-color: #ffffff;
    /* Kart arka plan rengi */
    border-radius: 8px;
    /* Yuvarlatılmış köşeler */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Gölgelendirme efekti */
}

.register-content::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 165, 0, 0.1);
    /* Dış çevre rengi */
    z-index: -1;
    /* Arkada kalması için */
    border-radius: 8px;
    /* Dış çevrenin yuvarlatılmış köşeleri */
}

input:focus {
    outline: none;
    box-shadow: none;
}
</style>
