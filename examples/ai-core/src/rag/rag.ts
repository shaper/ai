import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import dotenv from 'dotenv';
import { bindLanguageModelV1Middleware } from './bind-language-model-v1-middleware';
import { yourRagMiddleware } from './your-rag-middleware';

dotenv.config();

async function main() {
  const result = await streamText({
    model: bindLanguageModelV1Middleware({
      model: openai('gpt-4o'),
      middleware: yourRagMiddleware,
    }),
    prompt: 'What cities are in the United States?',
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log();
  console.log('Token usage:', await result.usage);
  console.log('Finish reason:', await result.finishReason);
}

main().catch(console.error);
