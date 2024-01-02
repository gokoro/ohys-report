import * as stylex from '@stylexjs/stylex'
import 'cal-sans/index.css'
import 'inter-ui/inter-latin.css'
import 'modern-normalize/modern-normalize.css'
import { useEffect, useState } from 'react'

import type { SchemaType } from './stores/zustand'

import { Button } from './components/button'
import { Input } from './components/input'
import * as List from './components/list'
import * as Select from './components/select'
import { claimTypes, resolutions, useStore } from './stores/zustand'
import './styles/styles.css'
import { colors } from './styles/vars.stylex'
import { regularize } from './utils/ohys'
import { sendEmbeds } from './utils/webhook'

const contextYear = import.meta.env.VITE_CONTEXT_YEAR
const contextSeason = import.meta.env.VITE_CONTEXT_SEASON

const eachOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const etcToWeek = ['etc']

const higherSelections = [...eachOfWeek, ...etcToWeek].map(
  (w) => w.charAt(0).toUpperCase() + w.slice(1)
)

const selectionPageStyle = stylex.create({
  header: { marginBottom: 10 },
  secondaryHeader: { color: colors.gray11 },
  container: {
    display: 'flex',
    gap: '3em',
    marginTop: '2em',
    marginBottom: '2em',
    maxHeight: 'min-content',
    overflow: 'hidden',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2em',
    minWidth: 80,
    position: 'relative',
  },
  rightItem: {
    flex: '1',
    fontSize: '1.1rem',
  },
  scrollContainer: {
    position: 'relative',
    overflow: 'scroll',
    height: '100%',
  },
  scrolled: {
    position: 'absolute',
    paddingBottom: '1em',
  },
  gradientContainer: {},
  gradients: {
    width: '100%',
    height: '28px',
    position: 'absolute',
    bottom: 0,
    right: 0,
    background:
      'linear-gradient(rgb(from #FFF r g b / 0%), rgb(from #FFF r g b / 80%))',
  },
})

function SelectionPage() {
  const [releases, setReleases] =
    useState<Awaited<ReturnType<typeof regularize>>>()

  useEffect(() => {
    regularize({ year: contextYear, season: contextSeason }).then((data) =>
      setReleases(data)
    )
  }, [])

  const [selected, setSelected] = useState(0)
  const set = useStore((s) => (title: string) => s.setSchema({ title }))
  const title = useStore((s) => s.title)

  return (
    <div>
      <h1 {...stylex.props(selectionPageStyle.header)}>
        Reporting issues of Ohys' releases.
      </h1>
      <div {...stylex.props(selectionPageStyle.secondaryHeader)}>
        {contextYear}{' '}
        {contextSeason.charAt(0).toUpperCase() + contextSeason.slice(1)}
      </div>
      <div {...stylex.props(selectionPageStyle.container)}>
        <div {...stylex.props(selectionPageStyle.item)}>
          <List.Root>
            {higherSelections.map((s, i) => (
              <List.Item
                interactable
                isActive={selected === i}
                isHierarchy
                key={s}
                onClick={() => setSelected(i)}
              >
                {s}
              </List.Item>
            ))}
          </List.Root>
        </div>
        <div
          {...stylex.props(
            selectionPageStyle.item,
            selectionPageStyle.rightItem
          )}
        >
          <div {...stylex.props(selectionPageStyle.scrollContainer)}>
            <div {...stylex.props(selectionPageStyle.scrolled)}>
              <List.Root>
                {releases &&
                  releases[selected].map(
                    (r) =>
                      r.name.trim() && (
                        <List.Item
                          interactable
                          isActive={r.name === title}
                          key={r.name}
                          onClick={() => set(r.name)}
                        >
                          {r.name}
                        </List.Item>
                      )
                  )}
              </List.Root>
            </div>
          </div>
          <div {...stylex.props(selectionPageStyle.gradients)}></div>
        </div>
      </div>
    </div>
  )
}

const detailPageStyles = stylex.create({
  root: {
    marginTop: '2em',
  },
  container: {
    marginBottom: '1.4em',
  },
  secondaryTitle: {
    letterSpacing: '.2px',
    color: colors.gray11,
    marginBottom: '6px',
  },
  content: {
    fontSize: '1.4rem',
  },
})

function DetailPage() {
  const title = useStore((s) => s.title)
  const claimType = useStore((s) => s.claimType)

  const setSchema = useStore((s) => s.setSchema)

  return (
    <div>
      <h1>Let us know the details of issue.</h1>
      <div {...stylex.props(detailPageStyles.root)}>
        <div {...stylex.props(detailPageStyles.container)}>
          <div {...stylex.props(detailPageStyles.secondaryTitle)}>Title</div>
          <div {...stylex.props(detailPageStyles.content)}>{title}</div>
        </div>
        <div {...stylex.props(detailPageStyles.container)}>
          <div {...stylex.props(detailPageStyles.secondaryTitle)}>
            Claim Type
          </div>
          <Select.Root
            onChange={(e) =>
              setSchema({
                claimType: e.target.value as SchemaType['claimType'],
              })
            }
          >
            {claimTypes.map((t) => (
              <Select.Item key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Select.Item>
            ))}
          </Select.Root>
        </div>
        <div {...stylex.props(detailPageStyles.container)}>
          <div {...stylex.props(detailPageStyles.secondaryTitle)}>
            Resolution
          </div>
          <Select.Root
            onChange={(e) =>
              setSchema({
                resolution: e.target.value as SchemaType['resolution'],
              })
            }
          >
            {resolutions.map((t) => (
              <Select.Item key={t} value={t}>
                {t}
              </Select.Item>
            ))}
          </Select.Root>
        </div>
        <div {...stylex.props(detailPageStyles.container)}>
          <div {...stylex.props(detailPageStyles.secondaryTitle)}>Episode</div>
          <Input onChange={(e) => setSchema({ episode: e.target.value })} />
        </div>
        {(claimType === 'audioError' || claimType === 'videoError') && (
          <div>
            <div {...stylex.props(detailPageStyles.secondaryTitle)}>
              Duration
            </div>
            <Input
              onChange={(e) => setSchema({ duration: e.target.value })}
            ></Input>
          </div>
        )}
      </div>
    </div>
  )
}

const checkPageStyles = stylex.create({
  container: {
    marginTop: '1.8em',
    fontSize: '1.1rem',
    display: 'flex',
    gap: '1em',
  },
  secondaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: colors.gray11,
  },
})

function CheckPage() {
  const { claimType, duration, title, episode, resolution } = useStore((s) =>
    s.getUpperValues()
  )

  return (
    <div>
      <h1>Check the details you claim.</h1>
      <div {...stylex.props(checkPageStyles.container)}>
        <div {...stylex.props(checkPageStyles.secondaryContainer)}>
          <div {...stylex.props(checkPageStyles.label)}>Claim Type</div>
          <div {...stylex.props(checkPageStyles.label)}>Title</div>
          <div {...stylex.props(checkPageStyles.label)}>Resolution</div>
          <div {...stylex.props(checkPageStyles.label)}>Episode</div>
        </div>
        <div {...stylex.props(checkPageStyles.secondaryContainer)}>
          <div>{claimType}</div>
          <div>{title}</div>
          <div>{resolution}</div>
          <div>{episode}</div>
        </div>
        {duration && <div>duration: {duration}</div>}
      </div>
    </div>
  )
}

function ReportPage() {
  const schema = useStore((s) => {
    const { claimType, duration, episode, title, resolution } =
      s.getUpperValues()
    return {
      Type: claimType,
      Title: title,
      Resolution: resolution,
      Episode: episode,
      Duration: duration,
    }
  })

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
    sendEmbeds(embedFields)
    setReported(true)
  }, [])

  return (
    <h1>
      {reported
        ? 'The issue has been successfully reported 🤩'
        : 'Reporting...'}
    </h1>
  )
}

const mainStyle = stylex.create({
  container: {
    maxWidth: '100%',

    width: 'calc(800px + 10vw)',
    height: '100vh',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginLeft: 'auto',
    marginRight: 'auto',
  },
  box: {
    padding: '3em',
    flex: '1',
    backgroundColor: '#fff',

    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.gray3,
    borderRadius: 48,
  },
})

const appStyle = stylex.create({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

function App() {
  const [pageCount, setPageCount] = useState(0)
  const pages = [
    <SelectionPage />,
    <DetailPage />,
    <CheckPage />,
    <ReportPage />,
  ]

  return (
    <div {...stylex.props(mainStyle.container)}>
      <div {...stylex.props(mainStyle.box)}>
        {pages[pageCount]}
        <div {...stylex.props(appStyle.buttonContainer)}>
          {pageCount < pages.length - 1 ? (
            <Button onClick={() => setPageCount((c) => c + 1)}>Next</Button>
          ) : (
            <Button onClick={() => location.reload()}>Done</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
