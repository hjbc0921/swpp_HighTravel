import React, {PropTypes} from "react"
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import {addMarker} from "../../../store/addmarker/actions"

class MapContainer extends React.Component {
  state = {
    position : [{id:0, lat:37.459263, lng:126.953131}],
    updated : false
  }

  onMapClick = (props, map, e) => {
    let position = this.state.position
    let pos = {id: position.length, lat:e.latLng.lat(),lng:e.latLng.lng()}
    position.push(pos)
    this.setState({position:position, updated:true})
    addMarker(pos)
  }
  
  render() {
    return (
      <div>
      <Map google={this.props.google} 
      onRightclick={this.onMapClick}
      initialCenter={{lat: 37.459263,
        lng: 126.953131}}
      zoom={14}>
      {this.state.position.map(pos =>
      <Marker key={pos.id} label={pos.id.toString()} position={{lat:pos.lat,lng:pos.lng}} />
     )}
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBsvJf5vB73VjHReadFbUR-Msj9EUZ0fgo" 
})(MapContainer)
