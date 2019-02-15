export class RequestBuilder {
    params = {};
    constructor(params?) {
        params = Object.assign(this.params, params);
    }

    album(v) {
        this.params['album'] = v;
        return this;
    }

    albumId(v) {
        this.params['albumId'] = v;
        return this;
    }

    song(v) {
        this.params['song'] = v;
        return this;
    }

    songId(v) {
        this.params['songId'] = v;
        return this;
    }

    artist(v) {
        this.params['artist'] = v;
        return this;
    }

    artistId(v) {
        this.params['artistId'] = v;
        return this;
    }
}