import { useEffect, useState } from 'react'

import type { SchemaType } from './stores/zustand'

import { Button } from './components/button'
import { Input } from './components/input'
import * as List from './components/list'
import * as Select from './components/select'
import { Textarea } from './components/textarea'
import releases from './data/releases.json'
import { useStore } from './stores/zustand'
import { sendEmbeds } from './utils/webhook'

const eachOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const etcToWeek = ['etc']

const higherSelections = [...eachOfWeek, ...etcToWeek].map(
  (w) => w.charAt(0).toUpperCase() + w.slice(1)
)

function SelectionPage() {
  const [selected, setSelected] = useState(0)
  const set = useStore((s) => s.setTitle)

  return (
    <div>
      <List.Root>
        {higherSelections.map((s, i) => (
          <List.Item key={s} onClick={() => setSelected(i)}>
            {s}
          </List.Item>
        ))}
      </List.Root>
      <List.Root>
        {releases[selected].map((r) => (
          <List.Item key={r.name} onClick={() => set(r.name)}>
            {r.name}
          </List.Item>
        ))}
      </List.Root>
    </div>
  )
}

const claimTypes: SchemaType['claimType'][] = [
  'upload',
  'audioError',
  'videoError',
]

function DetailPage() {
  const title = useStore((s) => s.title)
  const claimType = useStore((s) => s.claimType)

  const setClaimType = useStore((s) => s.setClaimType)
  const setDurations = useStore((s) => s.setDurations)
  const setEpisode = useStore((s) => s.setEpisode)

  return (
    <div>
      <div>Title: {title}</div>
      <div>
        <div>Claim Type: </div>
        <Select.Root
          onChange={(e) =>
            setClaimType(e.target.value as SchemaType['claimType'])
          }
        >
          {claimTypes.map((t) => (
            <Select.Item key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Select.Item>
          ))}
        </Select.Root>
      </div>
      <div>
        <div>Episode:</div>
        <Input onChange={(e) => setEpisode(e.target.value)} />
      </div>
      {(claimType === 'audioError' || claimType === 'videoError') && (
        <div>
          <div>Durations: </div>
          <Textarea onChange={(e) => setDurations(e.target.value)}></Textarea>
        </div>
      )}
    </div>
  )
}

function CheckPage() {
  const { claimType, durations, title, episode } = useStore((s) =>
    s.getUpperValues()
  )

  return (
    <div>
      Check the durations you claim.
      <div>Claim Type: {claimType}</div>
      <div>Title: {title}</div>
      <div>Episode: {episode}</div>
      {durations && <div>Durations: {durations}</div>}
    </div>
  )
}

function ReportPage() {
  const schema = useStore((s) => ({
    Type: s.getUpperValues().claimType,
    Title: s.getUpperValues().title,
    Episode: s.getUpperValues().episode,
    Durations: s.getUpperValues().durations,
  }))

  const embedFields = Object.entries(schema)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .filter(
      (t): t is { name: string; value: string } =>
        typeof t.value !== 'undefined'
    )

  const [reported, setReported] = useState(false)

  useEffect(() => {
    sendEmbeds(embedFields!)
    setReported(true)
  }, [])

  return <div>{reported ? 'Reported' : 'Reporting...'}</div>
}

function App() {
  const [pageCount, setPageCount] = useState(0)
  const pages = [
    <SelectionPage />,
    <DetailPage />,
    <CheckPage />,
    <ReportPage />,
  ]

  return (
    <div>
      {pages[pageCount]}
      {pageCount < pages.length - 1 ? (
        <Button onClick={() => setPageCount((c) => c + 1)}>Next</Button>
      ) : (
        <Button onClick={() => location.reload()}>Done</Button>
      )}
    </div>
  )
}

export default App
