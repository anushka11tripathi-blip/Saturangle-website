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
  Sun,
  Moon,
  Mic,
  Shield,
  Layers,
  Flame,
  Volume2,
  VolumeX,
  Compass
} from 'lucide-react';

// --- DATA STRUCTURES ---
interface EventItem {
  id: number;
  type: string;
  title: string;
  date: string;
  time: string;
  loc: string;
  active: boolean;
  tagline: string;
  desc: string;
  format: string;
  seatsRemaining: number;
}

interface Achievement {
  year: string;
  title: string;
  org: string;
  desc: string;
}

interface Member {
  name: string;
  role: string;
  tag: string;
  img: string;
  bio: string;
  dept: string;
}

interface CouncilMember {
  name: string;
  designation: string;
  mandate: string;
  badge: string;
  img: string;
  quote: string;
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  caption: string;
  img: string;
  spanClass: string;
}

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Sparring Arena', href: '#sparring-arena' },
  { name: 'Events', href: '#events' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Our Team', href: '#team' },
  { name: 'Core Council', href: '#core-council' },
  { name: 'Gallery', href: '#gallery' },
];

const EVENTS_DATA: EventItem[] = [
  {
    id: 1,
    type: 'Parliamentary Debate',
    title: 'The Fallacy of Free Will',
    date: 'Oct 24, 2026',
    time: '2:30 PM – 5:45 PM',
    loc: 'Auditorium Block A, GLA Campus',
    active: true,
    tagline: 'Determinism, Moral Accountability, and Artificial Decision-making in Modern Law',
    desc: 'Our flagship inter-departmental parliamentary showdown dissecting whether human autonomy is an empirical reality or an evolutionary illusion.',
    format: '3v3 Asian Parliamentary format (7-min constructive speeches, POIs active from min 1 to 6).',
    seatsRemaining: 18,
  },
  {
    id: 2,
    type: 'Masterclass Workshop',
    title: 'Rhetoric & Rebuttal Techniques',
    date: 'Nov 02, 2026',
    time: '3:30 PM – 6:00 PM',
    loc: 'Seminar Hall 3, Central Wing',
    active: false,
    tagline: 'Deconstructing Sophistry, Toulmin Argumentation & High-Pressure Cross-Examination',
    desc: 'An intensive masterclass taught by national circuit adjudicators on detecting logical fallacies in real-time and executing surgically precise rebuttals.',
    format: 'Interactive lecture followed by live 60-second turncoat rapid drills with instant feedback.',
    seatsRemaining: 32,
  },
  {
    id: 3,
    type: 'Open Floor Dialogue',
    title: 'Perspectives: Unplugged',
    date: 'Nov 15, 2026',
    time: '4:00 PM – 6:30 PM',
    loc: 'Student Central Amphitheatre',
    active: false,
    tagline: 'Unfiltered, Student-Led Discourse on Contemporary Culture & Society',
    desc: 'An informal town-hall style gathering where motions are proposed live by the audience and debated spontaneously without pre-prepared briefs.',
    format: 'Town-hall moderation with open floor microphones and 3-minute rotational speaking rounds.',
    seatsRemaining: 45,
  },
];

const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    year: '2025',
    title: 'National Parliamentary Debate Champions',
    org: 'Debate Council of India',
    desc: 'Secured first place among 120 participating universities in the prestigious National Inter-Collegiate Parliamentary Championship.',
  },
  {
    year: '2025',
    title: 'Best Adjudicator Award',
    org: 'Asian Debate Summit',
    desc: 'Awarded to our senior council member for exceptional objectivity, feedback clarity, and speaker scoring rigor.',
  },
  {
    year: '2024',
    title: 'Runners Up - Model UN',
    org: 'Global Youth Forum',
    desc: 'Outstanding delegation award in the simulated UN Security Council crisis committee after 18 hours of round-the-clock diplomacy.',
  },
  {
    year: '2024',
    title: 'Best Orator - State Level',
    org: 'Inter-University LitFest',
    desc: 'Highest cumulative individual speaker points secured by our club president against 80+ regional competitors.',
  },
];

const TEAM_MEMBERS: Member[] = [
  {
    name: 'Aarav Sharma',
    role: 'Parliamentary Debate Lead',
    tag: 'Lead Speaker',
    dept: 'Computer Science, Final Year',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    bio: '14+ national podium finishes in 3v3 Asian Parliamentary formats. Trains novices on matter loading and rebuttal speed.',
  },
  {
    name: 'Ananya Deshmukh',
    role: 'Rhetoric & Research Lead',
    tag: 'Motion Curator',
    dept: 'Electronics & Comm., 3rd Year',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    bio: 'Curates weekly debate dossiers on international law, technology ethics, and constitutional jurisprudence.',
  },
  {
    name: 'Rohan Verma',
    role: 'Turncoat & Extempore Lead',
    tag: 'Rapid Rebuttal',
    dept: 'Mechanical Engg., Final Year',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    bio: 'Specialist in impromptu framing and spontaneous perspective shifts under high-pressure debate bells.',
  },
  {
    name: 'Ishita Kapoor',
    role: 'Adjudication & Training Head',
    tag: 'Certified Adjudicator',
    dept: 'Management (BBA), 3rd Year',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    bio: 'Standardizes adjudication rubrics, speaker score weighting, and constructive feedback across weekly sessions.',
  },
];

const CORE_COUNCIL_MEMBERS: CouncilMember[] = [
  {
    name: 'Devansh Tandon',
    designation: 'President',
    mandate: 'Executive governance, inter-university delegations & institutional policy',
    badge: 'Executive Board',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
    quote: '“True debate is not about triumphing over a rival; it is about refining the search for truth together.”',
  },
  {
    name: 'Suhani Mathur',
    designation: 'Vice President',
    mandate: 'Academic curriculum, speaker training & national circuit tournament teams',
    badge: 'Executive Board',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
    quote: '“When you dismantle your own prejudice with logic, you unlock genuine intellectual freedom.”',
  },
  {
    name: 'Pranav Joshi',
    designation: 'General Secretary',
    mandate: 'Administration, motion room logistics & parliamentary minutes',
    badge: 'Secretariat',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    quote: '“Precision in language breeds unstoppable clarity in thought.”',
  },
  {
    name: 'Ritika Sen',
    designation: 'Treasurer & Operations',
    mandate: 'Fiscal budgeting, tournament sponsorships & operational infrastructure',
    badge: 'Finance & Ops',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    quote: '“Operational rigor fuels intellectual ambition on the national stage.”',
  },
  {
    name: 'Aditya Khurana',
    designation: 'Head of Adjudication',
    mandate: 'Fair adjudication standards, tournament judges pool & rulebooks',
    badge: 'Adjudication',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    quote: '“Impartiality and analytical depth form the bedrock of honorable contest.”',
  },
];

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 1,
    title: 'Annual Debate Championship Final',
    category: 'National Circuit',
    caption: 'Teams locking horns on constitutional ethics under simulated parliamentary pressure.',
    img: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&q=80&w=1200',
    spanClass: 'col-span-2 md:col-span-2 aspect-video',
  },
  {
    id: 2,
    title: 'Rhetoric & Rebuttal Workshop',
    category: 'Masterclass',
    caption: 'Senior adjudicators deconstructing fallacies and framing rebuttal architectures.',
    img: 'https://images.unsplash.com/photo-1475721025505-c31ebfa9b11c?auto=format&fit=crop&q=80&w=800',
    spanClass: 'col-span-2 md:col-span-1 aspect-square md:aspect-auto',
  },
  {
    id: 3,
    title: 'Speaker on Stage',
    category: 'Intra-GLA',
    caption: 'Orator commanding the floor during the final 60-second summary speech.',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800',
    spanClass: 'aspect-square',
  },
  {
    id: 4,
    title: 'Audience Cross-Examination',
    category: 'Campus Town Hall',
    caption: 'Students pressing panelists with sharp Points of Information from the gallery.',
    img: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800',
    spanClass: 'aspect-square',
  },
  {
    id: 5,
    title: 'Award Ceremony & Honors',
    category: 'Championship',
    caption: 'GLA delegation receiving the Overall Best Delegation Trophy at the Inter-University Summit.',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    spanClass: 'col-span-2 md:col-span-1 aspect-square',
  },
];

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
  baseCameraZ: number = 21.8;
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
  titleDividerMesh?: THREE.Mesh;

  // Spotlights & Fixtures
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

  // Stage Actors
  charFor?: {
    root: THREE.Group;
    armR: THREE.Group;
    armL: THREE.Group;
    head: THREE.Mesh;
    torso: THREE.Mesh;
  };
  charAgainst?: {
    root: THREE.Group;
    armR: THREE.Group;
    armL: THREE.Group;
    head: THREE.Mesh;
    torso: THREE.Mesh;
  };
  tableGroup?: THREE.Group;
  ballMesh?: THREE.Mesh;
  ballLight?: THREE.PointLight;

  constructor(container: HTMLElement, isDark: boolean = false) {
    this.container = container;
    this.isDark = isDark;
    this.scene = new THREE.Scene();

    const bgCol = isDark ? '#121212' : '#FAF9F6';
    this.scene.background = new THREE.Color(bgCol);
    this.scene.fog = new THREE.FogExp2(bgCol, isDark ? 0.016 : 0.012);

    const aspect = (this.container.clientWidth || window.innerWidth) / (this.container.clientHeight || window.innerHeight);
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    this.cameraTarget = new THREE.Vector3(0, 1.8, 0);
    this.updateCameraPosition();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = isDark ? 1.25 : 1.1;
    this.container.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2(0, 0);
    this.targetMouse = new THREE.Vector2(0, 0);
    this.scrollPos = 0;
    this.targetScroll = 0;

    // Groups - Lower the stageGroup down slightly (y = -0.9) to provide generous breathing room below title
    this.stageGroup = new THREE.Group();
    this.stageGroup.position.set(0, -0.9, 0);
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
    this.initTable();
    this.initCharacters();
    this.initBall();
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
      // Mobile framing: step back to ensure complete stage, table, and debaters fit without clipping
      this.baseCameraZ = 30.5;
      this.baseCameraY = 6.2;
    } else if (w < 1024) {
      // Tablet framing
      this.baseCameraZ = 25.5;
      this.baseCameraY = 5.6;
    } else {
      // Desktop / Laptop framing
      this.baseCameraZ = 21.8;
      this.baseCameraY = 5.1;
    }
    this.camera.position.set(0, this.baseCameraY, this.baseCameraZ);
  }

  initEnvironment() {
    const floorGeo = new THREE.PlaneGeometry(160, 160);
    const floorMat = new THREE.MeshStandardMaterial({
      color: this.isDark ? '#101010' : '#FAF9F6',
      roughness: 0.95,
      metalness: 0.05,
    });
    this.floorMesh = new THREE.Mesh(floorGeo, floorMat);
    this.floorMesh.rotation.x = -Math.PI / 2;
    this.floorMesh.position.y = -0.95;
    this.floorMesh.receiveShadow = true;
    this.scene.add(this.floorMesh);

    this.ambientLight = new THREE.AmbientLight(this.isDark ? '#504a55' : '#ffffff', this.isDark ? 0.45 : 0.72);
    this.scene.add(this.ambientLight);

    this.keyDirLight = new THREE.DirectionalLight('#ffffff', this.isDark ? 0.35 : 0.6);
    this.keyDirLight.position.set(0, 22, 12);
    this.keyDirLight.castShadow = true;
    this.keyDirLight.shadow.mapSize.width = 2048;
    this.keyDirLight.shadow.mapSize.height = 2048;
    this.keyDirLight.shadow.camera.near = 0.5;
    this.keyDirLight.shadow.camera.far = 45;
    this.keyDirLight.shadow.camera.left = -12;
    this.keyDirLight.shadow.camera.right = 12;
    this.keyDirLight.shadow.bias = -0.0004;
    this.scene.add(this.keyDirLight);
  }

  initCircularStage() {
    // 1. Broad Outer Black Edge Platform
    const rimRadius = 9.3;
    const rimGeo = new THREE.CylinderGeometry(rimRadius, rimRadius + 0.35, 0.42, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: '#111111',
      roughness: 0.4,
      metalness: 0.25,
    });
    this.stageOuterRimMesh = new THREE.Mesh(rimGeo, rimMat);
    this.stageOuterRimMesh.position.y = 0.21;
    this.stageOuterRimMesh.receiveShadow = true;
    this.stageOuterRimMesh.castShadow = true;
    this.stageGroup.add(this.stageOuterRimMesh);

    // 2. Crimson Accent Ring
    const crimsonRingGeo = new THREE.TorusGeometry(8.95, 0.08, 16, 64);
    const crimsonRingMat = new THREE.MeshStandardMaterial({
      color: '#9F1239',
      emissive: '#9F1239',
      emissiveIntensity: 0.35,
      roughness: 0.3,
      metalness: 0.5,
    });
    this.stageCrimsonRingMesh = new THREE.Mesh(crimsonRingGeo, crimsonRingMat);
    this.stageCrimsonRingMesh.rotation.x = Math.PI / 2;
    this.stageCrimsonRingMesh.position.y = 0.44;
    this.stageCrimsonRingMesh.castShadow = true;
    this.stageGroup.add(this.stageCrimsonRingMesh);

    // 3. Inner Arena Stage Surface
    const surfaceRadius = 8.85;
    const surfaceGeo = new THREE.CylinderGeometry(surfaceRadius, surfaceRadius, 0.44, 64);
    const surfaceMat = new THREE.MeshStandardMaterial({
      color: this.isDark ? '#1C1C1E' : '#F0ECE6',
      roughness: 0.75,
      metalness: 0.1,
    });
    this.stageSurfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
    this.stageSurfaceMesh.position.y = 0.22;
    this.stageSurfaceMesh.receiveShadow = true;
    this.stageGroup.add(this.stageSurfaceMesh);

    // 4. Concentric Floor Zoning Ring
    const innerZoningGeo = new THREE.TorusGeometry(5.7, 0.025, 12, 64);
    const innerZoningMat = new THREE.MeshStandardMaterial({
      color: this.isDark ? '#9F1239' : '#888888',
      transparent: true,
      opacity: this.isDark ? 0.45 : 0.3,
      roughness: 0.5,
    });
    const innerZoning = new THREE.Mesh(innerZoningGeo, innerZoningMat);
    innerZoning.rotation.x = Math.PI / 2;
    innerZoning.position.y = 0.45;
    this.stageGroup.add(innerZoning);

    // 5. Contact Soft Shadow Disc underneath the platform
    const shadowDiscGeo = new THREE.CircleGeometry(10.2, 48);
    const shadowDiscMat = new THREE.MeshBasicMaterial({
      color: '#000000',
      transparent: true,
      opacity: this.isDark ? 0.55 : 0.22,
      depthWrite: false,
    });
    const shadowDisc = new THREE.Mesh(shadowDiscGeo, shadowDiscMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = -0.89;
    this.scene.add(shadowDisc);
  }

  initOverheadRigAndSpotlights() {
    const trussY = 14.8;
    const trussZ = 4.2;

    const pipeGeo = new THREE.CylinderGeometry(0.12, 0.12, 28, 24);
    const pipeMat = new THREE.MeshStandardMaterial({ color: '#252525', metalness: 0.8, roughness: 0.3 });
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

    const createTheatreFixture = (xPos: number, isCrimson: boolean) => {
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
        color: '#151515',
        metalness: 0.6,
        roughness: 0.35,
      });
      const housing = new THREE.Mesh(housingGeo, housingMat);
      housing.castShadow = true;
      housingGroup.add(housing);

      const bezelGeo = new THREE.TorusGeometry(0.56, 0.08, 12, 24);
      const bezel = new THREE.Mesh(bezelGeo, pipeMat);
      bezel.rotation.x = Math.PI / 2;
      bezel.position.y = -0.8;
      housingGroup.add(bezel);

      [-0.45, 0.45].forEach((offset) => {
        const flapGeo = new THREE.BoxGeometry(0.8, 0.02, 0.35);
        const flap1 = new THREE.Mesh(flapGeo, pipeMat);
        flap1.position.set(0, -0.9, offset);
        flap1.rotation.x = (offset > 0 ? 0.35 : -0.35);
        housingGroup.add(flap1);

        const flap2 = new THREE.Mesh(flapGeo, pipeMat);
        flap2.rotation.y = Math.PI / 2;
        flap2.position.set(offset, -0.9, 0);
        flap2.rotation.z = (offset > 0 ? -0.35 : 0.35);
        housingGroup.add(flap2);
      });

      const lensGeo = new THREE.CircleGeometry(0.44, 24);
      const lensMat = new THREE.MeshStandardMaterial({
        color: isCrimson ? '#9F1239' : '#FFFFFF',
        emissive: isCrimson ? '#9F1239' : '#FFFFFF',
        emissiveIntensity: 1.5,
        roughness: 0.1,
      });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.rotation.x = Math.PI / 2;
      lens.position.y = -0.78;
      housingGroup.add(lens);

      fixtureGroup.add(housingGroup);

      const targetX = isCrimson ? 4.5 : -4.5;
      housingGroup.lookAt(targetX, 1.5, 0);
      housingGroup.rotation.x += Math.PI / 2;

      return { fixtureGroup, lens, housingGroup };
    };

    // Left Spotlight (Aiming at lowered stage FOR character)
    const leftX = -7.2;
    const leftFixture = createTheatreFixture(leftX, false);
    this.lightingRigGroup.add(leftFixture.fixtureGroup);
    this.leftLensMesh = leftFixture.lens;

    this.leftSpotTarget.position.set(-4.2, 1.35, 0);
    this.leftSpotLight = new THREE.SpotLight('#FFFFFF', 480);
    this.leftSpotLight.position.set(leftX, trussY - 1.6, trussZ);
    this.leftSpotLight.target = this.leftSpotTarget;
    this.leftSpotLight.angle = Math.PI / 5.2;
    this.leftSpotLight.penumbra = 0.55;
    this.leftSpotLight.decay = 1.65;
    this.leftSpotLight.distance = 42;
    this.leftSpotLight.castShadow = true;
    this.leftSpotLight.shadow.mapSize.width = 1024;
    this.leftSpotLight.shadow.mapSize.height = 1024;
    this.leftSpotLight.shadow.bias = -0.0004;
    this.scene.add(this.leftSpotLight);

    const beamHeight = 15;
    const beamGeo = new THREE.CylinderGeometry(0.45, 3.8, beamHeight, 32, 1, true);
    beamGeo.translate(0, -beamHeight / 2, 0);
    const leftBeamMat = new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.leftBeamMesh = new THREE.Mesh(beamGeo, leftBeamMat);
    this.leftBeamMesh.position.set(leftX, trussY - 1.6, trussZ);
    this.leftBeamMesh.lookAt(-4.2, 1.35, 0);
    this.leftBeamMesh.rotation.x += Math.PI / 2;
    this.scene.add(this.leftBeamMesh);

    // Right Spotlight (Aiming at lowered stage AGAINST character)
    const rightX = 7.2;
    const rightFixture = createTheatreFixture(rightX, true);
    this.lightingRigGroup.add(rightFixture.fixtureGroup);
    this.rightLensMesh = rightFixture.lens;

    this.rightSpotTarget.position.set(4.2, 1.35, 0);
    this.rightSpotLight = new THREE.SpotLight('#9F1239', 420);
    this.rightSpotLight.position.set(rightX, trussY - 1.6, trussZ);
    this.rightSpotLight.target = this.rightSpotTarget;
    this.rightSpotLight.angle = Math.PI / 5.2;
    this.rightSpotLight.penumbra = 0.55;
    this.rightSpotLight.decay = 1.65;
    this.rightSpotLight.distance = 42;
    this.rightSpotLight.castShadow = true;
    this.rightSpotLight.shadow.mapSize.width = 1024;
    this.rightSpotLight.shadow.mapSize.height = 1024;
    this.rightSpotLight.shadow.bias = -0.0004;
    this.scene.add(this.rightSpotLight);

    const rightBeamMat = new THREE.MeshBasicMaterial({
      color: '#9F1239',
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.rightBeamMesh = new THREE.Mesh(beamGeo, rightBeamMat);
    this.rightBeamMesh.position.set(rightX, trussY - 1.6, trussZ);
    this.rightBeamMesh.lookAt(4.2, 1.35, 0);
    this.rightBeamMesh.rotation.x += Math.PI / 2;
    this.scene.add(this.rightBeamMesh);
  }

  initTable() {
    this.tableGroup = new THREE.Group();

    // Table Top (Dark Charcoal)
    const topGeo = new THREE.BoxGeometry(7, 0.15, 4);
    const topMat = new THREE.MeshStandardMaterial({ color: '#252525', roughness: 0.35, metalness: 0.2 });
    const top = new THREE.Mesh(topGeo, topMat);
    top.position.y = 2.45;
    top.castShadow = true;
    top.receiveShadow = true;
    this.tableGroup.add(top);

    // White Outer Boundary Lines
    const lineGeo = new THREE.BoxGeometry(7.04, 0.16, 4.04);
    const lineMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.2 });
    const lines = new THREE.Mesh(lineGeo, lineMat);
    lines.position.y = 2.45;
    this.tableGroup.add(lines);

    // White Center Line
    const centerLineGeo = new THREE.BoxGeometry(7.02, 0.162, 0.05);
    const centerLine = new THREE.Mesh(centerLineGeo, lineMat);
    centerLine.position.y = 2.45;
    this.tableGroup.add(centerLine);

    // Crimson Net (Wireframe translucent)
    const netGeo = new THREE.BoxGeometry(0.04, 0.46, 4.3);
    const netMat = new THREE.MeshStandardMaterial({
      color: '#9F1239',
      transparent: true,
      opacity: 0.85,
      wireframe: true,
    });
    const net = new THREE.Mesh(netGeo, netMat);
    net.position.y = 2.76;
    net.castShadow = true;
    this.tableGroup.add(net);

    // Net Posts
    const postGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6);
    const postMat = new THREE.MeshStandardMaterial({ color: '#111111', metalness: 0.7, roughness: 0.2 });
    const post1 = new THREE.Mesh(postGeo, postMat);
    post1.position.set(0, 2.7, 2.15);
    const post2 = new THREE.Mesh(postGeo, postMat);
    post2.position.set(0, 2.7, -2.15);
    this.tableGroup.add(post1, post2);

    // Metallic Table Legs anchored to stage
    const legGeo = new THREE.CylinderGeometry(0.06, 0.05, 2.05);
    const legMat = new THREE.MeshStandardMaterial({ color: '#555555', metalness: 0.8, roughness: 0.25 });
    const positions = [
      [-3.1, -1.75],
      [3.1, -1.75],
      [-3.1, 1.75],
      [3.1, 1.75],
    ];

    positions.forEach((pos) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(pos[0], 1.42, pos[1]);
      leg.castShadow = true;
      leg.receiveShadow = true;
      this.tableGroup!.add(leg);
    });

    this.stageGroup.add(this.tableGroup);
  }

  initCharacters() {
    const createMannequin = (color: string, isLeft: boolean) => {
      const group = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.25, metalness: 0.15 });

      // Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 32), mat);
      head.position.y = 4.3;
      head.castShadow = true;
      group.add(head);

      // Torso / Body Capsule
      const torsoGeo = new THREE.CapsuleGeometry(0.5, 1.2, 16, 16);
      const torso = new THREE.Mesh(torsoGeo, mat);
      torso.position.y = 2.75;
      torso.castShadow = true;
      group.add(torso);

      // Arms
      const armGeo = new THREE.CapsuleGeometry(0.12, 0.9, 8, 8);

      const leftArmGroup = new THREE.Group();
      leftArmGroup.position.set(isLeft ? 0.65 : -0.65, 3.4, 0);
      const leftArm = new THREE.Mesh(armGeo, mat);
      leftArm.position.y = -0.45;
      leftArm.castShadow = true;
      leftArmGroup.add(leftArm);
      group.add(leftArmGroup);

      const rightArmGroup = new THREE.Group();
      rightArmGroup.position.set(isLeft ? -0.65 : 0.65, 3.4, 0);
      const rightArm = new THREE.Mesh(armGeo, mat);
      rightArm.position.y = -0.45;
      rightArm.castShadow = true;
      rightArmGroup.add(rightArm);
      group.add(rightArmGroup);

      // Debate Paddle
      const paddleGroup = new THREE.Group();
      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.4),
        new THREE.MeshStandardMaterial({ color: '#252525' })
      );
      const face = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.25, 0.04),
        new THREE.MeshStandardMaterial({ color: isLeft ? '#9F1239' : '#111111' })
      );
      face.rotation.x = Math.PI / 2;
      face.position.y = 0.3;
      paddleGroup.add(handle, face);
      paddleGroup.position.y = -0.9;

      if (isLeft) {
        rightArmGroup.add(paddleGroup);
        rightArmGroup.rotation.x = -0.5;
      } else {
        leftArmGroup.add(paddleGroup);
        leftArmGroup.rotation.x = -0.5;
      }

      // 3D Dialectic Badge Plaque above character
      const badgePlaqueGeo = new THREE.BoxGeometry(1.6, 0.4, 0.08);
      const badgePlaqueMat = new THREE.MeshStandardMaterial({
        color: isLeft ? '#111111' : '#2A2A2A',
        roughness: 0.3,
        metalness: 0.4,
      });
      const badgePlaque = new THREE.Mesh(badgePlaqueGeo, badgePlaqueMat);
      badgePlaque.position.set(0, 5.2, 0);
      badgePlaque.castShadow = true;
      group.add(badgePlaque);

      // Crimson Accent Border on Badge
      const badgeAccentGeo = new THREE.BoxGeometry(1.64, 0.06, 0.09);
      const badgeAccentMat = new THREE.MeshBasicMaterial({ color: '#9F1239' });
      const badgeAccent = new THREE.Mesh(badgeAccentGeo, badgeAccentMat);
      badgeAccent.position.set(0, 5.0, 0);
      group.add(badgeAccent);

      return { root: group, armR: rightArmGroup, armL: leftArmGroup, head, torso };
    };

    // FOR Character (Left / Black Mannequin)
    this.charFor = createMannequin('#111111', true);
    this.charFor.root.position.set(-5.1, 0.2, 0);
    this.charFor.root.rotation.y = Math.PI / 6;
    this.stageGroup.add(this.charFor.root);

    // AGAINST Character (Right / Off-white Mannequin)
    this.charAgainst = createMannequin('#E5E2DC', false);
    this.charAgainst.root.position.set(5.1, 0.2, 0);
    this.charAgainst.root.rotation.y = -Math.PI / 6;
    this.stageGroup.add(this.charAgainst.root);
  }

  initBall() {
    const geo = new THREE.SphereGeometry(0.13, 32, 32);
    const mat = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      emissive: '#9F1239',
      emissiveIntensity: 0.5,
      roughness: 0.1,
    });
    this.ballMesh = new THREE.Mesh(geo, mat);
    this.ballMesh.castShadow = true;
    this.stageGroup.add(this.ballMesh);

    this.ballLight = new THREE.PointLight('#9F1239', 1.4, 4.5);
    this.stageGroup.add(this.ballLight);
  }

  init3DTitle() {
    this.titleGroup.position.set(0, 7.5, -3.2);

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
    const bgCol = isDark ? '#121212' : '#FAF9F6';
    this.scene.background = new THREE.Color(bgCol);
    if (this.scene.fog) {
      this.scene.fog.color = new THREE.Color(bgCol);
      (this.scene.fog as THREE.FogExp2).density = isDark ? 0.016 : 0.012;
    }

    if (this.floorMesh) {
      (this.floorMesh.material as THREE.MeshStandardMaterial).color.set(isDark ? '#101010' : '#FAF9F6');
    }
    if (this.stageSurfaceMesh) {
      (this.stageSurfaceMesh.material as THREE.MeshStandardMaterial).color.set(isDark ? '#1C1C1E' : '#F0ECE6');
    }
    if (this.ambientLight) {
      this.ambientLight.color.set(isDark ? '#504a55' : '#ffffff');
      this.ambientLight.intensity = isDark ? 0.45 : 0.72;
    }
    if (this.keyDirLight) {
      this.keyDirLight.intensity = isDark ? 0.35 : 0.6;
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

    // Continuous subtle revolving motion
    const stageYaw = Math.sin(time * 0.35) * 0.22;
    this.stageGroup.rotation.y = stageYaw;
    this.stageGroup.rotation.x = this.mouse.y * 0.04;

    // 4-Phase Spotlight sequence
    const cycleTime = time % 6.5;
    let leftFactor = 0;
    let rightFactor = 0;

    if (cycleTime < 2.6) {
      leftFactor = 1.0;
      rightFactor = 0.12;
    } else if (cycleTime < 3.25) {
      const t = (cycleTime - 2.6) / 0.65;
      const smooth = (1 - Math.cos(t * Math.PI)) / 2;
      leftFactor = 1.0 - smooth * 0.88;
      rightFactor = 0.12 + smooth * 0.88;
    } else if (cycleTime < 5.85) {
      leftFactor = 0.12;
      rightFactor = 1.0;
    } else {
      const t = (cycleTime - 5.85) / 0.65;
      const smooth = (1 - Math.cos(t * Math.PI)) / 2;
      leftFactor = 0.12 + smooth * 0.88;
      rightFactor = 1.0 - smooth * 0.88;
    }

    if (this.leftSpotLight) {
      this.leftSpotLight.intensity = 55 + leftFactor * 460;
    }
    if (this.rightSpotLight) {
      this.rightSpotLight.intensity = 50 + rightFactor * 420;
    }

    if (this.leftLensMesh) {
      (this.leftLensMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + leftFactor * 2.2;
    }
    if (this.rightLensMesh) {
      (this.rightLensMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + rightFactor * 2.2;
    }

    if (this.leftBeamMesh) {
      (this.leftBeamMesh.material as THREE.MeshBasicMaterial).opacity = 0.03 + leftFactor * 0.22;
    }
    if (this.rightBeamMesh) {
      (this.rightBeamMesh.material as THREE.MeshBasicMaterial).opacity = 0.04 + rightFactor * 0.24;
    }

    if (this.titleGroup) {
      this.titleGroup.position.y = 7.5 + Math.sin(time * 0.8) * 0.12;
      this.titleGroup.rotation.y = Math.sin(time * 0.3) * 0.11 + this.mouse.x * 0.1;
      this.titleGroup.rotation.x = this.mouse.y * 0.08;
    }

    const rallySpeed = 2.8;
    const pathX = Math.sin(time * rallySpeed) * 3.8;
    const pathY = 2.65 + Math.abs(Math.cos(time * rallySpeed)) * 1.85;
    const pathZ = Math.sin(time * rallySpeed * 0.4) * 1.1;

    if (this.ballMesh) {
      this.ballMesh.position.set(pathX, pathY, pathZ);
      if (this.ballLight) {
        this.ballLight.position.copy(this.ballMesh.position);
      }
    }

    if (this.charFor && this.charAgainst) {
      const swingL = Math.max(0, -pathX) * 0.35;
      const swingR = Math.max(0, pathX) * 0.35;

      this.charFor.armR.rotation.x = -0.5 - swingL * 1.5;
      this.charFor.armR.rotation.z = swingL * 0.7;
      this.charFor.head.rotation.y = pathX * 0.12;
      this.charFor.head.rotation.x = (pathY - 2.5) * 0.08;
      this.charFor.torso.rotation.y = swingL * 0.25;

      this.charAgainst.armL.rotation.x = -0.5 - swingR * 1.5;
      this.charAgainst.armL.rotation.z = -swingR * 0.7;
      this.charAgainst.head.rotation.y = pathX * 0.12;
      this.charAgainst.head.rotation.x = (pathY - 2.5) * 0.08;
      this.charAgainst.torso.rotation.y = -swingR * 0.25;
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
        { id: 'sparring-arena', name: 'Sparring Arena' },
        { id: 'events', name: 'Events' },
        { id: 'achievements', name: 'Achievements' },
        { id: 'team', name: 'Our Team' },
        { id: 'core-council', name: 'Core Council' },
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
        isDark ? 'bg-[#121212]' : 'bg-[#FAF9F6]'
      }`}
    >
      {/* 2. Hero Introduction Label — EXACT TEXT REQUIRED: "INTRODUCING THE OFFICIAL DEBATE CLUB" */}
      <div className="w-full text-center relative z-20 mb-3 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#9F1239]/35 bg-[#9F1239]/10 backdrop-blur-sm shadow-xs max-w-full">
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
          <div className="pointer-events-auto group cursor-help max-w-[210px]">
            <div className="bg-[#111111] text-white px-3.5 py-1.5 text-[11px] font-bold tracking-widest border-l-4 border-[#9F1239] shadow-xl inline-block">
              PROPOSITION • FOR
            </div>
            <div className="mt-2 text-[11px] leading-relaxed p-2.5 rounded bg-black/80 text-gray-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10">
              Under the spotlight: Proposing the motion, structuring empirical frameworks, and setting the debate burden.
            </div>
          </div>

          {/* AGAINST Indicator */}
          <div className="pointer-events-auto group cursor-help max-w-[210px] text-right">
            <div className="bg-[#111111] text-white px-3.5 py-1.5 text-[11px] font-bold tracking-widest border-r-4 border-[#9F1239] shadow-xl inline-block">
              OPPOSITION • AGAINST
            </div>
            <div className="mt-2 text-[11px] leading-relaxed p-2.5 rounded bg-black/80 text-gray-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 text-left">
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

// 4. SPARRING ARENA SECTION
const SparringArenaSection: React.FC<{ isDark: boolean; onOpenJoin: () => void }> = ({ isDark, onOpenJoin }) => {
  const [selectedFormat, setSelectedFormat] = useState('Asian Parliamentary');

  const formats = [
    {
      name: 'Asian Parliamentary (3v3)',
      team: 'Government vs Opposition',
      time: '7 mins per speech + 1 min POIs',
      focus: 'Substantive case building, rapid Points of Information, strategic whips.',
    },
    {
      name: 'British Parliamentary (2v2)',
      team: 'Opening & Closing Halves',
      time: '5 mins per speaker',
      focus: 'Extension mechanisms, nuance differentiation, and rebuttal depth.',
    },
    {
      name: 'Turncoat & Extempore',
      team: 'Individual Speakers',
      time: '60s Affirmative + 60s Negative on Bell',
      focus: 'Spontaneous mental agility and self-negation without losing composure.',
    },
  ];

  return (
    <section
      id="sparring-arena"
      className={`py-24 border-t transition-colors duration-500 ${
        isDark ? 'bg-[#141414] border-white/10' : 'bg-[#FAF9F6] border-[#E7E3DF]'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader
          isDark={isDark}
          title="The Sparring Arena"
          subtitle="Our live weekly practice grounds where collegiate debaters test motions, hone delivery, and receive rigorous adjudication."
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h3 className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-[#111111]'}`}>
              Parliamentary Formats Practiced
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-[#686868]'}`}>
              Every Saturday at 4:00 PM in Academic Block 1, debaters draw spontaneous motions and engage in full-length moderated rounds under accredited national adjudicators.
            </p>
            <div className="space-y-3 pt-2">
              {formats.map((fmt) => (
                <div
                  key={fmt.name}
                  onClick={() => setSelectedFormat(fmt.name)}
                  className={`p-4 border cursor-pointer transition-all ${
                    selectedFormat === fmt.name
                      ? 'border-[#9F1239] bg-[#9F1239]/10'
                      : isDark
                      ? 'border-white/10 bg-[#1A1A1A] hover:border-white/20'
                      : 'border-[#E7E3DF] bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#111111]'}`}>{fmt.name}</span>
                    <span className="text-[10px] font-bold text-[#9F1239] uppercase tracking-wider">{fmt.team}</span>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#686868]'}`}>{fmt.focus}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              className={`p-8 border rounded-xs ${
                isDark ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-[#E7E3DF]'
              } shadow-lg`}
            >
              <div className="flex items-center justify-between border-b pb-4 mb-6 border-gray-500/20">
                <div>
                  <span className="text-[10px] font-bold text-[#9F1239] uppercase tracking-widest block mb-1">Current Selected Format</span>
                  <h4 className={`text-2xl font-bold font-display ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                    {selectedFormat}
                  </h4>
                </div>
                <div className="w-12 h-12 bg-[#9F1239]/15 text-[#9F1239] flex items-center justify-center rounded-xs">
                  <Mic size={22} />
                </div>
              </div>

              <div className="space-y-4 text-xs leading-relaxed mb-6">
                <div>
                  <strong className={isDark ? 'text-white' : 'text-[#111111]'}>Round Timing: </strong>
                  <span className={isDark ? 'text-gray-300' : 'text-[#555555]'}>
                    {formats.find((f) => f.name === selectedFormat)?.time}
                  </span>
                </div>
                <div>
                  <strong className={isDark ? 'text-white' : 'text-[#111111]'}>Adjudication Focus: </strong>
                  <span className={isDark ? 'text-gray-300' : 'text-[#555555]'}>
                    {formats.find((f) => f.name === selectedFormat)?.focus}
                  </span>
                </div>
                <div className="p-4 bg-[#9F1239]/5 border-l-2 border-[#9F1239]">
                  <p className={`text-xs italic ${isDark ? 'text-gray-300' : 'text-[#555555]'}`}>
                    &ldquo;Debaters are evaluated by certified circuit panelists on Argument Matter (40%), Delivery Manner (40%), and Structural Strategy (20%).&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onOpenJoin}
                  className="px-6 py-3 bg-[#9F1239] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#BE123C] transition-colors"
                >
                  Join Sparring Practice
                </button>
                <a
                  href="#events"
                  className={`px-6 py-3 border text-xs font-bold uppercase tracking-wider transition-colors text-center ${
                    isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-[#111111] text-[#111111] hover:bg-black hover:text-white'
                  }`}
                >
                  View Tournament Dates
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 5. EVENTS CALENDAR SECTION
const EventsSection: React.FC<{ isDark: boolean; onSelectEvent: (event: EventItem) => void }> = ({
  isDark,
  onSelectEvent,
}) => (
  <section
    id="events"
    className={`py-24 border-t transition-colors duration-500 ${
      isDark ? 'bg-[#121212] border-white/10' : 'bg-white border-[#E7E3DF]'
    }`}
  >
    <div className="container mx-auto px-6 max-w-7xl">
      <SectionHeader
        isDark={isDark}
        title="Upcoming Events & Tournaments"
        subtitle="Mark your calendar for our flagship inter-collegiate tournaments, rhetoric workshops, and campus dialogue town halls."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENTS_DATA.map((evt) => (
          <div
            key={evt.id}
            onClick={() => onSelectEvent(evt)}
            className={`p-8 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
              evt.active
                ? 'bg-[#181818] text-white border-[#9F1239] shadow-2xl transform -translate-y-2'
                : isDark
                ? 'bg-[#1A1A1A] border-white/10 text-white hover:border-[#9F1239]'
                : 'bg-[#FAF9F6] border-[#E7E3DF] hover:border-[#9F1239] hover:shadow-md'
            }`}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#9F1239]">{evt.type}</span>
              <h3 className="text-2xl font-bold mt-4 mb-4 font-display leading-tight">{evt.title}</h3>
              <p className={`text-xs mb-6 leading-relaxed ${isDark || evt.active ? 'text-gray-300' : 'text-[#686868]'}`}>
                {evt.tagline}
              </p>
              <div className="space-y-3 mb-8">
                <div className={`flex items-center text-xs ${isDark || evt.active ? 'text-gray-300' : 'text-[#686868]'}`}>
                  <Calendar className="w-4 h-4 mr-3 text-[#9F1239]" />
                  {evt.date} • {evt.time}
                </div>
                <div className={`flex items-center text-xs ${isDark || evt.active ? 'text-gray-300' : 'text-[#686868]'}`}>
                  <MapPin className="w-4 h-4 mr-3 text-[#9F1239]" />
                  {evt.loc}
                </div>
              </div>
            </div>

            <div>
              <button
                className={`w-full font-semibold py-3.5 text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 ${
                  evt.active
                    ? 'bg-[#9F1239] hover:bg-white hover:text-[#111111] text-white'
                    : isDark
                    ? 'bg-white/10 hover:bg-[#9F1239] text-white'
                    : 'bg-[#111111] hover:bg-[#9F1239] text-white'
                }`}
              >
                {evt.active ? 'Register Now' : 'View Details & RSVP'}
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 6. ACHIEVEMENTS SECTION (HALL OF RECORDS)
const AchievementsSection: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <section
    id="achievements"
    className={`py-24 border-t transition-colors duration-500 ${
      isDark ? 'bg-[#161616] border-white/10' : 'bg-[#FAF9F6] border-[#E7E3DF]'
    }`}
  >
    <div className="container mx-auto px-6 max-w-7xl">
      <SectionHeader
        isDark={isDark}
        title="Hall of Records"
        subtitle="Recognitions and accolades achieved by our formidable debaters across the national collegiate circuit."
      />

      <div className="grid md:grid-cols-2 gap-8">
        {ACHIEVEMENTS_DATA.map((ach, i) => (
          <div
            key={i}
            className={`flex flex-col sm:flex-row gap-6 p-7 border transition-colors ${
              isDark
                ? 'bg-[#1A1A1A] border-white/10 hover:bg-[#202020]'
                : 'bg-white border-[#E7E3DF] hover:bg-[#FDFCFB]'
            }`}
          >
            <div className="sm:w-24 flex-shrink-0">
              <span className="text-4xl font-display font-bold text-[#9F1239] inline-block border-b-2 border-[#9F1239] pb-1">
                {ach.year}
              </span>
            </div>
            <div>
              <h4 className={`text-xl font-bold mb-1 leading-snug ${isDark ? 'text-white' : 'text-[#111111]'}`}>{ach.title}</h4>
              <p className="text-xs font-bold text-[#9F1239] uppercase tracking-wider mb-3">{ach.org}</p>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-[#686868]'}`}>{ach.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 7. MEET OUR TEAM SECTION
const TeamSection: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <section id="team" className={`py-24 border-t transition-colors duration-500 ${isDark ? 'bg-[#111111] text-white border-white/10' : 'bg-white text-[#111111] border-[#E7E3DF]'}`}>
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="text-center mb-16">
        <p className="text-[#9F1239] font-bold tracking-widest text-xs uppercase mb-3">The Debate Squad</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display">Meet Our Team</h2>
        <p className={`text-sm md:text-base max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-[#686868]'}`}>
          The debaters, research coordinators, and format coaches heading weekly debate training and national tournament circuit representation.
        </p>
        <div className="w-16 h-1 bg-[#9F1239] mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM_MEMBERS.map((member, i) => (
          <div
            key={i}
            className={`border transition-all p-4 flex flex-col group ${
              isDark ? 'bg-[#1A1A1A] border-white/10 hover:border-[#9F1239]' : 'bg-[#FAF9F6] border-[#E7E3DF] hover:border-[#111111]'
            }`}
          >
            <div className="relative overflow-hidden mb-4 aspect-[4/5] bg-[#252525]">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-[#111111]/85 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase border border-white/20">
                {member.tag}
              </div>
            </div>
            <h4 className="text-lg font-bold group-hover:text-[#9F1239] transition-colors mb-0.5">
              {member.name}
            </h4>
            <p className="text-[#9F1239] text-xs font-semibold tracking-wider uppercase mb-1">{member.role}</p>
            <span className={`text-[10px] uppercase tracking-wider block mb-3 ${isDark ? 'text-gray-400' : 'text-[#888888]'}`}>{member.dept}</span>
            <p className={`text-xs leading-relaxed line-clamp-2 mt-auto ${isDark ? 'text-gray-400' : 'text-[#686868]'}`}>{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 8. DEDICATED CORE COUNCIL SECTION (Strictly placed near the bottom, before Gallery & Footer)
const CoreCouncilSection: React.FC<{ isDark: boolean; onSelectCouncil: (m: CouncilMember) => void }> = ({
  isDark,
  onSelectCouncil,
}) => (
  <section
    id="core-council"
    className={`py-24 border-t transition-colors duration-500 ${
      isDark ? 'bg-[#141414] border-white/10 text-white' : 'bg-[#FAF9F6] border-[#E7E3DF] text-[#111111]'
    }`}
  >
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="text-center mb-16">
        <p className="text-[#9F1239] font-bold tracking-widest text-xs uppercase mb-3">Executive Board</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display">The Core Council</h2>
        <p className={`text-sm md:text-base max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-[#686868]'}`}>
          The senior leadership entrusted with institutional governance, adjudication ethics, tournament delegations, and strategic direction of Saturangle.
        </p>
        <div className="w-16 h-1 bg-[#9F1239] mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {CORE_COUNCIL_MEMBERS.map((member, i) => (
          <div
            key={i}
            onClick={() => onSelectCouncil(member)}
            className={`border transition-all p-6 flex flex-col group cursor-pointer ${
              isDark
                ? 'bg-[#1B1B1B] border-white/10 hover:border-[#9F1239] shadow-md'
                : 'bg-white border-[#E7E3DF] hover:border-[#9F1239] shadow-sm'
            }`}
          >
            <div className="relative overflow-hidden mb-5 aspect-[4/3] bg-[#252525]">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-[#9F1239] text-white text-[10px] font-bold px-2.5 py-0.5 tracking-wider uppercase">
                {member.badge}
              </div>
            </div>

            <h3 className="text-2xl font-bold font-display group-hover:text-[#9F1239] transition-colors mb-1">
              {member.name}
            </h3>
            <p className="text-xs font-bold tracking-widest text-[#9F1239] uppercase mb-4">
              {member.designation}
            </p>

            <blockquote className="border-l-2 border-[#9F1239] pl-3 py-1 italic text-xs mb-4 text-gray-500">
              {member.quote}
            </blockquote>

            <div className="mt-auto pt-3 border-t border-gray-500/15">
              <span className={`text-[11px] block leading-relaxed ${isDark ? 'text-gray-400' : 'text-[#686868]'}`}>
                <strong>Mandate:</strong> {member.mandate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 9. GALLERY (VISUAL ARCHIVES)
const GallerySection: React.FC<{ isDark: boolean; onSelectGallery: (item: GalleryItem) => void }> = ({
  isDark,
  onSelectGallery,
}) => (
  <section
    id="gallery"
    className={`py-24 border-t transition-colors duration-500 ${
      isDark ? 'bg-[#111111] border-white/10' : 'bg-white border-[#E7E3DF]'
    }`}
  >
    <div className="container mx-auto px-6 max-w-7xl">
      <SectionHeader
        isDark={isDark}
        title="Visual Archives"
        subtitle="Moments from the arena, championship podiums, and weekly training rounds."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {GALLERY_DATA.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectGallery(item)}
            className={`${item.spanClass} overflow-hidden image-container relative cursor-pointer border group ${
              isDark ? 'bg-[#1F1F1F] border-white/10' : 'bg-[#FAF9F6] border-[#E7E3DF]'
            }`}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover image-reveal opacity-90 group-hover:opacity-100 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#9F1239] mb-1">
                {item.category}
              </span>
              <h4 className="text-base font-display font-bold">{item.title}</h4>
              <p className="text-xs text-gray-300 mt-1">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 10. FOOTER / CONTACT SECTION
const Footer: React.FC<{ isDark: boolean }> = ({ isDark }) => (
  <footer
    id="contact"
    className={`py-14 border-t transition-colors duration-500 ${
      isDark ? 'bg-[#0E0E0E] border-white/10 text-white' : 'bg-white border-[#E7E3DF] text-[#111111]'
    }`}
  >
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div className="flex items-center space-x-3 mb-6 md:mb-0">
          <div className="w-10 h-10 border-[3px] border-[#9F1239] flex items-center justify-center bg-white">
            <div className="w-4 h-4 bg-[#111111]" />
          </div>
          <div>
            <span className={`font-bold text-2xl tracking-widest font-display block ${isDark ? 'text-white' : 'text-[#111111]'}`}>
              SATURANGLE
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#888888] block">
              GLA University Debate Society
            </span>
          </div>
        </div>

        <div className="flex space-x-6 text-sm font-medium text-[#888888]">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#9F1239] transition-colors flex items-center gap-1.5">
            <Instagram size={16} /> Instagram
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#9F1239] transition-colors flex items-center gap-1.5">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[#9F1239] transition-colors flex items-center gap-1.5">
            <Twitter size={16} /> Twitter / X
          </a>
          <a href="mailto:contact@saturangle.com" className="hover:text-[#9F1239] transition-colors flex items-center gap-1.5">
            <Mail size={16} /> Contact
          </a>
        </div>
      </div>

      <div className="border-t border-gray-500/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#888888] gap-4">
        <p>&copy; 2026 Saturangle &mdash; The Official Debate Club of GLA University, Mathura. All rights reserved.</p>
        <p className="font-serif italic">Where Opinions Are Shared, Challenged &amp; Improved.</p>
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
          {event.type}
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
              Confirm RSVP ({event.seatsRemaining} Left)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CouncilModal: React.FC<{ member: CouncilMember | null; onClose: () => void }> = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#111111] text-white max-w-md w-full border border-white/20 shadow-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-white p-1" aria-label="Close dialog">
          <X size={20} />
        </button>

        <div className="aspect-[4/3] w-full overflow-hidden mb-5 bg-[#252525]">
          <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
        </div>

        <span className="text-[10px] font-bold text-[#9F1239] uppercase tracking-widest">{member.badge}</span>
        <h3 className="text-2xl font-display font-bold mt-0.5">{member.name}</h3>
        <p className="text-xs text-gray-400 mb-4">{member.designation}</p>

        <blockquote className="border-l-2 border-[#9F1239] pl-3 py-1 italic text-xs text-gray-300 mb-4">
          {member.quote}
        </blockquote>

        <p className="text-xs text-gray-400 leading-relaxed">
          <strong>Mandate:</strong> {member.mandate}
        </p>
      </div>
    </div>
  );
};

const GalleryLightbox: React.FC<{ item: GalleryItem | null; onClose: () => void }> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative max-w-3xl w-full bg-[#111111] border border-white/10 p-4">
        <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-[#9F1239] p-2" aria-label="Close Lightbox">
          <X size={24} />
        </button>
        <img src={item.img} alt={item.title} className="w-full max-h-[65vh] object-contain mb-4" />
        <div className="text-white px-2">
          <span className="text-[10px] text-[#9F1239] font-bold uppercase tracking-widest">{item.category}</span>
          <h3 className="text-xl font-display font-bold mt-0.5">{item.title}</h3>
          <p className="text-xs text-gray-300 mt-1">{item.caption}</p>
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
  const [selectedCouncil, setSelectedCouncil] = useState<CouncilMember | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);

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
        {/* 1. Home / Hero */}
        <Hero isDark={isDarkMode} onOpenJoin={() => setIsJoinOpen(true)} />

        {/* 2. About Saturangle */}
        <AboutSection isDark={isDarkMode} />

        {/* 3. The Sparring Arena */}
        <SparringArenaSection isDark={isDarkMode} onOpenJoin={() => setIsJoinOpen(true)} />

        {/* 4. Events */}
        <EventsSection isDark={isDarkMode} onSelectEvent={(evt) => setSelectedEvent(evt)} />

        {/* 5. Achievements */}
        <AchievementsSection isDark={isDarkMode} />

        {/* 6. Meet Our Team */}
        <TeamSection isDark={isDarkMode} />

        {/* 7. Dedicated Core Council Section (Near bottom, before Gallery & Footer) */}
        <CoreCouncilSection isDark={isDarkMode} onSelectCouncil={(m) => setSelectedCouncil(m)} />

        {/* 8. Gallery */}
        <GallerySection isDark={isDarkMode} onSelectGallery={(item) => setSelectedGallery(item)} />
      </main>

      {/* 9. Footer / Contact */}
      <Footer isDark={isDarkMode} />

      {/* Interactive Overlays */}
      <JoinModal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)} />
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onOpenJoin={() => setIsJoinOpen(true)}
      />
      <CouncilModal member={selectedCouncil} onClose={() => setSelectedCouncil(null)} />
      <GalleryLightbox item={selectedGallery} onClose={() => setSelectedGallery(null)} />
    </div>
  );
}
