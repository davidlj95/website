import {
  NavigationItem,
  NavigationTabsComponent,
} from './navigation-tabs.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { TabsComponent } from '@/common/tabs/tabs.component'
import { TabComponent } from '@/common/tab/tab.component'
import { provideRouter, Route, RouterLink, Routes } from '@angular/router'
import { EmptyComponent } from '@/test/helpers/empty-component'
import { RouterTestingHarness } from '@angular/router/testing'
import { getComponentInstance } from '@/test/helpers/get-component-instance'
import { textContent } from '@/test/helpers/text-content'
import { setFixtureInputsAndDetectChanges } from '@/test/helpers/set-fixture-inputs'
import { By } from '@angular/platform-browser'

describe('NavigationTabsComponent', () => {
  const FOO_ROUTE = { path: 'foo', component: EmptyComponent } satisfies Route
  const BAR_ROUTE = { path: 'bar', component: EmptyComponent } satisfies Route
  const ROUTES: Routes = [FOO_ROUTE, BAR_ROUTE]
  const FOO_ITEM = makeNavigationItemFromRoutePath(FOO_ROUTE.path)
  const BAR_ITEM = makeNavigationItemFromRoutePath(BAR_ROUTE.path)
  const ITEMS = [FOO_ITEM, BAR_ITEM]

  beforeEach(() => {
    // do not log tabs component messages
    spyOn(console, 'log')
  })

  it('should create', () => {
    const [fixture, component] = makeSut()
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should display all items as tabs with their route links', () => {
    const [fixture] = makeSut({ items: ITEMS })

    const tabsElement = fixture.debugElement.query(By.directive(TabsComponent))

    expect(tabsElement).not.toBeNull()

    const tabElements = tabsElement.queryAll(By.directive(TabComponent))

    expect(tabElements.length).toEqual(ITEMS.length)
    tabElements.forEach((tabElement, i) => {
      const item = ITEMS[i]

      expect(textContent(tabElement)).toEqual(item.displayName)

      expect(tabElement.injector.get(RouterLink).urlTree?.toString()).toBe(
        '/' + (item.routerLink as string),
      )
    })
  })

  it('should mark only active page tab as selected', async () => {
    const [fixture] = makeSut({ items: ITEMS })

    await fixture.ngZone?.run(
      async () => await RouterTestingHarness.create(FOO_ROUTE.path),
    )
    fixture.detectChanges()

    const fooTabElement = fixture.debugElement
      .queryAll(By.directive(TabComponent))
      .find((element) => textContent(element) === FOO_ITEM.displayName)

    expect(fooTabElement).not.toBeNull()
    expect(
      getComponentInstance(fooTabElement!, TabComponent).isSelected,
    ).toBeTrue()

    const barTabElement = fixture.debugElement
      .queryAll(By.directive(TabComponent))
      .find((element) => textContent(element) === BAR_ITEM.displayName)

    expect(barTabElement).not.toBeNull()

    expect(
      getComponentInstance(barTabElement!, TabComponent).isSelected,
    ).toBeFalse()
  })

  const makeSut = ({ items }: { items?: readonly NavigationItem[] } = {}) => {
    const [fixture, component] = componentTestSetup(NavigationTabsComponent, {
      providers: [provideRouter(ROUTES)],
    })
    setFixtureInputsAndDetectChanges(fixture, { items: items ?? [] })
    return [fixture, component] as const
  }
})

function makeNavigationItemFromRoutePath(path: string): NavigationItem {
  return {
    displayName:
      path.substring(0, 1).toUpperCase() + path.substring(1).toLowerCase(),
    routerLink: path,
  }
}
