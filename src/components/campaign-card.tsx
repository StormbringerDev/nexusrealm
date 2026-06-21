'use client';

import Link from 'next/link';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { CampaignFormData } from '@/lib/types/campaign';

export function DashboardCampaignCard({ campaigns }: { campaigns: CampaignFormData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href="/gameplay/campaign">Active Campaigns</Link>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
