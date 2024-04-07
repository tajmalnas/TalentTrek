import React from 'react';

// Define the NLux API endpoint
const demoProxyServerUrl = 'https://demo.api.nlux.ai/openai/chat/stream';

// Define the streamAdapter object
export const streamAdapter = {
  streamText: async (prompt, observer) => {
    try {
      const body = { prompt };
      const response = await fetch(demoProxyServerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        observer.error(new Error('Failed to connect to the server'));
        return;
      }

      if (!response.body) {
        return;
      }

      // Read a stream of server-sent events
      const reader = response.body.getReader();
      const textDecoder = new TextDecoder();
      let doneReading = false;

      while (!doneReading) {
        const { value, done } = await reader.read();
        if (done) {
          doneReading = true;
          continue;
        }

        const content = textDecoder.decode(value);
        if (content) {
          observer.next(content);
        }
      }

      observer.complete();
    } catch (error) {
      observer.error(error);
    }
  }
};
