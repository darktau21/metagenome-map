'use client';

import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

type PhylumIndicatorProps = Readonly<{
  max: number;
  min: number;
}>;

export function PhylumIndicator({ max, min }: PhylumIndicatorProps) {
  const map = useMap();
  useEffect(() => {
    const legend = new L.Control({ position: 'bottomleft' });

    legend.onAdd = () => {
      const div = L.DomUtil.create(
        'div',
        'bg-white px-4 py-2 flex text-md items-center gap-4 rounded',
      );
      div.innerHTML = `
          <span>От ${min}</span>
          <div class="h-6 w-48 flex-1 bg-gradient-to-r from-[#7cff11] to-[#db4321] rounded-3xl"></div>
          <span>До ${max}</span>
      `;
      return div;
    };

    legend.addTo(map);
    return () => {
      legend.remove();
    };
  }, [map, min, max]);
  return null;
}
