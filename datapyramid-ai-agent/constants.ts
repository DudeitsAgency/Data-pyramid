import { Persona, PersonaDetails, BCGQuadrant, BCGItem } from './types';
import { IsisIcon, NoahIcon, HorusIcon } from './components/icons/PersonaIcons';

export const PERSONA_DETAILS: Record<Persona, PersonaDetails> = {
  [Persona.ISIS]: {
    name: Persona.ISIS,
    title: 'Oracle of Intent',
    description: 'Calm, intuitive, nurturing. The master campaign strategist.',
    color: 'amber',
    visual: 'Golden sanctuary with scrolls and glowing glyphs.',
    dialogue: '“I sense your intent. Let me shape it into a campaign worthy of the gods.”',
    icon: IsisIcon,
  },
  [Persona.NOAH]: {
    name: Persona.NOAH,
    title: 'Floodbringer of Reach',
    description: 'Energetic, bold, expansive. For awareness and distribution.',
    color: 'cyan',
    visual: 'Riverside market with banners and water.',
    dialogue: '“Let the flood begin. Your message will echo across every channel.”',
    icon: NoahIcon,
  },
  [Persona.HORUS]: {
    name: Persona.HORUS,
    title: 'All-Seeing Strategist',
    description: 'Wise, precise, visionary. For analytics and optimization.',
    color: 'indigo',
    visual: 'Celestial observatory with star maps and the Eye of Horus.',
    dialogue: '“The stars reveal your path. Let me show you where your empire will rise.”',
    icon: HorusIcon,
  },
};

export const MOCK_BCG_ITEMS: BCGItem[] = [
  { id: 'c1', name: 'Anubis Ad Campaign', quadrant: BCGQuadrant.STAR },
  { id: 'c2', name: 'Ra Retargeting', quadrant: BCGQuadrant.QUESTION_MARK },
  { id: 'c3', name: 'Nile Newsletter', quadrant: BCGQuadrant.CASH_COW },
  { id: 'c4', name: 'Sphinx SEO', quadrant: BCGQuadrant.CASH_COW },
  { id: 'c5', name: 'Oasis Organics', quadrant: BCGQuadrant.DOG },
];

export const MOCK_ANALYTICS_DATA = [
  { name: 'Google', Clicks: 4000, Spend: 2400 },
  { name: 'Meta', Clicks: 3000, Spend: 1398 },
  { name: 'TikTok', Clicks: 2000, Spend: 9800 },
  { name: 'LinkedIn', Clicks: 2780, Spend: 3908 },
  { name: 'X', Clicks: 1890, Spend: 4800 },
];

export const MOCK_COMPETITOR_DATA = [
    { name: 'Competitor A', voiceShare: 40, spend: 50000, color: '#8884d8' },
    { name: 'Competitor B', voiceShare: 25, spend: 35000, color: '#82ca9d' },
    { name: 'Competitor C', voiceShare: 15, spend: 20000, color: '#ffc658' },
    { name: 'You', voiceShare: 20, spend: 28000, color: '#fbbf24' },
];