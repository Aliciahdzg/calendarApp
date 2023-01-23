import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser";


describe('Test on authSlice', () => { 

    test('should return initial state', () => { 

        expect( authSlice.getInitialState() ).toEqual( initialState );

    });

    test('should make a login', () => { 

        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        });
    });

    test('should make the logout', () => {

        const state = authSlice.reducer( authenticatedState, onLogout() );
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        })
    });

    test('should make the logout', () => {

        const errorMessage = 'Credenciales no validas'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        })
    });

    test('should clear error message', () => { 

        const errorMessage = 'Credenciales no validas'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        const newState = authSlice.reducer( state, clearErrorMessage() );

        expect( newState.errorMessage ).toBe(undefined);
    })


 })