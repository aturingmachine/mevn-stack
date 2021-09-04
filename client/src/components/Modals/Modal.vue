<template>
  <v-dialog @input="closeModal()" :value="showModal" :width="width">
    <component
      :is="modalType"
      :loading="loading"
      v-bind="modalProps"
    ></component>
  </v-dialog>
</template>

<script>
import { ModalService } from '../../services/modal-service'
import ConfirmModal from './ConfirmModal.vue'
import GenericModal from './GenericModal.vue'

export default {
  name: 'Modal',

  components: {
    ConfirmModal,
    GenericModal,
  },

  computed: {
    loading() {
      return this.modalProps?.loading ? this.modalProps.loading() : false
    },

    width() {
      return this.modalProps?.width || 450
    },

    showModal() {
      return this.$store.state.modal.show
    },

    modalType() {
      return this.$store.state.modal.type
    },

    modalProps() {
      return this.$store.state.modal.props
    },
  },

  methods: {
    closeModal() {
      ModalService.close()
    },
  },
}
</script>

<style></style>
