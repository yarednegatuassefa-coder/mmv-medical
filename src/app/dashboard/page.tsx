import React from 'react';
import DashboardContainer from '@/components/DashboardContainer';

// Next.js page metadata for your browser tab title
export const metadata = {
  title: 'Coordinator Dashboard | MMV Medical',
  description: 'Live patient qualification and triage command panel.',
};

export default function DashboardPage() {
  return (
    <main className="w-full min-h-screen bg-slate-950">
      
      <DashboardContainer/>
    </main>
  );
}
