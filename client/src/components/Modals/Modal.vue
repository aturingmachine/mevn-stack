<template>
  <v-dialog @input="closeModal()" :value="showModal" :width="width">
    <component :is="modalType" v-bind="modalProps"></component>
  </v-dialog>
</template>

<script>
import ConfirmModal from './ConfirmModal.vue'

export default {
  name: 'Modal',

  components: {
    ConfirmModal,
  },

  props: {
    // show: {
    //   type: Boolean,
    //   required: true,
    // },
    // loading: {
    //   type: Boolean,
    //   required: false,
    // },
    // width: {
    //   type: Number,
    //   default: 450,
    // },
  },

  data: () => ({
    // isShowing: false,
  }),

  computed: {
    // isLoading() {
    //   return this.loading === undefined ? false : this.loading
    // },

    // isShowingModal: {
    //   get() {
    //     return this.show
    //   },

    //   set(val) {
    //     this.isShowing = val
    //     if (!val) {
    //       this.$emit('close', this.isShowing)
    //     }
    //   },
    // },

    width() {
      return this.modalProps?.width || 450
    },

    showModal() {
      return this.$root.store.modal.state.show
    },

    modalType() {
      return this.$root.store.modal.state.type
    },

    modalProps() {
      return this.$root.store.modal.state.props
    },
  },

  methods: {
    closeModal() {
      this.$root.store.modal.closeModal()
    },
  },
}
</script>

<style></style>
