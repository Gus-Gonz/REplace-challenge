import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { Project } from '../../types/project';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function InitialMapView({ projects }) {
  const map = useMap();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && projects.length > 0) {
      const avgLat = projects.reduce((sum, p) => sum + p.latitude, 0) / projects.length;
      const avgLng = projects.reduce((sum, p) => sum + p.longitude, 0) / projects.length;
      map.setView([avgLat, avgLng], 5);
      isFirstRender.current = false;
    }
  }, [projects, map]);

  return null;
}

function MapStateTracker({ onZoomChange, onCenterChange }) {
  const map = useMapEvents({
    zoom: () => {
      onZoomChange(map.getZoom());
    },
    moveend: () => {
      onCenterChange([map.getCenter().lat, map.getCenter().lng]);
    }
  });
  return null;
}

const ProjectMapView = () => {
  const { projects, loading, error } = useSelector((state: RootState) => state.projects);
  
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
  const [mapZoom, setMapZoom] = useState(5);
  
  const mapRef = useRef<L.Map | null>(null);

  const handleZoomChange = (zoom: number) => {
    setMapZoom(zoom);
  };

  const handleCenterChange = (center: [number, number]) => {
    setMapCenter(center);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-600" aria-live="assertive">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(85vh-6rem)] shadow-blue-200 shadow-lg rounded-lg overflow-hidden">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(map) => { mapRef.current = map; }}
      >
        <InitialMapView projects={projects} />
        
        {/* Componente que rastrea los cambios de zoom y posición */}
        <MapStateTracker 
          onZoomChange={handleZoomChange} 
          onCenterChange={handleCenterChange} 
        />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {projects.map((project: Project) => (
          <Marker 
            key={project.id} 
            position={[project.latitude, project.longitude]} 
            icon={DefaultIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{project.name}</h3>
                <p className="capitalize">Type: {project.project_type}</p>
                <p>Location: {project.latitude.toFixed(4)}, {project.longitude.toFixed(4)}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ProjectMapView;