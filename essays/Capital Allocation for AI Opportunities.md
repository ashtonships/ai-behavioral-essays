## Introduction: The Infinite Opportunity Problem

Every week, I encounter at least three AI applications that could genuinely improve my business. A new code generation workflow. A client communication automation. A trading signal enhancement. A content pipeline. Each one is real, each one has merit, and each one would require time, money, and mental bandwidth I don't have unlimited supplies of.

This is the new problem. It's not "can AI help with X?"—the answer is almost always yes. The problem is: "Should I pursue this AI opportunity given everything else I could do instead?"

The cost of spreading thin is brutal. I've watched myself start a custom RAG system for client documentation, abandon it at 60% completion when a new voice automation caught my attention, then circle back three months later having lost all context. The switching cost alone probably consumed more hours than finishing the original project would have.

What makes AI opportunities particularly treacherous is that they all feel urgent. The technology moves fast enough that waiting feels like falling behind. But chasing everything guarantees you catch nothing.

This essay is my framework for these decisions. Not a rigid system—I don't think rigid systems work for resource allocation in fast-moving domains—but a set of questions and heuristics that force me to think clearly before committing.

---

## Part 1: The Three Capitals

When I think about resources for AI work, I break them into three distinct pools: time, money, and attention. They're related but not interchangeable.

**Time capital** is the raw hours available for AI-related work. For me, that's maybe 15-20 hours per week outside of client deliverables. Some of those hours are high-quality (morning, fresh, uninterrupted) and some are low-quality (evening, tired, fragmented). Not all hours are equal.

**Financial capital** is straightforward: money available for API costs, tool subscriptions, infrastructure, and potentially hiring help. I track this monthly. Your actual budget will depend on your business, but the categories are typically: primary AI subscription (Claude Code, etc.), API overflow costs, and other tools.

Is this a significant expense? For a solo business, it typically represents a small percentage of gross revenue—comparable to what you might spend on hosting and domains. The productivity gain has to justify that slice.

**Attention capital** is the hardest to quantify but often the most constrained. This is cognitive bandwidth—the capacity to learn new things, hold complex systems in working memory, and make good decisions. It depletes faster than time passes. Four hours of deep technical work might consume an entire day's attention capital.

**Why they're not fungible:**

The tempting assumption is that you can convert between these freely. Have money? Buy time by hiring. Have time? Save money by doing it yourself. But the conversions are lossy.

Hiring someone for AI work requires attention capital to find them, brief them, and verify their output. The trust layer problem from [[Intelligence as a Commodity]] applies to humans too. Building something yourself saves money but consumes time and attention. Buying a tool saves time and attention but costs money and introduces dependency.

| Capital Type | Replenishes | Typical Constraints | Can Convert To |
|--------------|-------------|---------------------|----------------|
| Time | Fixed rate (24h/day) | Client work, life obligations | Attention (via rest), Money (via work) |
| Money | Variable (revenue dependent) | Runway, opportunity cost | Time (via hiring), Attention (via better tools) |
| Attention | Sleep, breaks, reduced complexity | Cognitive limits, stress, context switching | Nothing directly |

**Current inventory assessment:**

Before allocating, you need to know what you actually have. I do this quarterly:

- _Time:_ What hours are truly available? Not "I could theoretically work evenings" but "I actually will work evenings, sustainably."
- _Money:_ What's the AI budget without cutting into essentials or emergency reserves? Be honest.
- _Attention:_ How much new complexity can I absorb right now? Am I already at capacity with existing projects?

The answers change. When I'm mid-project with a demanding client, my attention capital is nearly zero even if I have time in the evenings. When business is slow, I might have abundant time but need to conserve money.

---

## Part 2: The Subscription vs. API Decision

This is the capital allocation decision I see people get wrong most often, including myself early on. Let me break down how I think about it now.

**The options in 2026:**

| Option | Monthly Cost | What You Get | Best For |
|--------|-------------|--------------|----------|
| Free tiers (Claude.ai, ChatGPT) | $0 | Limited messages, basic models | Casual use, trying before buying |
| Claude Pro | $20 | Unlimited Claude 4.5 Sonnet, limited Opus | Chat-heavy workflows, non-developers |
| Claude Code (Max) | $200 | Agentic coding, file ops, high limits | Developers, heavy daily use |
| API direct | Variable | Pay per token, full control | Automation, production systems, high volume |

**My actual decision process:**

When I started, I bounced between free Claude.ai and occasional API calls. The friction of switching tabs, copying code back and forth, and managing API keys ate more time than the $200/month would have cost. I did the math:

```
Time lost to friction: ~30 min/day
Days per month: 22 working days
Total friction time: 11 hours/month
Your effective hourly rate: $X
Friction cost: 11 × $X

Claude Code Max cost: $200/month
Break-even point: ~$18/hour
```

The numbers were embarrassingly clear once I calculated them. I was being penny-wise and pound-foolish.

**When API-direct makes sense:**

I still use API for specific cases:
- Automated workflows that run without human interaction
- High-volume, simple tasks where Haiku is sufficient
- Production systems where I need logging and error handling
- When I've exhausted Claude Code limits on a heavy day

The key insight: subscription and API aren't mutually exclusive. I pay for Claude Code AND budget $50-100/month for API overflow. The subscription handles interactive work; API handles automation.

**The free tier trap:**

Free tiers are genuinely useful for trying tools before committing. But I've watched people spend months on free tiers, fighting rate limits and model restrictions, because "$20/month seems expensive." If you're using AI for work that generates revenue, free tiers are almost never the right choice. The time lost to limits costs more than the subscription.

---

## Part 3: Opportunity Cost Framework

Every yes to an AI opportunity is a no to something else. This sounds obvious, but I routinely catch myself treating opportunities as if they exist in isolation.

The question isn't "Is this worth doing?" but "Is this worth doing instead of the next best alternative?"

**The comparison dimensions I use:**

1. _Expected value:_ What's the realistic upside if this works?
2. _Time to value:_ How long until I see returns?
3. _Capital required:_ Time, money, and attention—all three.
4. _Reversibility:_ Can I exit gracefully if it doesn't work?
5. _Learning value:_ What do I gain even if the project fails?
6. _Strategic fit:_ Does this compound with my existing work or fragment it?

**Opportunity Comparison Template:**

| Dimension | Opportunity A | Opportunity B | Opportunity C |
|-----------|---------------|---------------|---------------|
| Expected value ($/month or hours saved) | | | |
| Time to value (weeks) | | | |
| Time required (hours) | | | |
| Money required ($) | | | |
| Attention required (1-5) | | | |
| Reversibility (1-5, higher = easier to exit) | | | |
| Learning value (1-5) | | | |
| Strategic fit (1-5) | | | |

I fill this out when I'm genuinely torn. Most of the time, one option is obviously dominant once I force myself through the exercise. The value isn't the precision of the scores—it's the act of thinking through each dimension.

**Worked example from last month:**

I was choosing between building a custom proposal generator for my business and setting up automated analysis using Claude for a side project.

| Dimension | Proposal Generator | Side Project Analysis |
|-----------|-------------------|-----------------|
| Expected value | 2-3 hrs/week saved | Unknown, potentially significant |
| Time to value | 1 week | 4-6 weeks minimum |
| Time required | 8-10 hours | 30+ hours |
| Money required | ~$5/month API | ~$20/month API |
| Attention required | 2/5 (know the domain) | 4/5 (new integration patterns) |
| Reversibility | 5/5 (can abandon easily) | 3/5 (sunk cost accumulates fast) |
| Learning value | 2/5 (incremental) | 4/5 (new capabilities) |
| Strategic fit | 5/5 (core business) | 3/5 (side project) |

I chose the proposal generator. Not because it was sexier—it definitely wasn't—but because the capital efficiency was better. I could ship something useful in 8 hours versus 30+ hours of uncertain exploration. The side project analysis went into my "exploratory" bucket for later.

---

## Part 4: Build vs. Buy Decision Tree

One of the most expensive mistakes I've made is building when I should have bought, and buying when I should have built. The decision isn't just about cost—it's about where you want to invest your learning.

**When to build custom solutions:**

- Your requirements are genuinely unusual (verify this—most "unique" needs aren't)
- The build process teaches you something strategically valuable
- You need control over the evolution of the tool
- The problem is core to your competitive advantage

**When to buy existing tools:**

- The tool is mature and well-maintained
- Your requirements match 80%+ of what it offers
- Your time is better spent on things the tool enables
- The vendor has aligned incentives for continued development

**When to hire/outsource:**

- The work is well-defined enough to brief clearly
- You can verify quality without becoming an expert yourself
- The skill isn't one you need to develop personally
- The trust requirements are manageable (see [[Intelligence as a Commodity]])

**When to skip entirely:**

- The problem isn't actually causing meaningful pain
- The opportunity cost exceeds the potential benefit
- You're only interested because it's novel, not because it's useful
- You've already solved this problem "well enough"

**Build/Buy Decision Flow:**

```
Is this problem causing real pain (time/money/frustration)?
├── No → Skip it. Revisit in 3 months.
└── Yes → Does an existing tool solve 80%+ of the need?
    ├── Yes → Can you afford it?
    │   ├── Yes → Buy it. Customize if needed.
    │   └── No → Can you afford the time to build?
    │       ├── Yes → Build minimal version
    │       └── No → Skip or defer
    └── No → Is this problem core to your competitive advantage?
        ├── Yes → Build it. Invest properly.
        └── No → Can someone else build it for you?
            ├── Yes (and you can verify quality) → Hire/outsource
            └── No → Build minimal version or skip
```

The 80% threshold is key. I've wasted weeks building custom solutions because an existing tool only covered 90% of my needs. That last 10% rarely matters as much as I think it will.

---

## Part 5: Token Budget Allocation

API costs are the new infrastructure expense, and I treat them like an investment portfolio rather than a utility bill. This matters less if you're on a flat-rate subscription, but even Claude Code has limits that force API overflow decisions.

**The categories I use:**

_High-frequency, low-value per call:_ Routine coding assistance, formatting, small refactors. These should be cheap (Haiku-tier, shorter contexts) because the volume adds up.

_Low-frequency, high-value per call:_ Strategic analysis, complex problem-solving, document generation that directly produces revenue. Worth paying for Claude 4.5 Opus with full context.

_Experimentation:_ Trying new workflows, testing capabilities, exploring possibilities. Capped budget, accepted waste.

_Production:_ Live systems with real costs. Monitored closely, optimized aggressively.

**Example API allocation for an overflow budget:**

| Category | % of Budget | Model Tier |
|----------|-------------|------------|
| Routine assistance (overflow) | 30% | Haiku |
| High-value work | 40% | Opus |
| Experimentation | 20% | Variable |
| Production automations | 10% | Haiku/Sonnet |

**What these numbers actually buy:**

At current 2026 pricing (which has dropped significantly since 2024):
- $22 in Haiku: roughly 20-30 million tokens, or hundreds of routine queries
- $30 in Opus: roughly 500k-1M tokens, or 20-30 substantial sessions
- The experimentation budget gets ~10M tokens of mixed-model exploration

The experimentation budget is crucial. I explicitly allocate money I expect to "waste" exploring dead ends. This prevents me from either (a) never experimenting because it feels wasteful, or (b) feeling guilty every time an experiment fails. The waste is priced in.

---

## Part 6: The Portfolio Approach

I think about my AI investments like an actual portfolio, with different bets carrying different conviction levels and risk profiles. This is the same mental model I use for trading—but applied to tools and skills instead of capital.

**Core bets (60-70% of resources):**

High confidence, proven value. For me right now:

- Claude Code for code generation in my primary stack (Next.js, TypeScript)
- AI-assisted proposal and content writing
- Prompt templates for recurring client work
- CLAUDE.md files that accumulate project context (see [[How I Use AI]])

These get the bulk of my time, money, and attention. I actively maintain and improve them.

**Exploratory bets (20-30% of resources):**

Lower confidence, potentially high upside. Currently:

- Multi-agent orchestration patterns (see [[Multi-Agent Network Orchestration]])
- Trading signal enhancement via LLM analysis
- MCP integrations for my Supabase projects

These get limited, time-boxed investments. I set explicit criteria for what would promote them to core: "If this saves me 5+ hours in the next month, promote it."

**Hedge bets (5-10% of resources):**

Insurance against my core bets being wrong. Currently:

- Basic familiarity with GPT-5 family and Gemini 2.x
- Understanding of AI agent frameworks beyond Claude
- Relationships with people taking different approaches

This is about optionality. If Claude suddenly became unsuitable for my work, how quickly could I pivot? A few hours per quarter staying current on alternatives keeps that option open.

**Portfolio Allocation Framework:**

| Bet Type | Time Allocation | Money Allocation | Review Cadence |
|----------|-----------------|------------------|----------------|
| Core | 60-70% | 60-70% | Monthly optimization |
| Exploratory | 20-30% | 20-30% | Quarterly go/no-go |
| Hedge | 5-10% | 5-10% | Bi-annual relevance check |

**Rebalancing:**

Quarterly, I ask:

- Have any exploratory bets proven themselves? Promote to core.
- Have any core bets decayed in value? Demote or optimize.
- Are my hedges still hedging the right risks?
- Is the overall balance appropriate for my current situation?

---

## Part 7: Infrastructure Investment Thresholds

One of the hardest calls is knowing when to invest in tooling versus just doing the work manually. The trap works both ways: premature infrastructure wastes resources, but so does repeated manual work that should have been automated.

**The progression I use:**

_Manual:_ Do it by hand. Zero infrastructure cost. Maximum flexibility. Appropriate for: one-off tasks, work you're still learning, anything you've done fewer than three times.

_Tooling:_ Build or buy lightweight tools that reduce friction. Appropriate for: recurring tasks, known workflows, anything you've done 3+ times and expect to do 10+ more times.

_Systems:_ Build robust, monitored, maintained systems. Appropriate for: high-volume work, revenue-critical processes, anything where failures have significant costs.

**The 3x Rule:**

I don't invest in tooling until I've done something manually at least three times. This prevents building tools for problems that seemed important but disappeared. After three manual iterations, I've usually learned enough about the real requirements to build something that actually fits.

The corollary: if you've done something more than ten times manually and expect to keep doing it, you're probably under-investing in tooling.

**Avoiding premature optimization:**

The signs I watch for:

- Building "flexibility" for use cases that don't exist yet
- Optimizing for scale before validating the approach works at all
- Abstracting patterns I've only seen once
- Enjoying the infrastructure work more than the actual outputs

Infrastructure should be boring and functional. If I'm having too much fun building it, I'm probably over-engineering. This is the KISS principle from [[Maximizing AI Utility as a Business Owner]] applied to tooling.

---

## Part 8: Specialization vs. Generalization

In AI work, there's constant tension between going deep on specific applications and staying broad to capture emerging opportunities.

**The T-shaped skill model:**

I develop T-shaped expertise: broad familiarity across the domain, with deep expertise in one or two areas.

- _Horizontal bar:_ Understanding of how LLMs work, prompt engineering fundamentals, basic integration patterns, awareness of major tools and capabilities
- _Vertical stems:_ Deep expertise in my specific applications—currently AI-assisted web development

**When to go deep:**

- You've found an application that directly generates revenue
- The depth creates defensible expertise others can't easily replicate
- Going deeper compounds previous investments
- The area is stable enough that expertise won't become obsolete immediately

**When to stay broad:**

- You're still searching for your highest-value applications
- The landscape is shifting fast enough that specialization is premature
- Your current deep investment has diminishing returns
- Breadth enables synthesis that specialists can't access

**My current allocation:**

I'm deliberately going deeper on AI-assisted code generation for my specific stack (Next.js, TypeScript, Supabase) while staying broad on everything else. The depth in my stack compounds—every improvement to my CLAUDE.md files, every refined prompt template, every workflow optimization pays dividends on every future project.

When I scale the business, I expect to go deep on one more area—probably AI-augmented client communication and proposal automation.

---

## Part 9: When to Abandon

Knowing when to quit is harder than knowing when to start. The sunk cost fallacy is brutal in AI projects because you can always see how "a little more work" might finally make it pay off.

**Pre-committing to kill criteria:**

Before starting any significant AI project, I define what failure looks like:

- If I haven't achieved X by Y date, I stop.
- If costs exceed Z, I stop.
- If I try N approaches and none work, I stop.

Writing these down beforehand makes it harder to rationalize continuing when I'm emotionally invested.

**Time-boxing exploration:**

For exploratory projects, I set explicit time limits:

- Initial exploration: 4 hours maximum
- If promising, first working version: 8 hours maximum
- If still not delivering value after 12 total hours: kill it or defer to next quarter

These limits force honest assessment. "I just need a few more hours" is usually a lie I tell myself.

**Graceful abandonment:**

When I kill a project, I try to preserve:

- Documentation of what I tried and why it didn't work
- Any reusable components or patterns
- Lessons that apply to future projects
- Honest assessment for the post-mortem

The goal is making the failure as valuable as possible.

**Post-mortems that actually help:**

After abandoning a project, I answer:

1. What did I believe that turned out to be wrong?
2. What information would have changed my decision to start?
3. Did I stay too long? What signal should have triggered earlier exit?
4. What would I do differently with the same starting information?

The point isn't self-flagellation. It's updating my models so the next decision is better.

---

## Part 10: The Meta-Question

Here's the uncomfortable truth: this framework has costs. The time spent evaluating opportunities is time not spent executing them. At some point, "should I do X or Y?" needs to become "I'm doing X, let's go."

**When to use the framework:**

- The decision is significant (major time or money commitment)
- Multiple options seem roughly equivalent
- You've made poor allocation decisions recently and need to slow down
- You're feeling overwhelmed by possibilities

**When to just decide:**

- The cost of analysis exceeds the cost of a wrong decision
- You have strong intuition and a good track record
- The decision is easily reversible
- You're using analysis to avoid the discomfort of committing

I probably use this framework explicitly for 20% of my AI decisions. The other 80% are fast enough that formal analysis would be overhead. But having the framework shapes even the fast decisions—I've internalized the questions even when I'm not explicitly asking them.

**Avoiding analysis paralysis about avoiding analysis paralysis:**

If you're reading this essay and your primary takeaway is anxiety about whether you're allocating correctly, that's a failure mode I want to address directly.

The goal isn't perfect allocation. It's _better_ allocation—making fewer obviously bad decisions, catching yourself before sunk cost fallacy takes hold, and having tools available when you're genuinely stuck.

Good enough allocation, executed consistently, beats perfect allocation that paralyzes you.

---

## Resources

**Related essays:**

- [[Intelligence as a Commodity]] — Why workflow matters more than raw capability, and the trust layer problem
- [[Maximizing AI Utility as a Business Owner]] — High-fidelity context and avoiding common failure modes
- [[Multi-Agent Network Orchestration]] — When to pursue complex multi-agent systems vs simple tools
- [[Unit Economics of AI Implementation]] — Detailed cost modeling for AI workflows
- [[How I Use AI]] — Practical daily workflows that inform these allocation decisions

**Quick reference: Example allocation breakdown:**

| Resource | Allocation |
|----------|------------|
| AI subscriptions | Primary tool (Claude Code, etc.) |
| API overflow | 40% high-value, 30% routine, 20% experiments, 10% production |
| Time (hours/week) | 65% core work, 25% exploration, 10% learning |
| Other tools | As needed for your stack |

**Decision shortcuts:**

- Under $50/month and saves 2+ hours? Just buy it.
- Done it manually 3+ times? Build tooling.
- Done it 10+ times manually? You waited too long.
- Exploration taking more than 4 hours with no progress? Defer or kill.
- "I just need a few more hours"? Probably a lie. Set a hard deadline.

**Honest admission:**

My own allocation is not optimal. I'm writing this essay partly to force myself through the framework I'm describing. I've got exploratory projects that should have been killed months ago. My attention capital is frequently overdrawn. The experimentation budget is less disciplined than I'd like.

The framework isn't a solution—it's a set of questions that make it harder to lie to myself about these things.

---

_Capital allocation is ultimately about accepting limits. You can't pursue every AI opportunity, build every tool, or master every application. The question isn't whether you're missing things—you definitely are. The question is whether you're missing the right things: the ones that matter least for your specific situation, goals, and constraints._
