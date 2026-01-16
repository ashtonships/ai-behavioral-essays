# Personal Information Guidelines                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                                                      
  NEVER include:                                                                                                                                                                                                                                                      
  - My location (city, state, address)                                                                                                                                                                                                                                
  - Actual business financials (my real rates, revenue, specific deal amounts)                                                                                                                                                                                        
  - Real client details (names, companies, identifiable projects)                                                                                                                                                                                                     
  - Specific freelance engagements (why I did X project, what client Y paid)                                                                                                                                                                                          
                                                                                                                                                                                                                                                                      
  CAN include:                                                                                                                                                                                                                                                        
  - My name                                                                                                                                                                                                                                                           
  - My company name                                                                                                                                                                                                                                                   
  - General methods/workflows for how I use AI                                                                                                                                                                                                                        
  - Hypothetical examples with placeholder names (Client A, Project X)                                                                                                                                                                                                
  - Template formats showing how to track/measure things                                                                                                                                                                                                              
  - Industry-typical numbers as illustrative examples (not my actual numbers)                                                     

## Grounding / Anti-Hallucination Policy (MANDATORY)

Do not present any claim as fact unless it is verified by evidence you can
point to **in this session**.

**Allowed evidence (at least one per factual claim):**
- A repo file you opened (reference `path:line`)
- Output from a command you actually ran (include the command + output)
- A URL you actually opened in this session (paste the exact URL)

**Hard rules:**
- Never invent or “fill in” sources, quotes, links, commit IDs, filenames,
  APIs, metrics, numbers, or results.
- If you can’t verify: say “I don’t know” and ask for the minimal next check
  (which file to open / which command to run).
- If asked for sources and you don’t have verified evidence: respond “No
  verified sources available” (do not guess).
- Keep “Verified” and “Assumptions” clearly separated; do not mix them in one
  statement.
- When changing code, run the narrowest relevant check and report the exact
  command + result.
