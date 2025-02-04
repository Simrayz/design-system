import React from 'react'
import { render, screen } from '@testing-library/react'
//import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { SideBar } from '.'
import { SidebarLinkType } from './SidebarLink'
import { home, star_half } from '@equinor/eds-icons'

const defaultMenuItems: SidebarLinkType[] = [
  {
    name: 'Home',
    icon: home,
  },
  {
    name: 'Another Link',
    icon: star_half,
  },
]

test('Sidebar renders', () => {
  const currentUrl = 'home'
  render(
    <SideBar>
      {defaultMenuItems.map((m) => {
        return <SideBar.Link key={m.name} currentUrl={currentUrl} {...m} />
      })}
    </SideBar>,
  )
})

test('Renders closed width when closed', () => {
  render(
    <SideBar open={false}>
      {defaultMenuItems.map((m) => (
        <SideBar.Link key={m.name} {...m} />
      ))}
    </SideBar>,
  )

  expect(screen.getAllByRole('generic')[2]).toHaveStyle({ width: '72px' })
})

test('Renders open width when open', () => {
  render(
    <SideBar open={true}>
      {defaultMenuItems.map((m) => (
        <SideBar.Link key={m.name} {...m} />
      ))}
    </SideBar>,
  )

  expect(screen.getAllByRole('generic')[2]).toHaveStyle({ width: '256px' })
})

test('Triggers onToggle callback when closed', () => {
  const cb = jest.fn()
  render(
    <SideBar open={true} onToggle={cb}>
      <SideBar.Content>
        <SideBar.Toggle />
        {defaultMenuItems.map((m) => (
          <SideBar.Link key={m.name} {...m} />
        ))}
      </SideBar.Content>
    </SideBar>,
  )

  const collapse = screen.getByRole('button', { name: /collapse/i })
  userEvent.click(collapse)

  expect(cb).toHaveBeenCalled()
})

test('Triggers onToggle callback when opened', () => {
  const cb = jest.fn()
  render(
    <SideBar open={false} onToggle={cb}>
      <SideBar.Content>
        <SideBar.Toggle />
        {defaultMenuItems.map((m) => (
          <SideBar.Link key={m.name} {...m} />
        ))}
      </SideBar.Content>
    </SideBar>,
  )

  const expand = screen.getByRole('button')
  userEvent.click(expand)

  expect(cb).toHaveBeenCalled()
})

test('onToggle send correct state back', () => {
  const toggle = jest.fn()
  render(
    <SideBar open={false} onToggle={toggle}>
      <SideBar.Content>
        <SideBar.Toggle />
        {defaultMenuItems.map((m) => (
          <SideBar.Link key={m.name} {...m} />
        ))}
      </SideBar.Content>
    </SideBar>,
  )

  const expand = screen.getByRole('button')
  userEvent.click(expand)

  expect(toggle).toBeCalled()
  expect(toggle).toHaveBeenCalledWith(true) // Since we send in false to start with
})
