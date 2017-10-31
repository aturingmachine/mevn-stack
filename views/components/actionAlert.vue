<template>
  <v-alert
    color=alertSettings.color
    dismissible
    icon=alertSettings.icon
    transition=scale-transition
  >
      {{ alertSettings.callName }} was a
      <span v-if="alertSettings.color == 'success'"> success. </span>
      <span v-else> failure. </span>
  </v-alert>
</template>

<script>
export default {
  props: {
    alertSettings: {
      type: Object
    }
  }
}
</script>