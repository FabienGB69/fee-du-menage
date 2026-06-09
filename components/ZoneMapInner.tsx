'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Tooltip } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CENTER: LatLngExpression = [45.7704, 4.7952];
const RADIUS_M = 8000;

export default function ZoneMapInner() {
  useEffect(() => {
    // Fix webpack-broken default icons
    const L = require('leaflet') as typeof import('leaflet');
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer
      center={CENTER}
      zoom={11}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', borderRadius: '20px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={CENTER}
        radius={RADIUS_M}
        pathOptions={{ color: '#6d4cf6', fillColor: '#6d4cf6', fillOpacity: 0.15, weight: 2 }}
      />
      <Marker position={CENTER}>
        <Tooltip permanent direction="top" offset={[0, -10]}>
          Lyon 9e — Fée du Ménage
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}
