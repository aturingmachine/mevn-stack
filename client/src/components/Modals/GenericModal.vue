<template>
  <component
    v-bind="$attrs"
    :is="innerComponent"
    @success="close()"
    @error="close()"
    @close="close()"
  />
</template>

<script>
import { ModalService } from '../../services/modal-service'
export default {
  name: 'GenericModal',

  props: {
    innerComponent: {
      type: Object,
      required: true,
    },
  },

  methods: {
    close() {
      ModalService.close()
    },
  },
}
</script>
