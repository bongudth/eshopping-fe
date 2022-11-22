import { shallowMount, createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import chai from 'chai';
import TheTopbar from '~/components/partials/TheTopbar.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('TheTopbar', () => {
  test('is a Vue instance', () => {
    const mocks = {
      $auth: {
        loggedIn: true,
        user: {
          name: 'someone',
        },
      },
    };
    const wrapper = shallowMount(TheTopbar, { mocks, localVue });
    expect(wrapper.vm).toBeTruthy();
  });

  describe('methods', () => {
    const mocks = {
      $auth: {
        loggedIn: true,
        user: {
          name: 'someone',
        },
        logout: chai.spy(),
      },
      $router: { push: chai.spy() },
      $nuxt: {
        $loading: {
          start: () => null,
          finish: () => null,
        },
      },
    };
    test('logout', async () => {
      const wrapper = shallowMount(TheTopbar, { mocks, localVue });
      await (wrapper.vm as any).logout();
      expect(mocks.$auth.logout).toBeCalled();
      expect(mocks.$router.push).toBeCalled();
    });
  });
});
