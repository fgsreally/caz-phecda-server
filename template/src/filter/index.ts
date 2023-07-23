import type { ServerFilter } from 'phecda-server'
import { HttpException, UndefinedException } from 'phecda-server'

export const Filter: ServerFilter = (e: any) => {
  if (!(e instanceof HttpException))
    e = new UndefinedException(e.message || e)
  return e.data
}
