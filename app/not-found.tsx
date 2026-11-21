import { readSection } from '@/lib/content'
import { WithCharmBar } from '@/components/sections/WithCharmBar'

export default function NotFound() {
  return <WithCharmBar html={readSection('not-found')} path="/404" />
}
