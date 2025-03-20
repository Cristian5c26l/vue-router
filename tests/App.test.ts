import { mount, shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import router from '@/router';

describe('<App />', () => {
  test('should render correctly with RouterView', () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router],
      },
    }); // el router de vue provee el componente RouterView, que es usado por App.vue.

    // console.log(wrapper.html());
    // Con shallowMount, wrapper contiene los componentes hijos de App.vue. Estos componentes hijos son ficticios (porque se les agrega "stub") y además, no renderizan sus propios componentes hijos. Por el momento, App tiene como componente hijo a RouterView, por lo tanto, aparece en wrapper.html "router-view-stub" y lo podemos buscar con findComponent como "RouterView".

    const routerView = wrapper.findComponent({ name: 'RouterView' }); // Aun asi, podemos buscar el componente RouterView (hijo de App.vue) dentro de App.vue

    expect(routerView.exists()).toBeTruthy();
  });
});
