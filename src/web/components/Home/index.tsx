/**
 * 函数组件 + Hooks
 */
import * as React from 'react';
import createStore from './hooks-redux';
import { useMemo } from 'react';
// import * as ReactDOM from 'react-dom';
import { Route, NavLink } from 'react-router-dom';
const initState = {
    name: '一灯',
    age: 24
}
const {
    Provider,
    store
} = createStore({
    ...initState
});
function actionOfAdd() {
    return {
        type: 'addAge',
        preload: {
            ...initState
        }
    }
}
const Button = () => {
    const handleAdd: any = () => {
        store.dispatch(actionOfAdd());
    }
    return (
        <>

            <button onClick={handleAdd}>点击增加</button>
            <hr></hr>
            <NavLink to="/test" exact>TestData页面</NavLink>
        </>

    )
}
const Home = () => {
    let state = store.useContext();
    console.log('----更新了');
    console.log(state);
    return (
        <>
            name:{state.name}
            < hr ></hr >
            age:{state.age}
            < hr ></hr >
            <Button />
        </>
    )
}
const WarpHome = () => {
    return (
        <Provider>
            <Home />
        </Provider>
    )
}
export default WarpHome;