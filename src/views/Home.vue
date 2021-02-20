<template>
  <div class="home">
    <div v-if="!lightMode" class="backdrop"></div>
    <nav-bar :lightMode="lightMode" @changeMode="lightMode = !lightMode"></nav-bar>
    <my-autocomplete v-model="lightMode"></my-autocomplete>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import MyAutocomplete from '../components/MyAutocomplete.vue'
export default {
  name: "Home",
  components: {
    NavBar,
    MyAutocomplete
  },
  data() {
    return {
      lightMode: false
    }
  }
};
</script>

<style lang="scss">
.home {
  position: relative;
  height: 100%;
  background: url("/img/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    z-index: 0;
  }
}
</style>
