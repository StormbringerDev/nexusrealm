'use client';

import * as React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { toTitleCase } from '@/lib/utils/format';

export function AppBreadcrumb() {
  const pathname = usePathname();
  const pathItems = pathname.split('/');
  const breadcrumbItems = [];
  let breadcrumbPage;

  for (const pathItem of pathItems) {
    if (pathname.endsWith(pathItem)) {
      breadcrumbPage = (
        <BreadcrumbItem key={pathItem}>
          <BreadcrumbPage>{toTitleCase(pathItem, '-')}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else {
      breadcrumbItems.push(
        <React.Fragment key={pathname}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={pathname}>{toTitleCase(pathItem, '-')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </React.Fragment>,
      );
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems}
        <BreadcrumbSeparator />
        {breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
