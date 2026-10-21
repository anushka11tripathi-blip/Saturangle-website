import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  X,
  Menu,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Send,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Mic,
  Shield,
  Layers,
  Flame,
  Volume2,
  VolumeX,
  Compass,
  Filter,
  GraduationCap,
  ExternalLink,
  User,
  Quote,
  PenTool,
  CalendarCheck,
  Code,
  BookOpen,
  Camera
} from 'lucide-react';

// --- DATA STRUCTURES & SCHEMAS ---

export interface EventItem {
  id: number;
  status: 'upcoming' | 'past';
  category: 'Parliamentary' | 'Workshop' | 'Town Hall' | 'Turncoat';
  year: '2026' | '2025';
  title: string;
  tagline: string;
  date: string;
  time: string;
  loc: string;
  desc: string;
  format: string;
  poster: string;
  seatsRemaining?: number;
  registrationOpen: boolean;
  learnMoreUrl?: string;
}

export interface AchievementItem {
  id: string;
  category: string;
  title: string;
  period: string;
  summary: string;
  highlights: string[];
  image: string;
  badge: string;
}

export interface MentorProfile {
  name: string;
  role: string;
  department: string;
  quote: string;
  bio: string;
}

export interface Member {
  name: string;
  role: string;
  tag: string;
  dept: string;
  bio: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  caption: string;
  img: string;
  spanClass: string;
}

// 8-item navigation matching official sections
const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Our Team', href: '#team' },
  { name: 'Core Council', href: '#core-council' },
  { name: 'Our Teams', href: '#our-teams' },
  { name: 'Gallery', href: '#gallery' },
];

// Exactly 4 editable event cards with names written exactly as requested:
// 1. Youth Parliament, 2. Parley, 3. Battle of Bits, 4. Samvad
const EVENTS_DATA: EventItem[] = [
  {
    id: 1,
    status: 'upcoming',
    category: 'Parliamentary',
    year: '2026',
    title: 'Youth Parliament',
    tagline: 'Simulated Parliamentary Session & Youth Policy Discourse',
    date: 'Upcoming • Schedule TBA',
    time: 'Session Briefing TBA',
    loc: 'GLA University Campus, Mathura',
    desc: 'Placeholder description for Youth Parliament. A simulated legislative assembly focusing on policy drafting, constructive debate, and parliamentary procedures.',
    format: 'Parliamentary simulation & moderated caucus debate format.',
    poster: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=800',
    seatsRemaining: 30,
    registrationOpen: true,
  },
  {
    id: 2,
    status: 'upcoming',
    category: 'Turncoat',
    year: '2026',
    title: 'Parley',
    tagline: 'Bilateral Discourse & High-Energy Dialectic Duel',
    date: 'Upcoming • Schedule TBA',
    time: 'Session Briefing TBA',
    loc: 'Academic Block Auditorium',
    desc: 'Placeholder description for Parley. A high-energy bilateral debating face-off testing spontaneous argumentation, sharp rebuttals, and stage poise.',
    format: '1v1 & 2v2 structured debate sparring format.',
    poster: 'https://images.unsplash.com/photo-1475721025505-c31ebfa9b11c?auto=format&fit=crop&q=80&w=800',
    seatsRemaining: 24,
    registrationOpen: true,
  },
  {
    id: 3,
    status: 'past',
    category: 'Workshop',
    year: '2025',
    title: 'Battle of Bits',
    tagline: 'Technology Policy, Cyber Ethics & Digital Governance Clash',
    date: 'Past Edition Archive',
    time: 'Concluded Session',
    loc: 'Conference Hall, GLA Campus',
    desc: 'Placeholder description for Battle of Bits. An interdisciplinary debate exploring the intersection of emerging computer technologies, artificial intelligence, and legal ethics.',
    format: 'Motion deliberation & moderated floor debate.',
    poster: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    seatsRemaining: 0,
    registrationOpen: false,
  },
  {
    id: 4,
    status: 'past',
    category: 'Town Hall',
    year: '2025',
    title: 'Samvad',
    tagline: 'Campus Dialogue & Open Forum Rhetoric Exchange',
    date: 'Past Edition Archive',
    time: 'Concluded Session',
    loc: 'Central Student Amphitheatre',
    desc: 'Placeholder description for Samvad. An open campus dialogue session encouraging spontaneous intellectual discourse, civil disagreement, and diverse perspective sharing.',
    format: 'Open floor dialogue & moderated queries.',
    poster: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800',
    seatsRemaining: 0,
    registrationOpen: false,
  },
];

// Faculty Mentor — Divya Gupta Ma’am (No photograph, no invented biography)
const MENTOR_INFO = {
  name: 'Divya Gupta Ma’am',
  role: 'Faculty Mentor, SATURANGLE',
  affiliation: 'GLA University • Mathura',
  initials: 'DG',
};

// Student Core Council: Exactly 7 executive leadership positions
export interface CouncilMember {
  id: number;
  position: string;
  name: string;
  isConfirmed: boolean;
  initials: string;
  wing: string;
  mandate: string;
}

const CORE_COUNCIL_MEMBERS: CouncilMember[] = [
  {
    id: 1,
    position: 'Advisor',
    name: 'Raghav Gupta',
    isConfirmed: true,
    initials: 'RG',
    wing: 'Advisory Board',
    mandate: 'Strategic guidance on university protocol, tournament compliance, and society stewardship.',
  },
  {
    id: 2,
    position: 'President',
    name: 'Yash Upadhyay',
    isConfirmed: true,
    initials: 'YU',
    wing: 'Executive Board',
    mandate: 'Overall executive leadership, institutional representation, and strategic society direction.',
  },
  {
    id: 3,
    position: 'Vice President',
    name: 'Mridul Gaur',
    isConfirmed: true,
    initials: 'MG',
    wing: 'Executive Board',
    mandate: 'Assisting presidential leadership and overseeing parliamentary debating standards and circuit delegation.',
  },
  {
    id: 4,
    position: 'Vice President',
    name: 'Mansi Singh',
    isConfirmed: true,
    initials: 'MS',
    wing: 'Executive Board',
    mandate: 'Supervising internal club affairs, member development, and session coordination.',
  },
  {
    id: 5,
    position: 'General Secretary',
    name: 'Adwitya',
    isConfirmed: true,
    initials: 'AD',
    wing: 'Secretariat',
    mandate: 'Documentation of meeting minutes, society dockets, and official student notifications.',
  },
  {
    id: 6,
    position: 'General Secretary',
    name: 'Saksham Sharma',
    isConfirmed: true,
    initials: 'SS',
    wing: 'Secretariat',
    mandate: 'Inter-departmental coordination, attendance archives, and operational reporting.',
  },
  {
    id: 7,
    position: 'Treasurer',
    name: 'Aryan Chauhan',
    isConfirmed: true,
    initials: 'AC',
    wing: 'Finance Wing',
    mandate: 'Fiscal management, tournament budgeting, expenditure audits, and institutional sponsorship allocation.',
  },
];

// --- OUR TEAMS STRUCTURE ---
export interface TeamLeader {
  role: string;
  name: string;
  initials: string;
}

export interface TeamDepartment {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: 'GraduationCap' | 'CalendarCheck' | 'PenTool' | 'Code' | 'BookOpen' | 'Users';
  motifType: 'alumni' | 'events' | 'design' | 'tech' | 'content' | 'pr';
  head: TeamLeader;
  deputy: TeamLeader;
  responsibilities: string[];
}

// A. Alumni Team: Visible initially with Nakshatra Chaudhary and Anushka Tripathi having equal prominence
const ALUMNI_TEAM: TeamDepartment = {
  id: 'alumni',
  name: 'Alumni Team',
  tagline: 'Circuit Heritage & Mentorship Network',
  description: 'Connects SATURANGLE debaters with graduated alumni across premier legal chambers, public policy institutions, and collegiate adjudicators to nurture lifelong debate camaraderie.',
  iconName: 'GraduationCap',
  motifType: 'alumni',
  head: {
    role: 'Alumni Coordinator',
    name: 'Nakshatra Chaudhary',
    initials: 'NC',
  },
  deputy: {
    role: 'Deputy Alumni Coordinator',
    name: 'Anushka Tripathi',
    initials: 'AT',
  },
  responsibilities: [
    'Fostering lifelong relationships with graduated debaters',
    'Coordinating mentorship masterclasses and career symposiums',
    'Organizing alumni guest adjudicator panels and varsity exchanges',
    'Archiving institutional debate legacy, trophies, and orator histories',
  ],
};

// B-F. Remaining Departmental Teams: Revealed smoothly via "More Teams"
const DEPARTMENTAL_TEAMS: TeamDepartment[] = [
  {
    id: 'events',
    name: 'Events Team',
    tagline: 'Tournament Staging & Floor Orchestration',
    description: 'Executes parliamentary rounds, turncoat face-offs, and annual flagship conclaves with precision floor scheduling, stage production, and adjudicator hosting.',
    iconName: 'CalendarCheck',
    motifType: 'events',
    head: {
      role: 'Event Head',
      name: 'Deepak Singh',
      initials: 'DS',
    },
    deputy: {
      role: 'Deputy Event Head',
      name: 'Mehak Sethi',
      initials: 'MS',
    },
    responsibilities: [
      'Auditorium staging, podium acoustics, and floor logistics',
      'Parliamentary motion schedule and match-up allocation',
      'Adjudication docket distribution and timing protocol',
      'Guest delegate hospitality and conclave stage supervision',
    ],
  },
  {
    id: 'design',
    name: 'Design Team',
    tagline: 'Visual Rhetoric & Creative Aesthetics',
    description: 'Architects the society’s visual language, tournament identity packages, motion briefs, typography systems, and promotional artwork.',
    iconName: 'PenTool',
    motifType: 'design',
    head: {
      role: 'Design Team Head',
      name: 'Vanshika Agarwal',
      initials: 'VA',
    },
    deputy: {
      role: 'Deputy Design Team Head',
      name: 'Krishna Yadav',
      initials: 'KY',
    },
    responsibilities: [
      'Visual identity guidelines, typography systems, and color palettes',
      'Tournament stage backdrops, print flyers, and motion dossiers',
      'Digital social media creative assets and announcements',
      'Editorial publication layouts and society brochures',
    ],
  },
  {
    id: 'technical',
    name: 'Technical Team',
    tagline: 'Digital Infrastructure & Tabulation Systems',
    description: 'Engineers and maintains the official SATURANGLE web experience, interactive 3D debate stages, registration databases, and tabulation scoring software.',
    iconName: 'Code',
    motifType: 'tech',
    head: {
      role: 'Technical Team Head',
      name: 'Bhaavya Tilhari',
      initials: 'BT',
    },
    deputy: {
      role: 'Deputy Technical Team Head',
      name: 'Saloni Kumari',
      initials: 'SK',
    },
    responsibilities: [
      'Full-stack website engineering, hosting, and performance',
      'Debate adjudication and speaker scoring software',
      'Delegate registration portals and check-in workflows',
      'Audiovisual systems, stage tech, and digital dockets',
    ],
  },
  {
    id: 'content',
    name: 'Content Team',
    tagline: 'Motion Formulation & Intellectual Discourse',
    description: 'Formulates provocative, balanced debate motions across geopolitics, law, and culture while authoring research briefs and publications.',
    iconName: 'BookOpen',
    motifType: 'content',
    head: {
      role: 'Content Team Head',
      name: 'Shivangi Sharma',
      initials: 'SS',
    },
    deputy: {
      role: 'Deputy Content Team Head',
      name: 'Riddhima Khatri',
      initials: 'RK',
    },
    responsibilities: [
      'Debate motion curation and balanced motion dossier framing',
      'Background research papers and fact-checking kits',
      'Society newsletters, essays, and editorial bulletins',
      'Adjudication rubrics, speaker briefing guides, and rules',
    ],
  },
  {
    id: 'pr',
    name: 'Public Relations Team',
    tagline: 'Collegiate Circuit Outreach & Communications',
    description: 'Expands SATURANGLE’s presence across the national university circuit, orchestrating inter-varsity invitations, official press releases, and media engagement.',
    iconName: 'Users',
    motifType: 'pr',
    head: {
      role: 'Public Relations Officer',
      name: 'Richa Singh',
      initials: 'RS',
    },
    deputy: {
      role: 'Deputy Public Relations Officer',
      name: 'Rishika Gupta',
      initials: 'RG',
    },
    responsibilities: [
      'Inter-university circuit relations and tournament invitations',
      'Official press communiqués and institutional representation',
      'Audience outreach, campus announcements, and orientations',
      'Sponsorship outreach, partner coordination, and cohort relations',
    ],
  },
];

// --- 3D DEBATE THEATRE INTERFACES & BUILDERS ---

interface DebaterActor {
  root: THREE.Group;
  headGroup: THREE.Group;
  headMesh: THREE.Mesh;
  hairMesh: THREE.Mesh;
  chestMesh: THREE.Mesh;
  jacketMat: THREE.MeshStandardMaterial;
  trousersMat: THREE.MeshStandardMaterial;
  armR: THREE.Group;
  forearmR: THREE.Group;
  handR: THREE.Mesh;
  armL: THREE.Group;
  forearmL: THREE.Group;
  handL: THREE.Mesh;
  torsoGroup: THREE.Group;
  isFor: boolean;
}

interface PodiumActor {
  root: THREE.Group;
  columnMesh: THREE.Mesh;
  shelfMesh: THREE.Mesh;
  plaqueMesh: THREE.Mesh;
  micStem: THREE.Group;
  micLed: THREE.Mesh;
  micLight: THREE.PointLight;
}

function createPodiumPlaqueTexture(text: 'FOR' | 'AGAINST', isDark: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 240;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background gradient: dark titanium / smoked obsidian
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 240);
  if (isDark) {
    bgGrad.addColorStop(0, '#1E1D22');
    bgGrad.addColorStop(0.5, '#141317');
    bgGrad.addColorStop(1, '#0C0B0E');
  } else {
    bgGrad.addColorStop(0, '#1D1C20');
    bgGrad.addColorStop(0.5, '#151418');
    bgGrad.addColorStop(1, '#0E0D10');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 240);

  // Outer Crimson Bezel Border
  ctx.strokeStyle = '#9F1239';
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, 496, 224);

  // Inner Subtle Metallic Hairline
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(16, 16, 480, 208);

  // Corner Brass / Silver Mounting Rivets
  const rivets = [
    [26, 26],
    [486, 26],
    [26, 214],
    [486, 214],
  ];
  ctx.fillStyle = '#CBD5E1';
  rivets.forEach(([rx, ry]) => {
    ctx.beginPath();
    ctx.arc(rx, ry, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Subtitle Kicker (PROPOSITION / OPPOSITION)
  ctx.fillStyle = text === 'FOR' ? '#F43F5E' : '#E11D48';
  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const subtitle = text === 'FOR' ? 'PROPOSITION · 1ST AFFIRMATIVE' : 'OPPOSITION · 1ST NEGATIVE';
  ctx.fillText(subtitle, 256, 68);

  // Main Plaque Heading (FOR / AGAINST)
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 94px "Playfair Display", Georgia, serif';
  ctx.shadowColor = 'rgba(0,0,0,0.85)';
  ctx.shadowBlur = 8;
  ctx.fillText(text, 256, 150);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

function createDebater(options: {
  isFor: boolean;
  skinColor: string;
  hairColor: string;
  suitColor: string;
  shirtColor: string;
  tieColor: string;
  isDark: boolean;
}): DebaterActor {
  const { isFor, skinColor, hairColor, suitColor, shirtColor, tieColor } = options;
  const root = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({
    color: skinColor,
    roughness: 0.65,
    metalness: 0.05,
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.82,
    metalness: 0.1,
  });

  const jacketMat = new THREE.MeshStandardMaterial({
    color: suitColor,
    roughness: 0.72,
    metalness: 0.12,
  });

  const shirtMat = new THREE.MeshStandardMaterial({
    color: shirtColor,
    roughness: 0.55,
    metalness: 0.05,
  });

  const tieMat = new THREE.MeshStandardMaterial({
    color: tieColor,
    roughness: 0.45,
    metalness: 0.25,
  });

  const trousersMat = new THREE.MeshStandardMaterial({
    color: isFor ? '#16171E' : '#1D1C22',
    roughness: 0.78,
    metalness: 0.08,
  });

  const shoeMat = new THREE.MeshStandardMaterial({
    color: '#0D0D10',
    roughness: 0.3,
    metalness: 0.35,
  });

  // --- LOWER BODY (Behind Podium) ---
  const legGeo = new THREE.CapsuleGeometry(0.2, 1.45, 12, 16);
  const leftLeg = new THREE.Mesh(legGeo, trousersMat);
  leftLeg.position.set(-0.25, 1.25, 0);
  leftLeg.castShadow = true;
  root.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeo, trousersMat);
  rightLeg.position.set(0.25, 1.25, 0);
  rightLeg.castShadow = true;
  root.add(rightLeg);

  const shoeGeo = new THREE.BoxGeometry(0.28, 0.16, 0.62);
  const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
  leftShoe.position.set(-0.25, 0.18, 0.1);
  leftShoe.castShadow = true;
  root.add(leftShoe);

  const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
  rightShoe.position.set(0.25, 0.18, 0.1);
  rightShoe.castShadow = true;
  root.add(rightShoe);

  // --- TORSO GROUP ---
  const torsoGroup = new THREE.Group();
  torsoGroup.position.set(0, 2.7, 0);
  root.add(torsoGroup);

  // Shirt / Chest Core
  const shirtCore = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.95, 0.48), shirtMat);
  shirtCore.position.y = 0.15;
  shirtCore.castShadow = true;
  torsoGroup.add(shirtCore);

  // Tailored Suit Jacket (Fitted Chest & Waist)
  const chestMesh = new THREE.Mesh(new THREE.BoxGeometry(0.96, 1.28, 0.6), jacketMat);
  chestMesh.position.y = 0.05;
  chestMesh.castShadow = true;
  chestMesh.receiveShadow = true;
  torsoGroup.add(chestMesh);

  // Suit Lapels (Angled architectural panels framing V-neck)
  const lapelGeo = new THREE.BoxGeometry(0.18, 0.85, 0.08);
  const leftLapel = new THREE.Mesh(lapelGeo, jacketMat);
  leftLapel.position.set(-0.22, 0.22, 0.32);
  leftLapel.rotation.z = -0.15;
  leftLapel.castShadow = true;
  torsoGroup.add(leftLapel);

  const rightLapel = new THREE.Mesh(lapelGeo, jacketMat);
  rightLapel.position.set(0.22, 0.22, 0.32);
  rightLapel.rotation.z = 0.15;
  rightLapel.castShadow = true;
  torsoGroup.add(rightLapel);

  // Silk Necktie
  const tieGeo = new THREE.BoxGeometry(0.11, 0.76, 0.06);
  const tie = new THREE.Mesh(tieGeo, tieMat);
  tie.position.set(0, 0.15, 0.32);
  tie.castShadow = true;
  torsoGroup.add(tie);

  // Shoulder Broadeners (Natural tailoring silhouette)
  const shoulderGeo = new THREE.SphereGeometry(0.22, 12, 12);
  const shoulderL = new THREE.Mesh(shoulderGeo, jacketMat);
  shoulderL.position.set(-0.55, 0.52, 0);
  torsoGroup.add(shoulderL);

  const shoulderR = new THREE.Mesh(shoulderGeo, jacketMat);
  shoulderR.position.set(0.55, 0.52, 0);
  torsoGroup.add(shoulderR);

  // --- HEAD & NECK ---
  const neckGeo = new THREE.CylinderGeometry(0.16, 0.19, 0.42, 16);
  const neckMesh = new THREE.Mesh(neckGeo, skinMat);
  neckMesh.position.set(0, 3.5, 0);
  neckMesh.castShadow = true;
  root.add(neckMesh);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 3.92, 0);
  root.add(headGroup);

  // Sculpted Cranium & Facial Planes
  const craniumGeo = new THREE.SphereGeometry(0.36, 24, 24);
  craniumGeo.scale(0.92, 1.05, 0.95);
  const headMesh = new THREE.Mesh(craniumGeo, skinMat);
  headMesh.castShadow = true;
  headGroup.add(headMesh);

  // Defined Chin & Jawline
  const jawGeo = new THREE.CylinderGeometry(0.22, 0.16, 0.28, 16);
  const jaw = new THREE.Mesh(jawGeo, skinMat);
  jaw.position.set(0, -0.16, 0.08);
  headGroup.add(jaw);

  // Ears
  const earGeo = new THREE.SphereGeometry(0.08, 10, 10);
  const earL = new THREE.Mesh(earGeo, skinMat);
  earL.position.set(-0.35, 0, 0);
  headGroup.add(earL);

  const earR = new THREE.Mesh(earGeo, skinMat);
  earR.position.set(0.35, 0, 0);
  headGroup.add(earR);

  // Styled Hair Sculpt (Distinct silhouette for each debater)
  let hairMesh: THREE.Mesh;
  if (isFor) {
    // Executive side-parted styled hair
    const hairGeo = new THREE.SphereGeometry(0.39, 20, 20);
    hairGeo.scale(0.96, 0.95, 1.05);
    hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.position.set(0.02, 0.12, -0.04);
  } else {
    // Modern textured swept wave hair
    const hairGeo = new THREE.SphereGeometry(0.4, 20, 20);
    hairGeo.scale(1.02, 1.06, 0.98);
    hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.position.set(-0.02, 0.14, -0.02);
  }
  hairMesh.castShadow = true;
  headGroup.add(hairMesh);

  // --- ARMS & HANDS (Natural debate gestures & resting positions) ---
  const upperArmGeo = new THREE.CylinderGeometry(0.15, 0.13, 0.82, 16);
  const forearmGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.8, 16);
  const cuffGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
  const handGeo = new THREE.BoxGeometry(0.15, 0.08, 0.26);

  // Right Arm (Articulated Rhetorical / Notes Arm)
  const armR = new THREE.Group();
  armR.position.set(0.55, 3.25, 0);
  root.add(armR);

  const upperR = new THREE.Mesh(upperArmGeo, jacketMat);
  upperR.position.y = -0.4;
  upperR.castShadow = true;
  armR.add(upperR);

  const forearmR = new THREE.Group();
  forearmR.position.set(0, -0.8, 0);
  armR.add(forearmR);

  const lowerR = new THREE.Mesh(forearmGeo, jacketMat);
  lowerR.position.y = -0.38;
  lowerR.castShadow = true;
  forearmR.add(lowerR);

  const cuffR = new THREE.Mesh(cuffGeo, shirtMat);
  cuffR.position.y = -0.74;
  forearmR.add(cuffR);

  const handR = new THREE.Mesh(handGeo, skinMat);
  handR.position.set(0, -0.88, 0.06);
  handR.castShadow = true;
  forearmR.add(handR);

  // Left Arm (Articulated Rhetorical / Notes Arm)
  const armL = new THREE.Group();
  armL.position.set(-0.55, 3.25, 0);
  root.add(armL);

  const upperL = new THREE.Mesh(upperArmGeo, jacketMat);
  upperL.position.y = -0.4;
  upperL.castShadow = true;
  armL.add(upperL);

  const forearmL = new THREE.Group();
  forearmL.position.set(0, -0.8, 0);
  armL.add(forearmL);

  const lowerL = new THREE.Mesh(forearmGeo, jacketMat);
  lowerL.position.y = -0.38;
  lowerL.castShadow = true;
  forearmL.add(lowerL);

  const cuffL = new THREE.Mesh(cuffGeo, shirtMat);
  cuffL.position.y = -0.74;
  forearmL.add(cuffL);

  const handL = new THREE.Mesh(handGeo, skinMat);
  handL.position.set(0, -0.88, 0.06);
  handL.castShadow = true;
  forearmL.add(handL);

  // Initial Natural Poses:
  if (isFor) {
    // FOR Debater: Left hand resting naturally on podium ledge; Right arm poised to articulate
    armL.rotation.x = -0.65;
    armL.rotation.z = -0.15;
    forearmL.rotation.x = -0.7;
    forearmL.rotation.y = 0.25;

    armR.rotation.x = -0.55;
    armR.rotation.z = 0.2;
    forearmR.rotation.x = -0.6;
    forearmR.rotation.y = -0.2;
  } else {
    // AGAINST Debater: Right hand resting on podium notes; Left arm poised for counter-rebuttal
    armR.rotation.x = -0.65;
    armR.rotation.z = 0.15;
    forearmR.rotation.x = -0.7;
    forearmR.rotation.y = -0.25;

    armL.rotation.x = -0.55;
    armL.rotation.z = -0.2;
    forearmL.rotation.x = -0.6;
    forearmL.rotation.y = 0.2;
  }

  return {
    root,
    headGroup,
    headMesh,
    hairMesh,
    chestMesh,
    jacketMat,
    trousersMat,
    armR,
    forearmR,
    handR,
    armL,
    forearmL,
    handL,
    torsoGroup,
    isFor,
  };
}

function createPodium(isFor: boolean, isDark: boolean): PodiumActor {
  const root = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: isDark ? '#1C1917' : '#221E1B',
    roughness: 0.45,
    metalness: 0.15,
  });

  const trimMat = new THREE.MeshStandardMaterial({
    color: '#9F1239',
    emissive: '#9F1239',
    emissiveIntensity: 0.35,
    roughness: 0.35,
    metalness: 0.5,
  });

  const metalMat = new THREE.MeshStandardMaterial({
    color: '#28282C',
    roughness: 0.3,
    metalness: 0.8,
  });

  // 1. Stepped Plinth Base
  const base1 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.55, 0.18, 32), woodMat);
  base1.position.y = 0.09;
  base1.castShadow = true;
  base1.receiveShadow = true;
  root.add(base1);

  const base2 = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.35, 0.14, 32), woodMat);
  base2.position.y = 0.24;
  base2.castShadow = true;
  root.add(base2);

  // Crimson accent ring around podium plinth
  const plinthRing = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.025, 8, 32), trimMat);
  plinthRing.rotation.x = Math.PI / 2;
  plinthRing.position.y = 0.31;
  root.add(plinthRing);

  // 2. Main Architectural Pedestal Column
  const columnMesh = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.05, 1.05), woodMat);
  columnMesh.position.y = 1.32;
  columnMesh.castShadow = true;
  columnMesh.receiveShadow = true;
  root.add(columnMesh);

  // Front Recessed Panel
  const alcoveMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.7, 0.06),
    new THREE.MeshStandardMaterial({ color: isDark ? '#141316' : '#19181B', roughness: 0.6 })
  );
  alcoveMesh.position.set(0, 1.32, 0.53);
  root.add(alcoveMesh);

  // 3. Front Face Plaque (FOR / AGAINST with High-Res Texture)
  const plaqueMat = new THREE.MeshBasicMaterial({
    map: createPodiumPlaqueTexture(isFor ? 'FOR' : 'AGAINST', isDark),
  });
  const plaqueMesh = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.64, 0.04), plaqueMat);
  plaqueMesh.position.set(0, 1.35, 0.58);
  plaqueMesh.castShadow = true;
  root.add(plaqueMesh);

  // Plaque Stand-off Mounts (4 metallic corner pins)
  [
    [-0.62, 0.27],
    [0.62, 0.27],
    [-0.62, -0.27],
    [0.62, -0.27],
  ].forEach(([px, py]) => {
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.06, 12), metalMat);
    pin.rotation.x = Math.PI / 2;
    pin.position.set(px, 1.35 + py, 0.61);
    root.add(pin);
  });

  // 4. Angled Speaker Desktop Shelf (Slanted toward debater)
  const shelfGroup = new THREE.Group();
  shelfGroup.position.set(0, 2.38, 0);
  shelfGroup.rotation.x = -0.26; // Slanted ~15°
  root.add(shelfGroup);

  const shelfMesh = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.12, 1.35), woodMat);
  shelfMesh.castShadow = true;
  shelfMesh.receiveShadow = true;
  shelfGroup.add(shelfMesh);

  // Retaining lip at bottom edge to hold speech notes
  const lipMesh = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.08, 0.05), trimMat);
  lipMesh.position.set(0, 0.08, 0.66);
  shelfGroup.add(lipMesh);

  // Collegiate Debate Brief / Notes Sheets on Desktop
  const paperMat = new THREE.MeshStandardMaterial({
    color: '#FAF8F5',
    roughness: 0.9,
    metalness: 0.02,
  });
  const dossier1 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.015, 0.85), paperMat);
  dossier1.position.set(-0.25, 0.07, 0.05);
  dossier1.rotation.y = 0.06;
  dossier1.castShadow = true;
  shelfGroup.add(dossier1);

  const dossier2 = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.015, 0.82), paperMat);
  dossier2.position.set(0.28, 0.075, 0.08);
  dossier2.rotation.y = -0.05;
  dossier2.castShadow = true;
  shelfGroup.add(dossier2);

  // Crimson ribbon / bookmark on debater brief
  const ribbon = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.018, 0.88),
    new THREE.MeshBasicMaterial({ color: '#9F1239' })
  );
  ribbon.position.set(-0.24, 0.08, 0.05);
  shelfGroup.add(ribbon);

  // 5. Professional Gooseneck Microphone
  const micStem = new THREE.Group();
  micStem.position.set(isFor ? 0.42 : -0.42, 0.08, 0.12);
  shelfGroup.add(micStem);

  // Mic Base Collar
  const micBase = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.05, 16), metalMat);
  micBase.castShadow = true;
  micStem.add(micBase);

  // Gooseneck Stem Segment 1 (Angling up and toward debater's mouth)
  const stem1Geo = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 12);
  const stem1 = new THREE.Mesh(stem1Geo, metalMat);
  stem1.position.set(0, 0.22, -0.08);
  stem1.rotation.x = -0.4;
  stem1.castShadow = true;
  micStem.add(stem1);

  // Flexible knuckle joint
  const knuckle = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), metalMat);
  knuckle.position.set(0, 0.4, -0.17);
  micStem.add(knuckle);

  // Stem Segment 2 (Curving horizontally toward debater)
  const stem2Geo = new THREE.CylinderGeometry(0.018, 0.018, 0.38, 12);
  const stem2 = new THREE.Mesh(stem2Geo, metalMat);
  stem2.position.set(0, 0.55, -0.28);
  stem2.rotation.x = -0.7;
  stem2.castShadow = true;
  micStem.add(stem2);

  // Microphone Capsule Head
  const capsuleGeo = new THREE.CylinderGeometry(0.042, 0.038, 0.16, 16);
  const capsuleMat = new THREE.MeshStandardMaterial({
    color: '#151518',
    roughness: 0.3,
    metalness: 0.7,
  });
  const capsule = new THREE.Mesh(capsuleGeo, capsuleMat);
  capsule.position.set(0, 0.69, -0.39);
  capsule.rotation.x = -0.7;
  capsule.castShadow = true;
  micStem.add(capsule);

  // Active Microphone LED Indicator Ring (Glows when participant has the floor)
  const ledGeo = new THREE.TorusGeometry(0.04, 0.008, 8, 16);
  const ledMat = new THREE.MeshStandardMaterial({
    color: '#E11D48',
    emissive: '#E11D48',
    emissiveIntensity: 1.8,
    roughness: 0.2,
  });
  const micLed = new THREE.Mesh(ledGeo, ledMat);
  micLed.position.set(0, 0.64, -0.34);
  micLed.rotation.x = -0.7;
  micStem.add(micLed);

  const micLight = new THREE.PointLight('#E11D48', 0.6, 1.8);
  micLight.position.set(0, 0.65, -0.35);
  micStem.add(micLight);

  return {
    root,
    columnMesh,
    shelfMesh,
    plaqueMesh,
    micStem,
    micLed,
    micLight,
  };
}

// --- 3D DEBATE THEATRE ARENA CLASS ---
class DebateArena {
  container: HTMLElement;
  isDark: boolean;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  cameraTarget: THREE.Vector3;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;
  mouse: THREE.Vector2;
  targetMouse: THREE.Vector2;
  scrollPos: number;
  targetScroll: number;
  baseCameraZ: number = 22.2;
  baseCameraY: number = 5.2;
  animationFrameId: number | null = null;

  // Key Groups & Objects
  stageGroup: THREE.Group;
  titleGroup: THREE.Group;
  lightingRigGroup: THREE.Group;
  floorMesh?: THREE.Mesh;
  stageSurfaceMesh?: THREE.Mesh;
  stageOuterRimMesh?: THREE.Mesh;
  stageCrimsonRingMesh?: THREE.Mesh;
  stageInlayRing1?: THREE.Mesh;
  stageInlayRing2?: THREE.Mesh;
  stageInlayRing3?: THREE.Mesh;
  titleDividerMesh?: THREE.Mesh;

  // Spotlights, Fixtures & Ambient/Rim Lights
  leftSpotLight?: THREE.SpotLight;
  rightSpotLight?: THREE.SpotLight;
  leftSpotTarget: THREE.Object3D;
  rightSpotTarget: THREE.Object3D;
  leftLensMesh?: THREE.Mesh;
  rightLensMesh?: THREE.Mesh;
  leftBeamMesh?: THREE.Mesh;
  rightBeamMesh?: THREE.Mesh;
  ambientLight?: THREE.AmbientLight;
  keyDirLight?: THREE.DirectionalLight;
  rimBackLight?: THREE.DirectionalLight;
  floorBounceLight?: THREE.PointLight;

  // Stage Actors (Debaters & Podiums)
  debaterFor?: DebaterActor;
  debaterAgainst?: DebaterActor;
  podiumFor?: PodiumActor;
  podiumAgainst?: PodiumActor;

  constructor(container: HTMLElement, isDark: boolean = false) {
    this.container = container;
    this.isDark = isDark;
    this.scene = new THREE.Scene();

    const bgCol = isDark ? '#121214' : '#FAF9F6';
    this.scene.background = new THREE.Color(bgCol);
    this.scene.fog = new THREE.FogExp2(bgCol, isDark ? 0.015 : 0.011);

    const aspect = (this.container.clientWidth || window.innerWidth) / (this.container.clientHeight || window.innerHeight);
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    this.cameraTarget = new THREE.Vector3(0, 2.2, 0);
    this.updateCameraPosition();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = isDark ? 1.25 : 1.12;
    this.container.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2(0, 0);
    this.targetMouse = new THREE.Vector2(0, 0);
    this.scrollPos = 0;
    this.targetScroll = 0;

    // Groups - Lower the stageGroup down slightly (y = -1.0) to provide generous breathing room below 3D title
    this.stageGroup = new THREE.Group();
    this.stageGroup.position.set(0, -1.0, 0);
    this.scene.add(this.stageGroup);

    this.titleGroup = new THREE.Group();
    this.scene.add(this.titleGroup);

    this.lightingRigGroup = new THREE.Group();
    this.scene.add(this.lightingRigGroup);

    this.leftSpotTarget = new THREE.Object3D();
    this.rightSpotTarget = new THREE.Object3D();
    this.scene.add(this.leftSpotTarget);
    this.scene.add(this.rightSpotTarget);

    // Initializations
    this.initEnvironment();
    this.initCircularStage();
    this.initOverheadRigAndSpotlights();
    this.initDebateTheatre();
    this.init3DTitle();

    this.onWindowResize = this.onWindowResize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onScroll = this.onScroll.bind(this);

    window.addEventListener('resize', this.onWindowResize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('scroll', this.onScroll);

    this.animate = this.animate.bind(this);
    this.animate();
  }

  updateCameraPosition() {
    const w = this.container?.clientWidth || window.innerWidth;
    if (w < 640) {
      // Mobile framing: step back to ensure both podiums, both debaters, microphones, and labels fit comfortably
      this.baseCameraZ = 31.0;
      this.baseCameraY = 6.4;
      this.cameraTarget.set(0, 2.0, 0);
    } else if (w < 1024) {
      // Tablet framing
      this.baseCameraZ = 26.0;
      this.baseCameraY = 5.6;
      this.cameraTarget.set(0, 2.1, 0);
    } else {
      // Desktop / Laptop framing
      this.baseCameraZ = 22.2;
      this.baseCameraY = 5.2;
      this.cameraTarget.set(0, 2.2, 0);
    }
    this.camera.position.set(0, this.baseCameraY, this.baseCameraZ);
  }

  initEnvironment() {
    const floorGeo = new THREE.PlaneGeometry(160, 160);
    const floorMat = new THREE.MeshStandardMaterial({
      color: this.isDark ? '#101012' : '#FAF9F6',
      roughness: 0.95,
      metalness: 0.05,
    });
    this.floorMesh = new THREE.Mesh(floorGeo, floorMat);
    this.floorMesh.rotation.x = -Math.PI / 2;
    this.floorMesh.position.y = -1.05;
    this.floorMesh.receiveShadow = true;
    this.scene.add(this.floorMesh);

    // Ambient Illumination (Calibrated so neither character or podium vanishes into darkness)
    this.ambientLight = new THREE.AmbientLight(
      this.isDark ? '#645C72' : '#FFF9F2',
      this.isDark ? 0.65 : 0.76
    );
    this.scene.add(this.ambientLight);

    // Directional Key Studio Light with Soft Shadows
    this.keyDirLight = new THREE.DirectionalLight('#FFFFFF', this.isDark ? 0.45 : 0.68);
    this.keyDirLight.position.set(0, 24, 14);
    this.keyDirLight.castShadow = true;
    this.keyDirLight.shadow.mapSize.width = 2048;
    this.keyDirLight.shadow.mapSize.height = 2048;
    this.keyDirLight.shadow.camera.near = 0.5;
    this.keyDirLight.shadow.camera.far = 48;
    this.keyDirLight.shadow.camera.left = -14;
    this.keyDirLight.shadow.camera.right = 14;
    this.keyDirLight.shadow.bias = -0.0004;
    this.scene.add(this.keyDirLight);

    // Directional Crimson Rim Light (Subtle red rim lighting on theatre installation)
    this.rimBackLight = new THREE.DirectionalLight('#9F1239', this.isDark ? 0.85 : 0.48);
    this.rimBackLight.position.set(0, 9, -10);
    this.scene.add(this.rimBackLight);

    // Floor Bounce Point Light (Subtle warm underglow)
    this.floorBounceLight = new THREE.PointLight('#9F1239', this.isDark ? 0.7 : 0.35, 18);
    this.floorBounceLight.position.set(0, 0.4, 0);
    this.stageGroup.add(this.floorBounceLight);
  }

  initCircularStage() {
    // 1. Broad Outer Obsidian Edge Platform
    const rimRadius = 9.4;
    const rimGeo = new THREE.CylinderGeometry(rimRadius, rimRadius + 0.38, 0.44, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: '#121214',
      roughness: 0.38,
      metalness: 0.28,
    });
    this.stageOuterRimMesh = new THREE.Mesh(rimGeo, rimMat);
    this.stageOuterRimMesh.position.y = 0.22;
    this.stageOuterRimMesh.receiveShadow = true;
    this.stageOuterRimMesh.castShadow = true;
    this.stageGroup.add(this.stageOuterRimMesh);

    // 2. Luminous Crimson Accent Ring
    const crimsonRingGeo = new THREE.TorusGeometry(9.05, 0.08, 16, 64);
    const crimsonRingMat = new THREE.MeshStandardMaterial({
      color: '#9F1239',
      emissive: '#9F1239',
      emissiveIntensity: 0.45,
      roughness: 0.28,
      metalness: 0.55,
    });
    this.stageCrimsonRingMesh = new THREE.Mesh(crimsonRingGeo, crimsonRingMat);
    this.stageCrimsonRingMesh.rotation.x = Math.PI / 2;
    this.stageCrimsonRingMesh.position.y = 0.46;
    this.stageCrimsonRingMesh.castShadow = true;
    this.stageGroup.add(this.stageCrimsonRingMesh);

    // 3. Inner Arena Stage Surface (Alabaster stone in light, deep slate in night)
    const surfaceRadius = 8.95;
    const surfaceGeo = new THREE.CylinderGeometry(surfaceRadius, surfaceRadius, 0.44, 64);
    const surfaceMat = new THREE.MeshStandardMaterial({
      color: this.isDark ? '#202026' : '#EFEBE4',
      roughness: 0.65,
      metalness: 0.12,
    });
    this.stageSurfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
    this.stageSurfaceMesh.position.y = 0.23;
    this.stageSurfaceMesh.receiveShadow = true;
    this.stageGroup.add(this.stageSurfaceMesh);

    // 4. Concentric Floor Zoning Inlays
    const inlayMat = new THREE.MeshStandardMaterial({
      color: this.isDark ? '#9F1239' : '#887B75',
      transparent: true,
      opacity: this.isDark ? 0.5 : 0.35,
      roughness: 0.4,
    });
    const mainInlayGeo = new THREE.TorusGeometry(5.8, 0.025, 12, 64);
    this.stageInlayRing1 = new THREE.Mesh(mainInlayGeo, inlayMat);
    this.stageInlayRing1.rotation.x = Math.PI / 2;
    this.stageInlayRing1.position.y = 0.46;
    this.stageGroup.add(this.stageInlayRing1);

    // Sub-inlays designating each podium's sparring sector
    const sectorInlayGeo = new THREE.TorusGeometry(1.8, 0.02, 12, 48);
    this.stageInlayRing2 = new THREE.Mesh(sectorInlayGeo, inlayMat);
    this.stageInlayRing2.rotation.x = Math.PI / 2;
    this.stageInlayRing2.position.set(-4.0, 0.46, 0.2);
    this.stageGroup.add(this.stageInlayRing2);

    this.stageInlayRing3 = new THREE.Mesh(sectorInlayGeo, inlayMat);
    this.stageInlayRing3.rotation.x = Math.PI / 2;
    this.stageInlayRing3.position.set(4.0, 0.46, 0.2);
    this.stageGroup.add(this.stageInlayRing3);

    // 5. Contact Soft Shadow Disc underneath the platform
    const shadowDiscGeo = new THREE.CircleGeometry(10.4, 48);
    const shadowDiscMat = new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: this.isDark ? 0.55 : 0.2,
      depthWrite: false,
    });
    const shadowDisc = new THREE.Mesh(shadowDiscGeo, shadowDiscMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = -0.99;
    this.scene.add(shadowDisc);
  }

  initOverheadRigAndSpotlights() {
    const trussY = 15.0;
    const trussZ = 4.4;

    const pipeGeo = new THREE.CylinderGeometry(0.12, 0.12, 28, 24);
    const pipeMat = new THREE.MeshStandardMaterial({ color: '#252528', metalness: 0.8, roughness: 0.3 });
    const mainPipe = new THREE.Mesh(pipeGeo, pipeMat);
    mainPipe.rotation.z = Math.PI / 2;
    mainPipe.position.set(0, trussY, trussZ);
    this.lightingRigGroup.add(mainPipe);

    const subPipe = new THREE.Mesh(pipeGeo, pipeMat);
    subPipe.rotation.z = Math.PI / 2;
    subPipe.position.set(0, trussY + 0.6, trussZ - 0.3);
    this.lightingRigGroup.add(subPipe);

    [-10, -4, 4, 10].forEach((x) => {
      const cableGeo = new THREE.CylinderGeometry(0.025, 0.025, 5, 8);
      const cable = new THREE.Mesh(cableGeo, pipeMat);
      cable.position.set(x, trussY + 2.5, trussZ);
      this.lightingRigGroup.add(cable);
    });

    const createTheatreFixture = (xPos: number, isCrimsonBeam: boolean) => {
      const fixtureGroup = new THREE.Group();
      fixtureGroup.position.set(xPos, trussY, trussZ);

      const yokeGeo = new THREE.TorusGeometry(0.85, 0.06, 12, 24, Math.PI);
      const yoke = new THREE.Mesh(yokeGeo, pipeMat);
      yoke.rotation.x = Math.PI;
      yoke.position.y = -0.3;
      fixtureGroup.add(yoke);

      const clampGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.4, 12);
      const clamp = new THREE.Mesh(clampGeo, pipeMat);
      clamp.position.y = 0.2;
      fixtureGroup.add(clamp);

      const housingGroup = new THREE.Group();
      housingGroup.position.set(0, -0.9, 0);

      const housingGeo = new THREE.CylinderGeometry(0.58, 0.45, 1.6, 24);
      const housingMat = new THREE.MeshStandardMaterial({
        color: '#151518',
        metalness: 0.65,
        roughness: 0.32,
      });
      const housing = new THREE.Mesh(housingGeo, housingMat);
      housing.castShadow = true;
      housingGroup.add(housing);

      const bezelGeo = new THREE.TorusGeometry(0.56, 0.08, 12, 24);
      const bezel = new THREE.Mesh(bezelGeo, pipeMat);
      bezel.rotation.x = Math.PI / 2;
      bezel.position.y = -0.8;
      housingGroup.add(bezel);

      // Barn-door flaps
      [-0.45, 0.45].forEach((offset) => {
        const flapGeo = new THREE.BoxGeometry(0.8, 0.02, 0.35);
        const flap1 = new THREE.Mesh(flapGeo, pipeMat);
        flap1.position.set(0, -0.9, offset);
        flap1.rotation.x = offset > 0 ? 0.35 : -0.35;
        housingGroup.add(flap1);

        const flap2 = new THREE.Mesh(flapGeo, pipeMat);
        flap2.rotation.y = Math.PI / 2;
        flap2.position.set(offset, -0.9, 0);
        flap2.rotation.z = offset > 0 ? -0.35 : 0.35;
        housingGroup.add(flap2);
      });

      const lensGeo = new THREE.CircleGeometry(0.44, 24);
      const lensMat = new THREE.MeshStandardMaterial({
        color: isCrimsonBeam ? '#FF3366' : '#FFFFFF',
        emissive: isCrimsonBeam ? '#FF3366' : '#FFFFFF',
        emissiveIntensity: 1.5,
        roughness: 0.1,
      });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.rotation.x = Math.PI / 2;
      lens.position.y = -0.78;
      housingGroup.add(lens);

      fixtureGroup.add(housingGroup);

      const targetX = xPos < 0 ? -4.0 : 4.0;
      housingGroup.lookAt(targetX, 1.8, 0.2);
      housingGroup.rotation.x += Math.PI / 2;

      return { fixtureGroup, lens, housingGroup };
    };

    // Left Spotlight (Aiming at FOR Debater & Podium)
    const leftX = -7.0;
    const leftFixture = createTheatreFixture(leftX, false);
    this.lightingRigGroup.add(leftFixture.fixtureGroup);
    this.leftLensMesh = leftFixture.lens;

    this.leftSpotTarget.position.set(-4.0, 2.0, 0.2);
    this.leftSpotLight = new THREE.SpotLight('#FFFFFF', 520);
    this.leftSpotLight.position.set(leftX, trussY - 1.6, trussZ);
    this.leftSpotLight.target = this.leftSpotTarget;
    this.leftSpotLight.angle = Math.PI / 5.0;
    this.leftSpotLight.penumbra = 0.55;
    this.leftSpotLight.decay = 1.6;
    this.leftSpotLight.distance = 42;
    this.leftSpotLight.castShadow = true;
    this.leftSpotLight.shadow.mapSize.width = 1024;
    this.leftSpotLight.shadow.mapSize.height = 1024;
    this.leftSpotLight.shadow.bias = -0.0004;
    this.scene.add(this.leftSpotLight);

    const beamHeight = 15;
    const beamGeo = new THREE.CylinderGeometry(0.45, 3.9, beamHeight, 32, 1, true);
    beamGeo.translate(0, -beamHeight / 2, 0);

    const leftBeamMat = new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.leftBeamMesh = new THREE.Mesh(beamGeo, leftBeamMat);
    this.leftBeamMesh.position.set(leftX, trussY - 1.6, trussZ);
    this.leftBeamMesh.lookAt(-4.0, 1.8, 0.2);
    this.leftBeamMesh.rotation.x += Math.PI / 2;
    this.scene.add(this.leftBeamMesh);

    // Right Spotlight (Aiming at AGAINST Debater & Podium)
    const rightX = 7.0;
    const rightFixture = createTheatreFixture(rightX, true);
    this.lightingRigGroup.add(rightFixture.fixtureGroup);
    this.rightLensMesh = rightFixture.lens;

    this.rightSpotTarget.position.set(4.0, 2.0, 0.2);
    this.rightSpotLight = new THREE.SpotLight('#FF4D6D', 480);
    this.rightSpotLight.position.set(rightX, trussY - 1.6, trussZ);
    this.rightSpotLight.target = this.rightSpotTarget;
    this.rightSpotLight.angle = Math.PI / 5.0;
    this.rightSpotLight.penumbra = 0.55;
    this.rightSpotLight.decay = 1.6;
    this.rightSpotLight.distance = 42;
    this.rightSpotLight.castShadow = true;
    this.rightSpotLight.shadow.mapSize.width = 1024;
    this.rightSpotLight.shadow.mapSize.height = 1024;
    this.rightSpotLight.shadow.bias = -0.0004;
    this.scene.add(this.rightSpotLight);

    const rightBeamMat = new THREE.MeshBasicMaterial({
      color: '#9F1239',
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.rightBeamMesh = new THREE.Mesh(beamGeo, rightBeamMat);
    this.rightBeamMesh.position.set(rightX, trussY - 1.6, trussZ);
    this.rightBeamMesh.lookAt(4.0, 1.8, 0.2);
    this.rightBeamMesh.rotation.x += Math.PI / 2;
    this.scene.add(this.rightBeamMesh);
  }

  initDebateTheatre() {
    // 1. FOR Podium & Debater (Left Stage: angled inward ~20° toward opponent and audience)
    this.podiumFor = createPodium(true, this.isDark);
    this.podiumFor.root.position.set(-4.0, 0.44, 0.2);
    this.podiumFor.root.rotation.y = 0.34;
    this.stageGroup.add(this.podiumFor.root);

    this.debaterFor = createDebater({
      isFor: true,
      skinColor: '#C88865',
      hairColor: '#1A1513',
      suitColor: this.isDark ? '#1C1D24' : '#181920',
      shirtColor: '#F5F5FA',
      tieColor: '#9F1239',
      isDark: this.isDark,
    });
    this.debaterFor.root.position.set(-4.0, 0.44, -0.6);
    this.debaterFor.root.rotation.y = 0.34;
    this.stageGroup.add(this.debaterFor.root);

    // 2. AGAINST Podium & Debater (Right Stage: angled inward ~20° toward opponent and audience)
    this.podiumAgainst = createPodium(false, this.isDark);
    this.podiumAgainst.root.position.set(4.0, 0.44, 0.2);
    this.podiumAgainst.root.rotation.y = -0.34;
    this.stageGroup.add(this.podiumAgainst.root);

    this.debaterAgainst = createDebater({
      isFor: false,
      skinColor: '#E2AF8E',
      hairColor: '#322018',
      suitColor: this.isDark ? '#261F25' : '#221B20',
      shirtColor: '#ECE8E1',
      tieColor: '#4A1220',
      isDark: this.isDark,
    });
    this.debaterAgainst.root.position.set(4.0, 0.44, -0.6);
    this.debaterAgainst.root.rotation.y = -0.34;
    this.stageGroup.add(this.debaterAgainst.root);
  }

  init3DTitle() {
    this.titleGroup.position.set(0, 7.6, -3.2);

    const loader = new FontLoader();
    loader.load(
      'https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json',
      (font) => {
        while (this.titleGroup.children.length > 0) {
          this.titleGroup.remove(this.titleGroup.children[0]);
        }

        const isMobile = (this.container?.clientWidth || window.innerWidth) < 768;
        const textGeo = new TextGeometry('SATURANGLE', {
          font: font,
          size: isMobile ? 1.4 : 2.2,
          depth: 0.65,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.08,
          bevelSize: 0.03,
          bevelOffset: 0,
          bevelSegments: 4,
        });

        textGeo.computeBoundingBox();
        if (textGeo.boundingBox) {
          const xOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
          textGeo.translate(xOffset, 0, 0);
        }

        const materials = [
          new THREE.MeshStandardMaterial({
            color: this.isDark ? '#F5F5F5' : '#111111',
            roughness: 0.15,
            metalness: 0.25,
          }), // Front Face
          new THREE.MeshStandardMaterial({
            color: '#9F1239',
            roughness: 0.35,
            metalness: 0.15,
          }), // Extrusion / Bevel Sides
        ];

        const textMesh = new THREE.Mesh(textGeo, materials);
        textMesh.castShadow = true;
        textMesh.receiveShadow = true;
        this.titleGroup.add(textMesh);

        // Thin refined crimson divider beneath the SATURANGLE 3D title
        const dividerGeo = new THREE.BoxGeometry(isMobile ? 5.2 : 7.2, 0.05, 0.05);
        const dividerMat = new THREE.MeshBasicMaterial({ color: '#9F1239' });
        this.titleDividerMesh = new THREE.Mesh(dividerGeo, dividerMat);
        this.titleDividerMesh.position.set(0, -0.65, 0);
        this.titleGroup.add(this.titleDividerMesh);
      },
      undefined,
      () => {
        // Procedural 3D Plaque Fallback
        const plaqueGeo = new THREE.BoxGeometry(10, 1.8, 0.5);
        const plaqueMat = [
          new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.2 }),
          new THREE.MeshStandardMaterial({ color: '#9F1239', roughness: 0.3 }),
        ];
        const plaque = new THREE.Mesh(plaqueGeo, plaqueMat);
        plaque.castShadow = true;
        this.titleGroup.add(plaque);

        const dividerGeo = new THREE.BoxGeometry(7.2, 0.05, 0.05);
        const dividerMat = new THREE.MeshBasicMaterial({ color: '#9F1239' });
        const divider = new THREE.Mesh(dividerGeo, dividerMat);
        divider.position.set(0, -1.1, 0);
        this.titleGroup.add(divider);
      }
    );
  }

  setTheme(isDark: boolean) {
    this.isDark = isDark;
    const bgCol = isDark ? '#121214' : '#FAF9F6';
    this.scene.background = new THREE.Color(bgCol);
    if (this.scene.fog) {
      this.scene.fog.color = new THREE.Color(bgCol);
      (this.scene.fog as THREE.FogExp2).density = isDark ? 0.015 : 0.011;
    }

    if (this.floorMesh) {
      (this.floorMesh.material as THREE.MeshStandardMaterial).color.set(isDark ? '#101012' : '#FAF9F6');
    }
    if (this.stageSurfaceMesh) {
      (this.stageSurfaceMesh.material as THREE.MeshStandardMaterial).color.set(isDark ? '#202026' : '#EFEBE4');
    }
    if (this.ambientLight) {
      this.ambientLight.color.set(isDark ? '#645C72' : '#FFF9F2');
      this.ambientLight.intensity = isDark ? 0.65 : 0.76;
    }
    if (this.keyDirLight) {
      this.keyDirLight.intensity = isDark ? 0.45 : 0.68;
    }
    if (this.rimBackLight) {
      this.rimBackLight.intensity = isDark ? 0.85 : 0.48;
    }
    if (this.floorBounceLight) {
      this.floorBounceLight.intensity = isDark ? 0.7 : 0.35;
    }

    // Refresh Debater Attire materials for optimum contrast in night/light mode
    if (this.debaterFor) {
      this.debaterFor.jacketMat.color.set(isDark ? '#1C1D24' : '#181920');
      this.debaterFor.trousersMat.color.set(isDark ? '#14141A' : '#181920');
    }
    if (this.debaterAgainst) {
      this.debaterAgainst.jacketMat.color.set(isDark ? '#261F25' : '#221B20');
      this.debaterAgainst.trousersMat.color.set(isDark ? '#18161B' : '#1E1B20');
    }

    // Refresh podium plaque textures
    if (this.podiumFor) {
      ((this.podiumFor.plaqueMesh.material as THREE.MeshBasicMaterial).map as THREE.CanvasTexture).dispose();
      (this.podiumFor.plaqueMesh.material as THREE.MeshBasicMaterial).map = createPodiumPlaqueTexture('FOR', isDark);
    }
    if (this.podiumAgainst) {
      ((this.podiumAgainst.plaqueMesh.material as THREE.MeshBasicMaterial).map as THREE.CanvasTexture).dispose();
      (this.podiumAgainst.plaqueMesh.material as THREE.MeshBasicMaterial).map = createPodiumPlaqueTexture('AGAINST', isDark);
    }

    this.init3DTitle();
  }

  onWindowResize() {
    if (!this.container) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.updateCameraPosition();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  onMouseMove(event: MouseEvent) {
    this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onScroll() {
    this.targetScroll = window.scrollY;
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);
    const time = this.clock.getElapsedTime();

    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;
    this.scrollPos += (this.targetScroll - this.scrollPos) * 0.08;

    const scrollEffect = this.scrollPos * 0.01;
    this.camera.position.x = this.mouse.x * 2.8;
    this.camera.position.y = this.baseCameraY + this.mouse.y * 1.2 - scrollEffect;
    this.camera.position.z = this.baseCameraZ + scrollEffect * 2;
    this.camera.lookAt(this.cameraTarget);

    // Continuous subtle revolving motion of the debate stage
    const stageYaw = Math.sin(time * 0.32) * 0.2;
    this.stageGroup.rotation.y = stageYaw;
    this.stageGroup.rotation.x = this.mouse.y * 0.035;

    // --- CINEMATIC 3-PHASE SPOTLIGHT SEQUENCE ---
    // Total cycle duration = 10.5 seconds
    // Phase 1 (0.0s - 3.5s): FOR Participant speech (Left spotlight highlighted)
    // Phase 2 (3.5s - 4.5s transition -> 4.5s - 7.5s): AGAINST Participant speech (Right spotlight highlighted)
    // Phase 3 (7.5s - 8.3s transition -> 8.3s - 9.7s): Balanced Cross-Examination Stage Illumination
    // (9.7s - 10.5s transition back to Phase 1)
    const cyclePeriod = 10.5;
    const t = time % cyclePeriod;

    let leftFactor = 0.28;
    let rightFactor = 0.28;
    let forSpeaking = false;
    let againstSpeaking = false;
    let balancedClash = false;

    if (t < 3.5) {
      // Phase 1: FOR Debater Commands Floor
      leftFactor = 1.0;
      rightFactor = 0.28;
      forSpeaking = true;
    } else if (t < 4.5) {
      // Transition from FOR to AGAINST
      const p = (t - 3.5) / 1.0;
      const ease = (1 - Math.cos(p * Math.PI)) / 2;
      leftFactor = 1.0 - ease * 0.72;
      rightFactor = 0.28 + ease * 0.72;
      forSpeaking = p < 0.4;
      againstSpeaking = p >= 0.6;
    } else if (t < 7.5) {
      // Phase 2: AGAINST Debater Counter-Rebuttal
      leftFactor = 0.28;
      rightFactor = 1.0;
      againstSpeaking = true;
    } else if (t < 8.3) {
      // Transition from AGAINST to Balanced Clash
      const p = (t - 7.5) / 0.8;
      const ease = (1 - Math.cos(p * Math.PI)) / 2;
      leftFactor = 0.28 + ease * 0.47;
      rightFactor = 1.0 - ease * 0.25;
      againstSpeaking = p < 0.4;
      balancedClash = p >= 0.6;
    } else if (t < 9.7) {
      // Phase 3: Balanced Intellectual Clash / Equal Illumination
      leftFactor = 0.75;
      rightFactor = 0.75;
      balancedClash = true;
    } else {
      // Transition back to Phase 1
      const p = (t - 9.7) / 0.8;
      const ease = (1 - Math.cos(p * Math.PI)) / 2;
      leftFactor = 0.75 + ease * 0.25;
      rightFactor = 0.75 - ease * 0.47;
      balancedClash = p < 0.4;
      forSpeaking = p >= 0.6;
    }

    // SpotLight actual directional 3D intensities
    if (this.leftSpotLight) {
      this.leftSpotLight.intensity = 130 + leftFactor * 460;
    }
    if (this.rightSpotLight) {
      this.rightSpotLight.intensity = 120 + rightFactor * 430;
    }

    // Fixture Lens Emissive Highlights
    if (this.leftLensMesh) {
      (this.leftLensMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 + leftFactor * 2.2;
    }
    if (this.rightLensMesh) {
      (this.rightLensMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 + rightFactor * 2.2;
    }

    // Visible Volumetric Light Beams (Soft, additive, realistic)
    if (this.leftBeamMesh) {
      (this.leftBeamMesh.material as THREE.MeshBasicMaterial).opacity = 0.04 + leftFactor * 0.18;
    }
    if (this.rightBeamMesh) {
      (this.rightBeamMesh.material as THREE.MeshBasicMaterial).opacity = 0.05 + rightFactor * 0.21;
    }

    // Active Microphone LED Indicator Pulses
    if (this.podiumFor) {
      const pulse = forSpeaking || balancedClash ? 1.0 + Math.sin(time * 6) * 0.4 : 0.25;
      (this.podiumFor.micLed.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + pulse * 1.8;
      this.podiumFor.micLight.intensity = 0.2 + pulse * 0.7;
    }
    if (this.podiumAgainst) {
      const pulse = againstSpeaking || balancedClash ? 1.0 + Math.sin(time * 6) * 0.4 : 0.25;
      (this.podiumAgainst.micLed.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + pulse * 1.8;
      this.podiumAgainst.micLight.intensity = 0.2 + pulse * 0.7;
    }

    // --- NATURAL DEBATER BODY MOVEMENTS & GESTURES ---
    const breath = Math.sin(time * 2.2) * 0.015;

    // 1. FOR Debater Articulation
    if (this.debaterFor) {
      this.debaterFor.chestMesh.position.y = 0.05 + breath;

      if (forSpeaking) {
        // Active oration: expressive right arm gestures with rhetoric cadence
        const speechCadence = Math.sin(time * 2.8) * 0.24 + Math.cos(time * 4.6) * 0.12;
        this.debaterFor.armR.rotation.x = -0.55 + speechCadence * 1.1;
        this.debaterFor.armR.rotation.z = 0.25 + speechCadence * 0.4;
        this.debaterFor.forearmR.rotation.x = -0.65 - speechCadence * 0.6;
        this.debaterFor.headGroup.rotation.y = Math.sin(time * 1.2) * 0.14 + 0.05;
        this.debaterFor.headGroup.rotation.x = -0.05 + Math.sin(time * 2.8) * 0.05;
      } else if (balancedClash) {
        // Cross-examination engagement
        const clashGesture = Math.sin(time * 3.4) * 0.15;
        this.debaterFor.armR.rotation.x = -0.45 + clashGesture * 0.6;
        this.debaterFor.forearmR.rotation.x = -0.7 - clashGesture * 0.4;
        this.debaterFor.headGroup.rotation.y = 0.18 + Math.sin(time * 0.8) * 0.08;
      } else {
        // Attentive listening / resting pose on podium
        this.debaterFor.armR.rotation.x = -0.58 + Math.sin(time * 0.6) * 0.04;
        this.debaterFor.armR.rotation.z = 0.2;
        this.debaterFor.forearmR.rotation.x = -0.62;
        this.debaterFor.headGroup.rotation.y = 0.22 + Math.sin(time * 0.5) * 0.04; // Looking toward opponent
        this.debaterFor.headGroup.rotation.x = 0;
      }
    }

    // 2. AGAINST Debater Articulation
    if (this.debaterAgainst) {
      this.debaterAgainst.chestMesh.position.y = 0.05 + breath;

      if (againstSpeaking) {
        // Active counter-rebuttal: analytical left arm gestures
        const rebuttalCadence = Math.sin(time * 3.0) * 0.25 + Math.cos(time * 4.4) * 0.1;
        this.debaterAgainst.armL.rotation.x = -0.55 + rebuttalCadence * 1.1;
        this.debaterAgainst.armL.rotation.z = -0.25 - rebuttalCadence * 0.4;
        this.debaterAgainst.forearmL.rotation.x = -0.65 - rebuttalCadence * 0.6;
        this.debaterAgainst.headGroup.rotation.y = Math.sin(time * 1.2) * 0.14 - 0.05;
        this.debaterAgainst.headGroup.rotation.x = -0.05 + Math.sin(time * 3.0) * 0.05;
      } else if (balancedClash) {
        // Cross-examination rebuttal engagement
        const clashGesture = Math.cos(time * 3.4) * 0.15;
        this.debaterAgainst.armL.rotation.x = -0.45 + clashGesture * 0.6;
        this.debaterAgainst.forearmL.rotation.x = -0.7 - clashGesture * 0.4;
        this.debaterAgainst.headGroup.rotation.y = -0.18 - Math.sin(time * 0.8) * 0.08;
      } else {
        // Attentive listening / resting pose on podium
        this.debaterAgainst.armL.rotation.x = -0.58 + Math.sin(time * 0.6) * 0.04;
        this.debaterAgainst.armL.rotation.z = -0.2;
        this.debaterAgainst.forearmL.rotation.x = -0.62;
        this.debaterAgainst.headGroup.rotation.y = -0.22 - Math.sin(time * 0.5) * 0.04; // Looking toward opponent
        this.debaterAgainst.headGroup.rotation.x = 0;
      }
    }

    // 3D SATURANGLE Title Floating Motion
    if (this.titleGroup) {
      this.titleGroup.position.y = 7.6 + Math.sin(time * 0.8) * 0.12;
      this.titleGroup.rotation.y = Math.sin(time * 0.3) * 0.09 + this.mouse.x * 0.08;
      this.titleGroup.rotation.x = this.mouse.y * 0.06;
    }

    this.renderer.render(this.scene, this.camera);
  }

  cleanup() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('scroll', this.onScroll);
    this.renderer.dispose();
    if (this.container && this.renderer.domElement && this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

// --- SUB-COMPONENTS ---

// 1. DEDICATED RESPONSIVE NAVIGATION BAR
const Header: React.FC<{
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenJoin: () => void;
}> = ({ isDark, onToggleTheme, onOpenJoin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        { id: 'hero', name: 'Home' },
        { id: 'about', name: 'About' },
        { id: 'events', name: 'Events' },
        { id: 'achievements', name: 'Achievements' },
        { id: 'team', name: 'Our Team' },
        { id: 'core-council', name: 'Core Council' },
        { id: 'our-teams', name: 'Our Teams' },
        { id: 'gallery', name: 'Gallery' },
      ];

      const curPos = window.scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= curPos) {
          setActiveSection(sections[i].name);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isDark
          ? 'bg-[#121212]/95 backdrop-blur-md border-white/10 shadow-lg'
          : 'bg-[#FAF9F6]/95 backdrop-blur-md border-[#E7E3DF] shadow-sm'
      } ${scrolled ? 'py-3' : 'py-4'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
        {/* Left: GLA University Logo & Official Brand Mark */}
        <a href="#hero" className="flex items-center space-x-3 cursor-pointer group flex-shrink-0">
          <div className="w-10 h-10 bg-[#111111] border border-white/15 flex flex-col items-center justify-center border-b-2 border-[#9F1239] transition-transform group-hover:scale-105 shadow-sm rounded-xs">
            <span className="text-white font-bold text-xs tracking-widest leading-none">GLA</span>
            <span className="text-white text-[0.45rem] tracking-widest leading-none mt-1 font-semibold">UNIV</span>
          </div>
          <div className="font-semibold text-xs leading-tight tracking-wider">
            <span className={`font-bold tracking-widest text-sm font-display block ${isDark ? 'text-white' : 'text-[#111111]'}`}>
              SATURANGLE
            </span>
            <span className="text-[#888888] font-normal text-[10px] tracking-wider uppercase block">
              GLA University • Mathura
            </span>
          </div>
        </a>

        {/* Center: Desktop / Laptop Horizontal Navigation (All 8 links properly spaced) */}
        <nav className="hidden xl:flex items-center space-x-5 2xl:space-x-7">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 relative py-1.5 ${
                  isActive
                    ? 'text-[#9F1239] font-bold'
                    : isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-[#333333] hover:text-[#9F1239]'
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#9F1239] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right: Theme Toggle & Join Us Button */}
        <div className="hidden xl:flex items-center space-x-4 flex-shrink-0">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-full border transition-all ${
              isDark
                ? 'border-white/20 text-yellow-400 bg-white/5 hover:bg-white/15'
                : 'border-[#E7E3DF] text-[#111111] bg-white hover:bg-gray-100 shadow-xs'
            }`}
            aria-label="Toggle Theme"
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={onOpenJoin}
            className="cta-btn text-xs font-bold uppercase tracking-wider bg-[#111111] text-white px-5 py-2.5 rounded-full hover:bg-[#9F1239] transition-all shadow-md hover:shadow-lg border border-white/10"
          >
            Join Us
          </button>
        </div>

        {/* Mobile / Narrow Screen Navigation: Theme toggle + 3-line Hamburger Menu */}
        <div className="xl:hidden flex items-center space-x-2">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-full border ${
              isDark ? 'border-white/20 text-yellow-400 bg-white/5' : 'border-[#E7E3DF] text-[#111111] bg-white'
            }`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2.5 rounded border ${
              isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-[#E7E3DF] text-[#111111] hover:bg-black/5'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Opens on hamburger click, closes on link select) */}
      {menuOpen && (
        <div
          className={`xl:hidden absolute top-full left-0 w-full border-b shadow-2xl py-6 px-6 flex flex-col space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-200 ${
            isDark ? 'bg-[#161616] border-white/10 text-white' : 'bg-white border-[#E7E3DF] text-[#111111]'
          }`}
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-xs font-semibold tracking-wider uppercase py-2 border-b border-gray-500/10 hover:text-[#9F1239] transition-colors"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenJoin();
              }}
              className="w-full text-center font-bold text-xs uppercase tracking-wider bg-[#9F1239] text-white px-6 py-3.5 rounded-md shadow-md hover:bg-[#800E2E] transition-colors"
            >
              Apply to Join Saturangle
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

// 2. HERO SECTION — EXACT REQUESTED TEXT & STRICT VERTICAL ORDER
const Hero: React.FC<{ isDark: boolean; onOpenJoin: () => void }> = ({ isDark, onOpenJoin }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<DebateArena | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const arena = new DebateArena(containerRef.current, isDark);
    arenaRef.current = arena;
    return () => {
      arena.cleanup();
      arenaRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (arenaRef.current) {
      arenaRef.current.setTheme(isDark);
    }
  }, [isDark]);

  return (
    <section
      id="hero"
      className={`relative w-full overflow-hidden transition-colors duration-500 pt-28 md:pt-32 ${
        isDark ? 'bg-[#121214]' : 'bg-[#FAF9F6]'
      }`}
    >
      {/* Restrained Crimson Gradient Ambient Accent around the Stage */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isDark
            ? 'opacity-90 bg-[radial-gradient(ellipse_75%_55%_at_50%_42%,rgba(159,18,57,0.16),rgba(18,18,20,0))]'
            : 'opacity-70 bg-[radial-gradient(ellipse_75%_55%_at_50%_42%,rgba(159,18,57,0.04),rgba(250,249,246,0))]'
        }`}
      />

      {/* 2. Hero Introduction Label — EXACT TEXT REQUIRED: "INTRODUCING THE OFFICIAL DEBATE CLUB" */}
      <div className="w-full text-center relative z-20 mb-3 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#9F1239]/30 bg-gradient-to-r from-[#9F1239]/10 via-[#9F1239]/5 to-[#9F1239]/10 backdrop-blur-sm shadow-xs max-w-full">
          <Sparkles size={13} className="text-[#9F1239] flex-shrink-0" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#9F1239] uppercase">
            INTRODUCING THE OFFICIAL DEBATE CLUB
          </span>
        </div>
      </div>

      {/* 3 & 4. 3D WebGL Canvas (Dimensional Title + Complete Circular Moving Theatre Arena + Spotlights) */}
      <div className="relative w-full h-[540px] sm:h-[600px] md:h-[660px] lg:h-[700px] overflow-hidden">
        {/* WebGL Canvas mount */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-auto" />

        {/* Lateral Dialectic Badges (Floating on sides away from central arena) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 max-w-7xl mx-auto px-6 hidden md:flex justify-between items-center pointer-events-none z-10">
          {/* FOR Indicator */}
          <div className="pointer-events-auto group cursor-help max-w-[230px]">
            <div
              className={`px-4 py-2 text-[11px] font-bold tracking-widest shadow-lg inline-block border backdrop-blur-md transition-all ${
                isDark
                  ? 'bg-[#16161C]/90 text-white border-white/10 hover:border-[#9F1239]/60'
                  : 'bg-white/95 text-[#111111] border-[#E7E3DF] hover:border-[#9F1239]/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#9F1239]" />
                <span>PROPOSITION</span>
                <span className="text-[#9F1239]">·</span>
                <span className="text-[#9F1239]">FOR</span>
              </div>
            </div>
            <div
              className={`mt-2 text-[11px] leading-relaxed p-3 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border ${
                isDark
                  ? 'bg-[#181820]/95 text-gray-300 border-white/10'
                  : 'bg-white/95 text-[#555555] border-[#E7E3DF] shadow-md'
              }`}
            >
              Under the spotlight: Proposing the motion, structuring empirical frameworks, and setting the debate burden.
            </div>
          </div>

          {/* AGAINST Indicator */}
          <div className="pointer-events-auto group cursor-help max-w-[230px] text-right">
            <div
              className={`px-4 py-2 text-[11px] font-bold tracking-widest shadow-lg inline-block border backdrop-blur-md transition-all ${
                isDark
                  ? 'bg-[#16161C]/90 text-white border-white/10 hover:border-[#9F1239]/60'
                  : 'bg-white/95 text-[#111111] border-[#E7E3DF] hover:border-[#9F1239]/50'
              }`}
            >
              <div className="flex items-center gap-2 justify-end">
                <span className="text-[#9F1239]">AGAINST</span>
                <span className="text-[#9F1239]">·</span>
                <span>OPPOSITION</span>
                <span className="w-1.5 h-1.5 bg-[#9F1239]" />
              </div>
            </div>
            <div
              className={`mt-2 text-[11px] leading-relaxed p-3 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border text-left ${
                isDark
                  ? 'bg-[#181820]/95 text-gray-300 border-white/10'
                  : 'bg-white/95 text-[#555555] border-[#E7E3DF] shadow-md'
              }`}
            >
              Under the spotlight: Questioning premises, presenting counter-mechanisms, and testing logical integrity.
            </div>
          </div>
        </div>
      </div>

      {/* 5 & 6. HERO CONTENT STRICTLY BELOW THE STAGE (Whitespace + Tagline + Separate CTA Button Row) */}
      <div className="w-full max-w-4xl mx-auto text-center px-6 pt-6 pb-20 md:pb-28 relative z-20">
        {/* Tagline completely below the stage */}
        <p
          className={`font-display italic text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 leading-snug tracking-tight transition-colors ${
            isDark ? 'text-gray-100' : 'text-[#181818]'
          }`}
        >
          &ldquo;Where Opinions Are Shared, Challenged &amp; Improved.&rdquo;
        </p>

        {/* Separate CTA Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a
            href="#about"
            className="cta-btn w-full sm:w-auto px-9 py-4 font-bold text-xs tracking-widest uppercase bg-[#111111] text-white hover:bg-[#9F1239] shadow-lg border border-white/10 text-center"
          >
            EXPLORE SATURANGLE
          </a>
          <a
            href="#events"
            className={`cta-btn w-full sm:w-auto px-9 py-4 font-bold text-xs tracking-widest uppercase border transition-all text-center ${
              isDark
                ? 'border-white/30 text-white hover:bg-white hover:text-black'
                : 'border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white'
            }`}
          >
            DISCOVER OUR EVENTS
          </a>
        </div>
      </div>
    </section>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle?: string; centered?: boolean; isDark: boolean }> = ({
  title,
  subtitle,
  centered = true,
  isDark,
}) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <h2
      className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display ${
        isDark ? 'text-white' : 'text-[#111111]'
      }`}
    >
      {title}
    </h2>
    {subtitle && (
      <p className={`text-base md:text-lg max-w-2xl ${isDark ? 'text-gray-400' : 'text-[#686868]'} ${centered ? 'mx-auto' : ''}`}>
        {subtitle}
      </p>
    )}
    <div className={`w-16 h-1 bg-[#9F1239] mt-6 ${centered ? 'mx-auto' : ''}`} />
  </div>
);

// 3. ABOUT SATURANGLE SECTION
const AboutSection: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <section
    id="about"
    className={`py-24 border-t transition-colors duration-500 relative z-20 ${
      isDark ? 'bg-[#161616] border-white/10' : 'bg-white border-[#E7E3DF]'
    }`}
  >
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[#9F1239] font-bold tracking-widest text-xs uppercase mb-3">ABOUT SATURANGLE</p>
          <h2
            className={`text-4xl md:text-5xl font-display italic font-bold mb-8 leading-tight ${
              isDark ? 'text-white' : 'text-[#111111]'
            }`}
          >
            More Than Opinions.
            <br />
            <span className="text-[#9F1239]">A Culture of Thought.</span>
          </h2>
          <div className={`space-y-6 text-base md:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-[#686868]'}`}>
            <p>
              We are the premier debate society of GLA University. Saturangle is not just about winning arguments; it is an
              arena for structured discourse, critical thinking, and intellectual refinement.
            </p>
            <p>
              Through constructive disagreement and rigorous public speaking, we prepare students to navigate complex ideas,
              challenge prevailing narratives, and articulate their perspectives with unshakeable confidence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {[
            {
              title: 'THINK',
              desc: 'Question assumptions, analyze empirical facts deeply, and construct bulletproof logical frameworks before uttering a word.',
            },
            {
              title: 'SPEAK',
              desc: 'Articulate ideas with precision, command the stage under pressure, and communicate with clarity and poise.',
            },
            {
              title: 'CHALLENGE',
              desc: 'Explore perspectives beyond your own worldview through structured, respectful rebuttal and critical active listening.',
            },
          ].map((pillar, i) => (
            <div
              key={i}
              className={`p-7 border transition-all duration-300 group hover:shadow-lg ${
                isDark
                  ? 'bg-[#1F1F1F] border-white/10 hover:border-[#9F1239]'
                  : 'bg-[#FAF9F6] border-[#E7E3DF] hover:border-[#9F1239]'
              }`}
            >
              <h3 className={`text-xl font-bold mb-2 flex items-center ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                <span className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center text-sm mr-4 group-hover:bg-[#9F1239] transition-colors font-display italic font-bold border border-white/10">
                  {i + 1}
                </span>
                {pillar.title}
              </h3>
              <p className={`pl-14 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-[#686868]'}`}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// 3. EVENTS SECTION — EXACT 4 EDITABLE EVENT CARDS (IEEE MUJ INSPIRATION)
const EventsSection: React.FC<{ isDark: boolean; onSelectEvent: (event: EventItem) => void }> = ({
  isDark,
  onSelectEvent,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Parliamentary', 'Turncoat', 'Workshop', 'Town Hall'];

  const filteredEvents = EVENTS_DATA.filter((evt) => {
    const matchesTab = activeTab === 'all' || evt.status === activeTab;
    const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
    return matchesTab && matchesCategory;
  });

  const upcomingCount = EVENTS_DATA.filter((e) => e.status === 'upcoming').length;
  const pastCount = EVENTS_DATA.filter((e) => e.status === 'past').length;

  return (
    <section
      id="events"
      className={`py-24 border-t transition-colors duration-500 relative z-20 ${
        isDark ? 'bg-[#121214] border-white/10' : 'bg-[#FAF9F6] border-[#E7E3DF]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#9F1239]/20 bg-[#9F1239]/5 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#9F1239]" />
            <span className="text-[11px] font-bold tracking-widest text-[#9F1239] uppercase">
              Schedule &amp; Tournaments
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display ${
              isDark ? 'text-white' : 'text-[#111111]'
            }`}
          >
            Events
          </h2>
          <p
            className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-[#686868]'
            }`}
          >
            Explore upcoming and past events organized by SATURANGLE.
          </p>
          <div className="w-16 h-1 bg-[#9F1239] mx-auto mt-6" />
        </div>

        {/* Tab Switcher & Category Filters — IEEE MUJ Inspired */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-gray-500/15 pb-6">
          <div className="flex items-center p-1 rounded-md border border-gray-500/20 bg-black/5 dark:bg-white/5">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all ${
                activeTab === 'all'
                  ? 'bg-[#111111] text-white dark:bg-white dark:text-black shadow-sm'
                  : isDark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-[#555555] hover:text-black'
              }`}
            >
              All Events ({EVENTS_DATA.length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2 ${
                activeTab === 'upcoming'
                  ? 'bg-[#9F1239] text-white shadow-sm'
                  : isDark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-[#555555] hover:text-black'
              }`}
            >
              Upcoming ({upcomingCount})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2 ${
                activeTab === 'past'
                  ? 'bg-[#9F1239] text-white shadow-sm'
                  : isDark
                  ? 'text-gray-300 hover:text-white'
                  : 'text-[#555555] hover:text-black'
              }`}
            >
              Past ({pastCount})
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 mr-2 text-[#888888]">
              <Filter size={13} />
              <span className="text-[11px] font-semibold uppercase tracking-wider">Format:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[11px] font-semibold tracking-wider rounded transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#9F1239] text-white'
                    : isDark
                    ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                    : 'bg-white text-[#555555] border border-[#E7E3DF] hover:border-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Exactly 4 Editable Event Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className={`border rounded-xs overflow-hidden flex flex-col justify-between group transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#1A1A1C] border-white/10 hover:border-[#9F1239]'
                  : 'bg-white border-[#E7E3DF] hover:border-[#9F1239] shadow-xs'
              }`}
            >
              <div>
                {/* Poster Frame */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                  <img
                    src={evt.poster}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="bg-[#111111]/90 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase border border-white/15">
                      {evt.category}
                    </span>
                    {evt.status === 'upcoming' ? (
                      <span className="bg-emerald-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-xs tracking-wider uppercase">
                        Upcoming
                      </span>
                    ) : (
                      <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-medium px-2 py-0.5 rounded-xs tracking-wider uppercase">
                        Archive
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2.5">
                    <span className="text-[9px] uppercase tracking-wider text-white/75 font-mono">
                      Poster Placeholder
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3
                    className={`text-lg font-bold font-display leading-tight mb-1 group-hover:text-[#9F1239] transition-colors ${
                      isDark ? 'text-white' : 'text-[#111111]'
                    }`}
                  >
                    {evt.title}
                  </h3>
                  <p className={`text-xs italic mb-3 font-serif line-clamp-1 ${isDark ? 'text-gray-300' : 'text-[#686868]'}`}>
                    &ldquo;{evt.tagline}&rdquo;
                  </p>
                  <p className={`text-xs leading-relaxed line-clamp-3 mb-4 ${isDark ? 'text-gray-400' : 'text-[#686868]'}`}>
                    {evt.desc}
                  </p>
                </div>
              </div>

              <div className={`p-5 pt-0 border-t ${isDark ? 'border-white/10' : 'border-[#E7E3DF]'} mt-2 flex items-center justify-between`}>
                <span className="text-[10px] text-gray-500 font-mono uppercase">{evt.date}</span>
                <span className="text-xs font-bold text-[#9F1239] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Details
                  <ChevronRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. ACHIEVEMENTS SECTION — INTENTIONAL POLISHED EMPTY-STATE GALLERY PLACEHOLDER
const AchievementsSection: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <section
    id="achievements"
    className={`py-24 border-t transition-colors duration-500 relative z-20 ${
      isDark ? 'bg-[#151518] border-white/10' : 'bg-white border-[#E7E3DF]'
    }`}
  >
    <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#9F1239]/20 bg-[#9F1239]/5 mb-3">
          <Award size={13} className="text-[#9F1239]" />
          <span className="text-[11px] font-bold tracking-widest text-[#9F1239] uppercase">
            Honors &amp; Milestones
          </span>
        </div>
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display ${
            isDark ? 'text-white' : 'text-[#111111]'
          }`}
        >
          Achievements
        </h2>
        <p
          className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-[#686868]'
          }`}
        >
          Celebrating our milestones, voices and impact.
        </p>
        <div className="w-16 h-1 bg-[#9F1239] mx-auto mt-6" />
      </div>

      {/* Clean, gallery-like placeholder area */}
      <div
        className={`border-2 border-dashed rounded-xs p-10 md:p-16 text-center max-w-4xl mx-auto transition-all ${
          isDark
            ? 'bg-[#1A1A1E]/80 border-white/15'
            : 'bg-[#FAF9F6] border-[#E7E3DF]'
        }`}
      >
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#9F1239]/10 text-[#9F1239] flex items-center justify-center border border-[#9F1239]/30">
          <Award size={28} />
        </div>
        <h3
          className={`text-xl sm:text-2xl font-bold font-display mb-2 ${
            isDark ? 'text-white' : 'text-[#111111]'
          }`}
        >
          Official Records &amp; Accolades Pending
        </h3>
        <p
          className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8 ${
            isDark ? 'text-gray-400' : 'text-[#686868]'
          }`}
        >
          This gallery space is reserved for verified competitive achievements, speaker citations, tournament podium finishes, and institutional honors earned by SATURANGLE debaters across collegiate circuits.
        </p>

        {/* Gallery-like grid framework outline */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {['Awards & Recognition', 'Competition Highlights', 'Club Milestones'].map((slot, i) => (
            <div
              key={i}
              className={`p-6 border rounded-xs flex flex-col items-center justify-center ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#E7E3DF]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#9F1239]/40 mb-2" />
              <span className="text-xs font-bold font-display uppercase tracking-wider mb-1">
                {slot}
              </span>
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                Awaiting Verification
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Reusable Member Avatar with Photo Support & Interactive Upload Trigger
const MemberAvatar: React.FC<{
  name: string;
  initials: string;
  photoUrl?: string;
  sizeClass?: string;
  badgeLabel?: string;
  isDark: boolean;
  onEditPhoto?: () => void;
}> = ({
  name,
  initials,
  photoUrl,
  sizeClass = 'w-24 h-24',
  badgeLabel = 'Photo Slot',
  isDark,
  onEditPhoto,
}) => (
  <div
    className="relative group/avatar cursor-pointer"
    onClick={(e) => {
      e.stopPropagation();
      onEditPhoto?.();
    }}
    title={`Click to set or change portrait for ${name}`}
  >
    <div
      className={`${sizeClass} rounded-full border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 group-hover/avatar:scale-105 group-hover/avatar:border-[#9F1239] shadow-inner ${
        photoUrl
          ? 'border-[#9F1239] bg-black/5'
          : isDark
          ? 'border-white/20 bg-white/5 text-gray-300 group-hover/avatar:text-[#9F1239]'
          : 'border-[#E7E3DF] bg-[#FAF9F6] text-gray-600 group-hover/avatar:text-[#9F1239]'
      }`}
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="text-xl sm:text-2xl font-bold font-display tracking-widest">{initials}</span>
      )}
    </div>
    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[8px] font-mono uppercase bg-[#111111] text-white border border-white/20 flex items-center gap-1 shadow-sm whitespace-nowrap group-hover/avatar:bg-[#9F1239] transition-colors">
      <Camera size={9} />
      <span>{photoUrl ? 'Change' : badgeLabel}</span>
    </div>
  </div>
);

// 5. OUR TEAM — FACULTY MENTOR (Static, clean neutral profile placeholder with photo upload support)
const TeamSection: React.FC<{
  isDark: boolean;
  photoUrl?: string;
  onEditPhoto: (name: string) => void;
}> = ({ isDark, photoUrl, onEditPhoto }) => (
  <section
    id="team"
    className={`py-24 border-t transition-colors duration-500 relative z-20 ${
      isDark ? 'bg-[#121214] border-white/10 text-white' : 'bg-[#FAF9F6] border-[#E7E3DF] text-[#111111]'
    }`}
  >
    <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#9F1239]/20 bg-[#9F1239]/5 mb-3">
          <GraduationCap size={13} className="text-[#9F1239]" />
          <span className="text-[11px] font-bold tracking-widest text-[#9F1239] uppercase">
            Faculty Mentorship
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display">
          Our Team
        </h2>
        <div className="w-16 h-1 bg-[#9F1239] mx-auto mt-6" />
      </div>

      {/* Static Faculty Mentor Card */}
      <div className="max-w-2xl mx-auto">
        <div
          className={`border-2 rounded-xs p-8 sm:p-10 transition-all shadow-md flex flex-col sm:flex-row items-center gap-8 ${
            isDark
              ? 'bg-[#1A1A1E] border-[#9F1239]/40'
              : 'bg-white border-[#9F1239]/40'
          }`}
        >
          {/* Faculty Mentor Avatar with photo upload capability */}
          <MemberAvatar
            name={MENTOR_INFO.name}
            initials={MENTOR_INFO.initials}
            photoUrl={photoUrl}
            sizeClass="w-28 h-28 sm:w-32 sm:h-32"
            badgeLabel="Profile Slot"
            isDark={isDark}
            onEditPhoto={() => onEditPhoto(MENTOR_INFO.name)}
          />

          <div className="text-center sm:text-left space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9F1239] px-2.5 py-1 bg-[#9F1239]/10 rounded-xs inline-block">
              Faculty Mentor
            </span>
            <h3
              className={`text-2xl sm:text-3xl font-bold font-display ${
                isDark ? 'text-white' : 'text-[#111111]'
              }`}
            >
              {MENTOR_INFO.name}
            </h3>
            <p className="text-sm font-semibold text-gray-500">
              {MENTOR_INFO.role}
            </p>
            <p className="text-xs text-gray-400 font-mono uppercase tracking-wider pt-1">
              {MENTOR_INFO.affiliation}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// 6. CORE COUNCIL CAROUSEL — 7 POSITIONS IN STRICT SPECIFIED SEQUENCE WITH DRAG & ARROW CONTROLS
const CoreCouncilSection: React.FC<{
  isDark: boolean;
  userPhotos: Record<string, string>;
  onSelectMember: (member: CouncilMember) => void;
  onEditPhoto: (name: string) => void;
}> = ({ isDark, userPhotos, onSelectMember, onEditPhoto }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, []);

  const handleScrollLeft = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollStart(scrollRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollStart - walk;
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="core-council"
      className={`py-24 border-t transition-colors duration-500 relative z-20 ${
        isDark ? 'bg-[#151518] border-white/10 text-white' : 'bg-white border-[#E7E3DF] text-[#111111]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#9F1239]/20 bg-[#9F1239]/5 mb-3">
              <Shield size={13} className="text-[#9F1239]" />
              <span className="text-[11px] font-bold tracking-widest text-[#9F1239] uppercase">
                Student Governance &bull; 7 Executive Portfolios
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-display">
              Core Council
            </h2>
            <p className={`text-sm md:text-base max-w-2xl mt-3 ${isDark ? 'text-gray-400' : 'text-[#686868]'}`}>
              The elected executive board and secretariat presiding over parliamentary motions, adjudications, and society administration.
            </p>
            <div className="w-16 h-1 bg-[#9F1239] mt-5" />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-gray-500 mr-2 hidden sm:inline-block">
              Executive Portfolios ({CORE_COUNCIL_MEMBERS.length})
            </span>
            <button
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border transition-all ${
                canScrollLeft
                  ? isDark
                    ? 'border-white/20 bg-white/5 hover:bg-[#9F1239] text-white hover:border-[#9F1239]'
                    : 'border-[#111111] bg-white hover:bg-[#9F1239] text-[#111111] hover:text-white shadow-sm'
                  : 'opacity-35 cursor-not-allowed border-gray-400/20 text-gray-500'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border transition-all ${
                canScrollRight
                  ? isDark
                    ? 'border-white/20 bg-white/5 hover:bg-[#9F1239] text-white hover:border-[#9F1239]'
                    : 'border-[#111111] bg-white hover:bg-[#9F1239] text-[#111111] hover:text-white shadow-sm'
                  : 'opacity-35 cursor-not-allowed border-gray-400/20 text-gray-500'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track with Drag / Touch Gesture Support */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          className={`flex gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollSnapType: isDragging ? 'none' : 'x mandatory' }}
        >
          {CORE_COUNCIL_MEMBERS.map((member, index) => (
            <div
              key={member.id}
              onClick={() => onSelectMember(member)}
              style={{ scrollSnapAlign: 'start' }}
              className={`flex-shrink-0 w-72 sm:w-80 border rounded-xs p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group cursor-pointer ${
                isDark
                  ? 'bg-[#1A1A1E] border-white/10 hover:border-[#9F1239]'
                  : 'bg-white border-[#E7E3DF] hover:border-[#9F1239] shadow-xs'
              }`}
            >
              {/* Header with sequence badge & wing */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono tracking-widest text-[#9F1239] font-bold">
                    #{String(index + 1).padStart(2, '0')} / {String(CORE_COUNCIL_MEMBERS.length).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-xs border font-medium ${
                      member.isConfirmed
                        ? 'border-emerald-500/40 text-emerald-500 bg-emerald-500/10'
                        : isDark
                        ? 'border-white/15 text-gray-400 bg-white/5'
                        : 'border-gray-200 text-gray-500 bg-gray-50'
                    }`}
                  >
                    Appointed
                  </span>
                </div>

                {/* Member Avatar with Photo Support & Upload Modal */}
                <div className="flex flex-col items-center mb-6">
                  <MemberAvatar
                    name={member.name}
                    initials={member.initials}
                    photoUrl={userPhotos[member.name]}
                    sizeClass="w-24 h-24"
                    badgeLabel="Photo Slot"
                    isDark={isDark}
                    onEditPhoto={() => onEditPhoto(member.name)}
                  />
                </div>

                {/* Position Title & Member Name */}
                <div className="text-center space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#9F1239] block">
                    {member.position}
                  </span>
                  <h3
                    className={`text-xl font-bold font-display leading-tight group-hover:text-[#9F1239] transition-colors ${
                      isDark ? 'text-white' : 'text-[#111111]'
                    }`}
                  >
                    {member.name}
                  </h3>
                  <span className="text-[11px] text-gray-500 font-medium block">
                    {member.wing}
                  </span>
                </div>

                {/* Mandate snippet */}
                <p
                  className={`text-xs mt-4 leading-relaxed line-clamp-2 text-center ${
                    isDark ? 'text-gray-400' : 'text-[#686868]'
                  }`}
                >
                  {member.mandate}
                </p>
              </div>

              {/* Card Footer / View Docket Button */}
              <div
                className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${
                  isDark ? 'border-white/10' : 'border-[#E7E3DF]'
                }`}
              >
                <span className="text-[10px] font-mono text-gray-500 uppercase">SATURANGLE COUNCIL</span>
                <span className="font-bold text-[#9F1239] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Mandate
                  <ChevronRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Progress Bar & Position Indicator */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:max-w-md bg-gray-500/20 h-1 rounded-full overflow-hidden">
            <div
              className="bg-[#9F1239] h-full transition-all duration-150"
              style={{ width: `${Math.max(14, scrollProgress)}%` }}
            />
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
            <span>Drag horizontally or use arrow buttons</span>
            <span className="text-[#9F1239] font-bold">7 Executive Portfolios</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Creative Graphic Motifs for Departmental Wings
const TeamMotif: React.FC<{ type: TeamDepartment['motifType']; className?: string }> = ({ type, className = '' }) => {
  switch (type) {
    case 'alumni':
      return (
        <svg className={`pointer-events-none select-none ${className}`} viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="35" r="14" stroke="#9F1239" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />
          <path d="M52 35 L80 20 L108 35 L80 50 Z" stroke="#9F1239" strokeWidth="1.5" opacity="0.5" />
          <path d="M98 42 V58 C98 58 90 64 80 64 C70 64 62 58 62 58 V42" stroke="#9F1239" strokeWidth="1.3" opacity="0.4" />
          <circle cx="36" cy="78" r="4" fill="#9F1239" opacity="0.35" />
          <circle cx="124" cy="78" r="4" fill="#9F1239" opacity="0.35" />
          <circle cx="80" cy="88" r="4" fill="#9F1239" opacity="0.35" />
          <line x1="62" y1="58" x2="36" y2="78" stroke="#9F1239" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
          <line x1="98" y1="58" x2="124" y2="78" stroke="#9F1239" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
          <line x1="80" y1="64" x2="80" y2="88" stroke="#9F1239" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
        </svg>
      );
    case 'events':
      return (
        <svg className={`pointer-events-none select-none ${className}`} viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="35" y="20" width="90" height="60" rx="3" stroke="#9F1239" strokeWidth="1.2" opacity="0.3" />
          <line x1="35" y1="36" x2="125" y2="36" stroke="#9F1239" strokeWidth="1.2" opacity="0.4" />
          <line x1="65" y1="36" x2="65" y2="80" stroke="#9F1239" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.25" />
          <line x1="95" y1="36" x2="95" y2="80" stroke="#9F1239" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.25" />
          <path d="M16 35 C10 44 10 56 16 65" stroke="#9F1239" strokeWidth="1.5" opacity="0.35" />
          <path d="M144 35 C150 44 150 56 144 65" stroke="#9F1239" strokeWidth="1.5" opacity="0.35" />
          <path d="M22 42 C18 47 18 53 22 58" stroke="#9F1239" strokeWidth="1.2" opacity="0.25" />
          <path d="M138 42 C142 47 142 53 138 58" stroke="#9F1239" strokeWidth="1.2" opacity="0.25" />
        </svg>
      );
    case 'design':
      return (
        <svg className={`pointer-events-none select-none ${className}`} viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 75 C45 15 105 85 138 25" stroke="#9F1239" strokeWidth="1.5" opacity="0.4" />
          <circle cx="20" cy="75" r="3.5" fill="#9F1239" opacity="0.5" />
          <circle cx="138" cy="25" r="3.5" fill="#9F1239" opacity="0.5" />
          <circle cx="80" cy="50" r="20" stroke="#9F1239" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <line x1="80" y1="15" x2="80" y2="85" stroke="#9F1239" strokeWidth="0.8" opacity="0.2" />
          <line x1="45" y1="50" x2="115" y2="50" stroke="#9F1239" strokeWidth="0.8" opacity="0.2" />
          <rect x="74" y="44" width="12" height="12" stroke="#9F1239" strokeWidth="1.2" opacity="0.35" />
        </svg>
      );
    case 'tech':
      return (
        <svg className={`pointer-events-none select-none ${className}`} viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 50 L48 50 L62 26 L98 26 L112 50 L135 50" stroke="#9F1239" strokeWidth="1.3" opacity="0.35" />
          <path d="M48 50 L62 74 L98 74 L112 50" stroke="#9F1239" strokeWidth="1.3" opacity="0.35" />
          <circle cx="25" cy="50" r="3.5" fill="#9F1239" opacity="0.45" />
          <circle cx="135" cy="50" r="3.5" fill="#9F1239" opacity="0.45" />
          <circle cx="80" cy="26" r="3" fill="#9F1239" opacity="0.45" />
          <circle cx="80" cy="74" r="3" fill="#9F1239" opacity="0.45" />
          <text x="80" y="54" textAnchor="middle" fill="#9F1239" fontSize="12" fontFamily="monospace" fontWeight="bold" opacity="0.45">&lt; / &gt;</text>
        </svg>
      );
    case 'content':
      return (
        <svg className={`pointer-events-none select-none ${className}`} viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="42" y="16" width="76" height="68" rx="2" stroke="#9F1239" strokeWidth="1.2" opacity="0.3" />
          <line x1="56" y1="32" x2="104" y2="32" stroke="#9F1239" strokeWidth="1.2" opacity="0.35" />
          <line x1="56" y1="44" x2="104" y2="44" stroke="#9F1239" strokeWidth="1.2" opacity="0.35" />
          <line x1="56" y1="56" x2="94" y2="56" stroke="#9F1239" strokeWidth="1.2" opacity="0.35" />
          <line x1="56" y1="68" x2="82" y2="68" stroke="#9F1239" strokeWidth="1.2" opacity="0.35" />
          <text x="122" y="38" fill="#9F1239" fontSize="24" fontFamily="Georgia, serif" fontWeight="bold" opacity="0.35">&ldquo;</text>
        </svg>
      );
    case 'pr':
      return (
        <svg className={`pointer-events-none select-none ${className}`} viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="50" r="14" stroke="#9F1239" strokeWidth="1.2" opacity="0.25" />
          <circle cx="80" cy="50" r="28" stroke="#9F1239" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.3" />
          <circle cx="80" cy="50" r="42" stroke="#9F1239" strokeWidth="1" strokeDasharray="2 4" opacity="0.25" />
          <circle cx="56" cy="42" r="7" fill="#9F1239" opacity="0.3" />
          <circle cx="104" cy="42" r="7" fill="#9F1239" opacity="0.3" />
          <circle cx="80" cy="65" r="8" fill="#9F1239" opacity="0.35" />
          <line x1="56" y1="42" x2="80" y2="65" stroke="#9F1239" strokeWidth="1" opacity="0.35" />
          <line x1="104" y1="42" x2="80" y2="65" stroke="#9F1239" strokeWidth="1" opacity="0.35" />
        </svg>
      );
    default:
      return null;
  }
};

// 7. OUR TEAMS SECTION — 6 SPECIALIZED OPERATIONAL WINGS OF SATURANGLE
const OurTeamsSection: React.FC<{
  isDark: boolean;
  userPhotos: Record<string, string>;
  onEditPhoto: (name: string) => void;
}> = ({ isDark, userPhotos, onEditPhoto }) => {
  const [showMoreTeams, setShowMoreTeams] = useState(false);

  const getTeamIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap size={22} className="text-[#9F1239]" />;
      case 'CalendarCheck':
        return <CalendarCheck size={22} className="text-[#9F1239]" />;
      case 'PenTool':
        return <PenTool size={22} className="text-[#9F1239]" />;
      case 'Code':
        return <Code size={22} className="text-[#9F1239]" />;
      case 'BookOpen':
        return <BookOpen size={22} className="text-[#9F1239]" />;
      case 'Users':
        return <Users size={22} className="text-[#9F1239]" />;
      default:
        return <Shield size={22} className="text-[#9F1239]" />;
    }
  };

  return (
    <section
      id="our-teams"
      className={`py-24 border-t transition-colors duration-500 relative z-20 ${
        isDark ? 'bg-[#121214] border-white/10 text-white' : 'bg-[#FAF9F6] border-[#E7E3DF] text-[#111111]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#9F1239]/20 bg-[#9F1239]/5 mb-3">
            <Users size={13} className="text-[#9F1239]" />
            <span className="text-[11px] font-bold tracking-widest text-[#9F1239] uppercase">
              Operational Divisions &bull; 6 Specialized Wings
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display">
            Our Teams
          </h2>
          <p
            className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-[#686868]'
            }`}
          >
            Explore the specialized operational divisions and student leadership powering SATURANGLE&rsquo;s intellectual assemblies, competitive tournaments, and digital presence.
          </p>
          <div className="w-16 h-1 bg-[#9F1239] mx-auto mt-6" />
        </div>

        {/* --- A. FEATURED ALUMNI TEAM (Prominently Visible Initially) --- */}
        <div className="mb-14">
          <div
            className={`border rounded-xs p-8 sm:p-10 relative overflow-hidden transition-all duration-300 shadow-md ${
              isDark
                ? 'bg-[#18181C] border-[#9F1239]/40'
                : 'bg-white border-[#9F1239]/35'
            }`}
          >
            {/* Top decorative subtle motif in corner */}
            <div className="absolute top-2 right-2 w-44 h-28 opacity-60 hidden sm:block">
              <TeamMotif type="alumni" />
            </div>

            <div className="relative z-10">
              {/* Header Badge & Title */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xs bg-[#9F1239]/10 border border-[#9F1239]/30 flex items-center justify-center">
                    {getTeamIcon(ALUMNI_TEAM.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-xs bg-[#9F1239]/10 text-[#9F1239]">
                        Featured Wing
                      </span>
                      <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                        Wing 01
                      </span>
                    </div>
                    <h3 className={`text-2xl sm:text-3xl font-bold font-display mt-0.5 ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                      {ALUMNI_TEAM.name}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#9F1239] uppercase tracking-wider hidden md:inline-block">
                  {ALUMNI_TEAM.tagline}
                </span>
              </div>

              <p className={`text-sm leading-relaxed max-w-3xl mb-8 ${isDark ? 'text-gray-300' : 'text-[#555555]'}`}>
                {ALUMNI_TEAM.description}
              </p>

              {/* Both Alumni Leaders with Equal Visual Prominence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 1. Alumni Coordinator — Nakshatra Chaudhary */}
                <div
                  className={`border rounded-xs p-6 flex flex-col sm:flex-row items-center text-center sm:text-left gap-5 transition-all duration-300 hover:shadow-lg hover:border-[#9F1239] group ${
                    isDark ? 'bg-[#1F1F24] border-white/10' : 'bg-[#FAF9F6] border-[#E7E3DF]'
                  }`}
                >
                  <MemberAvatar
                    name={ALUMNI_TEAM.head.name}
                    initials={ALUMNI_TEAM.head.initials}
                    photoUrl={userPhotos[ALUMNI_TEAM.head.name]}
                    sizeClass="w-20 h-20"
                    badgeLabel="Alumni Slot"
                    isDark={isDark}
                    onEditPhoto={() => onEditPhoto(ALUMNI_TEAM.head.name)}
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9F1239] px-2 py-0.5 bg-[#9F1239]/10 rounded-xs inline-block">
                      {ALUMNI_TEAM.head.role}
                    </span>
                    <h4 className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                      {ALUMNI_TEAM.head.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Senior Executive Lead &bull; Alumni Liaison
                    </p>
                  </div>
                </div>

                {/* 2. Deputy Alumni Coordinator — Anushka Tripathi */}
                <div
                  className={`border rounded-xs p-6 flex flex-col sm:flex-row items-center text-center sm:text-left gap-5 transition-all duration-300 hover:shadow-lg hover:border-[#9F1239] group ${
                    isDark ? 'bg-[#1F1F24] border-white/10' : 'bg-[#FAF9F6] border-[#E7E3DF]'
                  }`}
                >
                  <MemberAvatar
                    name={ALUMNI_TEAM.deputy.name}
                    initials={ALUMNI_TEAM.deputy.initials}
                    photoUrl={userPhotos[ALUMNI_TEAM.deputy.name]}
                    sizeClass="w-20 h-20"
                    badgeLabel="Alumni Slot"
                    isDark={isDark}
                    onEditPhoto={() => onEditPhoto(ALUMNI_TEAM.deputy.name)}
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9F1239] px-2 py-0.5 bg-[#9F1239]/10 rounded-xs inline-block">
                      {ALUMNI_TEAM.deputy.role}
                    </span>
                    <h4 className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                      {ALUMNI_TEAM.deputy.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Executive Associate &bull; Network Stewardship
                    </p>
                  </div>
                </div>
              </div>

              {/* Alumni Mandates */}
              <div className="pt-4 border-t border-gray-500/15">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Key Mandates &bull; Alumni Affairs:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {ALUMNI_TEAM.responsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className={`text-xs p-3 rounded-xs border flex items-start gap-2 ${
                        isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-white border-[#E7E3DF] text-[#686868]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9F1239] mt-1.5 flex-shrink-0" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Teams Toggle Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowMoreTeams(!showMoreTeams)}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md ${
              showMoreTeams
                ? isDark
                  ? 'bg-white/10 text-white border border-white/20 hover:bg-white/15'
                  : 'bg-white text-[#111111] border border-[#111111] hover:bg-gray-50'
                : 'bg-[#9F1239] text-white hover:bg-[#800E2E] shadow-[#9F1239]/25 hover:shadow-lg'
            }`}
          >
            <span>
              {showMoreTeams
                ? 'Show Fewer Teams'
                : 'More Teams (Events, Design, Technical, Content, PR)'}
            </span>
            {showMoreTeams ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <p className="text-[11px] text-gray-500 font-mono mt-2">
            {showMoreTeams
              ? 'Showing all 6 operational teams'
              : 'Click to explore the 5 additional operational divisions'}
          </p>
        </div>

        {/* --- B-F. REMAINING 5 DEPARTMENTAL TEAMS (Revealed via More Teams without duplicates) --- */}
        {showMoreTeams && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
            {DEPARTMENTAL_TEAMS.map((dept, index) => (
              <div
                key={dept.id}
                className={`border rounded-xs p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#9F1239] group ${
                  index === 4 ? 'lg:col-span-2 max-w-3xl mx-auto w-full' : ''
                } ${
                  isDark ? 'bg-[#18181C] border-white/10' : 'bg-white border-[#E7E3DF]'
                }`}
              >
                {/* Visual Motif Watermark */}
                <div className="absolute top-2 right-2 w-36 h-24 opacity-40 group-hover:opacity-75 transition-opacity pointer-events-none">
                  <TeamMotif type={dept.motifType} />
                </div>

                <div className="relative z-10">
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xs bg-[#9F1239]/10 border border-[#9F1239]/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getTeamIcon(dept.iconName)}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                      Wing 0{index + 2}
                    </span>
                  </div>

                  {/* Team Title & Tagline */}
                  <h3
                    className={`text-2xl font-bold font-display mb-1 group-hover:text-[#9F1239] transition-colors ${
                      isDark ? 'text-white' : 'text-[#111111]'
                    }`}
                  >
                    {dept.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#9F1239] uppercase tracking-wider block mb-3">
                    {dept.tagline}
                  </span>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-[#555555]'}`}>
                    {dept.description}
                  </p>

                  {/* Head & Deputy Head Cards with Consistent Formatting and Photo Slots */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Head */}
                    <div
                      className={`p-4 border rounded-xs flex items-center gap-3 transition-colors ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-[#FAF9F6] border-[#E7E3DF]'
                      }`}
                    >
                      <MemberAvatar
                        name={dept.head.name}
                        initials={dept.head.initials}
                        photoUrl={userPhotos[dept.head.name]}
                        sizeClass="w-14 h-14"
                        badgeLabel="Photo"
                        isDark={isDark}
                        onEditPhoto={() => onEditPhoto(dept.head.name)}
                      />
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#9F1239] block">
                          {dept.head.role}
                        </span>
                        <h4 className={`text-sm font-bold font-display ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                          {dept.head.name}
                        </h4>
                      </div>
                    </div>

                    {/* Deputy Head */}
                    <div
                      className={`p-4 border rounded-xs flex items-center gap-3 transition-colors ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-[#FAF9F6] border-[#E7E3DF]'
                      }`}
                    >
                      <MemberAvatar
                        name={dept.deputy.name}
                        initials={dept.deputy.initials}
                        photoUrl={userPhotos[dept.deputy.name]}
                        sizeClass="w-14 h-14"
                        badgeLabel="Photo"
                        isDark={isDark}
                        onEditPhoto={() => onEditPhoto(dept.deputy.name)}
                      />
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#9F1239] block">
                          {dept.deputy.role}
                        </span>
                        <h4 className={`text-sm font-bold font-display ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                          {dept.deputy.name}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Mandates */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-500/15">
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Key Responsibilities &amp; Operations:
                    </h5>
                    {dept.responsibilities.map((resp, rIdx) => (
                      <div
                        key={rIdx}
                        className={`text-xs flex items-start gap-2 ${
                          isDark ? 'text-gray-300' : 'text-[#686868]'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9F1239] mt-1.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div
                  className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${
                    isDark ? 'border-white/10 text-gray-400' : 'border-[#E7E3DF] text-gray-500'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-widest font-mono">
                    SATURANGLE OPERATIONS
                  </span>
                  <span className="text-xs font-semibold text-[#9F1239]">
                    Inductions Open
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// 8. GALLERY SECTION — OFFICIAL VISUAL ARCHIVES OF SATURANGLE DEBATES
export interface GalleryPhoto {
  id: number;
  title: string;
  category: string;
  date: string;
  src: string;
  caption: string;
  aspectClass: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    title: 'Opening Speeches',
    category: 'Parliamentary Debate',
    date: 'Flagship Plenary',
    src: '/src/assets/images/gallery_opening_speeches_1792598042044.jpg',
    caption: 'Student orator delivering the opening address from the rostrum during the parliamentary plenary session at the university auditorium.',
    aspectClass: 'md:col-span-2 aspect-[16/10]',
  },
  {
    id: 2,
    title: 'Bench Deliberation',
    category: 'Adjudication',
    date: 'Championship Round',
    src: '/src/assets/images/gallery_bench_deliberation_1792598043309.jpg',
    caption: 'Panel of student adjudicators cross-examining argumentation rubrics, substantive matter, and speaker scoresheets.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 3,
    title: 'Rebuttal Duels',
    category: 'Sparring Clinics',
    date: 'Weekly Circuit',
    src: '/src/assets/images/gallery_rebuttal_duels_1792598044852.jpg',
    caption: 'Spontaneous floor clash and high-energy point-of-information rebuttal during inter-faculty debate sparring.',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 4,
    title: 'Award Ceremonies',
    category: 'Valedictory',
    date: 'Annual Conclave',
    src: '/src/assets/images/gallery_award_ceremonies_1792598043851.jpg',
    caption: 'Winning delegation celebrated on stage with official trophies, gavels, and certificates of oratorical excellence.',
    aspectClass: 'md:col-span-2 aspect-[16/10]',
  },
];

const GallerySection: React.FC<{
  isDark: boolean;
  onSelectPhoto: (photo: GalleryPhoto) => void;
}> = ({ isDark, onSelectPhoto }) => (
  <section
    id="gallery"
    className={`py-24 border-t transition-colors duration-500 relative z-20 ${
      isDark ? 'bg-[#151518] border-white/10' : 'bg-white border-[#E7E3DF]'
    }`}
  >
    <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#9F1239]/20 bg-[#9F1239]/5 mb-3">
          <Camera size={13} className="text-[#9F1239]" />
          <span className="text-[11px] font-bold tracking-widest text-[#9F1239] uppercase">
            Visual Archives &bull; 4 Flagship Captures
          </span>
        </div>
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display ${
            isDark ? 'text-white' : 'text-[#111111]'
          }`}
        >
          Gallery
        </h2>
        <p
          className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-[#686868]'
          }`}
        >
          Memories, moments and milestones &mdash; captures from the debating floor, adjudication benches, and championship stages.
        </p>
        <div className="w-16 h-1 bg-[#9F1239] mx-auto mt-6" />
      </div>

      {/* Editorial Photo Collage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {GALLERY_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            onClick={() => onSelectPhoto(photo)}
            className={`group relative rounded-xs overflow-hidden border cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-[#9F1239] ${
              isDark ? 'bg-[#1A1A1E] border-white/10' : 'bg-[#FAF9F6] border-[#E7E3DF]'
            } ${photo.aspectClass}`}
          >
            <img
              src={photo.src}
              alt={photo.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Overlay for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#9F1239] text-white shadow-sm">
                {photo.category}
              </span>
              <span className="px-2 py-0.5 rounded-xs text-[10px] font-mono text-white/90 bg-black/50 backdrop-blur-xs border border-white/15">
                {photo.date}
              </span>
            </div>

            {/* Bottom Caption and Title */}
            <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl sm:text-2xl font-bold font-display group-hover:text-[#F43F5E] transition-colors">
                  {photo.title}
                </h3>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#9F1239] flex items-center justify-center transition-colors">
                  <ExternalLink size={14} className="text-white" />
                </div>
              </div>
              <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Curation Footer Bar */}
      <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-gray-500">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[#9F1239]" />
          <span>Click any photograph to view high-resolution capture and session details</span>
        </div>
      </div>
    </div>
  </section>
);

// 9. FOOTER / CONTACT SECTION (Matching Navigation links, branding & website credits)
const Footer: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <footer
    id="footer"
    className={`py-16 border-t transition-colors duration-500 relative z-20 ${
      isDark ? 'bg-[#0D0D0F] border-white/10 text-white' : 'bg-white border-[#E7E3DF] text-[#111111]'
    }`}
  >
    <div className="container mx-auto px-4 sm:px-6 md:px-10 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-500/15">
        {/* Brand & University Mark */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#111111] border border-white/15 flex flex-col items-center justify-center border-b-2 border-[#9F1239] rounded-xs shadow-sm">
              <span className="text-white font-bold text-xs tracking-widest leading-none">GLA</span>
              <span className="text-white text-[0.45rem] tracking-widest leading-none mt-1 font-semibold">UNIV</span>
            </div>
            <div>
              <span
                className={`font-bold text-2xl tracking-widest font-display block ${
                  isDark ? 'text-white' : 'text-[#111111]'
                }`}
              >
                SATURANGLE
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#888888] block">
                The Official Debate Club of GLA University, Mathura
              </span>
            </div>
          </div>

          <p className={`text-xs leading-relaxed max-w-sm ${isDark ? 'text-gray-400' : 'text-[#686868]'}`}>
            Where opinions are challenged and perspectives are refined. Fostering structured parliamentary discourse, critical inquiry, and competitive debating excellence.
          </p>

          {/* Website Credits */}
          <div className="pt-3 mt-1 border-t border-gray-500/15 max-w-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9F1239] block mb-1.5">
              Website Credits
            </span>
            <div className="space-y-1 text-xs">
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Main Website &amp; Frontend &mdash; <strong className={isDark ? 'text-white' : 'text-[#111111]'}>Anushka Tripathi</strong>
              </p>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Website Collaboration &mdash; <strong className={isDark ? 'text-white' : 'text-[#111111]'}>Nakshatra Chaudhary</strong>
              </p>
            </div>
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p><strong>Campus Address:</strong> GLA University, 17km Stone, NH-19, Mathura, UP 281406</p>
            <p><strong>Sessions:</strong> Saturdays 4:00 PM onwards &bull; Academic Block Auditorium</p>
          </div>
        </div>

        {/* Quick Links (Matching Section Order) */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#9F1239]">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`transition-colors hover:text-[#9F1239] ${
                    isDark ? 'text-gray-300' : 'text-[#555555]'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#9F1239]">
            Connect With Us
          </h4>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#686868]'}`}>
            Have inquiries regarding invitational tournament participation, motion dockets, or society inductions?
          </p>

          <div className="space-y-2 pt-1 text-xs">
            <a
              href="mailto:contact@saturangle.com"
              className="flex items-center gap-2 hover:text-[#9F1239] transition-colors"
            >
              <Mail size={14} className="text-[#9F1239]" />
              <span>contact@saturangle.com</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-4 pt-3 text-xs font-medium text-[#888888]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9F1239] transition-colors flex items-center gap-1.5"
            >
              <Instagram size={15} /> Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9F1239] transition-colors flex items-center gap-1.5"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#9F1239] transition-colors flex items-center gap-1.5"
            >
              <Twitter size={15} /> Twitter / X
            </a>
          </div>
        </div>
      </div>

      {/* Copyright & Credit Line */}
      <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#888888] gap-4">
        <p>
          &copy; 2026 Saturangle &mdash; The Official Debate Club of GLA University, Mathura. All rights reserved.
        </p>
        <p className="font-serif italic text-center md:text-right">
          Where Opinions Are Shared, Challenged &amp; Refined.
        </p>
      </div>
    </div>
  </footer>
);

// --- MODALS ---
const JoinModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    dept: 'Computer Science & Engineering',
    year: '2nd Year',
    format: 'Asian Parliamentary',
    reason: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      rollNo: '',
      dept: 'Computer Science & Engineering',
      year: '2nd Year',
      format: 'Asian Parliamentary',
      reason: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
      <div className="bg-white max-w-xl w-full border border-[#E7E3DF] shadow-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black p-1 transition-colors" aria-label="Close dialog">
          <X size={22} />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9F1239]" />
              <span className="text-[11px] font-bold tracking-widest text-[#9F1239] uppercase">Cohort Inductions</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-[#111111] mb-2">Apply to Join Saturangle</h3>
            <p className="text-xs text-[#686868] mb-6">
              Open to all students of GLA University across all semesters and engineering, management, or applied science branches.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priyanshu Sharma"
                    className="w-full px-3 py-2 border border-[#E7E3DF] text-xs focus:outline-none focus:border-[#9F1239]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">GLA Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@gla.ac.in"
                    className="w-full px-3 py-2 border border-[#E7E3DF] text-xs focus:outline-none focus:border-[#9F1239]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">Roll Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    placeholder="2215000..."
                    className="w-full px-3 py-2 border border-[#E7E3DF] text-xs focus:outline-none focus:border-[#9F1239]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">Department</label>
                  <select
                    value={formData.dept}
                    onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E3DF] text-xs bg-white focus:outline-none focus:border-[#9F1239]"
                  >
                    <option value="Computer Science & Engineering">CSE / IT</option>
                    <option value="Electronics & Communication">ECE / EE</option>
                    <option value="Mechanical & Civil">Mechanical / Civil</option>
                    <option value="Management & Commerce">BBA / MBA</option>
                    <option value="Applied Sciences">Applied Sciences</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">Year of Study</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E7E3DF] text-xs bg-white focus:outline-none focus:border-[#9F1239]"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1">Format of Interest</label>
                <select
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E7E3DF] text-xs bg-white focus:outline-none focus:border-[#9F1239]"
                >
                  <option value="Asian Parliamentary">Asian Parliamentary (3v3)</option>
                  <option value="British Parliamentary">British Parliamentary (2v2)</option>
                  <option value="Turncoat & Extempore">Turncoat &amp; Extempore</option>
                  <option value="Adjudication & Motion Research">Adjudication &amp; Motion Research</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1">Statement of Interest (Brief)</label>
                <textarea
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Share what topics excite you or what speaking skills you hope to cultivate..."
                  className="w-full px-3 py-2 border border-[#E7E3DF] text-xs focus:outline-none focus:border-[#9F1239]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-[#E7E3DF] text-xs font-semibold hover:border-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#111111] text-white text-xs font-bold tracking-wider hover:bg-[#9F1239] transition-colors flex items-center gap-2"
                >
                  <Send size={14} /> Submit Application
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-display font-bold text-[#111111] mb-2">Application Received!</h3>
            <p className="text-xs text-[#686868] max-w-md mb-6 leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Your induction docket has been recorded. Our secretariat will send
              an invite for the orientation session to <strong>{formData.email}</strong>.
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-2.5 bg-[#111111] text-white text-xs font-bold tracking-wider hover:bg-[#9F1239] transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const EventModal: React.FC<{ event: EventItem | null; onClose: () => void; onOpenJoin: () => void }> = ({
  event,
  onClose,
  onOpenJoin,
}) => {
  const [booked, setBooked] = useState(false);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
      <div className="bg-white max-w-xl w-full border border-[#E7E3DF] shadow-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black p-1 transition-colors" aria-label="Close dialog">
          <X size={22} />
        </button>

        <span className="inline-block bg-[#111111] text-white text-[10px] font-bold px-3 py-1 mb-3 uppercase tracking-wider">
          {event.category}
        </span>
        <h3 className="text-2xl md:text-3xl font-display font-bold text-[#111111] mb-2 leading-tight">{event.title}</h3>
        <p className="text-xs font-semibold text-[#9F1239] italic mb-5">{event.tagline}</p>

        <div className="grid grid-cols-2 gap-3 p-4 bg-[#FAF9F6] border border-[#E7E3DF] mb-5 text-xs text-[#686868]">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#9F1239]" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-[#9F1239]" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <MapPin size={14} className="text-[#9F1239]" />
            <span>{event.loc}</span>
          </div>
        </div>

        <div className="space-y-4 mb-6 text-xs text-[#686868]">
          <div>
            <h4 className="font-bold text-[#111111] uppercase tracking-wider mb-1">Session Overview</h4>
            <p className="leading-relaxed">{event.desc}</p>
          </div>
          <div>
            <h4 className="font-bold text-[#111111] uppercase tracking-wider mb-1">Debate Structure</h4>
            <p className="leading-relaxed">{event.format}</p>
          </div>
        </div>

        {booked ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded mb-2 flex items-center gap-3">
            <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
            <span>Your delegate RSVP has been reserved! Present your GLA student ID at registration desk.</span>
          </div>
        ) : (
          <div className="flex justify-end gap-3 pt-2 border-t border-[#E7E3DF]">
            <button
              onClick={() => {
                onClose();
                onOpenJoin();
              }}
              className="px-4 py-2 border border-[#111111] text-xs font-semibold hover:bg-black hover:text-white"
            >
              Join Club Instead
            </button>
            <button
              onClick={() => setBooked(true)}
              className="px-6 py-2 bg-[#9F1239] text-white text-xs font-bold tracking-wider hover:bg-[#800e2e] transition-colors"
            >
              Confirm RSVP ({event.seatsRemaining ?? 20} Left)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Council Member Detail Modal
const CouncilModal: React.FC<{
  member: CouncilMember | null;
  photoUrl?: string;
  onClose: () => void;
  onEditPhoto?: () => void;
}> = ({ member, photoUrl, onClose, onEditPhoto }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-white max-w-lg w-full border border-[#E7E3DF] shadow-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black p-1 transition-colors"
          aria-label="Close dialog"
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#9F1239]" />
          <span className="text-[11px] font-bold tracking-widest text-[#9F1239] uppercase">
            Council Mandate Docket
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 my-6 pt-2 pb-6 border-b border-[#E7E3DF]">
          <div
            onClick={onEditPhoto}
            className="w-24 h-24 rounded-full border-2 border-dashed border-[#9F1239] bg-[#9F1239]/10 text-[#9F1239] flex flex-col items-center justify-center flex-shrink-0 shadow-inner overflow-hidden relative cursor-pointer group"
            title="Click to change photo"
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={member.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <>
                <span className="text-2xl font-bold font-display tracking-widest">{member.initials}</span>
                <span className="text-[8px] font-mono uppercase text-gray-500 mt-1">Photo Slot</span>
              </>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[9px] font-bold uppercase">
              Edit
            </div>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9F1239] px-2 py-0.5 bg-[#9F1239]/10 rounded-xs inline-block">
              {member.wing}
            </span>
            <h3 className="text-2xl font-bold font-display text-[#111111]">{member.name}</h3>
            <p className="text-sm font-semibold text-gray-700">{member.position}</p>
            <p className="text-xs text-gray-500 font-mono">
              Status: {member.isConfirmed ? 'Appointed Leadership' : 'Designated Portfolio • Confirmation Pending'}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6 text-xs text-[#686868]">
          <div>
            <h4 className="font-bold text-[#111111] uppercase tracking-wider mb-1">
              Portfolio Responsibilities &amp; Mandate
            </h4>
            <p className="leading-relaxed">{member.mandate}</p>
          </div>

          <div className="p-4 bg-[#FAF9F6] border border-[#E7E3DF] text-xs">
            <h5 className="font-bold text-[#111111] mb-1">Session Protocols</h5>
            <p className="text-gray-600 leading-relaxed">
              Presides during weekly Saturday debate sparring rounds, motion adjudication panels, and inter-university invitational representations.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#E7E3DF]">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#111111] text-white text-xs font-bold tracking-wider hover:bg-[#9F1239] transition-colors"
          >
            Close Docket
          </button>
        </div>
      </div>
    </div>
  );
};

// Photo Lightbox Modal for Gallery Images
const PhotoLightboxModal: React.FC<{
  photo: GalleryPhoto | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}> = ({ photo, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#141416] border border-white/15 text-white rounded-xs shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E0E10]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#9F1239] text-white">
              {photo.category}
            </span>
            <span className="text-xs font-mono text-gray-400">
              {photo.date}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close photo viewer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Image Display */}
        <div className="relative flex-1 bg-black/60 flex items-center justify-center overflow-hidden min-h-[300px] max-h-[60vh]">
          <img
            src={photo.src}
            alt={photo.title}
            referrerPolicy="no-referrer"
            className="max-h-[60vh] max-w-full object-contain select-none"
          />

          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#9F1239] text-white border border-white/15 transition-all"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-[#9F1239] text-white border border-white/15 transition-all"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Caption & Metadata Footer */}
        <div className="p-6 bg-[#18181C] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-xl font-bold font-display text-white">
              {photo.title}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              {photo.caption}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <span>Official Saturangle Archives</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Photo Upload / Setting Modal for Council & Team Members
const PhotoUploadModal: React.FC<{
  isOpen: boolean;
  memberName: string;
  currentPhoto?: string;
  onClose: () => void;
  onSave: (photoUrl: string) => void;
  onRemove: () => void;
}> = ({ isOpen, memberName, currentPhoto, onClose, onSave, onRemove }) => {
  const [photoInput, setPhotoInput] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPhotoInput(currentPhoto || '');
      setPreview(currentPhoto || null);
    }
  }, [isOpen, currentPhoto]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreview(result);
        setPhotoInput(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (preview) {
      onSave(preview);
    }
    onClose();
  };

  const handleClear = () => {
    onRemove();
    setPreview(null);
    setPhotoInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white max-w-md w-full border border-[#E7E3DF] shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-black p-1 transition-colors"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Camera size={14} className="text-[#9F1239]" />
          <span className="text-[10px] font-bold tracking-widest text-[#9F1239] uppercase">
            Member Portrait
          </span>
        </div>

        <h3 className="text-xl font-bold font-display text-[#111111] mb-1">
          {memberName}
        </h3>
        <p className="text-xs text-gray-500 mb-5">
          Upload an official member portrait or supply an image link. Stored locally in your session.
        </p>

        {/* Preview circle */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#9F1239] overflow-hidden bg-gray-50 flex items-center justify-center shadow-inner relative group">
            {preview ? (
              <img
                src={preview}
                alt={memberName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-2xl font-bold font-display text-gray-400">
                {memberName.split(' ').map((n) => n[0]).join('')}
              </span>
            )}
          </div>
          {preview && (
            <span className="text-[10px] font-mono text-emerald-600 mt-2 font-semibold">
              Ready to Apply
            </span>
          )}
        </div>

        {/* Input Methods */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Option 1: Upload from Device
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xs file:border-0 file:text-xs file:font-semibold file:bg-[#9F1239]/10 file:text-[#9F1239] hover:file:bg-[#9F1239]/20 cursor-pointer w-full"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-2 text-gray-400 font-mono">or</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Option 2: Image URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/portrait.jpg"
              value={photoInput.startsWith('data:') ? '' : photoInput}
              onChange={(e) => {
                setPhotoInput(e.target.value);
                setPreview(e.target.value.trim() ? e.target.value.trim() : null);
              }}
              className="w-full px-3 py-2 border border-[#E7E3DF] text-xs focus:outline-none focus:border-[#9F1239]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E7E3DF]">
          {currentPhoto ? (
            <button
              onClick={handleClear}
              className="text-xs text-rose-600 hover:text-rose-800 font-medium"
            >
              Reset to Initials
            </button>
          ) : <div />}

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!preview}
              className={`px-5 py-2 text-xs font-bold tracking-wider transition-colors ${
                preview
                  ? 'bg-[#9F1239] text-white hover:bg-[#800E2E]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Apply Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APPLICATION EXPORT ---
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('saturangle_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedCouncilMember, setSelectedCouncilMember] = useState<CouncilMember | null>(null);

  // Custom User Photos for Club Members & Mentors with local persistence
  const [userPhotos, setUserPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('saturangle_member_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleSavePhoto = (memberName: string, photoUrl: string) => {
    setUserPhotos((prev) => {
      const next = { ...prev, [memberName]: photoUrl };
      try {
        localStorage.setItem('saturangle_member_photos', JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save photo to localStorage', e);
      }
      return next;
    });
  };

  const handleRemovePhoto = (memberName: string) => {
    setUserPhotos((prev) => {
      const next = { ...prev };
      delete next[memberName];
      try {
        localStorage.setItem('saturangle_member_photos', JSON.stringify(next));
      } catch (e) {
        console.error('Failed to remove photo from localStorage', e);
      }
      return next;
    });
  };

  const [activePhotoModal, setActivePhotoModal] = useState<{
    isOpen: boolean;
    memberName: string;
  }>({ isOpen: false, memberName: '' });

  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<GalleryPhoto | null>(null);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('saturangle_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <div className={`relative font-sans transition-colors duration-500 ${isDarkMode ? 'dark bg-[#121212] text-white' : 'bg-[#FAF9F6] text-[#111111]'}`}>
      <Header
        isDark={isDarkMode}
        onToggleTheme={toggleTheme}
        onOpenJoin={() => setIsJoinOpen(true)}
      />
      <main>
        {/* 1. Home / Hero — untouched */}
        <Hero isDark={isDarkMode} onOpenJoin={() => setIsJoinOpen(true)} />

        {/* 2. About Saturangle — untouched */}
        <AboutSection isDark={isDarkMode} />

        {/* 3. Events (Youth Parliament, Parley, Battle of Bits, Samvad) */}
        <EventsSection isDark={isDarkMode} onSelectEvent={(evt) => setSelectedEvent(evt)} />

        {/* 4. Achievements (Clean, gallery-like intentional placeholder) */}
        <AchievementsSection isDark={isDarkMode} />

        {/* 5. Our Team — Faculty Mentor */}
        <TeamSection
          isDark={isDarkMode}
          photoUrl={userPhotos[MENTOR_INFO.name]}
          onEditPhoto={(name) => setActivePhotoModal({ isOpen: true, memberName: name })}
        />

        {/* 6. Core Council (7 executive leadership portfolios) */}
        <CoreCouncilSection
          isDark={isDarkMode}
          userPhotos={userPhotos}
          onSelectMember={(member) => setSelectedCouncilMember(member)}
          onEditPhoto={(name) => setActivePhotoModal({ isOpen: true, memberName: name })}
        />

        {/* 7. Our Teams (6 Operational Wings: Alumni Team featured + 5 Departmental Teams) */}
        <OurTeamsSection
          isDark={isDarkMode}
          userPhotos={userPhotos}
          onEditPhoto={(name) => setActivePhotoModal({ isOpen: true, memberName: name })}
        />

        {/* 8. Gallery (Visual Archives with authentic debate photography) */}
        <GallerySection
          isDark={isDarkMode}
          onSelectPhoto={(photo) => setSelectedGalleryPhoto(photo)}
        />
      </main>

      {/* 9. Footer / Contact (with Website Credits) */}
      <Footer isDark={isDarkMode} />

      {/* Interactive Overlays */}
      <JoinModal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)} />
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onOpenJoin={() => setIsJoinOpen(true)}
      />
      <CouncilModal
        member={selectedCouncilMember}
        photoUrl={selectedCouncilMember ? userPhotos[selectedCouncilMember.name] : undefined}
        onClose={() => setSelectedCouncilMember(null)}
        onEditPhoto={() => {
          if (selectedCouncilMember) {
            setActivePhotoModal({ isOpen: true, memberName: selectedCouncilMember.name });
          }
        }}
      />

      {/* Photo Lightbox for Gallery */}
      <PhotoLightboxModal
        photo={selectedGalleryPhoto}
        onClose={() => setSelectedGalleryPhoto(null)}
        onPrev={() => {
          if (!selectedGalleryPhoto) return;
          const idx = GALLERY_PHOTOS.findIndex((p) => p.id === selectedGalleryPhoto.id);
          const prevIdx = (idx - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
          setSelectedGalleryPhoto(GALLERY_PHOTOS[prevIdx]);
        }}
        onNext={() => {
          if (!selectedGalleryPhoto) return;
          const idx = GALLERY_PHOTOS.findIndex((p) => p.id === selectedGalleryPhoto.id);
          const nextIdx = (idx + 1) % GALLERY_PHOTOS.length;
          setSelectedGalleryPhoto(GALLERY_PHOTOS[nextIdx]);
        }}
      />

      {/* Photo Upload & Change Modal for Team & Council Members */}
      <PhotoUploadModal
        isOpen={activePhotoModal.isOpen}
        memberName={activePhotoModal.memberName}
        currentPhoto={userPhotos[activePhotoModal.memberName]}
        onClose={() => setActivePhotoModal({ isOpen: false, memberName: '' })}
        onSave={(url) => handleSavePhoto(activePhotoModal.memberName, url)}
        onRemove={() => handleRemovePhoto(activePhotoModal.memberName)}
      />
    </div>
  );
}
