"use client";

import Link from "next/link";
import { LogOut, UserCircle } from "lucide-react";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { Account } from "@/lib/interfaces/accounts/Account";

interface DesktopAccountFlyoutProps {
  account?: Account;
}

export function DesktopAccountFlyout({ account }: DesktopAccountFlyoutProps) {
  const username = account?.username ?? "Account";
  const profileInitial = username.charAt(0).toUpperCase();
  const profileImageSrc = account?.profilePath
    ? `https://cdn.studentcouncil.dk/${account.profilePath}`
    : undefined;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 rounded-full px-2 pr-3"
          aria-label="Open profile menu"
        >
          <Avatar className="size-7">
            <AvatarImage src={profileImageSrc} alt={username} />
            <AvatarFallback>{profileInitial}</AvatarFallback>
          </Avatar>
          <span className="ml-2 text-sm font-medium">{username}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3 py-1">
            <Avatar className="size-10">
              <AvatarImage src={profileImageSrc} alt={username} />
              <AvatarFallback>{profileInitial}</AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <p className="text-sm font-semibold">{username}</p>
              <p className="text-muted-foreground text-xs">{account?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="https://dashboard.studentcouncil.dk" className="cursor-pointer">
            <DashboardIcon className="size-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="https://login.studentcouncil.dk/account" className="cursor-pointer">
            <UserCircle className="size-4"/>
            Manage Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="http://login.studentcouncil.dk/logout?redirect=https://studentcouncil.dk"
            className="cursor-pointer"
          >
            <LogOut className="size-4" />
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
