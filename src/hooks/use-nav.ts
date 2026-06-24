'use client';
import type { NavGroup, NavItem } from '@/types';

/**
 * Navigation is shown in full for authenticated users. The original RBAC filtering
 * (Clerk organizations/roles) was removed during the Supabase migration; these helpers
 * are kept as pass-throughs so the sidebar and Cmd+K bar APIs stay stable.
 */
export function useFilteredNavItems(items: NavItem[]) {
  return items;
}

export function useFilteredNavGroups(groups: NavGroup[]) {
  return groups;
}
