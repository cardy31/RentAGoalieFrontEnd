import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


class MapComponent extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (false);
    }

    render() {
        return(
                <GoogleMap defaultZoom={this.props.zoom} defaultCenter={this.props.center}>
                    {this.props.isMarkerShown && <Marker position={this.props.center} />}
                </GoogleMap>)
    }
}

export default MapComponent;