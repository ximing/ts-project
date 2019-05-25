import React from 'react';
import ReactDOM from 'react-dom';
import rab, { call, router, routerRedux, RabInstance, RouterAPI } from 'rabjs';
import { createBrowserHistory } from 'history';

const { Route, Redirect, Switch } = router;
const { ConnectedRouter: Router } = routerRedux;
import Layout from './layouts';
import Home from './pages/index';
import { hot } from 'react-hot-loader/root';

export class BootStrap {
    history: any;
    app?: RabInstance;
    provider: any;

    constructor() {
        this.history = createBrowserHistory();
    }

    initModels() {
        // this.app.addModel(config);
    }

    initApp() {
        this.app = rab({
            debug: true,
            history: this.history,
            initialState: {},
        });
        this.initModels();
        this.app.router(api => {
            return (
                <Router history={(api as RouterAPI).history}>
                    <Layout>
                        <div id="container">
                            <Switch>
                                <Route path={'/'} component={Home} />
                            </Switch>
                        </div>
                    </Layout>
                </Router>
            );
        });
        return this.app.start();
    }

    destoryApp() {
        if (this.app) {
            this.app.destory();
        }
        this.app = undefined;
        this.provider = null;
    }
}

export const boot = new BootStrap();
const App = boot.initApp();
export default hot(App);
