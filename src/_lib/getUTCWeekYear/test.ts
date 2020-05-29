// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import getUTCWeekYear from '.'

describe('getUTCWeekYear', function() {
  it('returns the local week-numbering year of the given date', function() {
    const result = getUTCWeekYear(new Date(Date.UTC(2004, 11 /* Dec */, 26)))
    assert(result === 2005)
  })

  it('accepts a timestamp', function() {
    const result = getUTCWeekYear(Date.UTC(2000, 11 /* Dec */, 30))
    assert(result === 2000)
  })

  it('handles dates before 100 AD', function() {
    const initialDate = new Date(0)
    initialDate.setUTCFullYear(7, 11 /* Dec */, 31)
    initialDate.setUTCHours(0, 0, 0, 0)
    const result = getUTCWeekYear(initialDate)
    assert(result === 8)
  })

  it('returns NaN if the given date is invalid', function() {
    const result = getUTCWeekYear(new Date(NaN))
    assert(isNaN(result.getTime()))
  })

  it('allows to specify `weekStartsOn` and `firstWeekContainsDate` in locale', function() {
    const date = new Date(Date.UTC(2004, 11 /* Dec */, 26))
    const result = getUTCWeekYear(date, {
      locale: {
        options: { weekStartsOn: 1, firstWeekContainsDate: 4 }
      }
    })
    assert(result === 2004)
  })

  it('`options.weekStartsOn` overwrites the first day of the week specified in locale', function() {
    const date = new Date(Date.UTC(2004, 11 /* Dec */, 26))
    const result = getUTCWeekYear(date, {
      weekStartsOn: 1,
      firstWeekContainsDate: 4,
      locale: {
        options: { weekStartsOn: 0, firstWeekContainsDate: 1 }
      }
    })
    assert(result === 2004)
  })

  it('throws `RangeError` if `options.weekStartsOn` is not convertable to 0, 1, ..., 6 or undefined', function() {
    const block = getUTCWeekYear.bind(null, new Date(2007, 11 /* Dec */, 31), {
      weekStartsOn: NaN
    })
    assert.throws(block, RangeError)
  })

  it('throws `RangeError` if `options.firstWeekContainsDate` is not convertable to 1, 2, ..., 7 or undefined', function() {
    const block = getUTCWeekYear.bind(null, new Date(2007, 11 /* Dec */, 31), {
      firstWeekContainsDate: NaN
    })
    assert.throws(block, RangeError)
  })

  it('throws TypeError exception if passed less than 1 argument', function() {
    assert.throws(getUTCWeekYear.bind(null), TypeError)
  })
})