# Data Monitoring and Warehousing for AI—With AI

_A practical framework for deciding what to watch, how to store it, and how to build the system_

---

## Part 1: What This Is

You run a business. You make decisions based on external information—what competitors are doing, what customers are saying, what's happening in your market. You have access to AI that can read, reason, and act on information. The constraint isn't capability—it's input. What information should the AI have access to? In what form? How current? How trusted?

**The problem this solves:** You're drowning in potentially relevant information but starving for usable signal. Manual monitoring doesn't scale. Random searching misses patterns. You need infrastructure that collects, processes, and surfaces what matters—when it matters.

**Who this is for:**
- Business owners who need competitive intelligence, market signals, or lead generation data
- Traders who need to track news, filings, and social sentiment systematically
- Anyone making recurring decisions that depend on external information

**This framework answers:**

- Does this target deserve ongoing attention?
- How deep should I go?
- Should I store this or fetch it fresh when needed?
- How do I trust what I collect?
- What do I forget, and when?
- How do I actually build the system?

**This framework does not assume:**

- A specific use case (works for lead generation, trading signals, competitive intel, research, anything)
- A specific scale (patterns work from 50 items/day to 5000)
- A specific stack (pseudocode patterns, implement in whatever)
- That you need any of this (the first question is always: do I even need a system?)

**The core constraint:** Attention is finite. Data is infinite. Every piece of information you track is attention not spent elsewhere. The goal is knowing when something changed that affects a decision you need to make. Nothing more.

**Running example:** Throughout this document, I'll use "monitoring competitor pricing and positioning" as a concrete example. Your use case may differ, but the patterns transfer.

**How to use this document:**

For thinking: Parts 2-5 are the decision framework. Work through them before touching implementation.

For building: Parts 6-12 are the mechanics. Reference them when you need specific patterns.

For reference: Part 16 is schemas. Part 17 is prompt templates. Appendices have script patterns.

---

## Part 2: The Decision Framework

Before collecting anything, before building anything, answer these questions.

### 2.1 The First Question: Do I Need a System?

Not everything needs infrastructure. Ask:

**Is this a recurring need?** If you'll ask the same question once, just search for it. Systems are for repeated questions.

**Does history matter?** If you only need current state and access is easy, fetch on demand. Systems are for when you need to track change over time.

**Is the decision high-stakes enough?** Building and maintaining a system has costs. If the decisions it informs are low-stakes, the system may not be worth it.

**Can I trust my memory?** If you can reliably remember to check something manually and the frequency is low (weekly or less), maybe you don't need automation.

If you pass these: continue. If not: just search when you need to, and revisit when the need becomes recurring.

**Example:** "I want to know if my competitor changes their pricing." This is recurring (you'll check forever), history matters (you want to see the trend), stakes are high (pricing affects your revenue), and you won't remember to check consistently. Build a system.

**Counter-example:** "I want to understand a new competitor that just entered the market." This is one-time research. Just do deep research now, document what you find, revisit if they become significant. Don't build infrastructure for a question you'll ask once.

### 2.2 Granularity (How Deep)

Information exists in layers. Each layer costs more attention than the last.

```
Layer 0: Does this target matter at all?
Layer 1: Surface awareness — headlines, prices, major events
Layer 2: Pattern recognition — trends, sentiment shifts, positioning changes
Layer 3: Causal understanding — why things are happening
Layer 4: Predictive modeling — what happens next
Layer 5+: Diminishing returns for most purposes
```

**The test at each layer:** Does this information help me decide, or does it create more questions?

**The >3 questions rule:** When you learn something, count the questions it raises. If it creates more than 3 questions that require new sources or significant effort to answer, you've hit the useful depth for your current purpose. Stop, or flag for later.

**How to apply (competitor pricing example):**

```
Target: Competitor's pricing strategy

Layer 1: "They raised enterprise prices 15%"
  → Questions raised: When? Across all products?
  → 2 questions, answerable from same source
  → Continue if relevant to your decisions

Layer 2: "Enterprise up 15%, SMB flat, churn increasing"
  → Questions raised: Why the split? What's churn rate? How does this compare to us?
  → 3 questions, some need different sources
  → Sufficient for most positioning decisions

Layer 3: "Their cost structure changed due to vendor X, testing elasticity by segment"
  → Questions raised: What's the vendor relationship? What segments exactly? What are the test parameters? What's their margin structure?
  → 4+ questions, all need new sources
  → Only pursue if you're making a major strategic bet

Default to Layer 2 for most monitoring. Go deeper only when decision stakes justify the attention cost.
```

### 2.3 Complexity (How Hard to Access)

Not all information is equally accessible.

|Tier|Description|Examples|True Cost|
|---|---|---|---|
|0: Open|Public, no barriers|Press releases, public filings, open social|Free|
|1: Free-gated|Account required|Free API tiers, gated articles|Time to set up|
|2: Paid|Subscription|Premium APIs, research reports|$$ + dependency|
|3: Human-required|Relationships|Expert networks, private channels|$$$ + time + trust|
|4: Unavailable|Not accessible|Truly private, future outcomes|Infinite|

**Substitution logic:** Before paying for higher tiers, ask: can I get equivalent insight from a lower tier?

The same insight often exists through multiple paths:

- Paid estimates → public guidance + simple model
- Expert calls → public interviews, transcripts, podcasts
- Proprietary data → proxies, surveys, scraped signals

**The test:** What decision am I making, and what precision do I actually need? Often "directionally correct from free sources" beats "precise from expensive sources" when you factor in the cost.

**Example:** You want to know a competitor's revenue. Tier 2 option: Pay $500/month for market research subscription. Tier 0 option: They're public—read the 10-K. They're private—track job postings (hiring = growth), press releases (funding rounds reveal valuation multiples), and customer announcements. Probably good enough.

### 2.4 Umbrella (How Wide)

How many targets are you monitoring?

**Start narrow.** Define your domain. Identify the primary sources for that domain—the authoritative places where important information appears first.

**The primary source principle:** For any domain, there are 3-7 sources that matter most. News about Apple? Start with Apple IR, SEC filings, and 2-3 top tech reporters. Not "all tech news."

**Expand only when:**

- Current sources keep referencing something outside your scope
- A decision requires context you don't have
- You're missing signals others are catching

**The tradeoff:**

```
Narrow + Deep: Expert in one area, blind to adjacent signals
Wide + Shallow: Aware of everything, expert in nothing
Wide + Deep: Impossible at any reasonable cost

Sweet spot: Narrow umbrella, variable depth based on stakes
```

**Example:** Monitoring competitor pricing. Start with: their pricing page (scrape weekly), their blog/announcements, 2-3 review sites where customers discuss pricing, their job postings (pricing team growth = pricing changes coming). Don't start with: "all news about them." Expand only when you're consistently missing signals that matter.

### 2.5 Velocity (How Fast Things Change)

Information decays at different rates. Velocity determines collection frequency and storage strategy.

|Velocity|Examples|Collection Need|Storage Need|
|---|---|---|---|
|Real-time|Prices during trading, live events|Stream or don't bother|Current state only, or time-series if history matters|
|Hourly|Social sentiment, order flow|Frequent polling|Snapshots, summarize daily|
|Daily|News cycle, competitive moves|Daily batch|Daily records, weekly summaries|
|Weekly|Research, strategic positioning|Weekly review|Keep processed, archive raw|
|Static|Reference docs, historical facts|On change|Permanent, update rarely|

**Velocity × Stakes:**

```
High velocity + High stakes → Invest in real-time infrastructure
High velocity + Low stakes → Don't collect; fetch when needed
Low velocity + High stakes → Batch is fine; invest in depth
Low velocity + Low stakes → Fetch on demand
```

**Example:** Competitor pricing page changes weekly at most. This is low velocity. Even if stakes are high, daily collection is overkill—weekly scrape is sufficient. But if you're trading on earnings releases, that's high velocity + high stakes—you need real-time.

### 2.6 The Kill Filter

Before adding any data source to your system, it must pass all four:

```
□ Specific use: Will this inform a specific, recurring decision?
  (Not "might be useful" — what decision, specifically?)

□ History or access justifies storage: Do I need history/diffs, OR is access slow/expensive?
  (If no to both, fetch on demand instead)

□ Signal density: Is the signal/noise ratio acceptable?
  (100 items for 1 useful one = bad source)

□ Maintenance budget: Can I afford to keep this running?
  (Every source is ongoing maintenance debt)
```

**If a source fails any of these, don't add it.** Revisit when conditions change.

---

## Part 3: Store vs. Fetch

### 3.1 The Decision Matrix

||Need History/Diffs|Only Need Current State|
|---|---|---|
|**Access is slow/expensive/rate-limited**|Store|Store (as cache)|
|**Access is fast/cheap/reliable**|Store (for change tracking)|Fetch on demand|

### 3.2 Store When

**You need history.** Change detection requires baseline. Trends require time series. "What's different?" requires "what was before?"

**Access is expensive.** Rate limits, paid APIs, slow scraping, manual steps. Pay the cost once, reuse the result.

**Cross-reference is required.** Connecting information across sources (same company in news + social + filings) requires stored, normalized data.

**Provenance matters.** "Why did the system think X?" requires logs. Debugging wrong conclusions requires preserved inputs.

**Feeds recurring decisions.** Same data type, used repeatedly. Daily briefings, weekly reviews.

### 3.3 Fetch On Demand When

**Freshness is critical.** Stale data is worse than no data. Real-time prices during trading.

**One-time use.** Research queries you won't repeat.

**Data is huge relative to extract.** Pulling 1GB to get one number. Fetch, extract, discard.

**Source is authoritative and stable.** Official docs, government databases. Treat the source as your system of record.

### 3.4 Graduate to Storage When

A target should move from ad-hoc fetching to systematic storage when:

```
□ Frequency: You're fetching the same thing >3x per week
□ History: You've asked "what changed?" more than once
□ Integration: Multiple workflows need the same data
□ Reliability: On-demand fetching has failed you
```

Stay ad-hoc when you're still exploring whether a target matters.

---

## Part 4: Trust

### 4.1 Primary Source Doctrine

Information degrades through intermediaries.

```
Company IR: "Revenue grew 12% YoY"
     ↓
News outlet: "Revenue up double digits"
     ↓
Aggregator: "Strong growth reported"
     ↓
Social: "Company crushing it"
```

Each hop adds latency, loses context, risks errors.

**Default to primary sources:**

- Company announcements over news about announcements
- Filings over summaries of filings
- Documentation over blog posts about documentation
- Original accounts over people quoting them

**Use secondary sources for:**

- Discovery (finding what to look at)
- Sentiment (what people think about primary info)
- Speed (when primary is delayed)

But verify against primary when acting on it.

### 4.2 Reliability Tiers

Make trust explicit. Tag everything.

|Tier|Description|Examples|Weight|
|---|---|---|---|
|1|Authoritative|Official filings, company IR, peer-reviewed, legal docs|1.0|
|2|Professional|Major news, verified accounts, analyst reports from known firms|0.8|
|3|Mixed|Industry blogs, unverified accounts, trade press|0.5|
|4|Speculative|Anonymous forums, rumors, untracked predictions|0.25|

**Assignment rules:**

```
Tier 1 if:
  - Official source (company, regulator, court)
  - Legal accountability for accuracy
  - Verifiable against primary records

Tier 2 if:
  - Editorial standards exist
  - Author/source has professional reputation
  - Track record is checkable

Tier 3 if:
  - Source is identifiable but not professionally accountable
  - Mixed track record or unknown track record
  - Some expertise but not verifiable

Tier 4 if:
  - Anonymous or pseudonymous
  - No accountability
  - Entertainment/engagement incentive over accuracy
```

**When sources conflict:** Tier matters. Tier 1 contradicting Tier 4 isn't a conflict—it's a correction. Tier 2 contradicting Tier 2 is a real conflict to surface.

### 4.3 Compromise Detection

What if the source itself is wrong—not through bias, but through compromise?

**Compromise patterns:**

- Account takeover (fake post from real account)
- Site defacement (altered content on legitimate site)
- Data poisoning (manipulated feeds)
- Coordinated inauthentic behavior (artificial consensus)

**"Out of character" is the primary signal.**

For sources you rely on, maintain implicit baseline expectations:

```yaml
baseline:
  posting_frequency: typical range
  topics: typical subjects
  tone: typical style
  timing: typical hours

anomaly_triggers:
  - frequency: outside normal range by >2x
  - topics: sudden shift to promotional/financial/urgent
  - tone: uncharacteristically salesy or alarmist
  - timing: unusual hours for this source

action_on_anomaly: flag, do not auto-process, verify through other channels
```

### 4.4 Corroboration Requirements

For high-stakes decisions, single sources aren't enough.

**Independence criteria:**

```
NOT independent:
  - Same wire story on multiple sites
  - One source citing another
  - Same author on different platforms
  - Aggregators pulling same feed

Independent:
  - Different original reporting
  - Different methodologies (survey vs. channel checks vs. filing analysis)
  - Different vantage points (company vs. analyst vs. customer)

Test: If Source A disappeared, would Source B still have this information?
```

**Corroboration rules:**

```
Low stakes: Single Tier 1-2 source sufficient
Medium stakes: Two independent sources, at least one Tier 1-2
High stakes: Two independent Tier 1-2 sources
Action-triggering: Verify against primary source directly
```

---

## Part 5: Data Model

### 5.1 Entity Resolution

The same thing appears different ways across sources.

```
"@elonmusk" = "Elon Musk" = "Tesla CEO" = "Musk"
"AAPL" = "Apple" = "Apple Inc." = "$AAPL"
"the Fed" = "Federal Reserve" = "FOMC" = "Powell"
```

Without entity resolution, you can't answer "what's been said about Apple?" because your data doesn't know these are the same thing.

**Entity Registry Structure:**

```yaml
entities:
  apple_inc:
    canonical: "Apple Inc."
    type: company
    identifiers:
      ticker: AAPL
      cik: "0000320193"  # SEC identifier
    aliases:
      - "Apple"
      - "AAPL"
      - "$AAPL"
      - "Apple Computer"
    related:
      - entity: tim_cook
        relation: ceo
      - entity: google
        relation: competitor
```

**Resolution Process:**

```
Input: Raw text containing mentions

Step 1: Extract candidates
  - Named entities (capitalized phrases, @handles, $tickers)
  - Pattern matches (known formats like $XXXX)

Step 2: Match against registry
  For each candidate:
    - Exact match against aliases → resolved
    - Fuzzy match (similarity > 0.85) → resolved with lower confidence
    - No match → flag as unresolved

Step 3: Handle unresolved
  - High frequency unresolved → add to registry
  - Low frequency → leave as raw text

Output: Original text + entity_ids for resolved mentions
```

**Tooling options by scale:**

```
<100 items/day: Exact alias matching sufficient
100-1000 items/day: Add fuzzy matching (rapidfuzz or similar)
>1000 items/day: Consider NER model for extraction, fuzzy for resolution
Any scale, complex context: Claude 4.5 Haiku call for ambiguous cases
```

### 5.2 Temporal Types

Not all information relates to time the same way.

**Current State**

What's true right now. Prices, positions, status, active configuration.

```yaml
temporal_type: current_state
behavior:
  on_update: overwrite (stale = wrong)
  query_pattern: "what is X now?"
  storage: single file per entity/topic, versioned for audit
```

**Time Series**

History of values. Price history, sentiment over time, metrics.

```yaml
temporal_type: time_series
behavior:
  on_update: append (history is the point)
  query_pattern: "what was X over time? what's the trend?"
  storage: append-only logs, indexed by timestamp
```

**Event Log**

Things that happened. Posts, announcements, publications.

```yaml
temporal_type: event_log
behavior:
  on_update: never (events are immutable)
  query_pattern: "what happened? when did X occur?"
  storage: append-only, timestamp is primary key
```

**Mark temporal type on every record.** It determines update behavior and query patterns.

### 5.3 Conflict Handling

Sources disagree. This is information—don't hide it.

**Conflict types:**

```yaml
conflict_types:
  factual_disagreement:
    description: "Different claims about verifiable facts"
    example: "Source A says revenue was $10B, Source B says $11B"
    resolution: Check primary source (filing); one is wrong

  directional_disagreement:
    description: "Different interpretations or predictions"
    example: "Analyst A bullish, Analyst B bearish"
    resolution: Surface both; this is legitimate uncertainty

  temporal_disagreement:
    description: "Information from different points in time"
    example: "Old article says X, new article says Y"
    resolution: Newer usually wins; note the change

  scope_disagreement:
    description: "Claims about different things that seem related"
    example: "Global sales up, US sales down"
    resolution: Both may be true; clarify scope
```

**Conflict record structure:**

```yaml
---
type: conflict
topic: competitor_q1_outlook
conflict_type: directional_disagreement
detected_at: 2026-01-15T10:00:00Z
claims:
  - source: morgan_stanley
    reliability: tier_2
    claim: "Strong enterprise demand, PT $220"
    date: 2026-01-14

  - source: barclays
    reliability: tier_2
    claim: "Weak SMB exposure, PT $175"
    date: 2026-01-15

resolution: unresolved
notes: "Both are Tier 2, genuinely different reads on same data"
---
```

**Surfacing conflicts:**

When queried about a topic with active conflicts, surface them: "Analysts disagree on CompetitorX—Morgan Stanley is bullish citing enterprise demand, Barclays is bearish citing SMB weakness."

Not: Pick one arbitrarily. Not: Average them. Not: Ignore the conflict.

### 5.4 The Record Schema

Every processed record should include:

```yaml
---
# Identity (required)
id: unique_identifier
type: event_log | current_state | time_series

# Source (required)
source: source_identifier
source_url: original_url_if_applicable
reliability: tier_1 | tier_2 | tier_3 | tier_4

# Entities (required)
entities: [list_of_resolved_entity_ids]
topics: [topic_tags]

# Temporal (required)
collected_at: when_you_collected_this
content_date: when_the_content_was_created

# Provenance (required for debugging)
raw_source: path_to_raw_file
raw_line: line_number_if_applicable
processed_by: script_or_process_identifier
content_hash: hash_for_deduplication

# Quality signals (optional but useful)
engagement: {metrics_if_social}
confidence: high | medium | low
flags: [any_anomaly_flags]
---

# Content

The actual information in readable form.

# Context

Why this matters. What was happening around it. Your interpretation.
```

**Required vs. optional:**

```
Always required: id, type, source, reliability, entities, collected_at, content_date

Required for debugging: raw_source, processed_by, content_hash

Optional but valuable: engagement, confidence, flags, context
```

---

## Part 6: Collection

### 6.1 Channel Types

**API (Structured)**

```yaml
characteristics:
  reliability: high (when it works)
  cost: free tier to expensive
  freshness: real-time possible
  maintenance: low (until they change it)

use_when:
  - Need reliability
  - Need volume
  - Need real-time or near-real-time

watch_for:
  - Rate limits
  - API changes/deprecation
  - Cost scaling with usage
```

**RSS (Semi-structured)**

```yaml
characteristics:
  reliability: medium
  cost: free
  freshness: publisher-controlled delay
  maintenance: low

use_when:
  - Monitoring publications/blogs
  - News aggregation
  - Low-effort content monitoring

watch_for:
  - Feeds going stale or dying
  - Partial content (excerpt only)
  - Inconsistent formatting
```

**Scraping (Unstructured)**

```yaml
characteristics:
  reliability: low
  cost: free but fragile
  freshness: you control
  maintenance: high

use_when:
  - No API exists
  - Low frequency needs
  - Specific data on public pages

watch_for:
  - Site structure changes break selectors
  - Rate limiting / blocking
  - Legal/ToS considerations (see Part 13)
```

**Manual (Human-in-loop)**

```yaml
characteristics:
  reliability: high
  cost: your time
  freshness: when you do it
  maintenance: none

use_when:
  - High-signal, low-frequency
  - Things automation misses
  - Needs human judgment to capture

implementation:
  - Watched folder for screenshots/files
  - Quick-capture form
  - Email/message forwarding to inbox
```

### 6.2 Platform-Specific Notes (2026)

**Social platforms:** Access has changed significantly. X (formerly Twitter) API access is expensive for serious volume. Meta platforms have restricted API access. LinkedIn actively blocks scraping.

**Practical alternatives:**
- RSS feeds for accounts that have them
- Official announcement channels (company blogs, IR pages)
- Aggregator services that have legitimate API access
- Manual monitoring with quick-capture for low-volume, high-signal accounts

**Don't build infrastructure around access that might disappear.** If you're scraping a platform that's actively blocking scrapers, that source has high maintenance cost—factor that in.

### 6.3 Script Patterns

**API Collection Pattern:**

```
function collect_api(config):
    # Setup
    authenticate()
    last_checkpoint = load_checkpoint(config.source_id)

    # Collect
    results = []
    cursor = last_checkpoint

    while has_more:
        try:
            response = api_call(
                endpoint=config.endpoint,
                params=config.params,
                cursor=cursor
            )

            for item in response.items:
                results.append({
                    collected_at: now(),
                    source: config.source_id,
                    raw: item
                })

            cursor = response.next_cursor
            has_more = response.has_more

            # Respect rate limits
            if response.rate_limit_remaining < threshold:
                sleep(response.rate_limit_reset - now())

        except RateLimitError:
            log_warning("Rate limited", config.source_id)
            save_checkpoint(config.source_id, cursor)
            break

        except APIError as e:
            log_error("API error", config.source_id, e)
            break

    # Save
    if results:
        append_to_raw(config.output_path, results)
        save_checkpoint(config.source_id, cursor)
        log_success(config.source_id, len(results))

    return results
```

**RSS Collection Pattern:**

```
function collect_rss(config):
    # Fetch
    try:
        feed = parse_feed(config.url)
    except FeedError as e:
        log_error("Feed fetch failed", config.source_id, e)
        return []

    # Filter to new items
    seen_ids = load_seen_ids(config.source_id)
    new_items = []

    for entry in feed.entries:
        entry_id = entry.id or hash(entry.link + entry.title)

        if entry_id not in seen_ids:
            new_items.append({
                collected_at: now(),
                source: config.source_id,
                raw: {
                    id: entry_id,
                    title: entry.title,
                    link: entry.link,
                    published: entry.published,
                    summary: entry.summary,
                    content: entry.content if available else None
                }
            })
            seen_ids.add(entry_id)

    # Save
    if new_items:
        append_to_raw(config.output_path, new_items)
        save_seen_ids(config.source_id, seen_ids)
        log_success(config.source_id, len(new_items))

    return new_items
```

**Scraping Collection Pattern:**

```
function collect_scrape(config):
    # Fetch page
    try:
        if config.needs_javascript:
            html = fetch_with_browser(config.url)
        else:
            html = fetch_simple(config.url)
    except FetchError as e:
        log_error("Fetch failed", config.source_id, e)
        return []

    # Extract with selectors
    try:
        items = []
        for selector in config.item_selectors:
            elements = html.select(selector)
            for el in elements:
                items.append(extract_fields(el, config.field_map))
    except SelectorError as e:
        log_error("Selector failed - site may have changed", config.source_id, e)
        alert("Scraper needs maintenance", config.source_id)
        return []

    # Dedupe against recent
    recent_hashes = load_recent_hashes(config.source_id)
    new_items = []

    for item in items:
        item_hash = hash(item.content)
        if item_hash not in recent_hashes:
            new_items.append({
                collected_at: now(),
                source: config.source_id,
                raw: item,
                content_hash: item_hash
            })

    # Save
    if new_items:
        append_to_raw(config.output_path, new_items)
        save_recent_hashes(config.source_id, [i.content_hash for i in new_items])
        log_success(config.source_id, len(new_items))

    return new_items
```

### 6.4 Scheduling Logic

**Frequency from velocity:**

```yaml
scheduling_rules:
  real_time:
    velocity: minutes
    pattern: continuous stream or webhook
    fallback: poll every 1-5 minutes

  hourly:
    velocity: hours
    pattern: cron "0 * * * *" (top of each hour)
    stagger: offset by source_id hash to spread load

  daily:
    velocity: daily
    pattern: cron "0 6 * * *" (6am)
    stagger: spread across early morning window

  weekly:
    velocity: weekly
    pattern: cron "0 8 * * 1" (Monday 8am)
```

**Staggering:**

Don't run everything at the same time.

```
# Bad: All sources at midnight
0 0 * * * collect_source_a
0 0 * * * collect_source_b
0 0 * * * collect_source_c

# Good: Staggered
0 0 * * * collect_source_a
15 0 * * * collect_source_b
30 0 * * * collect_source_c

# Better: Hash-based offset
for source in sources:
    offset = hash(source.id) % 60
    schedule(f"{offset} * * * *", collect, source)
```

**Retry policy:**

```yaml
retry_policy:
  on_failure:
    - wait: 1 minute
    - retry: 1
    - wait: 5 minutes
    - retry: 2
    - wait: 15 minutes
    - retry: 3
    - give up, alert

  on_rate_limit:
    - wait: rate_limit_reset time
    - retry from checkpoint

  on_partial:
    - save what we got
    - checkpoint position
    - continue next run
```

### 6.5 Output Contract

Raw collection must produce:

```yaml
required_fields:
  collected_at: ISO timestamp of collection
  source: source identifier
  raw: original data as received

strongly_recommended:
  content_hash: for deduplication

output_format: JSONL (one record per line)

file_naming: "{source}_{date}.jsonl"
  example: "competitor_pricing_2026-01-15.jsonl"

location: /warehouse/sources/{source}/raw/
```

---

## Part 7: Processing

### 7.1 Pipeline Stages

```
Raw Input
    ↓
[Extract] Pull relevant fields from raw format
    ↓
[Resolve] Match entities to registry
    ↓
[Dedupe] Check against recent items
    ↓
[Enrich] Add reliability tier, topics, signals
    ↓
[Summarize] Condense if needed (AI call)
    ↓
[Store] Write processed record
    ↓
[Index] Update entity views, derived content
```

### 7.2 Extraction

Transform raw API/scrape format into normalized structure.

```
function extract(raw_item, source_config):
    return {
        id: generate_id(source_config.source_id, raw_item),
        content: extract_text(raw_item, source_config.content_field),
        content_date: parse_date(raw_item, source_config.date_field),
        url: raw_item[source_config.url_field],
        author: raw_item[source_config.author_field],
        engagement: extract_engagement(raw_item, source_config.engagement_fields),
        raw_reference: {
            file: current_raw_file,
            line: current_line
        }
    }
```

### 7.3 Entity Resolution (Detailed)

```
function resolve_entities(text, entity_registry):
    resolved = []

    # Step 1: Extract candidates
    candidates = []
    candidates += extract_handles(text)      # @mentions
    candidates += extract_tickers(text)      # $AAPL
    candidates += extract_named_entities(text)  # Capitalized phrases

    # Step 2: Match each candidate
    for candidate in candidates:
        # Try exact alias match first
        for entity_id, entity in entity_registry:
            if candidate.lower() in [a.lower() for a in entity.aliases]:
                resolved.append({
                    text: candidate,
                    entity_id: entity_id,
                    confidence: "high"
                })
                break
        else:
            # Try fuzzy match
            best_match = fuzzy_match(candidate, entity_registry.all_aliases)
            if best_match.score > 0.85:
                resolved.append({
                    text: candidate,
                    entity_id: best_match.entity_id,
                    confidence: "medium"
                })
            else:
                # Unresolved
                log_unresolved(candidate)

    return resolved

# For ambiguous cases or context-dependent resolution
function resolve_entities_ai(text, candidates, entity_registry):
    prompt = f"""
    Text: {text}

    Potential entity mentions: {candidates}

    Entity registry (relevant entries): {relevant_subset}

    For each mention, identify which entity it refers to, or mark as "unknown"
    if not in registry.

    Return as: [{text: "...", entity_id: "...", reasoning: "..."}, ...]
    """

    return call_claude(prompt, model="claude-4-5-haiku")  # Use Haiku for cost efficiency
```

### 7.4 Deduplication

```
function dedupe(item, recent_items, config):
    # Exact duplicate (same content hash)
    if item.content_hash in recent_items.hashes:
        return {action: "skip", reason: "exact_duplicate"}

    # Near duplicate (similar content)
    if config.check_similarity:
        for recent in recent_items.last_n(1000):
            similarity = compute_similarity(item.content, recent.content)
            if similarity > config.similarity_threshold:  # typically 0.90
                return {
                    action: "skip_or_link",
                    reason: "near_duplicate",
                    similar_to: recent.id,
                    similarity: similarity
                }

    # Not a duplicate
    return {action: "process"}

# Similarity options by cost/quality tradeoff:
# - Simple: Jaccard similarity on word sets (fast, free)
# - Medium: TF-IDF cosine similarity (fast, free, better)
# - Best: Embedding similarity (slower, API cost, best quality)
```

### 7.5 Enrichment

```
function enrich(item, source_config, entity_registry):
    # Reliability tier from source
    item.reliability = source_config.reliability_tier

    # Resolve entities
    item.entities = resolve_entities(item.content, entity_registry)

    # Topic tagging
    item.topics = extract_topics(item.content, config.topic_taxonomy)

    # Quality signals
    item.signals = {
        engagement_score: normalize_engagement(item.engagement),
        author_score: get_author_score(item.author),
        recency: hours_since(item.content_date)
    }

    # Anomaly flags
    item.flags = check_anomalies(item, source_config.baseline)

    return item

function extract_topics(text, taxonomy):
    # Option 1: Keyword matching against taxonomy
    # Fast, deterministic, limited

    # Option 2: Classification model
    # Fast, better coverage, needs training

    # Option 3: Claude 4.5 Haiku call
    # Best quality, costs tokens

    # Recommendation: Keyword matching as default,
    # Claude call for high-value items or when keywords fail
```

### 7.6 Summarization

When to summarize:

- Raw content > 500 tokens
- Batch of items needing consolidation
- Pre-computing views (daily briefing)

**Summarization prompt template:**

```
Summarize the following {content_type} for monitoring purposes.

Content:
{content}

Requirements:
- Capture key facts, claims, or changes
- Note any entities mentioned (people, companies, products)
- Flag anything unusual or significant
- Keep under {token_limit} tokens

Format:
## Summary
[2-3 sentence summary]

## Key Points
[3-5 bullet points of specific facts/claims]

## Entities Mentioned
[List with brief context]

## Signals
[Anything notable: sentiment shift, unusual claim, breaking news, etc.]
```

**Model selection for summarization (2026 pricing):**

```yaml
model_selection:
  claude-4-5-haiku:
    use_for:
      - Simple extraction
      - High-volume, low-stakes summarization
      - Cost-sensitive batches
    cost: lowest tier [VERIFY current pricing at anthropic.com/pricing]
    quality: adequate for structured tasks

  claude-4-5-sonnet:
    use_for:
      - Standard summarization
      - Entity resolution
      - Topic classification
    cost: mid tier
    quality: good for most processing

  claude-4-5-opus:
    use_for:
      - Complex analysis
      - Final synthesis (daily briefing)
      - High-stakes interpretation
    cost: highest tier
    quality: best for nuanced understanding

default_for_processing: claude-4-5-sonnet
upgrade_to_opus_when: generating user-facing synthesis
downgrade_to_haiku_when: budget constrained, >1000 items/batch
```

**Note:** API pricing changes frequently. Don't hardcode pricing assumptions—build cost tracking into your system and review monthly.

### 7.7 Processing Output Contract

```yaml
required_fields:
  # From schema (Part 5.4)
  id: unique identifier
  type: temporal type
  source: source identifier
  reliability: tier
  entities: resolved entity ids
  topics: topic tags
  collected_at: timestamp
  content_date: timestamp
  raw_source: path to raw
  processed_by: processor identifier
  content_hash: hash

  # Content
  content: the actual content (text)
  summary: summarized version if applicable

output_format: Markdown with YAML frontmatter

file_organization:
  by_date: /warehouse/sources/{source}/processed/{date}.md
  by_entity: updated in /warehouse/entities/{entity}/recent.md
  by_topic: updated in /warehouse/sources/{source}/processed/by_topic/{topic}.md
```

---

## Part 8: AI Processing Quality Control

AI processing is not perfectly reliable. Entity resolution can misfire. Summarization can miss key points or hallucinate details. Topic classification can be inconsistent. You need mechanisms to catch and correct errors.

### 8.1 Error Types

```yaml
ai_error_types:
  hallucination:
    description: "AI adds information not in source"
    example: "Summary mentions Q2 guidance but source only discussed Q1"
    detection: Compare summary claims against source text
    frequency: Uncommon with good prompts, but damaging when it happens

  omission:
    description: "AI drops important information"
    example: "Source mentions major lawsuit, summary doesn't include it"
    detection: Keyword checking, importance scoring
    frequency: Common when content is long or prompt is vague

  misattribution:
    description: "AI assigns information to wrong entity"
    example: "CompetitorA's price change attributed to CompetitorB"
    detection: Entity-claim consistency check
    frequency: Common when multiple entities in same content

  misclassification:
    description: "AI assigns wrong topic or sentiment"
    example: "Neutral statement classified as strongly negative"
    detection: Spot-check sampling, disagreement flagging
    frequency: Depends on taxonomy clarity
```

### 8.2 Quality Gates

**Pre-processing gate:** Before AI touches content:
- Is the source actually accessible? (not a 404 or login wall)
- Is the content in expected format?
- Is the content actually new? (dedup check)

**Post-processing gate:** After AI processes:
```
function quality_gate(original, processed):
    issues = []

    # Check: Does summary mention entities not in original?
    summary_entities = extract_entities(processed.summary)
    original_entities = extract_entities(original.content)
    invented = summary_entities - original_entities
    if invented:
        issues.append({type: "hallucination", detail: f"Entities in summary but not source: {invented}"})

    # Check: Are key numbers preserved accurately?
    original_numbers = extract_numbers(original.content)
    summary_numbers = extract_numbers(processed.summary)
    for num in original_numbers:
        if num.importance == "high" and num not in summary_numbers:
            issues.append({type: "omission", detail: f"Key number missing: {num}"})

    # Check: Is entity resolution consistent?
    for entity_mention in processed.entities:
        if entity_mention.confidence == "low":
            issues.append({type: "uncertain_resolution", detail: f"Low confidence: {entity_mention}"})

    return issues
```

### 8.3 Sampling Protocol

You can't check everything. Sample strategically.

```yaml
sampling_strategy:
  random_sample:
    rate: 5% of processed items
    action: Full manual review
    purpose: Catch systematic issues

  high_stakes_review:
    trigger: Item affects active decision
    action: Verify before acting
    purpose: Prevent costly mistakes

  anomaly_review:
    trigger: Quality gate flags issues
    action: Human review before storage
    purpose: Catch AI errors

  disagreement_review:
    trigger: Different processing runs give different results
    action: Human adjudication
    purpose: Identify ambiguous cases
```

### 8.4 Feedback Loop

When you find errors, improve the system:

```yaml
error_remediation:
  immediate:
    - Correct the specific record
    - Log the error type and cause

  systematic:
    - If same error type appears >3 times: adjust prompt
    - If entity consistently misresolved: update registry
    - If topic consistently misclassified: clarify taxonomy

  tracking:
    - Error rate by type over time
    - Error rate by source
    - Error rate by model

  target_metrics:
    - Hallucination rate: <1%
    - Omission rate: <5% for high-importance facts
    - Misattribution rate: <2%
```

---

## Part 9: Storage

### 9.1 File Formats

|Format|Use For|Why|
|---|---|---|
|Markdown + YAML frontmatter|Processed content, summaries, anything AI reads|Readable, metadata-rich, AI-native|
|YAML|Configs, registries, structured metadata|Human-readable, structured|
|JSONL|Raw logs, time series, append-only streams|Efficient append, line-by-line processing|
|JSON|API responses, complex nested structures|When you need nesting, not append|

**Format considerations:** The right format depends on how data will be consumed. If AI agents will read files directly via Claude Code or similar tools, Markdown is ideal. If you're building more complex retrieval (RAG systems, semantic search), you may need to add embedding storage. The patterns here assume direct file access as the primary consumption mode.

### 9.2 Directory Structure

```
/warehouse/
  /sources/                          # Organized by collection source
    /{source_id}/
      config.yaml                    # Source configuration
      /raw/                          # Append-only collection
        {date}.jsonl
      /processed/                    # AI-ready content
        /by_date/
          {date}.md
        /by_topic/
          {topic}.md
        /by_entity/
          {entity_id}.md

  /entities/                         # Cross-source entity views
    /{entity_id}/
      current.yaml                   # Current state snapshot
      recent.md                      # Last 7-30 days of activity
      history.md                     # Compressed older history

  /derived/                          # AI-generated synthesis
    daily_briefing.md                # Today's summary
    weekly_synthesis.md              # This week's themes
    conflicts.md                     # Active conflicts
    predictions.yaml                 # Tracked predictions

  /meta/
    entities.yaml                    # Entity registry
    sources.yaml                     # Source configs + quality scores
    topics.yaml                      # Topic taxonomy
    collection_log.jsonl             # What ran when
    quality_log.jsonl                # Quality metrics over time
```

### 9.3 Naming Conventions

```yaml
raw_files:
  pattern: "{source_id}_{date}.jsonl"
  example: "competitor_pricing_2026-01-15.jsonl"

processed_files:
  by_date: "{date}.md"
  by_topic: "{topic_slug}.md"
  by_entity: "{entity_id}.md"

entity_files:
  current: "current.yaml"
  recent: "recent.md"
  history: "history.md"

derived_files:
  daily: "daily_briefing.md"
  weekly: "weekly_synthesis.md"

ids:
  pattern: "{source}_{date}_{hash8}"
  example: "pricing_20260115_a3f2b1c9"
```

### 9.4 Update Mechanics

**Current state files (overwrite):**

```
function update_current_state(entity_id, new_state):
    path = /warehouse/entities/{entity_id}/current.yaml

    # Version for audit
    old_state = read(path)
    if old_state != new_state:
        append_to_changelog(entity_id, old_state, new_state)

    # Overwrite
    write(path, new_state)
```

**Time series / event logs (append):**

```
function append_event(source_id, event):
    path = /warehouse/sources/{source_id}/raw/{today}.jsonl

    # Append only
    append_line(path, json(event))
```

**Entity views (regenerate):**

```
function regenerate_entity_view(entity_id):
    # Collect all recent mentions from all sources
    mentions = []
    for source in sources:
        mentions += search_processed(source, entity=entity_id, days=30)

    # Sort by date
    mentions.sort_by(content_date, desc)

    # Generate summary
    recent_summary = summarize_mentions(mentions, model="claude-4-5-opus")

    # Write
    write(/warehouse/entities/{entity_id}/recent.md, recent_summary)
```

**Regeneration triggers:**

```yaml
regeneration:
  entity_views:
    trigger: after processing that mentions entity
    batch_option: queue and regenerate every 4 hours

  daily_briefing:
    trigger: scheduled, 6am

  weekly_synthesis:
    trigger: scheduled, Sunday 8am

  conflicts:
    trigger: after processing detects new conflict
```

---

## Part 10: Integration

How does stored data get into AI context?

### 10.1 Pattern: Direct File Read

Claude Code (or similar agentic coding tools) reads files directly from the warehouse.

```yaml
pattern: file_read
how_it_works:
  - Agent reads relevant files based on query
  - Files are markdown, directly usable as context

when_to_use:
  - Claude Code environment
  - File system access available
  - Query patterns are predictable

example_workflow:
  Query: "What's happening with CompetitorX?"
  Steps:
    1. Read /warehouse/entities/competitor_x/recent.md
    2. If more detail needed, read /warehouse/sources/*/processed/by_entity/competitor_x.md
    3. If very recent needed, read today's raw and process on the fly
```

### 10.2 Pattern: MCP Integration

MCP (Model Context Protocol) provides a standard way to connect AI tools to data sources. If you're building for production use, consider exposing your warehouse through MCP.

```yaml
pattern: mcp_server
how_it_works:
  - Build MCP server that wraps warehouse access
  - AI tools connect via MCP protocol
  - Queries go through defined tool interface

benefits:
  - Standard interface for multiple AI tools
  - Access control and logging built in
  - Works with any MCP-compatible client

implementation_notes:
  - Expose tools like: get_entity_recent, get_daily_briefing, search_by_topic
  - Keep tool definitions simple—complex queries can chain simple tools
  - Log all access for audit
```

### 10.3 Pattern: Pre-Injected Baseline

Common context injected into every conversation.

```yaml
pattern: baseline_injection
how_it_works:
  - Daily briefing included in system prompt or project context
  - Always available without explicit retrieval

when_to_use:
  - Information needed for most queries
  - Low token count (< 5k tokens)
  - Updated on schedule (daily)

structure:
  Always loaded:
    - /warehouse/derived/daily_briefing.md
    - /warehouse/meta/entities.yaml (summary)

  Loaded on topic match:
    - Relevant entity views
    - Relevant topic summaries
```

### 10.4 Pattern: Tiered Loading

Load progressively based on need.

```yaml
pattern: tiered_loading
tiers:
  tier_1_always:
    content: Daily briefing, entity registry summary
    tokens: ~3,000
    loaded: Always

  tier_2_relevant:
    content: Entity recent views, topic summaries for mentioned topics
    tokens: ~10,000
    loaded: When topic/entity detected in query

  tier_3_on_request:
    content: Full processed records, raw data
    tokens: Variable
    loaded: Only when explicitly needed ("show me the raw data", "full details")

decision_logic:
  1. Parse query for entities and topics
  2. Load tier 1 (always)
  3. For each detected entity/topic, load tier 2
  4. If query asks for details/raw/full, load tier 3
```

### 10.5 Common Queries to File Mapping

|Query Type|Files to Load|
|---|---|
|"What's happening today?"|`/derived/daily_briefing.md`|
|"What's happening with {entity}?"|`/entities/{entity}/recent.md`|
|"What are people saying about {topic}?"|`/sources/*/processed/by_topic/{topic}.md`|
|"Any conflicts on {topic}?"|`/derived/conflicts.md`, filter to topic|
|"Show me raw data from {source}"|`/sources/{source}/raw/{date}.jsonl`|
|"Weekly summary"|`/derived/weekly_synthesis.md`|
|"What changed with {entity}?"|`/entities/{entity}/current.yaml` changelog|

---

## Part 11: Lifecycle Management

### 11.1 Decay and Retention

|Data Type|Active Retention|Archive|Delete|
|---|---|---|---|
|Raw collection|30 days|90 days compressed|After 90 days|
|Processed records|90 days|1 year summarized|After 1 year|
|Entity current state|Forever|N/A|Never|
|Entity recent view|30 days regenerating|Rolls into history|N/A|
|Entity history|Forever|Compressed yearly|Never|
|Daily briefings|30 days|1 year|After 1 year|
|Weekly synthesis|1 year|Forever|Never|

### 11.2 Rolling Window Implementation

```
function apply_retention(source_id):
    # Raw: Keep 30 days active
    for file in /sources/{source_id}/raw/:
        if file.date < today - 30 days:
            if file.date < today - 90 days:
                delete(file)
            else:
                compress_and_move_to_archive(file)

    # Processed: Keep 90 days, summarize before archive
    for file in /sources/{source_id}/processed/by_date/:
        if file.date < today - 90 days:
            if not already_summarized(file):
                summary = summarize_for_archive(file)
                append_to_history(source_id, summary)
            archive_or_delete(file)
```

### 11.3 Usage Tracking

Track what gets used to inform deprecation.

```yaml
usage_tracking:
  on_file_read:
    log:
      - file_path
      - timestamp
      - query_context (what question led here)

  metrics_computed:
    - last_accessed: per file
    - access_count_30d: per file
    - citation_count: when file content appears in outputs

  storage: /warehouse/meta/usage_log.jsonl
```

**Deprecation signals:**

```yaml
deprecation_signals:
  source_level:
    - last_cited > 60 days AND signal_score < 0.3 → review
    - last_cited > 90 days → strong deprecation candidate
    - never_cited AND age > 30 days → why are we collecting?

  entity_level:
    - no_mentions_30d AND not_in_active_watchlist → archive

  action: Flag for human review, not auto-delete
```

### 11.4 Target Deprecation

Not just sources—when do you stop watching a target entirely?

```yaml
target_deprecation:
  triggers:
    - Decision it informed is no longer relevant
    - Target became stable (nothing changes)
    - Umbrella deliberately narrowed
    - Attention better spent elsewhere

  process:
    1. Move from active to inactive in watchlist
    2. Generate final state summary
    3. Archive entity files
    4. Stop collection for this target
    5. Keep archived data (may return)

  reactivation:
    - Target becomes relevant again
    - Related entity triggers interest
    - Restore from archive, resume collection
```

---

## Part 12: Monitoring and Quality

### 12.1 Collection Health

**What to track:**

```yaml
collection_health:
  per_run:
    - started_at
    - completed_at
    - status: success | partial | failed
    - items_collected
    - errors: []
    - rate_limit_remaining

  alerts:
    - consecutive_failures >= 3: alert
    - items_collected < 50% of typical: warning
    - rate_limit_remaining < 10%: warning
```

**Health check pattern:**

```
function health_check():
    for source in active_sources:
        last_run = get_last_run(source.id)

        if last_run is None:
            alert("Source never ran", source.id)

        elif last_run.status == "failed":
            if consecutive_failures(source.id) >= 3:
                alert("Source failing repeatedly", source.id)

        elif last_run.items_collected < source.typical_count * 0.5:
            warning("Unusually low collection", source.id)

        elif hours_since(last_run) > source.expected_frequency * 2:
            warning("Source overdue", source.id)
```

### 12.2 Quality Scoring

**Per-source quality:**

```yaml
source_quality:
  signal_score:
    description: "What fraction of items are actually useful"
    calculation: cited_items / total_items (rolling 30 days)
    target: > 0.3 for continued collection

  reliability_score:
    description: "How often collection succeeds"
    calculation: successful_runs / total_runs (rolling 30 days)
    target: > 0.95

  freshness:
    description: "How current is the data"
    calculation: avg time between content creation and collection
    target: within expected velocity

  overall:
    calculation: weighted average
    weights: {signal: 0.5, reliability: 0.3, freshness: 0.2}
```

**Quality log:**

```yaml
# /warehouse/meta/quality_log.jsonl
{
  "date": "2026-01-15",
  "source": "competitor_pricing",
  "metrics": {
    "signal_score": 0.42,
    "reliability_score": 0.98,
    "freshness_hours": 2.3,
    "overall": 0.67
  },
  "items_collected": 156,
  "items_cited": 12
}
```

### 12.3 System Status View

Generate a status summary for human review:

```markdown
# Warehouse Status: 2026-01-15

## Collection Health
| Source | Last Run | Status | Items | Quality |
|--------|----------|--------|-------|---------|
| competitor_pricing | 2h ago | OK | 42 | 0.67 |
| news_rss | 1h ago | OK | 18 | 0.71 |
| competitor_a | 6h ago | PARTIAL | 3 | 0.45 |

## Alerts
- competitor_a: Below typical item count (expected ~15)

## Recommendations
- Review competitor_a source configuration
- Consider deprecating reddit_wsb (signal_score 0.12, last cited 45 days ago)

## Usage (Last 7 Days)
- Most accessed: competitor_x entity (23 reads)
- Most cited source: competitor_pricing (18 citations)
- Never accessed: reddit_wsb, news_secondary
```

---

## Part 13: Verification, Safety, and Legal

### 13.1 Automation Tiers

|Tier|Stakes|Reversibility|Examples|Requirement|
|---|---|---|---|---|
|Full auto|Low|Easy|Summarization, formatting, routine collection|None|
|Auto + log|Medium|Possible|Entity resolution, quality scoring, tagging|Audit trail|
|Human review|High|Hard|Source deprecation, publishing, alerts|Approval before action|
|Human only|Critical|Impossible|Financial transactions, legal statements|No automation|

### 13.2 Blast Radius Assessment

Before automating anything:

```yaml
blast_radius_questions:
  - What breaks if this is wrong?
  - Will we know it's wrong? How quickly?
  - Can it be reversed? At what cost?
  - What's the worst case if wrong for 24 hours undetected?

blast_radius_tiers:
  contained:
    description: "Wrong output affects only immediate task"
    examples: [daily summary has error, entity mislabeled]
    action: Log for review, continue operation

  recoverable:
    description: "Wrong output affects downstream but fixable"
    examples: [bad data in briefing, incorrect trend]
    action: Flag prominently, human review before acting

  damaging:
    description: "Wrong output causes real harm if acted upon"
    examples: [false trading signal, wrong public statement]
    action: Human approval required, no automation
```

### 13.3 Audit Trail

For any automated decision, preserve:

```yaml
audit_record:
  decision: what was decided
  timestamp: when
  inputs: what data was considered (file paths, versions)
  process: what logic was applied
  confidence: how certain
  reversible: yes/no
  reversal_path: how to undo if wrong

storage: /warehouse/meta/decisions.jsonl
```

**Debugging path when wrong:**

```
1. Identify wrong output
2. Find audit record for that output
3. Retrieve inputs that were used
4. Check: Was input data wrong, or was processing wrong?
5. If input wrong: trace to source, fix collection or source
6. If processing wrong: fix processing logic
7. Determine blast radius: what else was affected?
8. Remediate downstream effects
```

### 13.4 Legal and Privacy Considerations

This framework involves collecting and storing external data. Legal requirements vary by jurisdiction and data type.

**Questions to answer before building:**

```yaml
legal_considerations:
  data_collection:
    - Does the source's ToS prohibit scraping/automated access?
    - Are you accessing data behind authentication in violation of terms?
    - Are you collecting personal data subject to GDPR/CCPA/etc.?

  data_storage:
    - How long can you retain this data legally?
    - Do you need to respond to deletion requests?
    - Is this data subject to discovery in litigation?

  data_use:
    - Are you using data for purposes beyond what's permitted?
    - Are you republishing data that's copyright-protected?
    - Could your use be considered competitive harm?
```

**Practical guidance:**

- **Public data from companies** (pricing pages, press releases, job postings): Generally safe
- **Data requiring login/API key**: Check terms of service
- **Personal data** (social media posts with identifying info): Consult legal counsel
- **Scraping at scale**: Many sites prohibit this in ToS; respect robots.txt at minimum

**This document does not constitute legal advice.** Consult with a lawyer familiar with your jurisdiction and use case.

### 13.5 Security of the Warehouse

If you're storing competitive intelligence or sensitive data:

```yaml
security_basics:
  access_control:
    - Who can read the warehouse?
    - Who can modify source configs?
    - Are credentials stored securely?

  encryption:
    - At rest: encrypt sensitive directories
    - In transit: HTTPS for all collection

  backup:
    - Regular backups of warehouse
    - Test restore process
    - Offsite backup for critical data

  monitoring:
    - Log access attempts
    - Alert on unusual access patterns
    - Review access logs periodically
```

---

## Part 14: Failure Recovery

What happens when the system breaks?

### 14.1 Failure Modes

```yaml
failure_modes:
  source_unavailable:
    symptoms: Collection fails, no new data
    impact: Gaps in monitoring
    detection: Health check alerts
    recovery: Wait for source to recover, backfill if API supports it

  processing_backlog:
    symptoms: Raw data accumulating, processed data stale
    impact: Outdated briefings, missing signals
    detection: Processing lag metric
    recovery: Prioritize high-importance items, batch process rest

  corruption:
    symptoms: Bad data in warehouse
    impact: Wrong conclusions, bad decisions
    detection: Quality gates, sampling
    recovery: Identify scope, restore from backup or reprocess

  total_outage:
    symptoms: Nothing running
    impact: Complete blind spot
    detection: Hopefully you notice quickly
    recovery: See 14.2
```

### 14.2 Recovery Protocol

**After total outage (system was down for days):**

```
1. Assess what was missed
   - Check collection logs: when did each source last succeed?
   - Calculate gap size per source

2. Prioritize backfill
   - High-stakes entities first
   - Sources that support historical fetch
   - Accept that some data is lost if source doesn't support backfill

3. Regenerate derived content
   - Daily briefings for missed days (if raw data recovered)
   - Entity views (will regenerate from whatever data exists)

4. Note the gap
   - Add explicit note to briefings: "Data gap {date1} to {date2}"
   - Don't pretend you have complete coverage

5. Post-mortem
   - Why did the outage happen?
   - How do we prevent recurrence?
   - Do we need better alerting?
```

### 14.3 Graceful Degradation

Design for partial failure:

```yaml
degradation_levels:
  full_operation:
    - All sources collecting
    - All processing running
    - All derived content fresh

  degraded_collection:
    - Some sources failing
    - Action: Continue with working sources, alert on failures
    - Briefings note: "Source X unavailable"

  degraded_processing:
    - Collection works, processing backed up
    - Action: Serve raw data, mark as unprocessed
    - Users get data but without enrichment

  degraded_synthesis:
    - Collection and processing work, synthesis fails
    - Action: Serve processed records, manual synthesis
    - Users assemble picture themselves

  minimal_operation:
    - Everything failing except health checks
    - Action: Alert loudly, manual intervention required
```

---

## Part 15: Attention Allocation

When monitoring many targets, how do you decide what gets attention?

### 15.1 Triggers

```yaml
attention_triggers:
  anomaly:
    description: "Something unusual happened"
    examples:
      - Entity mentioned 5x more than typical
      - Sentiment shifted significantly
      - Out-of-character content from source
    priority_boost: +0.3

  threshold:
    description: "Predefined level crossed"
    examples:
      - Price hit target
      - Deadline approaching
      - Metric exceeded limit
    priority_boost: +0.4

  event:
    description: "Known catalyst occurred"
    examples:
      - Earnings released
      - Product launched
      - Regulatory decision made
    priority_boost: +0.5

  correlation:
    description: "Related entity had significant activity"
    examples:
      - Competitor made announcement
      - Sector-wide movement
      - Key person changed
    priority_boost: +0.2
```

### 15.2 Priority Scoring

```yaml
priority_factors:
  decision_relevance:
    question: "Does this affect a pending decision?"
    weight: 0.4
    scoring:
      - directly_affects_active_decision: 1.0
      - affects_decision_in_next_week: 0.7
      - affects_decision_eventually: 0.3
      - no_pending_decision: 0.1

  time_sensitivity:
    question: "Does delay cost me?"
    weight: 0.3
    scoring:
      - value_lost_every_hour: 1.0
      - value_lost_every_day: 0.7
      - value_lost_every_week: 0.3
      - no_time_sensitivity: 0.1

  information_gain:
    question: "How much uncertainty does this resolve?"
    weight: 0.2
    scoring:
      - resolves_major_uncertainty: 1.0
      - provides_significant_clarity: 0.6
      - incremental_information: 0.3
      - noise_mostly: 0.1

  reliability:
    question: "Can I trust this signal?"
    weight: 0.1
    scoring:
      - tier_1: 1.0
      - tier_2: 0.8
      - tier_3: 0.5
      - tier_4: 0.25

priority_calculation:
  base_score = sum(factor_score * factor_weight)
  final_score = base_score + trigger_boosts

priority_actions:
  score > 0.8: immediate attention
  score > 0.5: daily review
  score > 0.2: weekly review
  score < 0.2: ignore unless pattern emerges
```

### 15.3 Calibration

Weights are starting points. Adjust based on failure modes:

```yaml
calibration:
  if_missing_time_sensitive_signals:
    action: increase time_sensitivity weight

  if_acting_on_bad_data:
    action: increase reliability weight

  if_drowning_in_noise:
    action: raise thresholds across the board

  if_missing_important_but_non_urgent:
    action: increase decision_relevance weight

  review_cadence: monthly
  method:
    - List signals that mattered but were missed
    - List signals that got attention but didn't matter
    - Adjust weights to reduce both failure modes
```

---

## Part 16: Economics

### 16.1 Cost Model

```yaml
cost_structure:
  collection:
    apis: $0-100/month (depends on sources and tiers)
    compute: ~$0 (runs on local machine / cheap server)
    total: ~$50/month typical

  processing:
    model_costs:
      - haiku: lowest tier
      - sonnet: mid tier
      - opus: highest tier
    typical_daily:
      - 500 items @ 300 tokens each = 150k tokens
      - Summarization: $X depending on model
      - Entity resolution: $X depending on model
      - Daily briefing: $X depending on model
      - Estimate: $1-5/day range, $30-150/month

  storage:
    disk: ~$0 (megabytes, not meaningful)

  usage:
    context_loading:
      - avg query loads ~25k tokens
      - 15 queries/day = 375k tokens
      - Cost depends on model used for queries

  total_typical: $100-300/month range

scaling_notes:
  - Collection scales with sources, not items
  - Processing scales with items (use haiku for volume)
  - Usage scales with queries and context size
  - Storage is not a meaningful cost
```

**Note:** API pricing changes frequently. Build cost tracking into your system: log token usage per operation, review monthly, adjust model selection based on actual costs vs. value delivered.

### 16.2 Optimization Levers

```yaml
reduce_processing_cost:
  - Use Haiku for high-volume, low-stakes processing
  - Batch similar items (summarize 50 tweets together, not individually)
  - Skip AI processing for low-value items (filter before process)
  - Pre-extract entities with rules, use AI only for ambiguous
  savings: 30-50%

reduce_usage_cost:
  - Tier your loading (summaries first, details on request)
  - Pre-compute common views (daily briefing)
  - Cache recent query results
  - Use Sonnet for routine queries, Opus for synthesis only
  savings: 40-60%

reduce_collection_cost:
  - Deprecate unused sources
  - Use free tiers, upgrade only for critical
  - Cache API responses where possible
  - Match frequency to actual need (don't poll hourly what you check weekly)
  savings: 20-40%

reduce_attention_cost:
  - Better filters (higher signal/noise)
  - Better prioritization (attend to what matters)
  - Better summaries (extract signal, not volume)
  savings: most valuable, can't be quantified
```

### 16.3 When Complexity Isn't Worth It

```yaml
dont_build_system_when:
  - Decision is one-time (just search)
  - Stakes don't justify maintenance
  - Signal/noise is too low to be useful
  - Access complexity exceeds value
  - You won't actually use it

simplify_existing_when:
  - Source hasn't been cited in 60+ days → deprecate
  - Processing step adds cost but not value → skip
  - Granularity exceeds decision needs → go shallower
  - Update frequency exceeds check frequency → slow down

principle: "Systems have ongoing costs. Every component must earn its place."
```

---

## Part 17: Implementation Path

### 17.1 Week 1: Decisions (No Code)

```yaml
deliverables:
  1. Domain definition:
     - What domain am I monitoring?
     - What are the primary sources for this domain?

  2. Target list:
     - 5-10 specific targets worth watching
     - For each: why does this matter to my decisions?

  3. Granularity assessment:
     - For each target: what layer do I actually need?
     - Am I tempted to go deeper than necessary?

  4. Storage decision:
     - For each target: store or fetch on demand?
     - What history do I actually need?

  5. Source identification:
     - 3-5 sources that cover my targets
     - For each: channel type, reliability tier, access tier

  6. Kill filter check:
     - Each source passes all four criteria
     - Any sources I'm tempted to add but shouldn't?

output: Written document with these decisions. Not code.
```

### 17.2 Week 2: Single Source Working

```yaml
deliverables:
  1. Collection:
     - Script for ONE source
     - Scheduled to run at appropriate frequency
     - Error handling and logging
     - Output: raw JSONL files

  2. Processing:
     - Script to transform raw → processed
     - Entity registry with 10-15 relevant entities
     - Reliability tagging
     - Output: Markdown with frontmatter

  3. Basic structure:
     - /warehouse/sources/{source}/raw/
     - /warehouse/sources/{source}/processed/
     - /warehouse/meta/entities.yaml
     - /warehouse/meta/sources.yaml

  4. First output:
     - Generate first daily summary
     - Manually review: Is this useful?

validation: Run for 3 days. Is the output useful? Are there errors?
```

### 17.3 Week 3: Add Structure

```yaml
deliverables:
  1. Deduplication:
     - Content hashing at collection
     - Skip or link duplicates

  2. Entity views:
     - /warehouse/entities/{entity}/recent.md
     - Regenerated after processing

  3. Monitoring:
     - Collection health logging
     - Basic quality metrics
     - Status summary generation

  4. Usage tracking:
     - Log when files are read
     - Start tracking what gets cited

validation: Review status summary. Is collection healthy? Is quality acceptable?
```

### 17.4 Week 4: Iterate

```yaml
activities:
  1. Review:
     - Which sources are being cited?
     - Which aren't?
     - Is signal/noise acceptable?

  2. Adjust:
     - Deprecate sources that aren't earning their place
     - Add sources for gaps you're noticing
     - Tune collection frequency
     - Tune summarization prompts

  3. Expand (maybe):
     - Add second source using proven pattern
     - Only if first source is stable

  4. Document:
     - What's working?
     - What needs improvement?
     - What would you do differently?

principle: "Get one source working well before adding complexity."
```

### 17.5 Expansion Principles

```yaml
add_source_when:
  - Existing sources are stable and useful
  - Clear gap in coverage identified
  - New source passes kill filter
  - Maintenance capacity exists

add_complexity_when:
  - Solving a problem you actually have
  - Simpler approach has proven insufficient
  - Benefit clearly exceeds cost

remove_when:
  - Not being used
  - Cost exceeds benefit
  - Maintenance burden too high
  - Original need no longer exists

principle: "Grow by necessity, not anticipation."
```

---

## Appendix A: Prompt Templates

### A.1 Summarization Prompt

```
You are summarizing {content_type} for a monitoring system.

Content:
{content}

Summarize for someone who needs to:
- Quickly understand what matters
- Identify any significant changes or signals
- Decide if deeper attention is warranted

Format your response as:

## Summary
[2-3 sentences capturing the essential point]

## Key Facts
[Bullet list of specific, factual claims - not interpretations]

## Entities
[People, companies, products mentioned - with brief context]

## Signal
[Is there anything unusual, significant, or actionable here? If nothing notable, say "Routine."]

Keep total response under {token_limit} tokens.
```

### A.2 Entity Resolution Prompt

```
Match entity mentions to the registry.

Text:
{text}

Potential mentions found:
{candidates}

Registry (relevant entries):
{registry_subset}

For each mention, respond with:
{
  "text": "the mention as it appears",
  "entity_id": "matched entity or null",
  "confidence": "high/medium/low",
  "reasoning": "brief explanation"
}

If a mention doesn't match any registry entry, set entity_id to null.
If ambiguous between multiple entities, explain in reasoning and use lower confidence.
```

### A.3 Daily Briefing Prompt

```
Generate a daily briefing from today's processed data.

Sources processed:
{list of files with summaries}

Entity activity:
{entity activity summary}

Known conflicts:
{active conflicts}

Generate a briefing for {date} that:
1. Leads with the most significant developments
2. Groups related items
3. Flags anything requiring attention
4. Notes any conflicts or uncertainties
5. Keeps total length under {token_limit} tokens

Format:

# Daily Briefing: {date}

## Top Developments
[Most important 2-3 items]

## By Entity
[Significant activity per relevant entity]

## Signals
[Anything unusual or potentially actionable]

## Conflicts/Uncertainties
[Active disagreements between sources]

## Low Priority
[Noted but not urgent]
```

### A.4 Conflict Detection Prompt

```
Analyze these claims for conflicts.

Claims:
{list of claims with sources, dates, reliability tiers}

Identify any conflicts:
- Factual disagreement (different claims about same verifiable fact)
- Directional disagreement (different predictions or interpretations)
- Temporal disagreement (old info vs new info)

For each conflict found, provide:
{
  "topic": "what the conflict is about",
  "type": "factual/directional/temporal",
  "claims": [
    {"source": "...", "claim": "...", "date": "...", "reliability": "..."},
    {"source": "...", "claim": "...", "date": "...", "reliability": "..."}
  ],
  "resolution": "resolved (with explanation) or unresolved",
  "significance": "high/medium/low"
}

If no conflicts found, respond with empty array.
```

---

## Appendix B: Script Patterns

### B.1 Main Collection Loop

```
function run_collection():
    sources = load_active_sources()

    for source in sources:
        if not due_for_collection(source):
            continue

        log_start(source.id)

        try:
            if source.type == "api":
                results = collect_api(source.config)
            elif source.type == "rss":
                results = collect_rss(source.config)
            elif source.type == "scrape":
                results = collect_scrape(source.config)

            log_success(source.id, len(results))

            if source.config.process_immediately:
                process_source(source.id)

        except Exception as e:
            log_failure(source.id, e)
            handle_failure(source, e)

function due_for_collection(source):
    last_run = get_last_run(source.id)
    if last_run is None:
        return True
    return hours_since(last_run) >= source.frequency_hours
```

### B.2 Main Processing Loop

```
function run_processing():
    for source in sources_with_unprocessed():
        raw_files = get_unprocessed_raw(source.id)

        for raw_file in raw_files:
            items = load_jsonl(raw_file)
            processed = []

            for item in items:
                # Pipeline stages
                extracted = extract(item, source.config)

                dupe_check = dedupe(extracted, recent_items)
                if dupe_check.action == "skip":
                    continue

                enriched = enrich(extracted, source.config, entity_registry)

                if should_summarize(enriched, source.config):
                    enriched.summary = summarize(enriched, model="claude-4-5-sonnet")

                processed.append(enriched)

            # Save processed
            save_processed(source.id, raw_file.date, processed)
            mark_as_processed(raw_file)

            # Update entity views
            affected_entities = unique(flatten([p.entities for p in processed]))
            for entity_id in affected_entities:
                queue_entity_regeneration(entity_id)
```

### B.3 Entity View Regeneration

```
function regenerate_entity_view(entity_id):
    # Gather all recent mentions
    mentions = []

    for source in sources:
        source_mentions = search_processed(
            source_id=source.id,
            entity_id=entity_id,
            days=30
        )
        mentions.extend(source_mentions)

    if not mentions:
        return  # No recent activity

    # Sort by recency
    mentions.sort(by=content_date, order=desc)

    # Generate current state summary
    current = extract_current_state(entity_id, mentions)
    save_yaml(f"/entities/{entity_id}/current.yaml", current)

    # Generate recent activity view
    recent_summary = generate_entity_summary(
        entity_id=entity_id,
        mentions=mentions,
        model="claude-4-5-opus"
    )
    save_markdown(f"/entities/{entity_id}/recent.md", recent_summary)
```

### B.4 Daily Briefing Generation

```
function generate_daily_briefing():
    today = current_date()

    # Gather today's processed content
    all_processed = []
    for source in sources:
        processed = load_processed(source.id, today)
        all_processed.extend(processed)

    # Gather entity activity
    entity_activity = {}
    for entity_id in active_entities:
        activity = get_entity_activity(entity_id, today)
        if activity:
            entity_activity[entity_id] = activity

    # Gather active conflicts
    conflicts = load_active_conflicts()

    # Generate briefing
    briefing = call_claude(
        prompt=daily_briefing_prompt(
            processed=all_processed,
            entity_activity=entity_activity,
            conflicts=conflicts,
            date=today
        ),
        model="claude-4-5-opus"
    )

    save_markdown(f"/derived/daily_briefing.md", briefing)
```

---

## Appendix C: Schema Reference

### C.1 Entity Registry Schema

```yaml
# /warehouse/meta/entities.yaml

entities:
  {entity_id}:
    canonical: "Display name"
    type: company | person | product | topic | other
    identifiers:
      {type}: {value}  # ticker, cik, handle, etc.
    aliases:
      - "alias 1"
      - "alias 2"
    related:
      - entity: {other_entity_id}
        relation: {relationship_type}
    metadata:
      added: {date}
      last_updated: {date}
      notes: "optional notes"
```

### C.2 Source Config Schema

```yaml
# /warehouse/meta/sources.yaml

sources:
  {source_id}:
    name: "Human readable name"
    type: api | rss | scrape | manual
    reliability_tier: 1 | 2 | 3 | 4

    collection:
      frequency_hours: {number}
      endpoint: "url or api endpoint"
      auth: {auth_config if needed}
      params: {collection parameters}

    processing:
      content_field: "field.path.to.content"
      date_field: "field.path.to.date"
      summarize: true | false
      summarize_threshold_tokens: {number}

    quality:
      signal_score: {0-1, computed}
      reliability_score: {0-1, computed}
      last_cited: {date}
      typical_count: {expected items per run}

    status: active | paused | deprecated
```

### C.3 Record Frontmatter Schema

```yaml
---
# Required
id: {unique_id}
type: event_log | current_state | time_series
source: {source_id}
reliability: tier_1 | tier_2 | tier_3 | tier_4
entities: [{entity_ids}]
collected_at: {ISO timestamp}
content_date: {ISO timestamp}

# Required for debugging
raw_source: {path to raw file}
processed_by: {processor identifier}
content_hash: {hash}

# Recommended
topics: [{topic_tags}]
url: {source url if applicable}

# Optional
summary: {summary if long content}
engagement: {metrics if social}
confidence: high | medium | low
flags: [{anomaly_flags}]
---
```

### C.4 Quality Log Schema

```yaml
# /warehouse/meta/quality_log.jsonl (one line per entry)

{
  "date": "YYYY-MM-DD",
  "source_id": "{source}",
  "metrics": {
    "signal_score": {0-1},
    "reliability_score": {0-1},
    "freshness_hours": {number},
    "overall_score": {0-1}
  },
  "counts": {
    "collected": {number},
    "processed": {number},
    "deduplicated": {number},
    "cited": {number}
  },
  "issues": ["{any issues noted}"]
}
```

---

## Final Notes

This framework exists to answer: **When I sit down to monitor something or store external data, what should I think about?**

The answer, condensed:

1. **Do I even need a system?** (Recurring need, history matters, stakes justify cost)

2. **What am I watching?** (Targets, granularity, umbrella)

3. **How hard is it to get?** (Complexity, substitution options)

4. **Store or fetch?** (History needs x access cost)

5. **How much do I trust it?** (Primary sources, reliability tiers, corroboration)

6. **How do I represent it?** (Entities, temporal types, conflicts)

7. **How do I know the AI got it right?** (Quality control, sampling, feedback)

8. **How do I maintain it?** (Lifecycle, usage tracking, deprecation)

9. **How do I use it?** (Integration patterns, context loading, MCP)

10. **How do I not break things?** (Verification, blast radius, audit trails)

11. **What if it breaks?** (Failure recovery, graceful degradation)

12. **Is it legal and secure?** (ToS, privacy, security basics)

13. **Is it worth it?** (Costs, optimization, simplification)


The infrastructure follows from these questions. If you can answer them clearly, the implementation is execution. If you can't, no amount of infrastructure will help.

Build what you need. Nothing more.

---

**Related essays:**
- [[Maximizing AI Utility as a Business Owner]] — context philosophy
- [[Multi-agent Network Orchestration]] — for processing at scale
- [[Intelligence as a Commodity]] — the faucet/workflow framework

**Version:** v4 (January 2026)
