# Intelligence as a Commodity

_Once capability crosses a threshold, workflow dominates outcomes_

---

## Introduction

Let me start with a disclaimer: I haven't found a perfect analogy for AI as a commodity. The closest simple comparison I have is **water**.

If we want to understand how AI might change an individual's life, it helps to look at how the distribution of other commodities (like water) changed quality of life and total consumption. There's a common saying that "having more means using more." That isn't always true, but for this essay we'll assume it's mostly true—with one critical condition:

**Each use-case requires its own dedicated delivery environment.**

That's the thesis. The rest of this essay explores what that means and why it matters.

---

## Part 1: Water—One Commodity, Many Faucets

We can simplify how we use water by splitting it into categories: **productivity, hygiene, and entertainment.**

**Productivity**: In the kitchen, you might use water to make iced tea. You could also buy bottled water, which people think of differently—but it's still "water" as the underlying commodity.

**Hygiene**: Wash your hands, shower, wash dishes.

**Entertainment**: Hot tubs, pools.

The important point: water is everywhere, but you don't use it the same way everywhere. The **delivery mechanism** matters.

You don't fill a cup of water in the shower, and you don't shower in your sink. Both are *possible*, but neither is optimal. The difference isn't the water—it's the **faucet + environment** designed for the job.

---

## Part 2: The Mapping

Here's the core framework:

| Water Concept | AI Equivalent |
|---------------|---------------|
| Water | The model (underlying intelligence supply) |
| Faucet | The interface/workflow (how you access and apply the model) |
| Plumbing | Context assembly, retrieval, tool-calling, constraints, feedback loops |
| Water pressure | Model capability ceiling |
| Water quality | Output reliability and accuracy |

When thinking about "consuming AI," it's easy to confuse what a third-party tool (like a wrapper app) is doing versus what the underlying model is doing.

A good thing to remember:

> **A faucet is only a faucet. It needs water flowing through it.**

The faucet does *not* create the water. It can shape delivery—and sometimes it can *change the experience* by filtering, mixing, or packaging it—but the source is still water.

For AI, that means:
- You generally can't "magically upgrade" a weak model into a strong one just by changing the UI
- But you *can* get better outcomes by changing the workflow: better prompting, retrieval of relevant info, tools, checks, structure, memory, and automation

**A clarification on "the model matters less":**

People will correctly object: "No, the model matters a lot." And they're right—up to a point.

The more precise claim: **Once capability crosses a threshold for your use case, workflow dominates outcomes.**

If the model can't do the task at all, no workflow saves you. But once the model is capable enough, the difference between good and bad results comes down to how you structure the interaction—context, verification, iteration, and integration.

Most frontier models have crossed that threshold for most business tasks. That's why workflow now matters more than marginal model differences.

---

## Part 3: Three Layers People Confuse

It helps to separate three layers that often get blurred together:

**Layer 1: Supply (The Model)**
- Raw capability—the intelligence ceiling
- What the model can theoretically do

**Layer 2: Delivery (The Interface)**
- How you interact with the model
- Chat interface, API, embedded tool, autocomplete
- User experience and accessibility

**Layer 3: Plumbing (The Infrastructure)**
- Context assembly and retrieval
- Tool-calling and integrations
- Constraints and guardrails
- Feedback loops and evaluations
- Memory and state management

When people say "interfaces don't matter," they're usually talking about the **supply** layer: the model's capability ceiling dominates. A bad model with a beautiful UI is still a bad model.

When people say "the interface *is* the product," they're usually talking about **adoption and reliability**: most users don't experience "the model" directly—they experience the delivery + plumbing.

**Both statements are true simultaneously:**
- At the capability level, the model dominates
- At the adoption level, the faucet (delivery + plumbing) often dominates

This is why companies building "AI wrappers" can succeed despite not owning the underlying model—they're selling delivery and plumbing, not water.

---

## Part 4: The Trust Layer—Where Most AI Implementations Die

Here's something most AI commentary underweights:

**Abundant intelligence doesn't remove uncertainty. It moves the bottleneck to verification and responsibility.**

The question used to be: "Can AI do this task?"

Now the question is: "Can we trust this output enough to act on it? And who's accountable if it's wrong?"

This is why most AI wrappers die in production. They can generate outputs. They can't provide:
- **Audit trails** (who did what, when, with what inputs)
- **Access controls** (who can use which capabilities)
- **Approval workflows** (human checkpoints before action)
- **Accountability chains** (who's responsible when it breaks)

This is why enterprises buy boring systems. The company with the best model doesn't win enterprise deals. The company that can prove governance, compliance, and recourse wins enterprise deals.

**This is where the real moat forms:** The competitive advantage isn't "who can generate outputs." It's "who can safely act on outputs."

This applies across domains:
- In finance: Can you trust this analysis enough to trade on it?
- In healthcare: Can you trust this recommendation enough to act on it?
- In legal: Can you trust this research enough to cite it?
- In operations: Can you trust this automation enough to let it run unsupervised?

**The trust stack:**

To move from "AI generated this" to "we can act on this," you need:

1. **Provenance:** Where did this output come from? What inputs created it?
2. **Verification:** How do we know it's correct? What checks were applied?
3. **Accountability:** Who approved it? Who's responsible if it's wrong?
4. **Recourse:** What happens when it fails? How do we recover?

Most individual users skip this stack entirely. Most enterprises require all of it. The gap explains why enterprise AI adoption lags consumer experimentation.

---

## Part 5: What Is a "Faucet" in AI Terms?

**A faucet is the way you access and apply the model to a specific job.** It can be simple or complex.

**The simplest faucet (that most people don't think of as "AI"):**
- **Autocomplete**—it shows up exactly where you need it, at the moment you need it
- This is invisible AI, embedded in workflow, requiring zero context-setting
- It's the platonic ideal of a faucet: you don't think about it, you just use it

**The most common faucet:**
- A generic chat interface (ChatGPT, Claude)
- General-purpose, handles anything, optimized for nothing

**Specialized faucets:**
- **Claude Code**—an agentic coding interface with file system access, tool-calling, and iterative execution
- **Cursor**—an IDE with AI deeply integrated into the editing workflow
- **Midjourney**—optimized entirely for image generation with its own prompt language

**Meta-faucets (faucets for building faucets):**

This is the insight that changed how I think about tooling: Claude Code isn't just a faucet—it's a **faucet for faucets**. It's a way to build and run more workflows on top of the same underlying intelligence.

When you can script your own AI pipelines, you stop being a consumer of faucets and become a builder of them. API access with custom scripts does the same thing. This is where leverage compounds.

**Workflow-native AI (the emerging pattern):**

The future isn't "go to a chat interface to use AI." It's AI embedded where work already happens:
- In your inbox (drafting, triaging, summarizing)
- In your IDE (writing, reviewing, debugging)
- In your CRM (lead scoring, follow-up drafting, data enrichment)
- In your finance tools (reconciliation, anomaly detection, reporting)

The "expert" move isn't finding the best chat interface. It's building or adopting a faucet layer that matches your specific workflow.

### Bottled Water and Wrappers

Remember bottled water:
- The underlying product is still water
- But it's processed, packaged, branded, and distributed differently
- The consumer pays for convenience and delivery, not a different substance

That's similar to a lot of AI wrappers:
- The wrapper isn't the intelligence itself
- It's packaging + workflow + distribution around a model
- Value comes from making the model easier to use for a specific job

---

## Part 6: How Many Faucets Does a Person Need?

In a house, it's obvious why you need multiple faucets. The commodity is the same (water), but the delivery mechanism changes based on the job:

- **Bathroom:** sink, shower, bathtub
- **Kitchen:** sink, dishwasher hookup
- **Laundry:** washer hookup
- **Outside:** hose spigot

You're not asking "how many faucets is the correct number?" in the abstract. You add faucets because you have repeated tasks that deserve a dedicated interface.

**AI works the same way.**

Most people are effectively living in a "one-faucet house":
- They use a generic interface (ChatGPT, Claude)
- And maybe a couple niche tools (image/video models like Midjourney, Sora, Veo)

This is like having one sink and trying to do everything in it. It works, but it's not optimal.

### Two User Types (simplified)

**Power users** (high usage, not necessarily "better"):
- Software engineers
- AI marketers / operators
- Anyone using AI for a majority of their work
- They treat each model or capability as a building block for specific routines

**Average consumers** (low usage):
- Rarely use AI
- Use it mostly for curiosity or entertainment
- Don't trust it for "real work" or serious thinking

**Is there a magic number of faucets?**

No. The "right" number depends on:
- How much work you do
- What domains you operate in
- Which tasks you repeat often enough to justify a dedicated workflow

My prediction is that the number of faucets per person **might shrink over time** as generic interfaces absorb more specialized workflows. But in the near term, most people are under-tooled: they're trying to do too many different jobs through one interface.

---

## Part 7: One-Faucet vs. Two-Faucet Living

If you do everything through one generic chat, you tend to get:
- Inconsistent output quality
- Repeated re-explaining of goals and constraints
- "Mostly right" answers that you still have to sanity-check
- Context that drifts as conversations get long

A small upgrade is to split into two repeatable faucets:

**Faucet 1: Build Work (coding, systems, concrete outputs)**
- Fixed repository context
- Tests as a feedback loop
- Tool-calling for running, diffing, and verifying
- Clear success criteria (it works or it doesn't)
- Claude Code is the current best tool for this

**Faucet 2: Thinking Work (writing, research, decisions)**
- Clear claims and constraints upfront
- Retrieval and citations when needed
- Critique step before accepting final output
- Emphasis on reasoning, not just answers

Same underlying "water," but different delivery and plumbing—and the experience becomes more reliable.

---

## Part 8: The Class Divide in AI Access

Here's something most commentary on AI misses:

**AI access is democratizing, but workflow sophistication is the new moat.**

Everyone can access frontier models for $20/month. That's the "water" becoming cheap and abundant. But:

- Large companies build custom faucets with proprietary plumbing
- Small businesses and individuals get the generic chat interface
- The gap isn't intelligence anymore—it's infrastructure

A Fortune 500 company might have:
- Custom fine-tuned models
- RAG pipelines connected to their internal knowledge base
- Automated workflows that trigger AI on specific events
- Evaluation systems that catch errors before they reach customers
- Audit trails and compliance logging
- Approval workflows and access controls

A solo business owner has:
- ChatGPT or Claude
- Maybe some saved prompts
- Maybe Claude Code if they're technical

Same underlying water. Radically different plumbing. The outcomes diverge accordingly.

**This is why "learning to build faucets" is becoming a valuable skill.** The people who can create custom workflows—even simple ones—gain leverage that generic users don't have.

---

## Part 9: When Chaining Faucets Helps vs. Hurts

Adding more steps (or more "faucets in a pipeline") is not automatically better or worse.

**More steps help when each step has a clear job:**
- Plan -> Draft -> Critique -> Revise
- Research -> Summarize -> Pressure-test -> Finalize
- Generate -> Evaluate -> Filter -> Present

Each step reduces ambiguity and catches errors that the previous step might have introduced.

**More steps hurt when the pipeline adds coordination cost:**
- More context to maintain across steps
- More chances to introduce errors or lose information
- More "telephone game" distortion as outputs become inputs
- More tokens spent on overhead rather than value

**The rule is simple:**

Don't ask "how many faucets should I have?"

Ask: **"Is this use-case worth a faucet?"**

A use-case is faucet-worthy when:
1. You do it frequently (weekly or more)
2. It matters (errors have real consequences)
3. AI can do it faster or better with a consistent workflow
4. The setup cost is justified by repeated use

And just as importantly: **some problems don't need to be solved at all.** A big part of "AI literacy" is recognizing made-up work, unnecessary optimization, and tasks that don't deserve token spend.

---

## Part 10: Where the Metaphor Breaks Down

No analogy is perfect. Here's where water/faucet stops being useful:

**Water is simple; AI is complex.** Water has consistent properties. AI outputs vary based on context, prompt, temperature, and model state. You can't "test" water the way you can test AI outputs.

**Water doesn't hallucinate.** When you turn on a faucet, water comes out. When you prompt AI, you might get confident nonsense. The verification burden is fundamentally different.

**Water infrastructure is static; AI infrastructure evolves.** Your plumbing doesn't improve every six months. Your AI workflows might be obsolete in a year.

**Water usage doesn't create dependency risk.** If you outsource all your mental work to AI, you risk losing the ability to do it yourself. Water doesn't atrophy your skills.

The metaphor is useful for thinking about delivery mechanisms and workflow design. It's less useful for thinking about trust, verification, and long-term capability development.

---

## Part 11: Second-Order Effects

These are the non-obvious implications of abundant intelligence:

**Synthetic abundance creates authenticity premiums.** When everything can be AI-generated, real humans, real provenance, and smaller trusted channels become more valuable. The scarcity shifts from "who can produce content" to "who can be trusted."

**Content inflation causes attention deflation.** Everything is well-written now. Everything looks polished. Nothing stands out on polish alone. The signal-to-noise ratio collapses, and attention becomes harder to capture.

**Deskilling and dependency.** People are outsourcing judgment, not just drafts. This creates efficiency in the short term and fragility in the long term. The ability to evaluate AI output is becoming rarer even as it becomes more important.

**Arms race on persuasion.** Persuasion is becoming cheaper and more automated. This will eventually force platforms and regulators to respond—identity requirements, provenance systems, paid distribution gates.

---

## Part 12: Why This Matters for Capturing Value

My bet is that it will become a major advantage to be able to build "faucets"—meaning: build interfaces and workflows that apply AI to real use-cases that save time and increase leverage.

**On the individual side:**
- People who can construct reliable workflows will outperform those who can't
- The skill isn't "prompting"—it's understanding how to structure context, feedback, and verification
- This compounds: each good faucet you build makes the next one easier

**On the business side:**

I'm skeptical that it's durable to be *only* a generic "AI interface" company long-term. Some will survive, but many will be competed down unless they have at least one of:
- **Proprietary distribution** (built-in user base)
- **Proprietary data** (information others can't access)
- **Deep vertical workflow lock-in** (specific to an industry or job)
- **Regulatory or operational moats** (compliance, integrations)
- **Trust infrastructure** (verification, audit, accountability systems)

The winners will likely be either:
1. The model providers themselves (Anthropic, OpenAI, Google)
2. Companies with irreplaceable plumbing (Stripe for payments, Salesforce for CRM data)
3. Niche players who own a specific workflow deeply
4. Trust/verification layer providers (the emerging category)

**Where I'm placing my bets:**

I'm building faucets, not wrappers. I'm investing in workflows that would still be valuable even if the underlying model changes. I'm treating verification and trust as first-class problems, not afterthoughts.

---

## Part 13: Questions Worth Asking Yourself

Before posing these to you, here's how I'd answer them:

**Is intelligence as a commodity inelastic?**

Partially. There's a baseline of AI usage that becomes essential (like water for hygiene), but discretionary usage fluctuates with cost and perceived value. For businesses, AI is becoming inelastic for certain functions—you can't compete without it.

**How does intelligence as a commodity change access to information—and who benefits most?**

It democratizes access to *answers* but not to *judgment*. Everyone can get information; fewer people know which information matters. People with existing expertise benefit most because they can evaluate and apply AI outputs effectively.

**What are your top 3 repeated "mental chores," and which are faucet-worthy?**

For me: (1) code debugging and iteration—absolutely faucet-worthy, (2) research synthesis—faucet-worthy with caveats, (3) email/communication drafting—probably not worth a dedicated faucet, generic chat is fine.

**If you had to cut your AI usage down to two faucets, which two would you keep—and why?**

I'd keep Claude Code for build work and a general chat interface for thinking work. Everything else is optimization.

Now—how would you answer these?

---

## Conclusion

The model is the water. The interface is the faucet. The infrastructure is the plumbing. And increasingly, the bottleneck is the **trust layer**.

Most people focus on which water is best (GPT vs. Claude vs. Gemini) when they should be asking:
- Do I have the right faucets for my repeated tasks?
- Is my plumbing set up to make those faucets reliable?
- Can I verify outputs before acting on them?
- Am I trying to shower in my sink?

The intelligence is becoming abundant. The skill is in the delivery—and the judgment to know when to trust what comes out.

---

## Related Essays

- [[Maximizing AI Utility as a Business Owner]] — Practical implementation of workflow design
- [[Multi-agent Network Orchestration]] — Building complex faucet pipelines
- [[Defensibility and Moats in AI Work]] — Business implications of the trust layer
- [[AI and Attention Markets]] — Second-order effects on distribution and attention
