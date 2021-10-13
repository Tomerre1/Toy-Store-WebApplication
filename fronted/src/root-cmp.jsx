import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Switch, Route } from 'react-router'

import routes from './routes.js'

import { ToyHeader } from './cmps/ToyHeader.jsx'

export class RootCmp extends React.Component {

    render() {
        return (
            <div >
                <ToyHeader />
                <main className="main-container">
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                    </Switch>
                </main>
            </div>
        )
    }
}


