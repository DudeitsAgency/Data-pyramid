import React from 'react';

export enum Page {
  HOME = 'Home',
  AGENTS = 'Agents',
  CAMPAIGNS = 'Campaigns',
  WALLET = 'Wallet',
  INSIGHTS = 'Insights',
  REPORTS = 'Reports',
  SETTINGS = 'Settings',
  HELP = 'Help',
}

export enum Persona {
  ISIS = 'Isis',
  NOAH = 'Noah',
  HORUS = 'Horus',
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | Persona;
  persona: Persona;
}

export interface PersonaDetails {
  name: Persona;
  title: string;
  description: string;
  color: string;
  visual: string;
  dialogue: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export enum BCGQuadrant {
  STAR = 'Star',
  CASH_COW = 'Cash Cow',
  QUESTION_MARK = 'Question Mark',
  DOG = 'Dog',
}

export interface BCGItem {
  id: string;
  name: string;
  quadrant: BCGQuadrant;
}