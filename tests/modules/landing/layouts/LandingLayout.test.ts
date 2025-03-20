import { shallowMount } from '@vue/test-utils';
import { RouterView } from 'vue-router';
import LandingLayout from '@/modules/landing/layouts/LandingLayout.vue';
import router from '@/router';

describe('<LandingLayout />', () => {
  test('should be render correctly', () => {
    const wrapper = shallowMount(LandingLayout, {
      global: {
        plugins: [router], // Importar RouterView de forma global desde el router real. Vemos que estamos usando el router real. Podriamos hacer un mock o un router temporal
      },
    });

    //   console.log(wrapper.html());

    expect(wrapper.find('header').exists()).toBe(true);
    expect(wrapper.find('main').exists()).toBe(true);
    expect(wrapper.find('footer').exists()).toBe(true);

    expect(wrapper.find('footer').html()).toContain('Acme Corporation. Derechos reservados');
    expect(wrapper.find('footer').html()).toContain(
      `${new Date().getFullYear()} Acme Corporation. Derechos reservados`,
    ); // Podria hacer tambien un mock del Date y asegurarme que haya sido llamado

    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
    expect(wrapper.findComponent(RouterView).exists()).toBe(true);
  });
});
