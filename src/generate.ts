import { readFile, readdir, writeFile } from 'fs/promises'

const generateIconList = async (): Promise<void> => {
  const icons = await readdir('./src/svgs')
  const iconObject: Record<string, string> = {}

  for (const iconName of icons) {
    const iconContent = await readFile(`./src/svgs/${iconName}`, 'utf-8')

    const iconKey = iconName
      .replace('.svg', '')
      .replaceAll('.', '_')
      .toUpperCase()

    iconObject[iconKey] = iconContent.replace(/(\r\n|\n|\r)/gm, '')
  }

  const iconContent = `${Object.entries(iconObject).map(([key, value]) => {
return `export const ${key} = \`${value}\``
}).join('\n')}
`

  await writeFile('./src/icons.ts', iconContent)
}

generateIconList()
