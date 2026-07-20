import {
  Book,
  Calendar,
  Dice5,
  Flag,
  Gavel,
  House,
  MapIcon,
  MapPin,
  MapPinned,
  Notebook,
  Sword,
  Swords,
  User,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    title: 'Core',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: House,
      },
      {
        title: 'Characters',
        url: '/character',
        icon: User,
      },
      {
        title: 'Party Manager',
        url: '/party',
        icon: Sword,
      },
    ],
  },
  {
    title: 'World & Lore',
    items: [
      {
        title: 'Wiki',
        url: '/world/wiki',
        icon: Book,
      },
      {
        title: 'Locations',
        url: '/world/locations',
        icon: MapPin,
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
        url: '/world/timelines',
        icon: Calendar,
      },
    ],
  },
  {
    title: 'Gameplay',
    items: [
      {
        title: 'Dice Roller',
        url: '/gameplay/dice',
        icon: Dice5,
      },
      {
        title: 'Encounter Builder',
        url: '/gameplay/encounters',
        icon: Swords,
      },
      {
        title: 'Campaign Manager',
        url: '/gameplay/campaigns',
        icon: MapPinned,
      },
      {
        title: 'Session Notes',
        url: '/gameplay/notes',
        icon: Notebook,
      },
      {
        title: 'Maps',
        url: '/gameplay/maps',
        icon: MapIcon,
      },
      {
        title: 'Rules Compendium',
        url: '/gameplay/compendium',
        icon: Gavel,
      },
    ],
  },
];
