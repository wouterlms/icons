import * as allIcons from './icons'

export default () => ({
  name: 'icon-transformer',
  transform(code: string, id: string) {
    const isVueFile = id.endsWith('.vue')

    if (!isVueFile)
      return

    const icons = [...code.matchAll(/Icon\.\w*/g)]

    if (icons.length === 0)
      return

    const transformedCode = icons.reduce((acc, [icon]) => {
      const iconcontent = allIcons[icon.split('.').pop() as keyof typeof allIcons]

      if (iconcontent !== undefined)
        return acc.replace(icon, `\`${iconcontent.replace(/(\r\n|\n|\r)/gm, '')}'\``)

      return acc
    }, code)

    return transformedCode
  },
})
