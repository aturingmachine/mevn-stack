<template>
  <v-snackbar
    class="mb-10"
    v-model="snackbar"
    transition="bounce-transition"
    :color="opts.color"
    app
    tile
    bottom
    :timeout="opts.timeout || -1"
  >
    {{ opts.text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="bright" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { SnackbarService } from '../../services/snackbar.service'
export default {
  name: 'SnackBar',

  data: () => ({
    snackbar: false,
    opts: {
      text: '',
      color: 'success',
    },
  }),

  methods: {
    showSnackbar(options) {
      this.snackbar = false
      console.log('inside showSnackbar')
      setTimeout(() => {
        this.opts = { ...this.opts, ...options }
        this.opts.timeout = this.opts.timeout || -1
        this.opts.timeout--
        this.opts.timeout++
        this.snackbar = true
      })
    },
  },

  mounted() {
    SnackbarService.on(this.showSnackbar)
  },
}
</script>
