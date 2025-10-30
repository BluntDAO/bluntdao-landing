import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';
import cannabisData from '../../data/cannabisLegalData.json';
import { getStatusIcon } from '../../assets/icons/StatusIcons';
import styles from './CountryDetail.module.css';

interface CountryParams {
  country: string;
  state?: string;
}

const CountryDetail: React.FC = () => {
  const { country, state } = useParams<CountryParams>();
  const [regionData, setRegionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadRegionData = () => {
      try {
        const countries = cannabisData.countries as any;
        
        if (state) {
          // US State page
          const usData = countries["United States"];
          if (usData && usData.states && usData.states[state]) {
            const stateData = {
              ...usData.states[state],
              name: state,
              type: 'state',
              country: 'United States'
            };
            setRegionData(stateData);
          } else {
            setNotFound(true);
          }
        } else {
          // Country page
          if (countries[country!]) {
            const countryData = {
              ...countries[country!],
              name: country,
              type: 'country'
            };
            setRegionData(countryData);
          } else {
            setNotFound(true);
          }
        }
      } catch (error) {
        console.error('Error loading region data:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadRegionData();
  }, [country, state]);

  // SEO optimization
  useEffect(() => {
    if (regionData) {
      const regionName = state ? `${state}, United States` : country;
      const pageTitle = `${regionName} Cannabis Laws & Legal Status | BluntDAO`;
      const description = `Complete guide to cannabis laws in ${regionName}. Legal status: ${regionData.recreational || 'N/A'} recreational, ${regionData.medical || 'N/A'} medical. Dispensaries, penalties, and culture.`;
      
      document.title = pageTitle;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }

      // Add structured data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `Cannabis Laws in ${regionName}`,
        "description": description,
        "author": {
          "@type": "Organization",
          "name": "BluntDAO"
        },
        "publisher": {
          "@type": "Organization",
          "name": "BluntDAO",
          "logo": {
            "@type": "ImageObject",
            "url": "https://bluntdao.org/img/BluntDAO.png"
          }
        },
        "dateModified": "2024-12-29",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://bluntdao.org/map/${country}${state ? `/${state}` : ''}`
        },
        "about": {
          "@type": "Place",
          "name": regionName,
          "description": `Cannabis legal information for ${regionName}`
        },
        "keywords": `${regionName} cannabis laws, marijuana legal status, dispensaries, ${regionName} weed laws, cannabis culture`
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return () => {
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [regionData, country, state]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading cannabis legal information...</p>
        </div>
        <Footer backgroundColor="#000000" />
      </div>
    );
  }

  if (notFound || !regionData) {
    return (
      <div className={styles.container}>
        <Navbar />
        <div className={styles.notFound}>
          <img src="/img/404.png" alt="404 Not Found" className={styles.notFoundImage} />
          <h1>Region Not Found</h1>
          <p>We don't have cannabis legal information for this region yet.</p>
          <Link to="/map" className={styles.backButton}>
            ← Back to Map
          </Link>
        </div>
        <Footer backgroundColor="#000000" />
      </div>
    );
  }

  const regionName = state ? `${state}, United States` : country;
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Legal': return '#00ff88';
      case 'Decriminalized': return '#00d4ff';
      case 'Legal (No Sales)': return '#00d4ff';
      case 'Legal (Prescription Only)': return '#ffd700';
      case 'Illegal': return '#ff4757';
      default: return '#636e72';
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/map">Cannabis Map</Link>
        <span>›</span>
        {state ? (
          <>
            <Link to={`/map/United States`}>United States</Link>
            <span>›</span>
            <span>{state}</span>
          </>
        ) : (
          <span>{country}</span>
        )}
      </nav>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Cannabis Laws in {regionName}
          </h1>
          <div className={styles.statusBadges}>
            <div className={styles.statusBadge} style={{ borderColor: getStatusColor(regionData.recreational) }}>
              {getStatusIcon(regionData.colorCode, 20)}
              <span>Recreational: {regionData.recreational || 'Illegal'}</span>
            </div>
            <div className={styles.statusBadge} style={{ borderColor: getStatusColor(regionData.medical) }}>
              {getStatusIcon(regionData.colorCode, 20)}
              <span>Medical: {regionData.medical || 'Illegal'}</span>
            </div>
          </div>
          
          {regionData.bluntdaoChapter && (
            <div className={styles.chapterBadge}>
              {regionData.chapterLinks ? (
                regionData.bluntdaoChapter.split(', ').map((chapterName: string, index: number) => {
                  const link = regionData.chapterLinks[chapterName.trim()];
                  return (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.chapterLink}
                    >
                      🌿 {chapterName.trim()}
                    </a>
                  );
                })
              ) : (
                <span>🌿 {regionData.bluntdaoChapter}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        
        {/* Legal Overview */}
        <section className={styles.section}>
          <h2>📋 Legal Overview</h2>
          <div className={styles.legalGrid}>
            <div className={styles.legalCard}>
              <h3>Recreational Cannabis</h3>
              <div className={styles.status} style={{ color: getStatusColor(regionData.recreational) }}>
                {regionData.recreational || 'Illegal'}
              </div>
              <p>{regionData.recreationalNotes || 'No additional information available.'}</p>
            </div>
            
            <div className={styles.legalCard}>
              <h3>Medical Cannabis</h3>
              <div className={styles.status} style={{ color: getStatusColor(regionData.medical) }}>
                {regionData.medical || 'Illegal'}
              </div>
              <p>{regionData.medicalNotes || 'No additional information available.'}</p>
            </div>
          </div>
        </section>

        {/* Laws & Regulations */}
        <section className={styles.section}>
          <h2>⚖️ Laws & Regulations</h2>
          <div className={styles.lawsContent}>
            <div className={styles.lawItem}>
              <h3>Current Laws</h3>
              <p>{regionData.laws || 'No specific law information available.'}</p>
            </div>
            
            {regionData.penalties && (
              <div className={styles.lawItem}>
                <h3>Penalties</h3>
                <p>{regionData.penalties}</p>
              </div>
            )}
            
            {regionData.possessionLimits && (
              <div className={styles.lawItem}>
                <h3>Possession Limits</h3>
                <p>{regionData.possessionLimits}</p>
              </div>
            )}
            
            {regionData.homeCultivation && (
              <div className={styles.lawItem}>
                <h3>Home Cultivation</h3>
                <p>{regionData.homeCultivation}</p>
              </div>
            )}
          </div>
        </section>

        {/* Market Information */}
        {(regionData.stores || regionData.businesses) && (
          <section className={styles.section}>
            <h2>🏪 Cannabis Market</h2>
            <div className={styles.marketGrid}>
              {regionData.stores && (
                <div className={styles.marketCard}>
                  <h3>Licensed Dispensaries</h3>
                  <div className={styles.marketStat}>
                    {typeof regionData.stores === 'number' ? regionData.stores : regionData.stores}
                  </div>
                </div>
              )}
              
              {regionData.businesses && regionData.businesses.length > 0 && (
                <div className={styles.marketCard}>
                  <h3>Major Cannabis Businesses</h3>
                  <ul className={styles.businessList}>
                    {regionData.businesses.slice(0, 5).map((business: string, index: number) => (
                      <li key={index}>{business}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Cannabis Culture */}
        <section className={styles.section}>
          <h2>🌿 Cannabis Culture & Notes</h2>
          <div className={styles.cultureContent}>
            <p>{regionData.notes || 'Cannabis culture information is being researched for this region.'}</p>
            
            {regionData.culturalNotes && (
              <div className={styles.culturalNote}>
                <h3>Cultural Context</h3>
                <p>{regionData.culturalNotes}</p>
              </div>
            )}
          </div>
        </section>

        {/* Related Links */}
        <section className={styles.section}>
          <h2>🔗 Related Information</h2>
          <div className={styles.relatedLinks}>
            <Link to="/map" className={styles.relatedLink}>
              🗺️ Back to Global Cannabis Map
            </Link>
            
            {state ? (
              <Link to={`/map/United States`} className={styles.relatedLink}>
                🇺🇸 Other US States
              </Link>
            ) : (
              <Link to="/map" className={styles.relatedLink}>
                🌍 Other Countries
              </Link>
            )}
            
            {regionData.bluntdaoChapter && (
              <div className={styles.chapterSection}>
                <h3>🌿 BluntDAO Chapters</h3>
                <div className={styles.chapterButtons}>
                  {regionData.chapterLinks ? (
                    regionData.bluntdaoChapter.split(', ').map((chapterName: string, index: number) => {
                      const link = regionData.chapterLinks[chapterName.trim()];
                      return (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.chapterButton}
                        >
                          💬 Join {chapterName.trim()}
                        </a>
                      );
                    })
                  ) : (
                    <a href="https://discord.com/invite/e3cGSTzyWp" target="_blank" rel="noopener noreferrer" className={styles.chapterButton}>
                      💬 Join {regionData.bluntdaoChapter}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer backgroundColor="#000000" />
    </div>
  );
};

export default CountryDetail;
