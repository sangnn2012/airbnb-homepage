<template>
  <div class="my-autocomplete" :class="value ? '' : 'dark-mode'">
    <div class="input-wrapper">
      <input
        @input="debounceInput"
        v-model="searchText"
        type="text"
        placeholder="Try Vietnam"
        :style="isDropdown ? 'border-radius: 4px 4px 0px 0px;' : ''"
      />
      <img
        class="search-icon"
        :src="`/img/search${value ? '' : '-dark'}.png`"
        alt=""
      />
      <div class="dropdown-list" v-show="isDropdown">
        <div
          class="dropdown-item"
          v-for="(prov, index) of filteredProvinces"
          :key="prov.noaccent"
          :style="
            index + 1 === filteredProvinces.length ? 'margin-bottom: 0;' : ''
          "
          @click="chooseProvince($event, prov.fullname)"
        >
          {{ prov.fullname }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import provinces from "../assets/data.js";
import _ from "lodash";
import ClickOutside from "vue-click-outside";
export default {
  name: "NavBar",
  components: {},
  directives: {
    ClickOutside,
  },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.provinces = JSON.parse(JSON.stringify(provinces));
    this.provinces = this.provinces.map((x) => ({
      fullname: x,
      noaccent: this.removeAccents(x),
    }));
  },
  data() {
    return {
      searchText: "",
      isDropdown: false,
      provinces: [],
    };
  },
  methods: {
    removeAccents(str) {
      var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ",
        "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ",
      ];
      for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
      }
      str = str.replace(/\s/g, "");
      return str.toLowerCase();
    },
    debounceInput: _.debounce(function (e) {
      this.searchText = e.target.value;
    }, 500),
    chooseProvince(e, name) {
      console.log(e);
      e.preventDefault();
      this.searchText = name;
      this.isDropdown = false;
    },
  },
  computed: {
    filteredProvinces() {
      let choseText = false;
      this.provinces.forEach((prov) => {
        if (prov.fullname === this.searchText) {
          choseText = true;
        }
      });
      if (this.searchText.length === 0 || choseText) {
        return [];
      }
      const searchTerm = this.removeAccents(this.searchText);
      return this.provinces.filter((prov) =>
        prov.noaccent.includes(searchTerm)
      );
    },
  },
  watch: {
    filteredProvinces: {
      deep: true,
      handler(nVal) {
        console.log("run", nVal);
        if (nVal.length > 0) return (this.isDropdown = true);
        return (this.isDropdown = false);
      },
    },
    isDropdown(nVal) {
      console.log("dropdown: ", nVal);
    },
  },
};
</script>

<style lang="scss">
.my-autocomplete {
  text-align: center;
  margin: 170px auto;
  &.dark-mode {
    & .input-wrapper {
      input {
        color: #cdcdcd;
        background: #0e0e0e;
        border: 1px solid #565656;
      }
    }
    & .dropdown-list {
      background: #1b1b1b !important;
      border: 1px solid #565656 !important;
      .dropdown-item {
        color: #cdcdcd;
      }
    }
  }
  .input-wrapper {
    position: relative;
    display: inline-block;
    width: 50%;
    input {
      width: 100%;
      background: #f8f8f8;
      border: 1px solid #e3dfdf;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 19px 19px 19px 62px;
      font-size: 20px;
      font-weight: bold;
      z-index: 1;
      &:focus {
        outline: none !important;
      }
      &::placeholder {
        font-weight: normal;
      }
    }
    img {
      width: 26px;
      height: auto;
      position: absolute;
      left: 21px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }
    .dropdown-list {
      width: 100%;
      background: #ffffff;
      border: 1px solid #ebebeb;
      box-sizing: border-box;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      border-radius: 0px 0px 4px 4px;
      position: absolute;
      z-index: 0;
      top: 100%;
      text-align: left;
      padding: 30px 20px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 21px;
      color: #484848;

      max-height: 40vh;
      overflow-y: scroll;
      .dropdown-item {
        margin-bottom: 20px;
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .my-autocomplete {
    .input-wrapper {
      width: 80%;
      input {
        padding: 15px 15px 15px 45px;
        font-size: 15px;
      }
      img {
        width: 20px;
        left: 15px;
      }
      .dropdown-list {
        font-size: 14px;
        padding: 10px 15px;
        .dropdown-item {
          margin: 10px;
        }
      }
    }
  }
}
</style>
