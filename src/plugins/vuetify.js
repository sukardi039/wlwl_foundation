import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import colors from 'vuetify/lib/util/colors'

const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          // primary: colors.grey.lighten2,
          // secondary: colors.grey.darken1,
          // accent: colors.shades.black,
          // error: colors.red.accent3,
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          },
        dark: {
          primary: colors.blue.lighten3,
        },
      },
    },
  })

export default new Vuetify({
//   theme:{dark:true}
});
