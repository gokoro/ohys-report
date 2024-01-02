import Brackets from '../assets/BidiBrackets.txt'

const seasons = ['spring', 'summer', 'fall', 'winter'] as const

const endpoint = 'https://raw.githubusercontent.com/ohyongslck/annie/master'

type Year = number
type Season = (typeof seasons)[number]

export interface SeasonParam {
  season: Season
  year: Year
}

const buildUrlContext = ({ year, season }: SeasonParam) =>
  `${endpoint}/${year}%40${seasons.indexOf(season) + 1}`

async function getRaw({ year, season }: SeasonParam) {
  const res = await fetch(buildUrlContext({ year, season }))
  const data = await res.text()
  return data
}

async function getBracketsSources() {
  const res = await fetch(Brackets)
  const data = await res.text()
  return data
}

async function getBrackets() {
  const raw = await getBracketsSources()
  const matches = raw.matchAll(/(\b\w{4}\b);/gm)

  const brackets: string[] = []
  let i = 0

  for (const b of matches) {
    const t = b[1]

    if (i % 4 === 0 || i % 4 === 1) {
      brackets.push(String.fromCharCode(parseInt(t, 16)))
    }

    i++
  }

  return brackets
}

function filterMatchingBrackets(brackets: string[], raw: string) {
  let applied: string[] = []

  for (let i = 0; i * 2 < brackets.length; i++) {
    if (raw.includes(brackets[i * 2]) && raw.includes(brackets[i * 2 + 1])) {
      applied = [...applied, brackets[i * 2], brackets[i * 2 + 1]]
    }
  }

  const appliedCount: number[] = []

  for (let i = 0; i * 2 < applied.length; i++) {
    const u = i * 2
    const re = new RegExp(`\\${applied[u]}`, 'gm')

    const m = raw.match(re)
    appliedCount.push(m?.length ?? 0)
  }

  const maxIdx = appliedCount.indexOf(Math.max(...appliedCount))

  return [applied[maxIdx * 2], applied[maxIdx * 2 + 1]]
}

export async function regularize(ctx: SeasonParam) {
  const brackets = await getBrackets()
  const raw = await getRaw(ctx)

  const splitedList = raw.split('\n')
  const [open, end] = filterMatchingBrackets(brackets, raw)

  const animes: { name: string }[][] = [[]]

  for (const l of splitedList) {
    if (l.trim().length === 0) {
      animes.push([])
    }

    const regex = new RegExp(`\\${open}([^\\${end}]+)\\${end}`, 'g')
    const [, , titleGroup] = [...l.matchAll(regex)]

    if (!titleGroup) {
      continue
    }

    const [, name] = titleGroup

    animes[animes.length - 1].push({ name })
  }

  return animes
}
