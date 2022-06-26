import { NuxtConfig } from "@nuxt/types"

import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin"

const config: Omit<NuxtConfig, "env"> = {
  target: "static",
  srcDir: "./",
  head: {
    title: "Indicium - De studievereniging voor ICT bij Hogeschool Utrecht",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicons/favicon.ico"
      },
      {
        rel: "apple-touch-icon",
        type: "image/x-icon",
        href: "/favicons/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicons/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon-16x16.png"
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicons/favicon.ico"
      },
      {
        rel: "manifest",
        href: "/favicons/site.webmanifest"
      }
    ],
    script: [
      {
        src: "/config.js",
        defer: false
      }
    ]
  },

  css: [
    "~/assets/scss/main.scss"
  ],

  plugins: [
    "plugins/filters",
    "plugins/event-bus",
    "plugins/full-calendar",
    "plugins/slick",
    "plugins/api-clients"
  ],

  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/axios",
    "@nuxtjs/google-analytics",
    "@nuxtjs/gtm"
  ],

  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/eslint-module"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/"
  },

  generate: {
    // routes: () => {
    //   return axios.get('http://localhost:3000/content.json') // not working :(
    //     .then(res => {
    //       return res.data.pages.map(page => {
    //         return {
    //           route: page.slug,
    //           payload: page
    //         }
    //       })
    //     })
    // }
  },
  i18n: {
    defaultLocale: "nl-NL",
    langDir: "i18n/",
    lazy: true,
    locales: [
      {
        code: "nl-NL",
        iso: "nl-NL",
        file: "nl-NL.ts"
      }
    ],
    vueI18n: {
      fullbackLocale: "nl-NL",
      silentFallbackWarn: true,
      dateTimeFormats: {
        "nl-NL": {
          short: {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          },
          full: {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
          }
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
    parallel: true,
    cache: true,
    hardSource: true,
    components: false,
    transpile: [
      "lodash-es"
    ],
    extend(webpackConfig: any, _ctz: any): void {
      webpackConfig.resolve!.plugins = [
        new TsconfigPathsPlugin()
      ]
    }
  },
  googleAnalytics: {
    id: "UA-147953098-1"
  },
  gtm: {
    id: "GTM-TPDRMLG"
  }
}

export default config
