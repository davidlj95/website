import { reflectComponentType, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

const COMPONENT = 'Component';

export function ensureHasComponent<T, U>(fixtureGetter: () => ComponentFixture<T>, component: Type<U>, givenName: string | undefined = undefined) {
  const name = givenName ?? component.name
    .replace(COMPONENT, '')
    .replace(/([A-Z])/g, " $1")
    .slice(1)
    .toLowerCase();
  it(`should render the ${name}`, () => {
    const debugElement = fixtureGetter().debugElement.query(By.css(getComponentSelector(component)));
    expect(debugElement).toBeTruthy();
  });
}

export function getComponentSelector<C>(component: Type<C>) {
  if (!isClass(component)) {
    throw new Error("Component argument is not a class")
  }
  const selector = reflectComponentType(component)?.selector;
  if (!selector) {
    throw new Error(`Selector not found for alleged component: ${component.constructor.name}`);
  }
  return selector;
}

function isClass(obj: any) {
  const isCtorClass = obj.constructor
    && obj.constructor.toString().substring(0, 5) === 'class'
  if (obj.prototype === undefined) {
    return isCtorClass
  }
  const isPrototypeCtorClass = obj.prototype.constructor
    && obj.prototype.constructor.toString
    && obj.prototype.constructor.toString().substring(0, 5) === 'class'
  return isCtorClass || isPrototypeCtorClass
}
