import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';

describe('is-authenticated.guard', () => {
  const to: RouteLocationNormalizedLoadedGeneric = {
    matched: [],
    name: undefined,
    params: {},
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    path: '/', // no importa la ruta a la que vaya el usuario
    meta: {},
  };

  const from: any = {}; // from no se usa en las pruebas

  const next = vi.fn(); // next es una función mockeada. Se usa porque simplemente vamos a probar que internamente dentro de isAuthenticatedGuard se llame con el objeto {name: 'login} cuando no esté autenticado (no haya userId en localStorage)

  beforeEach(() => {
    // Antes de cada prueba, quitar todos los items (como userId) guardados en localStorage
    localStorage.clear();
  });

  test('should block if not authenticated', async () => {
    await isAuthenticatedGuard(to, from, next); // Sujeto de prueba: isAuthenticatedGuard. Estimulo: ejecutarlo
    expect(next).toHaveBeenCalledWith({ name: 'login' });
  });

  test('should called localStorage set item lastPath', async () => {
    await isAuthenticatedGuard(to, from, next);
    expect(localStorage.getItem('lastPath')).toBe(to.path);
  });

  test('should block if not authenticated with spies', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem'); // Espiar el metodo setItem del localStorage nativo del navegador. setItemSpy crea una vi function, a la cual le puedo preguntar si fue llamada, con qué argumentos fue llamada, cuántas veces fue llamada, etc. Por el momento, solo se ejecuta ese metodo "setItem" del localStorage nativo
    await isAuthenticatedGuard(to, from, next);

    expect(setItemSpy).toHaveBeenCalledWith('lastPath', to.path);
  });

  test('should pass if authenticated', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('ABC-123456'); // Haciendo que metodo getItem de localStorage, cuando sea llamado en isAuthenticatedGuard, devuelva 'ABC-123456'
    await isAuthenticatedGuard(to, from, next);

    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });
});
