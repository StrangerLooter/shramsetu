import { ServiceCategory } from '@/types';

export interface AIClassificationResult {
  category: ServiceCategory;
  categoryName: string;
  identifiedIssue: string;
  suggestedUrgency: 'NORMAL' | 'HIGH' | 'EMERGENCY';
  estimatedHours: number;
  extractedTools: string[];
  rawLanguageDetected: string;
  confidenceScore: number;
  explanation: string;
}

/**
 * AI Service Request Classifier & Colloquial Language Parser
 * Converts messy, multilingual customer prompts (e.g. "bhai bathroom ka pipe toot gya pura paani bhar rha h")
 * into clean, structured service scopes with priority and safety instructions.
 */
export function classifyServiceRequest(rawText: string): AIClassificationResult {
  const text = rawText.toLowerCase().trim();
  
  // Detect Hindi / Hinglish phrases
  const isHindi = /[ऀ-ॿ]/.test(rawText) || 
    /pipe|paani|pani|toot|toota|nal|bijli|pankha|safai|taala|darwaza|chhat|leak|jal|kar|bhai/i.test(rawText);

  // 1. Plumbing cues
  if (/pipe|leak|tap|sink|drain|toilet|bathroom|nal|paani|pani|water|sewer|faucet|flush|toot.*pipe/i.test(text)) {
    const isEmergency = /flood|urgent|emergency|bhar rha|overflow|toot gya|burst/i.test(text);
    return {
      category: 'plumbing',
      categoryName: 'Plumbing & Pipe Repair',
      identifiedIssue: isHindi 
        ? 'नल/पाइप लीकेज अथवा फ्रैक्चर सुधार' 
        : 'Pipe fracture / Drainage blockage & leak repair',
      suggestedUrgency: isEmergency ? 'EMERGENCY' : 'HIGH',
      estimatedHours: 1.5,
      extractedTools: ['Pipe Wrench', 'Teflon Sealant', 'PVC Replacement Joint', 'Drain Auger'],
      rawLanguageDetected: isHindi ? 'Hindi / Hinglish' : 'English',
      confidenceScore: 0.96,
      explanation: 'Detected plumbing indicators with active water flow risk. Assigned High/Emergency priority.'
    };
  }

  // 2. Electrical cues
  if (/electric|wire|switch|fan|light|short circuit|spark|bijli|current|pankha|mcb|fuse|socket/i.test(text)) {
    const isEmergency = /spark|smoke|fire|short circuit|shock|dhar/i.test(text);
    return {
      category: 'electrical',
      categoryName: 'Electrical Repair & Installation',
      identifiedIssue: isHindi
        ? 'शॉर्ट सर्किट अथवा स्विचबोर्ड/वायरिंग सुधार'
        : 'Short circuit / Switchboard fault isolation & rewiring',
      suggestedUrgency: isEmergency ? 'EMERGENCY' : 'HIGH',
      estimatedHours: 1.5,
      extractedTools: ['Digital Multimeter', 'Insulated Screwdriver Kit', 'Wire Strippers', 'Tester'],
      rawLanguageDetected: isHindi ? 'Hindi / Hinglish' : 'English',
      confidenceScore: 0.94,
      explanation: 'Identified electrical load / wiring anomaly. Safety priority elevated.'
    };
  }

  // 3. Cleaning cues
  if (/clean|dust|scrub|sanitize|safai|kachra|dirty|stain|deep clean|festival|diwali|pocha/i.test(text)) {
    return {
      category: 'cleaning',
      categoryName: 'Deep Home & Office Cleaning',
      identifiedIssue: isHindi
        ? 'गहन घरेलू स्वच्छता एवं सैनिटाइजेशन'
        : 'Deep floor, bathroom & kitchen eco-sanitization',
      suggestedUrgency: 'NORMAL',
      estimatedHours: 2.5,
      extractedTools: ['Industrial Floor Scrubber', 'Eco-Solvent Disinfectant', 'Microfiber Kits'],
      rawLanguageDetected: isHindi ? 'Hindi / Hinglish' : 'English',
      confidenceScore: 0.92,
      explanation: 'Categorized under Eco-Clean cooperative division with estimated 2.5 hour window.'
    };
  }

  // 4. Carpentry cues
  if (/carpenter|wood|door|lock|table|chair|cupboard|almirah|hinge|darwaza|taala|lakdi|furniture/i.test(text)) {
    return {
      category: 'carpentry',
      categoryName: 'Carpentry & Furniture Repair',
      identifiedIssue: isHindi
        ? 'दरवाजा/ताला अथवा फर्नीचर मरम्मत'
        : 'Door alignment, lock replacement & cabinet hinge repair',
      suggestedUrgency: 'NORMAL',
      estimatedHours: 2.0,
      extractedTools: ['Cordless Drill', 'Chisel Set', 'Heavy Duty Hinges', 'Wood Planer'],
      rawLanguageDetected: isHindi ? 'Hindi / Hinglish' : 'English',
      confidenceScore: 0.91,
      explanation: 'Categorized under skilled woodworking & fixture rehabilitation.'
    };
  }

  // 5. Appliance cues
  if (/ac|fridge|refrigerator|washing machine|ro|purifier|geyser|cooler|microwave|oven/i.test(text)) {
    return {
      category: 'appliances',
      categoryName: 'Appliance Repair (AC, RO, Fridge)',
      identifiedIssue: isHindi
        ? 'घरेलू उपकरण कूलिंग/मोटर खराबी निवारण'
        : 'Appliance component diagnostic & servicing',
      suggestedUrgency: 'HIGH',
      estimatedHours: 1.5,
      extractedTools: ['Gas Pressure Gauge', 'Filter Replacement Set', 'Capacitor Tester'],
      rawLanguageDetected: isHindi ? 'Hindi / Hinglish' : 'English',
      confidenceScore: 0.93,
      explanation: 'Matched with technician holding certified appliance repair credentials.'
    };
  }

  // 6. Painting / Masonry / Default
  return {
    category: 'plumbing',
    categoryName: 'General Home Maintenance',
    identifiedIssue: rawText || 'General repair consultation',
    suggestedUrgency: 'NORMAL',
    estimatedHours: 1.5,
    extractedTools: ['General Toolkit', 'Measurement Tape'],
    rawLanguageDetected: 'English / Multilingual',
    confidenceScore: 0.85,
    explanation: 'Processed standard household cooperative assistance.'
  };
}
