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
        bright: colors.shades.white,
        success: colors.green.base,
        info: colors.lightBlue.base,
        error: colors.red.base,
      },
      dark: {
        primary: colors.blueGrey.darken3,
        secondary: colors.grey.darken2,
        accent: colors.blue.darken4,
        bright: colors.shades.white,
        success: colors.green.darken2,
        info: colors.purple.darken2,
        error: colors.red.darken1,
      },
    },
  },
})
