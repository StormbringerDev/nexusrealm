'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { CampaignSwitcher } from '@/components/campaign-switcher'
import { NavUser } from '@/components/nav-user'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { coreItems, gameplayItems, loreItems } from '@/lib/nav'
import { User } from '@/lib/auth'

export function AppSidebar({ user }: { user?: User }) {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-bold">NexusRealm</h1>
        <CampaignSwitcher campaigns={[]} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Core</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {coreItems.map(item => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <Collapsible>
            <CollapsibleTrigger>
              <SidebarGroupLabel className="underline hover:font-bold">
                World &amp; Lore
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {loreItems.map(item => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={pathname === item.url}>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Gameplay</SidebarGroupLabel>
          <SidebarMenu>
            {gameplayItems.map(item => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild isActive={pathname === item.url}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
