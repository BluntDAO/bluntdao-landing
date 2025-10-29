import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import style from './Map.module.css';
import cannabisData from '../../data/cannabisLegalData.json';
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';

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
}

interface ViewMode {
  mode: 'map' | 'cards' | 'both';
}

const Map: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>({ mode: 'both' });
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const [filters, setFilters] = useState<FilterState>({
    legalStatus: 'all',
    searchTerm: '',
    showMedicalOnly: false,
    showRecreationalOnly: false,
  });
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load US states GeoJSON data
  useEffect(() => {
    const loadGeoData = async () => {
      try {
        // Using a more reliable US states GeoJSON source
        const response = await fetch('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json');
        const data = await response.json();
        setGeoData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading geo data:', error);
        setLoading(false);
      }
    };

    loadGeoData();
  }, []);

  // BluntDAO theme colors for legal status
  const getColor = (status: string) => {
    switch (status) {
      case 'green': return '#00ff88'; // BluntDAO Green - Fully Legal
      case 'lightgreen': return '#39ff14'; // Neon Green - Legal/Decriminalized
      case 'yellow': return '#ffff00'; // Bright Yellow - Medical Only
      case 'orange': return '#ff8c00'; // Dark Orange - Limited Medical
      case 'red': return '#ff4444'; // Bright Red - Illegal
      case 'darkred': return '#cc0000'; // Dark Red - Strictly Illegal
      default: return '#708090'; // Slate Grey - Unknown
    }
  };

  // Handle card click to highlight map region
  const handleCardClick = (regionName: string) => {
    setSelectedCard(regionName);
    setSelectedState(regionName);
    
    // Find and zoom to the region on map
    if (mapRef.current && geoData) {
      const feature = geoData.features.find((f: any) => 
        f.properties.NAME === regionName || f.properties.name === regionName
      );
      if (feature && feature.geometry) {
        const bounds = L.geoJSON(feature).getBounds();
        mapRef.current.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  };

  // Handle card hover to highlight map region
  const handleCardHover = (regionName: string | null) => {
    setHoveredRegion(regionName);
  };

  // Color mapping for different legal statuses
  const getStateColor = (stateName: string): string => {
    const stateData = cannabisData.countries["United States"]?.states?.[stateName];
    if (!stateData) return '#cccccc';
    
    return getColor(stateData.colorCode);
  };

  // Filter states based on current filters
  const filteredStates = useMemo(() => {
    const states = cannabisData.countries["United States"]?.states || {};
    
    return Object.entries(states).filter(([stateName, stateData]) => {
      // Search term filter
      if (filters.searchTerm && !stateName.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }

      // Legal status filter
      if (filters.legalStatus !== 'all') {
        if (filters.legalStatus !== stateData.colorCode) {
          return false;
        }
      }

      // Medical only filter
      if (filters.showMedicalOnly && stateData.recreational === 'Legal') {
        return false;
      }

      // Recreational only filter
      if (filters.showRecreationalOnly && stateData.recreational !== 'Legal') {
        return false;
      }

      return true;
    });
  }, [filters]);

  // GeoJSON style function
  const geoJsonStyle = (feature: any) => {
    const stateName = feature.properties.NAME;
    const color = getStateColor(stateName);
    const isHovered = hoveredRegion === stateName;
    const isSelected = selectedState === stateName;
    
    return {
      fillColor: color,
      weight: isSelected ? 4 : isHovered ? 3 : 2,
      opacity: 1,
      color: isSelected ? '#00ff88' : isHovered ? '#ffffff' : '#333333',
      dashArray: isSelected ? '' : '3',
      fillOpacity: isSelected ? 0.9 : isHovered ? 0.8 : 0.7
    };
  };

  // Handle feature events
  const onEachFeature = (feature: any, layer: any) => {
    const stateName = feature.properties.NAME;
    const stateData = cannabisData.countries["United States"]?.states?.[stateName];
    
    if (stateData) {
      layer.on({
        mouseover: (e: any) => {
          const layer = e.target;
          setHoveredRegion(stateName);
          layer.setStyle({
            weight: 3,
            color: '#ffffff',
            dashArray: '',
            fillOpacity: 0.8
          });
        },
        mouseout: (e: any) => {
          const layer = e.target;
          setHoveredRegion(null);
          layer.setStyle(geoJsonStyle(feature));
        },
        click: () => {
          setSelectedState(stateName);
          setSelectedCard(stateName);
        }
      });

      // Bind popup with state information
      layer.bindPopup(`
        <div class="${style.popupContent}">
          <h3 style="color: #00ff88; margin: 0 0 10px 0;">${stateName}</h3>
          <p><strong>Recreational:</strong> <span style="color: ${stateData.recreational === 'Legal' ? '#00ff88' : '#ff4444'}">${stateData.recreational}</span></p>
          <p><strong>Medical:</strong> <span style="color: ${stateData.medical === 'Legal' ? '#00ff88' : '#ff4444'}">${stateData.medical}</span></p>
          <p><strong>Dispensaries:</strong> ${stateData.stores || 0}</p>
          ${stateData.notes ? `<p><small style="color: #666;">${stateData.notes}</small></p>` : ''}
          <button onclick="document.querySelector('.${style.closeButton}')?.click()" style="background: #00ff88; color: black; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-top: 10px;">View Details</button>
        </div>
      `);
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      legalStatus: 'all',
      searchTerm: '',
      showMedicalOnly: false,
      showRecreationalOnly: false,
    });
    setSelectedState(null);
    setSelectedCard(null);
  };

  if (loading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.loadingSpinner}>
          <div className={style.spinner}></div>
          <p>Loading Cannabis Legal Status Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <Navbar />
      
      {/* SEO-optimized header */}
      <div className={style.header}>
        <h1>🌿 Cannabis Legal Status Map - Global 2024</h1>
        <p className={style.description}>
          Interactive map showing current cannabis legalization status worldwide. 
          Explore recreational and medical marijuana laws, penalties, and dispensary information 
          with real-time data and official sources. Powered by BluntDAO community research.
        </p>
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

      {/* Filters and Search */}
      <div className={style.filtersContainer}>
        <div className={style.searchBox}>
          <input
            type="text"
            placeholder="🔍 Search states/countries..."
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

        <button onClick={resetFilters} className={style.resetButton}>
          🔄 Reset Filters
        </button>
      </div>

      {/* Legend */}
      <div className={style.legend}>
        <h3>🏷️ Legal Status Legend</h3>
        <div className={style.legendItems}>
          {Object.entries(cannabisData.legalCategories).map(([colorCode, category]) => (
            <div key={colorCode} className={style.legendItem}>
              <div 
                className={style.legendColor}
                style={{ backgroundColor: getColor(colorCode) }}
              />
              <span>{category.label}</span>
              <small>({category.description})</small>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`${style.mainContent} ${style[`view-${viewMode.mode}`]}`}>
        
        {/* Map Container */}
        {(viewMode.mode === 'map' || viewMode.mode === 'both') && (
          <div className={style.mapWrapper}>
            <MapContainer
              center={[39.8283, -98.5795]} // Center of US
              zoom={isMobile ? 3 : 4}
              className={style.mapContainer}
              scrollWheelZoom={true}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Cannabis data by <a href="https://bluntdao.org">BluntDAO</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {geoData && (
                <GeoJSON
                  data={geoData}
                  style={geoJsonStyle}
                  onEachFeature={onEachFeature}
                />
              )}
            </MapContainer>
          </div>
        )}

        {/* Cards View */}
        {(viewMode.mode === 'cards' || viewMode.mode === 'both') && (
          <div className={style.cardsContainer}>
            <h2>🌍 Cannabis Legal Status by Region</h2>
            <div className={style.cardsGrid}>
              {filteredStates.map(([stateName, stateData]) => (
                <div
                  key={stateName}
                  className={`${style.stateCard} ${selectedCard === stateName ? style.selected : ''} ${hoveredRegion === stateName ? style.hovered : ''}`}
                  onClick={() => handleCardClick(stateName)}
                  onMouseEnter={() => handleCardHover(stateName)}
                  onMouseLeave={() => handleCardHover(null)}
                >
                  <div className={style.cardHeader}>
                    <h3>{stateName}</h3>
                    <div 
                      className={style.statusIndicator}
                      style={{ backgroundColor: getColor(stateData.colorCode) }}
                    />
                  </div>
                  
                  <div className={style.cardContent}>
                    <div className={style.statusRow}>
                      <span className={style.label}>🎯 Recreational:</span>
                      <span className={`${style.status} ${stateData.recreational === 'Legal' ? style.legal : style.illegal}`}>
                        {stateData.recreational}
                      </span>
                    </div>
                    
                    <div className={style.statusRow}>
                      <span className={style.label}>🏥 Medical:</span>
                      <span className={`${style.status} ${stateData.medical === 'Legal' ? style.legal : style.illegal}`}>
                        {stateData.medical}
                      </span>
                    </div>
                    
                    <div className={style.statusRow}>
                      <span className={style.label}>🏪 Dispensaries:</span>
                      <span className={style.count}>{stateData.stores || 0}</span>
                    </div>
                    
                    {stateData.bluntdaoChapter && (
                      <div className={style.chapterBadge}>
                        🌿 BluntDAO Chapter: {stateData.bluntdaoChapter}
                      </div>
                    )}
                  </div>
                  
                  <div className={style.cardFooter}>
                    <button className={style.detailsBtn}>
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* State Details Panel */}
      {selectedState && (
        <div className={style.stateDetails}>
          <div className={style.stateDetailsContent}>
            <button 
              className={style.closeButton}
              onClick={() => {
                setSelectedState(null);
                setSelectedCard(null);
              }}
            >
              ✕
            </button>
            <StateDetailsPanel stateName={selectedState} />
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className={style.statistics}>
        <h2>📊 Cannabis Legalization Statistics</h2>
        <div className={style.statsGrid}>
          <div className={style.statCard}>
            <div className={style.statIcon}>🎯</div>
            <h3>{filteredStates.filter(([_, data]) => data.recreational === 'Legal').length}</h3>
            <p>Recreational Legal</p>
          </div>
          <div className={style.statCard}>
            <div className={style.statIcon}>🏥</div>
            <h3>{filteredStates.filter(([_, data]) => data.medical === 'Legal').length}</h3>
            <p>Medical Legal</p>
          </div>
          <div className={style.statCard}>
            <div className={style.statIcon}>🏪</div>
            <h3>{filteredStates.reduce((sum, [_, data]) => sum + (data.stores || 0), 0)}</h3>
            <p>Total Dispensaries</p>
          </div>
          <div className={style.statCard}>
            <div className={style.statIcon}>🌿</div>
            <h3>{filteredStates.filter(([_, data]) => data.bluntdaoChapter).length}</h3>
            <p>BluntDAO Chapters</p>
          </div>
        </div>
      </div>

      {/* BluntDAO Chapters Section */}
      <div className={style.chaptersSection}>
        <h2>🌿 BluntDAO Global Chapters</h2>
        <p>Connect with local BluntDAO communities worldwide</p>
        <div className={style.chaptersGrid}>
          {filteredStates
            .filter(([_, data]) => data.bluntdaoChapter)
            .map(([stateName, stateData]) => (
              <div key={stateName} className={style.chapterCard}>
                <h4>{stateData.bluntdaoChapter}</h4>
                <p>{stateName}</p>
                <div className={style.chapterStatus}>
                  Status: {stateData.recreational === 'Legal' ? '🟢 Legal' : '🟡 Medical Only'}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Resources Section */}
      <div className={style.resources}>
        <h2>📚 Legal Resources & Sources</h2>
        <div className={style.resourcesList}>
          {cannabisData.sources.map((source, index) => (
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

// State Details Panel Component
const StateDetailsPanel: React.FC<{ stateName: string }> = ({ stateName }) => {
  const stateData = cannabisData.countries["United States"]?.states?.[stateName];
  
  if (!stateData) return null;

  return (
    <div className={style.stateDetailsPanel}>
      <div className={style.detailsHeader}>
        <h2>🌿 {stateName}</h2>
        {stateData.bluntdaoChapter && (
          <div className={style.chapterBadge}>
            BluntDAO Chapter: {stateData.bluntdaoChapter}
          </div>
        )}
      </div>
      
      <div className={style.statusBadges}>
        <span className={`${style.badge} ${style[`badge-${stateData.colorCode}`]}`}>
          {cannabisData.legalCategories[stateData.colorCode as keyof typeof cannabisData.legalCategories]?.label}
        </span>
      </div>

      <div className={style.detailsGrid}>
        <div className={style.detailItem}>
          <strong>🎯 Recreational Status:</strong>
          <span className={stateData.recreational === 'Legal' ? style.legal : style.illegal}>
            {stateData.recreational}
          </span>
        </div>
        <div className={style.detailItem}>
          <strong>🏥 Medical Status:</strong>
          <span className={stateData.medical === 'Legal' ? style.legal : style.illegal}>
            {stateData.medical}
          </span>
        </div>
        {stateData.penalties && (
          <div className={style.detailItem}>
            <strong>⚖️ Penalties:</strong>
            <span>{stateData.penalties}</span>
          </div>
        )}
        <div className={style.detailItem}>
          <strong>🏪 Licensed Dispensaries:</strong>
          <span className={style.count}>{stateData.stores || 0}</span>
        </div>
      </div>

      {stateData.laws && (
        <div className={style.lawsSection}>
          <h4>📜 Legal History & Current Laws</h4>
          <p>{stateData.laws}</p>
        </div>
      )}

      {stateData.businesses && stateData.businesses.length > 0 && (
        <div className={style.businessesSection}>
          <h4>🏢 Major Cannabis Businesses</h4>
          <ul>
            {stateData.businesses.map((business, index) => (
              <li key={index}>{business}</li>
            ))}
          </ul>
        </div>
      )}

      {stateData.notes && (
        <div className={style.notesSection}>
          <h4>📝 Additional Notes</h4>
          <p>{stateData.notes}</p>
        </div>
      )}
    </div>
  );
};

export default Map;