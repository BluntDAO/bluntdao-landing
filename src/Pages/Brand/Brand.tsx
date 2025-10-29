import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
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
    { 
      name: 'BluntDAO Orange', 
      hex: '#F1592A', 
      rgb: 'rgb(241, 89, 42)',
      hsl: 'hsl(14, 88%, 55%)',
      description: 'Primary brand color',
      filename: 'bluntdao-orange.png'
    },
    { 
      name: 'BluntDAO Brown', 
      hex: '#764C29', 
      rgb: 'rgb(118, 76, 41)',
      hsl: 'hsl(27, 48%, 31%)',
      description: 'Secondary brand color',
      filename: 'bluntdao-brown.png'
    },
    { 
      name: 'Black', 
      hex: '#000000', 
      rgb: 'rgb(0, 0, 0)',
      hsl: 'hsl(0, 0%, 0%)',
      description: 'Classic brand black',
      filename: 'bluntdao-black.png'
    },
    { 
      name: 'White', 
      hex: '#FFFFFF', 
      rgb: 'rgb(255, 255, 255)',
      hsl: 'hsl(0, 0%, 100%)',
      description: 'Clean contrast',
      filename: 'bluntdao-white.png'
    },
    { 
      name: 'Light Black', 
      hex: '#1A1D1F', 
      rgb: 'rgb(26, 29, 31)',
      hsl: 'hsl(204, 9%, 11%)',
      description: 'Subtle dark tone',
      filename: 'bluntdao-light-black.png'
    },
    { 
      name: 'Classic Red', 
      hex: '#D70411', 
      rgb: 'rgb(215, 4, 17)',
      hsl: 'hsl(356, 96%, 43%)',
      description: 'Legacy brand red',
      filename: 'bluntdao-red.png'
    }
  ];

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(''), 2000);
  };

  const downloadColorSquare = (hex: string, filename: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size (512x512 for high quality)
    canvas.width = 512;
    canvas.height = 512;
    
    if (ctx) {
      // Fill with the color
      ctx.fillStyle = hex;
      ctx.fillRect(0, 0, 512, 512);
      
      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    }
  };

  const downloadFont = () => {
    window.open('https://fonts.google.com/specimen/Londrina+Solid', '_blank');
  };

  // Comprehensive brand package download
  const downloadBrandPackage = async () => {
    const zip = new JSZip();

    // Create markdown file with comprehensive brand information
    const markdownContent = `# BluntDAO Brand Guidelines

## About BluntDAO

We are onboarding the next million people to web3, 1 blunt at a time, powered by **Proof of Sesh** & the **Re-up protocol**.

**Positioning:** We are the deepest network of professionals in the Web3 space, building community with the release of consumer-facing applications.

## Brand Personality
- Funny
- Hilarious  
- Reliable
- Tapped In

## Brand Colors

### Primary Colors
- **BluntDAO Orange:** #F1592A (Primary brand color)
- **BluntDAO Brown:** #764C29 (Secondary brand color)

### Classic Colors  
- **Black:** #000000 (Classic brand black)
- **White:** #FFFFFF (Clean contrast)
- **Light Black:** #1A1D1F (Subtle dark tone)
- **Classic Red:** #D70411 (Legacy brand red)

## Typography

### Headings
- **Font:** Londrina Solid
- **Download:** https://fonts.google.com/specimen/Londrina+Solid
- **Usage:** Primary heading font

### Body Text
- **Font:** Helvetica
- **Usage:** Clean, readable body text

## Emojis We Leverage
💨 🍃 🌴 🔌

## Tone of Voice

### 👍 Like This
- **Enthusiastic:** High energy, excited about web3
- **Funny:** Witty, meme-aware, playful
- **Culture:** Gen Z, street culture, tech-savvy
- **Ridiculously Obvious:** Clear, direct communication
- **Community Driven:** Inclusive, collaborative

### 💤 Not This
- **Boring:** Avoid corporate speak
- **No Humor:** Don't be too serious
- **Not Tapped In:** Stay culturally relevant
- **Over Complex:** Keep it simple
- **Very Corporate:** Maintain authenticity

## Illustration Style
We use optimistic graphics generated by ChatGPT DALL-E, ranging from 32-bit pixel art to cartoonish and realistic styles. Our visuals are vibrant, community-focused, and web3-native.

## BluntDAO Chapters
- BluntDAO Toronto (Canada)
- BluntDAO Amsterdam (Netherlands) 
- BluntDAO LA (California, USA)
- BluntDAO SF (California, USA)
- BluntDAO NYC (New York, USA)
- BluntDAO Miami (Florida, USA)

## Social Media & Community Links

### Primary Social Platforms
- **Website:** https://bluntdao.org
- **Discord:** https://discord.com/invite/e3cGSTzyWp
- **Twitter:** https://twitter.com/bluntdao
- **Instagram:** https://www.instagram.com/bluntdao/
- **Telegram:** https://t.me/bluntdao
- **YouTube:** https://www.youtube.com/channel/UCSWKFnP3z27XFu1CPRvqV6Q
- **LinkedIn:** https://www.linkedin.com/company/bluntdao/
- **Reddit:** https://www.reddit.com/r/BluntDAO/
- **Medium:** http://medium.com/@bluntdao
- **GitHub:** https://github.com/BluntDAO/

### Web3 & DAO Platforms
- **Snapshot (Voting):** https://snapshot.org/#/bluntdao.eth
- **Guild.xyz:** https://guild.xyz/bluntdao
- **Farcaster Channel:** https://warpcast.com/~/channel/bluntdao
- **Forum:** https://forum.bluntdao.org
- **NEAR DAO:** https://app.astrodao.com/dao/blunt.sputnik-dao.near
- **Solana DAO:** https://app.sqds.io/nft/6NrbQwDSvvnkn4Yv82hVnpyLoKsriPV1D7NUXwMKMxAp/

### NFT & Marketplace
- **Blunts.wtf (OUNCERS):** https://blunts.wtf
- **Nouns Fund:** https://nouns.build/dao/base/0x8a613Cb90Ab3b318D4e46D09F260a84b788e206b
- **Holaplex Marketplace:** https://bluntdao.holaplex.market/
- **CC0 Assets:** https://bluntdao.org/nouns-art

### Events & Community
- **Luma Events:** https://lu.ma/sesh
- **Newsletter:** https://subscribe.bluntdao.org
- **Shop/Merch:** https://shop.bluntdao.org

### Resources
- **Brand Assets:** https://drive.google.com/drive/u/0/folders/1yVlCQXw7G3EAS8hBqHxyZxkkOJMqY_o_
- **Figma Design System:** https://www.figma.com/design/iw9ePuP780GyXPnjgVQboZ/BLUNTDAO
- **Chapter Playbook:** https://app.charmverse.io/bluntdao/chapter-playbook-21045415295897296

## Usage Guidelines

### Logo Usage
- Use the primary BluntDAO logo on light backgrounds
- Use the SpliffDAO parody logo for cannabis-themed content
- Maintain clear space around logos
- Do not modify or distort logos

### Color Usage
- Orange (#F1592A) is the primary brand color
- Use brown (#764C29) as secondary accent
- Maintain sufficient contrast for readability
- Use classic colors (black, white) for text and backgrounds

### Typography Usage
- Use Londrina Solid for headings and display text
- Use Helvetica for body text and descriptions
- Maintain consistent hierarchy and spacing

---

*This brand package was generated from bluntdao.org/brand*
*Last updated: ${new Date().toLocaleDateString()}*
`;

    // Add markdown file to ZIP
    zip.file('BluntDAO-Brand-Guidelines.md', markdownContent);

    // Create a folder structure
    const assetsFolder = zip.folder('assets');
    const logosFolder = assetsFolder!.folder('logos');
    const fontsFolder = assetsFolder!.folder('fonts');
    const colorsFolder = assetsFolder!.folder('colors');

    // Add color palette as CSS file
    const cssColors = `/* BluntDAO Brand Colors */
:root {
  --bluntdao-orange: #F1592A;
  --bluntdao-brown: #764C29;
  --bluntdao-black: #000000;
  --bluntdao-white: #FFFFFF;
  --bluntdao-light-black: #1A1D1F;
  --bluntdao-red: #D70411;
}

/* Color Classes */
.bluntdao-orange { color: #F1592A; }
.bluntdao-brown { color: #764C29; }
.bluntdao-black { color: #000000; }
.bluntdao-white { color: #FFFFFF; }
.bluntdao-light-black { color: #1A1D1F; }
.bluntdao-red { color: #D70411; }

/* Background Classes */
.bg-bluntdao-orange { background-color: #F1592A; }
.bg-bluntdao-brown { background-color: #764C29; }
.bg-bluntdao-black { background-color: #000000; }
.bg-bluntdao-white { background-color: #FFFFFF; }
.bg-bluntdao-light-black { background-color: #1A1D1F; }
.bg-bluntdao-red { background-color: #D70411; }
`;

    colorsFolder!.file('bluntdao-colors.css', cssColors);

    // Add color palette as JSON
    const jsonColors = {
      "bluntdao_colors": {
        "primary": {
          "orange": "#F1592A",
          "brown": "#764C29"
        },
        "classic": {
          "black": "#000000",
          "white": "#FFFFFF",
          "light_black": "#1A1D1F",
          "red": "#D70411"
        }
      }
    };

    colorsFolder!.file('bluntdao-colors.json', JSON.stringify(jsonColors, null, 2));

    // Add font information file
    const fontInfo = `# BluntDAO Typography

## Londrina Solid (Headings)
- **Google Fonts URL:** https://fonts.google.com/specimen/Londrina+Solid
- **CDN Link:** https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@100;300;400;900&display=swap
- **CSS Import:** @import url('https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@100;300;400;900&display=swap');
- **CSS Usage:** font-family: 'Londrina Solid', cursive;

## Helvetica (Body Text)
- **CSS Usage:** font-family: 'Helvetica', Arial, sans-serif;
- **Fallback:** Arial, sans-serif

## Font Weights
- **Londrina Solid:** 100, 300, 400, 900
- **Helvetica:** 400, 700

## Usage Guidelines
- Use Londrina Solid for all headings and display text
- Use Helvetica for body text, descriptions, and UI elements
- Maintain consistent hierarchy and spacing
`;

    fontsFolder!.file('typography-guide.md', fontInfo);

    // Function to fetch and add images to ZIP
    const addImageToZip = async (folder: JSZip, imagePath: string, filename: string) => {
      try {
        const response = await fetch(imagePath);
        if (response.ok) {
          const blob = await response.blob();
          folder.file(filename, blob);
        }
      } catch (error) {
        console.warn(`Could not fetch image: ${imagePath}`);
      }
    };

    // Add logo assets
    await addImageToZip(logosFolder!, '/img/BluntDAO.png', 'bluntdao-primary-logo.png');
    await addImageToZip(logosFolder!, '/img/SpliffDAOWatermark.png', 'spliff-dao-parody-logo.png');
    await addImageToZip(logosFolder!, '/img/BluntAnimated.gif', 'bluntdao-animated.gif');
    await addImageToZip(logosFolder!, '/img/ethblunt.gif', 'eth-blunt-nft.gif');
    await addImageToZip(logosFolder!, '/img/BluntDAOLA.gif', 'bluntdao-la-event.gif');

    // Add README for the package
    const packageReadme = `# BluntDAO Brand Package

This package contains all the essential brand assets for BluntDAO.

## Contents

### 📄 Brand Guidelines
- \`BluntDAO-Brand-Guidelines.md\` - Comprehensive brand documentation

### 🎨 Assets
- \`assets/logos/\` - Logo files in various formats
- \`assets/colors/\` - Color palette in CSS and JSON formats
- \`assets/fonts/\` - Typography guidelines and font information

## Quick Start

1. Read the brand guidelines in \`BluntDAO-Brand-Guidelines.md\`
2. Import colors from \`assets/colors/bluntdao-colors.css\`
3. Use logos from \`assets/logos/\` folder
4. Follow typography guidelines in \`assets/fonts/typography-guide.md\`

## Social Media Links

All social media links and community resources are documented in the brand guidelines.

## Questions?

Visit https://bluntdao.org/brand for the latest brand information.

---
Generated from bluntdao.org/brand on ${new Date().toLocaleDateString()}
`;

    zip.file('README.md', packageReadme);

    // Generate and download the ZIP file
    try {
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `BluntDAO-Brand-Package-${new Date().toISOString().split('T')[0]}.zip`);
    } catch (error) {
      console.error('Error generating ZIP file:', error);
      alert('Error creating brand package. Please try again.');
    }
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
          <div className={styles.heroActions}>
            <button 
              className={styles.downloadPackageBtn} 
              onClick={downloadBrandPackage}
            >
              📦 Download Complete Brand Package
            </button>
            <p className={styles.downloadDescription}>
              Get everything: logos, colors, fonts, guidelines & social links as ZIP
            </p>
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
                >
                  <div className={styles.colorActions}>
                    <button 
                      className={styles.downloadColorBtn}
                      onClick={() => downloadColorSquare(color.hex, color.filename)}
                      title="Download PNG"
                    >
                      📥
                    </button>
                  </div>
                </div>
                <div className={styles.colorInfo}>
                  <h4>{color.name}</h4>
                  <div className={styles.colorFormats}>
                    <div 
                      className={styles.colorFormat}
                      onClick={() => copyToClipboard(color.hex)}
                    >
                      <span className={styles.formatLabel}>HEX</span>
                      <span className={styles.formatValue}>{color.hex}</span>
                      {copiedColor === color.hex && (
                        <span className={styles.copiedIndicator}>Copied!</span>
                      )}
                    </div>
                    <div 
                      className={styles.colorFormat}
                      onClick={() => copyToClipboard(color.rgb)}
                    >
                      <span className={styles.formatLabel}>RGB</span>
                      <span className={styles.formatValue}>{color.rgb}</span>
                      {copiedColor === color.rgb && (
                        <span className={styles.copiedIndicator}>Copied!</span>
                      )}
                    </div>
                    <div 
                      className={styles.colorFormat}
                      onClick={() => copyToClipboard(color.hsl)}
                    >
                      <span className={styles.formatLabel}>HSL</span>
                      <span className={styles.formatValue}>{color.hsl}</span>
                      {copiedColor === color.hsl && (
                        <span className={styles.copiedIndicator}>Copied!</span>
                      )}
                    </div>
                  </div>
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
