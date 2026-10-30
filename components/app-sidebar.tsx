"use client";

import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

interface NavSection {
  title: string;
  items: NavItem[];
}

interface NavItem {
  title: string;
  url: string;
}

const navItems: NavSection[] = [
  {
    title: "Core",
    items: [
      { title: "Characters", url: "/nexus/character" },
      { title: "Campaigns", url: "/nexus/campaigns" },
    ],
  },
  {
    title: "World",
    items: [{ title: "Wiki", url: "/nexus/wiki" }],
  },
  {
    title: "Creation",
    items: [
      { title: "Homebrew", url: "/nexus/homebrew" },
      { title: "Generators", url: "/nexus/generators" },
    ],
  },
  {
    title: "Gameplay",
    items: [
      { title: "Rules", url: "/nexus/rules" },
      { title: "Dice", url: "/nexus/dice" },
      { title: "Initiative", url: "/nexus/initiative" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/nexus">
                <h1 className="text-2xl font-medium">NexusRealm</h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <Collapsible
                key={item.title}
                defaultOpen={item.items
                  .map((item) => item.url)
                  .includes(pathname)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === item.url}
                            >
                              <Link href={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
