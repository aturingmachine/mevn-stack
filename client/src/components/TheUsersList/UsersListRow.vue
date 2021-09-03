<template>
  <v-list-item class="user-row">
    {{ user.name }}
  </v-list-item>
</template>

<script>
export default {
  name: 'UserListRow',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>
