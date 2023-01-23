import { onClosedDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"


describe('Test on uiSlice', () => { 

    test('should return default state', () => {

        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
     });

     test('should change isDateModal correctly', () => { 

        let state = uiSlice.getInitialState();
        
        state = uiSlice.reducer( state, onOpenDateModal() );
        expect(state.isDateModalOpen).toBeTruthy();

        state = uiSlice.reducer( state, onClosedDateModal() ) ;
        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();


      })
 })