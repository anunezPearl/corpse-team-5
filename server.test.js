import test from 'node:test';
import assert from 'node:assert/strict';
import { completionUrls, sanitizeEmojiOutput, translateWithLiteLLM } from './server.js';

test('keeps complex emoji graphemes and removes prose', () => {
  assert.equal(sanitizeEmojiOutput('Here: 👨‍👩‍👧‍👦 ❤️ 👉🏽!'), '👨‍👩‍👧‍👦 ❤️ 👉🏽');
});

test('supports both common LiteLLM completion paths', () => {
  assert.deepEqual(completionUrls('http://proxy.local'), [
    'http://proxy.local/chat/completions',
    'http://proxy.local/v1/chat/completions'
  ]);
  assert.deepEqual(completionUrls('http://proxy.local/v1'), ['http://proxy.local/v1/chat/completions']);
});

test('translates through an OpenAI-compatible response without exposing prose', async () => {
  let requestBody;
  const fetchImpl = async (_url, options) => {
    requestBody = JSON.parse(options.body);
    return new Response(JSON.stringify({
      choices: [{ message: { content: 'The answer is ❤️ 👉' } }]
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  };

  const emojis = await translateWithLiteLLM('I love you', {
    baseUrl: 'http://proxy.local',
    apiKey: 'test-key',
    model: 'test-model'
  }, fetchImpl);

  assert.equal(emojis, '❤️ 👉');
  assert.equal(requestBody.model, 'test-model');
  assert.equal(requestBody.messages.at(-1).content, 'I love you');
});

test('rejects an upstream response with no emojis', async () => {
  const fetchImpl = async () => new Response(JSON.stringify({
    choices: [{ message: { content: 'No emoji available' } }]
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  await assert.rejects(
    translateWithLiteLLM('hello', { baseUrl: 'http://proxy.local', apiKey: 'test-key' }, fetchImpl),
    /did not return an emoji/
  );
});
