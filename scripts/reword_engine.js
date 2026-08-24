const fs = require('fs');

function cleanText(str) {
  if (!str) return '';
  let s = str.trim();
  // Remove trailing dots, dangling incomplete words
  s = s.replace(/\s*\.\.\.\s*$/, '');
  s = s.replace(/\s*…\s*$/, '');
  s = s.replace(/\r\n/g, '\n');
  return s;
}

function completeSentence(text) {
  if (!text) return '';
  let s = cleanText(text);
  if (!s.endsWith('.') && !s.endsWith('!') && !s.endsWith('?')) {
    s += '.';
  }
  return s;
}

// Generate well-formatted bullet points with bold prefixes
function formatBullets(rawBullets, title, theme) {
  if (!rawBullets || rawBullets.length === 0) {
    return [
      `Core AI Engine: Specialized machine learning models tailored for ${title.toLowerCase()}.`,
      `Centralized Dashboard: Interactive web and mobile interface providing real-time telemetry, spatial insights, and reporting.`,
      `Data Ingestion Pipeline: Secure API integrations supporting automated ingestion from field devices, sensors, and legacy databases.`,
      `Offline & Resilient Sync: Edge-caching architecture enabling continuous data recording and seamless synchronization upon reconnection.`
    ];
  }

  const cleaned = [];
  const introPatterns = [
    /^a scalable/i, /^a comprehensive/i, /^the proposed/i, /^a user-friendly/i, 
    /^the solution should/i, /^this problem/i, /^develop an/i, /^a cloud-based/i
  ];

  for (let b of rawBullets) {
    let text = cleanText(b);
    if (!text || text.length < 5) continue;
    
    // If it ends with run-on summary text
    if (text.toLowerCase().includes('the solution should improve') || text.toLowerCase().includes('the platform should improve')) {
      const parts = text.split(/the (?:solution|platform) should/i);
      text = parts[0].trim();
    }

    if (!text || text.length < 5) continue;

    // Check if bullet already has a title prefix (e.g. "Title: Description")
    if (/^[A-Za-z0-9\s/&-]+:\s+/.test(text)) {
      cleaned.push(completeSentence(text));
    } else {
      // Create a smart title prefix
      let titlePrefix = '';
      if (/ai|model|algorithm|predict|intelligence|ml/i.test(text)) titlePrefix = 'AI & Analytics Engine: ';
      else if (/gis|map|spatial|geo/i.test(text)) titlePrefix = 'GIS & Spatial Mapping: ';
      else if (/dashboard|portal|interface|ui|ux|web/i.test(text)) titlePrefix = 'Unified Dashboard: ';
      else if (/mobile|app|handheld|device|field/i.test(text)) titlePrefix = 'Field Application: ';
      else if (/alert|notify|notification|sms/i.test(text)) titlePrefix = 'Real-Time Alert Dispatch: ';
      else if (/sensor|iot|hardware|telemetry|gps/i.test(text)) titlePrefix = 'Hardware & Telemetry Ingestion: ';
      else if (/cloud|database|storage|sync|offline|security/i.test(text)) titlePrefix = 'Resilient Cloud & Sync Architecture: ';
      else if (/report|analytics|compliance|audit/i.test(text)) titlePrefix = 'Automated Reporting & Auditing: ';
      else titlePrefix = 'Core Capability: ';

      // Format clean bullet
      let mainText = text.replace(/^[a-z0-9]\.\s*/i, '').replace(/^[-•*]\s*/, '').trim();
      mainText = mainText.charAt(0).toUpperCase() + mainText.slice(1);
      cleaned.push(titlePrefix + completeSentence(mainText));
    }
  }

  // Ensure 3 to 6 high quality bullets
  if (cleaned.length < 3) {
    cleaned.push(`Secure Integration APIs: Standardized interfaces for legacy databases, government portals, and external sensor feeds.`);
    cleaned.push(`Offline & Resilient Operations: High availability edge storage ensuring zero data loss during connectivity blackouts.`);
  }

  return cleaned.slice(0, 6);
}

// Generate tailored Why It Matters
function generateWhyItMatters(card) {
  const org = card.org || '';
  const theme = card.theme || '';
  const title = (card.title || '').toLowerCase();

  if (org.includes('MDoNER') || title.includes('north eastern') || title.includes('ner')) {
    return 'Overcomes the severe geographical isolation and difficult terrain of the North Eastern Region, directly improving public safety, essential supply chains, and local livelihood access.';
  }
  if (org.includes('Steel') || title.includes('mining') || title.includes('iron ore') || title.includes('coal') || org.includes('Coal')) {
    return 'Prevents catastrophic industrial downtime, eliminates occupational safety hazards in hazardous mine environments, and optimizes high-value resource extraction operations.';
  }
  if (org.includes('Rural Development') || title.includes('land') || title.includes('cadastral') || title.includes('ulpIN')) {
    return 'Eliminates protracted land disputes, empowers rural and urban property owners with tamper-proof spatial records, and accelerates national infrastructure development.';
  }
  if (org.includes('MSME') || title.includes('khadi') || title.includes('artisan') || title.includes('honey')) {
    return 'Significantly boosts grassroots artisan earnings, guarantees premium product authenticity through tamper-proof tracing, and scales rural micro-enterprises.';
  }
  if (org.includes('Railways') || title.includes('train') || title.includes('locomotive')) {
    return 'Directly impacts railway passenger safety, passenger punctuality, and high-density route throughput across the national rail network.';
  }
  if (org.includes('Consumer Affairs') || title.includes('metrology') || title.includes('mcb') || title.includes('procurement') || title.includes('onion')) {
    return 'Ensures fair pricing and transparent market access for farmers while protecting consumer rights and standardizing national product compliance.';
  }
  if (org.includes('DRDO') || org.includes('Defence') || title.includes('uav') || title.includes('radar') || title.includes('anti-drone')) {
    return 'Strengthens national defence readiness by delivering resilient, high-altitude-capable autonomous systems built specifically for extreme combat operational theatres.';
  }
  if (org.includes('Ayush') || theme.includes('HealthTech') || theme.includes('MedTech') || title.includes('clinical') || title.includes('ayurveda')) {
    return 'Standardizes clinical efficacy and evidence-based validation for traditional and modern healthcare systems, dramatically improving patient care accessibility.';
  }
  if (org.includes('MoES') || org.includes('Earth Sciences') || title.includes('antarctic') || title.includes('marine') || title.includes('sonar') || title.includes('mausam')) {
    return 'Delivers critical meteorological and oceanic intelligence that protects coastal communities, optimizes polar research missions, and safeguards marine ecosystems.';
  }
  if (org.includes('ISRO') || theme.includes('Space') || title.includes('satellite') || title.includes('space')) {
    return 'Provides high-precision satellite telemetry processing and orbital automation, directly strengthening India’s autonomous space exploration capabilities.';
  }
  if (org.includes('NTRO') || theme.includes('Cybersecurity') || title.includes('dark web') || title.includes('threat')) {
    return 'Fortifies national cyberspace against sophisticated hostile threat actors, safeguarding critical digital public infrastructure and financial networks.';
  }
  if (theme.includes('Smart Education') || title.includes('learning') || title.includes('school')) {
    return 'Bridges regional educational disparities through adaptive vernacular learning systems, enhancing student engagement and foundational competency development.';
  }
  if (theme.includes('Disaster Management') || title.includes('flood') || title.includes('earthquake')) {
    return 'Provides life-saving lead time during extreme natural calamities, enabling proactive civil defense evacuations and minimizing asset destruction.';
  }
  if (theme.includes('Agriculture') || title.includes('farmer') || title.includes('crop')) {
    return 'Maximizes agricultural yield predictability and fair market realization for smallholder farmers by eliminating information asymmetry and post-harvest wastage.';
  }

  return `Solves critical systemic friction for ${org || 'the concerned authority'}, replacing manual, error-prone workflows with an automated, scalable digital solution.`;
}

// Generate tailored Pain Points
function generatePainPoints(card) {
  const title = card.title || '';
  const desc = card.description || '';
  const bg = card.background || '';
  const theme = card.theme || '';
  const org = card.org || '';

  const rawPainPoints = card.problem_decode?.pain_points || [];
  const cleanPoints = [];

  for (let p of rawPainPoints) {
    let clean = cleanText(p);
    if (!clean || clean.length < 10) continue;
    clean = clean.replace(/^[a-z0-9]\.\s*/i, '').replace(/^[-•*]\s*/, '').trim();
    
    // Check if it already has a label prefix
    if (/^[A-Za-z0-9\s/&-]+:\s+/.test(clean)) {
      cleanPoints.push(completeSentence(clean));
    } else {
      let label = 'Operational Friction';
      if (/delay|slow|time|backlog/i.test(clean)) label = 'Severe Process Delays';
      else if (/manual|human|paper|subjective/i.test(clean)) label = 'Manual & Error-Prone Workflows';
      else if (/isolated|remote|connectivity|network/i.test(clean)) label = 'Geographical & Network Isolation';
      else if (/data|scattered|silo|lack of/i.test(clean)) label = 'Fragmented Information Silos';
      else if (/cost|loss|damage|waste/i.test(clean)) label = 'High Financial & Asset Losses';
      else if (/safety|risk|hazard|danger/i.test(clean)) label = 'Critical Safety Vulnerabilities';
      else if (/quality|dispute|inconsistent/i.test(clean)) label = 'Inconsistent Quality Standards';

      cleanPoints.push(`${label}: ${completeSentence(clean)}`);
    }
  }

  if (cleanPoints.length >= 2) {
    return cleanPoints.slice(0, 3);
  }

  // Fallback domain-specific points
  return [
    `Manual Workflow Bottlenecks: Current operations depend heavily on fragmented manual logging and disconnected legacy tools, causing significant turnaround delays.`,
    `Data Inconsistency & Blind Spots: Stakeholders lack real-time visibility and predictive alerts, leading to reactive rather than proactive management.`,
    `Harsh Deployment Constraints: Solutions must perform reliably under strict domain conditions, including limited connectivity, high data volumes, or rugged field environments.`
  ];
}

// Generate tailored Plain Summary
function generatePlainSummary(card) {
  const title = card.title || '';
  const org = card.org || '';
  const cat = card.category || 'Software';

  let summary = cleanText(card.problem_decode?.plain_summary || '');
  if (summary && !summary.endsWith('...') && summary.length > 40 && !summary.startsWith('This problem statement calls for an AI-powered Smart and in')) {
    // If it's already a clean non-truncated summary, polish it
    summary = summary.replace(/^This problem statement (?:proposes|seeks|calls for) (?:the development of )?/i, 'A ');
    summary = summary.charAt(0).toUpperCase() + summary.slice(1);
    return completeSentence(summary);
  }

  // Construct a concise summary
  let cleanTitle = title.replace(/\s+/g, ' ').trim();
  return `An intelligent ${cat.toLowerCase()} solution built for ${org} to deliver ${cleanTitle.toLowerCase()}, replacing manual bottlenecks with automated, real-time intelligence.`;
}

// Clean and enhance Background
function enhanceBackground(card) {
  let bg = cleanText(card.background || '');
  if (!bg || bg.length < 20) {
    return `Currently, operations in ${card.org || 'this sector'} face substantial operational challenges due to manual procedures, fragmented data systems, and limited real-time intelligence. As demands for speed, reliability, and precision increase, existing legacy workflows prove inadequate, highlighting the urgent need for a modern, automated platform to streamline domain processes.`;
  }
  
  // Clean up broken ends or trailing single letters like ' C'
  bg = bg.replace(/\s+[A-Za-z]$/, '');
  bg = completeSentence(bg);
  return bg;
}

// Clean and enhance Description
function enhanceDescription(card) {
  let desc = cleanText(card.description || '');
  if (!desc || desc.length < 30) {
    return `This problem statement requires engineering teams to build a robust, end-to-end ${card.category.toLowerCase()} solution for ${card.title}. Key objectives include designing an intuitive user portal, establishing reliable automated backend pipelines, integrating necessary external data feeds, and providing actionable analytics and reporting for stakeholders.`;
  }

  // Clean trailing broken characters or lines
  desc = desc.replace(/\s+[a-z]\.\s*Providing\s*.*$/i, '');
  desc = desc.replace(/\s+[A-Za-z]$/, '');
  desc = completeSentence(desc);
  return desc;
}

module.exports = {
  cleanText,
  completeSentence,
  formatBullets,
  generateWhyItMatters,
  generatePainPoints,
  generatePlainSummary,
  enhanceBackground,
  enhanceDescription
};
