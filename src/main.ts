import { bootTdlConversationIssue } from './examples/tdl-conversation-issue/tdl-conversation-issue.ts';

async function boot(): Promise<void> {
  await bootTdlConversationIssue();
}

boot();
