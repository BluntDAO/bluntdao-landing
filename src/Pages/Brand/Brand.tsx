import React, { useState, useEffect } from 'react';
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import styles from './Brand.module.css';

const Brand: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string>('');

  // SEO Meta Tags
  useEffect(() => {
    document.title = "BluntDAO Brand Guidelines | Official Brand Assets & Style Guide";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Official BluntDAO brand guidelines, logos, colors, typography, and assets. Onboarding the next million people to web3, 1 blunt at a time.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Official BluntDAO brand guidelines, logos, colors, typography, and assets. Onboarding the next million people to web3, 1 blunt at a time.';
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'BluntDAO, brand guidelines, web3, cannabis, DAO, logos, brand assets, style guide, Proof of Sesh');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'BluntDAO, brand guidelines, web3, cannabis, DAO, logos, brand assets, style guide, Proof of Sesh';
      document.head.appendChild(meta);
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'BluntDAO Brand Guidelines');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = 'BluntDAO Brand Guidelines';
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Official BluntDAO brand guidelines, logos, colors, and assets for the web3 cannabis community.');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = 'Official BluntDAO brand guidelines, logos, colors, and assets for the web3 cannabis community.';
      document.head.appendChild(meta);
    }

    return () => {
      document.title = "BluntDAO";
    };
  }, []);

  const brandColors = [
    { name: 'BluntDAO Orange', hex: '#F1592A', description: 'Primary brand color' },
    { name: 'BluntDAO Brown', hex: '#764C29', description: 'Secondary brand color' },
    { name: 'Black', hex: '#000000', description: 'Classic brand black' },
    { name: 'White', hex: '#FFFFFF', description: 'Clean contrast' },
    { name: 'Light Black', hex: '#1A1D1F', description: 'Subtle dark tone' },
    { name: 'Classic Red', hex: '#D70411', description: 'Legacy brand red' }
  ];

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(''), 2000);
  };

  const downloadFont = () => {
    window.open('https://fonts.google.com/specimen/Londrina+Solid', '_blank');
  };

  return (
    <div className={styles.container}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>BluntDAO Brand Guidelines</h1>
          <p className={styles.heroSubtitle}>
            Onboarding the next million people to web3, 1 blunt at a time 💨
          </p>
          <div className={styles.heroEmojis}>
            <span>💨</span>
            <span>🍃</span>
            <span>🌴</span>
            <span>🔌</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>About Us</h2>
          <p className={styles.aboutText}>
            We are onboarding the next million people to web3, 1 blunt at a time, powered by 
            <strong> Proof of Sesh</strong> & the <strong>Re-up protocol</strong>.
          </p>
          <p className={styles.positioningText}>
            <strong>Positioning:</strong> We are the deepest network of professionals in the Web3 space, 
            building community with the release of consumer-facing applications.
          </p>
          
          <div className={styles.personalityGrid}>
            <h3>Brand Personality</h3>
            <div className={styles.personalityTags}>
              <span className={styles.tag}>Funny</span>
              <span className={styles.tag}>Hilarious</span>
              <span className={styles.tag}>Reliable</span>
              <span className={styles.tag}>Tapped In</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Colors */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Brand Colors</h2>
          <div className={styles.colorGrid}>
            {brandColors.map((color, index) => (
              <div key={index} className={styles.colorCard}>
                <div 
                  className={styles.colorSwatch}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyToClipboard(color.hex)}
                >
                  {copiedColor === color.hex && (
                    <div className={styles.copiedIndicator}>Copied!</div>
                  )}
                </div>
                <div className={styles.colorInfo}>
                  <h4>{color.name}</h4>
                  <p className={styles.hexCode}>{color.hex}</p>
                  <p className={styles.colorDescription}>{color.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Typography</h2>
          <div className={styles.typographyGrid}>
            <div className={styles.fontCard}>
              <h3>Headings</h3>
              <div className={styles.fontExample} style={{ fontFamily: 'Londrina Solid, cursive' }}>
                <h1>Londrina Solid</h1>
                <p>Primary heading font</p>
              </div>
              <button className={styles.downloadBtn} onClick={downloadFont}>
                Download Font
              </button>
            </div>
            <div className={styles.fontCard}>
              <h3>Body Text</h3>
              <div className={styles.fontExample} style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                <p>Helvetica</p>
                <p>Clean, readable body text</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Assets */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Logo Assets</h2>
          <div className={styles.logoGrid}>
            <div className={styles.logoCard}>
              <div className={styles.logoContainer}>
                <img src="/img/SpliffDAOWatermark.png" alt="SpliffDAO Logo" className={styles.logoImage} />
              </div>
              <h4>SpliffDAO Parody Logo</h4>
              <p>Parody of Raw papers branding</p>
            </div>
            
            <div className={styles.logoCard}>
              <div className={styles.logoContainer}>
                <img src="/img/BluntDAO.png" alt="BluntDAO Logo" className={styles.logoImage} />
              </div>
              <h4>BluntDAO Primary Logo</h4>
              <p>Main brand identity</p>
            </div>

            <div className={styles.logoCard}>
              <div className={styles.logoContainer}>
                <div className={styles.textLogo}>BLUNT DAO</div>
              </div>
              <h4>Text Logo</h4>
              <p>Londrina Solid typography</p>
            </div>
          </div>

          <div className={styles.logoDownload}>
            <a 
              href="https://drive.google.com/drive/u/0/folders/1yVlCQXw7G3EAS8hBqHxyZxkkOJMqY_o_" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.driveLink}
            >
              📁 Full Logo Pack on Google Drive
            </a>
          </div>
        </div>
      </section>

      {/* Tone of Voice */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Tone of Voice</h2>
          <div className={styles.toneGrid}>
            <div className={styles.toneCard}>
              <h3>👍 Like This</h3>
              <ul>
                <li><strong>Enthusiastic:</strong> High energy, excited about web3</li>
                <li><strong>Funny:</strong> Witty, meme-aware, playful</li>
                <li><strong>Culture:</strong> Gen Z, street culture, tech-savvy</li>
                <li><strong>Ridiculously Obvious:</strong> Clear, direct communication</li>
                <li><strong>Community Driven:</strong> Inclusive, collaborative</li>
              </ul>
            </div>
            <div className={styles.toneCard}>
              <h3>💤 Not This</h3>
              <ul>
                <li><strong>Boring:</strong> Avoid corporate speak</li>
                <li><strong>No Humor:</strong> Don't be too serious</li>
                <li><strong>Not Tapped In:</strong> Stay culturally relevant</li>
                <li><strong>Over Complex:</strong> Keep it simple</li>
                <li><strong>Very Corporate:</strong> Maintain authenticity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Illustration Style */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Illustration Style</h2>
          <p className={styles.illustrationDescription}>
            We use optimistic graphics generated by ChatGPT DALL-E, ranging from 32-bit pixel art 
            to cartoonish and realistic styles. Our visuals are vibrant, community-focused, and web3-native.
          </p>
          
          <div className={styles.exampleGrid}>
            <div className={styles.exampleCard}>
              <img src="/img/BluntDAOLA.gif" alt="BluntDAO LA Event" className={styles.exampleImage} />
              <p>Community event graphics</p>
            </div>
            <div className={styles.exampleCard}>
              <img src="/img/ethblunt.gif" alt="ETH Blunt NFT" className={styles.exampleImage} />
              <p>NFT collection artwork</p>
            </div>
            <div className={styles.exampleCard}>
              <img src="/img/BluntAnimated.gif" alt="BluntDAO Animation" className={styles.exampleImage} />
              <p>Animated brand elements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Brand Resources</h2>
          <div className={styles.resourceGrid}>
            <a href="https://blunts.wtf" target="_blank" rel="noopener noreferrer" className={styles.resourceCard}>
              <h4>Blunts.wtf (OUNCERS)</h4>
              <p>NFT collection and community platform</p>
            </a>
            <a href="https://bluntdao.org/nouns-art" target="_blank" rel="noopener noreferrer" className={styles.resourceCard}>
              <h4>CC0 Assets</h4>
              <p>Open-source artwork based on Nouns DAO</p>
            </a>
            <a href="https://lu.ma/sesh" target="_blank" rel="noopener noreferrer" className={styles.resourceCard}>
              <h4>Luma Events</h4>
              <p>Community events and meetups</p>
            </a>
            <a href="https://www.figma.com/design/iw9ePuP780GyXPnjgVQboZ/BLUNTDAO" target="_blank" rel="noopener noreferrer" className={styles.resourceCard}>
              <h4>Figma Design System</h4>
              <p>Complete brand guidelines and components</p>
            </a>
          </div>
        </div>
      </section>

      <Footer backgroundColor="#000000" />
    </div>
  );
};

export default Brand;
