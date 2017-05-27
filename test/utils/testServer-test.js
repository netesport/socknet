import http from 'http';
import express from 'express';

import WSock from '../../src';

export const config = {
  http: http.Server(express()),
  port: 9999,
};

const wsock = WSock(config);

class Events {
  constructor(wsock) {
    this.wsock = wsock;
  }

  add(event) {
    this.wsock.on(event);
  }

  session(fnPtr) {
    this.wsock.session(fnPtr);
  }
}

export class TestNamespace extends Events {
  constructor(name) {
    const namespace = wsock.createNamespace(name);
    super(namespace);
  }
}

export default class TestServer extends Events {
  constructor() {
    super(wsock);
    this.namespaces = {};
  }

  namespace(name) {
    this.namespaces[name] = new TestNamespace(name);
    return new TestNamespace(name);
  }

  start(callback) {
    wsock.start(callback);
  }
}