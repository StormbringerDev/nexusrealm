'use client';

import { useEffect, useState } from 'react';
import { ChevronsUpDown, LogIn, LogOut, Plus } from 'lucide-react';
import { redirect } from 'next/navigation';

import { signOutAction } from '@/app/actions/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { User } from '@/lib/auth';
import { iconize } from '@/lib/utils/format';

export function NavUser({ user }: { user?: User | undefined }) {
  const { isMobile } = useSidebar();
  const [name, setName] = useState('Not logged in');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState('Login or create an account');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setImage(user.image as string | undefined);
      setEmail(user.email);
    }
  }, [name, image, email]);

  function handleLoginClick() {
    redirect('/login');
  }

  function handleSignupClick() {
    redirect('/signup');
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback className="rounded-lg">{iconize(name)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-2-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={image} alt={name} />
                  <AvatarFallback className="rounded-lg">
                    {user ? iconize(name) : 'NR'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user ? (
              <DropdownMenuItem onClick={signOutAction}>
                <LogOut />
                Log Out
              </DropdownMenuItem>
            ) : (
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLoginClick}>
                  <LogIn />
                  Log In
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignupClick}>
                  <Plus />
                  Sign Up
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
