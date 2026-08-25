# Team 5: Say It in Emoji

Turn any word or sentence into a compact group of emojis using the JustAnswer LiteLLM endpoint. The model is instructed to preserve meaning, order, sentiment, relationships, and negation while returning emojis only.

## Run it

Requires Node.js 20 or newer. There are no packages to install.

```bash
cp .env.example .env
```

Paste the provided key into `LITELLM_API_KEY` in `.env`, then run:

```bash
npm start
```

Open <http://localhost:3000>. The default model is `gpt-4.1`; if the key exposes a different LiteLLM model alias, update `LITELLM_MODEL`.

## How it works

The browser sends text to the local `/api/emojify` route. `server.js` validates the input, calls the OpenAI-compatible LiteLLM chat-completions endpoint, keeps the API key on the server, and returns a sanitized emoji-only result. It supports both `/chat/completions` and `/v1/chat/completions` proxy layouts.

Run the offline tests with:

```bash
npm test
```

## Changes in round 1

- Replaced the uppercase-only skeleton with an emoji translation interface using a textarea, character counter, loading state, accessible status messages, and keyboard submission.
- Added a Node.js server and `/api/emojify` route so the LiteLLM API key stays off the client.
- Added a meaning-focused emoji-only prompt, input validation, timeout/error handling, endpoint-path fallback, and Unicode-safe output sanitization.
- Added offline tests covering complex emoji sequences, proxy URL formats, successful responses, and malformed non-emoji output.
