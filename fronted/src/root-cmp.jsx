import React from 'react'
import { Switch, Route } from 'react-router'
import routes from './routes.js'
import { Accessibility } from 'accessibility/src/main';
import { ToyHeader } from './cmps/ToyHeader.jsx'

export class RootCmp extends React.Component {
    componentDidMount() {
        const options = {
            icon: {
                position: {
                    bottom: { size: 0, units: 'px' },
                    left: { size: 0, units: 'px' },
                    type: 'fixed'
                }
            }
        }
        window.addEventListener('load', function () { new Accessibility(options); }, false);
    }

    componentWillUnmount() {
        window.removeEventListener('load', function () { new Accessibility(); }, false);
    }

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


