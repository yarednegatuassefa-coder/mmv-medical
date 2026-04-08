import { AppSidebar } from '@/components/layout/app-sidebar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <AppSidebar user={{
        email:    'yarednegatuassefa@gmail.com',
        fullName: 'Yared',
        role:     'admin',
      }} />
      <main className="flex-1 ml-[220px] min-h-screen">
        {children}
      </main>
    </div>
  )
}
