import type { RouteLocationNormalizedLoadedGeneric, NavigationGuardNext } from 'vue-router';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalizedLoadedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) => {
  const userId = localStorage.getItem('userId');
  localStorage.setItem('lastPath', to.path); // to.path es la última ruta a la que se intentó acceder o la ultima en la que la persona estuvo ahí. Con esto, se sabe con seguridad que "lastPath" es la página a la que quiere acceder la persona, de modo que, cuando la persona se autentique desde /auth/login, se le redirija a "lastPath" para así ser generoso con él. ESTE ES UN FEATURE DE GRAN UTILIDAD PARA EL USUARIO.

  if (!userId) {
    return next({ name: 'login' }); // mandar a la página del login (/auth/login). Podria mandarlo ahí con algun parámetro o varios si quisiera
  }

  // Permitir que el usuario acceda a la ruta solicitada en caso de que esté autenticado (userId exista).
  return next();
};

export default isAuthenticatedGuard;
