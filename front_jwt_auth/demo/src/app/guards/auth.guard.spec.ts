import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthGuard', () => {
  let guard = TestBed.inject(AuthGuard);
// const guard = new AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], //SE O COMPONENTE INVOCA ALGUM SERVICE, INCLUÍMOS ESSA DEPENDÊNCIA DE HTTP DE TESTE
      declarations: [AuthGuard],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        AuthGuard, 
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to login if not authenticated', () => {
    localStorage.removeItem('authToken'); 

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = guard.canActivate(route, state);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });


});
