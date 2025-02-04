import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'
import React from 'react'
import { TimePicker } from './TimePicker'

afterEach(cleanup)
const labelText = 'Click test'

describe('TimePicker', () => {
  it('timepicker should show on click', async () => {
    const { container } = render(<TimePicker value="11:00" label={labelText} />)
    fireEvent.click(container)
    await screen.findByRole('dialog')
  })

  it('timepicker should hide on selection', async () => {
    const { container } = render(<TimePicker value="01:00" label={labelText} />)
    const optionsNode = screen.getAllByLabelText(labelText)[1]
    const buttonNode = screen.getByLabelText('toggle options', {
      selector: 'button',
    })
    fireEvent.click(container)

    expect(within(buttonNode).queryAllByRole('option')).toHaveLength(0)
    fireEvent.click(buttonNode)
    const timeItem = within(optionsNode).queryAllByRole('option')[0]
    fireEvent.click(timeItem)
    await waitFor(() => {
      return expect(within(optionsNode).queryAllByRole('option')).toHaveLength(
        0,
      )
    })
  })
})
