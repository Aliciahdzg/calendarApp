
import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
      isDateModalOpen: false
  },
  reducers: {
    onOpenDateModal: ( state ) => {
      state.isDateModalOpen = true;
    },
    onClosedDateModal: ( state ) => {
        state.isDateModalOpen = false
    },
  }
})

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onClosedDateModal } = uiSlice.actions