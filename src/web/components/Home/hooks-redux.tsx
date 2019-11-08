import * as React from 'react';
const { useReducer, createContext, useContext } = React;
interface IState {
    name: string;
    age: number
}
export default function createStore(params: IState) {
    const { initialState } = {
        initialState: {}
    }
    //实际是由useContext做的所有状态版本的管理
    const Appcontext = createContext(params)
    const middleWareReducer = (lastState: any, action: { type: any,preload?:any }) => {
        console.log('🍵',action.preload);
        switch (action.type) {
            case 'addAge':
                return {
                    ...action.preload,
                    age: (params.age++),
                }
            default: {
                return lastState;
            }
        }
    }
    const store: any = {
        _state: initialState,
        dispatch: undefined,
        getState: () => {
            return store._state;
        },
        useContext: () => {
            console.log('🚀',useContext(Appcontext));
            return useContext(Appcontext)
        }
    };
    const Provider = (props: any) => {
        const [state, dispatch] = useReducer(middleWareReducer, initialState);
        if (!store.dispatch) {
            store.dispatch = async (action: any) => {

                if (typeof action === "function") {
                    console.log('📚');
                    const data:any = await action(dispatch, store.getState())
                    console.log(data);
                    dispatch(data);
                } else {

                    dispatch(action);
                }
            }
        }
        return <Appcontext.Provider {...props} value={state} />
    }
    return {
        Provider,
        store
    }
};