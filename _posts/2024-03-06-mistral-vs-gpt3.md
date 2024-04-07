---
layout: post
title:  "The Cheapest APIs to Build LLM, AI Applications? (OpenAI API Alternatives)"
date:   2024-03-06 07:00:44 +0530
image: images\2024\api-cost-cover.png
categories: [AI]
---
If you want to build Generative AI applications (or add AI capabilities in your existing Apps), then you'll need to leverage an LLM (Large Language Model) such as GPT-4 by OpenAI.

**But** Developers are no longer limited to just OpenAI's API, as the LLM landscape has seen a surge in open-source alternatives to OpenAI models such as LLama and Mistral 7b.

**So the question is:** Which of the popular LLM APIs are the more cost-effective? Let's try to answer this question.

Here's a cost comparison chart posted by [u/Mother-Ad-2559](https://www.reddit.com/user/Mother-Ad-2559/) on [a Reddit post](https://www.reddit.com/r/LocalLLaMA/comments/195mi89/cost_comparisons_between_openai_mistral_claude/):

<img src="\blog\images\2024\cost-comparisons-between-openai-mistral-claude-and-gemini.webp?raw=true">

Based on this table, the most expensive one of these LLM APIs is GPT-4 with a cost of $10 for every 1 million "Tokens" and the cheapest one is Mistral tiny with $0.15/1M "tokens". What does that mean?

### Tokens

Tokens are essentially pieces of words.

When you input text to an LLM, it gets broken down into these tokens.

But how much text can you generate with 1 million tokens? 100 tokens is approximately 75 words so a millions tokens is about 750000 words.

This should allow you to understand the above chart.

For example, Mistral-7b API allows you to Input 1M tokens for 0.25$ and output 1M tokens for 0.25$

<img src="\blog\images\2024\Mistral-pricing.png?raw=true">

Clearly Mistral models are the more cost effective than gpt-4 and gpt-3.5 turbo. But what is the performance difference between them?

### Mistral 7b vs GPT 3.5 Turbo

* Mistral 7b and GPT 3.5 Turbo are both powerful language models, but they have some key differences in terms of performance and use cases.
    
* Mistral 7b is a 7 billion parameter model, while GPT 3.5 Turbo is a 175 billion parameter model. This means that Mistral 7b has less capacity to generate complex and nuanced language, but it is still capable of generating high-quality text.
    
* In terms of performance, **Mistral 7b is generally faster** than GPT 3.5 Turbo, especially for smaller tasks. This is because it has fewer parameters and requires less computational resources to generate text. GPT 3.5 Turbo, on the other hand, is slower because of its larger size and the increased computational resources required to generate text.
    
* **GPT 3.5 Turbo is well-suited for more complex tasks**, such as generating creative writing, tasks that require a high level of understanding and reasoning, such as legal analysis and medical diagnosis.
    

Both Mistral 7b and GPT 3.5 Turbo are powerful language models with their own strengths and weaknesses. The choice between the two will depend on your specific use case.