import React from "react";
import GoogleMap from "google-map-react";
import GOOGLE_API_KEY from "./Keys"

class GMapReact extends React.Component {
    state = {
        center: this.props.center
    };

    renderMarkers(map, maps) {
        console.log("REndering marker")
        let marker = new maps.Marker({
            position: this.state.center,
            map,
            title: 'Hello World!'
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("Unicorn");
        if (nextProps.center !== this.state["center"]) {
            this.setState({
                center: nextProps.center
            })
        }
    }

    render() {
        const { center, zoom } = this.props;
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <GoogleMap
                    bootstrapURLKeys={{ key: [GOOGLE_API_KEY] }}
                    center={this.state.center}
                    zoom={zoom}
                    // onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
                />
            </div>
        );
    }
}

class MapUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: this.props.center,
            zoom: this.props.zoom
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.center !== this.state["center"]) {
            this.setState({
                center: nextProps.center,
                zoom: nextProps.zoom
            })
        }
    }

    render() {
        const center = this.state.center;
        const zoom = this.state.zoom;

        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div style={{ width: "100%", height: "100%" }}>
                    <GMapReact center={center} zoom={zoom} />
                </div>
            </div>
        );
    }
}

export default MapUpdate
