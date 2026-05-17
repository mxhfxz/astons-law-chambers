import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Police Station Representation',
  description:
    'Representation at the police station, before the interview begins. Available 24 hours. Call 07922 247 999.',
  alternates: { canonical: '/police-station-representation' },
}

export default function PoliceStationPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('police-station') }} />
}
