import React, { useEffect } from 'react';

declare global {
    interface Window {
        google: any;
    }
}

const MapComponent: React.FC<{ onMapClick: (latitude: number, longitude: number) => void }> = ({ onMapClick }) => {
    useEffect(() => {
        const loadMap = () => {
            const script = document.createElement('script');
            script.src = 'http://maps.googleapis.com/maps/api/js?sensor=false';
            document.body.appendChild(script);
            script.onload = () => {
                const mapOptions = {
                    center: new window.google.maps.LatLng(18.9300, 72.8200),
                    zoom: 14,
                    mapTypeId: window.google.maps.MapTypeId.ROADMAP
                };
                const map = new window.google.maps.Map(document.getElementById("dvMap"), mapOptions);
                const infoWindow = new window.google.maps.InfoWindow();
                const latlngbounds = new window.google.maps.LatLngBounds();

                window.google.maps.event.addListener(map, 'click', function (e: any) {
                    const latitude = e.latLng.lat();
                    const longitude = e.latLng.lng();
                    onMapClick(latitude, longitude);
                });
            };
        };
        loadMap();
    }, []);

    return (
        <div id="dvMap" style={{ width: '500px', height: '500px' }}></div>
    );
};

export default MapComponent;