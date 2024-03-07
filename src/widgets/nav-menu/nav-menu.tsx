'use client';

import { PhylumSearchInput } from '@/features/select-metagenome-map';
import { Routes } from '@/shared/routes';
import { UINavLink, UINavMenu, UINavMenuItem } from '@/shared/ui';
import { usePathname } from 'next/navigation';

export function NavMenu() {
  const currentPath = usePathname();

  return (
    <UINavMenu>
      <UINavMenuItem>
        <UINavLink href={Routes.MAP} isActive={Routes.MAP === currentPath}>
          Карта
        </UINavLink>
      </UINavMenuItem>
      <UINavMenuItem>
        <UINavLink
          href={Routes.AREAS}
          isActive={
            Routes.AREAS === currentPath ||
            currentPath?.startsWith(Routes.AREAS)
          }
        >
          Зоны
        </UINavLink>
      </UINavMenuItem>
    </UINavMenu>
  );
}
