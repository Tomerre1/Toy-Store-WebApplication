
import { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';


class _MyMap extends Component {

    state = {
        center: {
            lat: 32.109333,
            lng: 34.855499
        },
        isInfoWindowOn: false
    }

    acordionBranchContent = [
        {
            heading: 'Tel Aviv Branch',
            position: { lat: 32.09151422942391, lng: 34.77710737828437 },
            content: 'Even Gbirol Street, 154 ',
            tel: '03-5856925 ',
            web: 'www.toy-center-tel-aviv.com',
            open: 'Sunday - Thursday: 10am - 8pm',
        },
        {
            heading: 'Bat Yam Branch',
            position: { lat: 32.02131898166023, lng: 34.745406250953906 },
            content: 'Arlozerov Street, 13 ',
            tel: '03-4549985 ',
            web: 'www.toy-center-bat-yam.com',
            open: 'Sunday - Thursday: 8am - 5pm',
        },
        {
            heading: 'Rehovot Branch',
            position: { lat: 31.89531491976764, lng: 34.80132105953836 },
            content: 'Sderot Nurdau Street, 128  ',
            tel: '03-4452354 ',
            web: 'www.toy-center-rehovot.com',
            open: 'Sunday - Thursday: 11am - 7pm',
        },
    ]

    onMapClicked = (props, map, ev) => {
        this.setState({ center: { lat: ev.latLng.lat(), lng: ev.latLng.lng() } })
    }

    onMarkerClicked = () => {
        this.setState({ isInfoWindowOn: true })
    }

    onInfoWindowClose = () => {
        this.setState({ isInfoWindowOn: false })
    }

    onBranchClick = (idx) => {
        this.setState({
            isInfoWindowOn: true,
            currBranchSelected: this.acordionBranchContent[idx].position,
            currBranchDetails: this.acordionBranchContent[idx].heading
        })
    }

    render() {
        const style = {
            width: "%",
            height: "500px",
            position: "relative",
            margin: "20px"
        };

        return (

            <>
                <Map
                    google={this.props.google}
                    zoom={10}
                    initialCenter={{ lat: 32.02393895923443, lng: 34.784192198698780 }}
                    onClick={this.onMapClicked}
                    center={{ lat: 32.02393895923443, lng: 34.784192198698780 }}
                    containerStyle={style}
                >

                    {this.acordionBranchContent.map((currBranch,idx) => (
                        <Marker key={idx}
                            position={currBranch.position}
                            name={currBranch.heading}
                            onClick={this.onMarkerClicked}
                        />
                    ))}

                    <InfoWindow
                        onClose={this.onInfoWindowClose}
                        position={this.state.currBranchSelected}
                        visible={this.state.isInfoWindowOn}
                    >
                        <div>
                            <h1>{this.state.currBranchDetails}</h1>
                        </div>
                    </InfoWindow>
                </Map>
                <Accordion allowZeroExpanded >
                    {this.acordionBranchContent.map((currBranch, idx) =>
                    (<AccordionItem key={idx}>
                        <AccordionItemHeading onClick={() => this.onBranchClick(`${idx}`)}>
                            <AccordionItemButton >
                                {currBranch.heading}
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <h2>{currBranch.heading}</h2>
                            <p>Addres: {currBranch.content}</p>
                            <p>Tel: {currBranch.tel}</p>
                            <p>Web: {currBranch.web}</p>
                            <p>Open Hours: {currBranch.open}</p>
                        </AccordionItemPanel>
                    </AccordionItem>)
                    )}
                </Accordion>


            </>
        );
    }
}

export const MyMap = GoogleApiWrapper({
    apiKey: ('AIzaSyDCdZ8RItKP9Q3-hCXKS3HqnfnRXbpVLk8')
})(_MyMap)