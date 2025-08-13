// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {assert} = require('chai');
const {describe, it} = require('mocha');
const proxyquire = require('proxyquire').noCallThru();

describe('vertexai-express-mode', () => {
  it('should call generateContentStream and return the mocked response', async function () {
    this.timeout(10000);

    const mockGenerateContentStreamResult = {
      text: 'Bubble sort works by repeatedly swapping adjacent elements until sorted.',
    };

    class MockModels {
      async generateContentStream() {
        return mockGenerateContentStreamResult;
      }
    }

    class MockGoogleGenAI {
      constructor() {
        this.models = new MockModels();
      }
    }

    const sample = proxyquire('../express-mode/api-key-example.js', {
      '@google/genai': {GoogleGenAI: MockGoogleGenAI},
    });

    const response = await sample.generateContent('FAKE_API_KEY');

    assert.strictEqual(response.text, mockGenerateContentStreamResult.text);
  });
});
