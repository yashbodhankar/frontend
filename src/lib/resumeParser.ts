import * as pdfjsLib from 'pdfjs-dist'
import mammoth from 'mammoth'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).href

export interface ParsedResume {
  name?: string
  email?: string
  phone?: string
  linkedin?: string
  currentRole?: string
  experience?: string
  companies?: string[]
}

// ─── Text extraction ──────────────────────────────────────────────────────────

async function extractTextFromPDF(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
  const pages: string[] = []
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    // Join items with a newline when y-position changes significantly (new line)
    let lastY: number | null = null
    const lines: string[] = []
    let currentLine = ''
    for (const item of content.items as Array<{ str: string; transform: number[] }>) {
      const y = Math.round(item.transform[5])
      if (lastY !== null && Math.abs(y - lastY) > 3) {
        if (currentLine.trim()) lines.push(currentLine.trim())
        currentLine = item.str
      } else {
        currentLine += (currentLine && item.str && !currentLine.endsWith(' ') ? ' ' : '') + item.str
      }
      lastY = y
    }
    if (currentLine.trim()) lines.push(currentLine.trim())
    pages.push(lines.join('\n'))
  }
  return pages.join('\n')
}

async function extractTextFromDOCX(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer: buffer })
  return result.value
}

export async function extractText(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase()
  if (ext === 'pdf') return extractTextFromPDF(file)
  if (ext === 'docx' || ext === 'doc') return extractTextFromDOCX(file)
  return file.text()
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cleanLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0)
}

// ─── Field parsers ────────────────────────────────────────────────────────────

function parseEmail(text: string): string | undefined {
  const m = text.match(/[\w.+\-]+@[\w.\-]+\.[a-zA-Z]{2,}/i)
  return m?.[0]?.toLowerCase()
}

function parsePhone(text: string): string | undefined {
  // Match international and local formats, require at least 7 digits
  const m = text.match(/(\+?[\d][\d\s\-().]{5,17}[\d])/)
  if (!m) return undefined
  const digits = m[0].replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) return undefined
  return m[0].trim()
}

function parseLinkedIn(text: string): string | undefined {
  // Match with or without https://, capture the full profile path
  const m = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w\-%.]+/i)
  if (!m) return undefined
  // Strip protocol/www for storage
  return m[0].replace(/^https?:\/\/(www\.)?/i, '')
}

function parseName(text: string): string | undefined {
  const lines = cleanLines(text)

  // Strategy 1: First line is often the name
  for (const line of lines.slice(0, 5)) {
    // Skip if it looks like contact info, title, or address
    if (/[@|http|linkedin|github|\.com|\.in|phone|email|address|objective|summary|profile|resume|cv|\d{4}]/i.test(line)) continue
    if (line.length > 45 || line.length < 2) continue
    const words = line.split(/\s+/)
    if (words.length < 2 || words.length > 5) continue
    // Each word starts with capital or all-caps initial
    const namelike = words.every(w => /^[A-Z][a-zA-Z'\-.]{1,}$/.test(w) || /^[A-Z]{1,3}$/.test(w))
    if (namelike) return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
  }

  // Strategy 2: Look for "Name: First Last" label pattern
  const labelMatch = text.match(/(?:^|\n)\s*(?:name|full name)\s*[:\-]\s*([A-Z][a-zA-Z\s'\-.]{2,40})/im)
  if (labelMatch) return labelMatch[1].trim()

  return undefined
}

const JOB_TITLES = [
  // Intern / Junior
  'software engineering intern', 'frontend intern', 'backend intern', 'web development intern',
  'software developer intern', 'full stack intern', 'ui developer intern',
  // Individual contributor
  'software engineer', 'frontend engineer', 'backend engineer', 'full stack engineer',
  'full-stack engineer', 'senior software engineer', 'senior frontend engineer',
  'senior backend engineer', 'senior full stack engineer', 'staff engineer',
  'principal engineer', 'software developer', 'frontend developer', 'backend developer',
  'full stack developer', 'full-stack developer', 'react developer', 'web developer',
  'ui engineer', 'ux engineer', 'ui developer', 'android developer', 'ios developer',
  'mobile developer', 'cloud engineer', 'devops engineer', 'site reliability engineer',
  'data engineer', 'data scientist', 'machine learning engineer', 'ml engineer',
  'ai engineer', 'solutions architect', 'technical lead', 'tech lead', 'lead engineer',
  'lead developer', 'engineering manager', 'product manager', 'product designer',
  'ux designer', 'ui designer', 'graphic designer',
]

function parseCurrentRole(text: string): string | undefined {
  const lower = text.toLowerCase()

  // Find all matches and pick the one with the highest priority (most specific first)
  for (const title of JOB_TITLES) {
    const idx = lower.indexOf(title)
    if (idx !== -1) {
      // Get the real-case version from original text
      const realCase = text.substring(idx, idx + title.length)
      // Capitalise each word
      return realCase.replace(/\b\w/g, c => c.toUpperCase())
    }
  }

  // Fallback: look for "[Role] at [Company]" pattern
  const atMatch = text.match(/([A-Z][a-zA-Z\s\-]+(?:Engineer|Developer|Designer|Manager|Analyst|Architect|Scientist|Lead|Intern))\s+(?:at|@|–|-)\s+/i)
  if (atMatch) return atMatch[1].trim()

  return undefined
}

function parseExperience(text: string): string | undefined {
  // "X+ years of experience" / "X years experience"
  const expMatch = text.match(/(\d+)\+?\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience|exp|work)/i)
  if (expMatch) {
    const yrs = parseInt(expMatch[1])
    return bracket(yrs)
  }

  // Scan for earliest year in "YYYY – YYYY" or "YYYY – Present" ranges
  const yearMatches = [...text.matchAll(/\b(20\d{2}|19[89]\d)\b/g)].map(m => parseInt(m[1]))
  if (yearMatches.length >= 2) {
    const earliest = Math.min(...yearMatches)
    const yrs = new Date().getFullYear() - earliest
    if (yrs > 0 && yrs <= 40) return bracket(yrs)
  }

  return undefined
}

function bracket(yrs: number): string {
  if (yrs <= 2) return '0–2 years'
  if (yrs <= 5) return '3–5 years'
  if (yrs <= 8) return '5–8 years'
  return '8+ years'
}

const KNOWN_COMPANIES = [
  'Google', 'Meta', 'Facebook', 'Apple', 'Amazon', 'Microsoft', 'Netflix', 'Stripe',
  'Airbnb', 'Uber', 'Lyft', 'Twitter', 'LinkedIn', 'Salesforce', 'Adobe', 'Oracle',
  'IBM', 'Intel', 'Nvidia', 'Tesla', 'SpaceX', 'Shopify', 'Spotify', 'Atlassian',
  'Dropbox', 'Slack', 'Zoom', 'Twilio', 'Datadog', 'Snowflake', 'Palantir',
  'Databricks', 'OpenAI', 'Anthropic', 'DeepMind', 'ByteDance', 'TikTok', 'Infosys',
  'Wipro', 'TCS', 'HCL', 'Accenture', 'Cognizant', 'Capgemini', 'Deloitte',
  'Goldman Sachs', 'JPMorgan', 'Morgan Stanley', 'Flipkart', 'Swiggy', 'Zomato',
  'Razorpay', 'Paytm', 'PhonePe', 'CRED', 'Meesho', 'Ola', 'Nykaa',
]

function parseCompanies(text: string): string[] {
  const found: string[] = []
  for (const company of KNOWN_COMPANIES) {
    if (new RegExp(`\\b${company}\\b`, 'i').test(text)) {
      // Use the canonical casing from KNOWN_COMPANIES
      found.push(company)
    }
  }

  // Also extract "at <Company Name>" patterns (capitalized, 1–3 words)
  const atPattern = /\b(?:at|@)\s+([A-Z][a-zA-Z0-9&.\-]{1,25}(?:\s+[A-Z][a-zA-Z0-9&.\-]{1,25}){0,2})/g
  for (const m of text.matchAll(atPattern)) {
    const name = m[1].trim()
    if (name.length > 1 && !found.some(f => f.toLowerCase() === name.toLowerCase())) {
      found.push(name)
    }
  }

  return [...new Set(found)].slice(0, 6)
}

// ─── Main entry ───────────────────────────────────────────────────────────────

export async function parseResume(file: File): Promise<ParsedResume> {
  const text = await extractText(file)

  return {
    name: parseName(text),
    email: parseEmail(text),
    phone: parsePhone(text),
    linkedin: parseLinkedIn(text),
    currentRole: parseCurrentRole(text),
    experience: parseExperience(text),
    companies: parseCompanies(text),
  }
}
