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

/* The casebook's OWN framework, as printed in the source, one entry per case that has one.
   Node = SN(text, status, note, kids): status 'u' = the case actually uses it, 'n' = listed but never
   used / never quantified, 'l' = used only as one lump. A node with no status is a grouping label. */
const SN = (t,st,n,k)=>({t,st:st||"",n:n||"",k:k||[]});
const SRCFW = {
"BTH-01": {
  src:"Booth 2025 · Case 1, p. 71",
  hyp:"The PE firm should build the hotel.",
  lead:"To validate that, I'd like to look at…",
  how:"This is the structure the casebook wants to hear from you. Note the order: it opens with an answer (the working hypothesis) and then names what you would check to prove or kill it. Three families: the market (is there anyone to fill the hotel), profitability (does it pay) and the client (does it suit this buyer).",
  branches:[
   SN("Hotel market","","Is there anyone to sell rooms to, and who else is selling them?",[
     SN("Competition","u","Step 3 — three hotels, only one a real rival",[
       SN("Number of hotels","u","Three nearby: $110, $75, $40"),
       SN("Location","u","All about 20 miles from the base")]),
     SN("Customers","",null,[
       SN("Soldiers","u","The only guest; trainees and people on rotation",[
         SN("Proximity to base","u","The hotel sits on the base — rivals do not")])])]),
   SN("Profitability","","Does it earn enough to repay the build?",[
     SN("Revenues","",null,[
       SN("Demand / occupancy","u","Step 4: 129,000 room-nights; Step 5 cuts it to 120,000"),
       SN("Number of rooms","u","Step 5: 400 rooms; the shortage is only a peak window"),
       SN("Pricing","u","Step 3: capped at $60",[
         SN("Willingness to pay","n","Set aside — the Army's $75 budget decides, not what a soldier would pay")]),
       SN("Non-occupancy revenues","n","Listed, never sized — yet it is the one lever left in Step 7")]),
     SN("Costs","",null,[
       SN("Capital expenses","u","Step 6",[
         SN("Building / investment","u","400 × $50,000 = $20M, paid once"),
         SN("Breakeven timeline","u","Step 7: $20M ÷ $3.2M = 6.25 years")]),
       SN("Operational expenses","l","One lump of $4M a year, never split",[
         SN("Labor","n","Never separated out"),
         SN("Maintenance","n","Never separated out")])])]),
   SN("Client interests (PE firm)","","Does this particular buyer want this particular deal?",[
     SN("Portfolio mix","n","Never discussed"),
     SN("Financial and operational investment goals","u","The 4–5 year payback hurdle, which you have to ask for"),
     SN("Exit opportunities","n","Never discussed"),
     SN("Opportunity cost","n","Listed, never computed — see the Toolkit")])]
 },
"BTH-02": {
  src:"Booth 2025 · Case 2, p. 76",
  hyp:null,
  lead:"The candidate should develop a framework that considers these drivers.",
  how:"Here the casebook gives the drivers rather than a hypothesis, and expects you to build the structure and walk the interviewer through it. Most of its branches are settled by facts you are handed in the first two minutes; a few are never touched.",
  branches:[
   SN("Med-device market potential","","How many patients, and is that growing?",[
     SN("Patient","",null,[
       SN("Market size","u","100,000 breast conservation surgeries a year"),
       SN("Growth trend","n","Never given or used")])]),
   SN("Revenue potential","","Who has to say yes at each price?",[
     SN("Provider / clinician adoption rate","u","The exhibit: adoption at each price point — the heart of the case"),
     SN("Relationship with clinicians","n","Never raised"),
     SN("Insurers' willingness to cover the cost","n","Never raised")]),
   SN("The device","","Is it good enough to sell?",[
     SN("Degree of innovation (substitutes)","u","No competitors at all"),
     SN("Main features","",null,[
       SN("Usable across surgeries","u","Works in every one"),
       SN("Success / complication rate","u","100% success"),
       SN("Useful life, quality","u","No quality concerns from R&D")]),
     SN("Regulations","",null,[
       SN("FDA compliance","u","Already approved"),
       SN("Patent","n","Never raised")])])]
 }
};
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
  plain:"The highest price you can charge, set by something other than your own costs — usually by whoever is actually paying.",
  why:"When a third party reimburses (an employer, an insurer, a government), their budget caps your price no matter how good the product is. And a capped price means you cannot fix a bad return by charging more.",
  math:{f:"p_max = A − m",
        sym:[["p_max","the most you can charge per night"],["A","the payer's allowance per night"],["m","everything else that same allowance must also pay for"]],
        read:"The most you can charge is what the payer hands over, minus whatever else that money has to buy.",
        work:"Army Hotel: A = $75 a night, and it must also cover two meals. If the meals cost about $15 (the case never says), p_max = $75 − $15 = $60 — the rate the casebook uses from here on."},
  here:"The hotel's price is not a choice. The Army reimburses $75 a night and that has to cover breakfast and dinner too, so about $60 is all the room can cost. The Hilton at $110 and the Hampton Inn at $75 are simply out of reach for a soldier on a per diem.",
  big:"Every case with a price in it starts with who pays and what their budget is. It reappears in Breast Cancer Surgery, where the limit is the customers' own willingness to pay instead of a payer's budget.",
  without:"You would quote $75 or even $110 like the neighbours, the soldiers would be paying part of every night out of their own pocket, and the revenue forecast would be too high before you have started on volume.",
  formula:"ceiling = what the payer allows − what else it has to cover",
  watch:"Subtract everything the allowance must also buy. A $75 per diem that includes two meals is not a $75 room.",
  met:"Army Hotel"},
"Breakeven":{
  plain:"The point where money in equals money out — expressed as a volume, a price, a share or a number of years.",
  why:"It converts a forecast into a threshold. 'We'll make $70,000' invites an argument; 'we break even at a 10% share and we expect 12.5%' is a defensible answer.",
  math:{f:"Q* = F ÷ (p − v)        T = I ÷ π",
        sym:[["Q*","units you must sell to break even"],["F","fixed cost you have to cover"],["p","price per unit"],["v","variable cost per unit (so p − v is what each sale leaves over)"],["T","years to get an up-front outlay back"],["I","the one-off investment"],["π","operating profit per year"]],
        read:"Q*: every sale leaves p − v after its own cost, and breakeven is how many of those it takes to pay off F. T: the same idea for a one-off outlay — how many years of profit repay it.",
        work:"Army Hotel uses the second form. I = $20M to build, π = $3.2M a year, so T = $20M ÷ $3.2M = 6.25 years. The client wants 4–5 years, so it misses by about a year and a quarter."},
  here:"The client is a financial buyer who wants its money back in 4–5 years. A $3.2M annual profit sounds fine until you divide the $20M build into it and get 6.25 years — that division, not the profit, decides the case.",
  big:"Breakeven turns a forecast into a pass/fail threshold, whether it is measured in units, price, share or years. Later cases use it as a breakeven share, and Cleaning Products asks for the price move that just covers a target.",
  without:"You would stop at '$3.2M a year', which looks healthy, and recommend building a hotel the client would reject.",
  formula:"breakeven volume = fixed cost ÷ contribution per unit",
  watch:"Divide by contribution, never by revenue — the units have to match.",
  met:"Army Hotel"},
"Capacity":{
  plain:"The most you can physically produce or serve, regardless of how much demand exists.",
  why:"Demand you cannot house is not revenue. A constraint that bites only in a peak window still cuts the whole year's number.",
  math:{f:"S = min(D, K)",
        sym:[["S","what you can actually sell"],["D","how much customers want"],["K","the most you can serve"]],
        read:"You sell whichever is smaller: what people want, or what you can serve. Demand beyond capacity is lost, not banked.",
        work:"Army Hotel: demand D = 129,000 room-nights a year. In the four busiest months the hotel is 80 rooms a night short, so 80 × 4 × 30 = 9,600 nights are turned away. S = 129,000 − 9,600 ≈ 120,000, and 120,000 × $60 = $7.2M. Check the whole year first and you are fooled: 400 rooms × 365 = 146,000 nights, comfortably above demand."},
  here:"The hotel does not run short all year, only for four months, and the casebook's first revenue figure of $7.8M quietly assumes every guest gets a room. The correct number is $7.2M.",
  big:"Every volume forecast has a ceiling on the supply side as well as the demand side. Electric Utility comes back to it as utilisation, from the other direction: a plant that has to meet the peak looks half-empty on average.",
  without:"You would hand over $7.8M of revenue that the hotel cannot physically earn, and every number after it (profit, payback) would be flattered by the same mistake.",
  formula:"sellable volume = min(demand, capacity)",
  watch:"Test capacity against the peak, not the average — an annual figure hides a four-month shortage completely.",
  met:"Army Hotel"},
"Non-occupancy revenue":{
  plain:"Money a business earns from its customers other than the headline price of the thing it exists to sell. For a hotel, 'occupancy' revenue is the room rate; everything else the guest pays for is non-occupancy.",
  eg:"In general: a hotel's restaurant, bar, spa, parking and conference rooms; an airline's baggage fees; a cinema's popcorn; a stadium's food stalls. In the Army Hotel: a restaurant for soldiers who are not yet on the base meal plan, rooms rented for army conferences, vending and laundry.",
  why:"Rooms are the product, but they are rarely the only source of money. Because a guest is already there, extra sales cost little to win and often carry a better margin than the room.",
  math:{f:"R_total = p × Q + N        T = I ÷ (π + n)",
        sym:[["p × Q","room revenue: rate times room-nights sold"],["N","non-occupancy revenue"],["I","the one-off investment"],["π","operating profit per year from rooms"],["n","extra profit per year from N, after what it costs to run it"]],
        read:"Total revenue is rooms plus everything else. The part that helps payback is only what is left of N after its own costs, so measure n, not N.",
        work:"Army Hotel: the case gives no figure (illustration only). Suppose a restaurant and conference rooms net an extra $0.8M a year. Then T = $20M ÷ ($3.2M + $0.8M) = 5.0 years, which just reaches the client's 4–5 year hurdle instead of missing it at 6.25."},
  here:"Rooms alone fail the client's payback test, and the per diem stops you raising the room rate. Non-occupancy revenue is the one lever left that can shorten payback, which is why the casebook lists it, then the model answer names a restaurant and army conferences as the fix.",
  big:"The same pattern recurs in any business that sells a main product plus add-ons. When the price of the main thing is capped, the add-ons are where the room to improve sits.",
  without:"With price capped and volume limited, the hotel looks like a dead end and you would say no without testing the one thing that could change the answer.",
  watch:"A figure for N is not a figure for profit. A restaurant that brings in $1M and costs $1M to run adds nothing.",
  met:"Army Hotel"},
"Structure without data":{
  plain:"Building a usable framework when the case gives you almost no numbers at all.",
  why:"Some cases hand you three facts and a question. The structure is then the entire answer, and buckets that state conclusions cannot be tested.",
  watch:"Write each bucket as something you could go and measure. 'Work conditions are similar' is an assumption; 'do juniors and seniors cover the same territories' is a test.",
  met:"Heavy Attrition"},
"Opportunity cost":{
  plain:"What you give up by choosing one option — the value of the next best thing you didn't do.",
  why:"It is the most commonly missed cost in a case, because nothing appears on an invoice for it. Using something you own is not free if you could have sold it.",
  math:{f:"economic profit = accounting profit − return forgone elsewhere",
        sym:[["accounting profit","revenue minus the costs you actually pay"],["return forgone elsewhere","what the same money or asset would have earned in its best alternative use"]],
        read:"A project only creates value if it beats the next best use of the same resources, not just if it beats zero.",
        work:"Army Hotel (our framing; the casebook lists opportunity cost and never computes it): the client's own 4–5 year payback means it expects to earn about 20% a year on invested money (1 ÷ 5). On $20M that is $4M a year forgone, against a hotel profit of $3.2M, so economic profit is about −$0.8M a year. The hotel earns money and still loses to the alternative."},
  here:"In the Army Hotel the land is free, so it is tempting to say the hotel costs only the building. The cost that matters is the $20M itself: tied up here, it cannot earn what the firm's other deals would pay.",
  big:"This is the idea behind every 'should we do this' question: compare against the best alternative, not against doing nothing. Electric Utility returns to it when the company's own coal turns out to cost what it could have been sold for.",
  without:"Any project that makes a profit looks worth doing, so you would approve deals that make less than the client could have earned by simply doing something else.",
  formula:"true cost of using it = what someone else would have paid for it",
  watch:"Check the units and any footnote first. '$000s' is the difference between ten students and ten thousand.",
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
  math:{f:"R(p) = p × Q(p)        choose p* so that R(p*) ≥ R(p) for every price p you tested",
        sym:[["R(p)","total revenue if you charge p"],["p","the price"],["Q(p)","how many buy at that price (it falls as p rises)"],["p*","the price with the highest revenue"]],
        read:"Revenue is price times the number who buy at that price. Because the number who buy shrinks as price grows, the two factors fight, and you compute R at each candidate price and pick the largest.",
        work:"Breast Cancer Surgery gives the full table: $300 × 75,000 = $22.5M; $600 × 50,000 = $30M; $1,000 × 10,000 = $10M. The peak is $600. Army Hotel gives only one point ($60 × 120,000 = $7.2M) because the Army fixes the price, so there is nothing to maximise there."},
  here:"Not used in the Army Hotel, and that is the point: the per diem fixes the price, so the case has no price to optimise. It first matters in Breast Cancer Surgery, where the hospitals' willingness to pay does the choosing.",
  big:"Whenever you control a price, you are choosing a point on a trade-off between what each customer pays and how many there are. Knowing the shape stops you defaulting to 'highest price' or 'most customers'.",
  without:"You would pick a price by instinct, usually the highest or the one that fills the hall, and could leave a large share of the money on the table.",
  formula:"revenue = price × (market × adoption at that price)",
  watch:"Revenue-maximising is not profit-maximising. Say so, especially when the case never gives you costs.",
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
