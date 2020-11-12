import Vue from 'vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueHighlightJS from 'vue-highlight.js';
import App from './App';

import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';

VueHighlightJS.install(Vue, {
	languages: {
		bash,
		javascript,
	}
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
