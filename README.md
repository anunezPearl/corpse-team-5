# Team 5: Say It in Emoji

Turn any word or sentence into a compact group of emojis — but now with hidden meaning underneath. A dual-layer system where the emojis appear innocent to the censor (the warden), but decode into a slightly different truth that was really meant all along.

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

## Changes in round 2

**The Emoji Gulag: dual-layer hidden messages.**

- Added `/api/decode` endpoint: sends emojis to the LLM with a prompt asking "what was really meant by these?" to extract the hidden truth.
- Redesigned UI as a Soviet watchtower aesthetic: dark theme, typewriter font, surveillance camera indicator (📹), red stamp animation on encode.
- Added **Warden's Log** sidebar (left panel): localStorage-backed ledger of all encode/decode pairs, showing original text, emojis, and decoded hidden meaning.
- Rewrote prompts:
  - **ENCODE_PROMPT** instructs the LLM to hide forbidden meaning in innocent-looking emojis, as if smuggling a message past a censor.
  - **DECODE_PROMPT** asks the LLM to reverse-engineer what was "really meant" by those emojis, extracting the hidden truth.
- Two-stage UI flow: Stage 1 (Encode) takes political manifesto text and produces emojis; Stage 2 (Decode) extracts the hidden meaning. All localStorage, no server-side storage.
- Example: input "We will be free" → encodes to "🔗 🕊️ 💨" (chains, dove, wind) → decodes to "I long for freedom and escape."

## Changes in round 3

**Tone: playful and unhinged, with a Disney needle drop.**

- Rewrote `DECODE_PROMPT` so the "hidden truth" comes back gleeful and over-the-top instead of somber, and works in a quote from a Disney character whenever it can make one fit.
- Bumped the decode response's token budget (80 → 140) so the reveal has room for the extra flair.
- Encoding is unchanged — only how the decoded message reads is different now.
- Example: input "We will be free" → still encodes to "🔗 🕊️ 💨" → now decodes to something like "Let it go, comrade — those chains were never gonna hold you, hakuna matata style!"

## Next up

- Multiplayer mode: two users submit text, race to encode/decode each other's messages correctly.
- A real historical Gulag archive: real prisoner manifestos with their hidden-meaning encodings.
- Leaderboard of fastest decoders (persisted server-side).
- Audio: Shostakovich motif plays when a message is successfully intercepted (same system as Team 4).
