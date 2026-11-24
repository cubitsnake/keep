import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LucideUser,
  LucideSettings,
  LucideLogOut,
} from "lucide-react";

import { auth, signOut } from "@/auth";

import SignInButton from '@/components/app/signin';

export default async function Auth() {
  const session = await auth()

  return (
    <>
      {
        !session ? (
          <SignInButton />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger
              nativeButton={false}
              className="cursor-pointer"
              render={<div className="avatar" style={{ backgroundImage: `url(${session?.user?.photo ?? '/pfimg.svg'})` }} />}
            />
            <DropdownMenuContent className="w-38" align="end" sideOffset={10}>
              <DropdownMenuLabel className="cursor-default">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  disabled={!session?.user?.username}
                  render={<Link href={`/user/${session?.user?.username ?? ''}`} className="cursor-pointer" />}
                >
                  <LucideUser />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={<Link href="/settings/profile" className="cursor-pointer" />}
                >
                  <LucideSettings />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <form
                  action={async () => {
                    "use server"
                    await signOut()
                  }}
                >
                  <Button 
                    type="submit" 
                    variant="ghost"
                    className="p-0 has-[>svg]:px-0 w-full h-auto flex justify-start items-center gap-2"
                  >
                    <LucideLogOut />
                    Sign Out
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    </>
  );
}
