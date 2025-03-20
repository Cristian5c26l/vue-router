import PokemonPage from '@/modules/pokemons/pages/PokemonPage.vue';
import { mount, RouterLinkStub } from '@vue/test-utils';

describe('<PokemonPage />', () => {
  const wrapper = mount(PokemonPage, {
    props: {
      id: 25,
    },
    global: {
      stubs: {
        //   RouterLink: true, // Con RouterLink siendo un stub, dicho RouterLink será un componente ficticio puesto ahí de forma global (en sustitución del componente original RouterLink proveido por src/router/index.ts) para que exista dentro de componente PokemonPage.vue pues internamente dicho componente muestra un RouterLink el cual no está siendo importado de manera explicita con import, sino de forma global. USAR ESTE stub DE ROUTERLINK HACE QUE EVITEMOS EL WARNING DE "Failed to resolve component: RouterLink".................................................... ESTE STUB "RouterLink" NO SE HARÁ NADA CON ÉL, SOLO AYUDA A TENER LA REFERENCIA DE "RouterLink" DENTRO DE COMPONENTE PokemonPage.vue PUES DENTRO DE DICHO COMPONENTE NO EXISTE UN "import RouterLink" DE FORMA EXPLICITA
        RouterLink: RouterLinkStub,
      },
    },
  });

  test('should render the component correctly', () => {
    expect(wrapper.find('h1').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
    );

    // console.log(wrapper.html());
  });

  test('should redirect to the next pokemon', () => {
    // Con RouterLink: true
    // const link = wrapper.findComponent(RouterLink);
    // console.log(link);// Muestra el objeto "RouterLink" de vue-router.
    // console.log(link.props()); // Muestra un objeto vacio. No se tienen las propiedades o atributos como "to" que se esperan. Esto tiene sentido porque "RouterLink" es un stub (componente ficticio), no es el RouterLink implementado o proveido por src/router/index.ts.

    const link = wrapper.findComponent(RouterLinkStub);

    // console.log(link.props());

    expect(link.props().to).toEqual({ name: 'pokemon', params: { id: 26 } });
  });
});
