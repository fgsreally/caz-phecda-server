
const path = require('path')
const { name, version } = require('./package.json')

module.exports = {
  name,
  version,
  metadata: {
    year: new Date().getFullYear()
  },
  prompts: [
    {
      name: 'name',
      type: 'text',
      message: 'Project name'
    },

    {
      name: 'description',
      type: 'text',
      message: 'Project description',
      initial: 'Phecda-server App'
    },
    {
      name: 'file',
      type: 'confirm',
      message: 'Use upload module',
      initial: true
    },

    {
      name: 'logger',
      type: 'confirm',
      message: 'Use logger',
      initial: true
    },
    {
      name: 'db',
      type: 'select',
      message: 'Database',
      hint: 'typegoose',
      choices: [
        { value: 'typegoose' },
        { value: 'no' }
      ]
    },

  ],
  init: true,
  filters:{
  'src/modules/file':({file})=>!!file,
  'src/middlewares/upload.ts':({file})=>!!file,
   'src/utils/logger.ts':({logger})=>!!logger
  },

  complete: async ctx => {
    console.clear()
 
    if (ctx.dest !== process.cwd()) {
      console.log(`  $ cd ${path.relative(process.cwd(), ctx.dest)}`)
    }
    
    console.log('\nHappy hacking :)\n')
  }
}