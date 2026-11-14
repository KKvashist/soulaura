import { useEffect } from 'react'
import type { SoulEvent } from '../types'
import { useEnquiry } from '../ctx'

// Event "Apply" buttons now open the shared enquiry form, which saves to Google Sheets.
export default function EventApplicationModal({ event, onClose }: { event: SoulEvent | null; onClose: () => void }) {
  const { open } = useEnquiry()
  useEffect(() => {
    if (event) { open('Event: ' + event.title); onClose() }
  }, [event]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}
