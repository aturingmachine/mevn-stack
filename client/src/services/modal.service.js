import { store } from '../store'
import { modalMutationTypes } from '../store/modal.store'

const namespacedCommit = (mutationType, ...args) =>
  store.commit(`modal/${mutationType}`, ...args)

export const ModalTypes = {
  Confirm: 'confirm-modal',
  Generic: 'generic-modal',
}

export const ModalService = {
  close() {
    namespacedCommit(modalMutationTypes.close)
  },

  openConfirmModal(props) {
    namespacedCommit(modalMutationTypes.open, {
      type: ModalTypes.Confirm,
      props,
    })
  },

  openGenericModal(component, props) {
    namespacedCommit(modalMutationTypes.open, {
      type: ModalTypes.Generic,
      props: { innerComponent: component, ...props },
    })
  },
}
