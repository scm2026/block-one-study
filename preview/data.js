const META = {"id": "one", "name": "Block One"};
const EXHIBITS = {};
const IMG = {};
const T = (t,v)=>({t,v});
const DIALS = [["concept_load","Concepts at once"],["concept_depth","Concept depth"],
 ["structure_difficulty","Framework difficulty"],["math_load","Math load"],
 ["data_complexity","Data complexity"],["industry_distance","Industry distance"]];
const CASES = [
{
 id:"BTH-01", step:1, name:"Army Hotel", pages:"pp. 69–74", firm:"McKinsey · interviewer-led",
 type:"Market entry · hospitality",
 dials:{concept_load:3,concept_depth:2,structure_difficulty:2,math_load:3,data_complexity:1,industry_distance:2},
 newTools:["Price ceiling","Breakeven","Capacity","Non-occupancy revenue"], carried:[],
 bridge:null,
 teaches:"A price ceiling set by someone else's budget caps revenue no matter how good the product is.",
 why:"The opening case runs the whole arc — structure, price, volume, cost, a decision — on numbers clean "
     +"enough that none of the steps fight you. Everything after this turns exactly one thing up.",
 nodes:{decision:T("Build the hotel?",""),rev:T("Revenue","$7.2M / yr"),cost:T("Costs","$4M/yr + $20M once"),
        vol:T("Room-nights","120,000"),price:T("Rate","$60 / night"),opex:T("Running cost","$4M / yr"),
        capex:T("Build cost","$20M once"),profit:T("Operating profit","$3.2M / yr"),pay:T("Payback","6.25 yrs")},
 live:["decision","rev","cost","vol","price","opex","capex","profit","pay"],
 steps:[
  {tab:"Prompt", title:"What the interviewer says", clock:0,
   rubric:"Problem definition — restate it before attacking it.",
   ask:["Who actually stays in this hotel?","What does the PE firm want — cash, or a sale later?"],
   watch:"Free land invites you to treat the build as cheap. It isn't.",
   src:"Our client is a PE firm that has the opportunity to invest in building a 400-room hotel on an army "
      +"base. The government has decided to give our client the land for free — our client can build the "
      +"hotel and keep all of the profits. Our client has hired you to find out what they need to know to "
      +"determine if they should build it or not.",
   ours:"A PE firm never asks 'is this profitable'. It asks 'how fast do I get my money back'. That "
       +"question decides this case, and it is not in the prompt — you have to ask for it."},
  {tab:"Framework", title:"Structure it before you touch a number", clock:1,
   rubric:"Structure — MECE, and tailored to a hotel rather than generic.",
   ask:["How many soldiers pass through, and for how long?","What else is there to stay in nearby?"],
   watch:"'Revenue' should already say room-nights × rate.",
   attempt:{q:"What are the three or four buckets you'd need?",
            a:"Revenue, costs, and the client's hurdle. Revenue splits into room-nights and rate; costs "
             +"into running the place each year and building it once. Without the hurdle you can compute a "
             +"profit and still not know the answer."},
   src:"Hotel market (competition, customers); profitability (revenues — demand/occupancy, rooms, pricing, "
      +"willingness to pay, non-occupancy revenue; costs — capital expenses, building/investment, breakeven "
      +"timeline, operational expenses); client interests (portfolio mix, investment goals, exit, "
      +"opportunity cost).",
   ours:"The same tree every later case starts from. Note what this framework lists and never uses: "
       +"non-occupancy revenue, and opportunity cost."},
  {tab:"Price", title:"Someone else sets your price", clock:2, fig:"price",
   rubric:"Business judgment — the price is capped by what the Army will reimburse ($75 a night, meals included), not by what other hotels charge.",
   ask:["What does the per diem have to cover besides the room?","How far away are the alternatives?"],
   watch:"Naming a price without subtracting meals from the per diem is the mistake this step catches.",
   attempt:{q:"The Army reimburses $75 a night, covering breakfast and dinner too. Nearby hotels are $110, "
              +"$75 and $40, all 20 miles away. What do you charge?",
            a:"Below $75 minus two meals. Only the Days Inn at $40 is a real alternative, and it is 20 miles "
             +"from the base, which is worth something. The casebook fixes $60 for the rest of the case."},
   src:"The candidate should consider how much breakfast and dinner will cost the soldier and ensure those "
      +"costs plus the nightly rate will not exceed the stipend. The candidate should recognise that the "
      +"Days Inn ($40/night) is the only competitive option the soldier is likely to consider. Assume for "
      +"the rest of the case that the hotel charges $60/night.",
   ours:"When a third party reimburses, your ceiling is their budget — not what the customer would pay and "
       +"not what rivals charge. It also means you cannot raise price later, which is what kills the deal."},
  {tab:"Volume", title:"Build demand from who actually turns up", clock:2, fig:"volume",
   rubric:"Analytical ability — organised arithmetic, stated units.",
   ask:["How many classes run each year, and how long is each?","How often are soldiers rotated?"],
   watch:"The unit is room-nights, not soldiers.",
   attempt:{q:"Basic training: 200 soldiers, 10 weeks, 5 times a year. Advanced: 50, 4 weeks, 10 times. "
              +"Plus 9,000 soldiers rotated every 3 years, each given 15 days. How many room-nights?",
            a:"200 × 70 × 5 = 70,000. 50 × 28 × 10 = 14,000. 9,000 ÷ 3 = 3,000 a year × 15 = 45,000. "
             +"Total 129,000, rounded to 130,000. At $60 that is $7.8M."},
   src:"Basic 200 people, 10 weeks, 5 times/year = 70,000 rooms/year. Advanced 50 people, 4 weeks, 10 "
      +"times/year = 14,000. Temp. 3,000 people, 15 nights = 45,000. Total rooms/yr = 129,000 (round to "
      +"130,000). Total revenue = $7.8 million @ $60 per night.",
   ours:"The rotations are the biggest block and the one nobody thinks of. Trainees are visible; people "
       +"quietly moving house are not."},
  {tab:"Capacity", title:"The ceiling that cuts the answer down", clock:2, fig:"capacity",
   rubric:"Analytical ability — a demand figure is not a sales figure.",
   ask:["Is demand spread evenly across the year?","How many rooms does the hotel have?"],
   watch:"Always test a volume against capacity.",
   attempt:{q:"Anything that would stop the hotel earning $7.8M? (You'll then be told: in the busiest four "
              +"months it is short 80 rooms a night.)",
            a:"80 × 4 × 30 = 9,600, rounded to 10,000. Sellable volume is 120,000, so $7.2M not $7.8M."},
   src:"80 rooms × 4 months × 30 days per month = 9,600 rooms per year (round this to 10,000). So the new "
      +"number of rooms is 120,000 × $60 per night = $7.2M/year in annual revenue.",
   ours:"Annual capacity is 400 × 365 = 146,000, so there is slack over a year. The constraint bites only "
       +"in a window — which an annual average would have hidden completely."},
  {tab:"Costs", title:"Two kinds of cost, one of them annual", clock:2, fig:"costs",
   rubric:"Structure — separating what recurs from what is spent once.",
   ask:["What does it cost to run each year?","What did a comparable hotel cost to build, per room?"],
   watch:"Free land is not a free building.",
   attempt:{q:"Running costs are $4M a year; a comparable hotel invested $50,000 per room. Operating "
              +"profit, and what is paid up front?",
            a:"$7.2M − $4M = $3.2M a year. The build is 400 × $50,000 = $20M, spent once, before any of "
             +"that profit arrives."},
   src:"Assume total Op-ex of $4 million per year. The Hampton Inn made an initial investment of $50,000 "
      +"per room; the same costs can be assumed for our client's hotel. Total initial investment of $20 "
      +"million to build a 400 room hotel. Operating profit is $7.2M − $4M = $3.2M.",
   ours:"The $4M sits inside the annual picture; the $20M sits outside it and is what that picture has to "
       +"pay back. Put the $20M in the wrong place and the case collapses."},
  {tab:"Payback", title:"Does the money come back fast enough?", clock:2, fig:"payback",
   rubric:"Business judgment — answer against the client's hurdle, not in the abstract.",
   ask:["What payback period does the firm require?","Is there other revenue the hotel could earn?"],
   watch:"$3.2M a year sounds healthy. Against a 4–5 year hurdle it isn't.",
   attempt:{q:"The client wants its money back within 4–5 years. Does this clear?",
            a:"$20M ÷ $3.2M = 6.25 years, so it misses by more than a year — and the price can't rise to "
             +"close the gap, because the per diem caps it."},
   src:"Breakeven time = fixed costs (investment) / operating margin: $20M / $3.2M = 6-7 years. Probe for "
      +"ideas to decrease it: add a restaurant, host army conferences, decrease costs or increase occupancy.",
   ours:"Two objections, beside the casebook's answer rather than instead of it. $20M ÷ $3.2M is 6.25, not "
       +"'6–7' — and the rounding widens the gap that drives the recommendation. And it asks 'is this a "
       +"good rate of return?' without answering: $3.2M on $20M is about 16% a year, rejected here only "
       +"because this client wants its cash back sooner. Payback is not a return."},
  {tab:"Answer", title:"Say the answer first", clock:3,
   rubric:"Synthesis — answer, two or three reasons, risks. Under a minute.",
   ask:[], watch:"Don't narrate the analysis again.",
   attempt:{q:"Give the recommendation in four sentences.",
            a:"Don't build it. About $3.2M a year against a $20M build is a 6.25-year payback against a "
             +"4–5 year requirement. The price can't be raised, because the Army's per diem caps it. Worth "
             +"checking non-room revenue and other bases before closing the file."},
   src:"The PE firm should not invest. Annual operating profits are $3.2M; a breakeven period of 6-7 years "
      +"exceeds the firm's goal of 4-5 years; current army per diem does not allow for increases in the "
      +"price of the hotel/night.",
   ours:"Carry forward: a third party's budget is a ceiling, a constraint can bite in a window, and a "
       +"one-off outlay stays outside the annual picture."}
 ]
},
{
 id:"BTH-19", step:2, name:"Heavy Attrition", pages:"pp. 189–193", firm:"Z.S. Associates · candidate-led",
 type:"Organizational change · medical devices",
 dials:{concept_load:2,concept_depth:3,structure_difficulty:4,math_load:1,data_complexity:1,industry_distance:2},
 newTools:["Structure without data"], carried:["Price ceiling","Breakeven","Capacity"],
 bridge:{turn:"Framework difficulty 2 → 4, and math load 3 → 1",
   text:"This is the block's sharpest step and the dials say so: framework difficulty jumps two levels "
       +"while the arithmetic disappears completely. In Army Hotel the structure was handed to you by the "
       +"shape of the numbers — revenue, cost, payback. Here there are no numbers at all, so the structure "
       +"is the entire answer. Before you start: you are being asked why one group of people leaves and a "
       +"similar group doesn't, and the only move available is to find what differs between the two groups."},
 teaches:"When one group leaves and a similar group stays, look for the difference in what the two groups "
        +"are paid for — not for a company-wide cause.",
 why:"Math off, structure up. With nothing to compute, the only thing being trained is how you carve an "
     +"ambiguous question into testable pieces.",
 nodes:{decision:T("Why do juniors leave?",""),rev:T("Revenue","what a sale is worth"),
        cost:T("Costs","what a rep is paid"),vol:T("Volume","how much they sell"),
        price:T("Rate","commission per sale"),opex:T("Running cost","salary + commission"),
        capex:T("Build cost","—"),profit:T("Operating profit","—"),pay:T("Payback","—")},
 live:["decision","rev","cost","price","opex"],
 steps:[
  {tab:"Prompt", title:"An ambiguous question, on purpose", clock:0,
   rubric:"Problem definition — pinning down a word that hasn't been defined.",
   ask:["Heavy compared with what — last year, or the rest of the industry?",
        "Which salespeople, and how long do they stay?"],
   watch:"'Heavy' is not a number. If you never ask what it's measured against, you're solving an undefined problem.",
   src:"Our client has asked us to look into why there is such heavy attrition amongst the junior "
      +"salespeople in the organization. Where do you think we should start?",
   ours:"One line, no data, and the interviewer will not drive. This is a partner-style case: they want to "
       +"see what you do with an empty room."},
  {tab:"The facts", title:"Three facts, and what they rule out", clock:1,
   rubric:"Information — identifying what you need before asking for it.",
   ask:["How long does a new hire stay?","How long until they're productive?",
        "What happens to people who make it past three years?"],
   watch:"The senior/junior contrast is the whole case. If you miss it you'll chase company-wide causes.",
   attempt:{q:"Ask, and you're told: new hires stay under a year, take six months to get up to speed, and "
              +"salespeople past three years almost never leave. What does that rule out?",
            a:"Anything that affects everyone equally. Pay levels across the firm, the product, the "
             +"industry, the office — all of it applies to seniors too, and seniors are staying. Whatever "
             +"is wrong has to be something that differs between the two groups. It also means each hire "
             +"is barely profitable: six months of ramp inside a tenure under twelve."},
   src:"The average time a newly hired salesperson stays in the organization is less than one year. This is "
      +"worrisome because it takes about 6 months for a new salesperson to learn how to do their job well "
      +"and get up to speed. On the other hand, experienced salespersons (people who have been with the "
      +"organization greater than 3 years) have almost no attrition. The organization is a fairly new "
      +"medical devices company that has been operating for 10 years.",
   ours:"This is the whole evidence base. Everything after this point in the casebook is generated by the "
       +"candidate, not given by the client."},
  {tab:"Structure", title:"Carve it where the two groups differ", clock:1, fig:"attrition",
   rubric:"Structure — a framework that tests something rather than asserting it.",
   ask:["Do juniors and seniors sell the same products?","Do they cover the same territories?"],
   watch:"Buckets that state conclusions can't be tested. 'Work conditions are similar' is an assumption, not a finding.",
   attempt:{q:"Build the structure. What differs between a first-year rep and a four-year rep?",
            a:"What they sell (product mix, and whether juniors are allowed the high-value lines), where "
             +"they sell it (territory size, travel distance), and what they're paid for it (fixed salary "
             +"versus commission, and what the commission is calculated on). Each is a difference you could "
             +"go and measure."},
   src:"The framework's headline: 'Increase retention through an improved incentive scheme.' Buckets: "
      +"attrition not caused by poor performance; work conditions similar across all employees; are there "
      +"differences in incentives. Sales people are typically paid a small fixed salary plus commission "
      +"based on sales; commission is a function of volume sold (type of clients, type of product sold) "
      +"and distance travelled.",
   ours:"The casebook's framework announces the answer in its own headline and labels two of its three "
       +"buckets as conclusions rather than tests. Structured properly it should ask whether work conditions "
       +"are similar, not assert it. Worth seeing in the source, because a real interviewer will not hand "
       +"you the hypothesis."},
  {tab:"Brainstorm", title:"What actually drives a commission", clock:2,
   rubric:"Creativity with structure — grouped ideas, not a list.",
   ask:["What's the price range across the product line?","Is commission a flat rate or does it vary by product?"],
   watch:"Three headline buckets with detail underneath beats fifteen loose ideas.",
   attempt:{q:"Assuming juniors and seniors do the same job, what determines how much commission each earns?",
            a:"The product: a high-priced item pays more per sale but takes far more work, so if juniors "
             +"are restricted to the cheap end their earnings are capped. The territory: a thin or distant "
             +"patch means more travel for the same number of sales. And the scheme itself: what it pays "
             +"on, and whether effort and reward line up."},
   src:"Sample headlines. Type of product sold: margins, effort to sell, can junior salespeople sell every "
      +"product? Apple iPods at $100-300 practically sell themselves; iMacs at $2000-3000 require greater "
      +"effort. Investigate whether incentives align with effort and whether juniors may sell higher-margin "
      +"products or only the lower-priced end. Also: territory, distance travelled to clients.",
   ours:"The iPod/iMac example is the case's one genuinely good idea, and it generalises: whenever pay is a "
       +"percentage of price, the product someone is allowed to sell decides what they can earn, regardless "
       +"of how hard they work."},
  {tab:"Answer", title:"Recommend, knowing you have no data", clock:3,
   rubric:"Synthesis — a recommendation that admits what it rests on.",
   ask:[], watch:"Don't present a hypothesis as a finding. Say what you'd measure to confirm it.",
   attempt:{q:"Give the recommendation.",
            a:"Start with the incentive scheme, and specifically with which products juniors are allowed "
             +"to sell, because that determines earnings more than effort does. Then check territory and "
             +"travel. I'd want commission data by tenure and product before committing — everything so far "
             +"is a hypothesis built on three facts."},
   src:"The client should review the incentive scheme for junior employees: analysing the type of products "
      +"sold by different sales levels, as this is likely to have the greatest impact on sales commission; "
      +"reviewing adjustments to even out sales effort among territories; compensating for differences in "
      +"average distances to clients. Risks: increases in attrition among senior employees; other factors "
      +"might be creating the problem; fairer incentives may not be enough to compete on the labour market.",
   ours:"The casebook says product type is 'likely to have the greatest impact' — but no commission, margin, "
       +"territory or distance figure was ever given, so nothing in the case supports ranking it first. "
       +"That is not a reason to avoid recommending it; it is a reason to say out loud that it is the first "
       +"thing you would measure. Carry forward: when a group differs, look for what differs about the group."}
 ]
},
{
 id:"BTH-11", step:3, name:"Electric Utility", pages:"pp. 137–142", firm:"McKinsey · interviewer-led",
 type:"Profitability · energy",
 dials:{concept_load:3,concept_depth:4,structure_difficulty:2,math_load:1,data_complexity:1,industry_distance:3},
 newTools:["Opportunity cost","Value chain","Utilisation"], carried:["Price ceiling","Breakeven","Capacity","Non-occupancy revenue","Structure without data"],
 bridge:{turn:"Concept depth 3 → 4, industry distance 2 → 3 — framework difficulty falls back",
   text:"Still no arithmetic, but the difficulty moves somewhere new: the framework is a standard "
       +"profitability tree again, and what is hard is the idea inside one branch. You'll be asked whether "
       +"a company should keep a coal mine that supplies it cheaply — and the right answer requires "
       +"noticing that the discount isn't real. That is a genuine step up in concept depth, in an industry "
       +"whose vocabulary you probably don't have yet."},
 teaches:"Buying an input from yourself is not a saving, because you could have sold the same input at the "
        +"market price instead.",
 why:"Math stays off and structure gets easier, so the one thing turned up is the depth of a single idea — "
     +"in a sector you don't know.",
 nodes:{decision:T("Why are profits falling?",""),rev:T("Revenue","price set by the market"),
        cost:T("Costs","the only lever left"),vol:T("Volume",">1M customers"),
        price:T("Rate","one price, all year"),opex:T("Running cost","coal, plants, wires"),
        capex:T("Build cost","10 plants"),profit:T("Operating profit","falling"),pay:T("Payback","—")},
 live:["decision","cost","opex","rev","price"],
 steps:[
  {tab:"Prompt", title:"A regulated-ish industry you don't know yet", clock:0,
   rubric:"Problem definition — absorbing unfamiliar mechanics without stalling.",
   ask:["How does GPE actually make money — wholesale or direct?","Is price something they set?"],
   watch:"Unfamiliar vocabulary is not difficulty. Read the mechanics as constraints on the tree you already have.",
   src:"Our client is GPE, a producer of electricity. There are several ways to produce electricity: water, "
      +"coal-fired plants, nuclear, wind. Electricity can be supplied to a wholesaler or to consumers "
      +"directly. Transmission is highly regulated because the wires are mostly government controlled; "
      +"usage is mostly deregulated — the government does not set the price, it is set by competitive "
      +"forces. Our client has 10 plants producing electricity using coal, obtained partly from its own "
      +"coal mines and partly from 3rd-party producers.",
   ours:"Three sentences of industry briefing tell you the shape of the answer before any data arrives: "
       +"price is set by the market, so it is not a lever. That leaves volume and cost — and volume in a "
       +"mature, fragmented market is not moving either."},
  {tab:"Framework", title:"The same tree, with one branch already closed", clock:1,
   rubric:"Structure — using given facts to eliminate branches rather than listing everything.",
   ask:["Who sets the price?","Is the market growing?","Where does the coal come from?"],
   watch:"Saying 'I'd look at revenue and cost' after being told price is market-set wastes the one fact you have.",
   attempt:{q:"Ask, and you're told: price is set by competitive forces, one price per year, all customers "
              +"the same; over 1M customers in a fragmented market growing about 3% a year; 10 plants. "
              +"Where does that leave you?",
            a:"Revenue is largely closed. You can't move price, and share in a fragmented, slow-growing "
             +"market won't explain a profit decline on its own. So the decline is on the cost side, and "
             +"the structure should go straight there: what they buy, what they run, and what they ship it "
             +"through."},
   src:"Working hypothesis: increasing costs are causing the decline since there are no real opportunities "
      +"on the revenue side. Price: deregulated, set by competitive forces, one price per year, same to all "
      +"customers. Volume: over 1M customers through wholesalers; market fragmented, growing about 3% per "
      +"annum. Fixed: 10 plants. Insight: since the market sets the price and this is a mature industry, "
      +"there is not much opportunity in terms of volume and price.",
   ours:"The framework's Market branch says 'No competition' on the same page where the prompt says price is "
       +"set by competitive forces in a fragmented market. Both can't be true. Read the released facts, not "
       +"the framework's labels."},
  {tab:"Value chain", title:"Break the cost side into steps you can attack", clock:2, fig:"chain",
   rubric:"Creativity with structure — several ideas per stage, grouped.",
   ask:["How is the coal transported?","How old are the generators?","Do they own the wires or rent them?"],
   watch:"A cost brainstorm with no structure reads as a list. Walk the chain and stop at each stage.",
   attempt:{q:"The chain is: acquire the coal, generate the electricity, transmit it. What could be going "
              +"wrong at each stage?",
            a:"Acquiring: transport mode and distance, third-party prices, coal quality differing between "
             +"own and bought coal so plants need different handling, supply concentrated in a few regions, "
             +"unionised labour. Generating: old inefficient units, the ten plants run differently from one "
             +"another, local labour market, new environmental rules. Transmitting: distance to customers, "
             +"and whether they can share someone else's wires more cheaply."},
   src:"1. Acquiring coal: rail/road transport, savings from optimising the channel; own vs 3rd-party mines "
      +"differ in coal quality (energy content), needing different processes and machines; separate mine "
      +"regions expose supply to hurricanes and political turmoil; mines probably unionised. 2. Generating: "
      +"old, inefficient generators wasting output; operating differences across the 10 plants; labour "
      +"availability; new environmental laws. 3. Transmitting: customers closer to the plants; a bandwidth "
      +"sharing contract to cheapen transmission.",
   ours:"The coal-quality point is the sharpest one here and it is easy to miss: two sources of the same "
       +"raw material aren't interchangeable if they burn differently, so cheap coal can cost more to use."},
  {tab:"Own mine", title:"The discount that isn't a discount", clock:2, fig:"mine",
   rubric:"Concept depth — recognising an opportunity cost with no number attached.",
   ask:["Could they sell that coal to someone else instead?","What would the market pay for it?"],
   watch:"'We get it 30% cheaper' is the trap. Cheap from yourself is not cheap.",
   attempt:{q:"Ask, and you're told: GPE gets coal from its own mines at a rate 30% below third-party mines. "
              +"There is a large market for coal and all coal customers pay the same market price. Should "
              +"they keep the mine?",
            a:"The 30% is not a saving. Every tonne burned is a tonne not sold at the market price, so the "
             +"real cost of using your own coal is what someone else would have paid for it. Keeping the "
             +"mine can still be right — control over supply, quality and labour, and a diversified "
             +"business — but not because the coal is cheap."},
   src:"GPE gets a 30% cheaper rate on coal from its own coal mines than from 3rd-party mines. There is a "
      +"large market for coal; coal customers are diverse and electricity producers are just one of many; "
      +"assume all coal customers pay the same market price. If the candidate keeps the mine purely on "
      +"cheap coal, remind them they can also sell the same coal to other customers and make the same "
      +"profit. Owning the mine reduces supplier power and volatility in the core raw material, gives "
      +"control over coal quality and labour, and diversifies the business.",
   ours:"This is the block's first idea that doesn't come with a formula. The casebook never nets the 30% "
       +"against the foregone sale in numbers — it makes the point in words only — so the reasoning is the "
       +"whole deliverable. It generalises far beyond coal: any internal transfer priced below market is "
       +"borrowing from another part of the business."},
  {tab:"Utilisation", title:"A target that sounds obvious and isn't", clock:2, fig:"util",
   rubric:"Business judgment — questioning the premise of the question.",
   ask:["What does demand look like across the year?","What's the industry average?"],
   watch:"The CEO's number is not the answer. Ask what 100% utilisation would mean for a utility.",
   attempt:{q:"GPE runs at 80% utilisation. The CEO wants 90%. The industry average is 77%. How would you "
              +"approach it?",
            a:"Electricity demand is cyclical and a utility has to be able to meet the peak, so spare "
             +"capacity is the product, not waste. GPE is already above the industry average. Pushing to "
             +"90% means less headroom at peak, which is a reliability problem rather than an efficiency "
             +"win."},
   src:"Cyclicality means peaks and troughs in demand — air conditioners working overtime in summer. As an "
      +"electricity company GPE is committed to meet the peak demand, so it is normal to operate at less "
      +"than 100% utilization. GPE is already operating at close to the industry average and it may be "
      +"unrealistic to expect the utilization to increase to 90%.",
   ours:"Two things the casebook gets slightly wrong. 80% is not 'close to' 77% — it is three points above "
       +"it, which strengthens the argument it is making. And it never asks what the extra ten points would "
       +"be worth, which is the question that would settle it. Also note the shape of the answer: this is "
       +"the Army Hotel capacity idea seen from the other side — there, a constraint destroyed revenue; "
       +"here, spare capacity is deliberate."},
  {tab:"Answer", title:"Recommend on the cost side", clock:3,
   rubric:"Synthesis — a recommendation that names its own weakest point.",
   ask:[], watch:"Three cost themes, two decisions. Don't re-list the brainstorm.",
   attempt:{q:"Give the recommendation.",
            a:"The decline is on the cost side, since price is market-set and volume is flat: coal "
             +"acquisition, generation efficiency across ten plants, and transmission. Keep the mine, but "
             +"for supply security rather than cheap coal. And don't chase 90% utilisation — they're "
             +"already above the industry average, and the headroom is what keeps the lights on at peak."},
   src:"The key reason for profitability decline is an increase in cost: acquisition costs of coal, cost of "
      +"electricity generation, high costs of transmission. GPE should continue the use of its coal mine. "
      +"It should also ignore the pressure to increase utilization to 90%.",
   ours:"The recommendation is the opening hypothesis restated — no cost figure, trend or margin was ever "
       +"shown. In an interview you would say that: 'cost is where the decline must be, by elimination, and "
       +"here is what I'd pull to confirm it.' Carry forward: opportunity cost, and the value chain as a "
       +"way to break a cost problem into pieces."}
 ]
},
{
 id:"BTH-02", step:4, name:"Breast Cancer Surgery", pages:"pp. 75–79", firm:"L.E.K. · candidate-led",
 type:"Pricing · medical devices",
 dials:{concept_load:2,concept_depth:2,structure_difficulty:2,math_load:2,data_complexity:3,industry_distance:3},
 newTools:["Reading an exhibit","Revenue maximisation"], carried:["Price ceiling","Breakeven","Capacity","Non-occupancy revenue","Structure without data","Opportunity cost","Value chain","Utilisation"],
 bridge:{turn:"Data complexity 1 → 3 — the first case where information arrives as a chart",
   text:"Numbers come back, but the step change is how they reach you. In the first three cases every "
       +"figure was spoken; here the relationship that decides the answer is a curve you have to read and "
       +"convert. The arithmetic itself is easy — four multiplications — so the skill being trained is "
       +"pulling numbers off an exhibit and turning them into a comparison."},
 teaches:"Revenue peaks in the middle of a demand curve, so the price that wins the most customers is "
        +"rarely the price that earns the most money.",
 why:"Back to numbers, but handed over as a chart rather than a sentence. Everything else holds still.",
 nodes:{decision:T("What price maximises revenue?",""),rev:T("Revenue","$30.0M at best"),
        cost:T("Costs","never given"),vol:T("Volume","adoption × 100,000"),
        price:T("Rate","$600"),opex:T("Running cost","—"),capex:T("Build cost","—"),
        profit:T("Operating profit","not computed"),pay:T("Payback","—")},
 live:["decision","rev","vol","price"],
 steps:[
  {tab:"Prompt", title:"A narrow question, asked precisely", clock:0,
   rubric:"Problem definition — noticing which question you were actually asked.",
   ask:["Revenue maximising, or profit maximising?","Is this the US only, or worldwide?"],
   watch:"They asked for revenue. Answering on profit is a different case — and they never give you costs.",
   src:"Our client is a large medical device corporation. They have developed a new medical device to assist "
      +"surgeons in breast conservation surgeries. They've approached us to determine a revenue maximizing "
      +"pricing strategy for the device. While hopefully this device will be adopted worldwide, at the "
      +"moment, the client would like us to determine the pricing strategy for the product in the United "
      +"States only.",
   ours:"The case is labelled 'profitability' and its own guidance says to assess the device's "
       +"profitability — but no cost data appears anywhere and no profit is ever computed. Answer the "
       +"question as asked, and flag the gap at the end rather than inventing costs."},
  {tab:"Market size", title:"How many devices could there be at most", clock:1,
   rubric:"Analytical ability — a clean market size before any pricing.",
   ask:["How many of these surgeries happen a year?","Is the device reusable?","Any competitors?"],
   watch:"Disposable versus reusable changes the market by an order of magnitude. Ask.",
   attempt:{q:"What's the ceiling on units?",
            a:"About 100,000 surgeries a year, and the device is disposable — one per surgery — so the "
             +"ceiling is 100,000 units a year. No competitors yet, and it's approved and works, so nothing "
             +"reduces that ceiling except whether surgeons choose to use it."},
   src:"There are around 100,000 breast conservation surgeries per year. The device can be used in every "
      +"breast conservation surgery. The device is disposable, so every surgery needs a new device. The "
      +"device is FDA approved. There are no concerns related to quality from R&D. The success rate is "
      +"100%. Currently there are no competitors.",
   ours:"Every one of those facts removes a branch from your tree. Market size done in one line, and "
       +"adoption is the only variable left."},
  {tab:"The curve", title:"Adoption falls as price rises — so pick the product", clock:2, fig:"curve",
   rubric:"Chart reading — converting a relationship into the comparison the question needs.",
   ask:["What would clinicians pay?","Does adoption change with price?"],
   watch:"The chart gives you adoption. Revenue is what you have to compute — the chart never shows it.",
   attempt:{q:"Ask whether we know clinicians' willingness to pay, and you're shown: adoption runs 90% at "
              +"$0, 75% at $300, 50% at $600 and 10% at $1,000. Which price maximises revenue?",
            a:"Multiply each pair by the 100,000 market. $300 × 75,000 = $22.5M. $600 × 50,000 = $30.0M. "
             +"$1,000 × 10,000 = $10.0M. The peak is $600. Going higher loses more customers than the price "
             +"gains; going lower gains customers too cheaply."},
   src:"The candidate should calculate the revenue at each price point tested during the market research "
      +"and conclude that the device price that allows the client to achieve maximum potential revenues is "
      +"$600. The candidate should also conclude that greater adoption across surgeries does not "
      +"necessarily lead to greater revenues, since the benefit of higher adoption may be outweighed by a "
      +"lower price point. A strong candidate will identify that the revenue maximizing price may not be "
      +"optimal in terms of profits.",
   ours:"The shape is the lesson: revenue rises, peaks, then falls. It also connects back — Army Hotel had a "
       +"price ceiling imposed from outside; here the ceiling is the customers' own willingness, and you "
       +"find it by computing rather than by being told."},
  {tab:"Answer", title:"Price it, and name what you couldn't answer", clock:3,
   rubric:"Synthesis — answering the question asked and flagging the one behind it.",
   ask:[], watch:"Don't stop at $600. Say why it might not be the right price once costs exist.",
   attempt:{q:"Give the recommendation.",
            a:"Price at $600. Half of the 100,000 surgeries adopt, which is $30M a year — more than any "
             +"other point tested. The caveat is that this maximises revenue, not profit: with no cost data "
             +"I can't say whether serving 50,000 surgeries at $600 beats 75,000 at $300 on margin. And a "
             +"single supplier with no competitors should expect that to change."},
   src:"The client should market the device at a price of $600 per unit. This price allows the client to "
      +"maximize the revenue potential given the current willingness to adopt. Risks: competitors might "
      +"replicate the device and enter the market; the revenue maximizing price might not be the profit "
      +"maximizing one.",
   ours:"Note the casebook's own trap on the next question: it asks how you'd market the device to reach "
       +"50% adoption — but successful marketing would move the adoption curve, and $600 was only optimal "
       +"on the old curve. Carry forward: revenue rises, peaks, then falls as price climbs, and exhibits carry relationships you have to "
       +"convert yourself."}
 ]
},
{
 id:"BTH-05", step:5, name:"Cleaning Products", pages:"pp. 94–99", firm:"McKinsey · interviewer-led",
 type:"Growth strategy · consumer products",
 dials:{concept_load:2,concept_depth:2,structure_difficulty:2,math_load:3,data_complexity:3,industry_distance:1},
 newTools:["Weighted mix"], carried:["Price ceiling","Breakeven","Capacity","Non-occupancy revenue","Structure without data","Opportunity cost","Value chain","Utilisation","Reading an exhibit","Revenue maximisation"],
 bridge:{turn:"Math load 2 → 3, industry distance 3 → 1",
   text:"The exhibit stays, the arithmetic gets heavier, and the industry gets easy on purpose — soap "
       +"instead of surgical devices — so the domain isn't competing for attention while you learn to "
       +"compute across a table. This is the first case where the answer is a weighted sum rather than a "
       +"single multiplication."},
 teaches:"When volumes hold fixed, a price change is just a weighted sum across the mix — so the biggest "
        +"revenue lines decide the answer, not the biggest percentage moves.",
 why:"Same exhibit-reading as the case before, one notch more arithmetic, in a setting you already "
     +"understand.",
 nodes:{decision:T("Should they change prices?",""),rev:T("Revenue","$3.039B after"),
        cost:T("Costs","no savings available"),vol:T("Volume","unchanged"),
        price:T("Rate","+1.3% blended"),opex:T("Running cost","—"),capex:T("Build cost","—"),
        profit:T("Operating profit","+$39M revenue"),pay:T("Payback","—")},
 live:["decision","rev","price","vol"],
 steps:[
  {tab:"Prompt", title:"An objective you have to extract", clock:0,
   rubric:"Problem definition — turning a vague goal into a measurable one.",
   ask:["What does 'do better' mean — growth, share, or profit?","How big is the business now?"],
   watch:"'Do better in the market' means nothing yet. Pin it before structuring.",
   src:"Our client is a prominent manufacturer of household cleaning products such as soap. They feel that "
      +"an opportunity exists for them to do better in the market. What will be some of the first things "
      +"that you will ask the client?",
   ours:"The case opens by asking what you would ask — so the questions are the answer to the first "
       +"question. Two of them matter: what 'better' means, and how big the business is."},
  {tab:"Framework", title:"Cost is closed. So is adding products.", clock:1,
   rubric:"Structure — eliminating branches the client has just closed.",
   ask:["What were revenues last year?","What's in the product line?","Is there room on cost?"],
   watch:"After being told cost savings aren't available, a framework with a big cost branch wastes your time.",
   attempt:{q:"Ask, and you're told: $3 billion of revenue last year; five products — dish washing powder, "
              +"clothes detergent powder, hand wash liquid, shower gel, all-purpose soap; no opportunities "
              +"in cost savings or in adding products. What's left?",
            a:"Only revenue on the existing line, and only two ways to move it: sell more units, or charge "
             +"more per unit. Volume means taking share or growing the category, both slow. That points at "
             +"price — and price on a mix of five products is a question about which ones can move."},
   src:"Revenues in the last year were $3 billion. The client's product mix includes dish washing powder, "
      +"clothing detergent powder, hand wash liquid, shower gel, and all-purpose soap. There are no "
      +"opportunities in cost savings or by adding new products to the mix. A strong candidate will "
      +"conclude that the only way to increase profitability is to improve revenues; possible ways include "
      +"increasing volumes or altering prices.",
   ours:"Being told a branch is closed is a gift — it is the interviewer steering. Take it, say so out "
       +"loud, and move."},
  {tab:"Exhibit", title:"Five products, five different amounts of room", clock:2, fig:"mix",
   rubric:"Chart reading — noticing that the percentages are on different bases.",
   ask:["What share of revenue does each product carry?","Do the volumes hold at the new prices?"],
   watch:"Two percentage columns that mean different things. One is a price move, one is a revenue weight.",
   attempt:{q:"Research says these price changes leave volumes unchanged: dish washing powder −2%, clothes "
              +"detergent +1%, hand wash 0%, shower gel +2%, all-purpose soap +4%. Revenue shares are 5%, "
              +"20%, 30%, 30% and 15%. What do you notice before calculating anything?",
            a:"The biggest revenue line — hand wash at 30% — doesn't move at all, so a third of the "
             +"business contributes nothing. The biggest percentage rise, +4% on all-purpose soap, sits on "
             +"only 15%. And the one cut, −2%, is on the smallest line. The gain has to come from shower "
             +"gel and all-purpose soap."},
   src:"Exhibit 1, Price Elasticity: if the prices of the client's products are changed all at once in the "
      +"percentages shown, the volumes of the products sold will remain unchanged. Changes either all "
      +"happen at the same time or none are made at all. Dish Washing Powder −2%, 5% of revenues; Clothes "
      +"Detergent Powder +1%, 20%; Hand Wash Liquid 0%, 30%; Shower Gel +2%, 30%; All-Purpose Soap +4%, 15%.",
   ours:"The exhibit is titled 'Price Elasticity' and then stipulates that volumes don't change, which "
       +"means no elasticity is being used at all. Read what the table does, not what it is called."},
  {tab:"The sum", title:"Weight each move by the money behind it", clock:2, fig:"contrib",
   rubric:"Analytical ability — a weighted calculation kept organised.",
   ask:["What increase would the client be happy with?"],
   watch:"Work in dollars per line, not in percentages. Percentages of different bases don't add.",
   attempt:{q:"The client will be happy with a 1% revenue increase. Should they go ahead?",
            a:"1% of $3B is $30M, the target. Per line: dish washing powder is 5% of $3B = $150M, −2% = "
             +"−$3M. Detergent $600M, +1% = +$6M. Hand wash $900M, 0% = nothing. Shower gel $900M, +2% = "
             +"+$18M. All-purpose soap $450M, +4% = +$18M. Sum: −3 + 6 + 0 + 18 + 18 = +$39M, against a "
             +"$30M target. Yes, go ahead."},
   src:"Dish Washing Powder: current revenue $150M, after $147M. Clothes Detergent Powder: $600M → $606M. "
      +"Hand Wash Liquid: $900M → $900M. Shower Gel: $900M → $918M. All-Purpose Soap: $450M → $468M. "
      +"Revenues will be $3.039 billion after the price change, an increase of $39 million. The client's "
      +"target was $30 million (1% revenue change), so they should go ahead with the price change.",
   ours:"Two lines out of five produce $36M of the $39M. That is the transferable move: in any mix "
       +"question, find where the money already is before you look at which percentage is largest. The "
       +"blended effect is only +1.3% — small moves on big bases."},
  {tab:"Answer", title:"Go ahead, with three things to watch", clock:3,
   rubric:"Synthesis — a decision plus the risks that would reverse it.",
   ask:[], watch:"A one-time gain is not growth. Say so before they ask.",
   attempt:{q:"Give the recommendation.",
            a:"Go ahead. The change adds $39M against a $30M target, and volumes hold at the new prices. "
             +"Three watch-outs: it's a one-time step, not a growth rate; competitors may respond by "
             +"holding their prices; and the research covers one bundle of changes, so a better combination "
             +"may exist."},
   src:"Go ahead with the price change. Revenue will increase by $39M, which is higher than the goal of a "
      +"1% increase, and price changes will not cause a decrease in volume. Risks: research may not reflect "
      +"the client's geographic or demographic market; if competitors use the opportunity to lower prices "
      +"we may lose customers; research only considered one change option, and there may be more optimal "
      +"price changes.",
   ours:"The casebook tells the interviewer there are no cost savings available, then lists a cost-cutting "
       +"diagnostic under next steps. Small, but it is the kind of contradiction to notice rather than "
       +"absorb. Block one ends here: five cases, one tree, and a toolkit of eleven moves."}
 ]
}
];
const STEPLIVE = {
 "BTH-01": [["decision"],
            ["decision","rev","cost","vol","price","opex","capex","profit","pay"],
            ["price","rev"],
            ["vol","rev"],
            ["vol","rev","profit"],
            ["cost","opex","capex","profit"],
            ["pay","capex","profit"],
            ["decision","pay","profit"]],
 "BTH-19": [["decision"],
            ["decision","cost","opex"],
            ["decision","rev","cost","price","opex"],
            ["rev","price"],
            ["decision","cost","opex"]],
 "BTH-11": [["decision"],
            ["decision","rev","cost","price"],
            ["cost","opex"],
            ["cost","opex"],
            ["cost","capex"],
            ["decision","cost","opex"]],
 "BTH-02": [["decision"],
            ["vol"],
            ["rev","vol","price"],
            ["decision","rev","price"]],
 "BTH-05": [["decision"],
            ["decision","rev","cost"],
            ["price","vol"],
            ["rev","price"],
            ["decision","rev"]]
};
const OPBADGE = {
  mul:{x:145, y:190, sym:"\u00d7", t:"room-nights \u00d7 rate"},
  add:{x:512, y:190, sym:"+",       t:"running + build"},
  sub:{x:140, y:232, sym:"\u2212", t:"revenue \u2212 cost"},
  div:{x:520, y:232, sym:"\u00f7", t:"outlay \u00f7 annual profit"}
};
const FWB = {"profit":{"id":"root","t":"Profit","s":"revenue − cost","op":"−","kids":[{"id":"rev","t":"Revenue","s":"price × volume","op":"×","kids":[{"id":"price","t":"Price"},{"id":"vol","t":"Volume"}]},{"id":"cost","t":"Cost","s":"fixed + variable","op":"+","kids":[{"id":"fx","t":"Fixed"},{"id":"vc","t":"Variable"}]}]},"entry":{"id":"root","t":"Should we enter?","s":"four questions, in order","kids":[{"id":"mkt","t":"Market","s":"how big · growing?"},{"id":"comp","t":"Competition","s":"who else · what share"},{"id":"econ","t":"Economics","s":"revenue − cost"},{"id":"cap","t":"Capability","s":"can we serve it"}]},"invest":{"id":"root","t":"Is it worth it?","s":"cash in vs cash out","kids":[{"id":"cin","t":"Cash in","s":"how much, how long"},{"id":"cout","t":"Cash out","s":"what you pay up front"},{"id":"time","t":"Time","s":"horizon · discount rate"},{"id":"hurdle","t":"Hurdle","s":"payback · return"},{"id":"exit","t":"Exit","s":"how the money comes out"}]},"attrition":{"id":"root","t":"Why are they leaving?","kids":[{"id":"who","t":"Who leaves","s":"role · tenure · rank"},{"id":"push","t":"Push factors","s":"pay · manager · path"},{"id":"pull","t":"Pull factors","s":"who else is hiring"},{"id":"costl","t":"Cost of leaving","s":"replacement + ramp"}]},"twogroup":{"id":"root","t":"Why does one group differ?","op":"→","kids":[{"id":"hold","t":"Hold constant","s":"what both groups share"},{"id":"vary","t":"Vary","s":"what actually differs"},{"id":"test","t":"Test","s":"which could cause it"}]},"comp":{"id":"root","t":"Does the pay plan work?","kids":[{"id":"cmix","t":"Mix","s":"fixed vs variable"},{"id":"basis","t":"Basis","s":"paid on what"},{"id":"align","t":"Alignment","s":"effort vs reward"},{"id":"fair","t":"Fairness","s":"across people · patches"}]},"profitability":{"id":"root","t":"Where did profit go?","kids":[{"id":"prev","t":"Revenue","s":"price × volume","op":"×","kids":[{"id":"pprice","t":"Price"},{"id":"pvol","t":"Volume"}]},{"id":"pcost","t":"Cost","s":"fixed + variable","op":"+","kids":[{"id":"pfx","t":"Fixed"},{"id":"pvc","t":"Variable"}]},{"id":"pext","t":"External","s":"market · rules · rivals"}]},"chain":{"id":"root","t":"Where in the chain?","op":"→","kids":[{"id":"inp","t":"Inputs","s":"what you buy"},{"id":"opsn","t":"Operations","s":"what you make"},{"id":"dist","t":"Distribution","s":"how it reaches them"}]},"makebuy":{"id":"root","t":"Keep it in-house?","kids":[{"id":"cmake","t":"Cost to make","s":"internal, fully loaded"},{"id":"cbuy","t":"Cost to buy","s":"the market price"},{"id":"qual","t":"Quality","s":"does the output change"},{"id":"strat","t":"Strategic","s":"control · risk · focus"}]},"pricing":{"id":"root","t":"What should we charge?","s":"three routes, one goal","kids":[{"id":"cplus","t":"Cost-plus","s":"our cost + a margin"},{"id":"cpet","t":"Competitive","s":"what rivals charge"},{"id":"val","t":"Value-based","s":"worth to the buyer"},{"id":"obj","t":"Objective","s":"revenue · profit · share"}]},"sizing":{"id":"root","t":"How many?","s":"multiply down the chain","op":"×","kids":[{"id":"pop","t":"Population","s":"the universe"},{"id":"filt","t":"Filter","s":"who qualifies"},{"id":"freq","t":"Frequency","s":"how often"},{"id":"unitn","t":"Units","s":"per event"}]},"mix":{"id":"root","t":"Net effect","s":"sum of the lines","kids":[{"id":"line","t":"Line contribution","s":"change × weight × total","op":"×","kids":[{"id":"chg","t":"Price change","s":"per line, in %"},{"id":"wt","t":"Weight","s":"that line's share"},{"id":"tot","t":"Total","s":"revenue base"}]},{"id":"summ","t":"Sum","s":"add dollars, never %s"}]},"cpgu":{"id":"root","t":"Cost per good unit","s":"spend ÷ survivors","op":"÷","kids":[{"id":"tc","t":"Total cost","s":"what you spend"},{"id":"good","t":"Good units","s":"started × yield","op":"×","kids":[{"id":"started","t":"Units started"},{"id":"yld","t":"Yield","s":"what survives"}]}]},"perp":{"id":"root","t":"Value of the stream","s":"perpetuity − tail","op":"−","kids":[{"id":"pp","t":"Perpetuity","s":"annual ÷ rate","op":"÷","kids":[{"id":"ann","t":"Annual cash"},{"id":"rate","t":"Rate"}]},{"id":"tail","t":"Tail","s":"value after the end","kids":[{"id":"dbl","t":"Doubling","s":"72 ÷ rate"}]}]},"opp":{"id":"root","t":"What do we do with it?","kids":[{"id":"use","t":"Use it","s":"in the core business"},{"id":"adj","t":"Adjacent","s":"next to the core"},{"id":"dont","t":"Don't use it","s":"sell · lease · leave"},{"id":"cmpn","t":"Compare","s":"on one measure"}]},"timec":{"id":"root","t":"Which is worth more?","op":"→","kids":[{"id":"av","t":"Annual value","s":"steady-state cash"},{"id":"sd","t":"Start date","s":"when it begins"},{"id":"cp","t":"Common point","s":"bring both to one year"},{"id":"cc","t":"Compare","s":"like for like"}]},"physcap":{"id":"root","t":"How many customers?","s":"count the physical thing","op":"×","kids":[{"id":"unitc","t":"Capacity unit","s":"the thing that repeats"},{"id":"cyc","t":"Cycles","s":"how often it turns over"},{"id":"fill","t":"Fill rate","s":"how full each cycle"},{"id":"conv","t":"Conversion","s":"who becomes a customer"}]},"beshare":{"id":"root","t":"Cushion","s":"assumed − required","op":"−","kids":[{"id":"assumed","t":"Assumed share","s":"what the forecast uses"},{"id":"req","t":"Breakeven share","s":"fixed ÷ market contrib","op":"÷","kids":[{"id":"bfix","t":"Fixed cost","s":"what must be covered"},{"id":"mc","t":"Market contribution","s":"market × margin","op":"×","kids":[{"id":"mkt2","t":"Whole market"},{"id":"marg","t":"Margin"}]}]}]},"be":{"id":"root","t":"Breakeven volume","s":"fixed ÷ contribution","op":"÷","kids":[{"id":"bfix2","t":"Fixed cost","s":"per period","kids":[{"id":"treat","t":"Treatment","s":"how one-offs spread"}]},{"id":"bcon","t":"Contribution","s":"price − variable","op":"−","kids":[{"id":"bp","t":"Price"},{"id":"bv","t":"Variable cost"}]}]},"reqach":{"id":"root","t":"The gap","s":"required − achievable","op":"−","kids":[{"id":"rq","t":"Required","s":"what economics demand"},{"id":"ach","t":"Achievable","s":"what the market supports"},{"id":"lev","t":"Levers","s":"what would close it","nb":1}]}};
const FW = {"BTH-01":[{"base":"profit","name":"Profit tree","fit":"full","when":"The default whenever the question is whether something makes money.","over":{"root":{"st":"same","s":"$3.2M a year"},"rev":{"st":"same","s":"$7.2M / yr"},"price":{"st":"changed","s":"$60 — capped"},"vol":{"st":"changed","s":"120,000 after capacity"},"cost":{"st":"changed","s":"$4M / yr + $20M once"},"fx":{"st":"changed","s":"$20M build, one-off"},"vc":{"st":"same","s":"$4M running"}},"add":[{"parent":"root","id":"payb","t":"Payback","s":"$20M ÷ $3.2M","nb":1}],"ann":[["Revenue","Room-nights × rate. Both halves are capped by something outside the market: the rate by the payer at $60, the volume by an 80-room shortage across four months. 129,000 room-nights becomes 120,000."],["Cost","One annual figure, plus a one-off build that sits outside the year. The build is what forces the extra branch."],["Profit","$3.2M a year — which is where most candidates stop, and it isn't the answer."],["Payback","Not part of the canned shape at all. You have to graft it on."]],"note":"The trunk works unchanged. What this case adds is that profit alone doesn't decide it."},{"base":"entry","name":"Market entry","fit":"partial","when":"When a client is deciding whether to go into a new market or location.","over":{"mkt":{"st":"changed","s":"one base, countable"},"comp":{"st":"same","s":"3 hotels, 1 real rival"},"econ":{"st":"changed","s":"the only branch working"},"cap":{"st":"dropped","s":"never questioned"}},"add":[],"ann":[["Market","Fixed and countable — soldiers passing through one base, not a market to size."],["Competition","Three hotels, and only one of them is really a rival."],["Capability","Assumed — the case never questions whether a PE firm can run a hotel."],["Economics","This is the only branch that does any work."]],"note":"Market entry gets you to 'should we do this' and stops. It has nothing to say about how fast the money comes back, which is the actual test — so it has to be combined with the investment lens."},{"base":"invest","name":"Investment decision","fit":"full","when":"When the client is a financial buyer, or the question is what to pay.","over":{"cin":{"st":"same","s":"$3.2M a year"},"cout":{"st":"same","s":"$20M, all at the start"},"time":{"st":"dropped","s":"no discounting here"},"hurdle":{"st":"same","s":"4–5 yrs, on request"},"exit":{"st":"dropped","s":"never discussed"}},"add":[],"ann":[["Cash in","$3.2M a year for as long as the base runs."],["Cash out","$20M, all at the start."],["Hurdle","4–5 years, and you only get it by asking."],["Time","No discount rate is given, so payback in plain years is the whole test. Case 8 switches this branch on."],["Exit","Never discussed by the case at all."]],"note":"Combine this with the profit tree and the case is solved. Either one alone gives a confident wrong answer."}],"BTH-19":[{"base":"attrition","name":"Attrition / retention","fit":"full","when":"When people are leaving and you need to know why.","over":{"who":{"st":"changed","s":"juniors under a year"},"push":{"st":"changed","s":"narrowed to pay"},"pull":{"st":"dropped","s":"raised, never checked"},"costl":{"st":"same","s":"6 months of ramp in 12"}},"add":[],"ann":[["Who leaves","Juniors under a year; seniors past three almost never — this contrast is the case."],["Push factors","Narrowed to pay, because everything else is shared with the seniors who stay."],["Pull factors","Raised in the risks and never investigated."],["Cost of leaving","Six months of ramp inside a twelve-month tenure."]],"note":"The framework's job here is elimination. Anything that applies to both groups can be struck out on the first pass."},{"base":"twogroup","name":"Two-group comparison","fit":"full","when":"Any time one group behaves differently from a similar group — the cheapest diagnostic there is.","over":{"hold":{"st":"same","s":"firm · product · offices"},"vary":{"st":"same","s":"what · where · paid how"},"test":{"st":"dropped","s":"no figures supplied"}},"add":[],"ann":[["Hold constant","The firm, the product, the industry, the offices."],["Vary","What they sell · where they sell it · what they're paid for it."],["Test","None of it — the case never supplies a single figure to test against. The framework gets you to the right question and then runs out of data."]],"note":"This is not a named consulting framework, and it is the one that actually solves the case."},{"base":"comp","name":"Compensation design","fit":"partial","when":"When the suspected cause is how people are paid.","over":{"cmix":{"st":"same","s":"salary + commission"},"basis":{"st":"same","s":"volume · type · distance"},"align":{"st":"changed","s":"the iPod/iMac point"},"fair":{"st":"dropped","s":"raised, never measured"}},"add":[],"ann":[["Mix","Small salary plus commission — stated, never quantified."],["Basis","Volume, product type, distance travelled."],["Alignment","A high-effort product at the same commission rate pays worse per hour. This is the branch that carries the answer."],["Fairness","Territory and travel differences, raised and never measured."]],"note":"Useful as the second layer — but reaching for it first is how you end up asserting the answer, which is exactly what the casebook's own framework does."}],"BTH-11":[{"base":"profitability","name":"Profitability","fit":"full","when":"Profits are falling and you need to find where.","over":{"prev":{"st":"dropped","s":"closed on sight"},"pprice":{"st":"dropped","s":"market-set"},"pvol":{"st":"dropped","s":"flat"},"pcost":{"st":"changed","s":"the whole case"},"pfx":{"st":"same","s":"10 ageing plants"},"pvc":{"st":"same","s":"coal · labour · wires"},"pext":{"st":"changed","s":"constraints, not causes"}},"add":[],"ann":[["Revenue","Closed on the first pass — price is market-set and volume is flat. Say why you are closing it; don't just skip it."],["Cost","The whole case; and it is never quantified once."],["External","Deregulated usage, regulated transmission — constraints, not causes."]],"note":"A profitability tree whose revenue branch is closed by the facts you are given is the ideal case opening: it tells you where to spend the next fifteen minutes."},{"base":"chain","name":"Value chain","fit":"full","when":"When you know the problem is cost and need somewhere to stand.","over":{"inp":{"st":"same","s":"acquiring coal"},"opsn":{"st":"same","s":"generating"},"dist":{"st":"same","s":"transmitting"}},"add":[],"ann":[["Inputs","Acquiring coal — transport, third-party price, quality, unionised labour."],["Operations","Generating — old units, ten plants run differently, environmental rules."],["Distribution","Transmitting — distance to customers, sharing someone else's wires."]],"note":"Grafted straight onto the cost branch of the tree above. That graft is the move worth copying."},{"base":"makebuy","name":"Make vs buy","fit":"partial","when":"When the client owns a step in its own supply chain and wonders whether to keep it.","over":{"cmake":{"st":"changed","s":"'30% cheaper' — wrong"},"cbuy":{"st":"changed","s":"market price = forgone"},"qual":{"st":"dropped","s":"not in question here"},"strat":{"st":"changed","s":"security · quality · mix"}},"add":[{"parent":"strat","id":"risk","t":"Risk","s":"weather · politics"}],"ann":[["Cost to make","Looks 30% cheaper, and that comparison is wrong — burning your own coal costs what you could have sold it for."],["Cost to buy","The market price — which is also what you forgo by burning your own. The two branches collapse into one number."],["Strategic","Supply security, quality control, diversification: the real reasons to keep it."],["Risk","Hurricanes and political turmoil in the mining regions."]],"note":"The 'partial' flag is the point: the cost half of this framework collapses once you notice the opportunity cost, leaving only the strategic half to decide on."}],"BTH-02":[{"base":"pricing","name":"Pricing","fit":"full","when":"When the question is what to charge.","over":{"cplus":{"st":"dropped","s":"no cost data exists"},"cpet":{"st":"dropped","s":"no competitors"},"val":{"st":"changed","s":"the exhibit is this"},"obj":{"st":"same","s":"revenue, stated up front"}},"add":[],"ann":[["Cost-plus","Impossible — no cost data exists anywhere in this case."],["Competitive","Impossible — there are no competitors."],["Value-based","The only route left, and the exhibit is exactly that: willingness to pay."],["Objective","Stated up front as revenue, which is unusual and worth repeating back."]],"note":"Three of the four branches are closed by the facts. Saying which ones and why is a faster, better answer than listing all four."},{"base":"sizing","name":"Market sizing","fit":"full","when":"Whenever you need the ceiling on volume.","over":{"pop":{"st":"same","s":"100,000 surgeries / yr"},"filt":{"st":"dropped","s":"works in every one"},"freq":{"st":"same","s":"once per surgery"},"unitn":{"st":"same","s":"one — it's disposable"}},"add":[],"ann":[["Population","100,000 breast conservation surgeries a year."],["Filter","None — the device works in every one. A filter branch you can strike out is still worth naming."],["Frequency","Once per surgery."],["Units","One, because it is disposable. Had it been reusable the whole tree would change."]],"note":"The fastest sizing in the corpus, because every filter is handed to you. Ask whether a device is disposable before anything else."}],"BTH-05":[{"base":"profitability","name":"Profitability","fit":"partial","when":"The client wants to 'do better' and you need to find the lever.","over":{"prev":{"st":"changed","s":"the only live branch"},"pprice":{"st":"same","s":"+1.3% blended"},"pvol":{"st":"dropped","s":"assumed unchanged"},"pcost":{"st":"dropped","s":"client closed it"},"pfx":{"st":"dropped"},"pvc":{"st":"dropped"},"pext":{"st":"same","s":"raised at the end, as risk"}},"add":[],"ann":[["Revenue","The only live branch, and within it price rather than volume."],["Cost","Explicitly closed by the client — no savings available."],["External","Raised only at the end, as risks."]],"note":"Marked partial because two of its three branches are shut before you start. Building the full tree anyway costs you minutes you don't have."},{"base":"mix","name":"Pricing across a mix","fit":"full","when":"When price moves differ by product and you need the net effect.","over":{"root":{"st":"same","s":"+$39M vs a $30M target"},"line":{"st":"same","s":"five lines, five weights"},"chg":{"st":"same","s":"−2 · +1 · 0 · +2 · +4%"},"wt":{"st":"same","s":"5 · 20 · 30 · 30 · 15%"},"tot":{"st":"same","s":"$3B"},"summ":{"st":"changed","s":"−3 +6 +0 +18 +18 = $39M"}},"add":[],"ann":[["Price change","−2%, +1%, 0%, +2%, +4% across the five lines."],["Weight","5%, 20%, 30%, 30%, 15% of $3B. The weights are the reason you cannot average the percentages."],["Line contribution","−$3M, +$6M, $0, +$18M, +$18M."],["Sum","+$39M against a $30M target."]],"note":"The whole case is this one framework, applied properly. Percentages of different bases cannot be added — the weights are what make it work."}]};

/* The casebook's OWN framework (SRCFW), one entry per case that has one. Two trees per case:
   printed  = exactly the casebook's structure and wording (fidelity),
   improved = built on it: kept where it holds, with additions / moves / renames flagged (o.chg + o.chgwhy).
   N(text, o, kids): o.u = steps that use it; o.from = 'given' | 'ask' | 'calc' | 'none' (where the information
   comes from); o.def = what it means; o.why = why you need it; o.n = what it comes to in this case;
   o.split = why a parent branches into exactly these children; o.chg = 'add' | 'move' | 'ren' | 'cut'. */
const N = (t,o,k)=>Object.assign({t,k:k||[]},o||{});
const NC = (base,o,k)=>Object.assign({}, base, o||{}, {k: k===undefined ? base.k : k});   /* reuse a printed node in the improved tree */
const SRCFW = (()=>{
 /* ---------- Army Hotel, printed ---------- */
 const A = {};
 A.nbr = N("Number of hotels",{u:[3],from:"ask",def:"How many alternative hotels sit near the base.",why:"One rival and ten rivals are very different markets.",n:"Three: Hilton $110, Hampton Inn $75, Days Inn $40."});
 A.loc = N("Location",{u:[3],from:"ask",def:"Where those hotels are relative to where the guests need to be.",why:"A cheap hotel far away has a hidden cost in time and fuel.",n:"All about 20 miles from the base, which is why they barely compete."});
 A.comp = N("Competition",{u:[3],def:"The other hotels a guest could choose instead of yours.",why:"Competitors usually set the price you can charge.",n:"Only one of the three is a real rival, and even that one is 20 miles away.",
   split:"Rivals threaten you in two ways: how many there are, and whether they are close enough to take your guests. You need both, because ten far-away hotels are a smaller threat than two next door."},[A.nbr,A.loc]);
 A.prox = N("Proximity to base",{u:[1],from:"given",def:"How close the hotel is to where guests need to be every day.",why:"Convenience is what you are selling against the 20-mile rivals.",n:"The hotel is built on the base itself."});
 A.sold = N("Soldiers",{u:[4],from:"ask",def:"The guests: trainees on courses and soldiers rotating to the base.",why:"One kind of guest means demand can be counted rather than estimated.",n:"Three groups: basic trainees, advanced trainees, and soldiers on a 3-year rotation.",
   split:"What makes a soldier pick a hotel is how far it is from the base, so proximity is the one feature worth checking."},[A.prox]);
 A.cust = N("Customers",{def:"The people who would actually stay.",why:"You size demand from who they are, not from a general market.",
   split:"The book lists one customer type, soldiers, so the branch has a single child. When the customer base is this narrow, say so instead of inventing a bigger market."},[A.sold]);
 A.mkt = N("Hotel Market",{u:[3,4],def:"Whether there is anyone to sell rooms to, and who else is already selling them.",why:"Without customers there is no revenue, and a crowd of rivals caps your price. It is the cheapest test of the idea, so it comes first.",n:"Small and countable here: one base, one kind of guest, three distant rivals.",
   split:"A market is demand meeting supply. Customers are the demand; competition is the supply already serving it. Together they tell you how many rooms you can sell and how hard rivals will push your price."},[A.comp,A.cust]);
 A.dem = N("Demand/Occupancy",{u:[4,5],from:"calc",def:"How many room-nights guests want, and what share of the hotel's rooms that fills.",why:"It is the volume half of revenue. Over-count it and every number after it is flattered.",n:"129,000 room-nights wanted, 120,000 that the hotel can actually house."});
 A.rooms = N("# of rooms",{u:[5],from:"given",def:"How many rooms the hotel has to sell.",why:"It is the physical ceiling on volume, however much demand there is.",n:"400 rooms, short by 80 a night for four peak months."});
 A.wtp = N("WTP",{from:"none",def:"Willingness to pay: the most a guest would choose to pay if left to decide.",why:"Usually the limit on price. Here it does not apply, because the Army, not the soldier, is paying.",n:"Set aside: the Army's budget decides, not what a soldier would pay."});
 A.price = N("Pricing",{u:[3],from:"ask",def:"The rate you charge per room-night.",why:"It is the price half of revenue, and in this case the one you cannot move.",n:"Capped at $60 by the Army's $75 allowance, which also has to pay for meals.",
   split:"The book assumes price is limited by what customers will pay. That is true in most cases, so it checks willingness to pay. In this case it is the wrong limit, which the improved view fixes."},[A.wtp]);
 A.nonocc = N("Non-occupancy revenues",{u:[7,8],from:"none",def:"Money earned from guests beyond the room rate, such as a restaurant or conference space.",why:"With price capped and rooms limited, it is the one lever left to shorten payback.",n:"Never sized in the case, but the model answer proposes a restaurant and army conferences as the fix."});
 A.rev = N("Revenues",{u:[3,4,5],def:"Money coming in before any cost comes off.",why:"The top of the profit tree: everything else is subtracted from it.",n:"Rooms sold times the rate: 120,000 × $60 = $7.2M.",
   split:"Revenue is rooms sold times the rate, plus any other income. Demand and rooms together fix how many nights you sell, pricing sets what each earns, and non-occupancy revenues are the income that is not a room-night."},[A.dem,A.rooms,A.price,A.nonocc]);
 A.build = N("Building/investment",{u:[6],from:"ask",def:"What it costs to build the hotel.",why:"It is the number the payback test divides into.",n:"400 rooms × $50,000 = $20M, borrowed from a comparable hotel."});
 A.be = N("Breakeven timeline",{u:[7],from:"ask",def:"How many years until profit has repaid the build cost.",why:"A financial buyer judges a deal on how fast it gets its money back.",n:"$20M over $3.2M a year is 6.25 years, against the client's 4–5."});
 A.capex = N("Capital expenses",{u:[6],def:"Money spent once to create the asset.",why:"It has to be paid back out of future profit, so it sits outside the annual picture.",
   split:"The book puts the build cost and the time to earn it back together, since both come from the one-off spend. The weak point is that the payback also depends on yearly profit, so the improved view makes it its own node."},[A.build,A.be]);
 A.labor = N("Labor",{from:"none",def:"Staff cost: front desk, housekeeping, kitchen.",why:"Usually the biggest running cost, and the place you would look to cut.",n:"Never split out of the $4M."});
 A.maint = N("Maintenance",{from:"none",def:"Upkeep and repairs of the building.",why:"It grows as the building ages and is easy to forget.",n:"Never split out of the $4M."});
 A.opex = N("Operational expenses",{u:[6],from:"ask",def:"The yearly cost of running the hotel.",why:"It turns revenue into operating profit.",n:"$4M a year, given as one lump.",
   split:"Running a hotel is mostly people and upkeep, so those two are the pieces you would examine first to cut cost."},[A.labor,A.maint]);
 A.costs = N("Costs",{u:[6],def:"Money going out, split into a one-off build and a yearly running bill.",why:"They enter the decision differently, so they must be kept apart.",n:"$20M once and $4M a year.",
   split:"Costs are sorted by when you pay them: once up front, or every year. The one-off has to be earned back, the yearly one comes straight off profit, so mixing them gives the wrong answer."},[A.capex,A.opex]);
 A.prof = N("Profitability",{u:[3,4,5,6,7],def:"Whether the hotel earns more than it costs, and whether it earns it back fast enough.",why:"A busy hotel can still lose money. This is the branch that decides build or don't build.",n:"Revenue $7.2M less running cost $4M leaves $3.2M a year against a $20M build.",
   split:"Profit is revenue minus cost, so those two are the whole story. Anything that changes profit has to be a change in one or the other."},[A.rev,A.costs]);
 A.port = N("Portfolio mix",{from:"none",def:"How a new investment fits the firm's other holdings.",why:"A deal can be fine alone and still unbalance the portfolio.",n:"Never discussed."});
 A.goals = N("Financial and operational investment goals",{u:[7],from:"ask",def:"The returns and conditions the firm requires from an investment.",why:"It supplies the pass mark you measure the result against.",n:"Payback within 4–5 years, which you only learn by asking."});
 A.exit = N("Exit opportunities",{from:"none",def:"How and when the firm could sell the hotel and get its money out.",why:"A sale price at the end adds to the return.",n:"Never discussed."});
 A.oc = N("Opportunity cost",{u:[8],from:"none",def:"What the same money could have earned in its best alternative use.",why:"A deal has to beat the next best use of the money, not just beat zero.",n:"Named in the risks, never computed. See the Toolkit."});
 A.client = N("Client interests (PE firm)",{u:[1,7],def:"What this particular buyer needs from a deal, which is not the same as what any investor needs.",why:"The same hotel can be a yes for one buyer and a no for another. The decision belongs to the client.",n:"The firm's 4–5 year payback rule is what turns a 16% yearly return into a no.",
   split:"A deal is judged against what this owner wants. Portfolio mix asks if it fits their other holdings, goals asks what return they require, exit asks how they get out, and opportunity cost asks what else the money could do. Each is a different yardstick."},[A.port,A.goals,A.exit,A.oc]);
 const hypA = N("Working hypothesis: the PE firm should build the hotel",{u:[1,2,8],from:"given",
   def:"An answer you commit to before you have any numbers, which the rest of the structure is built to test.",
   why:"It stops you listing topics at random. Everything under it is something you would check to prove the hypothesis right or wrong.",
   n:"The book has you say this first, then 'to validate that, I'd like to look at…'. The numbers end up killing it: the case ends at 'don't build'.",
   split:"The three branches are the three questions a yes needs: is there a market, does it make money, and does it suit this buyer. A no on any one is enough to kill the idea, so each stands alone."});
 /* ---------- Army Hotel, improved ---------- */
 const I = {};
 I.rates = N("Rival rates",{chg:"add",chgwhy:"The book lists how many rivals there are and where, but never what they charge. The $110 / $75 / $40 spread is what shows only one rival is in range of a $75 allowance.",u:[3],from:"ask",def:"What each nearby hotel charges per night.",why:"The soldier compares your rate against theirs.",n:"$110, $75 and $40. Only the $40 hotel fits under the allowance once meals are paid."});
 I.comp = NC(A.comp,{split:"Rivals threaten you through how many they are, how close they are and what they charge. All three are needed to say whether any rival is really competing."},[A.nbr,A.loc,I.rates]);
 I.who = N("Who stays, and for how long",{chg:"add",chgwhy:"The book names 'Soldiers' but the volume work in Step 4 turns on the three separate groups and their stay lengths. Naming it here points you at the question you will have to ask.",u:[4],from:"ask",def:"The kinds of guest and how long each one stays.",why:"Nights, not heads, make revenue, and each group has a different pattern.",n:"Basic 70,000, advanced 14,000 and rotations 45,000 room-nights."});
 I.sold = NC(A.sold,{split:"A guest decision rests on where the hotel is and who the guests are. Proximity tells you why they choose you; who stays tells you how many nights to count."},[A.prox,I.who]);
 I.payer = N("Payer: the Army",{chg:"add",chgwhy:"The book assumes the guest pays. Here the Army reimburses $75 a night, so the payer is a separate customer with its own budget. Missing this is the main reason candidates quote the wrong price.",u:[3],from:"ask",def:"The party that actually pays the bill, when it is not the guest.",why:"The payer's budget, not the guest's wallet, caps the price.",n:"$75 per night per diem, covering room, breakfast and dinner."});
 I.cust = NC(A.cust,{split:"A booking has two customers when someone else pays: the person who stays and the party who pays. They want different things, so you check both."},[I.sold,I.payer]);
 I.mkt = NC(A.mkt,{split:"A market is demand meeting supply. Customers (guest and payer) are the demand; competition is the supply already serving it."},[I.comp,I.cust]);
 I.demand = N("Demand",{chg:"ren",chgwhy:"The book's 'Demand/Occupancy' joins two different things. Demand is what people want; occupancy is what you actually sell after the room limit. Splitting them lets the capacity step stand on its own.",u:[4],from:"calc",def:"How many room-nights guests want in a year.",why:"It is the volume you would sell with unlimited rooms.",n:"129,000 room-nights."});
 I.cap = N("Capacity (rooms, and the peak)",{chg:"move",chgwhy:"The book lists '# of rooms' beside demand as if it were another revenue item. It is the limit on volume, and the case turns on the four-month peak, not the yearly average. So it sits under Volume, next to Demand.",u:[5],from:"given",def:"How many rooms the hotel has, and whether it runs short in the busy months.",why:"Volume sold is the smaller of demand and capacity.",n:"400 rooms; 80 short a night for four months, so 120,000 nights are sellable."});
 I.vol = N("Volume sold",{chg:"add",chgwhy:"The book has no node for the number of room-nights actually sold. Revenue is volume times price, so the structure needs it.",u:[4,5],def:"The room-nights you actually sell in a year.",why:"It is the first half of revenue.",n:"120,000 room-nights.",
   split:"You sell the smaller of what people want and what you can house. So volume has two pieces: demand and capacity."},[I.demand,I.cap]);
 I.ceil = N("Payer's ceiling",{chg:"ren",chgwhy:"The book's 'Pricing → WTP' says price is limited by what customers will pay. In this case the limit is the Army's allowance less two meals, so the first thing to check is the payer's budget.",u:[3],from:"ask",def:"The most the payer will allow per night once everything else on the allowance is paid for.",why:"It is the real limit on price here.",n:"$75 allowance minus about $15 of meals leaves about $60."});
 I.wtp = NC(A.wtp,{chg:"move",chgwhy:"Kept, but demoted. It only matters when the guest pays, which is not the case here. It stays in the structure so you say why you set it aside.",n:"Set aside because the Army pays."});
 I.price = N("Price per room-night",{chg:"ren",chgwhy:"The book's 'Pricing' with a plainer name, and with the payer's ceiling as the first thing to check.",u:[3],from:"ask",def:"The rate you charge per night.",why:"It is the second half of revenue.",n:"$60.",
   split:"Price is capped by whoever pays. When the guest pays, that is willingness to pay. When someone else pays, it is that payer's budget. You check both and say which applies."},[I.ceil,I.wtp]);
 I.rev = NC(A.rev,{split:"Revenue is volume times price, plus income that is not a room-night. Those are the three things that can change it."},[I.vol,I.price,A.nonocc]);
 I.build = NC(A.build,{chg:"ren",chgwhy:"Same node, shown as the one-off.",n:"400 × $50,000 = $20M, paid once."});
 I.cap1 = N("Build, one-off",{chg:"ren",chgwhy:"The book's 'Capital expenses' with its payback timeline lifted out into its own node.",u:[6],def:"The money spent once to build the hotel.",why:"It is repaid from future profit, not charged to any one year.",n:"$20M.",
   split:"The one-off spend is a single number, the building, so it has one child."},[I.build]);
 I.run = N("Running, per year",{chg:"ren",chgwhy:"The book's 'Operational expenses'.",u:[6],from:"ask",def:"The yearly cost of running the hotel.",why:"It comes straight off revenue every year.",n:"$4M a year.",
   split:"Running costs are mostly staff and upkeep, the first two places to look for savings."},[A.labor,A.maint]);
 I.costs = NC(A.costs,{split:"Costs are sorted by when you pay them. The one-off has to be earned back; the yearly one comes off profit now."},[I.cap1,I.run]);
 I.pay = N("Payback",{chg:"move",chgwhy:"The book hangs 'Breakeven timeline' under Capital expenses. Payback needs the yearly profit as well as the build cost, so it fits better as the verdict of the Profitability branch, which is where the case actually computes it.",u:[7],from:"calc",def:"Years for yearly profit to repay the build cost.",why:"It is the test the client's decision turns on.",n:"$20M ÷ $3.2M = 6.25 years, against 4–5."});
 I.prof = NC(A.prof,{split:"Profit is revenue minus cost, and the client then asks how fast that profit repays the build. So Profitability ends in a verdict: payback."},[I.rev,I.costs,I.pay]);
 I.hurdle = N("Payback hurdle",{chg:"add",chgwhy:"The book lists 'investment goals' without saying what goal. In this case the goal is one number, and without it the result of the payback test cannot be judged.",u:[7],from:"ask",def:"The longest payback the client will accept.",why:"It is the pass mark for the Payback node.",n:"4–5 years."});
 I.goals = NC(A.goals,{split:"The goal that matters here is the payback the firm demands."},[I.hurdle]);
 I.client = NC(A.client,{split:"A deal is judged against what this owner wants: how it fits its other holdings, the return it requires, how it exits, and what else the money could do."},[A.port,I.goals,A.exit,A.oc]);
 /* ---------- how the parts combine: the functional relationship at each node (k: calc = arithmetic, rule = a yes/no or comparison test) ---------- */
 const FN = (n, o)=>{ n.fn = o; };
 FN(hypA,{k:"rule",say:"Build only if all three tests pass. They are yes-or-no questions, so there is no arithmetic between them, and a single 'no' is enough to stop the project.",f:"Build = Market ✓ AND Profit ✓ AND Fit ✓",units:"Each test returns yes or no. The numbers sit inside each branch.",ex:["Market: yes. About 129,000 room-nights a year are wanted.","Profit: positive, $3.2M a year, but the build takes 6.25 years to pay back.","Fit: no. This client's hurdle is 4 to 5 years.","One 'no', so the answer is: do not build as proposed."]});
 const mktFn = {k:"calc",say:"The book gives no formula for a market. A useful way to read it: customers are the demand D, competitors are the supply S that already serves it, and what is left over is what you could win.",f:"Open demand = D − S",units:"room-nights per year, for D, S and the result",ex:["D = 129,000 room-nights a year (three groups of soldiers).","S is small: the rivals are about 20 miles from the base, and only one is cheap enough.","So open demand is close to the full 129,000 room-nights a year."],flag:"Our framing, not stated in the book"};
 FN(A.mkt, mktFn); FN(I.mkt, mktFn);
 FN(A.comp,{k:"rule",say:"A rival only matters if it is close enough to take your guests. So count the hotels that are within reach of the base, not every hotel in the area.",f:"Rivals that count = hotels within reach of the base",units:"a count of hotels; distance in miles",ex:["Three hotels, all about 20 miles from the base.","At that distance they barely compete for a soldier who must be on the base, and the book treats only one as a real rival."]});
 FN(I.comp,{k:"rule",say:"A rival counts only if it passes two tests: it is within reach, and its price fits under what the payer allows for a room.",f:"Rivals that count = hotels within reach AND priced ≤ the payer's ceiling",units:"a count of hotels; price in $ per night; distance in miles",ex:["Hilton $110, Hampton Inn $75, Days Inn $40, against a room-only ceiling of about $60.","Only the $40 hotel is cheap enough, and it is still about 20 miles away. So the count is at most 1."]});
 FN(A.cust,{k:"calc",say:"Customers are counted in groups. Each group's room-nights are the number of people times the nights each one stays, and the groups add up to total demand.",f:"D = Σ (soldiers in a group × nights per stay)",units:"soldiers × nights per stay = room-nights per year",ex:["Basic trainees 70,000, advanced trainees 14,000, three-year rotations 45,000 room-nights a year.","D = 70,000 + 14,000 + 45,000 = 129,000 room-nights a year."]});
 FN(I.cust,{k:"rule",say:"A room-night only sells if two parties agree: the guest wants the room, and the payer's allowance covers the rate. So count the guests' room-nights first, then check the price against the payer's limit.",f:"Sellable demand = D, provided price p ≤ payer's ceiling",units:"D in room-nights per year; p and ceiling in $ per night",ex:["D = 129,000 room-nights a year.","p = $60 and the ceiling is $60, so the test passes."]});
 FN(A.sold,{k:"rule",say:"A soldier chooses between hotels mainly on distance. The closer the hotel is to the base, the more of the soldiers' nights it wins, all else equal.",f:"Share of nights won rises as distance to base falls",units:"distance in miles",ex:["This hotel is on the base: 0 miles. The rivals are about 20 miles away."]});
 FN(I.sold,{k:"calc",say:"Room-nights from a group are the people in it times the nights each stays. Proximity decides how many of those nights you win rather than a rival.",f:"Room-nights = guests × nights per stay",units:"guests × nights per stay = room-nights per year",ex:["Basic trainees 70,000, advanced trainees 14,000, rotations 45,000 room-nights a year, all of which can be served on the base."]});
 FN(A.price,{k:"rule",say:"A price cannot go above what the customer is willing to pay, so the book checks willingness to pay (WTP).",f:"p ≤ WTP",units:"$ per room-night",ex:["In this case the Army, not the soldier, pays, so WTP does not set the price. The improved view fixes this."]});
 FN(I.price,{k:"calc",say:"When someone else pays, the price is limited by the payer's budget. Willingness to pay only applies if the guest is the one paying.",f:"p ≤ payer's ceiling = A − m",units:"$ per room-night",ex:["A = $75 allowance, m ≈ $15 of meals, so the ceiling is $60.","WTP is set aside because the Army pays."]});
 FN(I.ceil,{k:"calc",say:"The ceiling is the allowance less everything else the allowance must also pay for.",f:"Ceiling = A − m",units:"$ per night",ex:["$75 − $15 = $60 per night."]});
 FN(I.vol,{k:"calc",say:"You can only sell what you can house. Volume is demand less the rooms you cannot supply during the peak.",f:"Q = D − (g × d)",units:"room-nights per year; g in rooms short per night, d in nights",ex:["D = 129,000 room-nights.","Peak shortage g × d = 80 rooms × 120 nights = 9,600 room-nights.","Q = 129,000 − 9,600 = 119,400, about 120,000 room-nights a year."]});
 FN(I.cap,{k:"calc",say:"Capacity is rooms times nights. It limits volume only in the stretch where demand is higher than the rooms you have.",f:"Capacity = K × nights, checked against the peak",units:"rooms × nights = room-nights",ex:["400 rooms × 365 nights = 146,000 room-nights a year, more than the demand on average.","But for 120 peak nights the Army wants 480 rooms a night, 80 more than the 400 available."]});
 const revFn = (kids)=>({k:"calc",say:"Revenue is the room-nights you sell times the price of each, plus any income that is not a room-night. Rooms sold is the smaller of what customers want and what you can house.",f:"R = Q × p + N,   with Q = the smaller of D and capacity",units:"Q in room-nights per year × p in $ per room-night = $ per year; N in $ per year",ex:["Q ≈ 120,000 room-nights and p = $60, so Q × p = $7.2M a year.","N, the non-room income, is never given in the case."]});
 FN(A.rev, revFn()); FN(I.rev, revFn());
 FN(A.build,{k:"calc",say:"The build cost is the number of rooms times what one room costs to build.",f:"I = rooms × cost per room",units:"rooms × $ per room = $, paid once",ex:["400 rooms × $50,000 per room = $20,000,000 = $20M."]});
 FN(I.build,A.build.fn);
 FN(A.be,{k:"calc",say:"Breakeven time is how many years of yearly profit it takes to repay the build cost.",f:"T = {I|π}",units:"$ ÷ ($ per year) = years",ex:["{$20M|$3.2M} = 6.25 years, against the client's 4 to 5."]});
 FN(I.pay,A.be.fn);
 FN(A.capex,{k:"calc",say:"The two children are linked by division: the build cost is the one-off outlay I, and the breakeven timeline is how many years of yearly profit π it takes to repay it. π is not in this branch, which is why the improved view moves payback up under Profitability.",f:"T = {I|π}",units:"years = $ ÷ ($ per year)",ex:["I = $20M, π = $3.2M a year, so T = 6.25 years."]});
 FN(I.cap1,{k:"calc",say:"The one-off spend here is the build cost alone, so this node has a single child and no arithmetic to combine.",f:"I = rooms × cost per room",units:"$, paid once",ex:["$20M, paid once."]});
 FN(A.opex,{k:"calc",say:"Running cost is the sum of its parts: staff, upkeep and anything else it takes to operate the hotel.",f:"C = labor + maintenance + other",units:"$ per year for each term",ex:["The case gives C = $4.0M a year as one lump. It never splits it into labor and maintenance."]});
 FN(I.run,A.opex.fn);
 const costsFn = {k:"rule",say:"These two kinds of cost are not added together. One is paid once ($) and the other every year ($ per year), and adding different units gives a meaningless total. They meet only in the payback calculation.",f:"T = {I|R − C}",units:"I in $ once; R and C in $ per year; T in years",ex:["I = $20M, R = $7.2M a year, C = $4.0M a year.","T = {$20M|$7.2M − $4.0M} = {$20M|$3.2M} = 6.25 years."]};
 FN(A.costs, costsFn); FN(I.costs, costsFn);
 FN(A.prof,{k:"calc",say:"The book says profit is revenue minus costs. Watch the units: only the yearly running cost comes off yearly revenue. The build cost is one-off, so it is tested separately by dividing it by the yearly profit.",f:"π = R − C,   then   T = {I|π}",units:"π in $ per year; T in years",ex:["π = $7.2M − $4.0M = $3.2M a year.","T = $20M ÷ $3.2M = 6.25 years."]});
 FN(I.prof,{k:"calc",say:"Profit is revenue minus the yearly running cost. Payback then divides the one-off build cost by that profit, so the branch ends in a verdict.",f:"π = R − C,   then   T = {I|π}",units:"π in $ per year; T in years",ex:["π = $7.2M − $4.0M = $3.2M a year.","T = $20M ÷ $3.2M = 6.25 years."]});
 FN(I.hurdle,{k:"rule",say:"The hurdle is the pass mark for payback.",f:"Pass if T ≤ H",units:"years",ex:["T = 6.25 years, H = 4 to 5 years, so it fails."]});
 FN(A.goals,{k:"rule",say:"The goal is the standard the result is judged against, here the longest payback the client will accept.",f:"Pass if T ≤ H",units:"years",ex:["The client requires H = 4 to 5 years."]});
 FN(I.goals,A.goals.fn);
 FN(A.oc,{k:"calc",say:"Opportunity cost is the yearly return the same money would earn in its best alternative, taken off this deal's profit.",f:"Economic profit = π − (I × r)",units:"$ per year; r in % per year",ex:["An alternative that pays back in 5 years returns r = {1|5} = 20% a year.","I × r = $20M × 20% = $4.0M a year, so economic profit = $3.2M − $4.0M = −$0.8M a year."]});
 const clientFn = {k:"rule",say:"The client says yes only if the deal passes every yardstick it cares about. Two can be measured here: payback must be at or under the hurdle, and the yearly return must beat the best alternative.",f:"Yes if T ≤ H AND {π|I} ≥ r_alt",units:"T and H in years; return and r_alt in % per year",ex:["T = 6.25 years against H = 5 years: fails.","Return = {$3.2M|$20M} = 16% a year against 20% from the alternative: fails again."]};
 FN(A.client, clientFn); FN(I.client, clientFn);
 return {
 "BTH-01": {src:"Booth 2025 · Case 1, p. 71", buildStep:2,
   lead:"To validate that, I'd like to look at…",
   printed:{hyp:hypA,kids:[A.mkt,A.prof,A.client]},
   improved:{hyp:hypA,kids:[I.mkt,I.prof,I.client],
     note:"Same three branches and the same order as the book. Changes: the payer is added as a customer, volume and price are separated so revenue reads as volume × price, '# of rooms' moves under volume as the capacity limit, and payback moves up to be the verdict of profitability."}},
 "BTH-02": (()=>{
   const B = {};
   B.size = N("Market size: Number of breast conservation surgeries conducted per year (demand)",{u:[2],from:"ask",def:"How many breast conservation surgeries are done a year, which is how many devices could sell.",why:"It is the most the device could sell in a year.",n:"100,000 a year, one device per surgery."});
   B.growth = N("Growth trend: Frequency rate of breast cancer in population",{from:"none",def:"Whether the number of cases is rising or falling.",why:"A growing market can justify a higher price today.",n:"Never given or used."});
   B.patient = N("Patient",{def:"The people the device is used on.",why:"Demand starts with patients, not hospitals.",split:"Market potential has two sides: how big it is now (market size) and which way it is heading (growth)."},[B.size,B.growth]);
   B.mp = N("Med Device Market Potential",{u:[2],def:"How many patients could ever use the device.",why:"It sets the ceiling on volume.",n:"100,000 surgeries a year, once asked.",
     split:"The book has a single child, the patient, because the market is defined by who gets the surgery."},[B.patient]);
   B.adopt = N("Provider/Clinician Adoption rate: willingness of clinicians to adopt the device at different price points",{u:[3],from:"ask",def:"The share of clinicians willing to use the device at each price.",why:"It is the volume half of revenue and it falls as price rises.",n:"The exhibit: this is the heart of the case."});
   B.rel = N("Med Device Co. relationship with clinicians: supplier contracts, trust",{from:"none",def:"Existing contracts and trust between the firm and the surgeons.",why:"Strong relationships raise adoption.",n:"Never raised."});
   B.ins = N("Insurance companies willingness to cover device cost as part of surgery",{from:"none",def:"Whether insurance will pay for the device as part of the surgery.",why:"If nobody reimburses the hospital, adoption drops.",n:"Never raised."});
   B.rp = N("Revenue Potential",{u:[3],def:"Who has to say yes to the device, and at what price.",why:"Revenue is price times buyers, and buyers depend on price.",n:"The exhibit gives adoption at each price.",
     split:"Three groups can say no: the surgeons who use it, the firm's standing with them, and the insurers who pay for it. Together they decide how many buy."},[B.adopt,B.rel,B.ins]);
   B.innov = N("Degree of Innovation (availability of substitutes)",{u:[2],from:"ask",def:"Whether anything else does the same job.",why:"Substitutes limit the price you can charge.",n:"There are no competitors at all."});
   B.app = N("Device applicability / usability across variety of breast conservation surgeries",{u:[2],from:"ask",def:"Whether it works in every breast conservation surgery.",why:"It decides how much of the market you can reach.",n:"Works in every one."});
   B.succ = N("Success/complication rate",{u:[2],from:"ask",def:"How often the device works as intended.",why:"Safety drives clinician trust and adoption.",n:"100% success."});
   B.life = N("Useful life, quality",{u:[2],from:"ask",def:"How long it lasts and how well it is made.",why:"It decides whether you sell one unit per surgery or one for many.",n:"No quality concerns, and it is disposable."});
   B.feat = N("Main features",{def:"What the device does and how well it does it.",why:"Features set how much customers value it.",split:"Value to a surgeon comes from reach (how many surgeries it works in), safety (success rate) and durability (life and quality)."},[B.app,B.succ,B.life]);
   B.pat = N("Patent",{from:"none",def:"Legal protection against copycats.",why:"It protects the price you can hold.",n:"Never raised."});
   B.fda = N("Compliance to regulations (FDA)",{u:[2],from:"ask",def:"Whether the US regulator has approved the device, and whether it is protected.",why:"No approval, no sales.",n:"Already approved.",split:"Approval and patent are the two legal gates: one to sell at all, one to keep rivals out."},[B.pat]);
   B.dev = N("BCS Device",{u:[2],def:"Whether the product is good enough to sell.",why:"A weak product undermines any pricing answer.",n:"Every question about the device comes back clean.",
     split:"A device is judged on four things: whether anything substitutes for it, what it does, whether it may be sold, and whether it can be copied."},[B.innov,B.feat,B.fda]);
   const hyp = N("Build a framework from these drivers and walk the interviewer through it",{u:[1,2],from:"given",def:"The casebook gives the drivers and expects you to arrange them into a structure.",why:"It tests whether you can organise a pricing question before you touch a number.",n:"No hypothesis is given, so the order is yours.",
     split:"The three branches are the market (how many could buy), the revenue (who will buy, and at what price) and the product (is it good enough). Each can stop the case."});
   const FN2 = (n,o)=>{ n.fn = o; };
   FN2(B.mp,{k:"calc",say:"Market potential is the number of surgeries a year, because each surgery uses one device.",f:"M = surgeries per year × 1 device each",units:"surgeries per year = devices per year",ex:["M = 100,000 surgeries a year, so up to 100,000 devices a year."]});
   FN2(B.patient,{k:"rule",say:"Market potential has two sides: how big it is now and which way it is heading. Only the size feeds a revenue number.",f:"Potential = size now, adjusted for the trend",units:"patients or surgeries per year",ex:["Size is 100,000 a year. The trend is never given in the case."]});
   FN2(B.rp,{k:"calc",say:"Revenue is the price times the number of buyers at that price, and the number of buyers is the market times the share who adopt at that price. Adoption falls as price rises, so you work it out at each price.",f:"R(p) = p × a(p) × M",units:"p in $ per device; a(p) a share of clinicians (0 to 1); M in devices per year; R in $ per year",ex:["$600 × 50% × 100,000 = $30M a year."]});
   FN2(B.feat,{k:"rule",say:"A surgeon values the device on three things at once: how many surgeries it works in, how often it succeeds, and how long it lasts. A weak score on any one lowers the value.",f:"Value to a surgeon = reach, success rate and durability together",units:"reach as a share of surgeries; success as a %; life in uses",ex:["Works in every surgery, 100% success, disposable: no concern on any of the three."]});
   FN2(B.fda,{k:"rule",say:"Approval and patent are two legal gates. You need approval to sell at all, and a patent to keep rivals out.",f:"Can sell = approved; can hold price = approved AND patent",units:"yes or no for each gate",ex:["Already approved. The patent is never raised."]});
   FN2(B.dev,{k:"rule",say:"A device is good enough to sell only if every check passes: no easy substitute, features that work, approval to sell, and protection from copycats. One failure undermines the pricing answer.",f:"Sellable = no substitute AND good features AND approved AND protected",units:"yes or no for each check",ex:["Every check comes back clean in the case."]});
   /* improved */
   const rev = N("Revenue at each price point",{chg:"add",chgwhy:"The book lists what influences adoption but never the calculation the case asks for: price times adoption times market, for each price in the exhibit. It is the actual answer.",u:[3],from:"calc",def:"Price × share who adopt at that price × the 100,000 market, worked out for every price tested.",why:"The highest of these is the revenue-maximising price.",n:"$300 → $22.5M, $600 → $30M, $1,000 → $10M."});
   const cost = N("Cost to make and serve",{chg:"add",chgwhy:"The book never mentions cost. The case asks for revenue only, so cost is flagged here, to remind you to say that the revenue-maximising price is not the profit-maximising one.",from:"none",def:"What it costs the firm to produce and deliver each device.",why:"Profit, not revenue, is what the firm keeps.",n:"Never given; say so in your answer."});
   hyp.fn = {k:"rule",say:"Each branch is a gate. The market must be big enough, revenue must come out of the price test, and the product must be good enough. These are separate tests, so any one can stop the case.",f:"Proceed = Market ✓ AND Revenue ✓ AND Product ✓",units:"yes or no for each branch; the numbers sit inside each",ex:["Market: 100,000 surgeries a year.","Revenue: the best price is $600, giving $30M a year.","Product: every check comes back clean."]};
   rev.fn = {k:"calc",say:"For each price tested, multiply the price by the share who adopt at that price and by the size of the market. The largest result is the revenue-maximising price.",f:"R(p) = p × a(p) × M",units:"$ per device × share × devices per year = $ per year",ex:["$300 × 75% × 100,000 = $22.5M","$600 × 50% × 100,000 = $30M  (the highest)","$1,000 × 10% × 100,000 = $10M"]};
   const rp2 = NC(B.rp,{split:"Revenue is price times buyers. The surgeons set how many buy, the relationship and the insurers influence that, and the last node turns it into money."},[B.adopt,B.rel,B.ins,rev]);
   const dev2 = NC(B.dev,{},[B.innov,B.feat,B.fda]);
   return {src:"Booth 2025 · Case 2, p. 76", buildStep:2,
     lead:"The candidate should develop a framework that considers the following drivers.",
     printed:{hyp,kids:[B.mp,B.rp,B.dev]},
     improved:{hyp,kids:[B.mp,rp2,dev2,cost],
       note:"The book's drivers are kept as printed. Two additions: the revenue calculation the case actually asks for, and a cost node that is flagged because the case never supplies one."}};
 })()
 };
})();
const NX = Object.fromEntries(NODES.map(n=>[n.id,n]));
const FIGS = {
 price: ()=>{ const sx=v=>(v/120)*(R-L-70), c=L+sx(75);
  return cap("what the soldier can spend")
   + row(30, sx(110), "var(--dim)", "Hilton", "$110")
   + row(54, sx(75),  "var(--dim)", "Hampton Inn", "$75")
   + row(78, sx(40),  "var(--dim)", "Days Inn · 20 mi", "$40")
   + row(110, sx(60), "var(--accent)", "Our hotel", "$60")
   + `<line x1="${c}" y1="18" x2="${c}" y2="140" stroke="var(--warn)" stroke-width="1.8" stroke-dasharray="4 3"/>
      <text x="${c+6}" y="152" font-family="Public Sans, sans-serif" font-size="10.5" fill="var(--warn)">
        $75 per diem — and it buys dinner too</text>`; },
 volume: ()=>{ const sx=v=>(v/150000)*(R-L-60); let x=L, s=cap("room-nights a year");
  [[70000,"Basic training","var(--accent)"],[14000,"Advanced","var(--accent-line)"],
   [45000,"Rotations","var(--ink-3)"]].forEach(([v,lab,col])=>{ const w=sx(v);
    s+=`<rect x="${x}" y="46" width="${w}" height="30" fill="${col}"/>
        <text x="${x+w/2}" y="96" text-anchor="middle" font-family="Public Sans, sans-serif" font-size="10.5"
          fill="var(--ink-2)">${lab}</text>
        <text x="${x+w/2}" y="110" text-anchor="middle" font-family="IBM Plex Mono, monospace"
          font-size="10.5" fill="var(--ink-3)">${v.toLocaleString()}</text>`; x+=w; });
  return s+`<text x="${x+8}" y="66" font-family="IBM Plex Mono, monospace" font-size="12"
      fill="var(--ink)">129,000</text>
    <text x="${L}" y="140" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-3)">
      × $60 a night = $7.8M a year</text>`; },
 capacity: ()=>{ const sx=v=>(v/150000)*(R-L-60), sold=L+sx(120000), dem=L+sx(129000), capx=L+sx(146000);
  return cap("what the hotel can actually sell")
   + `<rect x="${L}" y="40" width="${dem-L}" height="26" fill="var(--line-2)"/>
      <rect x="${L}" y="40" width="${sold-L}" height="26" fill="var(--accent)"/>
      <rect x="${sold}" y="40" width="${dem-sold}" height="26" fill="none" stroke="var(--warn)"
        stroke-width="1.4" stroke-dasharray="3 2"/>
      <text x="${L-8}" y="57" text-anchor="end" font-family="Public Sans, sans-serif" font-size="11"
        fill="var(--ink-2)">Demand</text>
      <text x="${(L+sold)/2}" y="58" text-anchor="middle" font-family="IBM Plex Mono, monospace"
        font-size="11" fill="var(--on-accent)">120,000 sold</text>
      <text x="${dem+8}" y="57" font-family="IBM Plex Mono, monospace" font-size="10.5"
        fill="var(--warn)">9,600 turned away</text>
      <line x1="${capx}" y1="30" x2="${capx}" y2="100" stroke="var(--ink-3)" stroke-width="1.5"/>
      <text x="${capx-6}" y="112" text-anchor="end" font-family="Public Sans, sans-serif" font-size="10.5"
        fill="var(--ink-3)">400 rooms × 365 = 146,000 a year</text>
      <text x="${L}" y="142" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-3)">
        Room enough over a year — not in the four months everyone arrives at once.</text>`; },
 costs: ()=>{ const base=140, sy=v=>v*(96/8000000); let x=L, s=cap("one year of trading");
  [["Revenue",7200000,"var(--accent)"],["Running cost",4000000,"var(--warn)"],
   ["Operating profit",3200000,"var(--accent)"]].forEach(([lab,v,col],i)=>{ const h=sy(v);
    s+=`<rect x="${x}" y="${base-h}" width="76" height="${h}" fill="${col}"/>
        <text x="${x+38}" y="${base-h-6}" text-anchor="middle" font-family="IBM Plex Mono, monospace"
          font-size="11" fill="var(--ink)">${i===1?"−":""}$${(v/1000000).toFixed(1)}M</text>
        <text x="${x+38}" y="${base+14}" text-anchor="middle" font-family="Public Sans, sans-serif"
          font-size="10.5" fill="var(--ink-2)">${lab}</text>`; x+=112; });
  return s+`<line x1="${L-10}" y1="${base}" x2="${L+330}" y2="${base}" stroke="var(--line-2)"/>
    <text x="${L+352}" y="${base-34}" font-family="Public Sans, sans-serif" font-size="11"
      fill="var(--ink-3)">The $20M build sits outside</text>
    <text x="${L+352}" y="${base-18}" font-family="Public Sans, sans-serif" font-size="11"
      fill="var(--ink-3)">this picture — it is what the</text>
    <text x="${L+352}" y="${base-2}" font-family="Public Sans, sans-serif" font-size="11"
      fill="var(--ink-3)">$3.2M has to pay back.</text>`; },
 payback: ()=>{ const w=(R-L-30)/7, base=54; let s=cap("paying back the $20m build"), x=L;
  for(let i=0;i<7;i++){ const full=i<6;
    s+=`<rect x="${x}" y="${base}" width="${w-4}" height="34" fill="${full?'var(--accent)':'var(--accent-soft)'}"
         stroke="var(--accent)" stroke-width="${full?0:1.2}" ${full?'':'stroke-dasharray="3 2"'}/>
        <text x="${x+(w-4)/2}" y="${base+22}" text-anchor="middle" font-family="IBM Plex Mono, monospace"
          font-size="10" fill="${full?'var(--on-accent)':'var(--ink-2)'}">${full?'3.2':'0.8'}</text>
        <text x="${x+(w-4)/2}" y="${base+50}" text-anchor="middle" font-family="Public Sans, sans-serif"
          font-size="10" fill="var(--ink-3)">yr ${i+1}</text>`; x+=w; }
  const h=L+5*w;
  return s+`<line x1="${h}" y1="${base-14}" x2="${h}" y2="${base+42}" stroke="var(--warn)" stroke-width="2"/>
    <text x="${h+7}" y="${base-18}" font-family="Public Sans, sans-serif" font-size="11"
      fill="var(--warn)">client's limit: 5 years</text>
    <text x="${L}" y="${base+76}" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-3)">
      $20M ÷ $3.2M = 6.25 years — 1.25 years more than the client will wait.</text>`; },

 attrition: ()=>cap("what differs between the two groups")
   + `<rect x="${L}" y="34" width="200" height="54" rx="3" fill="var(--warn-soft)" stroke="var(--warn)"/>
      <text x="${L+12}" y="54" font-family="Public Sans, sans-serif" font-size="11.5" font-weight="600"
        fill="var(--ink)">Under 1 year</text>
      <text x="${L+12}" y="72" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-2)">
        leaving — and 6 of those</text>
      <text x="${L+12}" y="85" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-2)">
        months were training</text>
      <rect x="${L+260}" y="34" width="200" height="54" rx="3" fill="var(--accent-soft)" stroke="var(--accent)"/>
      <text x="${L+272}" y="54" font-family="Public Sans, sans-serif" font-size="11.5" font-weight="600"
        fill="var(--ink)">Over 3 years</text>
      <text x="${L+272}" y="72" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-2)">
        almost nobody leaves</text>
      <text x="${L}" y="118" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-3)">
        Anything true of both groups is ruled out: pay scale, product, industry, office.</text>
      <text x="${L}" y="140" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-3)">
        What's left has to differ between them — what they sell, where, and what they're paid for it.</text>`,
 chain: ()=>{ const w=150, g=24; let x=L, s=cap("where cost can hide");
   [["Acquire coal","transport · third-party price · quality · unions"],
    ["Generate","old units · ten plants · labour · new rules"],
    ["Transmit","distance to customers · shared wires"]].forEach(([t,d],i)=>{
     s+=`<rect x="${x}" y="34" width="${w}" height="72" rx="3" fill="var(--accent-soft)"
           stroke="var(--accent)"/>
         <text x="${x+10}" y="54" font-family="Public Sans, sans-serif" font-size="11.5" font-weight="600"
           fill="var(--ink)">${t}</text>
         <text x="${x+10}" y="72" font-family="Public Sans, sans-serif" font-size="10" fill="var(--ink-2)">
           ${d.split(' · ').slice(0,2).join(' · ')}</text>
         <text x="${x+10}" y="86" font-family="Public Sans, sans-serif" font-size="10" fill="var(--ink-2)">
           ${d.split(' · ').slice(2).join(' · ')}</text>`;
     if(i<2) s+=`<path d="M${x+w+4} 70 H${x+w+g-6}" stroke="var(--ink-3)" stroke-width="1.4"/>
                 <path d="M${x+w+g-9} 66 l5 4 -5 4" fill="none" stroke="var(--ink-3)" stroke-width="1.4"/>`;
     x+=w+g; });
   return s+`<text x="${L}" y="134" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-3)">
     Price is market-set and volume is flat, so every remaining lever is somewhere on this line.</text>`; },
 mine: ()=>cap("the 30% that isn't a saving")
   + `<rect x="${L}" y="36" width="230" height="46" rx="3" fill="var(--accent-soft)" stroke="var(--accent)"/>
      <text x="${L+12}" y="56" font-family="Public Sans, sans-serif" font-size="11.5" font-weight="600"
        fill="var(--ink)">Burn our own coal</text>
      <text x="${L+12}" y="73" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-2)">
        looks 30% cheaper than buying</text>
      <rect x="${L}" y="96" width="230" height="46" rx="3" fill="var(--warn-soft)" stroke="var(--warn)"/>
      <text x="${L+12}" y="116" font-family="Public Sans, sans-serif" font-size="11.5" font-weight="600"
        fill="var(--ink)">Sell that same coal</text>
      <text x="${L+12}" y="133" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-2)">
        at the market price, to anyone</text>
      <path d="M${L+240} 82 H${L+276} V96 H${L+240}" fill="none" stroke="var(--ink-3)" stroke-width="1.3"/>
      <text x="${L+290}" y="82" font-family="Public Sans, sans-serif" font-size="11.5" font-weight="600"
        fill="var(--ink)">Same coal, one choice.</text>
      <text x="${L+290}" y="100" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-2)">
        The cost of burning it is what</text>
      <text x="${L+290}" y="114" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-2)">
        the market would have paid —</text>
      <text x="${L+290}" y="128" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-2)">
        so keep the mine for control,</text>
      <text x="${L+290}" y="142" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-2)">
        not for the discount.</text>`,
 util: ()=>{ const sx=v=>(v/100)*(R-L-90);
   return cap("utilisation — and what spare capacity is for")
    + row(34, sx(77), "var(--dim)", "Industry average", "77%")
    + row(62, sx(80), "var(--accent)", "GPE today", "80%")
    + row(90, sx(90), "var(--warn-soft)", "CEO's target", "90%", "var(--warn)")
    + `<text x="${L}" y="130" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-3)">
        Demand peaks in summer and a utility has to meet the peak, so the gap is the product,</text>
       <text x="${L}" y="146" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-3)">
        not waste. They are already three points above the average, not 'close to' it.</text>`; },
 curve: ()=>{ const x0=L, y0=150, w=R-L-40, h=112;
   const pts=[[0,90,0],[300,75,22.5],[600,50,30],[1000,10,10]];
   const px=p=>x0+(p/1000)*w, py=r=>y0-(r/32)*h;
   let s=cap("revenue rises, peaks, then falls");
   s+=`<line x1="${x0}" y1="${y0}" x2="${x0+w}" y2="${y0}" stroke="var(--line-2)"/>
       <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0-h-6}" stroke="var(--line-2)"/>`;
   s+=`<polyline points="${pts.map(([p,,r])=>`${px(p)},${py(r)}`).join(' ')}" fill="none"
        stroke="var(--accent)" stroke-width="2"/>`;
   pts.forEach(([p,a,r])=>{ const top=r===30;
     s+=`<circle cx="${px(p)}" cy="${py(r)}" r="${top?5:3.2}" fill="${top?'var(--warn)':'var(--accent)'}"/>
         <text x="${px(p)}" y="${py(r)-10}" text-anchor="middle" font-family="IBM Plex Mono, monospace"
           font-size="10.5" fill="${top?'var(--warn)':'var(--ink-2)'}">$${r}M</text>
         <text x="${px(p)}" y="${y0+14}" text-anchor="middle" font-family="Public Sans, sans-serif"
           font-size="10.5" fill="var(--ink-3)">$${p}</text>
         <text x="${px(p)}" y="${y0+27}" text-anchor="middle" font-family="Public Sans, sans-serif"
           font-size="10" fill="var(--dim)">${a}% adopt</text>`; });
   return s+`<text x="${x0+w-4}" y="${py(30)-24}" text-anchor="end" font-family="Public Sans, sans-serif"
     font-size="11" fill="var(--warn)">$600 × 50,000 surgeries = $30M</text>`; },
 mix: ()=>{ const items=[["Dish washing",-2,5],["Detergent",1,20],["Hand wash",0,30],
                         ["Shower gel",2,30],["All-purpose",4,15]];
   let s=cap("price move, and the money behind it"), y=30;
   items.forEach(([lab,ch,share])=>{
     const sw=share*9;
     s+=`<text x="${L-8}" y="${y+12}" text-anchor="end" font-family="Public Sans, sans-serif"
           font-size="10.5" fill="var(--ink-2)">${lab}</text>
         <rect x="${L}" y="${y}" width="${sw}" height="16" fill="var(--line-2)"/>
         <text x="${L+sw+6}" y="${y+12}" font-family="IBM Plex Mono, monospace" font-size="10"
           fill="var(--ink-3)">${share}% of revenue</text>
         <text x="${L+sw+108}" y="${y+12}" font-family="IBM Plex Mono, monospace" font-size="11"
           fill="${ch>0?'var(--accent)':ch<0?'var(--warn)':'var(--dim)'}">${ch>0?'+':''}${ch}% price</text>`;
     y+=24; });
   return s+`<text x="${L}" y="${y+18}" font-family="Public Sans, sans-serif" font-size="11"
     fill="var(--ink-3)">The biggest line moves 0%. The biggest move sits on the second-smallest line.</text>`; },
 contrib: ()=>{ const items=[["Dish washing",-3],["Detergent",6],["Hand wash",0],["Shower gel",18],
                             ["All-purpose",18]];
   const zero=L+60, u=6.2; let s=cap("what each line contributes, in $m"), y=28;
   items.forEach(([lab,v])=>{
     const w=Math.abs(v)*u, x=v<0?zero-w:zero;
     s+=`<text x="${zero-70}" y="${y+12}" font-family="Public Sans, sans-serif" font-size="10.5"
           fill="var(--ink-2)">${lab}</text>
         <rect x="${x}" y="${y}" width="${w}" height="16"
           fill="${v<0?'var(--warn)':v===0?'var(--line-2)':'var(--accent)'}"/>
         <text x="${(v<0?x-6:x+w+6)}" y="${y+12}" text-anchor="${v<0?'end':'start'}"
           font-family="IBM Plex Mono, monospace" font-size="10.5" fill="var(--ink)">
           ${v>0?'+':''}${v}</text>`; y+=24; });
   s+=`<line x1="${zero}" y1="22" x2="${zero}" y2="${y-4}" stroke="var(--ink-3)" stroke-width="1"/>`;
   return s+`<text x="${L}" y="${y+18}" font-family="IBM Plex Mono, monospace" font-size="12"
       fill="var(--ink)">+$39M total &nbsp;·&nbsp; target was $30M</text>
     <text x="${L}" y="${y+36}" font-family="Public Sans, sans-serif" font-size="11" fill="var(--ink-3)">
       Two lines out of five produce $36M of it.</text>`; }
};
const FIGCAPS = {
 price:"The per diem is a hard ceiling; the only real rival sits 20 miles away.",
 volume:"Three streams. The rotations nobody thinks of are the biggest block.",
 capacity:"Annual capacity is ample. The constraint is a four-month window.",
 costs:"A year of trading, with the build cost deliberately left out.",
 payback:"Six full years of profit and a bit — against a five-year limit.",
 attrition:"No numbers anywhere in this case. The contrast between the two groups is the evidence.",
 chain:"Three stages, each with its own cost failures — the structure is the deliverable.",
 mine:"An internal transfer priced below market is borrowing from another part of the business.",
 util:"Spare capacity in a utility is deliberate, because demand peaks.",
 curve:"Adoption falls faster than price rises after $600, so revenue turns over.",
 mix:"Two columns that mean different things: a price move, and a revenue weight.",
 contrib:"Weighted in dollars, the answer is obvious — and it is not where the big percentage is."
};
const KIND = {clarify:"Clarify", unlock:"Unlock", test:"Test"};
const CONCEPT = {
"Price ceiling":{
  plain:"A price ceiling is the highest price you can charge, set by someone other than you. It is usually set by whoever is paying, such as an employer, an insurer or a government, rather than by your costs or your wishes.",
  why:"When a third party pays, its budget limits your price however good the product is. Because you cannot raise the price, a poor return has to be fixed another way: by selling more, earning from other sources, or cutting cost.",
  math:{"forms": [{"f": "p_max = A − m", "tree": {"s": "p_max", "d": "the most you can charge per night", "op": "−", "k": [{"s": "A", "d": "what the payer allows per night"}, {"s": "m", "d": "everything else that allowance must also pay for"}]}}], "read": ["The most you can charge is what the payer hands over, less whatever else that money must buy", ["Payer gives A", "Part of it goes on other things (m)", "What is left is the room rate"]], "work": [["Army Hotel", ["A = $75 a night", ["The Army's per diem"], "m = breakfast + dinner ≈ $15", ["Assumed: the case never prices the meals"], "p_max = $75 − $15 = $60", ["The casebook fixes $60 from here on"]]]], "watchSteps": {"mistake": "Treating the whole allowance as the room price.", "why": "The $75 per diem is not a room rate. It is a daily budget for the room and for meals, so the room can only take what is left after the meals.", "syms": {"A": "what the payer allows per night", "m": "everything else the allowance must also pay for", "p_max": "the most the room can charge per night"}, "steps": [{"say": "Start with the daily allowance the payer gives. Call it A.", "f": "A = $75 a night"}, {"say": "Find what else the allowance has to pay for. Here that is breakfast and dinner. The case does not price them, so we assume about $15. Call it m.", "f": "m ≈ $15 a night"}, {"say": "The most the room can charge is the allowance less those other costs. Call it p_max.", "f": "p_max = A − m = $75 − $15 = $60 a night"}, {"say": "Check what this does to revenue. At 120,000 room-nights, charging $60 gives $7.2M. Charging the full $75 would give $9.0M, so using the whole allowance as the price would overstate revenue by $1.8M.", "f": "120,000 × $75 − 120,000 × $60 = $9.0M − $7.2M = $1.8M"}], "rule": "Subtract everything else the allowance has to pay for before treating it as a price."}},
  here:"In the Army Hotel the Army reimburses a soldier $75 a night, and that amount has to cover breakfast and dinner as well as the room. Taking out about $15 for the two meals leaves about $60 for the room, and the casebook uses $60 as the price from then on. Nearby hotels charge as much as $110, which is above the whole $75 allowance.",
  big:"Every case with a price starts by asking who pays and how much they have to spend. Breast Cancer Surgery returns to this, but there the limit is the customers' own willingness to pay rather than a payer's budget.",
  without:"You would price at $75, or at the neighbours' $110. Revenue would then be too high before volume is even considered, and the soldiers would be paying part of each night from their own pockets.",
  formula:"ceiling = what the payer allows − what else it has to cover",
  met:"Army Hotel"},
"Breakeven":{
  plain:"Breakeven is the point where the money coming in equals the money going out. It can be stated as a number of units sold, a price, a market share, or the number of years it takes to earn back an investment.",
  why:"It turns a forecast into a pass-or-fail test. 'We will make $70,000' leaves room for argument. 'We break even at a 10% share and expect 12.5%' gives a threshold you can check the forecast against.",
  math:{"forms": [{"label": "In units", "f": "Q* = {F|p − v}", "tree": {"s": "Q*", "d": "units you must sell to break even", "op": "÷", "k": [{"s": "F", "d": "fixed cost to cover"}, {"s": "p − v", "d": "what each sale leaves over", "op": "−", "k": [{"s": "p", "d": "price per unit"}, {"s": "v", "d": "variable cost per unit"}]}]}}, {"label": "In years", "f": "T = {I|π}", "tree": {"s": "T", "d": "years to get the outlay back", "op": "÷", "k": [{"s": "I", "d": "the one-off investment"}, {"s": "π", "d": "operating profit per year"}]}}], "read": ["In units: how many sales it takes to pay off the fixed cost", ["Each sale leaves p − v after its own cost", "Divide the fixed cost by that leftover"], "In years: how long the profit takes to repay a one-off outlay", ["Same idea, with years in place of units"]], "work": [["Army Hotel uses the years form", ["I = $20M to build", "π = $3.2M a year", "T = {$20M|$3.2M} = 6.25 years", ["The client wants 4–5 years, so it misses by about 1¼ years"]]]], "watchSteps": {"mistake": "Judging the investment by the size of the yearly profit instead of the years it takes to earn the money back.", "why": "A profit figure means little until it is compared with what was put in. The client's test is about time, so the profit has to be turned into years.", "syms": {"I": "the one-off investment", "π": "operating profit per year", "T": "years to earn the outlay back"}, "steps": [{"say": "State the outlay. Building the hotel costs $20M, paid once. Call it I.", "f": "I = $20M"}, {"say": "State the yearly profit: $7.2M of revenue less $4.0M of costs. Call it π.", "f": "π = $7.2M − $4.0M = $3.2M a year"}, {"say": "Divide the outlay by the yearly profit. The result is the number of years the profit takes to repay the outlay. Call it T.", "f": "T = {I|π} = {$20M|$3.2M} = 6.25 years"}, {"say": "Compare with the client's requirement of 4 to 5 years. 6.25 is above both ends of that range.", "f": "6.25 − 5 = 1.25 years over;  6.25 − 4 = 2.25 years over"}], "rule": "Match the units. A one-off outlay divided by a yearly profit gives years. A fixed cost divided by the profit per unit gives units."}},
  here:"The client is a financial buyer that wants its money back in 4 to 5 years. The hotel earns $3.2M a year, which sounds healthy, but dividing the $20M build cost by $3.2M gives 6.25 years. That division, not the size of the profit, decides the recommendation.",
  big:"Breakeven is used wherever a decision needs a threshold: units, price, share or years. Later cases use it as a breakeven share, and Cleaning Products asks for the price change that just covers a target.",
  without:"You would stop at '$3.2M a year', which looks healthy, and recommend a build the client would reject.",
  formula:"breakeven volume = fixed cost ÷ contribution per unit",
  met:"Army Hotel"},
"Capacity":{
  plain:"Capacity is the most a business can supply in a period, for example the number of rooms a hotel has to sell each night. It is set by what the business has built or staffed, not by how many customers want to buy.",
  why:"Revenue only counts what you can deliver. If more people want a room than the hotel has, the extra demand does not become sales, so a forecast that ignores capacity overstates revenue.",
  math:{"forms": [{"f": "S = min(D, K)", "tree": {"s": "S", "d": "what you can actually sell", "op": "smaller of", "k": [{"s": "D", "d": "what customers want"}, {"s": "K", "d": "the most you can serve"}]}}], "read": ["Sales are the smaller of two numbers: what customers want, and what you can serve", ["Demand above capacity is lost; it cannot be saved for a quieter night"]], "work": [["Army Hotel", ["Demand for the year (D): 129,000 room-nights", "Capacity for the year (K): 400 rooms × 365 nights = 146,000 room-nights, more than demand", ["So on a yearly basis nothing looks lost. That is the trap described under Watch out"], "In the peak: 80 rooms short × 120 nights = 9,600 room-nights that cannot be served", "Sales: 129,000 − 9,600 = 119,400, about 120,000 room-nights", "Revenue: 120,000 × $60 = $7.2M"]]], "watchSteps": {"mistake": "Checking capacity against the yearly average instead of the busiest period.", "why": "A yearly check divides total demand by the number of nights and compares the answer with the number of rooms. That ignores when the demand arrives. Here demand is bunched into a four-month peak, and a room that goes unsold in a quiet month cannot be saved for a busy one, so the average hides the shortage.", "syms": {"D": "room-nights wanted in the year", "K": "rooms the hotel has: 400", "g": "rooms wanted above K on a peak night", "d": "nights in the peak: about 4 months × 30"}, "steps": [{"say": "Start with the demand for the whole year. The Army's soldiers want 129,000 room-nights in total. Call this D.", "f": "D = 129,000 room-nights"}, {"say": "Spread it evenly over 365 nights to get the average number of rooms wanted each night.", "f": "{D|365} = {129,000|365} ≈ 353 rooms a night"}, {"say": "The hotel has 400 rooms (call this K). 353 is below 400, so on average about 47 rooms are spare. A yearly check stops here and concludes there is no capacity problem.", "f": "353 < K = 400"}, {"say": "But demand is not even. For about four months, roughly 120 nights (call this d), the Army needs 80 rooms more than the hotel has (call this g). On those nights the rooms wanted are:", "f": "K + g = 400 + 80 = 480 rooms a night"}, {"say": "The hotel can serve 400 of the 480, so the demand of 80 rooms is turned away on every peak night. Over the whole peak that is:", "f": "g × d = 80 × 120 = 9,600 room-nights lost"}, {"say": "Spare rooms in the quiet months cannot make this up, because an unsold room-night cannot be stored. In the other 245 nights the Army wants only about 291 rooms a night, so about 109 rooms sit empty each night, and none of that helps the peak.", "f": "{129,000 − (480 × 120)|245} = {71,400|245} ≈ 291 rooms a night"}, {"say": "Turn the lost room-nights into money at the $60 room rate.", "f": "9,600 × $60 = $576K"}, {"say": "Subtract that from the revenue you would earn if every soldier got a room. This is how revenue falls to about $7.2M. The casebook's first figure of $7.8M rounds the full-demand number up.", "f": "129,000 × $60 − $576K = $7.74M − $0.58M ≈ $7.2M"}], "rule": "Test capacity against the busiest period, not the yearly average. If peak demand is above capacity, the shortage is real even when the average looks comfortable."}},
  here:"In the Army Hotel case the Army wants about 129,000 room-nights a year and the hotel has 400 rooms. Over a whole year the rooms are enough. But in the four busiest months the Army wants about 80 rooms more than the hotel has, so some demand cannot be served. Allowing for that lowers revenue from about $7.7M to $7.2M. The casebook's first figure of $7.8M is the version that ignores it.",
  big:"Any volume estimate has two limits: how much customers want, and how much you can supply. What you sell is the smaller of the two. Electric Utility returns to this from the other side: a power plant must be built for the busiest hour of the year, so for most of the year it runs well below its capacity.",
  without:"If you leave capacity out, you count sales the hotel could never make. Here that means revenue of about $7.7M instead of $7.2M, and everything calculated from revenue, including profit and payback, is overstated as well.",
  formula:"sellable volume = min(demand, capacity)",
  met:"Army Hotel"},
"Non-occupancy revenue":{
  plain:"Non-occupancy revenue is money a hotel earns from guests that is not the room rate: a restaurant or bar, conference rooms, parking, vending and laundry. The room rate is called occupancy revenue because it is paid for occupying a room.",
  eg:"In general: a hotel's restaurant, bar, spa, parking and conference rooms; an airline's baggage fees; a cinema's popcorn; a stadium's food stalls. In the Army Hotel: a restaurant for soldiers who are not yet on the base meal plan, rooms rented for army conferences, vending and laundry.",
  why:"Rooms are the main product, but a guest who is already at the hotel can be sold other things at little extra cost to win the sale. Those sales can leave a better margin than the room, so they can change whether an investment pays back in time.",
  math:{"forms": [{"f": "R_total = (p × Q) + N", "tree": {"s": "R_total", "d": "everything the business earns", "op": "+", "k": [{"s": "p × Q", "d": "room revenue", "op": "×", "k": [{"s": "p", "d": "room rate"}, {"s": "Q", "d": "room-nights sold"}]}, {"s": "N", "d": "non-occupancy revenue: restaurant, conferences, parking"}]}}, {"label": "Effect on payback", "f": "T = {I|π + n}", "tree": {"s": "T", "d": "years to get the outlay back", "op": "÷", "k": [{"s": "I", "d": "the one-off investment"}, {"s": "π + n", "d": "yearly profit including extras", "op": "+", "k": [{"s": "π", "d": "profit from rooms"}, {"s": "n", "d": "profit from N after what it costs to run"}]}]}}], "read": ["Total revenue is rooms plus everything else", ["Rooms: rate times room-nights", "Everything else: N"], "Only the profit left from N helps payback", ["That is n, not N", "A restaurant that earns $1M and costs $1M adds nothing"]], "work": [["Army Hotel (illustration only: the case gives no figure)", ["Suppose a restaurant and conference rooms net n = $0.8M a year", "T = {$20M|$3.2M + $0.8M} = 5.0 years", ["Reaches the client's 4–5 year hurdle instead of missing it at 6.25"]]]], "watchSteps": {"mistake": "Counting an add-on's revenue as if it were its profit.", "why": "Only the profit left after paying to run a restaurant or conference space shortens payback. Its revenue alone says nothing about that.", "syms": {"N": "non-occupancy revenue", "n": "profit from N after what it costs to run", "π": "profit from rooms", "I": "the one-off investment", "T": "years to earn the outlay back"}, "steps": [{"say": "Start with payback from rooms alone, as in the Breakeven concept.", "f": "T = {I|π} = {$20M|$3.2M} = 6.25 years"}, {"say": "Now suppose, for illustration only, that a restaurant and conference rooms bring in N = $2.0M a year and cost $1.2M a year to run. The case gives no such figures. The profit from them is n.", "f": "n = $2.0M − $1.2M = $0.8M a year"}, {"say": "Add only n to the yearly profit, not N.", "f": "π + n = $3.2M + $0.8M = $4.0M a year"}, {"say": "Recompute payback. It now reaches the top of the client's 4 to 5 year range.", "f": "T = {I|π + n} = {$20M|$4.0M} = 5.0 years"}, {"say": "If you had wrongly added the full $2.0M, payback would look better than it is, by about 1.2 years.", "f": "{$20M|$3.2M + $2.0M} = {$20M|$5.2M} ≈ 3.8 years"}], "rule": "Add the profit from an add-on, not its revenue. Ask what it costs to run before counting it."}},
  here:"In the Army Hotel the room rate is capped, and the rooms alone give a 6.25-year payback against the client's 4 to 5. With price capped, non-occupancy revenue is one of the few levers left to shorten payback. The casebook lists it in its framework and names a restaurant and Army conferences as fixes, but gives no figures for it.",
  big:"Any business that sells a main product plus add-ons has this lever. When the price of the main product is fixed, the add-ons are where room to improve usually sits.",
  without:"With price capped and volume limited, the hotel looks like a dead end, and you could say no without testing the one lever that might change the answer.",
  met:"Army Hotel"},
"Structure without data":{
  plain:"Building a usable framework when the case gives you almost no numbers at all.",
  why:"Some cases hand you three facts and a question. The structure is then the entire answer, and buckets that state conclusions cannot be tested.",
  watch:"Write each bucket as something you could go and measure. 'Work conditions are similar' is an assumption; 'do juniors and seniors cover the same territories' is a test.",
  met:"Heavy Attrition"},
"Opportunity cost":{
  plain:"What you give up by choosing one option — the value of the next best thing you didn't do.",
  why:"It is the most commonly missed cost in a case, because nothing appears on an invoice for it. Using something you own is not free if you could have sold it.",
  math:{"forms": [{"f": "EP = π − (I × r)", "tree": {"s": "EP", "d": "economic profit", "op": "−", "k": [{"s": "π", "d": "accounting profit: revenue less costs actually paid"}, {"s": "I × r", "d": "return forgone elsewhere", "op": "×", "k": [{"s": "I", "d": "money tied up in this project"}, {"s": "r", "d": "what that money would earn in its best alternative"}]}]}}, {"label": "Where r comes from here", "f": "r = {1|T}", "tree": {"s": "r", "d": "the yearly return the client expects", "op": "÷", "k": [{"s": "1", "d": "the whole investment"}, {"s": "T", "d": "the payback years the client demands"}]}}], "read": ["A project only creates value if it beats the next best use of the same money", ["Beating zero is not enough"]], "work": [["Army Hotel (our framing: the casebook lists this and never computes it)", ["T = 5 years at the top of the client's range", "r = {1|5} = 20% a year", "I × r = $20M × 20% = $4M a year forgone", "EP = $3.2M − $4M = −$0.8M a year", ["The hotel makes money and still loses to the alternative"]]]], "watch": [["Check the units and any footnote first", ["'$000s' is the difference between ten students and ten thousand"]]]},
  here:"In the Army Hotel the land is free, so it is tempting to say the hotel costs only the building. The cost that matters is the $20M itself: tied up here, it cannot earn what the firm's other deals would pay.",
  big:"This is the idea behind every 'should we do this' question: compare against the best alternative, not against doing nothing. Electric Utility returns to it when the company's own coal turns out to cost what it could have been sold for.",
  without:"Any project that makes a profit looks worth doing, so you would approve deals that make less than the client could have earned by simply doing something else.",
  formula:"true cost of using it = what someone else would have paid for it",
  met:"Breast Cancer Surgery"},
"Value chain":{
  plain:"The sequence of steps a business runs through to turn inputs into something a customer buys.",
  why:"When you know the problem is cost but not where, walking the chain gives you three or four places to stand instead of one undifferentiated list.",
  formula:"acquire → make → move → sell",
  watch:"Stop at every stage and ask what could be going wrong there, rather than brainstorming costs in general.",
  met:"Electric Utility"},
"Utilisation":{
  plain:"How much of your capacity you are actually using, as a percentage.",
  why:"High utilisation looks efficient and isn't always. Some businesses must hold spare capacity to meet peaks — for them the gap is the product, not waste.",
  formula:"utilisation = output ÷ capacity",
  watch:"Always compare to the industry, and ask what the extra points would be worth before chasing them.",
  met:"Electric Utility"},
"Reading an exhibit":{
  plain:"Getting the numbers you need off a chart or table someone hands you, and turning them into the comparison the question asked for.",
  why:"An exhibit usually gives you a relationship, not an answer. The step beyond what is drawn is where the marks are.",
  watch:"Check the units and any footnote first. '$000s' is the difference between ten students and ten thousand.",
  met:"Breast Cancer Surgery"},
"Revenue maximisation":{
  plain:"Finding the price that earns the most money in total — not the highest price, and not the most customers.",
  why:"Think of selling tickets to a concert. At $1 the hall is full and you collect almost nothing. At $1,000 a single fan turns up and you collect $1,000. Every price change does two things at once: it changes what each buyer pays and it changes how many buyers there are, and the two pull in opposite directions. Raise the price and each buyer pays more but fewer come; lower it and more come but each pays less. Your total takings are biggest somewhere between the extremes, and you find that price by testing. Plotted against price, the total rises, peaks and falls, which is why people draw it as a hill. The hill is only the picture; the tug-of-war between price and buyers is the reason.",
  math:{"forms": [{"f": "R(p) = p × Q(p)", "tree": {"s": "R(p)", "d": "total revenue at price p", "op": "×", "k": [{"s": "p", "d": "the price"}, {"s": "Q(p)", "d": "how many buy at that price; falls as p rises"}]}}, {"label": "The goal", "f": "p* = the p with the largest R(p)", "tree": {"s": "p*", "d": "the revenue-maximising price", "op": "compare", "k": [{"s": "R(p) at each price", "d": "work it out for every price you can test"}]}}], "read": ["Revenue is price times the number who buy at that price", ["The two factors pull in opposite directions", "So you work R out at each candidate price"], "Pick the price with the biggest result", ["Not the highest price, not the fullest hall"]], "work": [["Breast Cancer Surgery gives the full table", ["$300 × 75,000 = $22.5M", "$600 × 50,000 = $30M", ["The peak"], "$1,000 × 10,000 = $10M"]], ["Army Hotel gives one point only", ["$60 × 120,000 = $7.2M", "The Army fixes the price, so there is nothing to maximise"]]], "watch": [["Revenue-maximising is not profit-maximising", ["Say so, especially when the case never gives costs"]]]},
  here:"Not used in the Army Hotel, and that is the point: the per diem fixes the price, so the case has no price to optimise. It first matters in Breast Cancer Surgery, where the hospitals' willingness to pay does the choosing.",
  big:"Whenever you control a price, you are choosing a point on a trade-off between what each customer pays and how many there are. Knowing the shape stops you defaulting to 'highest price' or 'most customers'.",
  without:"You would pick a price by instinct, usually the highest or the one that fills the hall, and could leave a large share of the money on the table.",
  formula:"revenue = price × (market × adoption at that price)",
  met:"Breast Cancer Surgery"},
"Weighted mix":{
  plain:"Combining changes across several products by weighting each one by how much money it actually represents.",
  why:"Percentages on different bases cannot be added. A 4% rise on a small line is worth less than a 2% rise on a big one.",
  formula:"total change = Σ (line's share × total × its % change)",
  watch:"Work in dollars per line. Find where the money already is before you look at which percentage is biggest.",
  met:"Cleaning Products"},
"Cost per good unit":{
  plain:"Cost divided by what actually survives the process, rather than by what went into it.",
  why:"Two options can spend identical cash and still differ, because one of them destroys more of the product on the way. The denominator is the decision.",
  formula:"cost per good unit = total cost ÷ (units started × yield)",
  watch:"Whenever there is waste, scrap, damage or spoilage, change the denominator before comparing.",
  met:"White Boards"},
"NPV":{
  plain:"What a future stream of money is worth today, once you account for the fact that money later is worth less than money now.",
  why:"It lets you compare things that pay out at different times, and it is how any investor actually decides.",
  formula:"perpetuity = annual cash ÷ rate · rule of 72: years to double = 72 ÷ rate",
  watch:"A perpetuity minus its tail is far faster than discounting year by year, and it is the only version you can do in your head.",
  met:"Lola Lo's Zoo"},
"Solving for the price":{
  plain:"Setting the answer to zero and working backwards to find the most you could pay.",
  why:"Most cases compute a value from known inputs. When the price is the unknown, you invert the same equation — and the answer is a ceiling, not an offer.",
  formula:"max price = present value of the cash flows − other upfront costs",
  watch:"At exactly that price the deal earns precisely its hurdle and no more. Never open there.",
  met:"Lola Lo's Zoo"},
"Comparing across time":{
  plain:"Bringing two options that pay out in different years to the same point in time before choosing.",
  why:"An option with a better annual profit can still be the worse investment if its money arrives years later.",
  formula:"at 12%, money roughly doubles every 6 years (72 ÷ 12)",
  watch:"Pick a convenient common year rather than always discounting to today. It is faster and you make fewer mistakes.",
  met:"Wine & Co"},
"Market sizing from physical capacity":{
  plain:"Estimating how many customers there are by counting the physical things that limit them — gates, seats, hours, rooms, staff.",
  why:"It is far more reliable than starting from a population, because every input is something you could go and count.",
  formula:"units × cycles × fill rate × conversion",
  watch:"Say the unit at every step — planes, seats, people, people who eat. The slip always happens between two of them.",
  met:"Burger Palace"},
"Breakeven share":{
  plain:"The slice of a market you would need just to cover your costs.",
  why:"It turns an assumed market share — usually the softest number in a case — into a test you can stress.",
  formula:"share needed = fixed cost ÷ (whole market × contribution margin)",
  watch:"Divide by the market's contribution, not its revenue.",
  met:"Burger Palace"},
"Two exhibits at once":{
  plain:"Reasoning across two pieces of evidence that only mean something together.",
  why:"A share table alone supports no conclusion; a map alone gives you no numbers. The rule appears only when you read one against the other.",
  watch:"Name the rule you inferred and how well it fits. A rule that matches two of ten rows is a working assumption, not a finding.",
  met:"Chic Cosmetology"},
"Required vs achievable":{
  plain:"Putting the volume the economics demand next to the volume the market can actually supply.",
  why:"Every entry or launch decision reduces to these two numbers and the gap between them.",
  formula:"required = fixed cost ÷ contribution · achievable = pool × realistic share",
  watch:"Finish by naming what would close the gap — a cheaper site, a different city — or the answer is just a no.",
  met:"Chic Cosmetology"}
};
const FWG = {NW:170, NH:42, HG:30, VG:40, RW:238, PAD:8};
const FWGLOSS = {"profit":{"root":{"p":"What's left over after you pay for everything. Money in, minus money out.","ex":"A stall that takes $500 and spends $380 has $120 of profit."},"rev":{"p":"All the money coming in, before a single cost is taken off. Often called the 'top line', because it sits at the top of the page."},"price":{"p":"What you charge for one of the thing."},"vol":{"p":"How many you sell. Rooms, tickets, sandwiches — whatever the unit is."},"cost":{"p":"Everything you pay out to keep the business running."},"fx":{"p":"Costs that don't move with how busy you are. You pay them even if you sell nothing.","ex":"Rent, salaries, the building itself."},"vc":{"p":"Costs that rise and fall with how much you sell.","ex":"Ingredients, materials, packaging — one more sandwich, one more lot of bread."}},"entry":{"root":{"p":"The question behind every 'should we open in X'. Four things to check, and usually one of them decides it."},"mkt":{"p":"How many possible customers there are, and whether that number is growing."},"comp":{"p":"Who is already serving those customers, and how much of them you could realistically take from them."},"econ":{"p":"Whether the money works: what you'd earn from each customer against what it costs to serve them."},"cap":{"p":"Whether this company can actually do the thing — the skills, the staff, the systems. Often assumed and never checked."}},"invest":{"root":{"p":"You put money in now and get money back later. This asks whether the later money is worth the wait."},"cin":{"p":"The money the thing earns each year once it's running, and for how many years."},"cout":{"p":"What you have to spend up front, before anything comes back."},"time":{"p":"How long the money keeps arriving, and how much less a dollar in ten years is worth than a dollar today.","ex":"Most people would rather have $100 now than $100 in a decade. That preference is what a discount rate puts a number on."},"hurdle":{"p":"The bar the investment has to clear before anyone says yes.","ex":"Often 'we want our money back within five years'."},"exit":{"p":"How the investor eventually gets their money out — selling the business on, or the thing simply coming to an end."}},"attrition":{"root":{"p":"Staff turnover: people quitting faster than the company would like."},"who":{"p":"Which people specifically — new joiners or veterans, one team or all of them. The pattern is almost always the clue."},"push":{"p":"Reasons to leave this job: pay, hours, a bad manager, no way up."},"pull":{"p":"Reasons to go somewhere else: a rival is hiring, and paying more."},"costl":{"p":"What it costs the company every time someone goes — hiring a replacement, plus the months before they're any good at it."}},"twogroup":{"root":{"p":"Two similar groups behave differently. The difference between them is the answer."},"hold":{"p":"Everything both groups have in common. None of it can explain the difference, so you can strike it all out at once."},"vary":{"p":"What genuinely differs between the two. The answer is somewhere in here."},"test":{"p":"Which of those differences could actually produce the outcome — and what you'd measure to find out."}},"comp":{"root":{"p":"How people are paid, and whether it makes them do the right things."},"cmix":{"p":"How much of the pay is guaranteed salary, and how much depends on results."},"basis":{"p":"What the results part is actually paid on — units sold, revenue, profit."},"align":{"p":"Whether working hard is rewarded.","ex":"If two products pay the same commission but one takes twice as long to sell, people quietly stop selling the slow one."},"fair":{"p":"Whether people in different places or roles get a fair shot at earning the same."}},"profitability":{"root":{"p":"Profit is falling and you need to find out where it went. There are only three places it can come from."},"prev":{"p":"All the money coming in, before costs."},"pprice":{"p":"What you charge for one of the thing."},"pvol":{"p":"How many you sell. If price is holding steady, this is the other place a falling top line can be coming from."},"pcost":{"p":"Everything you pay out to keep running."},"pfx":{"p":"Costs that don't move with how busy you are — rent, salaries, buildings."},"pvc":{"p":"Costs that rise and fall with how much you sell."},"pext":{"p":"Things outside the company entirely: the market shrinking, a new rival arriving, a change in the law."}},"chain":{"root":{"p":"Follow the product from raw material to customer, and ask what could be going wrong at each stop. It gives you three or four places to stand instead of one vague list."},"inp":{"p":"What the company buys in — materials, fuel, parts."},"opsn":{"p":"Turning those inputs into the thing being sold."},"dist":{"p":"Getting the finished thing to the customer."}},"makebuy":{"root":{"p":"The company does something itself and wonders whether to pay an outside firm to do it instead."},"cmake":{"p":"What it truly costs to do it yourself — including things you already own and might forget to count."},"cbuy":{"p":"What an outside supplier would charge."},"qual":{"p":"Whether the result is as good either way. Cheaper isn't cheaper if more of it arrives broken."},"strat":{"p":"The reasons that aren't about money: control, reliability, and whether this is the thing the company is known for."}},"pricing":{"root":{"p":"Three different ways to arrive at a price. They usually disagree, and saying which ones the facts have closed is a better answer than listing all three."},"cplus":{"p":"Work out what it costs you, add a bit on top. Simple, and completely ignores what the buyer thinks it's worth."},"cpet":{"p":"Charge roughly what similar things charge."},"val":{"p":"Charge what it's worth to the buyer — what it saves them, or what they'd pay to avoid the problem. Usually the highest of the three."},"obj":{"p":"What you're trying to get the most of: total money, profit, or share of the market. Each one points at a different price."}},"sizing":{"root":{"p":"Estimating a number nobody has told you, by starting from something you do know and narrowing down step by step."},"pop":{"p":"The biggest group you could start from — everyone in the country, every hospital, every flight."},"filt":{"p":"The slice of that group that actually qualifies."},"freq":{"p":"How often each one does the thing — once ever, weekly, daily."},"unitn":{"p":"How many of the product each occasion uses.","ex":"One bandage per operation. Two if they change it."}},"mix":{"root":{"p":"Several prices move by different amounts. This works out what happens to the money overall."},"line":{"p":"What one product line adds or loses, in actual money rather than percent."},"chg":{"p":"How much that line's price moved, as a percentage."},"wt":{"p":"How big that line is as a share of total sales. A big rise on a tiny line barely shows up."},"tot":{"p":"Total sales across every line — the base the percentages get applied to."},"summ":{"p":"Add up the money, never the percentages.","ex":"4% of a small line and 2% of a huge one can't be averaged; you have to turn each into dollars first."}},"cpgu":{"root":{"p":"What each usable item really costs, once you allow for the ones damaged or thrown away along the way."},"tc":{"p":"Everything spent — including on the items that didn't survive."},"good":{"p":"How many come out the other end fit to sell. This is the number you divide by."},"started":{"p":"How many went in at the start."},"yld":{"p":"The share that survives the process.","ex":"An 85% yield means 15 of every 100 are lost."}},"perp":{"root":{"p":"What a long run of yearly payments is worth as one lump sum today."},"pp":{"p":"A shortcut: what the payments would be worth if they never stopped. The yearly amount divided by the interest rate.","ex":"$3M a year at 10% is worth $30M if it runs forever."},"ann":{"p":"The amount arriving each year."},"rate":{"p":"The yearly return the investor expects. The higher it is, the less future money counts for."},"tail":{"p":"The payments after the end date. They never actually happen, so you subtract their value back off."},"dbl":{"p":"A mental trick for doing this without a calculator: money doubles in roughly 72 ÷ the interest rate years.","ex":"At 10%, about every seven years."}},"opp":{"root":{"p":"The company owns something — land, a building, spare capacity — and wants to know the best thing to do with it."},"use":{"p":"Put it to work in what the company already does."},"adj":{"p":"Use it for something close to the main business but not quite the same."},"dont":{"p":"Sell it, rent it out, or leave it alone. Usually the option nobody bothers to put a number on."},"cmpn":{"p":"Put every option on the same measure, or you can't rank them."}},"timec":{"root":{"p":"Two options pay out at different times. You can't compare them until they're on the same footing."},"av":{"p":"What each option earns per year once it's actually running."},"sd":{"p":"When the money starts arriving. Later is worse, and often decisive."},"cp":{"p":"Pick one year and move both options to it. Choosing a convenient year is the whole skill — it's faster and you make fewer mistakes."},"cc":{"p":"Now compare. The option with the bigger yearly figure can still lose if it starts years later."}},"physcap":{"root":{"p":"Estimate demand by counting the physical things that limit it, instead of guessing down from a population. Every input is something you could go and count."},"unitc":{"p":"The thing that repeats — a gate, a table, a seat, a room."},"cyc":{"p":"How many times it turns over in a day or a year."},"fill":{"p":"How full it is each time.","ex":"Planes fly about 80% full, not 100%."},"conv":{"p":"What fraction of the people passing through actually become your customers."}},"beshare":{"root":{"p":"The gap between the share you're counting on and the share you actually need. Your margin for being wrong."},"assumed":{"p":"The slice of the market the forecast assumes you'll win. Usually the softest number in the whole case."},"req":{"p":"The slice you'd need just to cover your costs. Below this you lose money."},"bfix":{"p":"The costs that have to be covered whatever happens."},"mc":{"p":"If you won the entire market, the money left after the costs that rise with sales. This is what you divide by — not total sales."},"mkt2":{"p":"Total spending by everyone in the market, not just your share of it."},"marg":{"p":"The share of each dollar of sales left over after the costs that rise with sales."}},"be":{"root":{"p":"How many you must sell before you stop losing money."},"bfix2":{"p":"The costs that have to be covered whatever happens."},"treat":{"p":"Whether a one-off cost is charged all in year one or spread over several years. It changes the answer, so say which you're doing before you divide."},"bcon":{"p":"What one sale leaves behind after its own costs — the part that goes towards covering the fixed costs.","ex":"Sell a $15,000 course that costs $8,000 to deliver and $7,000 is left to put against the rent."},"bp":{"p":"What one sale brings in, before anything is taken off for delivering it."},"bv":{"p":"What that one sale costs you to deliver."}},"reqach":{"root":{"p":"The distance between what you need and what you can get. Every entry decision comes down to this one gap."},"rq":{"p":"How many you must sell for the numbers to work."},"ach":{"p":"How many you could realistically sell."},"lev":{"p":"What you could change to close the gap — a cheaper site, a different city, a higher price. Naming these is what turns a 'no' into advice."}}};
const FWADD = {"payb":{"p":"How long before the money you put in has come back to you. What you spent, divided by what comes back each year.","ex":"$20M spent and $3.2M returning a year is a bit over six years."},"risk":{"p":"What could go wrong with the supply you are relying on — weather, politics, a single source having a bad year. Not a cost you can add up, but it is a reason to keep doing something yourself."}};
const V2A = {
"BTH-01": [
 { ops:[],
   given:[["Client","PE firm"],["Asset","400-room hotel"],["Location","on an army base"],
          ["Land","free"],["Question asked","build it or not"]],
   ask:[["Who actually stays in this hotel?","Clarifying. One kind of guest means you can count the demand directly instead of estimating a whole market.","clarify"],
        ["What return does the firm need, and by when?","Clarifying. A financial buyer judges on how fast the cash comes back; without the hurdle the case has no answer.","clarify"]],
   missing:["The hurdle — never volunteered anywhere; you have to ask for it",
            "Whether the hotel can earn anything beyond rooms"],
   logic:[["Free land is not a free building","The construction cost still lands, and it turns out to be the number that decides the case"],
          ["A PE firm asks a different question","Not 'does this make money' but 'how quickly do I get my money back'"]],
   verdict:"Structure it as revenue, cost, and the client's own hurdle — and ask for the hurdle early.",
   src:[["Prompt","Our client is a PE firm that has the opportunity to invest in building a 400-room hotel on an army base. The idea was given to the PE firm by the army. The government has decided to give our client the land for free — our client can build the hotel and keep all of the profits. Our client has hired you to find out what they need to know to determine if they should build it or not."],
        ["Format","McKinsey, round 1, interviewer-driven — the interviewer holds the agenda and will ask each question in turn."]],
   ours:[["What's going on","Two facts shape everything: one kind of guest, and a financial buyer. The first makes demand countable; the second makes payback the test."]] },

 { ops:["mul","add","sub","div"],
   given:[["Revenue","room-nights × rate"],["Cost, annual","running the hotel"],
          ["Cost, one-off","building it"],["Decision rule","payback vs hurdle"]],
   ask:[["How many soldiers pass through the base, and for how long?","Unlocks the volume branch — the interviewer is holding three demand figures.","unlock",
         [["Basic training","200 soldiers · 10 weeks · 5× a year"],["Advanced training","50 soldiers · 4 weeks · 10× a year"],
          ["Rotations","9,000 soldiers · every 3 years · 15 nights"]]],
        ["What else is there to stay in nearby?","Unlocks the rate branch; competitors set what you can charge, or so it seems.","unlock",
         [["Hilton","$110"],["Hampton Inn","$75"],["Days Inn","$40, 20 miles away"]]]],
   missing:["Non-occupancy revenue — the casebook's own framework lists it and never quantifies it",
            "Opportunity cost — listed in the same framework, also never used"],
   logic:[["Revenue = room-nights × rate","Both unknown, so each needs its own question"],
          ["Cost splits in two","One repeats every year, one is paid once — they enter the decision differently"],
          ["The hurdle is not on the tree","The hurdle is the minimum bar the client sets (here, payback within 4–5 years). It belongs to the client, so only a question gets it"]],
   verdict:"Three branches — revenue, cost, hurdle. The badges on the canvas are the arithmetic that connects them.",
   src:[["The casebook's framework","SRCFW"]],
   ours:[["What's going on","The same tree every later case starts from. Drawn once and reused, it becomes something you recognise rather than recall."],
         ["Where the casebook slips","Its framework lists non-occupancy revenue and opportunity cost, but the case never gives a number for either, so neither gets used. Naming a branch you cannot measure is fine, as long as you say it is unmeasured."]] },

 { ops:[],
   given:[["Per diem","$75 / night"],["What it must cover","room + breakfast + dinner"]],
   ask:[["What does the per diem have to cover besides the room?","Unlocks the real ceiling: two meals come out of the same $75, so the room can't be priced at $75.","unlock"],
        ["How far away are the alternatives?","Tests whether the cheap competitor is a real rival: a 20-mile trip each way costs a soldier time and fuel.","test"]],
   missing:["What two meals actually cost — never given, so the ceiling can't be pinned exactly",
            "Whether soldiers may pay out of pocket at all"],
   logic:[["$110 and $75 are out","Both are at or above the per diem, so the soldier would be paying from their own pocket"],
          ["Only the Days Inn competes","At $40 it leaves room for meals — but it is 20 miles from the base"],
          ["The Army's budget is the limit on price","Other hotels' prices do not set it, and neither does what a soldier would happily pay: the Army reimburses $75 a night, meals included"]],
   verdict:"Price below $75 minus two meals. The casebook fixes $60 for the rest of the case.",
   src:[["Interviewer guidance","The candidate should consider how much breakfast and dinner will cost the soldier and ensure that those costs in addition to the nightly rate will not exceed the stipend. The candidate should recognize that the Days Inn ($40/night) is the only competitive option the soldier is likely to consider, and should discuss how the distance away (20 miles) might also impact this decision, as well as what amenities are included."],
        ["Data released","Three hotels near the base, each about 20 miles away: Hilton $110/night, Hampton Inn $75/night, Days Inn $40/night. The Army reimburses $75 per night, intended to cover breakfast and dinner as well."],
        ["Model answer","Assume for the rest of the case that the hotel charges $60/night."]],
   ours:[["What's going on","This is the case's real lesson and it generalises: when someone else is paying, the most you can charge is that payer's budget. It also means you cannot raise the price later to rescue the deal, which is exactly what ends up sinking it."]] },

 { ops:["mul"],
   given:[["Rate","$60 / night"]],
   ask:[["How many training classes run each year, and how long is each?","Unlocks two of the three demand streams.","unlock"],
        ["How often are soldiers rotated, and how long do they get to find housing?","Unlocks the third — and it turns out to be the largest.","unlock"]],
   missing:["Any seasonality in that demand — not mentioned here, and it bites two steps later"],
   calc:[["200 × 70 nights × 5","70,000","Basic: people × nights × times a year. 10 weeks is 70 nights."],
         ["50 × 28 nights × 10","14,000","Advanced: same shape, smaller numbers"],
         ["9,000 ÷ 3 × 15 nights","45,000","A third of the base rotates each year, 15 nights each"],
         ["70,000 + 14,000 + 45,000","129,000 room-nights","The casebook rounds to 130,000"],
         ["129,000 × $60","$7.8M a year","Volume × rate — the × badge on the canvas"]],
   verdict:"About $7.8M of demand a year — before anything constrains it.",
   src:[["Data released","Two training classes are held at the base: Basic Officer Training, 200 soldiers per class, 10 weeks, 5 times per year; Advanced Officer Training, 50 soldiers per class, 4 weeks, 10 times per year. Soldiers are transferred every 3 years and are given 15 days to find a permanent place to stay; there are 9,000 active duty soldiers subject to this rotation."],
        ["Model answer","Basic 70,000 rooms/year; Advanced 14,000; Temp. 45,000. Total rooms/yr = 129,000 (round to 130,000). Total revenue = $7.8 million at $60 per night."]],
   ours:[["What's going on","The rotations are the biggest block — 45,000 of 129,000 — and the one nobody thinks of. Trainees are visible; people quietly moving house are not."],
         ["Watch the unit","Room-nights, not soldiers. Mixing the two is the standard way to lose this step."]] },

 { ops:["mul"],
   given:[["Rooms","400"],["Peak shortage","80 rooms / night"],["Peak length","4 months"],
          ["Demand","130,000 room-nights"]],
   ask:[["Is the demand spread evenly across the year?","Tests the figure you just built — an annual total can hide a seasonal wall.","test"],
        ["How many rooms does the hotel actually have?","Unlocks capacity, which is the ceiling on volume.","unlock"]],
   missing:["The shape of the seasonal curve — only the peak shortfall is given"],
   calc:[["80 × 4 months × 30 days","9,600","Turned away at peak; the casebook rounds to 10,000"],
         ["130,000 − 10,000","120,000 sellable","Demand is not the same thing as sales"],
         ["120,000 × $60","$7.2M a year","Revenue after the constraint"],
         ["400 × 365","146,000","Annual capacity — ample. The constraint is a window, not a year."]],
   verdict:"$7.2M, not $7.8M. A shortage lasting four months still cuts the whole year.",
   src:[["Interviewer guidance","Are there any issues that may keep the hotel from attaining the calculated revenue? After the candidate identifies the capacity issue: during their busiest part of the year, which lasts four months, the hotel runs a capacity shortage of 80 rooms per night."],
        ["Model answer","80 rooms × 4 months × 30 days per month = 9,600 rooms per year (round to 10,000). So the new number of rooms is 120,000 × $60 per night = $7.2M/year in annual revenue."]],
   ours:[["What's going on","A capacity limit can hurt only in a short window and still cut the whole year's number. An annual average does not show it. An annual utilisation figure would have hidden it completely — which is exactly the mistake Electric Utility makes two cases later, from the other direction."]] },

 { ops:["add","sub"],
   given:[["Operating cost","$4M a year"],["Comparable build cost","$50,000 per room"],["Rooms","400"],
          ["Revenue","$7.2M a year"]],
   ask:[["What does it cost to run a hotel like this each year?","Unlocks the annual side of the cost branch.","unlock"],
        ["What did a comparable hotel cost to build, per room?","Unlocks the one-off side — and this is the number the recommendation turns on.","unlock"]],
   missing:["Any split of the $4M into fixed and variable — handed over as one lump",
            "Land cost, which is zero here and would not be anywhere else"],
   calc:[["$7.2M − $4M","$3.2M a year","Operating profit — the − badge on the canvas"],
         ["400 × $50,000","$20M once","Paid before any of that profit arrives"]],
   logic:[["Keep the two apart","The $4M sits inside the annual picture; the $20M sits outside it and is what that picture has to pay back"],
          ["Put the $20M in the wrong place and the case collapses","Treat it as an annual cost and the hotel looks catastrophic; ignore it and it looks free"]],
   verdict:"$3.2M a year against a $20M outlay.",
   src:[["Interviewer guidance","Tell them to assume total Op-ex of $4 million per year. Tell them that the Hampton Inn made an initial investment of $50,000 per room; the same costs can be assumed for our client's hotel."],
        ["Model answer","Candidate should calculate a total initial investment of $20 million to build a 400 room hotel. Operating profit is $7.2M (revenue) − $4M (operating cost) = $3.2M per year."]],
   ours:[["What's going on","The free land is a side issue. The building is the cost, and it is 6¼ years of profit."]] },

 { ops:["div"],
   given:[["Annual profit","$3.2M"],["Build cost","$20M"],["Client hurdle","4–5 years"]],
   ask:[["What payback period does the firm require?","Clarifying, and the answer is meaningless without it — $3.2M a year is neither good nor bad on its own.","clarify"],
        ["Is there any revenue the hotel could earn beyond rooms?","Tests the only lever left once price is capped and volume is constrained.","test"]],
   missing:["Any discounting — the case never applies a rate to these flows",
            "A sale value at the end, which is how a PE firm usually exits"],
   calc:[["$20M ÷ $3.2M","6.25 years","Payback — the ÷ badge on the canvas"],
         ["6.25 vs 4–5 years","misses by ~1.25 years","Measured against the client's own rule, not a general one"],
         ["$3.2M ÷ $20M","≈16% a year","The return the casebook asks about and never computes"]],
   logic:[["Price can't close the gap","The per diem caps it, so the usual lever is gone"],
          ["Only two levers remain","Earn more per room-night from something other than the room, or cost less to run"]],
   verdict:"It earns about 16% a year and still fails — because this buyer wants the cash back sooner.",
   src:[["Question","Assume the client wants to breakeven within 4-5 years, what is the breakeven point for the PE firm? Once calculated: is this a good rate of return? Why do you think this? Then: what can be done to decrease the breakeven period?"],
        ["Model answer","Breakeven time = fixed costs (investment) / operating margin: $20M / $3.2M = 6-7 years. Ideas to decrease it: add a restaurant to the hotel, host army conferences, find ways to decrease costs or increase occupancy."]],
   ours:[["Where the casebook slips","$20M ÷ $3.2M is 6.25 years, not '6–7'. The rounding is doing real work, because it widens the gap to the hurdle that drives the whole recommendation."],
         ["Where it slips again","It asks whether this is a good rate of return and never answers. About 16% a year is a perfectly respectable yield; it is rejected here only because of <i>this</i> client's timing requirement. Payback is not a return — treating them as the same is the case's confusion, not yours."]] },

 { ops:["div"],
   given:[["Profit","$3.2M / year"],["Payback","6.25 years"],["Hurdle","4–5 years"],
          ["Price","capped by the per diem"]],
   missing:["Non-room revenue, never sized","Other army bases, never compared"],
   logic:[["Lead with the decision","Then two or three reasons, then risks. Under a minute."],
          ["Name the limit that actually blocks you","The per diem is why price cannot fix this — that sentence is the backbone of the recommendation"],
          ["Leave a door open","What you would check before closing the file is part of the answer, not an apology for it"]],
   verdict:"Don't build it — 6.25 years against a 4–5 year requirement, and no way to raise price.",
   src:[["Recommendation","The PE firm should not invest in the army hotel: annual operating profits are $3.2M; this results in a breakeven period of 6-7 years, exceeding the firm's goal of 4-5 years; current army per diem does not allow for increases in the price of the hotel/night."],
        ["Risks","May lose opportunity for decreasing BE timeline by augmenting non-occupancy revenue (ex. restaurants and amenities) and by reducing costs; trainings may change and occupancy estimations may be inaccurate; opportunity cost for PE firm."],
        ["Next steps","Analyze the financial impact of non-occupancy revenue and explore areas of cost reduction; look for other army bases with lower costs and/or higher occupancy demands; look for other investments that have a breakeven time period of 4-5 years."]],
   ours:[["Carry forward","A third party's budget is a ceiling. A constraint can bite in a window and still cut the year. A one-off outlay stays outside the annual picture and is what that picture must pay back."]] }
]
};
const V2B = {
"BTH-19": [
 { ops:[],
   given:[["Client","medical devices company, 10 years old"],
          ["Problem","heavy attrition among junior salespeople"],
          ["Asked","where we should start"]],
   ask:[["Heavy compared with what — last year, or the rest of the industry?","Clarifying. 'Heavy' is a word, not a number; without a benchmark you are solving an undefined problem.","clarify"],
        ["Which salespeople, and how long do they stay?","Unlocks the only three facts this case ever supplies.","unlock"]],
   missing:["Any benchmark for 'heavy' — never supplied, in a case built on the word",
            "Any commission, margin, territory or distance figure — the case gives none, ever"],
   logic:[["One line, no data, nobody driving","A partner-style case: they want to see what you do with an empty room"],
          ["Start by defining the problem","Not by listing causes — the causes come after you know who is leaving"]],
   verdict:"Pin down what 'heavy' means, then ask who is leaving and who isn't.",
   src:[["Prompt","Our client has asked us to look into why there is such heavy attrition amongst the junior salespeople in the organization. Where do you think we should start?"],
        ["Format","Z.S. Associates, round 2, candidate-led. The interviewer will not drive, and the casebook calls it a partner-style case, doable without pen and paper."]],
   ours:[["What's going on","Every case so far handed you a number to work with. This one hands you a sentence, and the entire assessment is what structure you build on it."]] },

 { ops:[],
   ask:[["How long does a new hire actually stay?","Unlocks the first fact, and it is the one that sizes the problem.","unlock",
         [["New hire tenure","under 1 year"]]],
        ["How long before a new hire is productive?","Unlocks the cost of the problem — tenure only matters against ramp time.","unlock",
         [["Time to productivity","about 6 months"]]],
        ["What happens to people who make it past three years?","Tests whether this is company-wide. It isn't, and that contrast is the case.","test",
         [["Tenure over 3 years","almost no attrition"]]]],
   missing:["Any number behind 'almost no attrition' among seniors",
            "What juniors are paid, and what for"],
   calc:[["~12 months tenure − 6 months ramp","~6 productive months","Each hire is barely profitable before leaving"]],
   logic:[["Anything true of both groups is ruled out","Pay scale, the product, the industry, the offices — seniors face all of it and stay"],
          ["What's left must differ between them","What they sell, where they sell it, and what they're paid for it"]],
   verdict:"Same firm, two outcomes — so look for the difference between the groups, not a company-wide cause.",
   src:[["Data released","The average time a newly hired salesperson stays in the organization is less than one year. This is worrisome because it takes about 6 months for a new salesperson to learn how to do their job well and get up to speed. On the other hand, experienced salespersons (people who have been with the organization greater than 3 years) have almost no attrition. The organization is a fairly new medical devices company that has been operating for 10 years."]],
   ours:[["What's going on","This is the entire evidence base. Everything after this point in the casebook is generated by the candidate, not given by the client — which is unusual, and worth noticing as you go."]] },

 { ops:[],
   given:[["Pay shape","small fixed salary + commission"],
          ["Commission drivers","volume sold, product type, distance travelled"],
          ["Assumption given","nature of the work is similar for both groups"]],
   ask:[["Do juniors and seniors sell the same products?","Testing. Your hypothesis generates this one, which is what makes it score.","test"],
        ["Do they cover the same territories?","Testing — the geographic version of the same question.","test"]],
   missing:["Whether juniors are restricted from any product line — the obvious next question, never answered",
            "The commission schedule itself"],
   logic:[["Three buckets, each testable","What they sell · where they sell it · what they're paid for it"],
          ["Each is something you could measure","Which is what separates a structure from a guess"],
          ["Say the assumption out loud","You are assuming the work itself is similar — the casebook assumes it silently"]],
   verdict:"Carve it where the two groups differ, and make every bucket something you could go and measure.",
   src:[["The casebook's framework","Headline: 'Increase retention through an improved incentive scheme.' Buckets: attrition not caused by poor performance; work conditions similar across all employees; are there differences in incentive schemes? Sales people are typically paid a small fixed salary plus commission based on sales; commission is a function of volume sold (type of clients, type of product sold) and distance travelled."]],
   ours:[["Where the casebook slips","Its framework announces the answer in its own headline, and two of its three buckets are stated as conclusions — 'work conditions similar across all employees' — rather than as things to test. A real interviewer will not hand you the hypothesis."],
         ["What's going on","Structured properly, the same three buckets become questions instead of claims, and that is the only difference between a framework and a summary."]] },

 { ops:[],
   given:[["Example given","iPods at $100–300 vs iMacs at $2,000–3,000"],
          ["Effort","low per sale vs high per sale"],
          ["Commission","a percentage of price"]],
   ask:[["What's the price range across the product line?","Unlocks how much commission varies by what you sell.","unlock"],
        ["Is commission a flat rate, or does it vary by product?","Unlocks whether effort and reward line up at all.","unlock"]],
   missing:["The actual commission schedule — never given","Territory sizes and travel distances — also never given"],
   logic:[["Product decides earnings","When pay is a percentage of price, what you are allowed to sell caps what you can earn, however hard you work"],
          ["Territory does the same geographically","A thin or distant patch means more travel for the same number of sales"],
          ["Effort and reward can be misaligned","A high-effort product at the same rate pays worse per hour, and people notice"]],
   verdict:"Three headline buckets with detail underneath beats fifteen loose ideas.",
   src:[["Question","Assuming there are no significant differences between the tasks of junior and senior sales people, what do you believe would be the main factors determining incentives obtained?"],
        ["Model answer","Type of product sold: margins of each product, effort to sell, can junior sales people sell every product? Apple iPods priced in the $100-300 range practically sell themselves; iMacs, priced in the $2000-3000 range, require greater effort. Investigate whether incentives align with effort and whether juniors may sell higher margin products or only the lower-priced end. Also: territory, and distance travelled to clients."]],
   ours:[["What's going on","The iPod/iMac comparison is the case's one genuinely good idea, and it generalises far past sales: whenever pay is a percentage of price, access to the expensive product is the real compensation decision."]] },

 { ops:[],
   given:[["Hypothesis","incentive scheme — product mix first"],
          ["Evidence","three tenure facts"],
          ["Data to confirm it","none supplied"]],
   missing:["Commission by tenure and by product — the first thing you'd pull",
            "Territory and travel data — the second"],
   logic:[["Don't present a hypothesis as a finding","Say what you would measure to confirm it; that sentence is the difference between confident and overconfident"],
          ["Rank by expected impact","Product mix moves commission more than travel distance does — say why you ranked it, not just that you did"]],
   verdict:"Review the incentive scheme, starting with which products juniors are allowed to sell — and say plainly that it is a hypothesis.",
   src:[["Recommendation","The client should review the incentive scheme for junior employees, namely by: Analyzing the type of products sold by different sales levels, as this is likely to have the greatest impact on sales commission; Reviewing any adjustments required to even out sales effort among territories; Compensating for differences in average distances to clients"],
        ["Risks","Increases in attrition among senior employees; Other factors might be creating the attrition problem; Fairer incentives not enough to compete on the labor market"]],
   ours:[["Where the casebook slips","It says product type is 'likely to have the greatest impact' — but no commission, margin, territory or distance figure was ever given, so nothing in the case supports ranking it first."],
         ["Carry forward","When one group behaves differently from a similar group, look for what differs about the group. It is the cheapest diagnostic there is."]] }
],

"BTH-11": [
 { ops:[],
   given:[["Client","GPE, an electricity producer"],["Plants","10, coal-fired"],
          ["Coal","partly own mines, partly third-party"],
          ["Transmission","highly regulated, wires government controlled"],
          ["Usage","deregulated — price set by competition"]],
   ask:[["Does GPE sell wholesale or direct to consumers?","Clarifying — it decides who the customer is before you size anything.","clarify"],
        ["Is price something GPE sets?","Clarifying, and the answer closes an entire branch of the tree.","clarify"]],
   missing:["Any profit, cost or margin figure — this case never supplies one, anywhere"],
   logic:[["Three sentences of briefing shape the answer","Price is market-set, so it is not a lever"],
          ["Unfamiliar vocabulary is not difficulty","Read the mechanics as constraints on the tree you already have"]],
   verdict:"Absorb the industry briefing as constraints, not as new material to learn.",
   src:[["Prompt","Our client is GPE, a producer of electricity. Here are a few concepts about electricity generation that will help you in this case: There are several ways to produce electricity: water, coal-fired plants, nuclear, wind, etc. Electricity can be supplied to a wholesaler or to consumers directly. Electricity transmission is highly regulated because the wires used to transport electricity are mostly government controlled. However, electricity usage is mostly deregulated (i.e. the government does not set the price, it is set by competitive forces). Our client has 10 plants that produce electricity using coal. The client obtains coal partly from its own coal mines and partly from 3rd-party providers. Of late, the client has seen the profitability of its coal generated electricity decline. What could be causing this?"]],
   ours:[["What's going on","The briefing is doing the work a framework usually does: it tells you which branches are already closed before you have drawn any."]] },

 { ops:["sub"],
   given:[["Plants","10, across the US"]],
   ask:[["Who sets the price?","Unlocks the revenue branch — and closes it.","unlock",
         [["Price","competitive, one price a year, same to all"]]],
        ["Is the market growing, and how fast?","Unlocks volume, which turns out not to explain anything.","unlock",
         [["Customers","over 1 million, fragmented market"],["Market growth","about 3% a year"]]],
        ["Where does the coal come from?","Unlocks the cost branch, which is where the case actually lives.","unlock"]],
   missing:["Any cost trend — the case's own answer is about costs rising, and it never shows one",
            "GPE's market share, so 'fragmented' stays qualitative"],
   logic:[["Revenue is largely closed","You can't move price, and share in a fragmented, slow-growing market won't explain a profit collapse"],
          ["So the decline must be on the cost side","By elimination — which is legitimate, as long as you say that's what it is"]],
   verdict:"The same tree, with one branch already closed. Go straight to cost.",
   src:[["Data released","This is a deregulated industry; price is set by competitive forces. There is one price set per the entire year. As a simplification, assume the same price is charged to all customers. GPE supplies electricity to over 1 M customers (a customer is a household or business) in deregulated markets through wholesalers. Volume is generated by demand. The market is fragmented. The market is growing at about 3% per annum. GPE runs 10 plants around the US. GPE pays a fixed cost to lease transmission lines to transmit the electricity produced. As a simplification, consider the main raw-material to be coal."],
        ["Model answer","Working hypothesis: Increasing costs are causing the decline in profitability since there are no real opportunities on the revenue side. Insight #1: Good candidates will deduce that since the market sets the price and this is a mature industry, currently the supply meets all the demands. There is not much opportunity in terms of volume and price. Insight #2: The candidate should consider looking deeper into the cost side, because it was already deduced that there aren't any opportunities in the revenue side."]],
   ours:[["Where the casebook slips","Its framework writes 'No competition' on the same page where the prompt says price is set by competitive forces in a fragmented market. Both cannot be true — read the released facts, not the framework's labels."]] },

 { ops:[],
   given:[["The chain","acquire coal → generate → transmit"],
          ["Own vs bought coal","different energy content"],["Wires","mostly government controlled"]],
   ask:[["How is the coal transported, and how far?","Unlocks the first stage.","unlock"],
        ["How old are the generators?","Unlocks the second.","unlock"],
        ["Do they own the transmission lines or rent them?","Unlocks the third.","unlock"]],
   missing:["Any split of cost across the three stages — you never learn which is biggest, which is what you'd need to prioritise"],
   logic:[["Walk the chain and stop at each stage","A cost brainstorm without structure reads as a list; three stops give you somewhere to stand"],
          ["Coal quality is the sharp one","Two sources of the same raw material aren't interchangeable if they burn differently — so cheap coal can cost more to use"],
          ["Some stages have external causes","Environmental rules, local labour markets, weather in the mining regions"]],
   verdict:"Three stages, three sets of issues — here the structure is the deliverable.",
   src:[["Question","A simplified supply chain for electricity consists of 3 parts: 1. Acquiring the coal 2. Generating the electricity 3. Transmitting the electricity. What potential issues may lie in each of the above?"],
        ["Model answer","1. Acquiring the coal: The coal may have to be transported across some distance. This could be done through rail or road. There are potential savings here in optimizing the transport channel. The coal is received from several sources: GPE's own coal mines and 3rd-party mines. The quality of coal (its energy content) is likely to be different in different mines. Hence, processing different types of coal probably takes different processes and machines. This diversity could be a potential cost generator and this could be handled by sourcing for more similar coal varieties. The coal mines could be in a geographically separate region, subjecting GPE's coal supply to other regions' risks (for e.g., climatic factors such as hurricanes, political turmoil, etc.) The coal mines are probably unionized, and that may add to volatility in our coal supply. 2. Generating the electricity: The electricity generators may be old and not functioning efficiently, inducing waste in the system. There are 10 different plants in the client's company. Differences in operations of these plants may induce volatility in the system. The availability of labor may have changed by the arrival of other industries or competitors nearby. Given that GPE generates electricity through coal, some new environmental laws may have come into force increasing the cost of electricity generation. 3. Transmitting the electricity: Transmission could be streamlined by finding more customers closer to the electricity plants themselves. GPE could look into a bandwidth sharing contract so that their lease may be cheaper. GPE can look into checking the transmission lines for repairs, etc. that may be required so that there is less electricity loss in transmission. Provider applying peak-hour surcharges to regulate customer usage"],
        ["Interviewer note","The casebook states plainly that this case 'is about brainstorming and generating ideas and not about numbers.'"]],
   ours:[["What's going on","Twelve ideas grouped into three stages beats twelve ideas in a list, and it is the same skill as a framework — just applied to causes instead of to the problem."]] },

 { ops:[],
   given:[],
   ask:[["Could they sell that same coal to someone else instead?","Testing, and it is the question that unlocks the whole idea.","test"],
        ["What would the market pay for it?","Unlocks the number that would make the point quantitative.","unlock",
         [["Own-mine coal","30% below third-party rate"],["Coal market","large, buyers are diverse"],
          ["Pricing rule","all coal customers pay the same market price"]]]],
   missing:["The market price of coal — never given, so the argument stays in words",
            "What share of GPE's coal comes from its own mines"],
   logic:[["The 30% is not a saving","Every tonne burned is a tonne not sold at the market price"],
          ["The real cost is the foregone sale","Which is identical whether you mine the coal or buy it"],
          ["Keep the mine anyway, for other reasons","Supply security, control of quality and labour, a diversified business"]],
   verdict:"Cheap from yourself is not cheap. Keep the mine for control, not for the discount.",
   src:[["Question","GPE is primarily an electricity generating company. Do you think they should keep the coal mine? What is the advantage of using their own mined coal for their electricity generation operation?"],
        ["Data released","GPE gets a 30% cheaper rate on coal from its own coal mines than compared to 3rd-party coal mines. There is a large market for coal. Coal customers are diverse, electricity producers are just one of many. As a simplification, assume that all coal customers pay the same market price for coal when they purchase coal from coal mines"],
        ["Interviewer prompt","Yes, GPE is getting coal cheaper from their coal mines. But they can also sell the same coal to other customers and make the same profit."]],
   ours:[["What's going on","This is the block's first idea that arrives without a formula. It generalises far beyond coal: any internal transfer priced below market is borrowing from another part of the business."],
         ["Where the casebook slips","It never nets the 30% against the foregone sale in numbers — it makes the point in words only, so the reasoning is the entire deliverable."]] },

 { ops:[],
   given:[["GPE utilisation","80%"],["CEO's target","90%"],["Industry average","77%"],
          ["Demand","cyclical"]],
   ask:[["What does demand look like across the year?","Testing — cyclicality is precisely what makes the target wrong.","test"],
        ["What's the industry average?","Unlocks the comparison the CEO skipped.","unlock"]],
   missing:["What ten points of utilisation would be worth in money — never quantified",
            "What it would cost to get there"],
   calc:[["80% vs 77%","+3 points","GPE is above the industry average, not close to it"],
         ["80% → 90%","+10 points","A gap the case never values in either direction"]],
   logic:[["Spare capacity is the product","A utility is committed to meeting peak demand, so running below 100% is normal, not waste"],
          ["Question the premise","The CEO's number is a target, not a finding"]],
   verdict:"Already above average; pushing to 90% trades reliability for a number nobody has priced.",
   src:[["Question","On average, GPE operates at 80% utilization. GPE's CEO saw this statistic and asked McKinsey if they should look into increasing this from 80% to 90%. Given that the industry average is to operate at 77% utilization, how would you approach this problem?"],
        ["Model answer","Tell the candidate that the \"demand for electricity is cyclical\". Ask the candidate, what might that imply? Candidates should point out that it means there are peaks and troughs in electricity demand (e.g. air conditioners working over time during summer). As an electricity company, GPE is committed to meet the peak demand and so, it is normal to operate at less than 100% utilization. GPE is already operating at close to the industry average and it may be unrealistic to expect the utilization to increase to 90%."]],
   ours:[["Where the casebook slips","80% is not 'close to' 77% — it is three points above it, which strengthens the argument the case is making. And it never asks what the extra ten points would be worth, which is the question that would settle it."],
         ["What's going on","This is Army Hotel's capacity idea from the other side: there a constraint destroyed revenue, here spare capacity is deliberate."]] },

 { ops:["sub"],
   given:[["Conclusion","the decline is on the cost side"],["Mine","keep it"],
          ["Utilisation","don't chase 90%"]],
   missing:["Any cost figure, trend or margin to support 'costs rose' — the case supplies none"],
   logic:[["Say the basis out loud","'Cost by elimination, and here is what I'd pull to confirm it' is stronger than asserting it"],
          ["Two decisions, three themes","Coal acquisition, generation efficiency, transmission — then the mine and the utilisation call"]],
   verdict:"Cost is where the decline must be — and name that it is by elimination, not by evidence.",
   src:[["Recommendation","The key reason for profitability decline is an increase in cost: Acquisition costs of coal are higher potentially because of transportation, 3rd party coal mines, unionized labor, etc. Cost of electricity generation is potentially high because of old equipment, operational inefficiencies, etc. High costs of electricity transmission. GPE should continue the use of its coal mine. It should also ignore the pressure to increase the utilization to 90%"],
        ["Risks","Client is unable to negotiate better contracts with 3rd party coal mines / labor unions and is unable to obtain sharing contracts reducing the cost of electricity transmission. Continued increases in costs along all parts of the value chain"]],
   ours:[["Where the casebook slips","The recommendation is the opening hypothesis restated. No cost figure, trend or margin was ever shown, so 'costs rose' is an inference presented as a finding."],
         ["Carry forward","Opportunity cost, and the value chain as a way to break a cost problem into pieces you can attack one at a time."]] }
],

"BTH-02": [
 { ops:[],
   given:[["Client","large medical device corporation"],
          ["Product","a device for breast conservation surgery"],
          ["Ask","a revenue-maximising price"],["Geography","United States only"]],
   ask:[["Revenue maximising, or profit maximising?","Clarifying. They said revenue — and they never give you costs, so this matters.","clarify"],
        ["US only, or worldwide?","Clarifying; the prompt answers it, but saying it back shows you heard the scope.","clarify"]],
   missing:["Any cost data at all — in a case the book labels 'profitability'"],
   logic:[["Answer the question asked","Flag the profit gap at the end rather than inventing costs to fill it"]],
   verdict:"Revenue maximisation, US only — narrow, and worth restating precisely.",
   src:[["Prompt","Our client is a large medical device corporation. They have developed a new medical device to assist surgeons in breast conservation surgeries (BCS). They’ve approached us to determine a revenue maximizing pricing strategy for the device. A breast conservation surgery is the partial removal of breast tissue found to be cancerous. This is in contrast to a mastectomy, which removes the entire breast. While hopefully this device will be adopted worldwide, at the moment, the client would like us to determine the pricing strategy for the product in the United States only."],
        ["Format","L.E.K., round 1, candidate-led — information comes only when you ask for it."]],
   ours:[["Where the casebook slips","The case is typed 'Profitability' and its own guidance tells the candidate to assess the device's profitability, but no cost figure appears anywhere and no profit is ever computed."]] },

 { ops:[],
   given:[["Regulatory","FDA approved"],["Efficacy","100% success rate"]],
   ask:[["How many of these surgeries happen a year?","Unlocks the ceiling on demand.","unlock",
         [["Surgeries per year","about 100,000"]]],
        ["Is the device reusable or disposable?","Unlocks the unit count — it changes the market by an order of magnitude.","unlock",
         [["Device","disposable — one per surgery"]]],
        ["Are there competitors?","Unlocks whether the ceiling is yours alone.","unlock",
         [["Competitors","none"]]]],
   missing:["Growth in surgery volumes — the framework names it, no data follows",
            "Whether insurers reimburse the device, which would cap what a hospital will pay"],
   calc:[["100,000 surgeries × 1 device each","100,000 units a year","Disposable means units equal surgeries"]],
   logic:[["Every fact removes a branch","Approved, works, no rivals — nothing reduces the ceiling except whether surgeons choose to buy"]],
   verdict:"Ceiling is 100,000 units. Adoption is the only variable left.",
   src:[["Data released","There are around 100,000 breast conservation surgeries per year. The device is applicable across a wide range of procedures: it can be used in every breast conservation surgery. The device is disposable, so every surgery needs a new device. The device is FDA approved. There are no concerns related to quality from R&D. The success rate of the device is 100%. Currently there are no competitors, and the device would be the only product of this kind available on the market."]],
   ours:[["What's going on","Market sizing in one line, because the facts do the work. Ask whether a device is disposable before sizing anything — it is the difference between 100,000 units a year and a few hundred."]] },

 { ops:["mul"],
   given:[["Market","100,000 surgeries"]],
   ask:[["Do we know what clinicians would pay?","Unlocks the exhibit — this is the question that produces it.","unlock",
         [["At $0","90% adopt"],["At $300","75% adopt"],["At $600","50% adopt"],["At $1,000","10% adopt"]]],
        ["Does adoption change with price, and by how much?","Tests the shape, which is the whole lesson.","test"]],
   missing:["Anything between the four tested points — the curve is four dots, not a line",
            "Whether adoption is per surgeon or per hospital system"],
   calc:[["100,000 × 75% × $300","$22.5M","Three-quarters adopt, at a low price"],
         ["100,000 × 50% × $600","$30.0M","The peak"],
         ["100,000 × 10% × $1,000","$10.0M","Price up, but adoption collapses"],
         ["100,000 × 90% × $0","$0","The degenerate row the case carries anyway"]],
   logic:[["Revenue rises, peaks, then falls","Past the peak, adoption falls faster than price rises, so a higher price earns less"],
          ["The chart gives adoption; you compute revenue","The comparison the question needs is one step beyond what is drawn"]],
   verdict:"$600 — $30M a year, more than any other point tested.",
   src:[["Question","The candidate should then inquire if we know anything about a clinician’s willingness to pay for the device. Show Exhibit 1."],
        ["Model answer","In order to understand the willingness to pay of clinicians, the candidate should calculate the revenue at each price point tested during the market research. The candidate should conclude that the device price that allows the client to achieve maximum potential revenues is $600. The candidate should also conclude that greater adoption across surgeries does not necessarily lead to greater revenues, since the benefit of higher adoption may be outweighed by a lower price point. A strong candidate will identify that the revenue maximizing price may not be optimal in terms of profits."]],
   ours:[["What's going on","It connects back: Army Hotel had a ceiling imposed from outside by a payer. Here the ceiling is the customers' own willingness, and you find it by computing rather than by being told."],
         ["Where the casebook slips","The price/adoption pairs exist in the text only inside the answer key — the exhibit the candidate is meant to read carries no readable values."]] },

 { ops:["mul"],
   given:[["Price","$600"],["Adoption","50%"],["Units","50,000"],["Revenue","$30M a year"]],
   missing:["Costs, so profit cannot be checked at all",
            "Whether marketing would move the adoption curve the price was optimised on"],
   logic:[["Say what you couldn't answer","Revenue-maximising is not profit-maximising, and 75,000 units at $300 might beat 50,000 at $600 on margin"],
          ["Note the competition that isn't here yet","A sole supplier with no rivals should expect that to change, and price for it"]],
   verdict:"Price at $600 — and flag that this maximises revenue, not profit.",
   src:[["Recommendation","The client should market the device at a price of $600 per unit. This price allows the client to maximize the revenue potential given the current willingness to adopt."],
        ["Risks","Competitors might replicate the device and enter the market; the revenue maximizing price might not be the profit maximizing one."]],
   ours:[["Where the casebook slips","Its own follow-up asks how you would market the device to reach 50% adoption — but successful marketing shifts the adoption curve, and $600 was only optimal on the old one."],
         ["Carry forward","Revenue rises, peaks, then falls as price climbs. And an exhibit carries a relationship you have to convert yourself."]] }
],

"BTH-05": [
 { ops:[],
   given:[["Client","household cleaning products manufacturer"],
          ["Stated goal","'do better in the market'"],
          ["Asked","what you would ask the client first"]],
   ask:[["What does 'do better' mean — growth, share, or profit?","Clarifying, and the case is literally asking you for questions, so this is the answer.","clarify"],
        ["How big is the business today?","Unlocks the base everything will be measured against.","unlock"]],
   missing:["The target — a 1% increase, withheld until three steps later",
            "Which of growth, share or profit the client actually means"],
   logic:[["The question is the answer here","'What will you ask the client' means the questions are being scored, not a framework"]],
   verdict:"Pin the objective before structuring anything.",
   src:[["Prompt","Our client is a prominent manufacturer of household cleaning products such as soap. They feel that an opportunity exists for them to do better in the market. What will be some of the first things that you will ask the client?"],
        ["Format","McKinsey, round 2, interviewer-led."]],
   ours:[["What's going on","An unquantified objective is the most common opening in real interviews, and the only correct first move is to make it quantified."]] },

 { ops:["sub"],
   given:[],
   ask:[["What were revenues last year?","Unlocks the base.","unlock",
         [["Revenue","$3 billion last year"]]],
        ["What's in the product line?","Unlocks the mix, which is what the exhibit will be about.","unlock",
         [["Product lines","five"]]],
        ["Is there room on the cost side?","Unlocks — and the answer closes a whole branch.","unlock",
         [["Cost savings","none available"],["New products","not an option"]]]],
   missing:["How the $3B splits across the five products — not until the exhibit"],
   logic:[["Only revenue is left","Cost is closed and new products are closed — the interviewer is steering"],
          ["Two ways to move revenue","More units, or more per unit"],
          ["Volume is the slow one","Share or category growth take time; price is the fast lever"]],
   verdict:"Price on the existing mix is the only live lever.",
   src:[["Data released","Revenues in the last year were $3 billion. The client's product mix includes dish washing powder, clothing detergent powder, hand wash liquid, shower gel, and all-purpose soap. There are no opportunities in cost savings or by adding new products to the mix."],
        ["Model answer","After presenting the framework and learning the information in the section above, a strong candidate will conclude the following: It appears that the only way to increase profitability is to improve revenues. Possible ways to do this include increasing sales volumes or altering prices. The firm can increase volumes by either grabbing more market share or growing the total available market."]],
   ours:[["What's going on","Being told a branch is closed is a gift. Take it, say so out loud, and move — a framework that keeps a big cost section after that wastes your own time."]] },

 { ops:[],
   given:[["Dish washing powder","−2% price · 5% of revenue"],
          ["Clothes detergent powder","+1% · 20%"],["Hand wash liquid","0% · 30%"],
          ["Shower gel","+2% · 30%"],["All-purpose soap","+4% · 15%"],
          ["Volumes","unchanged at the new prices"]],
   ask:[["What share of revenue does each product carry?","Unlocks the weights — without them the price percentages mean nothing.","unlock"],
        ["Do the volumes really hold at the new prices?","Tests the exhibit's central assumption.","test"]],
   missing:["Whether the research covers all of the client's markets — raised later as a risk, never resolved",
            "Any other combination of price changes; only one bundle was tested"],
   logic:[["Two percentage columns, two different meanings","One is a price move, the other is a revenue weight — they are not comparable"],
          ["The biggest line doesn't move","Hand wash is 30% of revenue at 0%, so a third of the business contributes nothing"],
          ["The biggest move sits on a small line","+4% on 15% of revenue"]],
   verdict:"The gain has to come from shower gel and all-purpose soap.",
   src:[["Exhibit 1 — Price Elasticity","Based on your ideas, you conducted a market research study. Your research has shown that if the prices of the client's products are changed all at once in the percentages shown, the volumes of the products sold will remain unchanged. Note that changes in price either all happen at the same time or none of the changes are made at all (i.e., they will either change all the prices below or none of them). Dish Washing Powder −2%, 5% of revenues; Clothes Detergent Powder +1%, 20%; Hand Wash Liquid 0%, 30%; Shower Gel +2%, 30%; All-Purpose Soap +4%, 15%."]],
   ours:[["Where the casebook slips","The exhibit is titled 'Price Elasticity' and then stipulates that volumes don't change — perfectly inelastic. No elasticity is used anywhere in the case. Read what a table does, not what it is called."]] },

 { ops:["mul"],
   given:[["Revenue","$3 billion"],["Target","+1%, i.e. $30M"]],
   ask:[["What increase would the client be happy with?","Clarifying — the threshold, finally, and without it the $39M means nothing.","clarify"]],
   calc:[["5% × $3B × −2%","−$3M","Dish washing powder: small line, small cut"],
         ["20% × $3B × +1%","+$6M","Detergent"],
         ["30% × $3B × 0%","$0","Hand wash — the biggest line contributes nothing"],
         ["30% × $3B × +2%","+$18M","Shower gel"],
         ["15% × $3B × +4%","+$18M","All-purpose soap"],
         ["−3 + 6 + 0 + 18 + 18","+$39M","Against a $30M target"],
         ["$39M ÷ $3B","+1.3% blended","Small moves on big bases"]],
   logic:[["Work in dollars per line, never in percentages","Percentages of different bases do not add"],
          ["Find where the money already is","Two lines of five produce $36M of the $39M"]],
   verdict:"+$39M against a $30M target — go ahead.",
   src:[["Question","The client has told us that they will be happy with a 1% increase in revenues. Should they go ahead with the price change?"],
        ["Model answer","Dish Washing Powder $150M → $147M; Clothes Detergent $600M → $606M; Hand Wash $900M → $900M; Shower Gel $900M → $918M; All-Purpose Soap $450M → $468M. Based on these calculations, revenues will be $3.039 billion after the price change representing an increase of $39 million. The client's target was $30 million (1% revenue change), so they should go ahead with the price change."]],
   ours:[["What's going on","This is the transferable move: in any mix question, find where the money already is before you look at which percentage is largest."]] },

 { ops:[],
   given:[["Gain","+$39M"],["Target","$30M"],["Volumes","hold at new prices"]],
   missing:["Competitor response — the research assumes the status quo",
            "Any better combination of price changes; only one was tested"],
   logic:[["A one-time step is not a growth rate","Say it before they ask — you cannot repeat this next year"],
          ["Three risks, three kinds","The research (geography), the market (competitors), the method (one option tested)"]],
   verdict:"Go ahead, with three watch-outs named.",
   src:[["Recommendation","Go ahead with the price change. Revenue will increase by $39M, which is higher than the goal of a 1% increase. Given price changes will not cause a decrease in volume of the products sold."],
        ["Risks","Research may not have been fully reflective of client's geographic / demographic market; Research is based on the status quo – if competitors use the opportunity to lower prices, we may lose customers and revenue; Research only considered one change option; there may be more optimal price changes that could be made."]],
   ours:[["Where the casebook slips","The interviewer states there are no cost savings available, and then the same page lists a cost-cutting diagnostic under next steps. Small, but the kind of contradiction to notice rather than absorb."],
         ["Carry forward","Weighted mix: the biggest percentage is rarely the biggest number."]] }
]
};
const V2 = Object.assign({}, V2A, V2B);

/* Industry lens, per case: sections in the order the case unfolds. Each section lights up on the steps in u (1-based).
   Every item has the same three parts: idea (what the thing is, in plain words), fact (what the evidence shows, with source and date),
   here (what it means in this case). Optional: sim (where the case simplifies), ask (a sharper question), defs [[term, meaning]],
   note (caveat; anything that is our own read says so and is never presented as sourced). */
const INDUSTRY = {
 "BTH-01": { title:"Hotels on a military base",
  sub:"Two layers of commentary first (the sector, then the sub-sector), then the notes in the order the case unfolds. Open any note for the idea, the evidence and what it means here. Anything that is our own judgement says so.",

  sector:{ h:"The sector: hotels and lodging", s:"CoStar (STR), Jan 20 2026; LODGING Magazine, Oct 2014",
   body:"A hotel sells a fixed number of rooms one night at a time. What it earns per available room, sold or not, is called RevPAR, and it equals the occupancy rate times the average room rate. For all US hotels in 2025 that was 62.3% × $160.54 ≈ $100. Most of the cost is staff and the building, which do not shrink when rooms go unsold, so profit swings with how full the hotel is and what it charges.",
   here:"The Army Hotel is judged on exactly these levers. Its 120,000 room-nights sold out of 146,000 is about 82% occupancy, and at $60 a night that is a RevPAR of about $49, roughly half the US average. The case therefore describes a hotel that is unusually full but cheap, whose profit depends on keeping those rooms full.",
   defs:[["RevPAR","revenue per available room: room revenue divided by all rooms available, sold or not"],["occupancy rate","the share of available rooms that are sold"],["average room rate","room revenue divided by rooms sold"]] },
  subsector:{ h:"The sub-sector: lodging on a military base", s:"U.S. Army, 2011; GSA FY2026; RAND, Sept 2019",
   body:"Here the customer is the government, not the guest. The price is a published daily allowance (the per diem) rather than whatever the market will pay. Demand follows the Army's own training and movement schedule, and the Army stated it gives private investors no occupancy guarantee. The land belongs to the Army and is leased to a private builder through long, slow deals.",
   here:"This is why price in the case is a ceiling, why demand arrives as groups of soldiers with a four-month peak, and why 'free land' still carries cost. It also explains why the same hotel on an ordinary street would be judged on different assumptions.",
   defs:[["per diem","a fixed daily travel allowance"],["installation","a military base"],["lease","the right to use land you do not own, for a fixed term and fee"]] },
  sections:[
   {h:"1. Who is paying, and what is the price?", u:[1,3], intro:"The case asks what the hotel can charge. In practice that depends on who is paying and how they pay.", items:[
    {h:"A room and a meal are paid for separately", scope:"sub", sum:"Government travel pays the room and meals as two separate allowances: $110 and $68 a night in 2026. The case folds them into one $75, so the real room-only ceiling depends on base and year.",
     idea:"When someone travels on government business, the government gives a fixed daily allowance, called a per diem. It has two parts: one for the room and one for meals and small extras. A hotel that takes this customer is paid out of the room part only.",
     fact:"For 2026 the standard US amounts are $110 for the room and $68 for meals and incidental expenses.",
     here:"The case merges the two into one $75 a night, then takes out about $15 for meals to reach a $60 room price. That shortcut is reasonable, but the true room-only ceiling depends on the base and the year.",
     ask:"Is the $75 the room alone, or the room plus meals?",
     defs:[["per diem","a fixed daily allowance for travel costs"],["meals and incidentals (M&IE)","food plus small extras such as tips"],["GSA","the US government agency that publishes the standard rates"],["FY2026","the government's 2026 budget year, October 2025 to September 2026"]],
     s:"GSA, FTR Bulletin 26-01, FY2026", note:"Rates reset every October 1, so the FY2027 rates now apply. We have not looked those up."},
    {h:"Here the buyer sets the price, not the market", scope:"sub", sum:"Most hotels move price to fill rooms; a hotel selling to a capped payer cannot. The US average rate was $160.54 in 2025, against the case's $60, so price is a limit and the levers left are volume, extras and cost.",
     idea:"Most hotels adjust their price up or down to fill rooms, so the price they earn follows demand. A hotel whose main customer pays a capped rate cannot do this, so its price follows the cap instead.",
     fact:"Across all US hotels in 2025 the average room rate was about $160.54 a night, up only 0.9% on 2024.",
     here:"The case's $60 sits far below that average because the Army caps it. Price is a limit someone else sets, so the levers left are filling rooms, adding other income and cutting cost.",
     defs:[["average daily rate (ADR)","room revenue divided by the number of rooms sold"],["ceiling","the most the buyer will pay"]],
     s:"CoStar (STR), Jan 20 2026", note:"The national figure covers all hotel types, so it is a rough yardstick and not a like-for-like comparison. That caveat is our judgement."}
   ]},
   {h:"2. Will the rooms actually fill?", u:[1,4,5], intro:"Revenue is rooms sold times price. With price fixed, the number of rooms sold carries the case.", items:[
    {h:"Demand on a base is expected, not promised", scope:"sub", sum:"US occupancy averaged 62.3% in 2025. The case assumes about 82%, and the Army stated it gave investors no occupancy guarantee. The assumption rests on soldier numbers nobody has promised.",
     idea:"Occupancy is the share of a hotel's rooms that are sold on a given night. An investor relies on it to repay the loan, so whether anyone has promised it matters as much as the number itself.",
     fact:"The US average in 2025 was 62.3%, down 1.2% on 2024. For Army-base hotels, the Army stated that it gave private investors no guarantee on either the loan or occupancy.",
     here:"The case sells 120,000 of 146,000 possible room-nights (400 rooms times 365 nights), about 82%. That is far above the national average, and all of it depends on soldier numbers the Army does not promise.",
     ask:"Is the occupancy committed under a contract, or only expected?",
     defs:[["occupancy","the share of available rooms that are sold"],["room-night","one room occupied for one night"],["underwrite","judge the risk of a deal before committing money to it"],["guarantee","a promise that the investor is covered if demand falls short"]],
     s:"U.S. Army, 2011; CoStar (STR), Jan 2026"},
    {h:"When you are full, price is the usual release valve; here it isn't", scope:"sector", sum:"Hotels normally raise rates when demand exceeds rooms. Here the rate is capped, so the 80-room peak shortage is lost sales. It has to be fixed with rooms or other income, not price.",
     idea:"A hotel has a fixed number of rooms. When more people want a room than there are rooms, the standard response is to raise the rate and favour the guests who pay more. This is called revenue management.",
     fact:"A revenue-management teaching text describes raising rates sharply when demand outruns a fixed number of rooms, and accepting higher-paying guests first.",
     here:"At the peak the Army needs about 80 more rooms than the hotel has, but the rate is capped, so that demand is lost. The fix has to come from more rooms or other income, not from price.",
     defs:[["capacity","the number of rooms available to sell"],["revenue management","adjusting price to demand to earn the most from a fixed number of rooms"],["shortfall","demand you cannot serve"]],
     s:"University of West Florida, revenue-management course text (undated)", note:"This is a teaching text, not market data. Use it for the idea, not for a figure."}
   ]},
   {h:"3. What else can the hotel earn?", u:[2,7], intro:"If price is capped, the next question is whether the hotel earns anything besides room rates.", items:[
    {h:"Rooms are not the only income", scope:"sector", sum:"Food, drink and meeting space are called non-occupancy revenue; food and beverage was about 29% of revenue in a 2016 sample. The case lists it but gives no figure, and it is the one lever left on payback.",
     idea:"Hotels also sell food, drink, meeting space and other services to guests who are already there. All of that income is called non-occupancy revenue.",
     fact:"In a 2016 industry sample, food and beverage alone was about 29% of hotel revenue.",
     here:"The casebook lists non-occupancy revenue but never gives a number. With price capped, it is the one lever that could shorten payback.",
     ask:"Is there a restaurant, or would the base already supply meals?",
     defs:[["non-occupancy revenue","income that is not the room rate: food, drink, meeting space"],["food and beverage (F&B)","restaurants, bars and catering"],["full-service hotel","a hotel with restaurants, bars and meeting rooms"],["limited-service hotel","mostly rooms, with little else to buy"]],
     s:"CBRE Hotels Research, 2016", note:"The sample leans toward full-service hotels, so a limited-service base hotel would probably earn a smaller share. That second part is our judgement."}
   ]},
   {h:"4. What does it cost to run?", u:[6], intro:"The case gives one annual cost. This is what usually sits inside a number like that.", items:[
    {h:"Staff are the biggest cost, and hard to flex", scope:"sector", sum:"Labor was about 45% of what US hotels spent running in 2013, and salaries per room barely moved in six years. The case gives one $4.0M lump, so ask how much is staff and whether it flexes with occupancy.",
     idea:"Most of a hotel's running cost is people: front desk, housekeeping, maintenance. Wages do not fall when a few rooms go unsold, so costs behave more like a fixed amount than like something that scales with guests.",
     fact:"In 2013, labor was about 45% of all the dollars spent running US hotels and about 32% of revenue. Salaries per available room stayed nearly flat (about $13,150) from 2007 to 2013 while revenue grew, and benefits and payroll taxes kept rising.",
     here:"The case treats the $4.0M as one lump. Asking how much of it is staff tells you how much can realistically be cut, and how much profit would drop in a weak year.",
     sim:"One lump hides the split between costs that rise with each guest and costs that do not.",
     ask:"How much of the $4.0M is staff, and does it change with occupancy?",
     defs:[["labor cost","wages plus benefits for hotel staff"],["fixed cost","does not change with how many rooms are sold"],["variable cost","rises with each room sold, such as cleaning, laundry and supplies"],["payroll costs","benefits, taxes and paid leave on top of wages"],["per available room","divided by all rooms, sold or not"]],
     s:"LODGING Magazine, Oct 2014 (2013 data)", note:"The figures are dated. The point that a weak year cuts profit faster than revenue is our judgement."}
   ]},
   {h:"5. Who should own the building, and on whose land?", u:[2,6,7], intro:"The client is a private-equity firm that would build and own a hotel on land it does not own.", items:[
    {h:"Big hotel companies prefer not to own buildings", scope:"sector", sum:"The largest chains hold about a third less property per revenue dollar than in 2002 and earn through fees. A private-equity owner takes the building risk instead, so the return must come from the building.",
     idea:"A hotel company can earn money in two ways: by owning the building, or by lending its brand or its management skills to a building someone else owns, for a fee. The second needs far less capital.",
     fact:"The five largest chains hold about a third less property per dollar of revenue than in 2002. McKinsey found a 0.84 correlation between a hotel company's franchised share and its net profit margin, meaning the two move closely together.",
     here:"A private-equity firm that builds and owns the hotel takes the building risk the chains avoid. That can suit a financial buyer, but it means the return has to come from the building and its cash flow, not from fees.",
     defs:[["asset-light","earning fees from hotels you do not own"],["franchise","letting an owner use your brand for a fee"],["management contract","running someone else's hotel for a fee"],["correlation","how closely two numbers move together; 1 means in lockstep"],["net margin","profit as a share of revenue"]],
     s:"BCG, Sept 2014; McKinsey, May 2024", url:"https://www.bcg.com/publications/2014/business-model-innovation-growth-asset-light-is-right"},
    {h:"The land is leased, and the lease deal is slow", scope:"sub", sum:"The Army usually leases land rather than selling it, mostly through enhanced use leases, which RAND found slow and specialist-heavy. 'Free land' still costs time and advisers, and the lease length caps the earning years.",
     idea:"The Army usually leases land to private partners instead of selling it, so the builder owns the hotel but not the ground. The length of the lease then limits how long the hotel can earn.",
     fact:"RAND found that enhanced use leases are the most common type of Army land deal, that they take a long time, and that they need legal, financial and real-estate specialists.",
     here:"'Free land' in the case is not free of cost. Time, advisers and the length of the lease all affect when the money comes back.",
     ask:"Who owns the land, and for how long?",
     defs:[["enhanced use lease","lets the military lease its land to a private builder in return for money or services"],["ground lease","you lease the land and own only what you build on it"],["outgrant","the military's word for letting an outside party use its property"]],
     s:"RAND, RR2696, Sept 2019", url:"https://www.rand.org/pubs/research_reports/RR2696.html"}
   ]},
   {h:"6. Can the money come back in time?", u:[7,8], intro:"The client wants its money back in 4 to 5 years. The case says 6.25.", items:[
    {h:"Borrowing costs squeeze hotel returns", scope:"sector", sum:"In 2023 hotel loans cost about 8 to 9%, and 89% of hoteliers called rates above 8% unacceptable. When debt costs more than the property earns, borrowing cuts returns, which makes a 6.25-year payback harder to defend.",
     idea:"Most hotels are partly paid for with borrowed money. If the interest rate is higher than what the property earns on its value, each borrowed dollar lowers the owner's return instead of raising it. This is called negative leverage.",
     fact:"In 2023, hotel loans cost roughly 8 to 9%, and 89% of hoteliers surveyed called rates above 8% unacceptable.",
     here:"High debt cost makes a slow payback harder to defend. A 6.25-year payback against a 4 to 5 year hurdle looks worse when money is expensive.",
     defs:[["cost of debt","the interest you pay to borrow"],["negative leverage","when borrowing lowers your return instead of raising it"],["payback","years until the investment earns its money back"],["hurdle","the minimum return or speed the investor demands"]],
     s:"BCG, June 2023", url:"https://www.bcg.com/publications/2023/unexpected-opportunities-from-rising-hotel-loan-interest-rates", note:"This is a 2023 survey and rates have moved since."},
    {h:"A buyer is probably there when you want to sell", scope:"sector", sum:"Hotel investment is up 22% from its 2023 low with record capital available, which supports an exit. A one-customer hotel on leased land still has a narrower buyer pool than an ordinary hotel.",
     idea:"An investor's return depends partly on being able to sell the hotel at the end. That depends on how many buyers are active in the market at that time.",
     fact:"Direct hotel investment is up 22% from its 2023 low, with record capital available to invest.",
     here:"That supports the case's idea of selling at the end. A hotel with one customer on leased land will still have fewer buyers than an ordinary hotel.",
     defs:[["exit","selling an investment to get your money out"],["trough","the lowest point before a recovery"],["sale value","what the hotel would sell for at the end"]],
     s:"JLL, Feb 2026", url:"https://www.jll.com/en-us/newsroom/2026-global-hotel-investment-outlook-report", note:"The fewer-buyers point is our judgement, not a published figure."}
   ]}
  ]}
};
