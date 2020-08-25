// From spotify-web-api
// Used to fix endpoints that were broken and add new endpoints not yet added.

function Request(builder) {
  if (!builder) {
    throw new Error('No builder supplied to constructor');
  }

  this.host = builder.host;
  this.port = builder.port;
  this.scheme = builder.scheme;
  this.queryParameters = builder.queryParameters;
  this.bodyParameters = builder.bodyParameters;
  this.headers = builder.headers;
  this.path = builder.path;
}

Request.prototype._getter = function _getter(key) {
  // eslint-disable-next-line func-names
  return function () {
    return this[key];
  };
};

Request.prototype.getHost = Request.prototype._getter('host');

Request.prototype.getPort = Request.prototype._getter('port');

Request.prototype.getScheme = Request.prototype._getter('scheme');

Request.prototype.getPath = Request.prototype._getter('path');

Request.prototype.getQueryParameters = Request.prototype._getter(
  'queryParameters',
);

Request.prototype.getBodyParameters = Request.prototype._getter(
  'bodyParameters',
);

Request.prototype.getHeaders = Request.prototype._getter('headers');

Request.prototype.getURI = function getURI() {
  if (!this.scheme || !this.host || !this.port) {
    throw new Error('Missing components necessary to construct URI');
  }
  let uri = `${this.scheme}://${this.host}`;
  if (
    (this.scheme === 'http' && this.port !== 80)
    || (this.scheme === 'https' && this.port !== 443)
  ) {
    uri += `:${this.port}`;
  }
  if (this.path) {
    uri += this.path;
  }
  return uri;
};

Request.prototype.getURL = function getURL() {
  const uri = this.getURI();
  if (this.getQueryParameters()) {
    return uri + this.getQueryParameterString(this.getQueryParameters());
  }
  return uri;
};

// eslint-disable-next-line consistent-return
Request.prototype.getQueryParameterString = function getQueryParameterString() {
  const queryParameters = this.getQueryParameters();
  if (queryParameters) {
    return (
      `?${
        Object.keys(queryParameters)
          .filter((key) => queryParameters[key] !== undefined)
          .map((key) => `${key}=${queryParameters[key]}`)
          .join('&')}`
    );
  }
};

Request.prototype.execute = function execute(method, callback) {
  if (callback) {
    method(this, callback);
    return;
  }
  const _self = this;

  // eslint-disable-next-line consistent-return
  return new Promise(((resolve, reject) => {
    method(_self, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  }));
};

function Builder() {}

Builder.prototype._setter = function _setter(key) {
  // eslint-disable-next-line func-names
  return function (value) {
    this[key] = value;
    return this;
  };
};

Builder.prototype.withHost = Builder.prototype._setter('host');

Builder.prototype.withPort = Builder.prototype._setter('port');

Builder.prototype.withScheme = Builder.prototype._setter('scheme');

Builder.prototype.withPath = Builder.prototype._setter('path');

Builder.prototype._assigner = function _assigner(key) {
  // eslint-disable-next-line func-names
  return function () {
    for (let i = 0; i < arguments.length; i += 1) {
      // eslint-disable-next-line prefer-rest-params
      this[key] = this._assign(this[key], arguments[i]);
    }
    return this;
  };
};

Builder.prototype.withQueryParameters = Builder.prototype._assigner(
  'queryParameters',
);

Builder.prototype.withBodyParameters = Builder.prototype._assigner(
  'bodyParameters',
);

Builder.prototype.withHeaders = Builder.prototype._assigner('headers');

Builder.prototype.withAuth = function withAuth(accessToken) {
  if (accessToken) {
    this.withHeaders({ Authorization: `Bearer ${accessToken}` });
  }
  return this;
};

Builder.prototype._assign = function _assign(src, obj) {
  if (obj && Array.isArray(obj)) {
    return obj;
  }
  if (obj && Object.keys(obj).length > 0) {
    return Object.assign(src || {}, obj);
  }
  return src;
};

Builder.prototype.build = function build() {
  return new Request(this);
};

module.exports.builder = function builder() {
  return new Builder();
};
