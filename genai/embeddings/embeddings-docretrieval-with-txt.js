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

// [START googlegenaisdk_embeddings_docretrieval_with_txt]
const {GoogleGenAI} = require('@google/genai');

const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'global';

async function generateContent(
  projectId = GOOGLE_CLOUD_PROJECT,
  location = GOOGLE_CLOUD_LOCATION
) {
  const ai = new GoogleGenAI(projectId);

  const prompt = [
    "How do I get a driver's license/learner's permit?",
    "How long is my driver's license valid for?",
    "Driver's knowledge test study guide",
  ];

  const response = await ai.models.embedContent({
    model: 'gemini-embedding-001',
    contents: prompt,
    config: {
      taskType: 'RETRIEVAL_DOCUMENT', // Optional
      outputDimensionality: 3072,  // Optional
      title: "Driver's License"  // Optional
    }
  });

  console.log(response);

  return response;
}
// [END googlegenaisdk_embeddings_docretrieval_with_txt]

module.exports = {
  generateContent,
};
