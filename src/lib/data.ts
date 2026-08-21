export type Project = {
  slug: string
  name: string
  oneLine: string
  description: string
  tags: string[]
  plate: string
  url: string
  featured?: boolean
}

export const AUTHOR_NAME = 'Agus Irawan'
export const AUTHOR_ROLE = 'Full-Stack Developer & AI Enthusiast'
export const AUTHOR_TAGLINE = 'I build modern web applications, practical AI systems, and interactive digital experiences.'
export const GITHUB_USER = 'kusanaligirl-lgtm'
export const GITHUB_URL = 'https://github.com/kusanaligirl-lgtm'
export const EMAIL_ADDRESS = 'kusanaligirl@gmail.com'

export const projects: Project[] = [
  {
    slug: 'aritmahub',
    name: 'AritmaHub (Web Deret)',
    oneLine: 'Smart series calculator with a neobrutalist face.',
    description:
      'Arithmetic, geometric, and power series computed instantly behind a chunky, playful interface that makes math feel like a game.',
    tags: ['JS', 'HTML/CSS', 'Neobrutalism'],
    plate: '/assets/projects/aritmahub.png',
    url: 'https://github.com/kusanaligirl-lgtm/AritmaHub',
    featured: true,
  },
  {
    slug: 'app_trading',
    name: 'AI Algo-Trading Engine',
    oneLine: 'Automated ML trading system with real-time risk analytics.',
    description:
      'High-performance algorithmic trading bot powered by XGBoost, LightGBM, and PyTorch models with backtesting, MetaTrader5 integration, and an LLM coach.',
    tags: ['Python', 'Machine Learning', 'PyTorch', 'FastAPI', 'XGBoost'],
    plate: '/assets/projects/trading.png',
    url: 'https://github.com/kusanaligirl-lgtm/app_trading',
    featured: true,
  },
  {
    slug: 'web-ukm',
    name: 'UKM MP POLNEP Portal',
    oneLine: 'Interactive web platform for university organization.',
    description:
      'Modern web portal for UKM Modeling & Photography POLNEP featuring animated typography, interactive portfolio gallery, and service booking.',
    tags: ['React', 'TailwindCSS', 'Vite', 'Frontend'],
    plate: '/assets/projects/ukm.webp',
    url: 'https://github.com/kusanaligirl-lgtm/web-ukm',
  },
  {
    slug: 'reminder-bot',
    name: 'reminder-bot',
    oneLine: 'A Telegram bot that actually reminds you.',
    description:
      'Type /remind 30m drink water and the bot pings you on time. Relative and specific times, lists, cancel — with auto-saved data.',
    tags: ['Python', 'pyTelegramBotAPI', 'Bot'],
    plate: '/assets/projects/reminder-bot.webp',
    url: 'https://github.com/kusanaligirl-lgtm/reminder-bot',
  },
  {
    slug: 'expense-tracker',
    name: 'Expense-Tracker',
    oneLine: 'Money Tracker — daily spending, charted monthly.',
    description:
      'Track daily expenses with categories and date filters, then watch the monthly trend grow with Chart.js. No framework, no fuss.',
    tags: ['Vanilla JS', 'Chart.js', 'localStorage'],
    plate: '/assets/projects/expense.png',
    url: 'https://github.com/kusanaligirl-lgtm/Expense-Tracker',
  },
  {
    slug: 'invoice-generator',
    name: 'invoice-generator',
    oneLine: 'Invoices from your browser, exported to PDF.',
    description:
      'Build an invoice, preview it in real time, and export a clean PDF with jsPDF. History stays in localStorage.',
    tags: ['Vanilla JS', 'jsPDF', 'HTML/CSS'],
    plate: '/assets/projects/invoice.png',
    url: 'https://github.com/kusanaligirl-lgtm/invoice-generator',
  },
]

export type SkillBlock = {
  icon: 'terminal' | 'cloud' | 'flask'
  title: string
  blurb: string
  chips: string[]
}

export const skillBlocks: SkillBlock[] = [
  {
    icon: 'terminal',
    title: 'Frontend',
    blurb: 'Interfaces built from scratch — from vanilla to component-driven apps.',
    chips: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind', 'Bun'],
  },
  {
    icon: 'cloud',
    title: 'Backend & Cloud',
    blurb: 'Servers, APIs, and deployments that keep the fun stuff online.',
    chips: ['Python', 'Flask', 'SQL', 'Docker', 'REST APIs'],
  },
  {
    icon: 'flask',
    title: 'AI & Experiments',
    blurb: 'Vibe coding with models, sensors, and bots in the wild.',
    chips: ['YOLO', 'Prompting', 'Telegram Bots', 'Chart.js', 'vibe coding'],
  },
]

export type Stats = {
  label: string
  value: string
}

export const stats: Stats[] = [
  { label: 'public repos', value: '11' },
  { label: 'tech stack', value: '3+' },
  { label: 'AI projects', value: '4' },
  { label: 'cups of coffee', value: '∞' },
]

export const navItems = [
  { href: '#about', label: 'about' },
  { href: '#projects', label: 'projects' },
  { href: '#skills', label: 'skills' },
  { href: '#guestbook', label: 'guestbook' },
  { href: '#contact', label: 'contact' },
]