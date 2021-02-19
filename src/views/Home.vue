<template>
  <div class="home">
    <nav-bar></nav-bar>
    <my-autocomplete></my-autocomplete>
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
  props: {}
};
</script>

<style lang="scss">
.home {
  height: 100%;
  background: url("/img/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
