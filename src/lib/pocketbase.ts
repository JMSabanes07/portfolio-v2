import PocketBase from 'pocketbase'

console.log('############################', import.meta.env.PUBLIC_POCKETBASE_URL)

export const pb = new PocketBase(import.meta.env.PUBLIC_POCKETBASE_URL)
