import { readSection } from '@/lib/content'

export default function NotFound() {
  return <div dangerouslySetInnerHTML={{ __html: readSection('not-found') }} />
}
