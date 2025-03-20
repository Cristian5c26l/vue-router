import App from '@/App.vue';
import router from '@/router';
import { mount } from '@vue/test-utils';
import type { RouteLocationNormalizedGeneric } from 'vue-router';

describe('Router', () => {
  const wrapper = mount(App, {
    // montar componente App y sus componentes hijos. mount permite hacer esto.
    global: {
      plugins: [router],
    },
  });

  test('should renders HomePage when visiting /', async () => {
    await router.replace('/'); // Asegurarse de que estemos en la ruta "/"
    await router.isReady();

    // console.log(wrapper.html());

    expect(wrapper.html()).toContain('Bienvenido a nuestro sitio web');
  });

  test('should renders FeaturesPage when visiting /features', async () => {
    await router.replace('/features'); // Asegurarse de que estemos en la ruta "/features"
    await router.isReady();

    // console.log(wrapper.html());

    expect(wrapper.html()).toContain('Master Cleanse Reliac Heirloom');

    // await router.replace('/');
    // await router.push({ name: 'features' });
    // expect(wrapper.html()).toContain('Master Cleanse Reliac Heirloom');
  });

  test('should renders PricingPage when visiting /pricing', async () => {
    await router.replace('/pricing'); // Asegurarse de que estemos en la ruta "/pricing"
    await router.isReady();

    // console.log(wrapper.html());

    expect(wrapper.html()).toContain('Plans');
  });

  test('should renders ContactPage when visiting /contact', async () => {
    await router.replace('/contact'); // Asegurarse de que estemos en la ruta "/contact"
    await router.isReady();

    // console.log(wrapper.html());

    expect(wrapper.html()).toContain(
      'Post-ironic portland shabby chic echo park, banjo fashion axe',
    ); // Post-ironic portland shabby chic echo park, banjo fashion axe es algo que se sabe que siempre estará en la página ContactPage
  });

  test('should renders LoginPage when visiting /pokemon/:id with no authentication', async () => {
    localStorage.clear(); // Limpiar el localStorage
    await router.replace('/pokemon/151');
    await router.isReady(); // Esperar a que la navegación se complete para que así se pueda renderizar el componente LoginPage.vue

    // console.log(wrapper.html());
    expect(wrapper.find('h1').text()).toContain('Login');
  });

  test('should renders PokemonPage when visiting /pokemon/:id with authentication', async () => {
    localStorage.setItem('userId', 'ABC-123'); // Colocar userId en el localStorage
    await router.replace('/pokemon/151'); // Al ir a la ruta /pokemon/151, primero se ejecuta isAuthenticatedGuard el cual permite la navegación si el usuario está autenticado (userId esta en el localStorage)
    await router.isReady(); // Esperar a que la navegación se complete para que así se pueda renderizar el componente PokemonPage.vue

    // console.log(wrapper.html());
    expect(wrapper.find('h1').text()).toContain('Pokémon #151');
    expect(wrapper.html()).toContain(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/151.svg',
    ); // Para ser más especificos
  });

  test('should convert the id segment of the pokemon route into a number', async () => {
    const route: RouteLocationNormalizedGeneric = {
      name: undefined,
      params: { id: '2' },
      matched: [],
      fullPath: '/pokemon/2',
      query: {},
      hash: '',
      redirectedFrom: undefined,
      meta: {},
      path: '',
    };

    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    // console.log(pokemonRoute); // muestra que es un objeto con propiedades como "props", la cual hace referencia a un default Function: props, que es la función props.

    const { id } = (pokemonRoute?.props as any).default(route); // Enviar "route" a la función props de la ruta pokemon, la cual, internamente, va a serializar el id que esta en la ruta /pokemon/2 a un número, tal como se muestra en src/router/index.ts.

    expect(pokemonRoute).toBeTruthy(); // Comprobar que la ruta del pokemon exista, sino, lo demas falla.
    expect(id).toBe(2);
  });

  test('should return default value if id segment is not a number at the pokemon route', async () => {
    const route: any = {
      fullPath: '/pokemon/2',
      params: { id: '2abc' },
    };

    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    // console.log(pokemonRoute); // muestra que es un objeto con propiedades como "props", la cual hace referencia a un default Function: props, que es la función props.

    const { id } = (pokemonRoute?.props as any).default(route);

    expect(pokemonRoute).toBeTruthy(); // Comprobar que la ruta del pokemon exista, sino, lo demas falla.
    expect(id).toBe(1);
  });
});
