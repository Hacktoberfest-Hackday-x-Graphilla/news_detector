# Local Gemma 4

Gemma 4 can provide image descriptions without a cloud API key. Install
[Ollama](https://ollama.com/download), start it, and download the model:

```powershell
ollama pull gemma4:e2b
```

The model download is several gigabytes. The server defaults to Ollama at
`http://127.0.0.1:11434` with model `gemma4:e2b`; override these with
`OLLAMA_BASE_URL` or `OLLAMA_GEMMA_MODEL` in `.env.local` if needed.

With no SightEngine or Hive credentials configured, image uploads return an
`INCONCLUSIVE` result and a clearly labeled Gemma visual description. Gemma
does not verify authenticity or replace a forensic detector. To receive an
authoritative detector verdict, configure SightEngine or Hive credentials in
`.env.local`. Video analysis still requires `HIVE_API_KEY`.