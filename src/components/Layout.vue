<template>
  <main>
    <Header />
    <slot />
  
  </main>
  
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';

export default defineComponent({
  components: {
    Header,
    Footer,
  },
})
</script>