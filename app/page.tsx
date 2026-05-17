import { readSection } from '@/lib/content'

// Homepage. Title/description/canonical inherit the layout defaults.
export default function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('home') }} />
}
