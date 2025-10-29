// Sitemap generator for BluntDAO cannabis legal status pages
import cannabisData from '../data/cannabisLegalData.json';

export const generateSitemap = () => {
  const baseUrl = 'https://bluntdao.org';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/map</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/brand</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Country pages -->`;

  // Add country pages
  const countries = cannabisData.countries;
  Object.keys(countries).forEach(countryName => {
    const country = countries[countryName];
    const urlSafeCountry = encodeURIComponent(countryName);
    
    sitemap += `
  <url>
    <loc>${baseUrl}/map/${urlSafeCountry}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

    // Add US state pages
    if (countryName === 'United States' && country.states) {
      Object.keys(country.states).forEach(stateName => {
        const urlSafeState = encodeURIComponent(stateName);
        sitemap += `
  <url>
    <loc>${baseUrl}/map/United%20States/${urlSafeState}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });
    }
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Generate robots.txt content
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://bluntdao.org/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Allow all cannabis-related content
Allow: /map/
Allow: /brand/
Allow: /pos/
Allow: /rpos/

# Block admin areas
Disallow: /dashboard/
Disallow: /admin/

# Block API endpoints
Disallow: /api/
`;
};

// SEO keywords for different regions
export const getSEOKeywords = (regionName, regionData) => {
  const baseKeywords = [
    'cannabis laws',
    'marijuana legal status',
    'dispensary locations',
    'cannabis legalization',
    'medical marijuana',
    'recreational cannabis',
    'BluntDAO'
  ];

  const regionKeywords = [
    `${regionName} cannabis`,
    `${regionName} marijuana laws`,
    `${regionName} dispensaries`,
    `${regionName} weed legal`,
    `cannabis in ${regionName}`
  ];

  const statusKeywords = [];
  if (regionData.recreational === 'Legal') {
    statusKeywords.push('recreational marijuana legal', 'adult use cannabis');
  }
  if (regionData.medical === 'Legal') {
    statusKeywords.push('medical marijuana legal', 'medical cannabis');
  }
  if (regionData.bluntdaoChapter) {
    statusKeywords.push('BluntDAO chapter', 'cannabis community');
  }

  return [...baseKeywords, ...regionKeywords, ...statusKeywords].join(', ');
};

export default { generateSitemap, generateRobotsTxt, getSEOKeywords };
