<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid d-flex align-items-center">
            <!-- Logo -->
            <router-link to="/" class="navbar-brand">
                <img src="../assets/logo.jpg" alt="Logo" width="100" height="40" class="d-inline-block align-text-top">
            </router-link>


            <!-- Search Bar (Logonun Yanında) -->
            <form class="d-flex ms-3" style="width: 300px;">
                <div class="input-group">
                    <span class="input-group-text">
                        <i class="bi bi-search"></i>
                    </span>
                    <input class="form-control no-outline" type="search" placeholder="Search" aria-label="Search">
                </div>
            </form>

            <!-- Account Buttons -->
            <div class="d-flex ms-auto">
                <router-link to="/login" class="btn btn-outline-secondary me-2 ">Log In</router-link>
                <router-link to="/register" class="btn btn-outline-secondary me-2">Sign Up</router-link>
            </div>
            <!-- Cart Icon -->
            <div class="ms-3">
                <router-link to="/cart" class="btn btn-outline-secondary">
                    <i class="bi bi-cart"></i>
                </router-link>

            </div>
        </div>
    </nav>
</template>
