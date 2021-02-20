<template>
  <div class="home">
    <div v-if="!lightMode" class="backdrop"></div>
    <img
      ref="bg"
      class="bg"
      src="/img/background.jpg"
      :style="`height:${windowHeight}`"
      alt=""
    />
    <nav-bar
      :lightMode="lightMode"
      @changeMode="lightMode = !lightMode"
    ></nav-bar>
    <my-autocomplete v-model="lightMode"></my-autocomplete>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import MyAutocomplete from "../components/MyAutocomplete.vue";
export default {
  name: "Home",
  components: {
    NavBar,
    MyAutocomplete,
  },
  mounted() {
    //set dynamic height for background image to prevent mobile keyboard resizes the bg
    if (window.innerWidth < 480) {
      console.log('run this.')
      this.windowHeight = window.innerHeight + "px";
    } else {
      console.log('run else')
      this.windowHeight = "100vh";
    }
  },
  data() {
    return {
      lightMode: true,
      windowHeight: "2px",
    };
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    z-index: 0;
  }
  img.bg {
    position: absolute;
    width: 100vw;
    height: 100%;
    z-index: -1;
  }
}
</style>
