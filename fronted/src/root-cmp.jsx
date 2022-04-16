import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router'
import routes from './routes.js'
import { Accessibility } from 'accessibility/src/main';
import { ToyHeader } from './cmps/ToyHeader.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { onLogin, onSignup } from './store/user.actions.js'
import { utilService } from './services/util.service.js';


export function RootCmp(props) {
    console.log('%c  props:', 'color: white;background: red;', props);
    const dispatch = useDispatch()
    useEffect(() => {
        const mobileOption = {
            icon: {
                position: {
                    bottom: { size: 90, units: 'px' },
                    right: { size: 0, units: 'px' },
                    type: 'fixed'
                }
            }

        }
        const options = {
            icon: {
                position: {
                    bottom: { size: 0, units: 'px' },
                    left: { size: 0, units: 'px' },
                    type: 'fixed'
                }
            }
        }

        async function guestLoginFirst() {
            await dispatch(onLogin({ username: `G-FPIeze`, password: 'Guest', fullname: '' }))
        }
        guestLoginFirst()
        window.addEventListener('load', function () { new Accessibility(window.innerWidth >= 768 ? options : mobileOption); }, false);
        return () => {
            window.removeEventListener('load', function () { new Accessibility(); }, false);
        }
    }, [])

    // {fullname: '', username: 'admin2', password: 'admin'}

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


