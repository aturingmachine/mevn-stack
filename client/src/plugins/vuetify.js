import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken3,
        secondary: colors.blueGrey.darken1,
        accent: colors.lightBlue.accent4,
        lightText: colors.shades.white,
        darkText: colors.shades.black,
        success: colors.green.base,
        error: colors.red.base,
      },
      dark: {
        primary: colors.blueGrey.darken3,
        secondary: colors.grey.darken2,
        accent: colors.blue.darken4,
        lightText: colors.shades.white,
        darkText: colors.shades.black,
        success: colors.green.darken2,
        error: colors.red.darken1,
      },
    },
  },
})
