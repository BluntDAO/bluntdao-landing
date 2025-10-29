import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface MapPerformanceOptimizerProps {
  showGlobalView: boolean;
  isMobile: boolean;
}

const MapPerformanceOptimizer: React.FC<MapPerformanceOptimizerProps> = ({ 
  showGlobalView, 
  isMobile 
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Optimize map performance settings
    const optimizeMap = () => {
      // Disable animations on mobile for better performance
      if (isMobile) {
        map.options.zoomAnimation = false;
        map.options.fadeAnimation = false;
        map.options.markerZoomAnimation = false;
      }

      // Set appropriate zoom constraints
      if (showGlobalView) {
        map.setMinZoom(1);
        map.setMaxZoom(6);
      } else {
        map.setMinZoom(3);
        map.setMaxZoom(8);
      }

      // Optimize tile loading
      map.eachLayer((layer: any) => {
        if (layer instanceof L.TileLayer) {
          layer.options.updateWhenIdle = true;
          layer.options.updateWhenZooming = false;
          layer.options.keepBuffer = 2;
        }
      });

      // Add performance monitoring
      let lastFrameTime = performance.now();
      const checkPerformance = () => {
        const currentTime = performance.now();
        const frameTime = currentTime - lastFrameTime;
        
        // If frame time is too high (low FPS), reduce quality
        if (frameTime > 33) { // Less than 30 FPS
          map.eachLayer((layer: any) => {
            if (layer.setStyle && typeof layer.setStyle === 'function') {
              layer.setStyle({
                weight: 1,
                fillOpacity: 0.6
              });
            }
          });
        }
        
        lastFrameTime = currentTime;
        requestAnimationFrame(checkPerformance);
      };

      // Start performance monitoring
      requestAnimationFrame(checkPerformance);
    };

    optimizeMap();

    // Cleanup function
    return () => {
      // Reset map options if needed
      if (map) {
        map.options.zoomAnimation = true;
        map.options.fadeAnimation = true;
        map.options.markerZoomAnimation = true;
      }
    };
  }, [map, showGlobalView, isMobile]);

  // Add viewport-based rendering optimization
  useEffect(() => {
    if (!map) return;

    const optimizeViewport = () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();

      // Hide features outside viewport for better performance
      map.eachLayer((layer: any) => {
        if (layer.feature && layer.getBounds) {
          const layerBounds = layer.getBounds();
          const isVisible = bounds.intersects(layerBounds);
          
          if (!isVisible && zoom > 4) {
            layer.setStyle({ fillOpacity: 0, opacity: 0 });
          } else {
            layer.setStyle({ fillOpacity: 0.7, opacity: 1 });
          }
        }
      });
    };

    // Throttled viewport optimization
    let optimizeTimeout: NodeJS.Timeout;
    const throttledOptimize = () => {
      clearTimeout(optimizeTimeout);
      optimizeTimeout = setTimeout(optimizeViewport, 100);
    };

    map.on('moveend', throttledOptimize);
    map.on('zoomend', throttledOptimize);

    return () => {
      map.off('moveend', throttledOptimize);
      map.off('zoomend', throttledOptimize);
      clearTimeout(optimizeTimeout);
    };
  }, [map]);

  return null; // This component doesn't render anything
};

export default MapPerformanceOptimizer;
