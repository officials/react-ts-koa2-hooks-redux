import { BrowserRouter as Router, Route, RouteProps, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
const WarpHome = lazy(function () {
    return import('../components/Home');
});
const TestData = lazy(function () {
    return import('../components/TestData');
});
const routes: RouteProps[] = [
    {
        path: "/",
        exact: true,
        component: WarpHome
    },
    {
        path:'/test',
        exact:true,
        component:TestData
    }
];
const Routes: any = () => (
    <Suspense fallback={<i>loading...</i>}>
        <Switch>
            {
                routes.map(r => {
                    const { path, exact, component } = r;
                    const LazyCom: any = component;
                    const pathStr: any = path;
                    return (
                        <Route exact={exact} path={path} key={pathStr} render={
                            () => <LazyCom />}
                             />
                    )
                })
            }
        </Switch>
    </Suspense>
)
export default Routes;
