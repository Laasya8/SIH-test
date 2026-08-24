import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SIH_DATA } from '../src/data/sihData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cleanText(str) {
  if (!str) return '';
  let s = str.trim();
  s = s.replace(/\s*\.\.\.\s*$/, '');
  s = s.replace(/\s*…\s*$/, '');
  s = s.replace(/\s+and\.\s*$/i, '.');
  s = s.replace(/\s+with the\.\s*$/i, '.');
  s = s.replace(/\s+by\.\s*$/i, '.');
  s = s.replace(/\s+in\.\s*$/i, '.');
  s = s.replace(/\s+for\.\s*$/i, '.');
  s = s.replace(/\s+of\.\s*$/i, '.');
  s = s.replace(/\r\n/g, '\n');
  return s;
}

function completeSentence(text) {
  if (!text) return '';
  let s = cleanText(text);
  // Strip trailing numbers or dangling punctuation
  s = s.replace(/\s+\d+\.?\s*$/, '');
  s = s.replace(/\s*[,;:-]\s*$/, '');
  if (!s.endsWith('.') && !s.endsWith('!') && !s.endsWith('?')) {
    s += '.';
  }
  return s;
}

function formatBullets(rawBullets, title, theme, category) {
  const cleaned = [];

  if (rawBullets && rawBullets.length > 0) {
    for (let b of rawBullets) {
      let text = cleanText(b);
      if (!text || text.length < 5) continue;

      // Clean run-on summary fragments
      if (text.toLowerCase().includes('the solution should') || text.toLowerCase().includes('the platform should')) {
        const parts = text.split(/the (?:solution|platform) should/i);
        if (parts[0].trim().length > 10) {
          text = parts[0].trim();
        }
      }

      // Remove leading bullet numbers/markers/ordinals
      text = text.replace(/^(?:First|Second|Third|Fourth|Fifth|Finally),?\s*/i, '');
      text = text.replace(/^[0-9]+[.)]\s*/, '');
      text = text.replace(/^[-•*]\s*/, '');
      text = text.replace(/\s+\d+\.?\s*$/, '');

      if (!text || text.length < 5) continue;

      // If bullet already has a proper prefix
      if (/^[A-Za-z0-9\s/&()-]{3,35}:\s+/.test(text)) {
        cleaned.push(completeSentence(text));
      } else {
        let titlePrefix = 'Core Capability: ';
        const lower = text.toLowerCase();
        if (/ai|machine learning|\bml\b|algorithm|predict|neural|vision|nlp|llm|intelligence/i.test(lower)) {
          titlePrefix = 'AI & Predictive Engine: ';
        } else if (/gis|map|spatial|geo|cadastral|drone|satellite/i.test(lower)) {
          titlePrefix = 'GIS & Spatial Intelligence: ';
        } else if (/dashboard|portal|interface|ui|ux|web|console/i.test(lower)) {
          titlePrefix = 'Interactive Dashboard: ';
        } else if (/mobile|app|handheld|field|warden/i.test(lower)) {
          titlePrefix = 'Field Mobile Portal: ';
        } else if (/alert|notify|notification|sms|warning|dispatch/i.test(lower)) {
          titlePrefix = 'Real-Time Alert Dispatch: ';
        } else if (/sensor|iot|hardware|telemetry|gps|tracking|rfid|payload/i.test(lower)) {
          titlePrefix = 'Hardware & Sensor Ingestion: ';
        } else if (/cloud|database|storage|sync|offline|security|blockchain/i.test(lower)) {
          titlePrefix = 'Resilient Cloud & Sync Architecture: ';
        } else if (/report|analytics|compliance|audit|verification|test/i.test(lower)) {
          titlePrefix = 'Automated Verification & Reporting: ';
        } else if (/game|voice|multilingual|vernacular|audio/i.test(lower)) {
          titlePrefix = 'Vernacular & Voice Interaction: ';
        } else if (/solar|power|battery|thermal|energy|heat/i.test(lower)) {
          titlePrefix = 'Thermal & Energy Management: ';
        }

        let mainText = text.charAt(0).toUpperCase() + text.slice(1);
        cleaned.push(titlePrefix + completeSentence(mainText));
      }
    }
  }

  // Ensure 3 to 6 high-quality bullets
  if (cleaned.length < 3) {
    if (category === 'Hardware') {
      cleaned.push('Embedded Controller & Sensor Subsystem: Ruggedized hardware layer handling real-time data acquisition and environmental telemetry.');
      cleaned.push('Fail-Safe & Low-Power Operations: Energy-optimized power management ensuring continuous functionality in field deployments.');
    } else {
      cleaned.push('Secure Integration APIs: Standardized interfaces for legacy databases, government portals, and external data feeds.');
      cleaned.push('Offline & Resilient Operations: High availability edge storage ensuring zero data loss during connectivity blackouts.');
    }
  }

  return cleaned.slice(0, 6);
}

function generateWhyItMatters(card) {
  const org = card.org || '';
  const theme = card.theme || '';
  const title = (card.title || '').toLowerCase();

  // MDoNER / North Eastern Region
  if (org.includes('MDoNER') || /\b(north\s*eastern|ner)\b/i.test(title)) {
    return 'Overcomes the severe geographical isolation and difficult terrain of the North Eastern Region, directly improving public safety, essential supply chains, and local healthcare delivery.';
  }
  // Mining / Steel / Coal
  if (org.includes('Steel') || org.includes('Coal') || /\b(mining|iron\s*ore|conveyor|manganese|coal|subsidence)\b/i.test(title)) {
    return 'Prevents catastrophic industrial downtime, eliminates occupational hazards in hazardous mining environments, and optimizes high-value resource extraction operations.';
  }
  // Rural Development & Land records
  if (org.includes('Rural Development') || /\b(land|cadastral|ulpin|watershed|parcel)\b/i.test(title)) {
    return 'Eliminates protracted land disputes, empowers property owners with tamper-proof 3D spatial records, and accelerates national rural and urban infrastructure planning.';
  }
  // MSME / Artisans / Grassroots
  if (org.includes('MSME') || /\b(khadi|artisan|honey|agarbatti|hand-spinning)\b/i.test(title)) {
    return 'Significantly boosts grassroots artisan productivity, guarantees product authenticity through supply-chain traceability, and uplifts rural micro-enterprises.';
  }
  // Indian Railways
  if (org.includes('Railways') || /\b(railways?|train|locomotive|station)\b/i.test(title)) {
    return 'Directly impacts railway passenger safety, optimizes network section throughput, and eliminates manual scheduling bottlenecks across India’s massive rail grid.';
  }
  // Consumer Affairs & Food Distribution
  if (org.includes('Consumer Affairs') || /\b(metrology|mcb|procurement|onion|weighing|mandi)\b/i.test(title)) {
    return 'Ensures fair pricing and transparent market access for farmers while protecting consumer rights and standardizing national product compliance.';
  }
  // Defence & DRDO / NTRO
  if (org.includes('DRDO') || org.includes('NTRO') || org.includes('Defence') || /\b(uav|radar|anti-drone|drone|threat|noise|tor|dark\s*web)\b/i.test(title)) {
    return 'Strengthens national security readiness by delivering resilient, high-altitude-capable autonomous defense systems and cyber intelligence pipelines built for extreme operational conditions.';
  }
  // AYUSH & HealthTech
  if (org.includes('Ayush') || theme.includes('HealthTech') || theme.includes('MedTech') || /\b(clinical|ayurveda|patient|kwath|dementia|osteoarthritis|retinopathy|health)\b/i.test(title)) {
    return 'Standardizes clinical efficacy and evidence-based validation for healthcare systems, dramatically improving early diagnosis and rural patient care accessibility.';
  }
  // MoES / Earth Sciences / Ocean / Polar
  if (org.includes('MoES') || org.includes('Earth Sciences') || /\b(antarctic|marine|sonar|mausam|weather|ocean|iceberg)\b/i.test(title)) {
    return 'Delivers critical meteorological and oceanic intelligence that protects coastal communities, optimizes polar research missions, and safeguards marine ecosystems.';
  }
  // ISRO & Space
  if (org.includes('ISRO') || theme.includes('Space') || /\b(space|satellite|orbit|propulsion|payload)\b/i.test(title)) {
    return 'Provides high-precision satellite telemetry processing and orbital automation, directly strengthening India’s autonomous space exploration capabilities.';
  }
  // MoSPI / Statistics
  if (org.includes('MoSPI') || /\b(statistical|cpi|airfare|competency|survey)\b/i.test(title)) {
    return 'Drives evidence-based national economic governance and statistical capacity building by delivering automated, high-frequency data analytics and training intelligence.';
  }
  // Education
  if (theme.includes('Smart Education') || /\b(learning|school|pedagogy|curriculum|education)\b/i.test(title)) {
    return 'Bridges regional educational disparities through adaptive vernacular learning systems, enhancing student engagement and foundational competency development.';
  }
  // Disaster Management
  if (theme.includes('Disaster Management') || /\b(flood|earthquake|landslide|cyclone|disaster)\b/i.test(title)) {
    return 'Provides life-saving lead time during extreme natural calamities, enabling proactive civil defense evacuations and minimizing asset destruction.';
  }
  // Agriculture
  if (theme.includes('Agriculture') || /\b(farmer|crop|agriculture|yield|harvest)\b/i.test(title)) {
    return 'Maximizes agricultural yield predictability and fair market realization for smallholder farmers by eliminating information asymmetry and post-harvest wastage.';
  }
  // Smart Vehicles & Navigation
  if (theme.includes('Smart Vehicles') || /\b(autonomous|navigation|vehicle|ugv|traffic)\b/i.test(title)) {
    return 'Enables safe, robust autonomous vehicle navigation across unstructured Indian road environments and extreme off-road terrains.';
  }
  // Clean Energy & Sustainability
  if (theme.includes('Clean & Green') || theme.includes('Sustainable') || /\b(solar|energy|waste|recycling|sanitization)\b/i.test(title)) {
    return 'Drives sustainable resource utilization and decarbonization, delivering measurable environmental and operational efficiency improvements.';
  }
  // Cybersecurity & Blockchain
  if (theme.includes('Blockchain & Cybersecurity') || /\b(blockchain|cyber|security|threat|encryption)\b/i.test(title)) {
    return 'Fortifies digital infrastructure against sophisticated hostile cyber threats, safeguarding critical institutional networks and data assets.';
  }

  return `Solves critical operational friction for ${org || 'the concerned organization'}, replacing manual, error-prone workflows with an automated, scalable digital solution.`;
}

function generatePainPoints(card) {
  const rawPainPoints = card.problem_decode?.pain_points || [];
  const cleanPoints = [];

  for (let p of rawPainPoints) {
    let clean = cleanText(p);
    if (!clean || clean.length < 10) continue;
    clean = clean.replace(/^[a-z0-9]\.\s*/i, '').replace(/^[-•*]\s*/, '').trim();

    // Remove trailing dangling prepositions
    clean = clean.replace(/\s+and\.\s*$/i, '.');
    clean = clean.replace(/\s+with the\.\s*$/i, '.');
    clean = clean.replace(/\s+by\.\s*$/i, '.');
    clean = clean.replace(/\s+in\.\s*$/i, '.');
    clean = clean.replace(/\s+for\.\s*$/i, '.');
    clean = clean.replace(/\s+of\.\s*$/i, '.');

    if (/^[A-Za-z0-9\s/&()-]{3,35}:\s+/.test(clean)) {
      cleanPoints.push(completeSentence(clean));
    } else {
      let label = 'Operational Friction';
      const lower = clean.toLowerCase();
      if (/delay|slow|time|backlog|disrupt/i.test(lower)) label = 'Severe Process Delays';
      else if (/manual|human|paper|subjective/i.test(lower)) label = 'Manual & Error-Prone Workflows';
      else if (/isolated|remote|terrain|connectivity|network/i.test(lower)) label = 'Geographical & Connectivity Barriers';
      else if (/data|scattered|silo|lack of|inadequate/i.test(lower)) label = 'Fragmented Information Silos';
      else if (/cost|loss|damage|waste|spoilage/i.test(lower)) label = 'High Resource & Asset Losses';
      else if (/safety|risk|hazard|danger|subsidence|mine/i.test(lower)) label = 'Critical Safety Vulnerabilities';
      else if (/quality|dispute|inconsistent|standard/i.test(lower)) label = 'Inconsistent Quality Standards';

      cleanPoints.push(`${label}: ${completeSentence(clean)}`);
    }
  }

  if (cleanPoints.length >= 2) {
    return cleanPoints.slice(0, 3);
  }

  return [
    `Manual Workflow Bottlenecks: Existing operations rely on fragmented legacy protocols, leading to extended processing delays and high administrative overhead.`,
    `Data Inconsistency & Blind Spots: Decision-makers lack unified real-time visibility, forcing reactive handling rather than predictive mitigation.`,
    `Demanding Operational Constraints: Solutions must perform reliably under strict domain conditions, including intermittent network connectivity and rugged field environments.`
  ];
}

function generatePlainSummary(card) {
  const title = card.title || '';
  const org = card.org || '';
  const cat = card.category || 'Software';

  let summary = cleanText(card.problem_decode?.plain_summary || '');
  if (summary && summary.length > 40 && !summary.endsWith('...') && !summary.includes('the.') && !summary.startsWith('This problem statement calls for an AI-powered Smart and in')) {
    summary = summary.replace(/^This problem statement (?:proposes|seeks|calls for) (?:the development of )?/i, 'A ');
    summary = summary.charAt(0).toUpperCase() + summary.slice(1);
    return completeSentence(summary);
  }

  let cleanTitle = title.replace(/\s+/g, ' ').trim();
  return `An intelligent ${cat.toLowerCase()} platform engineered for ${org} to deliver ${cleanTitle.toLowerCase()}, automating critical workflows and providing actionable real-time intelligence.`;
}

function enhanceBackground(card) {
  let bg = cleanText(card.background || '');
  if (!bg || bg.length < 25) {
    return `In ${card.org || 'this sector'}, traditional operations face persistent bottlenecks due to fragmented data management, manual record-keeping, and the absence of unified digital monitoring. As operational complexity increases, existing methods fail to deliver the speed, reliability, and precision required, underscoring the necessity for a modern, automated system.`;
  }
  
  bg = bg.replace(/\s+[A-Za-z]$/, '');
  return completeSentence(bg);
}

function enhanceDescription(card) {
  let desc = cleanText(card.description || '');
  if (!desc || desc.length < 35) {
    return `This problem statement requires engineering teams to develop a complete, robust ${card.category.toLowerCase()} solution for ${card.title}. The platform must feature seamless data integration, intelligent analytics, user-friendly dashboards for field and administrative personnel, and reliable offline capabilities to support field operations.`;
  }

  desc = desc.replace(/\s+[a-z]\.\s*Providing\s*.*$/i, '');
  desc = desc.replace(/\s+[A-Za-z]$/, '');
  return completeSentence(desc);
}

// Process all cards
console.log('Processing SIH_DATA cards...');
let updatedCount = 0;

for (let i = 1; i < SIH_DATA.length; i++) {
  const card = SIH_DATA[i];

  card.background = enhanceBackground(card);
  card.description = enhanceDescription(card);
  card.expected_solution_bullets = formatBullets(card.expected_solution_bullets, card.title, card.theme, card.category);

  if (!card.problem_decode) card.problem_decode = {};
  card.problem_decode.plain_summary = generatePlainSummary(card);
  card.problem_decode.pain_points = generatePainPoints(card);
  card.problem_decode.why_it_matters = generateWhyItMatters(card);

  // Clean build_plan_36h if present
  if (card.build_plan_36h) {
    for (let stageKey of ['stage_idea', 'stage_prototype', 'stage_integration', 'stage_polish']) {
      if (card.build_plan_36h[stageKey]?.items) {
        card.build_plan_36h[stageKey].items = card.build_plan_36h[stageKey].items.map(it => completeSentence(it));
      }
    }
  }

  // Clean evaluation scorecard if present
  if (card.evaluation_scorecard) {
    for (let scKey of Object.keys(card.evaluation_scorecard)) {
      if (card.evaluation_scorecard[scKey]?.note) {
        card.evaluation_scorecard[scKey].note = completeSentence(card.evaluation_scorecard[scKey].note);
      }
    }
  }

  updatedCount++;
}

console.log(`Successfully updated ${updatedCount} cards.`);

// Write back to src/data/sihData.js
const fileContent = `export const SIH_DATA = ${JSON.stringify(SIH_DATA, null, 2)};\n`;
fs.writeFileSync(path.resolve(__dirname, '../src/data/sihData.js'), fileContent, 'utf-8');
console.log('Successfully saved to src/data/sihData.js');
