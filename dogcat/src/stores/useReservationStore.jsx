import { create } from 'zustand'

const useReservationStore = create(set => ({
  reservationData: {
    type: '',
    hUsername: '',
    nUsername: '',
    pno: null,
    remark: ''
  },
  setReservationData: (data) => set({ reservationData: data }),
  clearReservationData: () => set({
    reservationData: {
      type: '',
      hUsername: '',
      nUsername: '',
      pno: null,
      remark: ''
    }
  })
}))

export default useReservationStore
