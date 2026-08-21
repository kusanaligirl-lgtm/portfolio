import { createServerFn } from '@tanstack/react-start'
import { readStore, writeStore } from './store'

export const bumpVisits = createServerFn({ method: 'POST' }).handler(async () => {
  const store = readStore()
  store.visits += 1
  writeStore(store)
  return store.visits
})

export const getVisits = createServerFn({ method: 'GET' }).handler(async () => {
  return readStore().visits
})