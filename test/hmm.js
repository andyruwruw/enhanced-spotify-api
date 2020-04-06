const { Playlist, Tracks } = require('../src/index');
const { generateWrapper } = require('./TestFunctions');

async function test() {
    try {
        let wrapper = await generateWrapper();
        let playlist = new Playlist("1PJ9hUPj97yqqQdf04cxcB");
        console.log(await playlist.getTracks(wrapper));
    } catch (error) {
        console.trace(error);
    }
}

test();