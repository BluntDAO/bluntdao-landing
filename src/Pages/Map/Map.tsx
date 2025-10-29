import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import style from './Map.module.css';
import cannabisData from '../../data/cannabisLegalData.json';
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';
import MapPerformanceOptimizer from '../../components/Map/MapPerformanceOptimizer';
import { mapPerformanceMonitor } from '../../utils/mapPerformanceMonitor';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface FilterState {
  legalStatus: string;
  searchTerm: string;
  showMedicalOnly: boolean;
  showRecreationalOnly: boolean;
  region: 'all' | 'north-america' | 'europe' | 'asia' | 'oceania' | 'south-america' | 'africa';
}

interface ViewMode {
  mode: 'map' | 'cards' | 'both';
}

const Map: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>({ mode: 'both' });
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  
  // Initialize performance monitoring
  useEffect(() => {
    mapPerformanceMonitor.startMonitoring();
    return () => {
      // Log final performance summary on unmount
      mapPerformanceMonitor.logPerformanceSummary();
    };
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    legalStatus: 'all',
    searchTerm: '',
    showMedicalOnly: false,
    showRecreationalOnly: false,
    region: 'all'
  });
  const [worldGeoData, setWorldGeoData] = useState<any>(null);
  const [usGeoData, setUsGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showGlobalView, setShowGlobalView] = useState(true);

  // SEO optimization
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Global Cannabis Legal Status Map | BluntDAO - Interactive Cannabis Laws Worldwide';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore cannabis legalization worldwide with BluntDAO\'s interactive map. Real-time legal status, dispensary locations, and comprehensive cannabis laws for every country and US state.');
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "BluntDAO Global Cannabis Legal Status Map",
      "description": "Interactive map showing cannabis legal status, dispensary locations, and comprehensive cannabis laws worldwide",
      "url": "https://bluntdao.org/map",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "BluntDAO",
        "url": "https://bluntdao.org"
      },
      "keywords": "cannabis laws, marijuana legalization, dispensary map, cannabis legal status, BluntDAO, global cannabis, medical marijuana, recreational cannabis",
      "inLanguage": "en-US",
      "dateModified": "2024-12-29",
      "about": [
        {
          "@type": "Thing",
          "name": "Cannabis Legalization",
          "description": "Legal status of cannabis around the world"
        },
        {
          "@type": "Thing", 
          "name": "Medical Marijuana",
          "description": "Medical cannabis laws and regulations"
        },
        {
          "@type": "Thing",
          "name": "Recreational Cannabis",
          "description": "Recreational marijuana laws and policies"
        }
      ]
    };

    // Add structured data to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Add Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: 'Global Cannabis Legal Status Map | BluntDAO' },
      { property: 'og:description', content: 'Explore cannabis legalization worldwide with BluntDAO\'s interactive map. Real-time legal status and comprehensive cannabis laws.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://bluntdao.org/map' },
      { property: 'og:image', content: 'https://bluntdao.org/img/BluntDAO.png' },
      { property: 'og:site_name', content: 'BluntDAO' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Global Cannabis Legal Status Map | BluntDAO' },
      { name: 'twitter:description', content: 'Interactive cannabis legalization map with real-time legal status worldwide' },
      { name: 'twitter:image', content: 'https://bluntdao.org/img/BluntDAO.png' }
    ];

    ogTags.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.property) meta.setAttribute('property', tag.property);
      if (tag.name) meta.setAttribute('name', tag.name);
      meta.setAttribute('content', tag.content);
      document.head.appendChild(meta);
    });

    return () => {
      // Cleanup structured data and meta tags
      const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
      if (structuredDataScript) {
        document.head.removeChild(structuredDataScript);
      }
      
      ogTags.forEach(tag => {
        const selector = tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`;
        const meta = document.querySelector(selector);
        if (meta) {
          document.head.removeChild(meta);
        }
      });
    };
  }, []);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load global GeoJSON data with caching and performance monitoring
  useEffect(() => {
    const loadStartTime = performance.now();
    
    const loadGeoData = async () => {
      try {
        // Check if data is cached in localStorage
        const cachedWorldData = localStorage.getItem('bluntdao_world_geojson');
        const cachedUsData = localStorage.getItem('bluntdao_us_geojson');
        const cacheTimestamp = localStorage.getItem('bluntdao_geojson_timestamp');
        const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours
        
        const isCacheValid = cacheTimestamp && 
          (Date.now() - parseInt(cacheTimestamp)) < cacheExpiry;

        if (cachedWorldData && cachedUsData && isCacheValid) {
          // Use cached data
          mapPerformanceMonitor.trackCacheHit();
          setWorldGeoData(JSON.parse(cachedWorldData));
          setUsGeoData(JSON.parse(cachedUsData));
          setLoading(false);
          mapPerformanceMonitor.trackLoadTime(loadStartTime);
          return;
        }

        // Load fresh data
        mapPerformanceMonitor.trackCacheMiss();
        const [worldResponse, usResponse] = await Promise.all([
          fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'),
          fetch('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json')
        ]);

        const [worldData, usData] = await Promise.all([
          worldResponse.json(),
          usResponse.json()
        ]);

        // Cache the data
        localStorage.setItem('bluntdao_world_geojson', JSON.stringify(worldData));
        localStorage.setItem('bluntdao_us_geojson', JSON.stringify(usData));
        localStorage.setItem('bluntdao_geojson_timestamp', Date.now().toString());

        setWorldGeoData(worldData);
        setUsGeoData(usData);
        setLoading(false);
        mapPerformanceMonitor.trackLoadTime(loadStartTime);
      } catch (error) {
        console.error('Error loading geo data:', error);
        setLoading(false);
        mapPerformanceMonitor.trackLoadTime(loadStartTime);
      }
    };

    loadGeoData();
  }, []);

  // Memoized color function for better performance
  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'green': return '#00ff88'; // BluntDAO Green - Fully Legal (reserved for best status)
      case 'lightgreen': return '#00d4ff'; // BluntDAO Blue - Legal/Decriminalized  
      case 'yellow': return '#ffd700'; // Gold - Medical Only
      case 'orange': return '#ff6b35'; // Orange - Limited Medical
      case 'red': return '#ff4757'; // Coral Red - Illegal
      case 'darkred': return '#ff3838'; // Bright Red - Strictly Illegal
      case 'unknown': return '#636e72'; // Neutral Grey - Unknown
      default: return '#636e72'; // Neutral Grey - Unknown
    }
  }, []);

  // Get region data (countries or US states)
  const getRegionData = (regionName: string) => {
    // Check US states first
    const states = (cannabisData.countries["United States"]?.states as any) || {};
    if (states[regionName]) {
      return states[regionName];
    }
    
    // Check other countries
    const countries = cannabisData.countries as any;
    if (countries[regionName]) {
      return countries[regionName];
    }
    
    return null;
  };

  // Memoized region color function
  const getRegionColor = useCallback((regionName: string): string => {
    const regionData = getRegionData(regionName);
    if (!regionData) return '#2a2a2a'; // Grey for unknown, not red
    
    // For countries with states (like US), use overall status
    if (regionData.states) {
      return getStatusColor(regionData.overallStatus || 'unknown');
    }
    
    // For individual states/regions
    return getStatusColor(regionData.colorCode || 'unknown');
  }, [getRegionData, getStatusColor]);

  // Handle card click to highlight map region
  const handleCardClick = (regionName: string) => {
    setSelectedCard(regionName);
    setSelectedRegion(regionName);
    
    // Find and zoom to the region on map
    if (mapRef.current) {
      const currentGeoData = showGlobalView ? worldGeoData : usGeoData;
      if (currentGeoData) {
        const feature = currentGeoData.features.find((f: any) => 
          f.properties.NAME === regionName || 
          f.properties.name === regionName ||
          f.properties.NAME_EN === regionName
        );
        if (feature && feature.geometry) {
          const bounds = L.geoJSON(feature).getBounds();
          mapRef.current.fitBounds(bounds, { padding: [20, 20] });
        }
      }
    }
  };

  // Handle card hover to highlight map region
  const handleCardHover = (regionName: string | null) => {
    setHoveredRegion(regionName);
  };

  // Filter regions based on current filters
  const filteredRegions = useMemo(() => {
    const allRegions: any[] = [];
    
    if (showGlobalView) {
      // Add countries in organized order - Legal first, then by region
      const countries = cannabisData.countries as any;
      const countryEntries = Object.entries(countries).filter(([name]) => name !== "United States");
      
      // Sort countries by legal status (legal first) then alphabetically
      const sortedCountries = countryEntries.sort(([nameA, dataA]: [string, any], [nameB, dataB]: [string, any]) => {
        const statusOrder = { 'green': 0, 'lightgreen': 1, 'yellow': 2, 'orange': 3, 'red': 4, 'darkred': 5, 'unknown': 6 };
        const statusA = statusOrder[dataA.colorCode as keyof typeof statusOrder] ?? 6;
        const statusB = statusOrder[dataB.colorCode as keyof typeof statusOrder] ?? 6;
        
        if (statusA !== statusB) return statusA - statusB;
        return nameA.localeCompare(nameB);
      });
      
      sortedCountries.forEach(([countryName, countryData]) => {
        allRegions.push([countryName, countryData]);
      });
      
      // Add US states separately, sorted by legal status then alphabetically
      const usStates = (cannabisData.countries["United States"]?.states as any) || {};
      const stateEntries = Object.entries(usStates).sort(([nameA, dataA]: [string, any], [nameB, dataB]: [string, any]) => {
        const statusOrder = { 'green': 0, 'lightgreen': 1, 'yellow': 2, 'orange': 3, 'red': 4, 'darkred': 5, 'unknown': 6 };
        const statusA = statusOrder[dataA.colorCode as keyof typeof statusOrder] ?? 6;
        const statusB = statusOrder[dataB.colorCode as keyof typeof statusOrder] ?? 6;
        
        if (statusA !== statusB) return statusA - statusB;
        return nameA.localeCompare(nameB);
      });
      
      stateEntries.forEach(([stateName, stateData]) => {
        allRegions.push([`${stateName}, USA`, stateData]);
      });
    } else {
      // US-only view - sorted by legal status then alphabetically
      const usStates = (cannabisData.countries["United States"]?.states as any) || {};
      const sortedStates = Object.entries(usStates).sort(([nameA, dataA]: [string, any], [nameB, dataB]: [string, any]) => {
        const statusOrder = { 'green': 0, 'lightgreen': 1, 'yellow': 2, 'orange': 3, 'red': 4, 'darkred': 5, 'unknown': 6 };
        const statusA = statusOrder[dataA.colorCode as keyof typeof statusOrder] ?? 6;
        const statusB = statusOrder[dataB.colorCode as keyof typeof statusOrder] ?? 6;
        
        if (statusA !== statusB) return statusA - statusB;
        return nameA.localeCompare(nameB);
      });
      
      sortedStates.forEach(([stateName, stateData]) => {
        allRegions.push([stateName, stateData]);
      });
    }
    
    return allRegions.filter(([regionName, regionData]: [string, any]) => {
      // Search term filter
      if (filters.searchTerm && !regionName.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }

      // Legal status filter
      if (filters.legalStatus !== 'all') {
        const colorCode = regionData.colorCode || regionData.overallStatus;
        if (filters.legalStatus !== colorCode) {
          return false;
        }
      }

      // Medical only filter
      if (filters.showMedicalOnly && regionData.recreational === 'Legal') {
        return false;
      }

      // Recreational only filter
      if (filters.showRecreationalOnly && regionData.recreational !== 'Legal') {
        return false;
      }

      return true;
    });
  }, [filters, showGlobalView]);

  // Memoized GeoJSON style function for better performance
  const geoJsonStyle = useCallback((feature: any) => {
    const regionName = feature.properties.NAME || feature.properties.name || feature.properties.NAME_EN;
    const color = getRegionColor(regionName);
    const isHovered = hoveredRegion === regionName;
    const isSelected = selectedRegion === regionName;
    
    return {
      fillColor: color,
      weight: isSelected ? 3 : isHovered ? 2 : 1,
      opacity: 1,
      color: isSelected ? '#00ff88' : isHovered ? '#ffffff' : '#666666',
      dashArray: isSelected ? '5, 5' : undefined,
      fillOpacity: isSelected ? 0.9 : isHovered ? 0.8 : 0.7
    };
  }, [hoveredRegion, selectedRegion, getRegionColor]);

  // Memoized feature event handler for better performance
  const onEachFeature = useCallback((feature: any, layer: any) => {
    const regionName = feature.properties.NAME || feature.properties.name || feature.properties.NAME_EN;
    const regionData = getRegionData(regionName);
    
    if (regionData) {
      layer.on({
        mouseover: (e: any) => {
          const layer = e.target;
          setHoveredRegion(regionName);
          layer.setStyle({
            weight: 2,
            color: '#ffffff',
            fillOpacity: 0.8
          });
        },
        mouseout: (e: any) => {
          const layer = e.target;
          setHoveredRegion(null);
          layer.setStyle(geoJsonStyle(feature));
        },
        click: () => {
          setSelectedRegion(regionName);
          setSelectedCard(regionName);
        }
      });

      // Create popup content
      const recreational = regionData.recreational || 'Unknown';
      const medical = regionData.medical || 'Unknown';
      const stores = regionData.stores || 0;
      const chapter = regionData.bluntdaoChapter || null;

      layer.bindPopup(`
        <div class="${style.popupContent}">
          <h3 style="color: #00ff88; margin: 0 0 10px 0; font-size: 1.1rem;">${regionName}</h3>
          <div style="margin-bottom: 8px;">
            <strong>🎯 Recreational:</strong> 
            <span style="color: ${recreational === 'Legal' ? '#00ff88' : '#ff4444'}; margin-left: 5px;">${recreational}</span>
          </div>
          <div style="margin-bottom: 8px;">
            <strong>🏥 Medical:</strong> 
            <span style="color: ${medical === 'Legal' ? '#00ff88' : '#ff4444'}; margin-left: 5px;">${medical}</span>
          </div>
          <div style="margin-bottom: 8px;">
            <strong>🏪 Dispensaries:</strong> <span style="color: #00ff88; margin-left: 5px;">${stores}</span>
          </div>
          ${chapter ? `<div style="background: linear-gradient(135deg, #00ff88, #39ff14); color: black; padding: 5px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: bold; text-align: center; margin-top: 8px;">🌿 ${chapter}</div>` : ''}
          <button onclick="document.querySelector('.${style.closeButton}')?.click()" style="background: #00ff88; color: black; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; margin-top: 10px; font-weight: bold; width: 100%;">View Details</button>
        </div>
      `);
    }
  }, [getRegionData, geoJsonStyle, setHoveredRegion, setSelectedRegion, setSelectedCard, style.popupContent, style.closeButton]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      legalStatus: 'all',
      searchTerm: '',
      showMedicalOnly: false,
      showRecreationalOnly: false,
      region: 'all'
    });
    setSelectedRegion(null);
    setSelectedCard(null);
  };

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.loadingSpinner}>
          <div className={style.spinner}></div>
          <p>Loading Global Cannabis Legal Status Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <Navbar />
      
      {/* Hero Section */}
      <div className={style.hero}>
        <div className={style.heroContent}>
          <h1 className={style.heroTitle}>
            🌍 Global Cannabis Legal Status Map
          </h1>
          <p className={style.heroDescription}>
            Explore cannabis legalization worldwide with real-time data, BluntDAO chapters, 
            and comprehensive legal information. Navigate the global cannabis landscape with confidence.
          </p>
          
          {/* Global/US Toggle */}
          <div className={style.viewToggle}>
            <button 
              className={`${style.toggleBtn} ${showGlobalView ? style.active : ''}`}
              onClick={() => setShowGlobalView(true)}
            >
              🌍 Global View
            </button>
            <button 
              className={`${style.toggleBtn} ${!showGlobalView ? style.active : ''}`}
              onClick={() => setShowGlobalView(false)}
            >
              🇺🇸 United States
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={style.filtersContainer}>
        <div className={style.searchBox}>
          <input
            type="text"
            placeholder={`🔍 Search ${showGlobalView ? 'countries/states' : 'states'}...`}
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className={style.searchInput}
          />
        </div>

        <div className={style.filterGroup}>
          <label>Legal Status:</label>
          <select
            value={filters.legalStatus}
            onChange={(e) => handleFilterChange('legalStatus', e.target.value)}
            className={style.filterSelect}
          >
            <option value="all">All Regions</option>
            <option value="green">🟢 Fully Legal</option>
            <option value="lightgreen">🟢 Legal/Decriminalized</option>
            <option value="yellow">🟡 Medical Only</option>
            <option value="orange">🟠 Limited Medical</option>
            <option value="red">🔴 Illegal</option>
            <option value="darkred">⛔ Strictly Illegal</option>
          </select>
        </div>

        <div className={style.checkboxGroup}>
          <label>
            <input
              type="checkbox"
              checked={filters.showMedicalOnly}
              onChange={(e) => handleFilterChange('showMedicalOnly', e.target.checked)}
            />
            Medical Only
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.showRecreationalOnly}
              onChange={(e) => handleFilterChange('showRecreationalOnly', e.target.checked)}
            />
            Recreational Legal
          </label>
        </div>

      </div>


      {/* View Mode Toggle */}
      <div className={style.viewModeToggle}>
        <button 
          className={`${style.viewModeBtn} ${viewMode.mode === 'map' ? style.active : ''}`}
          onClick={() => setViewMode({ mode: 'map' })}
        >
          🗺️ Map View
        </button>
        <button 
          className={`${style.viewModeBtn} ${viewMode.mode === 'cards' ? style.active : ''}`}
          onClick={() => setViewMode({ mode: 'cards' })}
        >
          📋 Card View
        </button>
        <button 
          className={`${style.viewModeBtn} ${viewMode.mode === 'both' ? style.active : ''}`}
          onClick={() => setViewMode({ mode: 'both' })}
        >
          🔄 Both Views
        </button>
      </div>

      {/* Main Content Area */}
      <div className={`${style.mainContent} ${style[`view-${viewMode.mode}`]}`}>
        
        {/* Map Container */}
        {(viewMode.mode === 'map' || viewMode.mode === 'both') && (
          <div className={style.mapWrapper}>
            {/* Clear Filters Overlay */}
            <button 
              onClick={resetFilters} 
              className={style.clearFiltersOverlay}
              title="Clear all filters"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Custom Zoom Controls */}
            <div className={style.customZoomControls}>
              <button 
                className={style.zoomButton}
                onClick={() => mapRef.current?.setZoom(mapRef.current.getZoom() + 1)}
                title="Zoom In"
              >
                +
              </button>
              <button 
                className={style.zoomButton}
                onClick={() => mapRef.current?.setZoom(mapRef.current.getZoom() - 1)}
                title="Zoom Out"
              >
                −
              </button>
              <button 
                className={style.zoomButton}
                onClick={() => {
                  if (showGlobalView) {
                    mapRef.current?.setView([20, 0], isMobile ? 1 : 2);
                  } else {
                    mapRef.current?.setView([39.8283, -98.5795], isMobile ? 3 : 4);
                  }
                }}
                title="Reset View"
              >
                🏠
              </button>
            </div>
            
            <MapContainer
              center={showGlobalView ? [20, 0] : [39.8283, -98.5795]}
              zoom={showGlobalView ? (isMobile ? 1 : 2) : (isMobile ? 3 : 4)}
              className={style.mapContainer}
              scrollWheelZoom={true}
              ref={mapRef}
              key={showGlobalView ? 'global' : 'us'} // Force re-render when switching views
              preferCanvas={true} // Use Canvas for better performance
              zoomControl={false} // We'll add custom controls
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Cannabis data by <a href="https://bluntdao.org">BluntDAO</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={18}
                tileSize={256}
                updateWhenIdle={true}
                updateWhenZooming={false}
                keepBuffer={2}
              />
              
              {/* Performance Optimizer Component */}
              <MapPerformanceOptimizer 
                showGlobalView={showGlobalView} 
                isMobile={isMobile} 
              />
              
              {showGlobalView && worldGeoData && (
                <GeoJSON
                  data={worldGeoData}
                  style={geoJsonStyle}
                  onEachFeature={onEachFeature}
                />
              )}
              
              {!showGlobalView && usGeoData && (
                <GeoJSON
                  data={usGeoData}
                  style={geoJsonStyle}
                  onEachFeature={onEachFeature}
                />
              )}
            </MapContainer>
            
            {/* Map Legend/Key Overlay */}
            <div className={style.mapLegendOverlay}>
              <div className={style.legendHeader}>
                <h4>Legal Status</h4>
                <button 
                  className={style.legendToggle}
                  onClick={() => {/* Toggle legend details */}}
                  title="Double-click for details"
                >
                  ℹ️
                </button>
              </div>
              <div className={style.legendItems}>
                {Object.entries(cannabisData.legalCategories as any).map(([colorCode, category]: [string, any]) => (
                  <div 
                    key={colorCode} 
                    className={style.legendItem}
                    onDoubleClick={() => {
                      alert(`${category.label}\n\n${category.description}`);
                    }}
                    title="Double-click for details"
                  >
                    <div 
                      className={style.legendColorDot}
                      style={{ backgroundColor: getStatusColor(colorCode) }}
                    />
                    <span className={style.legendLabel}>{category.label.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cards View */}
        {(viewMode.mode === 'cards' || viewMode.mode === 'both') && (
          <div className={style.cardsContainer}>
            <h2>🌍 Cannabis Legal Status by Region</h2>
            <div className={style.cardsGrid}>
              {filteredRegions.map(([regionName, regionData]: [string, any]) => (
                <div
                  key={regionName}
                  className={`${style.regionCard} ${selectedCard === regionName ? style.selected : ''} ${hoveredRegion === regionName ? style.hovered : ''}`}
                  onClick={() => handleCardClick(regionName)}
                  onMouseEnter={() => handleCardHover(regionName)}
                  onMouseLeave={() => handleCardHover(null)}
                >
                  <div className={style.cardHeader}>
                    <h3>{regionName}</h3>
                    <div 
                      className={style.statusIndicator}
                      style={{ backgroundColor: getStatusColor(regionData.colorCode || regionData.overallStatus || 'darkred') }}
                    />
                  </div>
                  
                  <div className={style.cardContent}>
                    <div className={style.statusRow}>
                      <span className={style.label}>🎯 Recreational:</span>
                      <span className={`${style.status} ${(regionData.recreational === 'Legal') ? style.legal : style.illegal}`}>
                        {regionData.recreational || 'Unknown'}
                      </span>
                    </div>
                    
                    <div className={style.statusRow}>
                      <span className={style.label}>🏥 Medical:</span>
                      <span className={`${style.status} ${(regionData.medical === 'Legal') ? style.legal : style.illegal}`}>
                        {regionData.medical || 'Unknown'}
                      </span>
                    </div>
                    
                    <div className={style.statusRow}>
                      <span className={style.label}>🏪 Dispensaries:</span>
                      <span className={style.count}>{regionData.stores || 0}</span>
                    </div>
                    
                    {regionData.bluntdaoChapter && (
                      <div className={style.chapterBadge}>
                        🌿 {regionData.bluntdaoChapter}
                      </div>
                    )}
                  </div>
                  
                  <div className={style.cardFooter}>
                    <Link 
                      to={regionName.includes(', USA') 
                        ? `/map/United States/${regionName.replace(', USA', '')}` 
                        : `/map/${regionName}`
                      } 
                      className={style.detailsBtn}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Region Details Panel */}
      {selectedRegion && (
        <div className={style.regionDetails}>
          <div className={style.regionDetailsContent}>
            <button 
              className={style.closeButton}
              onClick={() => {
                setSelectedRegion(null);
                setSelectedCard(null);
              }}
            >
              ✕
            </button>
            <RegionDetailsPanel regionName={selectedRegion} />
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className={style.statistics}>
        <h2>📊 Global Cannabis Legalization Statistics</h2>
        <div className={style.statsGrid}>
          <div className={style.statCard}>
            <div className={style.statIcon}>🎯</div>
            <h3>{filteredRegions.filter(([_, data]: [string, any]) => data.recreational === 'Legal').length}</h3>
            <p>Recreational Legal</p>
          </div>
          <div className={style.statCard}>
            <div className={style.statIcon}>🏥</div>
            <h3>{filteredRegions.filter(([_, data]: [string, any]) => data.medical === 'Legal').length}</h3>
            <p>Medical Legal</p>
          </div>
          <div className={style.statCard}>
            <div className={style.statIcon}>🏪</div>
            <h3>{filteredRegions.reduce((sum, [_, data]: [string, any]) => sum + (data.stores || 0), 0)}</h3>
            <p>Total Dispensaries</p>
          </div>
          <div className={style.statCard}>
            <div className={style.statIcon}>🌿</div>
            <h3>{filteredRegions.filter(([_, data]: [string, any]) => data.bluntdaoChapter).length}</h3>
            <p>BluntDAO Chapters</p>
          </div>
        </div>
      </div>

      {/* BluntDAO Chapters Section */}
      <div className={style.chaptersSection}>
        <h2>🌿 BluntDAO Global Chapters</h2>
        <p>Connect with local BluntDAO communities worldwide</p>
        <div className={style.chaptersGrid}>
          {filteredRegions
            .filter(([_, data]: [string, any]) => data.bluntdaoChapter)
            .map(([regionName, regionData]: [string, any]) => (
              <div key={regionName} className={style.chapterCard}>
                <h4>{regionData.bluntdaoChapter}</h4>
                <p>{regionName}</p>
                <div className={style.chapterStatus}>
                  Status: {regionData.recreational === 'Legal' ? '🟢 Legal' : '🟡 Medical Only'}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Resources Section */}
      <div className={style.resources}>
        <h2>📚 Legal Resources & Sources</h2>
        <div className={style.resourcesList}>
          {cannabisData.sources.map((source: any, index: number) => (
            <div key={index} className={style.resourceCard}>
              <h4>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  🔗 {source.title}
                </a>
              </h4>
              <p>{source.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer backgroundColor="transparent" />
    </div>
  );
};

// Region Details Panel Component
const RegionDetailsPanel: React.FC<{ regionName: string }> = ({ regionName }) => {
  // Check if it's a US state or country
  const states = (cannabisData.countries["United States"]?.states as any) || {};
  const countries = cannabisData.countries as any;
  
  let regionData = states[regionName] || states[regionName.replace(', USA', '')];
  if (!regionData) {
    regionData = countries[regionName];
  }
  
  if (!regionData) return null;

  return (
    <div className={style.regionDetailsPanel}>
      <div className={style.detailsHeader}>
        <h2>🌿 {regionName}</h2>
        {regionData.bluntdaoChapter && (
          <div className={style.chapterBadge}>
            BluntDAO Chapter: {regionData.bluntdaoChapter}
          </div>
        )}
      </div>
      
      <div className={style.statusBadges}>
        <span className={`${style.badge} ${style[`badge-${regionData.colorCode || regionData.overallStatus || 'darkred'}`]}`}>
          {(cannabisData.legalCategories as any)[regionData.colorCode || regionData.overallStatus || 'darkred']?.label || 'Unknown Status'}
        </span>
      </div>

      <div className={style.detailsGrid}>
        <div className={style.detailItem}>
          <strong>🎯 Recreational Status:</strong>
          <span className={(regionData.recreational === 'Legal') ? style.legal : style.illegal}>
            {regionData.recreational || 'Unknown'}
          </span>
        </div>
        <div className={style.detailItem}>
          <strong>🏥 Medical Status:</strong>
          <span className={(regionData.medical === 'Legal') ? style.legal : style.illegal}>
            {regionData.medical || 'Unknown'}
          </span>
        </div>
        {regionData.penalties && (
          <div className={style.detailItem}>
            <strong>⚖️ Penalties:</strong>
            <span>{regionData.penalties}</span>
          </div>
        )}
        <div className={style.detailItem}>
          <strong>🏪 Licensed Dispensaries:</strong>
          <span className={style.count}>{regionData.stores || 0}</span>
        </div>
      </div>

      {regionData.laws && (
        <div className={style.lawsSection}>
          <h4>📜 Legal History & Current Laws</h4>
          <p>{regionData.laws}</p>
        </div>
      )}

      {regionData.businesses && regionData.businesses.length > 0 && (
        <div className={style.businessesSection}>
          <h4>🏢 Major Cannabis Businesses</h4>
          <ul>
            {regionData.businesses.map((business: string, index: number) => (
              <li key={index}>{business}</li>
            ))}
          </ul>
        </div>
      )}

      {regionData.notes && (
        <div className={style.notesSection}>
          <h4>📝 Additional Notes</h4>
          <p>{regionData.notes}</p>
        </div>
      )}
    </div>
  );
};

export default Map;