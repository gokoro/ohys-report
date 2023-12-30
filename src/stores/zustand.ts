import { create } from 'zustand'
import { StateCreator } from 'zustand'

export interface SchemaType {
  claimType: 'audioError' | 'upload' | 'videoError'
  durations?: string
  episode: string
  title: string
}

export interface SchemaAction {
  getUpperValues: () => Partial<
    Omit<SchemaType, 'claimType'> & { claimType: string }
  >

  setClaimType: (t: SchemaType['claimType']) => void
  setDurations: (t: SchemaType['durations']) => void
  setEpisode: (t: SchemaType['episode']) => void
  setTitle: (t: SchemaType['title']) => void
}

type SchemaSlice = SchemaType & SchemaAction

const createSchemaSlice: StateCreator<SchemaSlice, [], [], SchemaSlice> = (
  set,
  get
) => ({
  title: '',
  claimType: 'upload',
  episode: '0',

  getUpperValues: () =>
    Object.entries(get())
      .filter((t): t is [string, string] => typeof t[1] === 'string')
      .reduce<ReturnType<SchemaAction['getUpperValues']>>(
        (prev, [key, value]) => ({
          ...prev,
          [key]: value.charAt(0).toUpperCase() + value.slice(1),
        }),
        {}
      ),

  setClaimType: (claimType) => set(() => ({ claimType })),
  setDurations: (durations) => set(() => ({ durations })),
  setEpisode: (episode) => set(() => ({ episode })),
  setTitle: (title) => set(() => ({ title })),
})

export const useStore = create<SchemaSlice>()((...payload) => ({
  ...createSchemaSlice(...payload),
}))
