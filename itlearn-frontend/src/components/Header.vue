<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'pl', label: 'Polski' },
]

const currentLang = ref(languages[0])
const route = useRoute()
const router = useRouter()

const searchQuery = ref('')

function onSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value.trim() } })
    searchQuery.value = ''
  }
}

function selectLanguage(lang) {
  currentLang.value = lang
}
</script>

<template>
  <header class="navbar navbar-expand bg-white shadow-sm fixed-top border-bottom px-4">
    <div class="container-fluid d-flex justify-content-between align-items-center">

      <!-- Logo -->
      <router-link to="/" class="navbar-brand d-flex align-items-center fw-bold text-primary fs-4">
        <img src="../assets/logo.png" style="width: 40px; height: auto;" alt="Logo" class="me-2" />
        <span>IT Learn</span>
      </router-link>

      <!-- Menu -->
      <ul class="navbar-nav flex-row gap-4">
        <li class="nav-item">
          <router-link to="/courses" class="nav-link text-dark" :class="{ active: route.path === '/courses' }">
            Courses
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/leaderboard" class="nav-link text-dark" :class="{ active: route.path === '/leaderboard' }">
            Leaderboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile" class="nav-link text-dark" :class="{ active: route.path === '/profile' }">
            Profile
          </router-link>
        </li>
      </ul>

      <div class="d-flex align-items-center gap-3">
        <!-- Searchbar -->
        <form class="d-flex" @submit.prevent="onSearch">
          <input
            v-model="searchQuery"
            type="search"
            class="form-control form-control-sm me-2"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-primary btn-sm" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </form>

        <!-- Messages -->
        <button class="btn btn-outline-secondary btn-sm rounded-circle p-2" type="button" aria-label="Notifications">
          <i class="bi bi-bell"></i>
        </button>

        <!-- Avatar -->
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          class="rounded-circle"
          width="40"
          height="40"
        />

        <!-- Change language submenu -->
        <div class="dropdown">
          <button
            class="btn btn-outline-secondary btn-sm dropdown-toggle"
            type="button"
            id="languageDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ currentLang.label }}
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
            <li v-for="lang in languages" :key="lang.code">
              <a href="#" class="dropdown-item" @click.prevent="selectLanguage(lang)">
                {{ lang.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link:hover {
  color: #0d6efd;
  cursor: pointer;
}

.nav-link.active {
  font-weight: 600;
  color: #0d6efd;
  border-bottom: 2px solid #0d6efd;
  padding-bottom: 4px;
}

img:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
</style>
