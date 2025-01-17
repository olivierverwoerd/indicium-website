<template>
  <nav :class="'nav'">
    <div class="container flex" @click="$eventBus.$emit('nav-toggle', false)">
      <div v-show="!isHome" class="logo">
        <n-link to="/">
          <img :src="logoUrl" alt="Indicium Logo" />
        </n-link>
      </div>

      <div v-show="isHome" class="logo">
        <img :src="logoUrl" alt="Indicium Logo" />
      </div>

      <ul>
        <li v-for="item in items" :key="item.title + item.url + item.childs">
          <a
            v-if="item.url.startsWith('http')"
            :href="item.url"
            target="_blank"
          >
            {{ item.title }}
          </a>

          <n-link v-else :to="item.url">
            {{ item.title }}
          </n-link>

          <span v-if="item.childs" prefetch class="drop-icon-desktop-header"
            >▾</span
          >

          <ul class="sub-menu">
            <li
              class="sub-menu-li"
              v-for="child in item.childs"
              :key="child.title + child.url + child.childs + child.childs_side"
            >
              <label
                v-if="child.childs && child.childs_left"
                title="Toggle Drop-down"
                class="drop-icon"
                >◂</label
              >

              <a
                v-if="child.url.startsWith('http')"
                :href="child.url"
                target="_blank"
              >
                {{ child.title }}
              </a>

              <n-link v-else :to="item.url">
                {{ child.title }}
              </n-link>

              <label
                v-if="child.childs && !child.childs_left"
                title="Toggle Drop-down"
                class="drop-icon"
                >▸</label
              >

              <ul v-if="!child.childs_left" class="sub-sub-menu">
                <li
                  class="sub-sub-menu-li"
                  v-for="grand_child in child.childs"
                  :key="grand_child.title + grand_child.url"
                >
                  <a
                    v-if="grand_child.url.startsWith('http')"
                    :href="grand_child.url"
                    target="_blank"
                  >
                    {{ grand_child.title }}
                  </a>

                  <n-link v-else :to="item.url">
                    {{ grand_child.title }}
                  </n-link>
                </li>
              </ul>

              <ul v-if="child.childs_left" class="sub-sub-menu-left">
                <li
                  class="sub-sub-menu-li"
                  v-for="grand_child in child.childs"
                  :key="grand_child.title + grand_child.url"
                >
                  <a
                    v-if="grand_child.url.startsWith('http')"
                    :href="grand_child.url"
                    target="_blank"
                  >
                    {{ grand_child.title }}
                  </a>

                  <n-link v-else :to="item.url">
                    {{ grand_child.title }}
                  </n-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
/* eslint-disable */
import menu from "../content/menu.json";
export default {
  name: "Nav",
  computed: {
    isHome() {
      return this.$route.path === "/";
    },
    isMobile() {
      return process.browser ? window.innerWidth < 700 : false;
    },
  },
  mounted() {
    this.$eventBus.$on("dark-mode", (payload) => {
      const isDarkmode = payload;
      this.$set(
        this,
        "logoUrl",
        isDarkmode
          ? "/logo/indicium-logo-left-dark.svg"
          : "/logo/indicium-logo-left.svg"
      );
    });
    const items = menu.items;
  },
  data() {
    return menu;
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.nav {
  display: block;
  z-index: 1000;
  background: var(--root-background-color);
  box-shadow: inset 0 -2px 0 var(--indi-blue-1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  .logo {
    img {
      max-width: 204px;
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .container.flex {
    position: relative;
    /* center the menu if made bigger
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    */
    padding: 0 10px;
  }

  ul {
    display: flex;
    margin: 0;
    justify-content: space-between;
    align-items: center;
    overflow: auto;

    a:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    a:focus-within {
      outline: none;
      text-decoration: underline overline;
    }

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      width: 150px;
      padding-top: 15px;
      padding-bottom: 15px;
      a {
        top: 50%;
        display: flex;
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-color);
        text-align: center;
        text-decoration: none;
      }
    }

    li:hover,
    li:focus-within {
      .sub-menu {
        display: list-item;
        opacity: 1;
        visibility: visible;
        width: 200px;

        .sub-menu-li {
          width: 100%;
          height: auto;
          .a {
            text-decoration: none;
            width: 100%;
          }
        }
      }
    }

    .sub-menu {
      display: list-item;
      position: absolute;
      align-items: center;
      flex-direction: column;
      background: var(--root-background-color);
      top: 100%;
      box-shadow: inset 0 0 0 2px var(--indi-blue-green-1);
      opacity: 1;
      visibility: hidden; /*hidden   inset 0 -2px 0 var(--indi-blue-1);*/
      z-index: 1;
      overflow: visible;

      a {
        padding-left: 15px;
        padding-right: 15px;
      }

      li:hover,
      li:focus-within {
        .sub-sub-menu {
          opacity: 1;
          visibility: visible;
          width: 200px;

          .sub-sub-menu-li {
            width: 100%;
            height: auto;
            .a {
              text-decoration: none;
              width: 100%;
            }
          }
        }
        .sub-sub-menu-left {
          opacity: 1;
          visibility: visible;
          width: 200px;

          .sub-sub-menu-li {
            width: 100%;
            height: auto;
            .a {
              text-decoration: none;
              width: 100%;
            }
          }
        }
      }
    }

    .sub-sub-menu {
      /*display: none;*/
      position: absolute;
      flex-direction: column;
      background: var(--root-background-color);
      left: 100%;
      margin-top: 48px;
      /* // todo put it better nex to eachther*/
      box-shadow: inset 0 0 0 2px var(--indi-green-1);
      opacity: 1;
      visibility: hidden; /*hidden   inset 0 -2px 0 var(--indi-blue-1);*/
      z-index: 2;

      a {
        padding-left: 15px;
        padding-right: 15px;
      }

      li {
        width: 200px;
      }
    }

    .sub-sub-menu-left {
      /*display: none;*/
      position: absolute;
      flex-direction: column;
      background: var(--root-background-color);
      left: -100%;
      margin-top: 48px;
      /* // todo put it better nex to eachther*/
      box-shadow: inset 0 0 0 2px var(--indi-green-1);
      opacity: 1;
      visibility: hidden; /*hidden   inset 0 -2px 0 var(--indi-blue-1);*/
      z-index: 2;

      a {
        padding-left: 15px;
        padding-right: 15px;
      }

      li {
        width: 200px;
      }
    }
  }

  .close {
    cursor: pointer;
    display: none;
  }

  @media screen and (max-width: $bp-tablet-md) {
    display: block;
    visibility: hidden;
  }
}
</style>
