import { permissions } from '~/constants/roles';

export default {
  // v-auth can work like v-if, but you can use <auth> wrapper component instead
  // Use v-auth with "allow" or "forbid" argument
  // <div v-auth:allow.active="['admin', 'something']" />
  // <div v-auth:allow.visible="['admin', 'something']" />
  // <div v-auth:allow="['admin', 'something']" />
  bind(_el: HTMLElement, binding: any) {
    // Only throw in dev mode
    if (process.env.NODE_ENV === 'development') {
      // Handle passing weird args
      if (!['allow', 'forbid'].includes(binding.arg)) {
        throw new Error(
          'The directive v-auth must use :allow or :forbid argument'
        );
      }
      if (!Array.isArray(binding.value)) {
        throw new TypeError(
          'The directive v-auth must have value as Array type'
        );
      }
      if (binding.value.length < 1) {
        throw new Error(
          'The directive v-auth must have value as an array of declared permissions'
        );
      }
      // Handle passing weird role name
      binding.value.forEach((role: string) => {
        if (!permissions.includes(role)) {
          throw new Error(
            `"${role}" is not in the permissions collection in ~/constants/roles, must be included in ${JSON.stringify(
              permissions
            )}`
          );
        }
      });
    }
  },

  inserted(el: HTMLElement, binding: any, vnode: any) {
    const hasPermission = binding.value.includes(
      vnode.context.$store.$auth.$state.user?.role
    );
    const allow = binding.arg === 'allow';
    if (allow) {
      if (!hasPermission) {
        // Detect if using 'allow' or 'forbid'
        if (binding.modifiers.active) {
          el.classList.add('cursor-not-allowed');
          el.classList.add('opacity-50');
        } else if (binding.modifiers.visible) {
          el.classList.add('hidden');
        } else {
          el.parentNode && el.parentNode.removeChild(el);
        }
      }
    } else if (hasPermission) {
      // Detect if using 'allow' or 'forbid'
      if (binding.modifiers.active) {
        el.classList.add('cursor-not-allowed');
        el.classList.add('opacity-50');
      } else if (binding.modifiers.visible) {
        el.classList.add('hidden');
      } else {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
};
