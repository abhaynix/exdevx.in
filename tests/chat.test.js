import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { after, before, test } from 'node:test';
import handler from '../api/chat.js';

const originalApiKey = process.env.GEMINI_API_KEY;

before(() => {
  process.env.GEMINI_API_KEY = 'test-key';
});

after(() => {
  if (originalApiKey === undefined) delete process.env.GEMINI_API_KEY;
  else process.env.GEMINI_API_KEY = originalApiKey;
});

function request(method, body) {
  const req = new EventEmitter();
  req.method = method;
  if (body !== undefined) req.body = body;
  req.resume = () => {};
  return req;
}

function response() {
  return {
    statusCode: 0,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    end(value) { this.body = JSON.parse(value); },
  };
}

async function invoke(req) {
  const res = response();
  await handler(req, res);
  return res;
}

test('rejects unsupported methods', async () => {
  const res = await invoke(request('GET'));
  assert.equal(res.statusCode, 405);
});

test('rejects null and malformed JSON bodies', async () => {
  assert.equal((await invoke(request('POST', 'null'))).statusCode, 400);
  assert.equal((await invoke(request('POST', '{'))).statusCode, 400);
});

test('rejects oversized parsed request bodies and messages', async () => {
  assert.equal((await invoke(request('POST', { message: 'a'.repeat(100_001) }))).statusCode, 413);
  assert.equal((await invoke(request('POST', { message: 'a'.repeat(2_001) }))).statusCode, 400);
});

test('rejects oversized conversation history', async () => {
  const messages = Array.from({ length: 21 }, () => ({ role: 'user', content: 'Hello there.' }));
  const res = await invoke(request('POST', { message: 'Hello there.', messages }));
  assert.equal(res.statusCode, 400);
});

test('rejects oversized streamed request bodies', async () => {
  const req = request('POST');
  const pending = invoke(req);
  req.emit('data', Buffer.alloc(100_001));
  const res = await pending;
  assert.equal(res.statusCode, 413);
});
