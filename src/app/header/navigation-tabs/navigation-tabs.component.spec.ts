import {
  NavigationItem,
  NavigationTabsComponent,
} from './navigation-tabs.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { TabsComponent } from '../tabs/tabs.component'
import { TabComponent } from '../tab/tab.component'
import { provideRouter, Route, RouterLink, Routes } from '@angular/router'
import { EmptyComponent } from '@/test/helpers/empty-component'
import { RouterTestingHarness } from '@angular/router/testing'

describe('NavigationTabsComponent', () => {
  const FOO_ROUTE = { path: 'foo', component: EmptyComponent } satisfies Route
  const BAR_ROUTE = { path: 'bar', component: EmptyComponent } satisfies Route
  const ROUTES: Routes = [FOO_ROUTE, BAR_ROUTE]
  const FOO_ITEM = {
    displayName: 'Foo',
    routerLink: FOO_ROUTE.path,
  } satisfies NavigationItem
  const BAR_ITEM = {
    displayName: 'Bar',
    routerLink: BAR_ROUTE.path,
  } satisfies NavigationItem
  const ITEMS = [FOO_ITEM, BAR_ITEM]

  it('should create', () => {
    const [fixture, component] = makeSut()
    fixture.detectChanges()

    expect(component).toBeTruthy()
  })

  it('should display all items as tabs with their route links', () => {
    const [fixture, component] = makeSut()
    component.items = ITEMS
    fixture.detectChanges()

    const tabsElement = fixture.debugElement.query(byComponent(TabsComponent))
    expect(tabsElement).not.toBeNull()

    const tabElements = tabsElement.queryAll(byComponent(TabComponent))
    expect(tabElements.length).toEqual(ITEMS.length)
    tabElements.forEach((tabElement, i) => {
      const item = ITEMS[i]
      expect(tabElement.nativeElement.textContent.trim()).toEqual(
        item.displayName,
      )
      expect(tabElement.injector.get(RouterLink).urlTree?.toString()).toBe(
        '/' + item.routerLink,
      )
    })
  })

  it('should mark only active page tab as selected', async () => {
    const [fixture, component] = makeSut()
    component.items = ITEMS
    fixture.detectChanges()

    await fixture.ngZone?.run(
      async () => await RouterTestingHarness.create(FOO_ROUTE.path),
    )
    fixture.detectChanges()

    const fooTabElement = fixture.debugElement
      .queryAll(byComponent(TabComponent))
      .find(
        (element) =>
          element.nativeElement.textContent.trim() === FOO_ITEM.displayName,
      )
    expect(fooTabElement).not.toBeNull()
    expect(
      (fooTabElement!.componentInstance as TabComponent).selected,
    ).toBeTrue()

    const barTabElement = fixture.debugElement
      .queryAll(byComponent(TabComponent))
      .find(
        (element) =>
          element.nativeElement.textContent.trim() === BAR_ITEM.displayName,
      )
    expect(barTabElement).not.toBeNull()

    expect(
      (barTabElement!.componentInstance as TabComponent).selected,
    ).toBeFalse()
  })

  const makeSut = () =>
    componentTestSetup(NavigationTabsComponent, {
      providers: [provideRouter(ROUTES)],
    })
})
