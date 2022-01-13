import Vuex from 'vuex';

import userModule from './user';

export default new Vuex.Store({
  modules: {
    userModule,
  },
});
