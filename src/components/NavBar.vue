<template>
  <div class="nav">
    <a href="/">
      <img src="/img/airbnb.png" alt="" />
    </a>
    <div class="menu">
      <div class="switch">
        <el-switch
          v-model="lightMode"
          active-color="#555555"
          inactive-color="#555555"
          :active-value="true"
          :inactive-value="false"
        >
        </el-switch>
        <img
          :class="lightMode ? 'hide' : ''"
          class="sunny"
          src="/img/sunny-icon.svg"
          alt=""
        />
        <img
          :class="!lightMode ? 'hide' : ''"
          class="night"
          src="/img/night-icon.svg"
          alt=""
        />
      </div>
      <div class="nav-items" v-for="item of navItems" :key="item.link" @click="$router.push(`/${item.link}`)">
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { Switch } from "element-ui";
export default {
  name: "NavBar",
  components: {
    ElSwitch: Switch,
  },
  props: {},
  data() {
    return {
      lightMode: true,
      navItems: [
        {
          link: "host",
          description: "Becomes a host",
        },
        {
          link: "help",
          description: "Help",
        },
        {
          link: "register",
          description: "Sign up",
        },
        {
          link: "login",
          description: "Login",
        },
      ],
    };
  },
  watch: {
    lightMode(nVal) {
      console.log(nVal);
    },
  },
};
</script>

<style lang="scss">
.nav {
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 34px;
    height: 34px;
  }
  .menu {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .switch {
      position: relative;
      margin-right: 36px;
      transition-duration: all 0.2s ease-in-out;

      .sunny {
        position: absolute;
        width: 16px;
        height: 16px;
        right: 2px;
        top: 50%;
        transform: translateY(-50%);
        transition-duration: all 0.2s ease-in-out;
      }
      .night {
        position: absolute;
        width: 16px;
        height: 16px;
        left: 2px;
        top: 50%;
        transform: translateY(-50%);
        transition-duration: all 0.2s ease-in-out;
      }
      .hide {
        display: none;
      }
    }
    .nav-items {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #ffffff;
      margin-right: 36px;
      cursor: pointer;
    }
  }
}
</style>
