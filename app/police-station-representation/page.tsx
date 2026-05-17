import type { Metadata } from 'next'
import { readSection } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Police Station Representation',
  description:
    'Criminal defence barrister representation at the police station in London, before the interview begins. Available 24 hours — call 07922 247 999.',
  alternates: { canonical: '/police-station-representation' },
}

export default function PoliceStationPage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('police-station') }} />
}
