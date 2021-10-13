import React from 'react'

export function ToyPopup(props) {
    return (
        <section className="popup">


            <div className="main">
                {props.children}
            </div>


        </section>
    )
}
