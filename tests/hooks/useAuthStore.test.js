import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import { authSlice } from "../../src/store"
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Test on useAuthStore', () => { 

    beforeEach( () => localStorage.clear() );

    test('should return default values', () => { 

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } );

        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegistered: expect.any(Function)
        })
        
        
     });
    
     test('should startLogin make the login successfully', async() => { 

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } );

        await act(async() => {
           await result.current.startLogin( testUserCredentials )
        });

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({ 
            errorMessage: undefined,
            status: 'authenticated',
            user: { uid: '63a22703838bdd9c94c758ae', name: 'Test User' }
        });

        expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );
     });

    test('should startLogin failed on authentication', async() => { 
        
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } );

        await act(async() => {
           await result.current.startLogin({ email: 'algo@google.com', password: '1234564546'})
        });

        const { errorMessage, status, user } = result.current
        expect( localStorage.getItem('token')).toBe(null);
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales incorrectas', // or expect.any(String)
            status: 'not-authenticated',
            user: {}
          });

        await waitFor( 
            () => expect( result.current.errorMessage ).toBe(undefined)
        )
     });

     test('should startRegister create an user', async() => { 

        const newUser = { email: 'algo@google.com', password: '123456789', name: 'Test User2'}

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } );

        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: "63a22703838bdd9c94c758ae",
                name: "Test User2",
                token: "ALGUN-TOKEN"
            }
        });

        await act(async() => {
           await result.current.startRegistered(newUser);
        });

        const { errorMessage, status, user } = result.current;
        
        expect({ errorMessage, status, user }).toEqual({ 
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User2', uid: '63a22703838bdd9c94c758ae' }
        });

        spy.mockRestore();
        
      });
    
    test('should startRegister failed create user', async() => { 

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } );

        await act(async() => {
           await result.current.startRegistered(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;
        
        expect({ errorMessage, status, user }).toEqual({ 
            errorMessage: "User already exists with that email",
            status: 'not-authenticated',
            user: {}
        }); 

     });
    
    test('should checkAuthToken failed if token doesnt exist', async() => { 

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } );

        await act(async() => {
           await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined, 
            status: 'not-authenticated',
            user: {}
        });
     });
    
     test('should checkAuthToken authenticate the user if token exist', async() => { 

        const { data } = await calendarApi.post('/auth', testUserCredentials);
        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } );

        await act(async() => {
           await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;
        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '63a22703838bdd9c94c758ae' }
        });

     })
 })