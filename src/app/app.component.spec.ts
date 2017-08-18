import { TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {FilterPipe, SortByPipe} from './pipes';

import DynamicSerializer from 'dynamic-serializer';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FilterPipe, 
        SortByPipe
      ],
      imports: [
    BrowserModule,
    FormsModule
  ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));

  //Component test
  it('should match snapshots', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  }));

  // function test
  it('gives proper change.', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.changeMaker(1.99)).toMatchSnapshot();
    expect(app.changeMaker(2.75)).toMatchSnapshot();
    expect(app.changeMaker(0.24)).toMatchSnapshot();
  })

	// on dynamic field
	it('makes simple dynamic fields deterministic', () => {
		const dynamicSerializer = new DynamicSerializer();
		const fullPaths = ['primaryKey', 'wholeArray', 'singleValue.levelOne.arr.3'];
		const userId = Math.random();
		const results = {
			staticProp: 'Hi there',
			primaryKey: userId,
			wholeArray: [Math.random(), Math.random()],
			singleValue: {
			levelOne: {
				arr: ['badger', 'badger', 'mushroom', 'snake' + Math.random()]
			}
		}
		};
		const moreResults = {
			foreignKey: userId
		};
		dynamicSerializer.toStatic(results, ['primaryKey', 'wholeArray', 'singleValue.levelOne.arr.3']);
		dynamicSerializer.toStatic(moreResults, ['foreignKey']);

		expect(results).toMatchSnapshot();
		expect(moreResults).toMatchSnapshot();
		expect(results.primaryKey).toBe(moreResults.foreignKey);
	})

});
