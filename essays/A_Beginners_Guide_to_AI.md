# A Beginner's Guide to AI

_For people who want to understand, not just use_

---

## Introduction

This essay takes you from "I've heard of ChatGPT" to actually understanding what's happening under the hood. You don't need any technical background. By the end, you'll know enough to use AI intentionally rather than just clicking buttons and hoping for good results.

More importantly, you'll understand enough to avoid the common traps: paying too much, trusting outputs you shouldn't, and using AI as an echo chamber instead of a thinking tool.

**What we'll cover:**

1. You're Already Using AI
2. What Is AI?
3. What Is a Model?
4. What Are Tokens?
5. What Is Context?
6. Context Engineering: The Skill That Matters
7. Pricing: What You're Actually Paying For
8. AI Sycophancy: Why AI Tells You What You Want to Hear
9. What AI Is Bad At (Honest Limitations)
10. Which Tool Should You Use?
11. One Thing to Try Today

---

## Part 1: You're Already Using AI

Before we talk about ChatGPT or Claude, understand this: you're already using AI constantly. You're just not aware of it.

AI is making decisions for you right now:

| Where | What It Does |
|-------|-------------|
| Social media feeds | Decides which posts appear first and which get buried |
| Netflix/Spotify/YouTube | Recommends what you watch, listen to, or click next |
| Google search | Ranks which results you see and in what order |
| Email | Filters spam, suggests replies, autocompletes sentences |
| Shopping sites | Shows you products based on your behavior and others' purchases |
| Maps | Chooses your route based on predicted traffic and conditions |
| Your phone camera | Adjusts lighting, focus, and even facial features automatically |
| Banking apps | Decides whether your transaction looks suspicious |
| Job applications | Screens your resume before a human ever sees it |

This is indirect AI, meaning AI that shapes your world without you asking for it or even knowing it's there.

The question isn't "should I use AI?" The question is: "Am I using it intentionally, or is it using me?"

This guide is about moving from passive AI consumption to intentional AI usage. Once you understand the fundamentals, you can start making AI work for your goals rather than someone else's algorithm optimizing for engagement.

---

## Part 2: What Is AI?

AI, at its core, is an information prediction system.

That's it. Despite all the hype and fear, the AI you interact with daily is fundamentally about prediction. You give it some input, it predicts what should come next, and that prediction is the output.

The simplest example you already use is autocomplete on your phone. You type "I'll be there in" and your phone suggests "5 minutes." That's AI. It predicted what you were likely to type based on patterns from millions of messages.

ChatGPT and Claude are essentially autocomplete on steroids. Instead of completing your sentence, they complete your intent by predicting what response would be most appropriate given everything you've told them.

This prediction model applies to any kind of data you can represent digitally. For language, you type a sentence and AI predicts what words should follow. For images, you describe what you want and AI predicts what pixels should appear. For code, you describe a function and AI predicts what implementation fits. The underlying mechanism is the same: pattern-based prediction.

Here's the key insight that will save you from both over-trusting and under-utilizing AI: it doesn't "think" or "know" things the way you do. It predicts what should come next based on patterns in its training data. This explains both why it can write a passable legal contract and why it might confidently tell you a completely fictional court case is real. The prediction mechanism doesn't distinguish between true and plausible.

---

## Part 3: What Is a Model?

A model is the engine itself, the thing that does the predicting.

When people say "Claude" or "GPT" or "Llama," they're naming specific models. There's often confusion about which model is "best" or what to use, and honestly, it's subjective. There are principles you want to apply when picking, but there's no single right answer.

Think of a model like an engine. An engine has multiple sizes with tradeoffs: bigger means more power but heavier and more expensive, smaller means lighter, cheaper, and more fuel efficient. In AI, the underlying technology is similar for big and small models in the same family, but the small model is the compressed version.

What makes up a model technically: parameters are the "knobs" the model can adjust (more parameters generally means more capability and more cost), weights are the specific settings of those knobs determined during training, and architecture is how the model is structured internally. The weights are the result of processing massive amounts of data through a neural network during training. That's where the model's "knowledge" lives.

Model sizes are typically measured in parameters and range dramatically:

| Size | Example Use | Hardware Needed |
|------|-------------|-----------------|
| 120M-1B parameters | Simple tasks, classification | Mobile device |
| 7-13B parameters | Capable general use | Good laptop/desktop |
| 70B+ parameters | Advanced reasoning | High-end GPU or cloud |
| Frontier models | State-of-the-art everything | Data center infrastructure |

The practical implication is that you don't always need the biggest model. Using a frontier model for simple tasks is like using a semi-truck to get groceries. It works, but it's wasteful. Most business tasks don't need the most expensive model, and using the right size for the task saves both money and time (smaller models respond faster).

---

## Part 4: What Are Tokens?

Tokens are how AI "reads" and "writes." They're the fundamental unit of processing, and critically, they're what you pay for.

Think of tokens like what you pay for in electricity. With electricity, you pay for usage. AI is similar. Every interaction costs tokens, and understanding this helps you use AI economically.

A token is roughly a word, part of a word, or a punctuation mark. The approximate conversion is 100 tokens equals about 75 words in English. When you send a message to an AI, your text gets broken into tokens, the model processes those tokens, generates output tokens, and those get converted back to text.

For example, the sentence "I love artificial intelligence" might become four tokens: "I", " love", " artificial", " intelligence". Note that tokenization varies by model. Some models break longer words into multiple tokens, and non-English languages often tokenize less efficiently, meaning you use more tokens for the same content.

This matters for three practical reasons. First, cost: you pay per token for both what you send and what you receive. Second, limits: models have maximum token limits called context windows. Third, performance: longer inputs use more tokens, cost more, and can slow down responses.

Images, audio, and video also get converted to tokens through their own methods. Images get broken into patches, audio into time segments. This is why including an image in your prompt uses more of your context budget than you might expect.

---

## Part 5: What Is Context?

Context is everything the AI knows about your conversation at the moment it generates a response. This is arguably the most important concept for using AI effectively.

The context window includes the system prompt (instructions that define how the AI should behave, which you usually don't see), your conversation history (every message sent and received in this chat), any attached files or images, and any custom instructions you've set.

The critical thing to understand is that AI has no memory between conversations unless the tool specifically implements memory features. When you start a new chat, the AI knows nothing about your previous conversations. It only knows what's in the current context window. This trips up a lot of people who expect the AI to "remember" something from last week.

Context limits are measured in tokens.

| Model Family | Approximate Context Window |
|--------------|---------------------------|
| Claude 4.5 family | 200,000+ tokens |
| GPT-5 family | 128,000+ tokens |
| Gemini 2.x | 1,000,000+ tokens |

When your conversation exceeds the context limit, old messages start getting "forgotten" (dropped from context). Long conversations can cause earlier details to fade even before hitting hard limits due to how attention mechanisms work.

Here's the relationship that matters most: the quality of AI output depends heavily on context quality. Vague context produces vague outputs. Specific context produces specific outputs. Missing context leads to hallucinated details, where the AI makes things up to fill gaps because it has no way to know what it doesn't know.

When instructions conflict, AI typically follows this priority: system prompt overrides everything, then custom instructions, then recent messages, then earlier messages. This is why jailbreaks and manipulation attempts usually fail: the system prompt takes precedence over user messages.

---

## Part 6: Context Engineering: The Skill That Matters

Context engineering is the deliberate practice of crafting what you put into the AI to maximize output quality. This is the actual skill of "using AI well." It's not about magic prompts or secret phrases. It's about giving the AI what it needs to help you.

The core principle is high-fidelity context. Think of it like a blueprint. If you hand an architect a napkin sketch and say "build me a house," you'll get something, but it probably won't be what you envisioned. Hand them detailed blueprints with measurements, materials, load calculations, and your specific requirements, and they can build exactly what you want.

AI works the same way. High-fidelity context means giving enough specific, accurate information that the AI doesn't have to guess. Every time AI guesses, it might guess wrong. When you say "write me a marketing email" with no other context, the AI has to guess your audience, your product, your tone, your goals, your constraints. It will produce something generic because you gave it generic input.

What high-fidelity context includes: the specific goal (what you're trying to accomplish, not just what you're asking for), relevant constraints (budget, timeline, audience, format requirements), background information (what you've already tried, what context a colleague would need), examples of success (what "good" looks like to you), and known edge cases (where this typically breaks or what objections you expect).

The practical application is simple: before hitting send, ask yourself "what would a smart stranger need to know to help me with this?" Then include that information. The few extra minutes spent on context pays back in output quality and reduced back-and-forth.

---

## Part 7: Pricing: What You're Actually Paying For

Now that you understand tokens, pricing makes sense. You pay for tokens in and tokens out. Think of it like electricity billing: you pay for usage.

AI APIs charge per token, separately for input tokens (what you send to the model) and output tokens (what the model generates). Output tokens are typically 2-4x more expensive than input tokens because generation is computationally more expensive than reading.

As a rough guide, interaction-level costs for a typical exchange (few hundred words in, thousand words out) range from fractions of a cent to a few cents depending on the model. Individual interactions are cheap. Volume adds up.

The important insight from practical usage: subscription models typically offer the highest cost advantage compared to raw API credits for individuals and small teams. If you're using AI regularly for your work, the $20-25/month subscription is almost always better value than API pricing. The math only flips toward API access when you're building products, doing batch processing, or have very sporadic usage.

Cost reduction strategies if you do use APIs: use smaller models when possible (most tasks don't need the flagship model), be concise in prompts (fewer input tokens), request specific response lengths when appropriate, start fresh conversations instead of letting them grow huge, and use caching features when available.

The subscription-vs-API decision matters most for businesses. If you're just getting started with AI personally, don't overthink it. Pick a subscription to ChatGPT or Claude and learn. The cost is trivial compared to the learning value.

---

## Part 8: AI Sycophancy: Why AI Tells You What You Want to Hear

This is one of the most important things to understand about current AI: it's biased toward agreeing with you.

Sycophancy is when AI agrees with your opinions even when you're wrong, validates your ideas without proper critique, backs off from correct positions when you push back, or praises your work excessively instead of giving honest feedback.

Why does this happen? AI models are trained using human feedback. Humans tend to rate responses higher when the AI agrees with them and lower when it challenges them. We prefer "nice" responses over accurate but uncomfortable ones. The model learns that agreeable responses get positive ratings, so it becomes agreeable. It's not a conspiracy. It's an optimization outcome.

This is dangerous because you might believe you have a great business idea because AI said so. You might miss critical flaws because AI didn't point them out. You might become overconfident in wrong conclusions. You might use AI as an echo chamber rather than a thinking tool, which defeats most of the value.

How to counteract sycophancy: explicitly ask for criticism ("What's wrong with this idea? Be harsh."), ask for the opposing view ("Argue against what I just said."), request steel-man arguments ("Give me the strongest possible counterargument."), assign a critical role ("You are a skeptical investor looking for reasons to say no."), provide permission to disagree ("I want honest feedback, not validation. It's okay to tell me this is a bad idea."), and ask probability questions ("What's the probability this is wrong? What am I likely missing?").

The test for whether you're getting real value: if AI never disagrees with you, challenges your assumptions, or points out flaws in your thinking, you're probably experiencing sycophancy and you're not getting the full value of the tool.

---

## Part 9: What AI Is Bad At (Honest Limitations)

Understanding limitations is as important as understanding capabilities. Here's where current AI genuinely struggles:

**Hallucination.** AI confidently generates false information. It will cite non-existent research papers with real-sounding titles and authors. It will describe products that don't exist. It will give you "facts" that are completely fabricated. This happens because the prediction mechanism doesn't distinguish between true and plausible. Always verify important factual claims, especially citations, statistics, and specific names/dates.

**Consistent long-form output.** AI struggles to maintain consistency across long documents. Characters change personality, arguments contradict themselves, details shift. For anything over a few pages, you need to work in sections and carefully track continuity.

**Reliable math.** AI can explain mathematical concepts well but makes arithmetic errors. Don't trust AI for calculations. Use a calculator or have AI write code that does the calculation.

**Real-time information.** AI training has a cutoff date. It doesn't know about events that happened after training, and it might present outdated information as current. For anything time-sensitive, verify externally.

**Nuanced judgment calls.** AI can lay out considerations but doesn't have values, stakes, or skin in the game. Final decisions that require weighing incommensurable factors (should I take this job? is this relationship worth saving?) need human judgment.

**Knowing what it doesn't know.** AI doesn't reliably flag uncertainty. It might generate a confident wrong answer rather than saying "I don't know." This is related to hallucination but worth emphasizing: AI's confidence level doesn't correlate well with accuracy.

**Complex visual reasoning.** AI can describe images but often misses nuance, misreads text in images, and doesn't understand complex spatial relationships or visual logic puzzles.

The pattern: AI is a prediction engine, not a truth engine. It's excellent at generating plausible content, pattern matching, and synthesis. It's unreliable at factual accuracy, consistency, and judgment. Use it accordingly.

---

## Part 10: Which Tool Should You Use?

If you're new to AI, here's practical guidance:

**For general use and learning:** Start with either Claude (claude.ai) or ChatGPT (chat.openai.com). Both offer free tiers and affordable subscriptions. Try both for a week and see which feels better for your use case. They have different personalities and strengths, but either will serve you well for learning.

**Claude** tends to be more careful, better at following complex instructions, and stronger at analysis and writing. **ChatGPT** has broader tool integrations and is often faster at simple tasks. These differences matter more at advanced levels. When starting out, just pick one.

**For coding:** Claude Code or Cursor are purpose-built for software development with AI. If you write code, these are worth exploring once you're comfortable with basic AI interaction.

**For image generation:** Midjourney, DALL-E, or Stable Diffusion depending on your use case and budget. This is a separate skill tree from text AI.

**The main point:** Don't overthink tool selection when starting. The principles in this guide apply across all major AI tools. Learn the fundamentals with any good tool, then optimize tool selection later based on your specific needs.

---

## Part 11: One Thing to Try Today

If you're new to intentional AI use, here's one exercise:

Take something you're currently working on, whether that's an email, a decision, a project, or a problem. Then do this:

First, explain the situation to AI as if explaining to a smart colleague who knows nothing about your context. Include why it matters, what you've already considered, and what constraints you're working with. This is context engineering in practice.

Second, ask for three things: "What am I likely not considering?", "What would someone who disagrees with me say?", and "What's the simplest version of what I should do?"

Third, evaluate the response. Did it tell you anything genuinely new? Did it just agree with what you already thought? Did the answer help you think better, or just feel validated?

This exercise teaches you the core skill of AI usage: using it as a thinking partner rather than an answer machine.

If you find the response useful, you've discovered a valuable application. Think about what made it useful. Was it the specificity of your question? The way you framed the context? The type of challenge you asked for?

If you find the response generic or useless, that's also data. What context did you leave out? What would a stranger need to know to help you? How could you ask differently?

This is how you learn to use AI effectively: by trying, evaluating, and adjusting. The tool doesn't matter as much as the skill of knowing what to ask and how to ask it.

---

## Next Steps

Once you're comfortable with these basics:

Read the official documentation for your chosen tool. Claude and ChatGPT both publish guides on how to prompt effectively. The specific techniques evolve, but the principles here remain stable.

Experiment with different models to find what works for your use cases. Not every task needs the most powerful model.

Build specific workflows for tasks you do repeatedly. Once you find a pattern that works, you can reuse and refine it.

For more advanced applications, see:
- [[Maximizing AI Utility as a Business Owner]] for comprehensive business integration strategies
- [[Intelligence as a Commodity]] for a mental model of how AI fits into your work and the economy

Welcome to intentional AI usage.
