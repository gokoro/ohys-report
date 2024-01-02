import { create } from 'zustand'
import { StateCreator } from 'zustand'

export const claimTypes = ['upload', 'videoError', 'audioError'] as const
export const resolutions = ['1280x720', '1920x1080'] as const

type ArrayUnion<T extends readonly string[]> = T[number]

export interface SchemaType {
  claimType: ArrayUnion<typeof claimTypes>
  duration?: string
  episode: string
  resolution: ArrayUnion<typeof resolutions>
  title: string
}

export interface SchemaAction {
  getUpperValues: () => Partial<
    Omit<SchemaType, 'claimType'> & { claimType: string }
  >

  setSchema: (t: Partial<SchemaType>) => void
}

type SchemaSlice = SchemaType & SchemaAction

const createSchemaSlice: StateCreator<SchemaSlice, [], [], SchemaSlice> = (
  set,
  get
) => ({
  title: '',
  resolution: '1280x720',
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

  setSchema: (schema) => set(schema),
})

export const useStore = create<SchemaSlice>()((...payload) => ({
  ...createSchemaSlice(...payload),
}))
