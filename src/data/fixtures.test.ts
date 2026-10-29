import { describe, expect, it } from 'vitest'
import { incidents, resetIncidents } from './fixtures'

describe('fixtures del laboratorio', () => {
  it('devuelve datos iniciales reproducibles sin compartir referencias', () => {
    const copy = resetIncidents()
    copy[0].title = 'cambio local'
    expect(incidents[0].title).not.toBe('cambio local')
    expect(copy).toHaveLength(incidents.length)
  })
})
