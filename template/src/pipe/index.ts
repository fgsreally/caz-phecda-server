import type { P } from 'phecda-server'
import { ValidateException, isPhecda, plainToClass } from 'phecda-server'

export const Pipe = {
  async transform(args: { arg: any; validate: boolean }[], reflect: any[]) {
    for (const i in args) {
      const { validate, arg } = args[i]
      if (validate === false)
        continue

      if (isPhecda(reflect[i])) {
        const ret = await plainToClass(reflect[i], arg, { transform: true })
        if (ret.err.length > 0)
          throw new ValidateException(ret.err[0])
        args[i].arg = ret.data
      }
      else {
        if ([Number, Boolean].includes(reflect[i])) {
          args[i].arg = reflect[i](arg)

          if (reflect[i] === Number && Object.is(args[i].arg, NaN))
            throw new ValidateException(`parameter ${Number(i) + 1} should be a number`)
        }
      }
    }
    return args.map(item => item.arg)
  },
} as P.Pipe
