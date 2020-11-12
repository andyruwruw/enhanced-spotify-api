import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#222',
                secondary: '#333',
                background: '#4f37ac',
                gradient1: '#0854a9',
                gradient2: '#4f37ac',
                code: '#EFEFEF',
            },
        }
    }
});
