'use client';

import dynamic from 'next/dynamic';

const MapInner = dynamic(() => import('./ZoneMapInner'), {
  ssr: false,
  loading: () => <div className="zone-map-placeholder" aria-hidden="true" />,
});

export function ZoneMap() {
  return (
    <div
      className="zone-map-wrap"
      aria-label="Carte de la zone d'intervention — Lyon et 8 km autour du 69009"
    >
      <MapInner />
    </div>
  );
}
