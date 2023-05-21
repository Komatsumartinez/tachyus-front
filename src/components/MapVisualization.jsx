import '@progress/kendo-theme-default/dist/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const MapVisualization = ({ completionsData }) => {
    const renderMarkers = () => {
        return completionsData.map((completion) => {
            const { lat, long, wellName, Type, TD } = completion;
            const markerIcon = getMarkerIcon(Type);

            return (
                <Marker key={wellName} position={[lat, long]} icon={markerIcon}>
                    <Popup>
                        <div>
                            <h3>{wellName}</h3>
                            <p>Type: {Type}</p>
                            <p>TD: {TD}</p>
                        </div>
                    </Popup>
                </Marker>
            );
        });
    };
    const getMarkerIcon = (wellType) => {
        if (wellType === 'Producer') {
            return L.icon({
                iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                iconSize: [40, 40],
                iconAnchor: [20, 40],
            });
        } else if (wellType === 'Injector') {
            return L.icon({
                iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                iconSize: [40, 40],
                iconAnchor: [20, 40],
            });
        } else {
            return L.icon({
                iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                iconSize: [40, 40],
                iconAnchor: [20, 40],
            });
        }
    };

    const calculateMapBounds = () => {
        let minLat = 90;
        let maxLat = -90;
        let minLng = 180;
        let maxLng = -180;

        completionsData.forEach((completion) => {
            const { lat, long } = completion;
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
            if (long < minLng) minLng = long;
            if (long > maxLng) maxLng = long;
        });

        const bounds = [[minLat, minLng], [maxLat, maxLng]];
        return bounds;
    };

    return (
        <div>
            <h2>Map Visualization</h2>
            <MapContainer
                bounds={calculateMapBounds()}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="Map data © <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors"
                />
                {renderMarkers()}
            </MapContainer>
        </div>
    );
};

export default MapVisualization;