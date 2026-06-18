import {
  Book,
  ClipboardList,
  Clock,
  Dice6,
  Flag,
  Home,
  LucideIcon,
  Map,
  Notebook,
  Swords,
  User,
  Users,
} from 'lucide-react'

interface NavItem {
  title: string
  url: string
  icon: LucideIcon
}

export const coreItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Character Builder',
    url: '/character',
    icon: User,
  },
  {
    title: 'Party Manager',
    url: '/party',
    icon: Users,
  },
]

export const loreItems: NavItem[] = [
  {
    title: 'Worldbuilding Wiki',
    url: '/world/wiki',
    icon: Book,
  },
  {
    title: 'Locations',
    url: '/world/locations',
    icon: Map,
  },
  {
    title: 'NPCs',
    url: '/world/npc',
    icon: Users,
  },
  {
    title: 'Factions',
    url: '/world/factions',
    icon: Flag,
  },
  {
    title: 'Timelines & Events',
    url: '/world/events',
    icon: Clock,
  },
]

export const gameplayItems: NavItem[] = [
  {
    title: 'Dice Roller',
    url: '/gameplay/dice',
    icon: Dice6,
  },
  {
    title: 'Encounter Builder',
    url: '/gameplay/encounter',
    icon: Swords,
  },
  {
    title: 'Campaign Manager',
    url: '/gameplay/campaign',
    icon: ClipboardList,
  },
  {
    title: 'Session Notes',
    url: '/gameplay/session-notes',
    icon: Notebook,
  },
  {
    title: 'Maps',
    url: '/gameplay/maps',
    icon: Map,
  },
  {
    title: 'Compendium',
    url: '/gameplay/compendium',
    icon: Book,
  },
]
