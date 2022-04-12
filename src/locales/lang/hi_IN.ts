import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/hi_IN';

const modules = import.meta.globEager('./hi_IN/**/*.ts');
export default {
  message: {
    ...genMessage(modules, 'hi_IN'),
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'hi_IN',
};
