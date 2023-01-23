import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";

import { useUiStore } from "../../src/hooks/useUiStore";
import { uiSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer,
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('Test on useUiStore', () => { 

    test('should return default values', () => { 

        const mockStore = getMockStore({ isDateModalOpen: false })

        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } );

        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function)
        })
    });

    test('should openDateModal change to true on isDateModalOpen', () => { 

        const mockStore = getMockStore({ isDateModalOpen: false })
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const { openDateModal } = result.current;

        act( () => {
            openDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeTruthy();
     });

    test('should closeModal change to false on isDateModalOpen', () => { 

        const mockStore = getMockStore({ isDateModalOpen: false })
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        act( () => {
            result.current.closeDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();
     });

     test('should toggleDateModal change isDateModalOpen state', () => { 

        const mockStore = getMockStore({ isDateModalOpen: true })
        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        act( () => {
            result.current.toggleDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeFalsy();

        act( () => {
            result.current.toggleDateModal();
        });

        expect( result.current.isDateModalOpen ).toBeTruthy();
     });
})