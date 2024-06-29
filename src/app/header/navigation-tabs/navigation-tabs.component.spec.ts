import {
  NavigationItem,
  NavigationTabsComponent,
} from './navigation-tabs.component'
import { componentTestSetup } from '@/test/helpers/component-test-setup'
import { byComponent } from '@/test/helpers/component-query-predicates'
import { TabsComponent } from '../tabs/tabs.component'
import { TabComponent } from '../tab/tab.component'
import {
  provideRouter,
  Route,
  Router,
  RouterLink,
  Routes,
} from '@angular/router'
import { EmptyComponent } from '@/test/helpers/empty-component'
import { RouterTestingHarness } from '@angular/router/testing'
import { getComponentInstance } from '@/test/helpers/get-component-instance'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  expectIsInViewport,
  expectIsNotInViewport,
} from '@/test/helpers/scroll'

describe('NavigationTabsComponent', () => {
  const FOO_ROUTE = { path: 'foo', component: EmptyComponent } satisfies Route
  const BAR_ROUTE = { path: 'bar', component: EmptyComponent } satisfies Route
  const ROUTES: Routes = [FOO_ROUTE, BAR_ROUTE]
  const FOO_ITEM = makeNavigationItemFromRoutePath(FOO_ROUTE.path)
  const BAR_ITEM = makeNavigationItemFromRoutePath(BAR_ROUTE.path)
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
      getComponentInstance(fooTabElement!, TabComponent).selected,
    ).toBeTrue()

    const barTabElement = fixture.debugElement
      .queryAll(byComponent(TabComponent))
      .find(
        (element) =>
          element.nativeElement.textContent.trim() === BAR_ITEM.displayName,
      )
    expect(barTabElement).not.toBeNull()

    expect(
      getComponentInstance(barTabElement!, TabComponent).selected,
    ).toBeFalse()
  })

  describe('when not all tabs fit on screen', () => {
    const DUMMY_ROUTES_COUNT = 5
    let fixture: ComponentFixture<NavigationTabsComponent>
    let component: NavigationTabsComponent

    beforeEach(() => {
      ;[fixture, component] = makeSut()
      fixture.debugElement.styles['width'] = '320px'
      component.items = [
        FOO_ITEM,
        //👇 Dummy routes to ensure scrolling
        ...[...Array(DUMMY_ROUTES_COUNT).keys()].map((i) =>
          makeNavigationItemFromRoutePath(`route ${i}`),
        ),
        BAR_ITEM,
      ]
      fixture.detectChanges()
    })

    // Migrate to component tests? Can be slow
    it('should scroll to active route when active route changes', async () => {
      const router = TestBed.inject(Router)
      await fixture.ngZone?.run(
        async () => await router.navigateByUrl(FOO_ROUTE.path),
      )
      fixture.detectChanges()

      const tabsGroupElement = fixture.debugElement.query(
        byComponent(TabsComponent),
      )
      const tabElements = fixture.debugElement.queryAll(
        byComponent(TabComponent),
      )
      const firstTab = tabElements.at(0)
      const lastTab = tabElements.at(-1)

      // First tab should be visible, but not last
      await expectIsInViewport(firstTab!.nativeElement, {
        context: 'first tab',
        viewport: tabsGroupElement.nativeElement,
      })
      await expectIsNotInViewport(lastTab!.nativeElement, {
        context: 'last tab',
        viewport: tabsGroupElement.nativeElement,
      })

      await fixture.ngZone?.run(async () => {
        await router.navigateByUrl(BAR_ROUTE.path)
      })
      fixture.detectChanges()

      // Last tab should be visible
      await expectIsInViewport(lastTab!.nativeElement, {
        context: 'last tab',
        viewport: tabsGroupElement.nativeElement,
        waitForChange: true,
      })
      await expectIsNotInViewport(firstTab!.nativeElement, {
        context: 'first tab',
        viewport: tabsGroupElement.nativeElement,
      })
    })
  })

  const makeSut = () =>
    componentTestSetup(NavigationTabsComponent, {
      providers: [provideRouter(ROUTES)],
    })
})

function makeNavigationItemFromRoutePath(path: string): NavigationItem {
  return {
    displayName:
      path.substring(0, 1).toUpperCase() + path.substring(1).toLowerCase(),
    routerLink: path,
  }
}
