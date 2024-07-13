import { expect, it } from 'vitest'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { fs } from 'zx'

const __dirname = dirname(fileURLToPath(import.meta.url))

it('should generate queries', async () => {
  const queryPath = resolve(__dirname, '../dist/api/_content/query')
  const stat = await fs.stat(queryPath)
  expect(stat.isDirectory()).toBe(true)
  const files = await fs.readdir(queryPath)
  expect(files.length).toBeGreaterThan(0)
})
