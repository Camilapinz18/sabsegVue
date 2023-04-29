<script setup>
import AboutUs from '../components/AboutUs.vue';
import Header from '../components/Header.vue';
import Gallery from '../components/Gallery.vue';
import Services from '../components/Services.vue';
import Contact from '../components/Contact.vue';
import Memberships from '../components/Memberships.vue';
import Productions from '../components/Productions.vue'
import Footer from '../components/Footer.vue';

</script>

<template>
  <Header />
  <AboutUs />
  <Services />
  <Gallery />
  <Productions />
  <Contact />
  <Footer />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
