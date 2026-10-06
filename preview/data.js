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
             +"I can't say whether $600 is still the best price once cost per device is known. Of the four prices "
             +"tested, a cost above $500 a device would make $1,000 more profitable than $600. And a "
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
Object.assign(SRCFW, ({
"BTH-19": (()=>{
 const FN = (n,o)=>{ n.fn = o; return n; };
 /* ---------- printed ---------- */
 const A = {};
 A.layoff = N("% of company driven leaves (layoffs)",{from:"none",def:"The share of departures where the company chose to end the job, as opposed to the person choosing to leave.",why:"Layoffs are not a retention problem, so they have to be taken out of the count before looking for causes.",n:"Never given. The case only says new hires stay less than one year."});
 A.sat = N("Satisfaction with work environment among employees",{from:"none",def:"How content staff say they are with their working surroundings.",why:"Low satisfaction would push people out, and it is something a survey can measure.",n:"Never given. The book lists a survey of junior salespeople only as a next step."});
 A.mkt = N("Is avg. attrition in the market lower?",{u:[1],from:"ask",def:"Whether other companies in the same industry lose staff at a lower rate than this client.",why:"'Heavy' means nothing without a comparison. The market rate is the benchmark.",n:"The book tells the interviewer to expect questions about the word 'heavy'. No market rate or other benchmark is ever supplied."});
 A.hire = N("Any competitor or new market player hiring sales people?",{from:"none",def:"Whether rivals or new entrants are recruiting this client's salespeople.",why:"Staff can be pulled away by better offers, which is a cause outside the client's control.",n:"Never raised or answered in the case."});
 A.exam = N("Industry exams needed after 1y?",{from:"none",def:"Whether the industry requires a licence or exam after the first year, which could make people leave around that point.",why:"A fixed hurdle at one year would explain leaving at about that time.",n:"Never raised or answered in the case."});
 A.b1 = N("Attrition not caused by poor performance",{u:[3],def:"The claim that people are leaving for reasons other than being let go or pushed out for weak results.",why:"If leavers were poor performers, the fix would be hiring or training, not pay.",n:"The case does not say why people leave. The book states this as a conclusion rather than something to check.",
   split:"The book lists five things that could make people leave for reasons other than the client's own choice or pay: layoffs, how people feel about work, the market rate, rivals hiring, and a regulatory hurdle."},[A.layoff,A.sat,A.mkt,A.hire,A.exam]);
 A.cond = N("Working conditions of people working less than and over 3 years",{u:[2],from:"given",def:"Whether juniors and seniors work under the same conditions.",why:"Seniors face the same company and stay, so anything shared by both groups cannot explain why juniors leave.",n:"Juniors stay under 1 year; people with more than 3 years almost never leave, in the same company."});
 A.hours = N("Working hours",{from:"none",def:"How long people are expected to work each day or week.",why:"Long hours push people out, but only matter here if juniors work more than seniors.",n:"Never given."});
 A.type = N("Type of work",{u:[3,4],from:"given",def:"What the job consists of day to day.",why:"If juniors and seniors do different work, that alone could explain the gap.",n:"The book assumes it is the same for both: salespeople mainly sell. The case does not test this."});
 A.loc = N("Location",{from:"none",def:"Where people work.",why:"A poor location would hurt retention only if juniors are placed there more than seniors.",n:"Never given."});
 A.ins = N("Insurance",{from:"none",def:"Health or other cover the employer provides.",why:"It is part of the total package a person weighs when deciding to stay.",n:"Never given."});
 A.leave = N("Maternity / paternity leaves, additional benefits",{from:"none",def:"Parental leave and other benefits beyond pay.",why:"Benefits count towards the package, so a gap between groups could matter.",n:"Never given."});
 A.exp = N("Expense coverage",{from:"none",def:"Whether the company reimburses costs such as travel.",why:"Salespeople who travel carry costs, and unpaid costs reduce take-home pay.",n:"Never given. The book mentions distance travelled only as a driver of commission."});
 A.b2 = N("Work conditions similar across all employees",{u:[2,3],def:"The claim that juniors and seniors work under the same conditions.",why:"If it holds, conditions cannot explain why one group leaves, and attention moves to what differs.",n:"The case supports it in one way: seniors work for the same firm and stay.",
   split:"Conditions of work are split into the pieces a person can compare between groups: the work itself, hours, place, and the benefits around the job."},[A.cond,A.hours,A.type,A.loc,A.ins,A.leave,A.exp]);
 A.base = N("Base and variable salary differences (sales people)",{u:[3],from:"given",def:"How the split between fixed salary and commission differs between juniors and seniors.",why:"A pay mix heavy on commission makes earnings depend on what you are allowed to sell.",n:"Pay is a small fixed salary plus commission. Whether the split differs by tenure is never given."});
 A.comm = N("Commission by sales volume; distance traveled",{u:[3,4],from:"ask",def:"What determines how much commission a salesperson earns: how much is sold, and how far the salesperson must travel to sell it.",why:"It is the working hypothesis: if juniors earn less per hour of effort than seniors, they have a reason to leave.",n:"The case gives only the shape (a percentage of price) and the iPod and iMac example. No commission rate, volume or distance is ever given."});
 A.split = N("How does split compare to competition?",{from:"none",def:"Whether the fixed-versus-variable pay split is the same as what competitors offer.",why:"Pay that is worse than the market pulls people away.",n:"Never given."});
 A.fin = N("Financial vs non-financial incentives",{from:"none",def:"Money (salary, commission) compared with other rewards such as recognition or career growth.",why:"Some people stay for reasons other than pay.",n:"Never given. The book says to focus on the monetary side."});
 A.b3 = N("Are there differences in incentive schemes?",{u:[3,4,5],def:"Whether juniors and seniors are rewarded differently.",why:"It is the bucket the book's working hypothesis rests on.",n:"Pay is a small salary plus commission. Nothing else about the schemes is given.",
   split:"An incentive scheme has a pay mix, a commission rule, a comparison with the market, and non-money rewards. The book lists all four."},[A.base,A.comm,A.split,A.fin]);
 const hypP = N("Increase retention through an improved incentive scheme",{u:[3,5],def:"The book's headline: it names the answer, an improved incentive scheme, before any buckets are tested.",why:"It tells you where the book is heading, but it is a conclusion, so the interviewer will not give it to you.",n:"The book's working hypothesis, printed below the tree: the heavy attrition is due to the incentive structure of the client, starting with differences between junior and senior employees.",
   split:"Three buckets: the cause is not performance, conditions are the same, and incentives differ. Each is written as a statement, which is why the book can rule the first two out and leave incentives."},[A.b1,A.b2,A.b3]);
 /* ---------- improved ---------- */
 const I = {};
 I.bench = N("Benchmark for 'heavy'",{chg:"add",chgwhy:"The book never defines 'heavy', but the case's own first question is what it is compared with. Without a benchmark the problem is undefined.",u:[1],from:"none",def:"The rate you would compare this client's attrition with: last year's, or the industry's.",why:"A rate is only heavy relative to something.",n:"No benchmark is supplied. The only fact is that new hires stay less than 1 year."});
 I.who = N("Who leaves: under 1 year versus over 3 years",{chg:"add",chgwhy:"The contrast between the two tenure groups is the whole evidence of the case, but the book keeps it out of the framework.",u:[2],from:"given",def:"The length of time people stay, split between juniors and seniors.",why:"It shows the problem is specific to one group, so company-wide causes can be set aside.",n:"New hires stay less than 1 year. People with more than 3 years almost never leave."});
 I.ramp = N("Cost of each leaver: the ramp-up",{chg:"add",chgwhy:"The case gives the 6-month ramp-up to show why under 1 year is costly. The book does not use it.",u:[2],from:"given",def:"The time a new salesperson needs before doing the job well.",why:"It is time that the client pays for and does not get back if the person leaves.",n:"About 6 months to get up to speed, out of a stay of less than 12 months."});
 I.size = N("How heavy, and for whom?",{chg:"add",chgwhy:"The book starts at the hypothesis. First you need to pin down what 'heavy' means and which group is affected, which is the case's first question and the one candidates skip.",u:[1,2],def:"The size of the problem: how many leave, who they are and what it costs.",why:"You cannot judge a cause until you know how big the problem is and where it sits.",n:"Juniors under 1 year leave; seniors past 3 years almost never do. No figures are given.",
   split:"The problem has three parts: what 'heavy' is measured against, which group is leaving, and what each leaver costs the client."},[I.bench,I.who,I.ramp]);
 FN(I.size,{k:"calc",say:"Attrition is a rate: the number who leave in a period divided by the average number employed in it. The case gives no figures, so the formula and the illustration below are ours. The cost of each leaver follows from tenure and ramp-up.",f:"Attrition rate = leavers ÷ average headcount;   productive months = tenure − ramp-up",units:"leavers and headcount in people, rate in % per year; tenure, ramp-up and productive months in months",ex:["Illustration (ours, not from the case): 30 leavers ÷ 120 average headcount = 25% a year.","From the case: tenure is under 12 months and ramp-up is about 6 months, so each hire is productive for under 12 − 6 = 6 months."],flag:"Figures in the illustration are ours; the case gives none"});
 I.b1 = NC(A.b1,{t:"Is it poor performance or something else?",chg:"ren",chgwhy:"The book states 'attrition not caused by poor performance' as a fact. It is a question to check, so it is worded as one.",n:"The case does not say why people leave. This branch separates leavers the company chose from leavers who chose themselves."});
 FN(I.b1,{k:"rule",say:"Only people who choose to leave count as a retention problem. Leavers the company chose, such as layoffs or dismissals for poor performance, belong to a different problem.",f:"Retention problem = leavers − company-driven leavers",units:"people per year",ex:["The case gives neither number, so the check is a question to ask, not a sum to do."]});
 I.b2 = NC(A.b2,{t:"Do juniors and seniors work under the same conditions?",chg:"ren",chgwhy:"The book states the conclusion. It is an assumption, and the improved version says it out loud and keeps it open to be tested.",n:"The case supports it in one way: seniors work for the same company and almost never leave. The work itself is assumed the same."});
 FN(I.b2,{k:"rule",say:"A factor can explain the gap only if it differs between juniors and seniors. If both groups face it, seniors would leave too, and they do not.",f:"Explains the gap = differs between groups AND is linked to leaving",units:"yes or no for each factor",ex:["Same company, hours, location and benefits for both groups: ruled out.","Type of work: assumed the same, so ruled out unless shown otherwise."]});
 I.prod = N("Type of product sold",{chg:"add",chgwhy:"The book's brainstorm page names product type as the first driver of commission, but the framework page does not show it. The case's one worked idea sits here.",u:[4],from:"ask",def:"Which products a salesperson sells, how much margin each carries, how hard each is to sell, and whether juniors may sell all of them.",why:"If commission is a percentage of price, the products a person may sell cap what they can earn.",n:"The case's own example: iPods at $100–300 sell with little effort; iMacs at $2,000–3,000 take far more. Whether juniors are limited to either is never answered."});
 FN(I.prod,{k:"calc",say:"Commission on a sale is the price times the commission rate. Compare products by commission per hour of effort, not per sale. The rate and the hours are not in the case, so the illustration is ours.",f:"Commission per hour = price × rate ÷ hours per sale",units:"price in $, rate in % of price, hours per sale in hours, commission in $ per hour",ex:["From the case: iPods at $100–300 and iMacs at $2,000–3,000, with commission a percentage of price.","Illustration (ours): at 5% a flat rate, a $200 iPod pays $10 and a $2,500 iMac pays $125. If the iMac takes 10 times the hours, it pays $12.50 per hour of effort against $10, which is hardly better."],flag:"Rate and hours are ours; the case gives none"});
 I.terr = N("Type of client and territory",{chg:"add",chgwhy:"The book's brainstorm page lists territory as the second driver but leaves it out of the framework.",u:[4],from:"none",def:"Which customers a salesperson is assigned, and how those assignments are made.",why:"If the best customers go to seniors, juniors earn less for the same effort.",n:"Never given: no territory sizes or assignment rules."});
 I.dist = N("Distance travelled to customers",{chg:"add",chgwhy:"The book names distance inside the commission bullet. It is split out because it is a separate thing you could measure.",u:[4],from:"none",def:"How far a salesperson must travel to reach customers.",why:"More time on the road means fewer sales in the same working week.",n:"Never given."});
 I.comm = NC(A.comm,{chg:"ren",chgwhy:"Kept from the book and expanded into the three drivers the brainstorm page names.",n:"Same facts as the book: pay is a percentage of price. No rate, volume or distance is ever given.",
   split:"Commission depends on what is sold (product), who it is sold to (client and territory) and how far you travel to sell it (distance), so each is a separate thing to check."},[I.prod,I.terr,I.dist]);
 FN(I.comm,{k:"calc",say:"A salesperson's commission is the sum, over every sale, of the price times the commission rate. Travelling reduces the number of sales that fit in a week. The case gives no figures, so any numbers here are ours.",f:"Commission = Σ (price × rate) over all sales made;   sales made = hours available ÷ (hours per sale + travel hours per sale)",units:"price in $, rate in % of price, hours in hours per sale, commission in $ per period",ex:["Illustration (ours): at 5%, a junior who sells ten $200 products earns 10 × $200 × 5% = $100, while a senior who sells ten $2,500 products earns $1,250."],flag:"Figures in the illustration are ours; the case gives none"});
 I.b3 = NC(A.b3,{t:"Do incentive schemes differ between juniors and seniors?",chg:"ren",chgwhy:"Kept as the book's third bucket, now worded as a question and placed first among the buckets that are actually testable.",n:"Pay is a small salary plus commission, and commission depends on product, territory and distance. Nothing else is given.",
   split:"A scheme has a pay mix, a commission rule, a market comparison and non-money rewards. The commission rule is where the case's one idea sits, so it is expanded."},[A.base,I.comm,A.split,A.fin]);
 FN(I.b3,{k:"rule",say:"The incentive bucket is the cause only if juniors and seniors are paid differently AND the difference leaves juniors worse off.",f:"Cause = pay scheme differs by tenure AND juniors earn less for the same effort",units:"yes or no for each test",ex:["The case gives no pay figure, so neither test can be completed from the case."]});
 I.test = N("What we would measure to confirm it",{chg:"add",chgwhy:"The book's hypothesis is not tied to any data. The case supplies no figures, so the improved version states what you would pull to test it, which keeps it a hypothesis and not a finding.",u:[5],from:"none",def:"The data that would show whether the incentive scheme is the cause.",why:"It separates a confident answer from an overconfident one.",n:"Commission by tenure and by product first, then territory and travel data. None was supplied."});
 FN(I.test,{k:"rule",say:"The hypothesis is confirmed only if the data show juniors earning less commission than seniors for similar effort. If they earn the same, the cause is somewhere else.",f:"Confirmed if commission per hour (juniors) < commission per hour (seniors)",units:"$ per hour of effort",ex:["No commission or hours figures are given in the case."]});
 const hypI = N("Why do juniors leave when seniors stay? Working hypothesis: the incentive scheme",{chg:"ren",chgwhy:"The book's headline gives the answer. The improved root states the question and keeps the book's answer as a hypothesis to test.",u:[1,3,5],def:"The question the case asks, with the book's answer as the thing to check.",why:"It keeps you testing something, not asserting it.",n:"New hires leave in under 1 year; people with more than 3 years almost never leave. No figures are given.",
   split:"Work out how big the problem is, rule out leavers who are not a retention problem, rule out factors shared by both groups, test the pay scheme, then say what data would confirm it."},[I.size,I.b1,I.b2,I.b3,I.test]);
 FN(hypI,{k:"rule",say:"The hypothesis holds only if every test passes in order. A failure at any step moves the answer elsewhere.",f:"Hypothesis holds = problem is real AND leavers are voluntary AND shared factors ruled out AND incentives differ AND data confirm",units:"yes or no for each test",ex:["Only the second and third tests can be argued from the case. The rest need data the case never gives."]});
 FN(hypP,{k:"rule",say:"The book reasons by elimination: if the first two buckets are ruled out, the third is left.",f:"Cause = incentive scheme, if poor performance is out AND work conditions are the same",units:"yes or no for each bucket",ex:["Conditions the same for juniors and seniors: ruled out because seniors stay.","Performance: never tested in the case."]});
 return {src:"Booth 2025 · Case 19, p. 191", buildStep:3,
   lead:"The heavy attrition is due to the incentive structure of the client. I would like to begin by examining differences in the incentive structure for junior and senior employees.",
   printed:{hyp:hypP,kids:[A.b1,A.b2,A.b3]},
   improved:{hyp:hypI,kids:[I.size,I.b1,I.b2,I.b3,I.test],
     note:"The book's three buckets are kept and reworded as questions, because two of them are printed as conclusions. Added: a first branch that sizes the problem (what 'heavy' is measured against, who leaves, what each leaver costs), the three commission drivers from the brainstorm page, and a closing node saying what data would confirm the hypothesis."}};
})(),

"BTH-11": (()=>{
 const FN = (n,o)=>{ n.fn = o; return n; };
 /* ---------- printed ---------- */
 const A = {};
 A.dyn = N("What are the market dynamics?",{u:[2],from:"ask",def:"How the market behaves: whether it is growing, how many sellers there are and how they compete.",why:"It tells you whether growth or competition can explain a fall in profit.",n:"The market is fragmented and growing about 3% a year."});
 A.alt = N("No competition but are customers opting for alternate forms of energy?",{from:"none",def:"Whether customers are switching to other energy sources such as water, wind or nuclear.",why:"Switching would cut demand for coal-fired electricity.",n:"Never raised. Note that the book writes 'no competition' while the case says price is set by competitive forces."});
 A.shift = N("Shift in wholesaler vs. individual consumer consumption?",{u:[1,2],from:"ask",def:"Whether buyers are moving between buying through wholesalers and buying directly.",why:"A shift could change who the customer is and what price they pay.",n:"GPE sells through wholesalers to over 1 million customers. No shift is described."});
 A.mkt = N("Market",{u:[2],def:"The outside conditions the client sells into.",why:"These are things the client cannot change, so you check them to see whether they explain the problem.",n:"Fragmented, growing about 3% per year, price set by competition.",
   split:"The book asks three things of the market: what it looks like, whether customers are leaving for other energy, and whether the type of buyer has changed."},[A.dyn,A.alt,A.shift]);
 A.how = N("How is price set?",{u:[2],from:"ask",def:"Who decides the price per unit of electricity.",why:"If the client sets it, price is a lever. If the market sets it, it is not.",n:"Set by competitive forces, with one price for the whole year."});
 A.chg = N("Does it change over time?",{u:[2],from:"ask",def:"Whether the price moves during the year.",why:"A moving price would need tracking through the year.",n:"One price per year."});
 A.disc = N("Price discrimination",{u:[2],from:"ask",def:"Charging different customers different prices for the same electricity.",why:"If it exists, you would need prices by customer group.",n:"None: the case assumes the same price for all customers."});
 A.reg = N("Regulation by government",{u:[1],from:"given",def:"Whether the government sets or limits the price.",why:"A government-set price is not something the client can change.",n:"Transmission is highly regulated; usage is mostly deregulated, so the government does not set the price."});
 A.price = N("Price",{u:[2],def:"What the client earns per unit of electricity sold.",why:"It is half of revenue.",n:"Set by competition, one price a year, the same to all customers. This closes the branch.",
   split:"The book asks four questions about price: who sets it, whether it moves, whether customers differ, and whether the government steps in."},[A.how,A.chg,A.disc,A.reg]);
 A.hh = N("No. of households or customers",{u:[2],from:"ask",def:"How many customers buy electricity.",why:"Volume starts with the number of buyers.",n:"Over 1 million; a customer is a household or a business."});
 A.cvol = N("Competitor's volume",{from:"none",def:"How much electricity rivals sell.",why:"It shows the client's share of the market.",n:"Never given. The market is described only as fragmented."});
 A.growth = N("Market growth",{u:[2],from:"ask",def:"How fast total demand is rising.",why:"A growing market lifts volume without any action.",n:"About 3% per year."});
 A.vol = N("Volume",{u:[2],def:"How much electricity the client sells.",why:"It is the other half of revenue.",n:"Generated by demand. A market growing about 3% a year, with supply already meeting demand.",
   split:"Volume is how many customers there are, how much of the market rivals take, and how fast the whole market is growing."},[A.hh,A.cvol,A.growth]);
 A.rev = N("Revenue",{u:[2],def:"The money the client earns from selling electricity.",why:"One of the two sides of profit.",n:"The book closes it: no real opportunities, since the market sets price and supply meets demand.",
   split:"Revenue is price times volume, so those two are the only things that can change it."},[A.price,A.vol]);
 A.lease = N("Lease or own transmission lines?",{u:[2,3],from:"ask",def:"Whether the client owns the wires that carry electricity or pays to use someone else's.",why:"Leasing is a fixed payment that does not fall when output falls.",n:"GPE pays a fixed cost to lease transmission lines."});
 A.ofix = N("Other fixed costs",{u:[2],from:"ask",def:"Costs that stay the same whatever the output, such as the plants themselves.",why:"They must be paid even when sales fall.",n:"GPE runs 10 plants around the US. No cost figure is given."});
 A.fixed = N("Fixed Costs",{u:[2],def:"Costs that do not change with how much electricity is made.",why:"They stay when volume falls, so they hit profit hardest in a downturn.",n:"Transmission lease and 10 plants. No amounts given.",
   split:"The book lists the transmission lease and everything else that does not vary with output."},[A.lease,A.ofix]);
 A.raw = N("Raw material costs – coal, nuclear, hydro?",{u:[1,2],from:"given",def:"What the client pays for the fuel that makes the electricity.",why:"Fuel is usually the largest cost that changes with output.",n:"The case simplifies this to coal only, partly from GPE's own mines and partly from third parties."});
 A.labor = N("Labor",{u:[3],from:"none",def:"Wages and salaries of the people who run the plants.",why:"Staff cost varies with how many plants run and for how long.",n:"Never quantified. The model answer mentions that local labour may have changed."});
 A.var = N("Variable Costs",{u:[2],def:"Costs that rise and fall with how much electricity is made.",why:"They move with output.",n:"Coal is the main raw material. No amounts given.",
   split:"The book lists fuel and labour as the costs that move with output."},[A.raw,A.labor]);
 A.costs = N("Costs",{u:[2,3],def:"All the money the client spends to make and deliver electricity.",why:"It is the other side of profit, and the case's hypothesis lives here.",n:"The book's working hypothesis: costs are increasing. No cost trend or figure is ever shown.",
   split:"Costs are sorted by whether they change with output: fixed or variable."},[A.fixed,A.var]);
 const hypP = N("Profits",{u:[2,6],def:"What is left of revenue after costs. The case says it has declined for coal-generated electricity.",why:"The client's problem is a fall in profit, so profit is the top of the tree.",n:"Working hypothesis (book): increasing costs are causing the decline in profitability, since there are no real opportunities on the revenue side. No profit figure is given.",
   split:"Profit is what is left after costs come off revenue, so a decline is either a revenue problem or a cost problem. The book also checks the market, which can affect both."},[A.mkt,A.rev,A.costs]);
 FN(hypP,{k:"calc",say:"Profit is revenue minus costs. A fall in profit has to come from lower revenue, higher costs, or both.",f:"Profit = Revenue − Costs",units:"$ per year",ex:["The case gives no profit, revenue or cost figure. It says only that profit has declined."]});
 /* ---------- improved ---------- */
 const I = {};
 I.alt = NC(A.alt,{t:"Are customers switching to other energy sources?",chg:"ren",chgwhy:"The book writes 'No competition' on the same page where the case says price is set by competitive forces in a fragmented market. Both cannot be true, so the label is dropped and the question kept.",n:"Never raised. The case says price is set by competition, so competition exists."});
 I.mkt = NC(A.mkt,{n:"Fragmented, growing about 3% per year. The market sets price, so these are outside conditions, not causes.",split:"The market is checked for what it looks like, whether customers are switching away, and whether the type of buyer has changed."},[A.dyn,I.alt,A.shift]);
 FN(I.mkt,{k:"rule",say:"Market conditions are limits on what the client can do. They explain the profit decline only if they have worsened.",f:"Market explains the decline = conditions worsened AND client cannot control them",units:"yes or no for each condition",ex:["Growing about 3% a year, so demand has not fallen.","Price set by the market: a constraint, not a cause."]});
 FN(A.price,{k:"rule",say:"If price is set by the market, the client cannot raise it, so price is not a lever. That closes the branch.",f:"Lever = price, only if the client sets the price",units:"yes or no",ex:["Price is set by competitive forces, one price a year, the same for all customers: not a lever."]});
 FN(A.vol,{k:"calc",say:"Volume is customers times the electricity each uses. The case gives the customer count and market growth but no usage per customer.",f:"Volume = customers × units per customer",units:"customers × units of electricity per customer = units of electricity per year (the case gives no unit)",ex:["Over 1 million customers; market growing about 3% a year.","Usage per customer is never given."]});
 FN(A.rev,{k:"calc",say:"Revenue is the price per unit times the number of units sold.",f:"Revenue = Price × Volume",units:"$ per unit × units per year = $ per year",ex:["Price is set by the market and volume is generated by demand, so the case treats both as given: nothing for the client to change here."]});
 I.price = A.price; I.vol = A.vol; I.rev = A.rev;
 /* acquiring coal */
 I.trans = N("Moving the coal: rail or road",{chg:"add",chgwhy:"Added from the case's model answer: how coal reaches the plants is the first cost in the value chain.",u:[3],from:"ask",def:"How the coal is carried from the mines to the plants and how far.",why:"A cheaper route cuts the cost of every tonne.",n:"The model answer says it may travel some distance by rail or road. No distance or cost is given."});
 I.qual = N("Coal quality (energy content)",{chg:"add",chgwhy:"Added from the case's model answer: it is the sharp idea at this step.",u:[3],from:"ask",def:"How much energy a tonne of coal gives when burned.",why:"Coal that burns differently needs different handling, so cheap coal can cost more to use.",n:"Own and third-party coal differ in energy content. No numbers given."});
 I.risk = N("Supply risk and unions",{chg:"add",chgwhy:"Added from the case's model answer: it explains why the mine is worth keeping for control, not for the discount.",u:[3,4],from:"ask",def:"Things that can interrupt the coal supply: weather, politics in the mining regions and unionised labour.",why:"An interrupted supply forces costly purchases at short notice.",n:"The mines may be far from the plants. Hurricanes and political turmoil are the examples given."});
 I.pay = N("Price paid for coal",{chg:"add",chgwhy:"The book's 'raw material costs' covers it, but the case then splits coal by source, so price is shown by source.",u:[4],from:"ask",def:"The price per tonne GPE pays for coal from its own mine and from third parties.",why:"It is the number that looks like a saving.",n:"Own-mine coal is at a rate 30% cheaper than third-party coal. The market price is not given."});
 I.opp = N("Opportunity cost of own-mine coal",{chg:"add",chgwhy:"The case's one concept idea. The 30% discount is not a saving, because the same coal could be sold at the market price. The book never puts it in the framework.",u:[4],from:"none",def:"What GPE gives up by burning its own coal instead of selling it: the market price.",why:"The real cost of burning own coal is the sale you did not make, which is the same as buying coal from a third party.",n:"There is a large market for coal and every coal customer pays the same market price. The market price itself is never given."});
 FN(I.opp,{k:"calc",say:"Burning a tonne of your own coal costs what you could have sold it for. So the cost to GPE is the market price, whether it mines the coal or buys it. The case gives no price, so the illustration is ours.",f:"Cost of burning own coal = market price forgone (not 0.7 × third-party price)",units:"$ per tonne of coal",ex:["Illustration (ours, not from the case): if the market price were $100 per tonne, burning own coal costs $100 per tonne in forgone sales, the same as buying it, even though the books show $70 (30% below).","So the 30% is profit made by the mine, not a saving made by the power plant."],flag:"The $100 and $70 are ours; the case gives no coal price"});
 I.src = N("Own mine versus third-party mines",{chg:"add",chgwhy:"The case asks whether to keep the mine, which depends on how own-mine coal differs from bought coal. It has no place in the book's tree.",u:[3,4],from:"given",def:"The two sources of GPE's coal.",why:"They differ in price, quality and reliability.",n:"Partly from GPE's own mines, partly from third-party providers.",
   split:"The comparison runs on four points: the price paid, what the same coal could sell for elsewhere, how it burns, and how reliable the supply is."},[I.pay,I.opp,I.qual,I.risk]);
 FN(I.src,{k:"rule",say:"Keep the mine only if the reasons beyond price are strong enough. The price discount is cancelled by the opportunity cost.",f:"Keep the mine if control + diversification > 0, since price discount − opportunity cost = 0",units:"price in $ per tonne; the benefits are qualitative",ex:["Reasons the case gives to keep it: less volatility in supply, control of quality and labour, and a more diversified business."]});
 I.coal = N("Acquiring the coal",{chg:"move",chgwhy:"The book's 'Raw material costs' (variable cost) is moved here and widened to the first stage of the case's value chain, so it can hold transport, quality and the mine decision.",u:[3,4],from:"given",def:"The cost of getting coal to the plants.",why:"Coal is the main raw material, and the case's most important idea sits here.",n:"Coal is the main raw material. No cost split between stages is given.",
   split:"The cost of getting coal comes from moving it, from the sources it comes from, and from the ordinary price of the raw material."},[I.trans,A.raw,I.src]);
 FN(I.coal,{k:"calc",say:"Coal cost is the tonnes burned times the cost of each tonne, which depends on the source and the transport. The case gives no tonnes or prices, so there is no number here.",f:"Coal cost = tonnes burned × (price per tonne + transport per tonne)",units:"tonnes per year × $ per tonne = $ per year",ex:["Not given: tonnes, price per tonne or transport cost."]});
 /* generating electricity */
 I.old = N("Old generators",{chg:"add",chgwhy:"Added from the case's model answer: old equipment wastes fuel.",u:[3,6],from:"ask",def:"Generating units that are old and run less efficiently.",why:"An old unit burns more coal for the same electricity.",n:"The model answer says the generators may be old. No age or efficiency is given."});
 I.plants = NC(A.ofix,{t:"Ten plants run differently (other fixed costs)",chg:"move",chgwhy:"The book's 'Other fixed costs' held the 10 plants. It is moved to generation, where the plants belong.",u:[2,3],n:"GPE runs 10 plants around the US. The model answer says differences in how they run may add volatility. No cost is given."});
 I.law = N("New environmental rules",{chg:"add",chgwhy:"Added from the case's model answer: it is an outside cause of higher generation cost.",u:[3],from:"ask",def:"Laws that make burning coal more expensive.",why:"They raise cost without any change in how the plant is run.",n:"The model answer says new environmental laws may have come into force. None is named."});
 I.lab = NC(A.labor,{chg:"move",chgwhy:"The book lists labour under variable costs. It is moved to generation, where plant staff work.",u:[3],n:"The model answer says other industries or competitors nearby may have changed the availability of labour. Never quantified."});
 I.util = N("Utilisation of the plants",{chg:"add",chgwhy:"The case's last question is the utilisation target. It is a generation issue the book's tree has no place for.",u:[5],from:"given",def:"How much of the plants' capacity is used on average.",why:"A utility must meet peak demand, so it keeps spare capacity, and running at 100% is not possible.",n:"GPE runs at 80%. The CEO wants 90%. The industry average is 77%. Demand is cyclical."});
 FN(I.util,{k:"calc",say:"Utilisation is the electricity actually made divided by what the plants could make. Because the plants must cover the peak, average utilisation cannot approach 100%.",f:"Utilisation = output ÷ capacity;   ceiling = average demand ÷ peak demand",units:"output and capacity in units of electricity per year; utilisation in %",ex:["GPE 80% against industry 77%: 80 − 77 = 3 percentage points above average.","CEO's target 90% against 80% today: 90 − 80 = 10 percentage points more. The case never values this."]});
 I.gen = N("Generating the electricity",{chg:"move",chgwhy:"The book has no generation node. Its fixed costs for the plants and its labour node are moved here, because the case's value chain has generation as its second stage.",u:[3,5,6],def:"The cost of turning coal into electricity.",why:"It covers the plants, the people who run them and how hard they are worked.",n:"10 coal plants. No cost figure is given.",
   split:"Generation cost depends on the state of the equipment, how the ten plants are run, the staff, the rules the plants must meet, and how heavily they are used."},[I.old,I.plants,I.lab,I.law,I.util]);
 FN(I.gen,{k:"calc",say:"Generation cost is the sum of what it takes to run the plants: equipment and upkeep, staff, and any compliance cost. Utilisation spreads the fixed part over more or fewer units.",f:"Generation cost = plant fixed cost + labour + compliance;   cost per unit = generation cost ÷ units produced",units:"$ per year; cost per unit in $ per unit of electricity",ex:["No cost for any term is given in the case."]});
 /* transmitting */
 I.dist = N("Distance to customers and line losses",{chg:"add",chgwhy:"Added from the case's model answer: electricity is lost on the way and longer lines cost more.",u:[3],from:"ask",def:"How far electricity travels to reach customers, and how much is lost on the way.",why:"Each unit lost is paid for but not sold.",n:"The model answer suggests finding customers closer to the plants and checking the lines for repairs. No distance or loss figure is given."});
 I.share = N("Sharing contract for the lease",{chg:"add",chgwhy:"Added from the case's model answer as the saving the lease branch points to.",u:[3,6],from:"ask",def:"An agreement to share transmission capacity so the lease is cheaper.",why:"It is a way to cut a fixed cost without changing the lines.",n:"Named in the model answer and as a risk in the recommendation. No saving is given."});
 I.lease = NC(A.lease,{chg:"move",chgwhy:"Moved out of 'Fixed Costs' into its own stage, transmitting, since the value chain treats transmitting as the third step.",u:[2,3],n:"GPE pays a fixed cost to lease transmission lines. Wires are mostly government controlled. The lease amount is never given."});
 I.tx = N("Transmitting the electricity",{chg:"move",chgwhy:"The book's 'Lease or own transmission lines?' sat under fixed costs. It becomes the third stage of the cost chain, with the case's own ideas for cutting it.",u:[3,6],def:"The cost of carrying electricity from the plants to customers.",why:"It is a fixed payment that does not shrink when output does.",n:"A fixed lease on lines that are mostly government controlled. No amount given.",
   split:"Transmission cost is the lease for the lines, plus the cost of distance and loss, minus any saving from sharing."},[I.lease,I.dist,I.share]);
 FN(I.tx,{k:"calc",say:"Transmission cost is the fixed lease, plus the value of the electricity lost on the way. The case gives no figure for either, so there is no number here.",f:"Transmission cost = lease + value of electricity lost",units:"$ per year",ex:["Lease: fixed, paid every year; amount not given.","Losses: not given."]});
 I.costs = N("Costs",{chg:"ren",chgwhy:"The book splits costs into fixed and variable. The case then asks you to walk the chain of acquiring, generating and transmitting, so the improved version splits by that chain and keeps the book's own boxes inside it.",u:[2,3,4,5,6],def:"All the money the client spends to make and deliver electricity.",why:"It is where the case says to look, by elimination.",n:"The book's working hypothesis: costs are increasing. No cost trend or figure is ever shown.",
   split:"Costs follow the electricity from the mine to the customer: getting the coal, turning it into power, then carrying it. Every cost in the book falls in one of these three, so splitting this way leaves nothing out."},[I.coal,I.gen,I.tx]);
 FN(I.costs,{k:"calc",say:"Total cost is the cost of each stage added together. All three are in $ per year, so they can be summed.",f:"Costs = coal + generation + transmission",units:"$ per year for each term",ex:["The case gives no figure for any stage, so you never learn which is largest."]});
 FN(A.costs,{k:"calc",say:"The book splits cost by behaviour, fixed or variable, and the two add to the total.",f:"Costs = fixed costs + variable costs",units:"$ per year for each term",ex:["No fixed or variable amount is given in the case."]});
 FN(A.fixed,{k:"calc",say:"Fixed cost is the sum of the items that do not change with output.",f:"Fixed costs = transmission lease + other fixed costs",units:"$ per year",ex:["Amounts are not given."]});
 FN(A.var,{k:"calc",say:"Variable cost is fuel plus labour: costs that move with output.",f:"Variable costs = raw material + labour",units:"$ per year",ex:["Amounts are not given. Raw material is simplified to coal."]});
 const hypI = N("Profits",{chg:"ren",chgwhy:"Same root as the book, with the working hypothesis reached by elimination and the missing figures flagged.",u:[2,6],def:"What is left of revenue after costs. The case says it has declined for coal-generated electricity.",why:"The client's problem is a fall in profit.",n:"Working hypothesis (book): increasing costs cause the decline, since revenue has no real opportunity. This is a conclusion by elimination. The case shows no cost, revenue or profit figure.",
   split:"Profit is revenue minus cost. The market is checked first because it can explain either side. Revenue is closed because price is market-set and volume is driven by demand, so the case moves to cost."},[I.mkt,I.rev,I.costs]);
 FN(hypI,{k:"calc",say:"Profit is revenue minus costs, and the opportunity cost of owning the coal mine is a further cost to count against profit. The case gives no figures, so the formula is what matters.",f:"Profit = (Price × Volume) − (coal + generation + transmission);   economic profit = Profit − opportunity cost of own coal",units:"$ per year; price in $ per unit of electricity; volume in units of electricity per year",ex:["Price and volume are market-set, so revenue is treated as given.","So any fall in profit has to come from the cost terms, which is a deduction, not something shown by figures."]});
 return {src:"Booth 2025 · Case 11, p. 139", buildStep:2,
   lead:"Increasing costs are causing the decline in profitability since there are no real opportunities on the revenue side.",
   printed:{hyp:hypP,kids:[A.mkt,A.rev,A.costs]},
   improved:{hyp:hypI,kids:[I.mkt,I.rev,I.costs],
     note:"Same three branches as the book. Changes: the false 'No competition' label is replaced by a question, and costs are split by the value chain the case walks (coal, generation, transmission) with the book's fixed and variable boxes moved into it. Added from the case: the mine and its opportunity cost, and the utilisation target."}};
})()
}));
SRCFW["BTH-05"] = (()=>{
 /* ---------- Cleaning Products, printed (Booth 2025, Case 5, p. 96: 'a simple internal/external factors framework') ---------- */
 const A = {};
 A.price = N("Price (relative and absolute) / price elasticity",{u:[2,3,4],from:"given",def:"What the product sells for, both on its own and compared with rivals, and how much the number of units sold changes when the price changes (price elasticity).",why:"Price is one of the two things that make up revenue, and it is the lever the case ends up using.",n:"The exhibit gives one price change per product line: −2%, +1%, 0%, +2%, +4%. Research says volumes stay unchanged at those prices, so no elasticity is ever calculated."});
 A.qty = N("Quantity, product mix, channel mix (grocery vs low cost vs bulk (e.g. Costco))",{u:[2,3],from:"ask",def:"How many units are sold, which of the client's products they come from, and through which kind of store they are sold.",why:"Quantity is the other half of revenue. Mix and channel say where the units come from.",n:"Mix is five products, learned by asking. Volumes are held unchanged in the exhibit. Channel mix is never discussed."});
 A.rev = N("Revenues",{u:[2,3,4,5],from:"ask",def:"Money coming in from selling the client's products, before any cost comes off.",why:"Cost and new products are closed in this case, so revenue is the only place left to look.",n:"$3 billion last year.",
   split:"Revenue is price times quantity, so those are the two things that can move it. The book groups product mix and channel mix with quantity because both change how many units are sold."},[A.price,A.qty]);
 A.fixed = N("Fixed costs (PP&E, SG&A, advertising, etc.)",{u:[],from:"none",def:"Costs that stay the same however many units are made: property, plant and equipment (PP&E), selling, general and administrative expenses (SG&A), advertising.",why:"They do not move with volume, so they decide how much of any extra revenue is kept.",n:"Never split out. The interviewer says there are no cost savings available."});
 A.var = N("Variable costs (labor at factories, raw material such as plastic, shipping, etc.)",{u:[],from:"none",def:"Costs that rise and fall with the number of units made and shipped.",why:"They are what each extra unit costs to make and deliver.",n:"Never split out. With volumes unchanged in the exhibit, they would not move."});
 A.exp = N("Expenses",{u:[2,5],from:"ask",def:"The money the client spends to make and sell its products.",why:"Profit is revenue less expenses, so cost is the other place profit can improve.",n:"Closed in step 2: no opportunities in cost savings. The book's own next steps still list a cost-cutting diagnostic, which contradicts that.",
   split:"Costs are sorted by whether they change with volume: fixed ones do not, variable ones do. That tells you which costs rise if more is sold."},[A.fixed,A.var]);
 A.int = N("Internal",{u:[2,3,4,5],def:"Factors the client controls: what it earns and what it spends.",why:"Internal levers are the ones the client can pull itself.",n:"Only revenue is open. Price on the existing five products is the lever used.",
   split:"What the client controls comes down to money in and money out, which together are profit."},[A.rev,A.exp]);
 A.mkt = N("Market (growth, percent share)",{u:[2],from:"none",def:"How fast the whole category is growing, and what share of it the client holds.",why:"Unit sales can rise because the market grows or because the client takes share from rivals.",n:"Named in the model answer as the slow way to raise volume. The case gives no market size, growth rate or share."});
 A.comp = N("Competition (new entrants, differentiation, price)",{u:[5],from:"none",def:"Other makers of cleaning products: new arrivals, how different their products are, and what they charge.",why:"Rivals decide whether customers stay when your price rises.",n:"Only appears as a risk in step 5: if competitors lower prices, the client may lose customers and revenue."});
 A.cust = N("Customers (preference, trend toward environmentally friendly products)",{u:[],from:"none",def:"Who buys the products, what they prefer, and where their tastes are heading.",why:"Customer taste decides whether a price rise is accepted.",n:"Never used. The only link is the step 5 risk that the research may not reflect the client's geographic and demographic market."});
 A.ext = N("External",{u:[2,5],def:"Factors outside the client's control: the market, rivals and buyers.",why:"They are the conditions the internal plan has to survive.",n:"Used only to name risks in step 5.",
   split:"Outside the firm there is the size and growth of the market, the competitors in it, and the customers who buy. These are three separate parties, and any one of them can stop a plan that looks good internally."},[A.mkt,A.comp,A.cust]);
 const hypP = N("Doing better in the market: a simple internal / external factors framework",{u:[1,2],from:"given",def:"The book offers an internal and external split as 'illustrative of a backbone that ought to be fleshed out in greater detail'. It carries no hypothesis.",why:"It gives you a list of places to look so you can decide what to ask the client first.",n:"The prompt only says the client wants to 'do better in the market'. The case turns on revenue, specifically price.",
   split:"Everything that could change how well the client does is either inside the firm (what it earns and spends) or outside it (market, rivals, customers). The two do not overlap."});

 /* ---------- improved ---------- */
 const I = {};
 I.meas = N("Which measure: growth, share or profit",{chg:"add",chgwhy:"The book tells the interviewer to steer the candidate toward asking what 'doing better' means, but its framework has no place for the answer. Without it the structure has no target.",u:[1,2],from:"ask",def:"Which of growth, market share or profit the client means by 'do better'.",why:"The objective decides which branches matter. Cost matters for profit, price for revenue.",n:"The case never answers directly. Step 2 concludes that revenue is the only open lever, and step 4 gives a revenue target."});
 I.tgt = N("Target: a 1% revenue increase",{chg:"add",chgwhy:"The target arrives in step 4 as an aside, yet without it the $39M result cannot be judged. It belongs in the structure from the start, as the number the answer is compared with.",u:[4],from:"ask",def:"The smallest revenue gain the client would be happy with.",why:"It is the pass mark for the price change.",n:"1% of $3,000M = $30M."});
 I.tgt.fn = {k:"calc",say:"The target in dollars is the percentage the client wants times last year's revenue.",f:"Target = 1% × $3,000M",units:"% × $M = $M",ex:["1% × $3,000M = $30M."]};
 I.obj = N("Objective: what 'do better' means, and by how much",{chg:"add",chgwhy:"The book's two branches both start after the objective is known. In the case the first questions are about the objective, so it is shown as its own branch.",u:[1,4],from:"ask",def:"What the client is trying to improve and the size of improvement it wants.",why:"A vague goal cannot be tested. This turns it into a number.",n:"The measure is never stated outright. The target, once asked, is +1% revenue, or $30M.",
   split:"A goal has two parts: what is being measured and how much of it is wanted. Both must be known before any lever can be judged."},[I.meas,I.tgt]);
 I.price = NC(A.price,{chg:"ren",chgwhy:"The exhibit is titled 'Price Elasticity' but states that volumes do not change, which means the elasticity is zero and is never used. The node is renamed for what the case really uses: a price change on each line with volume held. Relative price (against rivals) is not in the case.",t:"Price change by line, with volume held (elasticity 0)",def:"The percentage change to the price of each product line, with the number of units sold held at last year's level.",why:"With volume fixed, price is the only thing that changes revenue.",n:"−2%, +1%, 0%, +2%, +4% on the five lines. Volumes are unchanged, so elasticity is zero in every line.",u:[3,4]});
 I.price.fn = {k:"calc",say:"Price elasticity is the percentage change in volume divided by the percentage change in price. The research says volume does not move, so the numerator is zero in every line and the elasticity is zero.",f:"E = {% change in volume|% change in price}",units:"% ÷ % = a plain number with no unit",ex:["Shower gel: {0%|+2%} = 0.","All-purpose soap: {0%|+4%} = 0.","Hand wash has a 0% price change, so the ratio is undefined for that line. Volume is held there too."]};
 I.qty = NC(A.qty,{n:"Held unchanged in every line by the research. Mix is the five products listed in step 2. Channel mix is never discussed.",u:[2,3,4]});
 const L = (t,share,g,u0)=>{ const r = 3000*share/100, d = r*g/100; return {t,share,g,r,d}; };
 const ls = [L("Dish washing powder",5,-2),L("Clothes detergent powder",20,1),L("Hand wash liquid",30,0),L("Shower gel",30,2),L("All-purpose soap",15,4)];
 const sg = x=> (x>0?"+":x<0?"−":"")+"$"+Math.abs(x)+"M";
 const lineNodes = ls.map(l=>{
   const n = N(l.t,{chg:"add",chgwhy:"The book names 'product mix' but never lists the five lines. The case's arithmetic is done one line at a time, so each line needs its own node.",u:[2,3,4],from:"calc",def:"One of the client's five product lines: "+l.share+"% of revenue, with a price change of "+(l.g>0?"+":l.g<0?"−":"")+Math.abs(l.g)+"%.",why:"Its dollar change is its revenue times its price change.",n:l.share+"% × $3,000M = $"+l.r+"M last year. "+(l.g===0?"No price change, so $0":"A "+(l.g>0?"+":"−")+Math.abs(l.g)+"% price change gives "+sg(l.d))+", leaving $"+(l.r+l.d)+"M."});
   n.fn = {k:"calc",say:"The change in a line's revenue is its revenue last year times its price change. The line's revenue is its share times total revenue.",f:"ΔR = share × $3,000M × price change",units:"% × $M × % = $M",ex:[l.share+"% × $3,000M × "+(l.g>0?"+":l.g<0?"−":"")+Math.abs(l.g)+"% = "+(l.d===0?"$0":sg(l.d))+".","New revenue: $"+l.r+"M "+(l.d<0?"−":"+")+" $"+Math.abs(l.d)+"M = $"+(l.r+l.d)+"M."]};
   return n; });
 const tot = ls.reduce((a,l)=>a+l.d,0), top2 = ls[3].d+ls[4].d;
 if(tot!==39||top2!==36) throw new Error("arith");
 I.byline = N("Revenue by product line",{chg:"add",chgwhy:"The book's revenue branch stops at price and quantity. The case is solved by splitting the $3,000M across the five lines and weighting each price change by its line's revenue, so that step is made explicit.",u:[3,4],from:"calc",def:"The $3,000M of revenue split across the five products, with the dollar change in each from its price change.",why:"Price changes are percentages of different bases, so they cannot be added. The dollar changes can.",n:"Changes of −$3M, +$6M, $0, +$18M and +$18M add to +$39M. New revenue is $3,039M.",
   split:"The five children are the five products the interviewer lists. They cover all of revenue, so their dollar changes add to the total change."},lineNodes);
 I.byline.fn = {k:"calc",say:"Add the dollar change from each line. Do not add the percentages. Each percentage applies to a different amount of money, so the percentages cannot be added or averaged without weighting them by revenue.",f:"ΔR = Σ (wᵢ × $3,000M × gᵢ),   then   % change = {ΔR|$3,000M}",units:"w and g in %; $M per line; ΔR in $M; % change in %",ex:["−$3M + $6M + $0 + $18M + $18M = +$39M.","New revenue = $3,000M + $39M = $3,039M.","As a share of revenue: {$39M|$3,000M} = 1.3%, against the 1% target.","Weighted average price change: (5% × −2%) + (20% × 1%) + (30% × 0%) + (30% × 2%) + (15% × 4%) = −0.1% + 0.2% + 0% + 0.6% + 0.6% = 1.3%.","A plain average of the five changes would be {−2 + 1 + 0 + 2 + 4|5} = 1.0%, which gives $30M. That is wrong, because it treats the $150M line and the $900M lines as equal.","Shower gel and all-purpose soap give $18M + $18M = $36M of the $39M."]};
 I.rev = NC(A.rev,{split:"Revenue is price times quantity. Quantity is held, so price decides the change, and the case works it out one product line at a time."},[I.price,I.qty,I.byline]);
 I.rev.fn = {k:"calc",say:"Revenue is price times quantity for each line. Quantity is held at last year's level, so the change in revenue comes only from price.",f:"R = Σ (pᵢ × qᵢ),   ΔR = Σ (Rᵢ × gᵢ)  when Δq = 0",units:"p in $ per unit; q in units; R in $ per year",ex:["Last year R = $3,000M. Price and quantity are not given separately, only revenue by line.","With each line's price up by gᵢ and units unchanged, its revenue is multiplied by (1 + gᵢ).","ΔR = +$39M, so R = $3,039M."]};
 I.exp = NC(A.exp,{chg:"cut",chgwhy:"The book's fixed and variable cost breakdown is removed. The interviewer says there is no opportunity in cost, so a cost branch with sub-branches is the 'big cost section' that wastes time. You still draw it when you first present the framework, then prune it once told. The node stays as a closed line, since step 5 still has to say whether the $39M survives any extra cost.",n:"Closed: no cost savings available. The case gives no cost figure. The book's risks note that advertising to explain a price rise could eat into the $39M.",u:[2,5]},[]);
 I.exp.fn = {k:"calc",say:"Expenses are the sum of fixed and variable costs. The case gives neither figure, so there is nothing to compute.",f:"C = fixed + variable",units:"$ per year for each term",ex:["No cost figure is given. The interviewer closes this branch."],flag:"Formula is general, not from the case"};
 I.int = NC(A.int,{split:"What the client controls is money in and money out. Money out is closed, so the work is on money in."},[I.rev,I.exp]);
 I.int.fn = {k:"calc",say:"Profit is revenue minus expenses. If expenses do not change, any change in revenue changes profit by the same amount.",f:"π = R − C,   Δπ = ΔR − ΔC",units:"$ per year",ex:["ΔR = +$39M.","The case gives no cost change. If ΔC = 0, then Δπ = +$39M.","Any extra cost, such as advertising to explain the price rise, would reduce this."],flag:"Cost change of zero is our assumption. The case gives no cost figure."};
 A.int.fn = {k:"calc",say:"Profit is revenue minus expenses. The book gives no formula, but this is the relationship the two branches share.",f:"π = R − C",units:"$ per year",ex:["Revenue was $3,000M last year. Expenses are never given."],flag:"Our framing, not stated in the book"};
 A.rev.fn = {k:"calc",say:"Revenue is price times quantity, added up over the product lines.",f:"R = Σ (pᵢ × qᵢ)",units:"p in $ per unit × q in units = $ per year",ex:["R = $3,000M last year.","Price and quantity are not given separately, only revenue by product line."]};
 A.price.fn = {k:"calc",say:"Price elasticity is the percentage change in volume divided by the percentage change in price. The book names it in the framework but the case never calculates it.",f:"E = {% change in volume|% change in price}",units:"% ÷ % = a plain number with no unit",ex:["The research says volume is unchanged in every line, so the percentage change in volume is 0%."]};
 A.qty.fn = {k:"calc",say:"Units sold by a line are its share of the market times the size of the market. Mix and channel say which lines and which stores they come from.",f:"q = share × market volume",units:"% × units per year = units per year",ex:["The case gives neither share nor market volume. Units are held unchanged."],flag:"Our framing, not stated in the book"};
 A.exp.fn = {k:"calc",say:"Expenses are the sum of fixed and variable costs.",f:"C = fixed + variable",units:"$ per year for each term",ex:["No cost figure is given. The interviewer closes this branch."],flag:"Formula is general, not from the case"};
 A.mkt.fn = {k:"calc",say:"Volume rises either because the market grows or because the client's share of it rises.",f:"q = share × market volume",units:"% × units per year = units per year",ex:["The case gives no market size, growth or share. The model answer calls this the slower route."],flag:"Our framing, not stated in the book"};
 A.comp.fn = {k:"rule",say:"A price rise holds only if rivals do not undercut it. This is a yes-or-no check, not arithmetic.",f:"Price rise holds = rivals do not cut prices",units:"yes or no",ex:["The research assumes the status quo. A competitor price cut is a named risk in step 5."]};
 A.cust.fn = {k:"rule",say:"The research result carries over only if the customers it covers match the client's real customers. This is a yes-or-no check.",f:"Result holds = research sample matches the client's markets",units:"yes or no",ex:["Step 5 raises the risk that the research did not reflect the client's geographic or demographic market."]};
 A.ext.fn = {k:"rule",say:"External factors are not added to internal ones. They are checks on whether the internal result will survive.",f:"Result survives = market OK AND competition OK AND customers OK",units:"yes or no for each",ex:["The case names competitor response and the research's coverage as the risks."]};
 I.qty.fn = A.qty.fn;
 I.mkt = A.mkt, I.comp = A.comp, I.cust = A.cust;
 I.ext = A.ext;
 hypP.fn = {k:"rule",say:"The book's framework is a checklist of places to look. Nothing is calculated between the two branches.",f:"Look inside the firm, then outside it",units:"no units",ex:["The case's arithmetic belongs to Revenues, in step 4."]};
 const hypI = N("Should the client raise prices on all five lines at once?",{u:[1,4,5],from:"given",def:"The decision the case reaches in step 4: go ahead with the price change or not.",why:"Naming the decision first gives the branches something to test.",n:"Yes. Revenue rises $39M against a $30M target, with three risks named.",
   split:"A yes needs three things: a clear target, a way of earning it inside the firm, and conditions outside the firm that let it stand. The first is the objective, the second is internal, the third is external."});
 hypI.fn = {k:"rule",say:"Go ahead if the revenue gain reaches the target, and the risks are named. The comparison is in dollars.",f:"Go ahead if ΔR ≥ target",units:"ΔR and target in $M",ex:["ΔR = +$39M, target = $30M.","$39M ≥ $30M, so go ahead, with the three risks in step 5 named."]};
 return {src:"Booth 2025 · Case 5, p. 96", buildStep:2,
   lead:"A simple internal/external factors framework is effective here, but any number of frameworks could work well.",
   printed:{hyp:hypP,kids:[A.int,A.ext]},
   improved:{hyp:hypI,kids:[I.obj,I.int,I.ext],
     note:"The book's internal and external branches are kept with its wording. Changes: an objective and target branch is added, the price node is renamed because elasticity is never used, revenue is split by product line so the $39M can be built up, and the cost branch is cut back to a closed line."}};
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
/* Block One rewrites (2026-10): full replacement entries in the new clear/sequential standard */
Object.assign(CONCEPT, {"Structure without data": {"plain": "A structure is a set of groups, or buckets, that together cover a question, so that you can work through it one part at a time. 'Structure without data' means building that set of buckets when the case gives you almost no numbers, only a short description of the situation. Each bucket should be written as a question you could answer by measuring something, not as a statement that something is true. For example, 'do juniors and seniors cover the same territories?' can be checked against territory records, while 'working conditions are similar' can only be believed or doubted.", "why": "When a case supplies no figures, the way you organise the problem is the whole of your answer, and there is no calculation to fall back on. Buckets written as conclusions cannot be tested, so they leave the interviewer with nothing to check. Buckets written as questions each point to a piece of evidence you would ask for, which shows how you would reach an answer.", "eg": "In general: asking why one store in a chain loses customers while a similar store does not, and splitting the question into what the two stores sell, where they are, and how they are run. In Heavy Attrition: splitting 'why do juniors leave and seniors stay' into what they sell, where they sell it, and what they are paid for it.", "math": {"forms": [{"label": "Structure for Heavy Attrition (ours)", "f": "Difference between juniors and seniors = what they sell + where they sell + how they are paid", "tree": {"s": "What differs between juniors and seniors?", "d": "the question the three buckets must cover", "op": "+", "k": [{"s": "What they sell", "d": "can juniors sell every product line, or only some?"}, {"s": "Where they sell", "d": "do they cover the same territories and travel the same distances?"}, {"s": "What they are paid", "d": "is the commission rate, and the products it applies to, the same for both?"}]}}], "read": ["Start from the question, then split it into buckets that do not overlap and together cover it", ["Each bucket is a question, not a claim", "Each bucket names something you could measure"], "Only keep a bucket if the two groups could differ on it", ["Anything true of both groups, such as the industry or the pay scale, cannot explain why only one group leaves"]], "work": [["Heavy Attrition (the labels are ours; the case gives no figures)", ["Fact 1: new hires stay less than 1 year", "Fact 2: staff with more than 3 years have almost no attrition", ["Same company, same industry, same product, so the cause must be something that differs between the two groups"], "Bucket 1: what they sell", "Bucket 2: where they sell", "Bucket 3: what they are paid"]]], "watchSteps": {"mistake": "Writing each bucket as a conclusion instead of something you can test.", "why": "The casebook's own framework says 'work conditions similar across all employees'. That is an assumption stated as if it were a finding. An interviewer cannot check it, and if it is wrong the whole structure is wrong with it.", "syms": {}, "steps": [{"say": "Start with what the case actually tells you. New hires stay less than one year, a new salesperson needs about 6 months to learn the job, and people with more than 3 years of service almost never leave."}, {"say": "Take away what is true of both groups. The company, the industry and the products on offer are the same for juniors and seniors, and seniors stay, so these cannot explain why juniors leave."}, {"say": "What remains must differ between the two groups. Name each difference as a bucket: what they sell, where they sell it, and how they are paid."}, {"say": "Turn each bucket into a question you could answer with data. Instead of 'work conditions are similar', ask 'do juniors and seniors cover the same territories?'", "f": "'work conditions are similar'  →  'do juniors and seniors cover the same territories?'"}, {"say": "Say out loud what you are assuming. Here you are assuming the work itself is similar for both groups, and you would check that first."}], "rule": "Write every bucket as a question you could answer by measuring something, and say your assumptions aloud."}}, "here": "Heavy Attrition gives only three facts: new hires stay less than 1 year, they need about 6 months to get up to speed, and staff with more than 3 years almost never leave. There are no figures for pay, commission, territories or distance. So the structure is the whole answer. The casebook splits the problem into what juniors sell, where they sell it and what they are paid, and the useful version of each bucket is a question about whether juniors and seniors differ on it.", "big": "Most other cases hand you numbers and the structure follows from them. This is the case where there are none. Electric Utility is the opposite situation: there the framework is a standard profit tree and the difficulty lies in one idea inside it. Any later case that opens with a vague question and no data asks for the same skill.", "without": "You would list possible causes of attrition in general, such as pay, management or workload, with nothing to separate them. Or you would copy the casebook's framework, which states its answer in its own headline, and have nothing to say when the interviewer asks how you would find out whether it is true.", "formula": "structure = buckets that together cover the question, each written as something you could measure", "met": "Heavy Attrition"}, "Opportunity cost": {"plain": "Opportunity cost is what you give up by choosing one use of something instead of the best alternative use. If you own a resource, using it yourself is not free, because you could have sold it or used it elsewhere. It is measured as the value of that best alternative, usually the price it would fetch. For example, if you own a flat that you could rent out for $2,000 a month, living in it costs you $2,000 a month in rent you do not receive, even though no bill arrives.", "eg": "In general: a farmer who grows wheat on land that could be leased out; a student who studies for a year instead of earning a salary. In Electric Utility: GPE burning coal from its own mine that it could have sold at the market price.", "why": "It is the cost most often missed in a case, because it never appears on an invoice or in the accounts. A figure such as 'our own coal costs 30% less' compares only what has been paid. The real question is what the company gives up by using the coal itself, and that can remove the apparent saving.", "math": {"forms": [{"f": "Cost of using it yourself = what you could have sold it for", "tree": {"s": "Opportunity cost per tonne", "d": "the true cost of burning your own coal", "op": "=", "k": [{"s": "P", "d": "the market price per tonne that other buyers would pay"}]}}, {"label": "The apparent saving", "f": "Apparent saving = P − book cost", "tree": {"s": "Apparent saving per tonne", "d": "what the accounts seem to show", "op": "−", "k": [{"s": "P", "d": "the market price per tonne"}, {"s": "book cost", "d": "what the mine charges the power plants per tonne"}]}}], "read": ["Compare the choice you made with the best choice you gave up, not with doing nothing", ["The mine's internal price is a bookkeeping number", "The market price is what the coal is really worth"], "If the real cost equals the market price, buying the same coal costs the same as using your own", ["So the saving depends on the mine's own profit, not on the internal price"]], "work": [["Electric Utility (the $100 is ours; the case gives no price)", ["Assume the market price of coal is P = $100 a tonne", "Own-mine coal is 30% cheaper than third-party coal, and third-party coal sells at the market price", "Own-mine book cost = $100 × (1 − 0.30) = $70 a tonne", "Apparent saving = $100 − $70 = $30 a tonne", "Opportunity cost of burning it = $100 a tonne, the sale given up", "Real saving against buying = $100 − $100 = $0 a tonne"]]], "watchSteps": {"mistake": "Treating the 30% discount on own-mine coal as a real saving.", "why": "The case says all coal customers pay the same market price and there is a large market for coal. So every tonne GPE burns is a tonne it could have sold at that price. The cost of burning it is therefore the market price, which is the same as buying the coal.", "syms": {"P": "market price of coal per tonne (ours: $100)", "b": "book cost of own-mine coal per tonne", "s": "apparent saving per tonne"}, "steps": [{"say": "The case gives no coal price, so we use an illustrative market price of $100 a tonne. This is ours, not the case's. Call it P.", "f": "P = $100 a tonne"}, {"say": "The case says own-mine coal is 30% cheaper than third-party coal. Third-party coal costs the market price, so the book cost of own-mine coal is 70% of P. Call it b.", "f": "b = P × (1 − 0.30) = $100 × 0.70 = $70 a tonne"}, {"say": "The apparent saving is the market price less the book cost. Call it s. This is the figure the accounts seem to show.", "f": "s = P − b = $100 − $70 = $30 a tonne"}, {"say": "Now ask what GPE gives up by burning a tonne. It could instead have sold that tonne to another buyer at the market price, so the opportunity cost is P.", "f": "opportunity cost = P = $100 a tonne"}, {"say": "Compare burning your own tonne with buying one from a third party. Burning it costs $100 in forgone sales, buying costs $100 in cash, so the difference is zero.", "f": "$100 − $100 = $0 a tonne"}], "rule": "Value what you own at what it could be sold for, not at what it cost you."}}, "here": "In Electric Utility, GPE gets coal from its own mines at a rate 30% below third-party mines. The case also says there is a large market for coal and that all coal customers pay the same market price. So each tonne GPE burns is a tonne it could have sold at that price. The cost of burning it is therefore the market price, and the 30% is not a saving. The casebook gives no coal price, so it makes this point in words only. The reason to keep the mine is control, not the discount: secure supply and control of coal quality.", "big": "This is the idea behind every 'should we do this' question: compare with the best alternative, not with doing nothing. Army Hotel touches it when the $20M outlay could have earned a return elsewhere. Any internal transfer priced below market, such as one division selling to another, has the same trap.", "without": "You would recommend keeping the mine because it looks 30% cheaper, and you would count a saving that does not exist. You would also miss the question the interviewer is waiting for, which is what GPE could earn by selling that coal to someone else.", "formula": "opportunity cost = value of the best alternative you give up", "met": "Electric Utility"}, "Value chain": {"plain": "A value chain is the sequence of steps a business goes through to turn raw inputs into something a customer buys, listed in the order they happen. Each step adds cost, and each step can go wrong in its own way. You draw it by asking what has to happen first, what next, and so on until the customer is served. For example, a bakery's chain is buying flour, baking, delivering to shops and selling.", "eg": "In general: a clothing retailer's chain of design, manufacture, shipping, storage and sale. In Electric Utility: acquiring coal, generating electricity, and transmitting it to customers.", "why": "When you know a problem sits in the costs but not where, a list of costs is hard to organise and easy to leave gaps in. Walking the chain gives you a small number of places to look, in order, and you can ask what could go wrong at each. It also shows which stages have outside causes, such as environmental rules or weather.", "math": {"forms": [{"label": "Cost by stage (ours: structure only)", "f": "Total cost = cost of acquiring coal + cost of generating + cost of transmitting", "tree": {"s": "Total cost of delivered electricity", "d": "what GPE pays to get power to customers", "op": "+", "k": [{"s": "Acquire coal", "d": "transport, third-party prices, coal quality, unions"}, {"s": "Generate", "d": "age of equipment, differences across 10 plants, labour, new rules"}, {"s": "Transmit", "d": "distance to customers, leased wires, losses on the way"}]}}], "read": ["The chain splits one big cost into stages that add up", ["Every stage has its own causes", "A problem in one stage does not appear in the others"], "Check each stage in turn before suggesting solutions", ["The case gives no split of cost across the stages, so you cannot say which is biggest"]], "work": [["Electric Utility (the case gives no cost figures, so only the structure is shown)", ["Stage 1, acquire coal: how is it moved and how far, and do own and third-party coal differ in energy content?", "Stage 2, generate: how old are the generators, and do the 10 plants run differently?", "Stage 3, transmit: are the lines owned or leased, and how much electricity is lost on the way?"]]], "watchSteps": {"mistake": "Brainstorming costs in general instead of going through the stages one at a time.", "why": "A list of twelve ideas in no order is hard to follow and easy to leave gaps in. The same twelve ideas grouped under three stages show the interviewer you have covered the whole process.", "syms": {}, "steps": [{"say": "Write the steps in the order they happen. For GPE they are acquiring the coal, generating the electricity, and transmitting it."}, {"say": "Stop at the first stage and ask what could raise cost there. Coal has to be moved by rail or road, and coal from different mines has different energy content, so it may need different handling."}, {"say": "Stop at the second stage. The generators may be old and wasteful, the 10 plants may run differently, and labour or environmental rules may have changed."}, {"say": "Stop at the third stage. GPE leases its transmission lines for a fixed cost, so ask whether the lease could be cheaper and how much power is lost on the way."}, {"say": "Note which causes are outside GPE's control, such as environmental rules or weather in the mining regions, so that you separate them from the ones GPE can act on."}], "rule": "List the steps in order, then ask what could go wrong at each one before you suggest fixes."}}, "here": "Electric Utility closes the revenue branch first: price is set by the market and the market grows only about 3% a year. That leaves cost, and the casebook breaks cost into three stages: acquiring coal, generating electricity and transmitting it. It gives no figures for the cost of each stage, so the chain organises ideas rather than ranking them. The case's own answer groups causes under these three stages, such as coal transport and quality, old generators and leased transmission lines.", "big": "Any case where the cost is high but the reason is unknown can use a chain. It differs from a profit tree, which splits profit into revenue and cost, because a chain follows the product through time. Army Hotel used a profit tree for the whole business, and this case uses a chain for one branch of it.", "without": "You would list cost ideas as they came to mind, probably cover coal and forget transmission, and the interviewer could not tell what you had left out. You would also have no natural way to pick one stage and look deeper.", "formula": "acquire → make → move → sell", "met": "Electric Utility"}, "Utilisation": {"plain": "Utilisation is the share of your capacity that you actually use over a period, written as a percentage. Capacity is the most you could supply, for example the megawatts a power plant can produce at once. You calculate it by dividing what you produced by what you could have produced, then multiplying by 100. For example, a plant that could have produced 1,000 units and produced 800 has a utilisation of 80%.", "eg": "In general: a hotel with 100 rooms where 80 are occupied on average, a factory running 6 of its 10 machines, an airline filling 80% of seats. In Electric Utility: GPE's coal power plants running at 80% of the electricity they could produce.", "why": "A higher utilisation looks more efficient, but some businesses must keep spare capacity to serve their busiest period. An electricity company must be able to meet the peak, when demand is highest, because customers cannot wait for power. In such a business running below 100% is normal, and the spare capacity is the cost of being able to serve the peak.", "math": {"forms": [{"f": "U = {output|capacity}", "tree": {"s": "U", "d": "utilisation, as a percentage", "op": "÷", "k": [{"s": "output", "d": "what you actually produced over the period"}, {"s": "capacity", "d": "the most you could have produced over the same period"}]}}], "read": ["Utilisation compares what you produced with what you could have produced", ["Both figures must cover the same period and use the same units"], "A figure below 100% is normal when demand rises and falls", ["Capacity has to be sized for the peak, so it sits partly idle at quieter times"]], "work": [["Electric Utility (the 1,000 MW figure is ours; the percentages are the case's)", ["Say a plant has capacity of 1,000 MW", "At 80% utilisation, average output = 1,000 × 0.80 = 800 MW", "At the industry average of 77%: 1,000 × 0.77 = 770 MW", "At the CEO's target of 90%: 1,000 × 0.90 = 900 MW", "Extra output needed = 900 − 800 = 100 MW on average, which needs buyers to want it"]]], "watchSteps": {"mistake": "Accepting the CEO's 90% target without asking what the industry achieves or why spare capacity exists.", "why": "A target is not a finding. The case gives the industry average of 77% for comparison and says demand for electricity is cyclical, with peaks such as summer air conditioning. A utility must be able to meet the peak, so its average utilisation is bound to be below 100%.", "syms": {"U": "utilisation, as a percentage", "K": "capacity, the most the plant could produce (ours: 1,000 MW)"}, "steps": [{"say": "Start with the definition. Utilisation, written U, is output divided by capacity.", "f": "U = {output|capacity}"}, {"say": "GPE runs at 80% and the industry average is 77%. Compare them by subtracting. GPE is 3 percentage points above the average, not below it.", "f": "80% − 77% = 3 percentage points"}, {"say": "The CEO wants 90%. Compare that with where GPE is now. It would be 10 percentage points higher than today.", "f": "90% − 80% = 10 percentage points"}, {"say": "To see what 10 points means, take a plant with capacity K of 1,000 MW. This size is ours, not the case's. At 80% it produces 800 MW on average, and at 90% it would need to produce 900 MW.", "f": "K × 0.90 − K × 0.80 = 900 − 800 = 100 MW more, on average"}, {"say": "That extra output only helps if customers buy it. Demand is cyclical, so in quieter periods there is nobody to sell it to, and the plant still has to keep enough capacity for the peak."}], "rule": "Compare utilisation with the industry, and ask what the spare capacity is for before treating it as waste."}}, "here": "In Electric Utility, GPE operates at 80% utilisation, the industry average is 77%, and the CEO asks whether to raise it to 90%. The case tells you that demand for electricity is cyclical, with peaks such as summer air conditioning, and that GPE must meet the peak. So running below 100% is normal. GPE is already 3 points above the industry average, which makes 90% look unrealistic. The case never says what the extra 10 points would be worth or cost.", "big": "This is Army Hotel's capacity idea from the other side. There the hotel lacked capacity at the peak and lost revenue, and here the utility holds spare capacity on purpose so that it can meet the peak. Any business with uneven demand, such as airlines or hotels, faces the same trade-off.", "without": "You would agree with the CEO that 80% is low and look for ways to reach 90%. You would miss that GPE is already above the industry average and that spare capacity is how a utility meets the peak, so pushing utilisation up risks failing to serve customers at the busiest time.", "formula": "utilisation = output ÷ capacity", "met": "Electric Utility"}, "Reading an exhibit": {"plain": "An exhibit is a chart or table that a case hands you. Reading it takes three steps, in this order. First, find out what each axis, column and unit stands for, including any footnote, because the same number means different things in different units. Second, copy off the values you need. Third, do the calculation that turns those values into the quantity the question asks for. Often the exhibit shows one of the ingredients of the answer and not the answer itself, so the third step is where most of the work is.", "eg": "In general: a table of defect rates by factory when the question asks how many defective units a year; a chart of market share by year when the question asks how much revenue a competitor earns. In Breast Cancer Surgery: a table of the share of surgeries that would use the device at four prices, when the question asks which price earns the most revenue per year.", "why": "If you stop at what is drawn, you answer a different question from the one asked, for example by naming the price at which the chart looks best. The step beyond the chart is also where units go wrong. A figure given in thousands that you read as units makes the answer wrong by a factor of 1,000.", "math": {"forms": [{"label": "Turn the share into devices", "f": "Q = N × r", "tree": {"s": "Q", "d": "devices sold per year at that price", "op": "×", "k": [{"s": "N", "d": "surgeries per year, which is the market"}, {"s": "r", "d": "share of surgeries that use the device at that price, read from the exhibit"}]}}, {"label": "Turn devices into revenue", "f": "R = Q × p", "tree": {"s": "R", "d": "revenue per year at that price", "op": "×", "k": [{"s": "Q", "d": "devices sold per year at that price"}, {"s": "p", "d": "price per device, read from the exhibit"}]}}], "read": ["The exhibit gives pairs of a share (r) and a price (p). The question asks for dollars a year, so the exhibit has to be converted", ["First multiply the market by the share to get the number of devices", "Then multiply the number of devices by the price", "Repeat for every row, then compare the results"]], "work": [["Breast Cancer Surgery, the $600 row", ["N = 100,000 surgeries a year, one disposable device each", "r = 50% at $600, read from the exhibit", "Q = 100,000 × 50% = 50,000 devices a year", "R = 50,000 × $600 = $30M a year"]]], "watchSteps": {"mistake": "Choosing an answer from the column the exhibit shows (adoption) instead of from the quantity the question asks about (revenue).", "why": "The exhibit lists how many surgeries would use the device at each price. It does not list revenue, so nothing on the page tells you which price earns the most. Adoption is highest at $0, and a reader who stops at the exhibit would choose it, although a free device earns nothing.", "syms": {"N": "surgeries per year: 100,000", "r": "share of surgeries that use the device at a given price", "Q": "devices sold per year at a given price", "p": "price per device", "R": "revenue per year at a given price"}, "steps": [{"say": "Read what the exhibit shows. It gives, for each of four prices, the share of surgeries in which the device would be used. Call that share r.", "f": "p = $0: r = 90%;  p = $300: r = 75%;  p = $600: r = 50%;  p = $1,000: r = 10%"}, {"say": "Read what the question asks: the price that gives the most revenue per year. Revenue is not in the exhibit, so it has to be calculated. First turn each share into a number of devices by multiplying by the market, N = 100,000 surgeries a year, with one disposable device per surgery. Call the result Q.", "f": "Q = N × r = 100,000 × 90% = 90,000;  × 75% = 75,000;  × 50% = 50,000;  × 10% = 10,000 devices a year"}, {"say": "Multiply the devices at each price by that price to get the revenue. The first row gives nothing because the price is $0.", "f": "R = Q × p:  90,000 × $0 = $0;  75,000 × $300 = $22.5M;  50,000 × $600 = $30M;  10,000 × $1,000 = $10M a year"}, {"say": "Compare the four results. The largest is $30M, at $600.", "f": "$30M > $22.5M > $10M > $0"}, {"say": "Check the two answers that reading the exhibit alone would have given. The price with the highest adoption earns nothing, and the highest price earns a third of the best result.", "f": "{$0|$30M} = 0;  {$10M|$30M} = {1|3} ≈ 0.33"}], "rule": "Ask what the exhibit shows and what the question asks. If they differ, calculate the missing quantity for every row before you compare."}}, "here": "The Breast Cancer Surgery exhibit gives the share of surgeries that would use the device at each of four prices: 90% at $0, 75% at $300, 50% at $600 and 10% at $1,000. The question asks which price earns the most revenue. Revenue is not in the exhibit, so with 100,000 surgeries a year we calculate it for each row: $0, $22.5M, $30M and $10M. The answer is $600, at $30M a year.", "big": "In Cleaning Products the exhibit has two percentage columns that mean different things, a price change and a share of revenue, and both have to be converted into dollars before they can be compared. The pattern is the same in both cases: the numbers on the page are inputs, and the answer comes from the calculation you do next.", "without": "You would pick a price from the chart as it stands. Choosing the highest adoption gives $0 of revenue, and choosing the highest price gives $10M, against $30M at $600.", "met": "Breast Cancer Surgery"}, "Revenue maximisation": {"plain": "Revenue is the money collected from sales before any cost is taken off. It equals the price of one unit times the number of units sold. Revenue maximisation means finding, among the prices you could charge, the one at which that total is largest. When the number of buyers depends on the price, you cannot find it by looking at the price alone or at the number of buyers alone. You calculate revenue at each price you can test and pick the largest.", "why": "A price change does two things at once. It changes what each buyer pays, and it changes how many buyers there are. A higher price means each buyer pays more but fewer buy. A lower price means more buy but each pays less. Revenue goes up when the first effect is larger than the second and down when it is smaller, so it is largest at some price between the extremes. This is why neither the highest price nor the largest number of buyers is automatically the best choice. The only way to find the best price is to work out revenue at each one.", "math": {"forms": [{"label": "Revenue at one price", "f": "R(p) = N × r(p) × p", "tree": {"s": "R(p)", "d": "revenue per year at price p", "op": "×", "k": [{"s": "N", "d": "the market: surgeries per year"}, {"s": "r(p)", "d": "share of the market that buys at price p; it falls as p rises"}, {"s": "p", "d": "price per unit"}]}}, {"label": "Where a higher price earns more profit (our illustration; the case gives no cost)", "f": "c* = {R₆₀₀ − R₁₀₀₀|Q₆₀₀ − Q₁₀₀₀}", "tree": {"s": "c*", "d": "the cost per device at which $600 and $1,000 earn the same profit", "op": "÷", "k": [{"s": "R₆₀₀ − R₁₀₀₀", "d": "revenue at $600 less revenue at $1,000", "op": "−", "k": [{"s": "R₆₀₀", "d": "revenue at $600"}, {"s": "R₁₀₀₀", "d": "revenue at $1,000"}]}, {"s": "Q₆₀₀ − Q₁₀₀₀", "d": "devices sold at $600 less devices sold at $1,000", "op": "−", "k": [{"s": "Q₆₀₀", "d": "devices at $600"}, {"s": "Q₁₀₀₀", "d": "devices at $1,000"}]}]}}], "read": ["Revenue is the market, times the share who buy at that price, times the price", ["The share who buy falls as the price rises", "So calculate revenue at every price you can test, and choose the largest"], "Revenue is not profit", ["Profit is devices times (price minus cost per device)", "If each device costs more than c*, the dearer price earns more profit even though it earns less revenue"]], "work": [["Breast Cancer Surgery, revenue at each price tested", ["N = 100,000 surgeries a year", "$0: 100,000 × 90% × $0 = $0", "$300: 100,000 × 75% × $300 = 75,000 × $300 = $22.5M", "$600: 100,000 × 50% × $600 = 50,000 × $600 = $30M", ["The largest, so the revenue-maximising price is $600"], "$1,000: 100,000 × 10% × $1,000 = 10,000 × $1,000 = $10M"]], ["Where $1,000 overtakes $600 (our illustration: the case gives no cost)", ["c* = {$30M − $10M|50,000 − 10,000} = {$20M|40,000 devices} = $500 per device", ["Below $500 a device, $600 earns more profit; above it, $1,000 does"]]]], "watchSteps": {"mistake": "Treating the price that maximises revenue as the price that maximises profit.", "why": "Revenue ignores what each device costs to make. A higher price sells fewer devices, so it also incurs fewer device costs. If a device is expensive enough, the saving on those costs can outweigh the revenue given up. The case gives no cost, so this check uses a cost figure of our own to show how the answer could change.", "syms": {"N": "surgeries per year: 100,000", "r": "share of surgeries that use the device at a given price", "p": "price per device", "R": "revenue per year", "c": "cost to make one device (ours: the case gives none)"}, "steps": [{"say": "Start with revenue at the first price that earns anything. At $300, 75% of the 100,000 surgeries use the device.", "f": "R = N × r × p = 100,000 × 75% × $300 = 75,000 × $300 = $22.5M a year"}, {"say": "At $600, 50% of surgeries use the device.", "f": "R = 100,000 × 50% × $600 = 50,000 × $600 = $30M a year"}, {"say": "At $1,000, 10% of surgeries use the device. At $0 the revenue is $0, whatever the adoption, because every device is free.", "f": "R = 100,000 × 10% × $1,000 = 10,000 × $1,000 = $10M a year"}, {"say": "The largest of the four is $30M, so $600 is the revenue-maximising price. Revenue rises from $300 to $600 because the price doubles while the number of devices falls by only a third. It falls from $600 to $1,000 because the price rises by two-thirds while the number of devices falls by four-fifths.", "f": "{$600 − $300|$300} = +100% and {50% − 75%|75%} = −33%;  {$1,000 − $600|$600} = +67% and {10% − 50%|50%} = −80%"}, {"say": "Now bring in a cost. The case gives none, so let c be the cost of making one device. Profit is the number of devices times what each earns after its own cost, which is the price less c. Write profit at $600 and at $1,000.", "f": "profit at $600 = 50,000 × ($600 − c);  profit at $1,000 = 10,000 × ($1,000 − c)"}, {"say": "To find the cost at which the two prices earn the same profit, set the two expressions equal and divide both sides by 10,000.", "f": "5 × (600 − c) = 1,000 − c"}, {"say": "Multiply out the left side, then collect the terms in c on one side and the numbers on the other.", "f": "3,000 − 5c = 1,000 − c   →   2,000 = 4c   →   c = $500 per device"}, {"say": "So at a cost of $500 per device the two prices tie. Test one cost above that, for example $550 per device (ours). $1,000 now earns more profit, although it earns less revenue.", "f": "$600: 50,000 × ($600 − $550) = $2.5M;  $1,000: 10,000 × ($1,000 − $550) = $4.5M"}], "rule": "Revenue maximisation answers the question about revenue only. Say that profit depends on cost per unit, and that a cost above $500 per device would change the best price from $600 to $1,000."}}, "here": "In Breast Cancer Surgery there are 100,000 surgeries a year, each using one disposable device. The share of surgeries that use the device is 90% at $0, 75% at $300, 50% at $600 and 10% at $1,000, which gives revenue of $0, $22.5M, $30M and $10M. The revenue-maximising price is therefore $600, at $30M a year. The case gives no cost per device, so it cannot say what profit is, and the recommendation has to say that it maximises revenue and not profit.", "big": "In the Army Hotel the payer fixes the price at $60 a night, so there is no price to choose. Here the client sets the price, and the limit on it is the customers' own willingness to pay. Any case where you set a price has the same trade-off between what each customer pays and how many customers there are.", "without": "You would choose a price by instinct, most likely the highest or the one with the most buyers. Those give $10M and $0 here, against $30M at $600. You would also miss that revenue is not profit, and that a cost above $500 per device would make $1,000 the better price.", "formula": "revenue = market × share who buy at that price × price", "met": "Breast Cancer Surgery"}, "Weighted mix": {"plain": "A weighted mix combines changes that apply to several product lines. Each line has its own percentage change and its own amount of revenue, so the lines cannot be added as percentages. Instead, work out for each line how many dollars the change is worth, which is the line's share of total revenue times the total times its percentage change. Then add the dollars. Percentages from lines of different sizes do not add because the same percentage is worth more dollars on a larger line.", "eg": "Illustration (ours): a company has two lines. One earns $100 and its price rises 10%. The other earns $900 and its price rises 1%. The first adds $10 and the second adds $9, so the total is $19 on $1,000, which is 1.9%. Averaging the two percentages would give 5.5%, which is wrong by almost a factor of three.", "why": "When a case gives a change for each line and asks for the total effect, the answer depends on where the revenue is. The line with the largest percentage change is often small, and the largest line often changes least. Working in dollars is also what lets you compare the result with a target, because a target is usually stated for the whole business.", "math": {"forms": [{"label": "One line, in dollars", "f": "G = w × B × c", "tree": {"s": "G", "d": "change in revenue on one line, in dollars", "op": "×", "k": [{"s": "w", "d": "the line's share of total revenue"}, {"s": "B", "d": "total revenue, in dollars"}, {"s": "c", "d": "the line's percentage price change"}]}}, {"label": "All lines", "f": "G_all = G₁ + G₂ + G₃ + G₄ + G₅", "tree": {"s": "G_all", "d": "total change in revenue, in dollars", "op": "+", "k": [{"s": "G₁ … G₅", "d": "the dollar change on each of the five lines"}]}}, {"label": "As a percentage of the whole", "f": "g = {G_all|B}", "tree": {"s": "g", "d": "the blended percentage change", "op": "÷", "k": [{"s": "G_all", "d": "total change in revenue, in dollars"}, {"s": "B", "d": "total revenue, in dollars"}]}}], "read": ["Work out each line in dollars first", ["Share times total gives the line's revenue", "That times its percentage change gives the dollar change"], "Add the dollars, not the percentages", ["Divide by the total only at the end, to get one blended percentage"]], "work": [["Cleaning Products, B = $3 billion = $3,000M", ["Dish washing: 5% × $3,000M × (−2%) = $150M × (−2%) = −$3M", "Clothes detergent: 20% × $3,000M × 1% = $600M × 1% = +$6M", "Hand wash: 30% × $3,000M × 0% = $900M × 0% = $0", "Shower gel: 30% × $3,000M × 2% = $900M × 2% = +$18M", "All-purpose soap: 15% × $3,000M × 4% = $450M × 4% = +$18M", "Total: −$3M + $6M + $0 + $18M + $18M = +$39M a year", ["Target: 1% × $3,000M = $30M, so $39M is above it"], "Blended: g = {$39M|$3,000M} = 1.3%"]]], "watchSteps": {"mistake": "Adding or averaging the five percentage changes as if the lines were the same size.", "why": "The percentages sit on different amounts of revenue. A 4% change on a $450M line is worth $18M, and the same change on a $150M line would be worth $6M. Only dollars can be added, so every percentage must first be turned into dollars on its own line.", "syms": {"w": "a line's share of total revenue", "B": "total revenue: $3 billion = $3,000M", "c": "a line's percentage price change", "G": "change in revenue on one line, in dollars"}, "steps": [{"say": "First see what the shortcut gives. Averaging the five price changes, as if every line were equal, produces exactly the 1% target. That would make the answer look borderline, but it counts a $150M line the same as a $900M line, so it cannot be trusted.", "f": "{−2% + 1% + 0% + 2% + 4%|5} = {5%|5} = 1%"}, {"say": "Start again in dollars. Total revenue B is $3 billion, which is $3,000M. Find how much revenue each line carries by multiplying its share w by B.", "f": "w × B:  5% × $3,000M = $150M;  20% × $3,000M = $600M;  30% × $3,000M = $900M;  30% × $3,000M = $900M;  15% × $3,000M = $450M"}, {"say": "Check that the five lines add back to the total.", "f": "$150M + $600M + $900M + $900M + $450M = $3,000M"}, {"say": "Dish washing powder carries $150M and its price falls 2%, so it loses revenue.", "f": "G = $150M × (−2%) = −$3M"}, {"say": "Clothes detergent powder carries $600M and its price rises 1%.", "f": "G = $600M × 1% = +$6M"}, {"say": "Hand wash liquid carries $900M, but its price does not change, so it contributes nothing, although it is the largest line.", "f": "G = $900M × 0% = $0"}, {"say": "Shower gel carries $900M and its price rises 2%.", "f": "G = $900M × 2% = +$18M"}, {"say": "All-purpose soap carries $450M and its price rises 4%. Its percentage change is the largest, but it is on a smaller base than shower gel, so it adds the same $18M.", "f": "G = $450M × 4% = +$18M"}, {"say": "Add the five dollar changes.", "f": "−$3M + $6M + $0 + $18M + $18M = +$39M"}, {"say": "Compare with the target, which is 1% of the $3,000M total. The total change is above it by $9M.", "f": "1% × $3,000M = $30M;  $39M − $30M = $9M"}, {"say": "Only now divide by the total to express the result as one percentage. It is above the 1% target, unlike the shortcut's answer, which was exactly on it.", "f": "g = {G_all|B} = {$39M|$3,000M} = 1.3%"}], "rule": "Turn each percentage into dollars on its own line first, add the dollars, and divide by the total only at the end."}}, "here": "In Cleaning Products revenue is $3 billion across five lines, with price changes of −2%, +1%, 0%, +2% and +4% on 5%, 20%, 30%, 30% and 15% of revenue. In dollars these are −$3M, +$6M, $0, +$18M and +$18M, a total of +$39M a year. The client would be happy with 1%, which is $30M, so the price changes clear the target by $9M. Shower gel and all-purpose soap together supply $36M of the $39M.", "big": "Any case that gives a change for each segment and asks for the effect on the whole, whether prices, volumes or costs, needs this step: find where the money already is, then apply each change to its own base. It follows Reading an exhibit, because here the exhibit has two percentage columns that cannot be compared until both are converted to dollars.", "without": "You would add or average the percentages. Adding gives 5%, which would suggest $150M, and averaging gives 1%, which would suggest a borderline $30M. Both are wrong against the true $39M, and neither shows that two of the five lines produce almost all of the gain.", "formula": "total change = Σ (line's share × total × its % change)", "met": "Cleaning Products"}});

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
   logic:[["Say what you couldn't answer","Revenue-maximising is not profit-maximising: profit is units × (price − cost per device), so a cost above $500 a device makes $1,000 beat $600"],
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
  ]},
 "BTH-19": { title:"Heavy Attrition",
  sub:"Two layers of commentary first (the sector, then the sub-sector), then the notes in the order the case unfolds. Open any note for the idea, the evidence and what it means here. Anything that is our own judgement says so.",

  sector:{ h:"The sector: medical-device sales", s:"BLS Occupational Outlook Handbook (page modified Aug 27 2026)",
   body:"A medical-device company usually sells through its own sales force, who visit hospitals and clinics, explain how a product works and negotiate the price. The US Bureau of Labor Statistics groups these jobs under sales representatives of technical and scientific products. In 2025 there were about 292,000 such jobs and the median pay was $104,920 a year. These jobs typically require a bachelor's degree, and the on-the-job training can last up to 1 year. Because new reps need that long to learn the product and the customers, a rep who leaves early takes the training investment with them.",
   here:"The client is a medical-devices company about 10 years old whose junior salespeople leave within 1 year. The BLS figure for training (up to 1 year) and the case's own figure for the time a new rep takes to become productive (about 6 months) point the same way: a rep who leaves in under 1 year has spent roughly half or more of that time not yet fully productive.",
   defs:[["sales force","the employees whose job is to sell the company's products to customers"],["median","the middle value: half of the people earn more and half earn less"],["on-the-job training","learning the work while already employed in it, as opposed to before being hired"],["attrition","employees leaving the company over a period, whatever the reason"]] },
  subsector:{ h:"The sub-sector: field sales reps in medical devices", s:"BLS Occupational Outlook Handbook, Aug 2026; Core Commissions, May 15 2024",
   body:"A field rep works in a territory, meaning a set of customers in a geographic area assigned to that rep. The rep is usually paid a base salary plus commission, which is a share of the sales the rep makes. Four design choices therefore shape the job: how big the territory is and how far the rep travels, which products the rep may sell, what share of pay is commission, and how fast a new rep becomes productive. A rep who is new, or who has a thinner territory, or who is limited to lower-value products, can earn less than a colleague doing similar work.",
   here:"The case gives exactly three facts about the client: junior reps (under 1 year) leave, new reps take about 6 months to ramp up, and senior reps (over 3 years) almost never leave. The four design choices above are therefore the places to look for a difference between juniors and seniors, and the case supplies no figure for any of them.",
   defs:[["territory","the customers and geographic area assigned to one rep"],["commission","pay calculated as a share of the sales the rep makes"],["base salary","the fixed part of pay, paid whether or not the rep sells"],["ramp time","the time a new rep needs to reach normal productivity"]] },
  sections:[
   {h:"1. What does 'heavy' attrition mean?", u:[1], intro:"The prompt says attrition is heavy but gives no number. Before comparing anything, it helps to know how turnover is normally measured.", items:[
    {h:"Turnover is a rate over a period, and leaving has different types", scope:"sector", sum:"The US government counts separations per month and splits them into quits (voluntary) and layoffs and discharges (employer-initiated). In 2025 there were 62.8 million separations, of which 38.0 million were quits.",
     idea:"Attrition is the number of people who leave divided by the number of employees, over a stated period such as a month or a year. Without the period and the group of people it covers, the word 'heavy' cannot be tested. A separation is any departure from the payroll. A quit is a departure the employee chose, and a discharge is one the employer chose.",
     fact:"The Bureau of Labor Statistics defines total separations as all separations from the payroll during the reference month, and quits as employees who left voluntarily, except retirements or transfers. For the whole of 2025 it reports 62.8 million total separations, 38.0 million quits and 21.2 million layoffs and discharges across the US economy.",
     here:"The case says junior reps leave within less than 1 year but does not say how many, out of how many, over what period. That is why the first question to ask is what 'heavy' is compared with.",
     ask:"Heavy compared with what: last year, or the industry?",
     defs:[["JOLTS","the Job Openings and Labor Turnover Survey, the US government's monthly survey of hires and separations"],["separation","any departure from the payroll"],["quit","a voluntary departure"],["layoff or discharge","a departure the employer initiated"],["attrition rate","people who left divided by average headcount, for a stated period"]],
     s:"US Bureau of Labor Statistics, JOLTS news release, Mar 13 2026" },
    {h:"A benchmark exists for the whole economy but not for medical-device reps", scope:"sector", sum:"The 2025 average monthly quits rate was 2.2% for all US private employers and 1.4% for wholesale trade. We found no published rate for medical-device sales reps.",
     idea:"A benchmark is a comparison figure from similar companies. Turnover benchmarks are only useful when the comparison group resembles the client, because retail and wholesale, for example, have very different normal levels.",
     fact:"BLS Table 22 reports the annual average of the monthly quits rate: 2.2% for total private industry in 2025 (2.3% in 2024) and 1.4% for wholesale trade in both years. JOLTS computes these rates per month.",
     here:"The case never states a benchmark, so the best an interviewee can do is name the comparison needed and ask for it. These economy-wide rates are only a reference point, because they do not cover junior reps in medical devices specifically.",
     defs:[["quits rate","quits in a month divided by total employment, as a percentage"],["wholesale trade","businesses that buy goods and resell them to other businesses; BLS groups many sales-rep employers here"],["benchmark","a comparison figure from similar companies or periods"]],
     s:"US Bureau of Labor Statistics, JOLTS Table 22 (2024 and 2025 annual averages)", note:"The monthly rates are not annual attrition, and no medtech-specific or junior-rep rate was found. Whether wholesale trade is the right comparison group for this client is our judgement." }
   ]},
   {h:"2. What does a new rep cost before becoming productive?", u:[2], intro:"The case states that new reps need about 6 months to ramp up, and that many leave before 1 year.", items:[
    {h:"Ramp time is a period of cost without full output", scope:"sub", sum:"A 2026 survey of 158 B2B companies found a median ramp time of 6.2 months, the highest in that study's history. The case's 6 months is in line with it.",
     idea:"A new rep is paid from the first day, but sells below normal for the first months while learning the product and building customer relationships. That period is the ramp time. If the rep leaves soon after it ends, the company has paid for the learning and received little of the productive time.",
     fact:"The Bridge Group's 2026 research, based on 158 B2B companies, reports ramp time to full productivity of 6.2 months, which it says is the highest in the study's history. The same report says 48% of reps achieved quota, down from 51% in 2024.",
     here:"The case says about 6 months. A junior who leaves in under 1 year has therefore spent about half or more of the stay in ramp, so each early exit is mostly cost.",
     defs:[["quota","the sales target a rep is expected to reach in a period"],["ramp time","months from start date until the rep reaches normal productivity"],["B2B","business-to-business: selling to companies and institutions, not to consumers"],["median","the middle value of the sample"]],
     s:"The Bridge Group, 2026 AE Models, Motions & Metrics, Jun 22 2026", url:"https://www.bridgegroupinc.com/research/2026-ae-models-motions-metrics", note:"The sample covers B2B companies generally and is not limited to medical devices, and the report does not define 'full productivity' on the page we read. Treat 6.2 months as a reference point only." },
    {h:"Replacing someone is expensive, and a figure is widely quoted", scope:"sector", sum:"SHRM is quoted as saying replacing an employee costs 50% to 200% of annual salary, depending on level. We read this only as a second-hand quotation.",
     idea:"The cost of an exit is more than the recruiting fee. It also includes the training period, the lost sales while the territory is covered by no one or by a new rep, and the time of managers who interview and train.",
     fact:"An article on SHRM's executive-network site states: according to SHRM, the cost of replacing an employee can range from 50% to 200% of their annual salary, depending on their level. The article gives no underlying study or date for the range.",
     here:"The case gives no salary, so we cannot put a dollar figure on the client's loss. The direction is clear, since the client pays the ramp cost again for every junior who leaves.",
     defs:[["replacement cost","everything spent to fill a vacancy: recruiting, training and lost output"],["territory coverage","having a rep serving the customers in the territory"]],
     s:"SHRM Executive Network, 'The Myth of Replaceability' (undated; read 2026)", url:"https://www.shrm.org/executive-network/insights/myth-replaceability-preparing-loss-key-employees", note:"Because the range is quoted without its underlying study, treat it as an indication and not as a measured figure for sales reps. Which part of the range applies to a junior rep is our judgement and we have not estimated it." }
   ]},
   {h:"3. What is the job, and who tends to hit target?", u:[2,3], intro:"The case assumes that the work of juniors and seniors is similar. These two notes describe what the work involves and how often reps reach their targets.", items:[
    {h:"The job needs product knowledge, which is why training is long", scope:"sub", sum:"BLS says reps of technical and scientific products, including medical instruments, typically need a bachelor's degree and have on-the-job training of up to 1 year.",
     idea:"A rep selling a medical device explains features, answers technical questions and negotiates price. That requires knowledge that takes time to build, which is why new reps are not productive on day one.",
     fact:"BLS states that reps selling pharmaceuticals, medical instruments and industrial equipment typically have subject-matter expertise, that they typically need at least a bachelor's degree, and that on-the-job training is moderate-term and can last up to 1 year. There were about 292,000 jobs in this group in 2025.",
     here:"This supports the case's 6-month ramp. It also raises the point the case assumes away: if training lasts months, juniors and seniors may not be doing the same work in practice.",
     ask:"Do juniors and seniors sell the same products to the same customers?",
     defs:[["subject-matter expertise","detailed knowledge of the product and how it is used"],["moderate-term training","BLS category for training that lasts more than 1 month and up to 12 months"],["instrument","a device used in medical care or diagnosis"]],
     s:"US Bureau of Labor Statistics, Occupational Outlook Handbook, modified Aug 27 2026", url:"https://www.bls.gov/ooh/sales/wholesale-and-manufacturing-sales-representatives.htm", note:"The definition of 'moderate-term' training is our reading of BLS terminology and was not on the page we read." },
    {h:"Many reps miss quota, and new reps are the most likely to", scope:"sub", sum:"48% of reps reached quota in the Bridge Group 2026 survey; a vendor guide quotes 55% for medical-device reps, citing RepVue. The two sources differ in method.",
     idea:"Commission is usually paid for sales above a target, called a quota. If most reps do not reach it, a large share of the pay design is never earned. A rep who is new, and still learning, is the one most likely to fall short in the first months.",
     fact:"The Bridge Group (158 B2B companies, 2026) reports 48% of reps reached quota. An Everstage guide updated Sept 7 2026 says only 55% of medical-device reps hit quota annually, and attributes that to RepVue data we did not open.",
     here:"The case gives no quota figure. The point to carry over is that low attainment and early exits can go together, because a rep who earns little commission in the first year has a reason to look elsewhere.",
     defs:[["quota attainment","the share of reps who reach their sales target in a period"],["RepVue","a website where sales reps report their pay and company ratings"],["vendor guide","an article published by a software company that sells related products"]],
     s:"The Bridge Group, Jun 22 2026; Everstage, Sept 7 2026 (citing RepVue)", url:"https://www.everstage.com/sales-compensation/medical-device-sales-compensation", note:"The Everstage figure is second-hand from a vendor and its sample is unknown. The link between missing quota and leaving is our judgement; neither source tests it." }
   ]},
   {h:"4. How the pay is built", u:[3,4], intro:"The casebook's own framework says reps are paid a small salary plus commission. These notes show how pay is usually structured in this field.", items:[
    {h:"Pay is salary plus a percentage-of-sales commission", scope:"sub", sum:"BLS says most employers combine salary with commission, and commission is usually a percentage of sales. A 2024 industry guide says commission and incentives make up 40% or more of a medical-device rep's income.",
     idea:"A salary is paid regardless of sales. A commission is a percentage of the sales a rep makes. The higher the commission share of total pay, the more a rep's income depends on the products and customers the rep can reach.",
     fact:"BLS: most employers use salary plus commission or salary plus bonus, and commissions are usually a percentage of sales. Core Commissions (May 15 2024) says incentive pay is roughly 40% or more of a medical-device rep's annual income, and gives 2021 averages of $104,649 base salary and $172,527 total pay.",
     here:"The case says 'small fixed salary plus commission', which means commission is the larger share. That is more commission-heavy than the 2021 average above, where base was about 61% of total pay (our arithmetic: 104,649 / 172,527).",
     defs:[["OTE (on-target earnings)","base salary plus the commission earned when a rep hits target"],["incentive pay","commission and bonuses on top of base salary"],["spiff","a short-term cash bonus for selling a particular product"]],
     s:"US Bureau of Labor Statistics, Aug 2026; Core Commissions, May 15 2024", url:"https://corecommissions.com/guide-to-medical-device-sales-commissions/", note:"Core Commissions is a commission-software vendor and does not state its sample. Whether the client's pay is comparable to the 2021 average is our judgement." },
    {h:"Commission rates can differ by product, so product access decides pay", scope:"sub", sum:"One guide lists medical-device commission by product: capital equipment 3 to 8%, implants 5 to 12%, consumables 2 to 6%. Another says 15 to 25% of revenue. The sources disagree.",
     idea:"If commission is a percentage of price, a rep who may sell expensive products earns more per sale than one who sells cheap products, even at the same effort. This is the case's iPod versus iMac comparison, where pay follows price and not necessarily the effort of the sale.",
     fact:"Everstage (updated Sept 7 2026) gives commission ranges of 3 to 8% for capital equipment, 5 to 12% for implants, 2 to 6% for consumables and 5 to 10% plus recurring revenue for software-enabled devices. Core Commissions (May 15 2024) says reps can expect 15 to 25% of revenue generated, varying by product and experience, with higher percentages unlocked at higher quota tiers.",
     here:"The case does not give the commission schedule, so we do not know whether juniors may sell the higher-paying products. That is the question the case's recommendation puts first.",
     ask:"Is commission a flat rate or does it vary by product, and are juniors restricted from any product line?",
     defs:[["capital equipment","large machines that a hospital buys once, such as imaging or surgical systems"],["implant","a device placed in the body, such as a joint or stent"],["consumable","a product used up in each procedure and re-ordered"],["tiered commission","a rate that rises as sales pass set thresholds"]],
     s:"Everstage, Sept 7 2026; Core Commissions, May 15 2024", url:"https://www.everstage.com/sales-compensation/medical-device-sales-compensation", note:"The two vendors give very different ranges and do not state their samples, so treat them as illustrations that rates differ by product, not as market rates. That reading is our judgement." }
   ]},
   {h:"5. Territory, and what to check before recommending", u:[4,5], intro:"The case's last two steps rank territory and distance behind product mix and then ask for a recommendation that admits it is a hypothesis.", items:[
    {h:"Larger territories mean more travel for the same sales", scope:"sub", sum:"BLS says reps with large territories travel considerably, sometimes for days or weeks. A 1975 model by Lodish set territories to maximise profit while counting travel time.",
     idea:"Territory design means dividing customers among reps. If one rep's customers are far apart, the rep spends more time on the road and less selling. Where commission depends on sales, that rep earns less for the same working week.",
     fact:"BLS states that reps with large territories travel considerably and may be away from home several days or weeks at a time, while reps covering smaller regions travel less. Lodish (Journal of Marketing Research, Feb 1975) presents a model for realigning sales territories whose features include profit as the objective, call frequency set at the same time, and travel time.",
     here:"The case mentions distance travelled as a driver of commission but gives no territory sizes or distances. Whether juniors get the far or thin territories is a question for data the case never supplies.",
     ask:"How are territories assigned, and do juniors get different ones from seniors?",
     defs:[["territory alignment","assigning customers and areas to reps"],["call frequency","how often a rep visits a given customer"],["objective function","the quantity a model tries to maximise or minimise"]],
     s:"US Bureau of Labor Statistics, Aug 2026; L. Lodish, Journal of Marketing Research 12(1), Feb 1975 (abstract only)", url:"https://journals.sagepub.com/doi/abs/10.1177/002224377501200105", note:"We read only the abstract of Lodish. Whether juniors are given worse territories is our hypothesis and is not shown by any source." },
    {h:"Check whether people quit or were let go before blaming incentives", scope:"sector", sum:"Government data treat quits and discharges separately: 38.0 million quits and 21.2 million layoffs and discharges in 2025. A fix for pay only addresses the first kind.",
     idea:"Attrition can come from employees choosing to leave or from the employer removing them, for example for weak performance. A pay change can affect only the first. The casebook's own framework makes this its first bucket, attrition not caused by poor performance.",
     fact:"BLS separates quits (voluntary, excluding retirements and transfers) from layoffs and discharges (employer-initiated). In 2025 it reports 38.0 million quits and 21.2 million layoffs and discharges, and notes layoffs and discharges were up 1.2 million from 2024 while quits fell 1.3 million.",
     here:"The case says juniors leave but does not say whether they resign or are dismissed. If part of the exits are dismissals for missing target, the recommendation's own risk, that other factors might be causing the attrition, applies directly.",
     ask:"Of the juniors who leave, how many resign and how many are let go?",
     defs:[["voluntary exit","a departure the employee chose"],["involuntary exit","a departure the employer chose"],["hypothesis","a proposed explanation that has not yet been tested with data"]],
     s:"US Bureau of Labor Statistics, JOLTS news release, Mar 13 2026", url:"https://www.bls.gov/news.release/archives/jolts_03132026.htm", note:"These are economy-wide totals and say nothing about sales reps. We use them only for the definitions and the distinction." }
   ]}
  ]},
 "BTH-11": { title:"A coal-fired electric utility",
 sub:"Two layers of commentary first (the sector, then the sub-sector), then the notes in the order the case unfolds. Open any note for the idea, the evidence and what it means here. Anything that is our own judgement says so.",

 sector:{ h:"The sector: US electric power", s:"RFF, Mar 2020 (updated Mar 2022); FERC, Mar 27 2025; EIA, Feb 2026",
  body:"Electric power has three stages: generation (producing the electricity), transmission (moving it over high-voltage wires) and distribution (delivering it to homes and businesses). In some states one regulated company does all three and its prices are approved by a state commission. In others, generation was opened to competition, so independent generators sell electricity at market prices, while the wires stay regulated. RFF states that only about one third of US electricity demand is served by the integrated-utility model, and FERC states that two-thirds of the nation's electricity load is served in RTO regions, the regional markets that run the grid and dispatch plants on bids.",
  here:"The case places GPE in the second model. It generates electricity, sells through wholesalers to over 1 million customers, pays a fixed fee to lease transmission lines, and takes a price set by competition, one price for the whole year. A generator in that position cannot pass a cost increase on to customers, which is why the case closes the revenue branch and goes to cost.",
  defs:[["generation","producing electricity at a power plant"],["transmission","moving electricity over long-distance high-voltage lines"],["distribution","delivering electricity over local lines to end users"],["vertically integrated utility","one company that owns generation, transmission and distribution"],["restructured (deregulated) market","a market where generators compete and sell at market prices"],["RTO / ISO","regional transmission organization / independent system operator: the body that runs a region's grid and market"],["wholesaler","a buyer that purchases electricity in bulk and resells it"]] },
 subsector:{ h:"The sub-sector: coal-fired generation with its own coal supply", s:"EIA, Feb 2026 and Oct 2023; EIA, Apr 2017",
  body:"A coal plant burns coal to make steam that turns a turbine. Its main raw material is bulky and heavy, so moving it matters, and coal differs by type: it is sold in different grades with different energy content per pound. A generator can buy coal on long-term contracts, on the spot market, or from a mine it owns. Coal has been losing ground to natural gas and renewables: in 2025 it supplied about 17% of US generation, against about 52% in 1990.",
  here:"This is why the case walks the chain from coal to plant to wires, asks how the coal is transported, and notes that own-mine coal and bought coal differ. It is also why the case asks whether a mine that lowers the buying price should be kept, and why the CEO's utilisation target is a question rather than a given.",
  defs:[["short ton","2,000 pounds, the unit US coal is priced in"],["Btu","British thermal unit: a measure of the heat energy in a fuel"],["spot market","buying for immediate delivery at the current price"],["long-term contract","a purchase agreement at agreed terms over several years"],["captive mine","a mine owned by the company that burns its coal"]] },

 sections:[
  {h:"1. Who sets the price, and who owns the wires?", u:[1,2], intro:"The case opens by telling the candidate which parts of the business are regulated and which are not. That decides what GPE can change.", items:[
   {h:"In deregulated states the generator takes the market price", scope:"sector", sum:"Where generation is competitive, utilities sold off or separated their plants, and the market sets the price of electricity. A generator then competes on cost, not on price.",
    idea:"Historically one company built the plants and the wires and a state commission set its prices to cover its costs. Where states restructured, independent companies own the plants and sell electricity at a market price, while the utilities that kept the wires stay regulated.",
    fact:"RFF describes the two models as vertically integrated monopolies overseen by public utility commissions, or markets in which electric energy prices are set by the market. In restructured states, utilities held onto the wires and became transmission and distribution utilities, which stay regulated, while independent companies own the generation. RFF states that only one third of US electricity demand is served by the integrated-utility model.",
    here:"The case says price is set by competitive forces, one price for the year and the same for all customers. GPE therefore has no price lever, and the profit decline has to come from volume or cost. Volume grows at about 3% a year in a fragmented market, so the case moves to cost.",
    ask:"Does GPE sell wholesale or directly to consumers?",
    defs:[["public utility commission","the state body that approves a regulated utility's prices"],["integrated monopoly","one company that is the only supplier in its area"],["restructuring","opening generation to competition"],["fragmented market","many sellers, none with a large share"]],
    s:"RFF, US Electricity Markets 101, Mar 3 2020 (updated Mar 17 2022)", url:"https://www.rff.org/publications/explainers/us-electricity-markets-101/", note:"The case says electricity usage is 'mostly deregulated'. The one-third and two-thirds figures describe markets nationally and do not tell us which market GPE sits in. That limit is our judgement."},
   {h:"The wires are regulated even where the plants compete", scope:"sector", sum:"FERC regulates transmission and wholesale markets, and regional operators dispatch plants on bids. GPE leases wires at a fixed cost, so transmission is a cost it can bargain over but not set.",
    idea:"A transmission line is a natural monopoly, because building two sets of wires between the same points would waste money. It is regulated so every generator can use it on fair terms, and regional operators run the market that decides which plants produce each hour.",
    fact:"FERC states that ISOs and RTOs operate the transmission systems and use bid-based markets to determine economic dispatch, and that two-thirds of the nation's electricity load is served in RTO regions. FERC's page identifies transmission and wholesale markets as its area of regulation.",
    here:"The case says GPE pays a fixed cost to lease transmission lines. The lease is a cost it cannot set, but the case also suggests sharing or renegotiating it, and moving customers closer to the plants.",
    defs:[["FERC","the Federal Energy Regulatory Commission, which regulates transmission and wholesale power markets"],["economic dispatch","running the cheapest available plants first to meet demand"],["natural monopoly","a service one supplier can provide at lower cost than several"]],
    s:"FERC, Electric Power Markets, updated Mar 27 2025", url:"https://www.ferc.gov/electric-power-markets"}
  ]},
  {h:"2. Where coal sits in the market", u:[2,3], intro:"If revenue cannot explain the decline, the next question is what is happening to coal as a fuel.", items:[
   {h:"Coal's share of US generation has fallen a long way", scope:"sub", sum:"Coal produced about 52% of US generation in 1990 and about 17% in 2025. A coal-only generator is in a shrinking part of the market.",
    idea:"Each plant competes with every other plant in its region to be dispatched. When other fuels become cheaper to run, coal plants run less and earn less, even if the market price of electricity does not change.",
    fact:"EIA reports that coal plants were about 42% of US utility-scale generating capacity and about 52% of generation in 1990, and that coal was about 13.3% of capacity at the end of 2025 and about 17% of generation in 2025.",
    here:"The case does not say why profit fell, but a company running ten coal plants shares the position of the whole coal fleet. A rival's cheaper fuel is a possible external cause that the case does not mention.",
    defs:[["utility-scale","plants that feed the grid at commercial scale"],["capacity","the most electricity a plant can produce at one moment, in megawatts (MW)"],["generation","the electricity actually produced over a period, in megawatt-hours (MWh)"]],
    s:"EIA, Electricity generation, capacity, and sales in the United States, Feb 2026 (preliminary 2025 data)", url:"https://www.eia.gov/energyexplained/electricity/electricity-in-the-us-generation-capacity-and-sales.php", note:"This is a national series. Whether it explains GPE's decline is our judgement, and the case supplies no evidence either way."},
   {h:"Natural gas and renewables undercut coal in many hours", scope:"sub", sum:"EIA found coal and gas combined-cycle plants cost almost the same per MWh to run in 2012, and that coal has since been displaced in spring and fall. The cause is relative fuel prices, which differ by region.",
    idea:"Plants are dispatched cheapest first. If gas or renewables cost less per MWh in a given hour, coal plants are not called on and their fixed costs are spread over fewer MWh.",
    fact:"EIA stated that in 2012 the national average cost per MWh of producing electricity from coal steam plants and gas combined-cycle plants was nearly equal, and that in some regions gas had fallen below coal. In 2020 EIA reported that the coal fleet ran at a capacity factor of more than 60% in winter and summer but less than 50% in spring and fall, because coal had been displaced by cheaper natural gas and renewable generation in those shoulder months.",
    here:"The case treats profit as falling through cost, and tells us nothing about competing fuels. It offers no figure for GPE's cost per MWh against gas, so this is an open question to ask the interviewer.",
    ask:"How does our cost per MWh compare with the gas plants we compete against?",
    defs:[["combined-cycle plant","a gas plant that also uses its waste heat to make extra electricity"],["capacity factor","actual output divided by the most the plant could produce, over a period"],["shoulder months","the spring and fall months when demand is lower than in winter and summer"]],
    s:"EIA, Apr 2013 (2012 data); EIA, Sept 1 2020", url:"https://www.eia.gov/todayinenergy/detail.php?id=44976", note:"The 2013 and 2020 figures are dated and relate to the national fleet. Using them as a view of GPE is our judgement."}
  ]},
  {h:"3. Getting the coal to the plant", u:[3], intro:"The first stage of the value chain is acquiring coal. Moving it and burning it both depend on what kind of coal it is.", items:[
   {h:"Moving coal is a large part of what it costs", scope:"sub", sum:"Transport was about 41% of the average delivered price of coal to US power plants in 2022 ($18.69 of $44.51 per short ton). Distance and mode matter as much as the mine price.",
    idea:"The delivered price of coal is what the plant pays for the coal at its gate: the price at the mine plus the freight. Because coal is heavy and low in value per ton, freight can be a large share of that total.",
    fact:"EIA reports that in 2022 the average delivered price of coal to the electric power sector was $44.51 per short ton, of which transportation was about 41%, or $18.69 per short ton. In 2019, 69% of the coal delivered to the power sector was shipped completely or partly by rail.",
    here:"The case asks how the coal is transported and how far. Where the mine sits relative to the ten plants affects the cost of every ton, and transport is the first idea in the case's brainstorm of the acquire-coal stage.",
    ask:"How is the coal transported, and how far from mine to plant?",
    defs:[["delivered price","the price paid at the plant, including transport"],["freight","the charge for carrying goods"],["mode","the way coal travels: rail, river barge or truck"]],
    s:"EIA, Coal prices and outlook (2022 data, Oct 2023); EIA, Coal transportation rates, 2019 data", url:"https://www.eia.gov/energyexplained/coal/prices-and-outlook.php", note:"The 2022 figure is an average across all plants. A single plant near a mine would pay much less freight; that point is our judgement."},
   {h:"Two coals are not the same fuel", scope:"sub", sum:"Powder River Basin coal is typically 8,400 to 8,800 Btu per pound, against 12,000 to 13,000 for Eastern coal. A lower price per ton does not make it cheaper per unit of heat.",
    idea:"A plant buys coal for its heat. A pound of low-energy coal gives less heat, so more tons are needed and handled for the same electricity, and a boiler designed for one grade may run less well on another.",
    fact:"EIA reports that Powder River Basin coal typically contains 8,400 to 8,800 Btu per pound, compared with 12,000 to 13,000 Btu per pound for Eastern coal. In March 2013, spot PRB coal was about $10.25 per short ton, and transport and handling could add as much as $25 to $35 per short ton for delivery to the Southeast and Ohio Valley.",
    here:"The case says the quality of coal from GPE's own mine and from third parties is likely to differ, so processing needs different machines. It does not give the grades, so any price comparison between the two sources must be made per unit of heat.",
    ask:"What is the energy content per ton of our own coal, against the coal we buy?",
    defs:[["Powder River Basin (PRB)","a Wyoming and Montana coal region that produces low-energy, low-cost coal"],["Btu per pound","heat energy in a pound of coal"],["handling","unloading, storing and feeding coal into the plant"]],
    s:"EIA, Today in Energy, Mar 29 2013 (spot prices and heat content)", url:"https://www.eia.gov/todayinenergy/detail.php?id=10591", note:"The prices are from 2013. We use them to show the structure of the cost, not today's levels."}
  ]},
  {h:"4. Own mine or the market?", u:[4], intro:"The case's central idea: coal from GPE's own mine looks 30% cheaper, but the question is what the same coal could be sold for.", items:[
   {h:"A mine sells at a market price whoever the buyer is", scope:"sub", sum:"EIA publishes a mine sales price, the value of coal at the mine before transport. GPE could sell its own coal at that price, so burning it costs GPE the market price, not the 30% less.",
    idea:"Opportunity cost is what you give up by choosing one use of a resource over another. A tonne of coal burned in GPE's plant is a tonne it could have sold, so the cost of burning it is the price it would have fetched.",
    fact:"EIA defines the mine sales price as the free-on-board value of coal at the mine, excluding insurance or transportation. It publishes it alongside the spot price (a one-time open-market transaction for immediate delivery) and the average delivered price (the total cost of coal delivered to end users). EIA states that the electric power sector accounted for about 92% of US coal consumption in 2022.",
    here:"The case says GPE gets coal from its own mines at a rate 30% below third-party mines, that coal customers are diverse, and that all of them pay the same market price. Own-mine coal costs GPE the market price, because the alternative is selling it. The 30% is therefore not a real saving, and the mine is kept for other reasons: supply security, quality control and diversification.",
    ask:"What would the market pay for our coal, and what share of our coal comes from our own mines?",
    defs:[["opportunity cost","the value of the best alternative you give up"],["free on board (FOB)","a price at the point of sale, before shipping"],["transfer price","the price at which one part of a company sells to another"]],
    s:"EIA, What are the different coal prices published by EIA? (reviewed Sept 16 2024); EIA, Coal prices and outlook (2022 data, Oct 2023)", url:"https://www.eia.gov/tools/faqs/faq.php?id=18&t=5", note:"The 92% figure is mentioned only because the case says other customers exist. The case's own statement of 'a large market' is what carries the argument. The conclusion that the mine's value lies in security of supply is our judgement."},
   {h:"Plants mostly buy on long-term contracts, not the spot market", scope:"sub", sum:"EIA states that most coal sold for power generation is sold through long-term contracts, which are more stable than spot prices. A captive mine is the extreme form of that stability.",
    idea:"A contract fixes the price and quantity for a period, which protects a buyer from price swings but may leave it paying above market if prices fall. Owning the mine gives the same protection with more control, and the same risk of being tied to one source.",
    fact:"EIA states that most coal sold for electric power generation is sold through long-term contracts, that spot prices can fluctuate with short-term market conditions, and that contract prices tend to be more stable.",
    here:"GPE buys part of its coal from third parties and takes part from its own mines. The case does not say whether the third-party coal is bought under contract or on the spot market, which affects how exposed its cost is to price changes.",
    ask:"Is the third-party coal bought on contract or on the spot market?",
    defs:[["long-term contract","an agreement on price and volume over several years"],["spot price","the price for immediate delivery"],["supply security","being sure the plant can get fuel when it needs it"]],
    s:"EIA, Coal prices and outlook (2022 data, Oct 2023)", url:"https://www.eia.gov/energyexplained/coal/prices-and-outlook.php", note:"EIA also lists a May 2022 article saying spot deals and shorter contracts are a growing share of purchases. We could not read that article, so we do not use it as a fact."}
  ]},
  {h:"5. The ageing generators", u:[3], intro:"The second stage of the chain is generating the electricity. The case suggests the generators may be old and that new environmental rules may apply.", items:[
   {h:"Most US coal plants were built decades ago", scope:"sub", sum:"In 2017 EIA reported that 88% of coal capacity was built between 1950 and 1990 and that the capacity-weighted average age was 39 years. Older units tend to cost more to run and maintain.",
    idea:"Plants lose efficiency as they age and need more repair, so older units use more coal per MWh and cost more to keep running. The decision to keep running them depends on whether those costs fall below the revenue they earn.",
    fact:"EIA reported in April 2017 that most coal-fired capacity (88%) was built between 1950 and 1990, and that the capacity-weighted average age of operating coal plants was 39 years. In 2022 EIA reported that older, less efficient coal units face higher operating and maintenance costs, and that 23% of the 200,568 MW of operating coal capacity had reported plans to retire by the end of 2029.",
    here:"The case does not give GPE's plant ages. 'How old are the generators?' is the question it expects the candidate to ask, and the answer would show whether ageing is the cost driver.",
    ask:"How old are the ten plants, and how much coal does each burn per MWh?",
    defs:[["capacity-weighted average age","an average that counts larger plants more heavily"],["MW (megawatt)","one million watts, a measure of capacity"],["heat rate","coal burned per MWh, a measure of efficiency"]],
    s:"EIA, Apr 17 2017; EIA, Today in Energy on coal retirements, 2022", url:"https://www.eia.gov/todayinEnergy/detail.php?id=30812", note:"The 2017 age data are dated, and the 2022 retirement article is at https://www.eia.gov/todayinenergy/detail.php?id=54559. Whether GPE's ten plants are typical is our judgement."},
   {h:"Environmental rules add cost or end a plant's life", scope:"sub", sum:"After the 2015 mercury rule, about 87 GW of coal capacity added pollution controls and nearly 20 GW retired, with at least $6.1 billion spent between 2014 and 2016.",
    idea:"Environmental rules set limits on what a plant may emit. To comply, an owner can spend on pollution-control equipment, switch fuel, or close the plant, so a new rule changes either the cost per MWh or how long the plant lives.",
    fact:"EIA reports that between January 2015 and April 2016 about 87 GW of coal-fired plants installed pollution-control equipment, nearly 20 GW of coal capacity retired and about 5.6 GW switched fuel, mainly to natural gas, and that operators invested at least $6.1 billion from 2014 to 2016 to comply with the mercury and air toxics rule or other environmental regulations. EIA also notes that some plants must comply with wastewater discharge rules by 2028, which would require additional capital investment.",
    here:"The case lists new environmental laws as a possible cost for the generation stage but gives no detail. For GPE, the question is which rules apply to its ten plants and whether the compliance spend is already in its costs.",
    ask:"Which environmental rules apply to our plants, and what do they cost to meet?",
    defs:[["MATS","the Mercury and Air Toxics Standards, the 2015 US rule limiting mercury and other emissions from power plants"],["GW (gigawatt)","1,000 megawatts"],["fuel switching","converting a plant from burning coal to burning gas"]],
    s:"EIA, Today in Energy on MATS response (Apr 2016 data); EIA, retirements 2022", url:"https://www.eia.gov/todayinEnergy/detail.php?id=26972", note:"Federal rules have been changing. We have not checked the current status of MATS or the wastewater rule, so the figures are history, not today's requirements."}
  ]},
  {h:"6. What does 80% utilisation mean?", u:[5,6], intro:"The CEO wants utilisation raised from 80% to 90%. The industry notes explain why that target is not simple.", items:[
   {h:"Capacity factor measures how much of a plant's potential is used", scope:"sub", sum:"Capacity factor is actual output divided by potential output, and 70% or more indicates base-load operation. US coal plants have averaged more than 60% in winter and summer and less than 50% in spring and fall.",
    idea:"Utilisation, or capacity factor, compares what a plant produced with what it could have produced running flat out for the whole period. A figure below 100% is expected, because plants stop for maintenance and are not needed in every hour.",
    fact:"EIA defines capacity factor as the ratio of actual output to the total potential output over time, says that 70% or more indicates base-load operation and that peaking units usually run at less than 15%. In 2020 EIA reported that the coal fleet averaged more than 60% in winter and summer and less than 50% in spring and fall.",
    here:"The case gives GPE 80% utilisation against an industry average of 77%, which is 3 percentage points above the average. The CEO's 90% target is 10 percentage points above GPE's current level, and the case does not say what that extra utilisation would be worth.",
    ask:"What would 10 more points of utilisation earn, and what would it cost to reach them?",
    defs:[["utilisation / capacity factor","actual output as a share of the maximum possible output"],["base-load plant","a plant that runs almost continuously"],["peaking unit","a plant started only when demand is highest"],["percentage point","one unit of a percentage, so 80% to 90% is 10 points"]],
    s:"EIA, Electricity generation, capacity, and sales in the US, Feb 2026; EIA, Sept 1 2020", url:"https://www.eia.gov/energyexplained/electricity/electricity-in-the-us-generation-capacity-and-sales.php", note:"The 2020 averages are the national coal fleet and are lower than GPE's 80% in the case. The case's figures are as given, and we do not reconcile them."},
   {h:"A grid must hold capacity above its peak", scope:"sector", sum:"Regions keep a reserve margin, typically 14 to 17% above expected peak demand, because electricity cannot be stored cheaply. Spare capacity is what the system pays for to avoid shortages.",
    idea:"Electricity has to be produced at the moment it is used, and demand peaks on a few hot or cold hours. A system therefore needs enough plants for the peak, and those plants sit idle in other hours.",
    fact:"EIA stated in January 2013 that because large-scale electricity storage is not economic, electric systems must have enough supply to meet demand and replace unexpected losses. It defined reserve margin as supply capacity over and above the expected hourly peak for the year, and said NERC regional targets typically ranged from 14% to 17%.",
    here:"The case says demand for electricity is cyclical and that GPE must meet the peak. Running at 100% would leave no room for the peak, so 80% against a 77% industry average is not a sign of waste, and pushing to 90% would trade reliability for a number.",
    defs:[["reserve margin","capacity above expected peak demand, as a share of that peak"],["NERC","the North American Electric Reliability Corporation, which sets and monitors grid reliability standards"],["peak demand","the highest hourly demand in a year"]],
    s:"EIA, Today in Energy, Jan 23 2013", url:"https://www.eia.gov/todayinEnergy/detail.php?id=9671", note:"These are 2012 figures and describe regional grids, not a single company. The inference that GPE's 80% is deliberate is the case's own and is our judgement as well."}
  ]}
 ]
},
 "BTH-02": { title:"Breast Cancer Surgery device",
  sub:"Two layers of commentary first (the sector, then the sub-sector), then the notes in the order the case unfolds. Open any note for the idea, the evidence and what it means here. Anything that is our own judgement says so.",

  sector:{ h:"The sector: medical devices", s:"FDA, How to Study and Market Your Device (content dated Jan 30 2026); MedPAC, June 2017; GAO-15-13, Oct 2014",
   body:"A medical device is sold to a hospital or clinic, not to the patient, and the price is set by a negotiation between the maker and an organisation that buys for many hospitals. Before any sale the US Food and Drug Administration (FDA) must permit the device, and the route depends on risk: most low and moderate risk devices are cleared by showing they are similar to one already on the market (510(k)), while the highest-risk devices need premarket approval (PMA), which requires clinical evidence of safety and effectiveness. Medicare then pays the hospital for the whole procedure, with the average device cost built into that payment, so the hospital rather than the surgeon carries the cost of the device. Studies cited by MedPAC put devices at roughly 4% to 6% of total US health spending.",
   here:"The client's device is already FDA approved, so the case starts after the regulatory step and spends its time on the next question: what a buyer will pay. The case treats the buyer as 'clinicians' and gives adoption at four prices, which is a simplified stand-in for what is in practice a hospital purchasing decision.",
   defs:[["FDA","the US Food and Drug Administration, the regulator that decides whether a device may be sold"],["510(k)","a notification route in which the maker shows a new device is 'substantially equivalent' to a legally marketed earlier device"],["PMA (premarket approval)","the most demanding FDA route, required for Class III (highest-risk) devices, based on scientific evidence of safety and effectiveness"],["Medicare","the US federal health insurance programme, mainly for people aged 65 and over"],["bundled payment","one payment for a whole procedure, in which the cost of the devices is included rather than paid separately"]] },
  subsector:{ h:"The sub-sector: breast-conservation surgery (lumpectomy)", s:"American Cancer Society, 2026 estimates; BJS, 2024; Wing et al., Breast Cancer Research and Treatment, 2025",
   body:"Breast-conservation surgery (BCS), also called lumpectomy, removes the cancer and a rim of normal tissue around it and keeps the rest of the breast. A pathologist then examines the edge of the removed tissue, called the margin. If cancer cells reach the edge (a positive margin), the surgeon usually has to operate again, which is called a re-excision. Because the margin is only read after the operation, repeat surgery is a known and costly part of this procedure, and a device that tells the surgeon about the margin during the operation addresses that problem directly.",
   here:"The case describes a disposable device used in every BCS, with about 100,000 surgeries a year, and asks for a revenue-maximising price. It does not say what the device does, so the margin-detection explanation here is background on the kind of problem such a device solves, not a fact about the client's product.",
   defs:[["breast-conservation surgery (BCS) / lumpectomy","surgery that removes the tumour and some surrounding tissue but not the whole breast"],["mastectomy","surgery that removes the whole breast"],["surgical margin","the edge of the tissue the surgeon removed; a clear margin means no cancer cells reach it"],["positive margin","cancer cells found at the edge of the removed tissue, which usually leads to more surgery"],["re-excision","a second operation to remove more tissue after a positive margin"]] },
  sections:[
   {h:"1. What has to happen before the device can be sold", u:[1,2], intro:"The prompt says the device is FDA approved. This section explains what that status means and why it matters for pricing.", items:[
    {h:"The FDA route depends on the device's risk", scope:"sector", sum:"The FDA sorts devices into Class I, II and III by risk; most Class I and II devices go through 510(k) and Class III devices need PMA. The case only says 'FDA approved', so the route is something to ask.",
     idea:"The FDA does not review every device the same way. It places each one in one of three risk classes. Lower-risk devices usually need to show they are substantially equivalent to a device already sold (the 510(k) route). Devices with no similar earlier device but low to moderate risk can use the De Novo route. The highest-risk devices need premarket approval (PMA), which demands clinical data. The route matters commercially because a PMA takes more evidence and time, and creates a stronger barrier against copycat products.",
     fact:"The FDA states there are three classes: Class I (lowest risk, general controls), Class II (general and special controls) and Class III (highest risk, requiring PMA). 510(k) applies to most Class I and II devices, and De Novo applies to novel devices with no predicate where general or special controls give reasonable assurance of safety. The FDA describes PMA as the most stringent type of premarket submission and states the applicant must receive PMA approval before marketing the device.",
     here:"The case states the device is FDA approved, has no quality concerns and has a 100% success rate, and that there are no competitors. It does not say which route was used. That is a fair question, because it affects how easily a rival can follow.",
     ask:"Was the device approved through PMA, 510(k) or De Novo?",
     defs:[["Class I / II / III","the FDA's three risk categories for devices, from lowest to highest"],["predicate device","an earlier legally marketed device used as the comparison in a 510(k)"],["De Novo","an FDA route for new, low to moderate risk devices that have no predicate"],["substantial equivalence","similar enough in intended use, technology and performance to a predicate"],["barrier to entry","anything that makes it harder for a competitor to start selling"]],
     s:"FDA, How to Study and Market Your Device (content date Jan 30 2026); FDA, Premarket Approval (PMA) (last modified May 16 2019)", url:"https://www.fda.gov/medical-devices/device-advice-comprehensive-regulatory-assistance/how-study-and-market-your-device", note:"Which class a margin-detection device falls in is not stated in the case or on the FDA pages we read. That is left open on purpose."},
    {h:"A precedent: the first margin-detection device was approved through PMA", scope:"sub", sum:"A handheld margin-detection device, MarginProbe, received FDA premarket approval in January 2013 after a 664-patient pivotal study. It shows what a device of this kind has needed to reach the US market.",
     idea:"Devices that look for cancer at the edge of removed tissue during surgery have to prove that they find cancer that would otherwise be missed. That evidence then becomes the basis for the price, because the maker can point to repeat operations avoided.",
     fact:"Fierce Biotech reported on January 2 2013 that Dune Medical Devices received FDA premarket approval for MarginProbe, which detects cancer at or near the surface of tissue removed during a lumpectomy. The report states a pivotal study of 664 patients found the device was three times more effective at finding cancer on the margins than traditional imaging, and that earlier data showed it cut repeat operations by about 50%. The FDA approved modifications to the device in March 2016 (MassDevice, March 23 2016).",
     here:"The case's client is also the only supplier, with a 100% success rate and no competitors. A precedent matters because it shows the case's 'no competitors' position is a point in time, which the case's own risks list acknowledges ('competitors might replicate the device').",
     defs:[["pivotal study","the main clinical study submitted to the FDA to support approval"],["intraoperative","during the operation"],["margin detection","finding out, during or right after removal, whether cancer reaches the edge of the tissue"]],
     s:"Fierce Biotech, Jan 2 2013; MassDevice, Mar 23 2016", url:"https://www.fiercebiotech.com/medical-devices/dune-wins-fda-approval-for-marginprobe", note:"The trial figures come from a trade news report, not from the trial paper or FDA documents, so treat the '50%' and 'three times' as reported claims. That caution is our judgement."}
   ]},
   {h:"2. How big the market is and who actually buys", u:[2], intro:"The case sizes the market at 100,000 surgeries and treats each one as one device sold. This section checks the size against outside data and explains how the sale is made.", items:[
    {h:"The number of US breast cancer cases is large and still growing", scope:"sub", sum:"The ACS estimates 321,910 new invasive breast cancers and 60,730 DCIS cases in US women in 2026, with incidence rising about 1% a year. The case's 100,000 BCS a year is a plausible fraction of that, but the casebook gives no source.",
     idea:"A device used in one type of operation can only sell as many units as there are such operations. The operations come from new diagnoses, and only some patients are treated by lumpectomy rather than mastectomy, so the usable market is smaller than the total number of cases.",
     fact:"For 2026 the American Cancer Society estimates about 321,910 new cases of invasive breast cancer and about 60,730 new cases of ductal carcinoma in situ (DCIS) in US women, and states that incidence has risen about 1% a year in recent years (1.4% a year in women under 50). A study of 1.2 million women from 1998 to 2011 found that among women eligible for breast conservation, the share having a mastectomy was 34.3% in 1998 and 37.8% in 2011 (Kummerow et al., JAMA Surgery, reported by ScienceDaily, Nov 19 2014).",
     here:"The case gives 100,000 surgeries a year and does not split them by stage or say how this was counted. Its framework lists growth in the frequency of breast cancer but no data follows, so the 100,000 is treated as fixed.",
     ask:"Where does the 100,000 come from, and does it include repeat operations?",
     defs:[["invasive breast cancer","cancer that has spread from the milk duct or lobule into surrounding breast tissue"],["DCIS (ductal carcinoma in situ)","abnormal cells inside the milk ducts that have not spread into surrounding tissue; often treated surgically"],["incidence","the number of new cases in a given period"],["eligible for breast conservation","a patient whose tumour size and position allow lumpectomy as an option"]],
     s:"American Cancer Society, Key Statistics for Breast Cancer (2026 estimates); ScienceDaily on Kummerow et al., JAMA Surgery, Nov 19 2014", url:"https://www.cancer.org/cancer/types/breast-cancer/about/how-common-is-breast-cancer.html", note:"We could not find a source for the number of lumpectomies a year in the US, so we cannot say whether 100,000 is high or low. The ACS Facts and Figures 2024-2025 PDF did not contain the lumpectomy share."},
    {h:"Hospitals buy through group purchasing organizations and committees", scope:"sector", sum:"About 96% to 98% of US hospitals buy through group purchasing organizations (GAO, 2014), and MedPAC (2017) reports about 75% of hospital supply purchases go through them. The case's 'clinician' is only one of the people who decide.",
     idea:"A hospital rarely buys a device because one surgeon likes it. Many hospitals join a group purchasing organization (GPO), which negotiates a contract with the maker for all its members. Inside the hospital, a value analysis committee of managers and doctors compares the clinical benefit with the cost. The surgeon still has influence, because surgeons bring patients and revenue to the hospital.",
     fact:"GAO reported in October 2014 that approximately 96% to 98% of US hospitals purchase through GPO contracts, that administrative fees paid by vendors made up about 92% of the five largest GPOs' revenue in 2012, and that a 1986 safe harbor lets GPOs collect those fees if they are 3% or less of the purchase price. MedPAC (June 2017) reports that about 75% of total hospital supply purchases go through GPOs and that hospitals increasingly use technology assessment committees of managers and physicians.",
     here:"The case's exhibit measures the willingness of clinicians to adopt at each price. The case's own follow-up ('target large hospital networks') points to the same buyer, but it never says whether the price is negotiated per hospital or set once for all.",
     ask:"Is the price negotiated with each hospital or through a purchasing group?",
     defs:[["group purchasing organization (GPO)","an intermediary that negotiates supplier contracts on behalf of many hospitals"],["administrative fee","a percentage of sales that the supplier pays the GPO"],["safe harbor","a legal exemption that allows a practice that would otherwise breach the Anti-Kickback law"],["value analysis committee","a hospital group that decides whether a new product is worth its cost"],["Anti-Kickback statute","a US law against payments made to induce purchases paid for by federal health programmes"]],
     s:"GAO-15-13, Oct 2014; MedPAC, June 2017", url:"https://www.gao.gov/assets/gao-15-13.pdf", note:"The GAO figures date from 2012 to 2014, and the 75% figure is from a 2017 report; current shares may differ. That caveat is our judgement."}
   ]},
   {h:"3. Why the price can be tied to value", u:[3], intro:"The case finds the price from adoption at four prices. This section looks at what the buyer gets in return, which is what that willingness to pay is ultimately based on.", items:[
    {h:"Repeat surgery after a positive margin is common", scope:"sub", sum:"A 2024 review of 12 studies found a mean re-excision rate of 25.8% without a margin device and 10.9% with one. A 2025 US insurance study found 25% of lumpectomy patients had a second surgery.",
     idea:"If the edge of the removed tissue contains cancer cells, the patient normally has to go back for a second operation. A device that tells the surgeon during the first operation which edge needs more tissue lets the surgeon take it then, so the second operation is avoided. The value of such a device is therefore the cost and burden of the repeat surgery it prevents.",
     fact:"Rossou, Alampritis and Patel (BJS, 2024) reviewed 12 studies covering 2,680 patients on the MarginProbe device and reported a mean re-excision rate of 25.80% in control groups (range 8.6% to 39%) and 10.93% with the device (range 4% to 19.8%), a 54.68% relative reduction (P < 0.001). Wing and co-authors (Breast Cancer Research and Treatment, 2025) studied commercially insured US women with a first lumpectomy in 2016 to 2021 and found 25% needed a second breast surgery, of which 75% were repeat lumpectomies and 25% were mastectomies.",
     here:"The case gives no re-excision rate, so the exhibit's 50% adoption at $600 is the only value signal it supplies. The numbers above explain why a surgeon or hospital might accept a price in the hundreds of dollars for a disposable device.",
     ask:"What does the device do, and how many repeat operations does it prevent?",
     defs:[["relative reduction","the fall as a share of the starting rate: from 25.8% to 10.9% is a fall of 14.9 percentage points, which is 54.68% of 25.8% (BJS's reported figure)"],["control group","patients treated without the device, used as the comparison"],["P < 0.001","the chance that the difference is due to luck is under 1 in 1,000"],["systematic review","a study that collects and combines the results of many earlier studies"],["commercially insured","covered by a private insurer, not Medicare or Medicaid"]],
     s:"BJS (Rossou et al.), 2024; Springer, Breast Cancer Research and Treatment (Wing et al.), 2025", url:"https://academic.oup.com/bjs/article/111/1/znad335/7441103", note:"The BJS review is about one specific device and includes studies with a wide range of baseline rates (8.6% to 39%), so these rates are not a forecast for the client's device. That is our judgement."},
    {h:"What a repeat operation costs the payer", scope:"sub", sum:"In US commercial claims the median one-year cost was $36,750 for a single lumpectomy, $44,494 with a repeat lumpectomy and $91,026 with a mastectomy. This is the money a device that avoids repeats could save.",
     idea:"Value-based pricing sets the price by what the product saves or earns for the buyer, not by what it costs to make. The ceiling on the price is the saving, and the buyer is willing to pay part of that saving. The price in the case is therefore tied to a figure the case does not give: the cost of the problem the device solves.",
     fact:"Wing and co-authors (2025) report median healthcare spending in the year after surgery of $36,750 ($1,639 out of pocket) for a single lumpectomy, $44,494 ($2,324 out of pocket) for a lumpectomy followed by a repeat lumpectomy, and $91,026 ($3,473 out of pocket) for a lumpectomy followed by a mastectomy. They note that repeat procedures were more common among patients who did not receive an intraoperative adjunct for localisation or margin assessment.",
     here:"The case never states what the device saves, so the revenue-maximising price of $600 (50,000 units, $30.0M a year) cannot be compared with any saving. That is the same gap the case itself flags when it says revenue-maximising may not be profit-maximising.",
     ask:"What does the device save the hospital or the insurer per surgery?",
     defs:[["value-based pricing","setting the price by the benefit to the buyer, not by the cost of making the product"],["median","the middle value when all cases are ranked, so half are above and half below"],["out-of-pocket","the part the patient pays directly"],["claims data","billing records submitted by hospitals and doctors to insurers"],["adjunct","an extra technique or tool used alongside the main procedure"]],
     s:"Springer, Breast Cancer Research and Treatment (Wing et al.), 2025", url:"https://link.springer.com/article/10.1007/s10549-025-07735-1", note:"Our judgement: the difference between the first two medians is $7,744 ($44,494 minus $36,750). It compares two groups' medians over a year, not the cost of one re-excision, so it is only a rough sense of scale that a $600 device would be small against it."}
   ]},
   {h:"4. Who pays for the device", u:[2,3], intro:"A price that clinicians accept still has to be paid by someone. This section covers how US payers handle a new disposable device.", items:[
    {h:"Medicare folds the device into the procedure payment", scope:"sector", sum:"Medicare bundles the average cost of devices into the payment for the whole procedure, so the hospital bears the device cost and the surgeon generally does not (MedPAC, 2017). The case's 'will insurers cover it' is therefore a question about the bundle.",
     idea:"Insurers usually pay a fixed amount for a procedure and do not pay for each item used. If a new device adds cost but the payment does not change, the hospital absorbs the cost. A hospital will accept this only if the device saves it money elsewhere, for example by avoiding a second operation, or if the payer adds separate payment.",
     fact:"MedPAC (June 2017) states that Medicare bundles the average cost of medical devices into its overall payment rate for many services, which creates an incentive for hospitals to use lower-cost options but removes it for physicians, who are generally not financially responsible for the device cost.",
     here:"The case's framework lists 'insurance companies willingness to cover device cost as part of surgery' but supplies no data and asks no question about it. The $600 price therefore has an unstated assumption: that whoever pays accepts it.",
     ask:"Is the device paid separately, or does the hospital absorb it within the surgery payment?",
     defs:[["reimbursement","the payment a hospital or doctor receives from an insurer for care"],["incentive","a reason to behave in a particular way, here to choose cheaper or costlier devices"],["MedPAC","the Medicare Payment Advisory Commission, which advises the US Congress on Medicare"],["average cost","the typical device cost the payment is built around, not each hospital's actual spend"]],
     s:"MedPAC, An overview of the medical device industry, June 2017", url:"https://www.medpac.gov/wp-content/uploads/import_data/scrape_files/docs/default-source/reports/jun17_ch7.pdf", note:"This describes Medicare. Private insurers, who paid for the claims in the 2025 study above, negotiate their own rates, and we did not look at their policies."},
    {h:"New devices can get temporary separate payment", scope:"sector", sum:"Under the hospital outpatient system, a qualifying new device can receive a pass-through payment for at least two but not more than three years, covering the amount its cost exceeds the standard payment.",
     idea:"A bundled payment is slow to reflect a new device, because it is based on past costs. To avoid discouraging new technology, Medicare can pay extra for a new device for a limited time while it collects data, and then folds the cost into the standard rate.",
     fact:"CMS states that devices meeting the criteria in 42 CFR 419.66 can receive transitional pass-through payment, defined as the amount by which the device's cost exceeds the amount included in the applicable ambulatory payment classification (APC), for at least two but not more than three years, after which the cost is consolidated into the procedure's standard payment.",
     here:"The case gives only the price and adoption, so it assumes the buyer treats $600 as a cost it can recover. If the pass-through route applied, the device could be paid for separately for a limited time, but the case does not say whether it qualifies.",
     defs:[["CMS","the Centers for Medicare and Medicaid Services, which runs Medicare"],["OPPS","the Hospital Outpatient Prospective Payment System, how Medicare pays hospitals for outpatient care"],["APC","ambulatory payment classification: a group of similar outpatient procedures paid one rate"],["transitional pass-through payment","temporary extra payment for a qualifying new device or drug"]],
     s:"CMS, Hospital Outpatient Prospective Payment System guide for medical technology companies (page accessed Oct 2026, undated)", url:"https://cms.gov/cms-guide-medical-technology-companies-and-other-interested-parties/payment/opps", note:"Our judgement: whether a lumpectomy is paid in a hospital outpatient setting or an ambulatory surgery centre, and whether this device would qualify, are questions we have not researched."}
   ]},
   {h:"5. What could change the $600 answer", u:[4], intro:"The recommendation is $600 on today's adoption curve, with risks named. This section looks at two outside forces that could move that curve.", items:[
    {h:"Better surgical practice also lowers repeat surgery, with or without a device", scope:"sub", sum:"A 2014 guideline said 'no ink on tumor' is an adequate margin for invasive cancer, and one cohort of 314 lobular cancer cases saw its positive-margin rate fall from 42.7% to 25.5% after the guideline. A device competes with changes in standard practice.",
     idea:"Repeat surgery depends partly on the definition of a clear margin. If the accepted definition becomes less strict, fewer operations are labelled positive and fewer repeats are needed, which reduces the value of a device that finds more positive margins. The value the device offers is therefore not fixed.",
     fact:"The SSO-ASTRO consensus guideline (February 2014) states that 'no ink on tumor' is an adequate negative margin in invasive breast cancer treated with breast-conserving surgery and whole-breast radiation, based on a meta-analysis of 33 studies and 28,162 patients in which positive margins doubled the risk of local recurrence and wider negative margins gave no significant extra benefit. It states the standard has the potential to decrease re-excision rates. Piper and co-authors (npj Breast Cancer, 2019) report that in 314 cases of invasive lobular carcinoma the positive-margin rate fell from 42.7% to 25.5% after the 2014 guidelines.",
     here:"The case's adoption curve (50% at $600) was measured under today's practice. The case's own follow-up says marketing could shift that curve, and the same is true of practice: if the number of repeat operations falls for other reasons, the curve and the best price could shift.",
     ask:"When was the willingness-to-pay research done, and under what clinical practice?",
     defs:[["SSO-ASTRO","the Society of Surgical Oncology and the American Society for Radiation Oncology, which wrote the guideline"],["'no ink on tumor'","the rule that a margin is clear if the dye applied to the cut edge does not touch tumour cells"],["local recurrence","cancer coming back in the same breast"],["whole-breast radiation","radiotherapy to the entire breast after lumpectomy"],["invasive lobular carcinoma","a type of invasive breast cancer that starts in the milk-producing lobules and is often harder to remove cleanly"]],
     s:"SSO-ASTRO consensus guideline, Feb 2014; Piper et al., npj Breast Cancer, 2019", url:"https://surgonc.org/wp-content/uploads/2019/02/sso-astro_consensus_guideline_on_margins_for_breast_conserving_surgery_final.pdf", note:"The lobular cohort is a single study of one cancer type, so it should not be read as the national effect of the guideline. That is our judgement."},
    {h:"A sole supplier should price for rivals arriving", scope:"sector", sum:"AdvaMed counts over 6,500 US medtech companies, mostly small, in a highly competitive business. The case's no-competitor position is a moment in time, and its own risk list says rivals may copy the device.",
     idea:"A sole supplier can set a high price only while no one else can sell a substitute. Patents, regulatory approval and exclusive contracts slow competitors, but a profitable market attracts entrants. A price chosen only for the no-competitor situation can lose share quickly later.",
     fact:"AdvaMed states there are over 6,500 medtech companies in the US, mostly small and medium-sized enterprises with most having fewer than 100 employees, and calls the business highly competitive. It states the US is the largest medical device market, over 40% of the global medtech market.",
     here:"The case's risks and next steps say competitors might replicate the device and propose raising barriers by patenting and signing exclusivity agreements with clinicians. It also says to add costs to find the profit-maximising price. Both points concern what happens after the $600 answer.",
     defs:[["medtech","medical technology, a term for the device industry"],["small and medium-sized enterprise (SME)","a company with relatively few employees and modest revenue"],["exclusivity agreement","a contract in which a buyer agrees to use only one supplier"],["patent","a legal right that stops others from copying an invention for a set period"]],
     s:"AdvaMed, Medical Device Industry Facts (page accessed Oct 2026, undated)", url:"https://www.advamed.org/medical-device-industry-facts/", note:"The company count is for the whole device industry, not for breast surgery, so it shows the general level of competition but does not predict whether anyone would copy this device. That is our judgement."}
   ]}
  ]},
 "BTH-05": { title:"Cleaning products: a price rise across five product lines",
 sub:"Two layers of commentary first (the sector, then the sub-sector), then the notes in the order the case unfolds. Open any note for the idea, the evidence and what it means here. Anything that is our own judgement says so.",

 sector:{ h:"The sector: consumer packaged goods (household products)", s:"Procter & Gamble, 2025 Annual Report; Circana, Mar 31 2026",
  body:"Consumer packaged goods (CPG) are everyday products that are bought often, stocked on shelves and sold mostly through large retailers. The makers earn their money from a brand and from scale, and they depend on a small number of retail customers. Procter & Gamble reported that sales to Walmart and its affiliates were about 16% of its total sales in both 2025 and 2024. Store-brand (private label) products made for the retailers are the main alternative to a branded product, and Circana put them at a 23% dollar share of US CPG sales, about $330 billion, in a report published on March 31, 2026.",
  here:"The client in the case is a maker of branded household products with $3 billion of annual revenue. Every number the case uses (the revenue base, the price changes and the unchanged volumes) is a manufacturer's view. The sector facts tell you which outside parties, retailers and rival brands, can change the result after the manufacturer sets its prices.",
  defs:[["CPG","consumer packaged goods: everyday goods sold in packages through retailers"],["private label","a product sold under the retailer's own name, also called a store brand"],["dollar share","the percentage of total sales value, in dollars, that a group of products holds"],["affiliates","companies that are owned by or closely tied to a larger company"]] },
 subsector:{ h:"The sub-sector: household cleaning products", s:"Clorox 10-K filings (fiscal 2023 and 2024); Procter & Gamble, 2025 Annual Report",
  body:"Household cleaning covers dish soap, laundry detergent, hand wash, surface cleaners and similar goods. Their cost depends on raw materials such as petroleum-based resins for plastic bottles and pulp for paper packaging, plus transport and labour. The main commercial questions are how much volume is lost when a price rises, how retailers and store brands respond, and how much of the list price is given back through promotions.",
  here:"The case closes off cost savings and new products, so price is the only lever left. The sub-sector facts show why that is a reasonable place for the interview to end up, and also why the case's assumption that volumes stay the same is the part to test.",
  defs:[["resin","a plastic material, here a petroleum-based one used for bottles and packaging"],["pulp","wood fibre used to make paper and cardboard packaging"],["price elasticity","the percentage change in units sold for each 1% change in price"],["trade promotion","a discount or payment a manufacturer gives a retailer to feature a product"]] },
 sections:[
  {h:"1. Why price is the lever", u:[2], intro:"The interviewer closes the cost and new-product branches, so the only way left to raise profit is to earn more per unit already sold.", items:[
   {h:"A small price change moves profit a lot", scope:"sector", sum:"McKinsey found that a 1% price rise with unchanged volume lifted operating profit by about 8% across S&P 1500 companies. Price is the fastest lever because it needs no new capacity or cost.",
    idea:"Operating profit is revenue minus operating costs. If the quantity sold and the cost of making it stay the same, every extra dollar of price goes straight to profit, because no extra cost comes with it. A 1% price rise is therefore a much bigger percentage of profit than of revenue, since profit is a small slice of revenue.",
    fact:"McKinsey wrote that a price rise of 1 percent, if volumes remained stable, would generate an 8 percent increase in operating profits, based on S&P 1500 companies.",
    here:"The case aims at +$30M, which is 1% of $3B revenue. Because costs are closed and volume is assumed unchanged, the whole +$30M target would reach profit. The result depends on volume really staying unchanged.",
    defs:[["operating profit","revenue minus the costs of running the business, before interest and tax"],["S&P 1500","a US stock index covering about 1,500 large, mid-size and small listed companies"],["volume","the number of units sold"]],
    s:"McKinsey & Company, \"The power of pricing\", Feb 2003", url:"https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/the-power-of-pricing",
    note:"The 8% figure is an average from 2003 and depends on each company's margin and on volume holding. The note that this is a rule of thumb, not a forecast for this client, is our judgement."},
   {h:"Volume and price are separate sources of revenue", scope:"sector", sum:"Clorox reported fiscal 2025 net sales flat: volume added 1 point and price/mix took away 1 point. Growth is built from the two, so a price case has to say what happens to volume.",
    idea:"Revenue equals price times units. Companies report the change in sales as a volume effect and a price/mix effect. Price/mix includes mix, which is the shift between cheaper and dearer products, as well as list-price changes.",
    fact:"Clorox said net sales for fiscal 2025 were essentially flat, with volume contributing +1 percentage point and price/mix -1 point. It attributed the price/mix result to product mix and higher trade promotion spending.",
    here:"The case treats price as the only variable, which is the interviewer's simplification. In practice the same $3B base would also move with units and mix, which is why the interviewer restates volume as unchanged.",
    defs:[["price/mix","the part of a sales change that comes from price and from the product mix, not from units"],["percentage point","a change of one unit in a percentage, for example from 5% to 6%"],["net sales","sales after discounts and promotional allowances"]],
    s:"The Clorox Company, Q4 and FY25 results release, Aug 2025", url:"https://investors.thecloroxcompany.com/news/news-details/2025/Clorox-Reports-Q4-and-FY25-Results-Provides-FY26-Outlook/default.aspx"}
  ]},
  {h:"2. Why cost is already closed", u:[2], intro:"The interviewer says there are no cost savings. Real manufacturers also face costs they do not control.", items:[
   {h:"Raw materials and freight are not under the maker's control", scope:"sub", sum:"P&G lists resins, pulp, labour, tariffs, transport and energy as cost items that move with outside prices. A household-products maker has little room to cut these.",
    idea:"A cleaning product is mostly chemicals and water in a plastic bottle or paper box. The maker buys the bottle material, the packaging and the freight at market prices, so its unit cost moves with those prices, not with its own effort.",
    fact:"P&G wrote that its costs are subject to fluctuations, particularly from commodities including certain petroleum-derived materials like resins and paper-based materials like pulp, plus labour, tariffs, transportation, energy, pensions and healthcare.",
    here:"The case simply states that no cost savings exist. The sub-sector evidence shows why that is believable and also why a price rise might be needed just to keep margin steady.",
    defs:[["commodity","a raw material bought and sold at a market price, such as resin or pulp"],["tariff","a tax on imported goods"],["margin","profit as a percentage of revenue"]],
    s:"Procter & Gamble, 2025 Annual Report (fiscal year ended June 30 2025)", url:"https://s204.q4cdn.com/332108499/files/doc_financials/2025/ar/2025_annual_report.pdf"},
   {h:"Costs can rise faster than the list price", scope:"sub", sum:"Clorox listed higher manufacturing and logistics costs and more trade promotion spending among its fiscal 2025 headwinds. A closed cost branch is as likely to mean costs are rising as that they are fixed.",
    idea:"Even when a company finds savings, they can be offset by cost inflation and by money spent on promotions. Both reduce the profit left after a price rise.",
    fact:"In its fiscal 2025 results release Clorox cited unfavourable price/mix from product mix and elevated trade promotion spending, and higher manufacturing and logistics costs that partly offset gross margin gains from cost-saving programmes.",
    here:"The case does not mention promotions, so the $39M assumes the full list-price rise reaches the company. If part of the rise is given back as promotion, the profit gain would be below $39M.",
    defs:[["gross margin","revenue minus the direct cost of making the goods, as a percentage of revenue"],["headwind","a factor working against results"],["list price","the standard price before any discounts"]],
    s:"The Clorox Company, Q4 and FY25 results release, Aug 2025", url:"https://investors.thecloroxcompany.com/news/news-details/2025/Clorox-Reports-Q4-and-FY25-Results-Provides-FY26-Outlook/default.aspx",
    note:"Clorox is one company and the release does not split out which cost drivers were largest, so it supports the direction but not a size. That limit is our judgement."}
  ]},
  {h:"3. Do volumes really stay unchanged?", u:[3,4], intro:"The exhibit is titled price elasticity but states that volumes do not change. That is the assumption the whole $39M depends on.", items:[
   {h:"Clorox lost 10% of volume in a year of price rises", scope:"sub", sum:"In fiscal 2023 Clorox's volume fell 10% while net sales rose 4% on price/mix, and in fiscal 2024 volume fell 6% with higher pricing cited. Real price rounds in this sub-sector have cost volume.",
    idea:"Price elasticity measures how many units are lost when price rises. If elasticity is zero, volume does not move, as the case assumes. If it is, say, -1, a 1% price rise loses 1% of units and revenue stays flat.",
    fact:"Clorox's fiscal 2023 10-K says volume declined 10% while net sales grew 4%, with the gap due to favourable price mix. Its fiscal 2024 10-K says net sales and volume decreased 4% and 6% respectively, driven by lower shipments from the cyberattack and higher pricing.",
    here:"The case holds volume constant for all five lines: dish washing -2%, detergent +1%, hand wash 0%, shower gel +2% and all-purpose soap +4%. Clorox's record shows why the interviewer's research claim, and not the arithmetic, is the part to question.",
    ask:"What was the research method, and does it cover every region where the products are sold?",
    defs:[["fiscal year","a company's accounting year, which may not match the calendar year"],["shipments","units the company sends to its retail customers"],["10-K","the annual report US listed companies file with the SEC"],["elasticity of -1","a 1% price rise loses 1% of units sold"]],
    s:"The Clorox Company, Form 10-K for fiscal 2023 and Form 10-K for fiscal 2024 (SEC EDGAR)", url:"https://www.sec.gov/Archives/edgar/data/21076/000002107624000030/clx-20240630_d2.htm",
    note:"Clorox's volume falls also include other causes, such as the 2023 cyberattack, so they do not prove an elasticity for this client. That is our judgement."},
   {h:"Add dollars, not percentages", scope:"sector", sum:"The case's five percentages are price changes and its five weights are revenue shares, so they cannot be added. In dollars the lines give -$3M, +$6M, $0, +$18M and +$18M, a total of +$39M, or 1.3% of $3B.",
    idea:"A percentage is only meaningful with its base. A 4% rise on a small line and a 2% rise on a large line cannot be averaged without first turning each into dollars using the revenue of that line.",
    fact:"McKinsey states that a price rise of 1 percent, if volumes remained stable, would generate an 8 percent increase in operating profits. The size of the effect is stated against a base, which is the revenue the percentage is applied to.",
    here:"Dish washing is 5% of $3B = $150M, so -2% is -$3M. Detergent is 20% = $600M, so +1% is +$6M. Hand wash is 30% = $900M at 0%, so $0. Shower gel is 30% = $900M, so +2% is +$18M. All-purpose soap is 15% = $450M, so +4% is +$18M. The total is +$39M against the $30M target. Simply adding -2, +1, 0, +2 and +4 would give +5%, which is wrong.",
    defs:[["base","the amount a percentage is taken of"],["weight","a line's share of total revenue"],["weighted sum","each line's change in dollars, added up"]],
    s:"McKinsey & Company, \"The power of pricing\", Feb 2003", url:"https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/the-power-of-pricing",
    note:"The McKinsey article does not discuss weighted averages; the connection to the case's arithmetic is our judgement."}
  ]},
  {h:"4. How retailers and rivals may respond", u:[5], intro:"The recommendation lists competitor response as a risk. These are the two parties that decide it.", items:[
   {h:"A few retailers buy a large share of the output", scope:"sector", sum:"Walmart and affiliates were about 16% of P&G's sales in 2025, and P&G warned that retailer concentration could create cost and margin pressure. A price rise has to be accepted by the retailer before the shopper sees it.",
    idea:"A household-products maker sells to retailers, not directly to shoppers. The retailer decides the shelf price and the shelf space, so a manufacturer's price rise only works if the retailer agrees to pass it on.",
    fact:"P&G said sales to Walmart and affiliates were approximately 16% of total sales in 2025 and 2024, and that continued concentration among retail customers could create significant cost and margin pressure on its business.",
    here:"The case's five price changes would all be taken to the client's retail customers at once. The case does not say how those customers would react.",
    ask:"Who are the largest customers, and what share of the $3B do they account for?",
    defs:[["pass-through","when a retailer raises its shelf price by the amount of the maker's increase"],["concentration","a large share of sales coming from a few customers"],["shelf space","the room a retailer gives a product on its shelves"]],
    s:"Procter & Gamble, 2025 Annual Report", url:"https://s204.q4cdn.com/332108499/files/doc_financials/2025/ar/2025_annual_report.pdf"},
   {h:"Store brands are growing faster than national brands", scope:"sub", sum:"PLMA reported US store-brand dollar sales up 3.3% in 2025 against 1.2% for national brands, at a 21.3% dollar share. If the client raises prices, a cheaper store brand is the nearest alternative.",
    idea:"A private label product is made for a retailer and sold under its name, usually at a lower price. When branded prices go up, the price gap to the store brand widens, and some shoppers switch.",
    fact:"PLMA reported US private label dollar sales of $282.8 billion in 2025, a dollar share of 21.3% (19.1% in 2021) and a unit share of 23.5%. Store brand dollar sales rose 3.3% against 1.2% for national brands.",
    here:"The case's risk 'competitors may lower prices' is about this gap. The +4% on all-purpose soap and +2% on shower gel are where the gap would widen most, and those two lines carry $36M of the $39M.",
    defs:[["national brand","a brand owned and sold by a manufacturer across many retailers"],["unit share","the percentage of total units sold, as opposed to dollars"],["PLMA","Private Label Manufacturers Association, a trade body for store-brand makers"]],
    s:"PLMA, Jan 20 2026", url:"https://www.plma.com/article/us-private-label-industry-reached-2828-billion-sales-2025",
    note:"The PLMA figures cover all store-brand products, food included, not household cleaning alone. Treating them as a general signal is our judgement."}
  ]},
  {h:"5. A one-time step, not a growth rate", u:[5], intro:"The recommendation ends by saying the gain cannot be repeated next year.", items:[
   {h:"Prices elsewhere were rising at a modest pace", scope:"sector", sum:"US consumer prices rose 2.7% over the 12 months to December 2025, and goods excluding food and energy rose 1.4%. A +4% rise on one line is large against that backdrop.",
    idea:"The consumer price index (CPI) measures the average change in prices households pay. Shoppers notice a price rise more when it is larger than what they see elsewhere.",
    fact:"The US Bureau of Labor Statistics reported that the all-items CPI-U rose 2.7% over the 12 months ending December 2025, and that commodities excluding food and energy rose 1.4% over the past 12 months.",
    here:"The case's moves range from -2% to +4% in one step. Against the backdrop of a 1.4% yearly rise in goods prices, the +4% on all-purpose soap is the move most likely to be noticed, and the gain cannot be repeated each year.",
    ask:"Are the price changes planned as a single step, or as a yearly programme?",
    defs:[["CPI-U","the consumer price index for all urban consumers, published monthly by the BLS"],["BLS","the US Bureau of Labor Statistics"],["12-month change","the change from the same month a year earlier"]],
    s:"US Bureau of Labor Statistics, CPI release for December 2025, Jan 13 2026", url:"https://www.bls.gov/news.release/archives/cpi_01132026.htm",
    note:"These are economy-wide indexes, not a household cleaning index, which we did not read. Using them as a rough yardstick is our judgement."},
   {h:"Promotions can give the price rise back", scope:"sub", sum:"Clorox named elevated trade promotion spending as a reason its fiscal 2025 price/mix fell 1 point. A list-price rise that is followed by more promotion would not reach $39M.",
    idea:"Makers often pay retailers to feature or discount a product. These payments are deducted from sales, so a higher list price can be offset by higher promotion spending.",
    fact:"Clorox attributed its unfavourable price/mix in fiscal 2025 to product mix and elevated trade promotion spending.",
    here:"The case's +$39M is a change in list-price revenue. Its three risks (research coverage, competitor response, one option tested) do not include promotion, so it is a fourth item to raise.",
    defs:[["trade spend","money a manufacturer gives retailers for discounts, displays and features"],["elevated","higher than normal"]],
    s:"The Clorox Company, Q4 and FY25 results release, Aug 2025", url:"https://investors.thecloroxcompany.com/news/news-details/2025/Clorox-Reports-Q4-and-FY25-Results-Provides-FY26-Outlook/default.aspx",
    note:"Adding promotion as a fourth risk is our judgement; the casebook lists only three."}
  ]}
 ]
}
};

const MATHDRILLS = {
"BTH-01": { title:"Hotels on a military base",
 sub:"Nine pieces of arithmetic, in the order they are easiest to learn. Each one is a skill the case uses, explained from scratch, then worked with the case's own numbers. Open one to see the steps.",
 items:[
 {h:"Multiplying a count by a size", lvl:1, u:[5],
  sum:"The hotel's yearly capacity is rooms times nights. Both are counts, so the answer is a count of room-nights.",
  idea:"When something repeats, the total is how many there are times how many times each one repeats. A hotel has a number of rooms, and every room can be sold once per night, so the most it can ever sell is rooms times nights.",
  ex:[{say:"The hotel has 400 rooms and a year has 365 nights.", f:"400 rooms × 365 nights"},{say:"Multiply. Each room-night is one room sold for one night.", f:"= 146,000 room-nights per year"}],
  units:"rooms × nights = room-nights. A room-night is the unit hotels count sales in.",
  mistake:"Dividing by 12 and treating a month as 30 days is fine for a rough answer, but the case uses 365. Use the same number of days everywhere, or two answers that should match will not.",
  defs:[["room-night","one room occupied for one night"],["capacity","the most the hotel can sell in a year if every room were sold every night"]]},
 {h:"Turning a schedule into a volume", lvl:1, u:[4],
  sum:"Three kinds of guest each give a number of room-nights: classes, 7 nights a week, and a rotation spread over three years. Add the three.",
  idea:"If a group of people stays for a number of nights, and the group arrives several times a year, the room-nights are people times nights per stay times arrivals. Work out each kind of guest on its own line and add the lines at the end.",
  ex:[{say:"Basic training: 200 soldiers stay 10 weeks, which is 70 nights, and the class runs 5 times a year.", f:"200 soldiers × 70 nights × 5 classes = 70,000"},{say:"Advanced training: 50 soldiers stay 4 weeks, which is 28 nights, and the class runs 10 times a year.", f:"50 soldiers × 28 nights × 10 classes = 14,000"},{say:"Rotations: 9,000 soldiers move once every 3 years, so 9,000 ÷ 3 = 3,000 move in a typical year. Each gets 15 nights.", f:"{9,000 soldiers|3 years} × 15 nights = 45,000"},{say:"Add the three lines.", f:"70,000 + 14,000 + 45,000 = 129,000 room-nights per year"}],
  units:"Every line ends in room-nights per year, which is why they can be added. The rotation line has to be divided by 3 first, because the 9,000 soldiers are spread over three years, not one.",
  mistake:"Counting all 9,000 rotating soldiers in one year gives 135,000 room-nights for that line instead of 45,000, which more than doubles the total.",
  defs:[["rotation","a soldier being transferred to a new base, which happens about every 3 years"],["class","one group of soldiers going through a course together"]]},
 {h:"Taking a ceiling off a payment", lvl:1, u:[3],
  sum:"The Army pays $75 a night for the room and two meals together. Take the meals off to find the most the room can cost.",
  idea:"A ceiling is the most a buyer will pay. When one payment has to cover several things, the room's ceiling is the payment minus everything else it has to cover.",
  ex:[{say:"The Army pays $75 a night, and that has to cover breakfast and dinner too. The casebook takes about $15 for the two meals.", f:"$75 − $15 = $60 per night"},{say:"So the room can be priced at $60 or below. Hotels charging $75 or $110 are above the whole allowance.", f:"room price ≤ $75 − meals"}],
  units:"Dollars per night throughout. The $15 for meals is the casebook's own assumption; the case never gives what two meals cost.",
  mistake:"Pricing the room at $75 treats the whole allowance as room money. The soldier would then have nothing left for meals and would pay it from their own pocket.",
  defs:[["per diem","a fixed daily travel allowance paid for the soldier's stay"],["ceiling","the highest price the buyer will pay"]]},
 {h:"Revenue is price times volume", lvl:2, u:[4,5],
  sum:"Revenue is the price of one room-night times the number of room-nights sold. At $60 and 120,000 room-nights that is $7.2 million a year.",
  idea:"Revenue is the money coming in before any costs are taken off. For a hotel it is the price of one room-night times the number of room-nights sold, so you need both numbers in the same period, here one year.",
  ex:[{say:"The hotel sells 120,000 room-nights a year at $60 each.", f:"120,000 room-nights × $60 per room-night"},{say:"Multiply, then write it in millions: 7,200,000 dollars is 7.2 million dollars.", f:"= $7,200,000 = $7.2M per year"}],
  units:"room-nights × dollars per room-night = dollars. Writing $7.2M instead of $7,200,000 keeps later steps readable.",
  mistake:"Using the unrounded demand of 129,000 gives $7.74M, not $7.2M. The number you multiply must be what the hotel can actually sell, not what people want (see the next drill).",
  defs:[["revenue","money received from sales, before costs"],["$M","millions of dollars"]]},
 {h:"The smaller of demand and capacity", lvl:2, u:[5],
  sum:"The hotel can only sell what it has rooms for. A shortage of 80 rooms a night over four months removes about 10,000 room-nights.",
  idea:"Demand is how many room-nights people want. Sales can never be more than the hotel can supply. When capacity is short only for part of the year, work out how much is turned away in that window and subtract it from demand.",
  ex:[{say:"In the busiest four months the hotel is 80 rooms short each night. Four months is about 4 × 30 = 120 nights.", f:"80 rooms × 120 nights = 9,600 room-nights turned away"},{say:"The casebook rounds this to 10,000 and subtracts it from the demand of 130,000.", f:"130,000 − 10,000 = 120,000 room-nights sold"}],
  units:"rooms × nights = room-nights. Over a whole year the hotel has 146,000 room-nights of capacity, which is more than 130,000, so a yearly average hides the shortage.",
  mistake:"Comparing yearly demand (130,000) with yearly capacity (146,000) and concluding there is no problem. The shortage happens in a few months, and people turned away in those months are lost.",
  defs:[["demand","room-nights people want to buy"],["turned away","demand the hotel cannot serve because every room is full"]]},
 {h:"Profit is revenue minus cost", lvl:2, u:[6],
  sum:"Subtract running costs from revenue to get a yearly profit. The building cost is separate: 400 rooms at $50,000 each is $20 million, paid once.",
  idea:"Profit is what is left of revenue after costs. Costs that repeat every year are subtracted from that year's revenue. A cost paid once, like building the hotel, is kept apart, because it is not part of any single year's trading.",
  ex:[{say:"Revenue is $7.2M and running costs are $4M a year.", f:"$7.2M − $4M = $3.2M per year"},{say:"The building costs $50,000 per room and there are 400 rooms.", f:"400 rooms × $50,000 per room = $20,000,000 = $20M, once"}],
  units:"The $3.2M is dollars per year. The $20M is dollars, once. They have different units, so they are not added together.",
  mistake:"Subtracting the $20M from one year's revenue makes the hotel look like a loss of $16.8M. It is an investment that the yearly profit then pays back.",
  defs:[["operating cost","the cost of running the hotel each year"],["initial investment","the one-off cost of building it"]]},
 {h:"Payback: one outlay over a yearly profit", lvl:2, u:[7],
  sum:"Divide the $20 million spent once by the $3.2 million earned each year. It takes 6.25 years to get the money back, against a 4 to 5 year requirement.",
  idea:"Payback is how long it takes for yearly profits to add up to the money first spent. Divide what was spent by what comes back each year. The answer is in years, because dollars cancel and the 'per year' is left.",
  ex:[{say:"The build costs $20M and the hotel earns $3.2M a year.", f:"{$20M|$3.2M per year} = 6.25 years"},{say:"The client wants its money back within 4 to 5 years, so compare the two numbers directly. 6.25 is above 5.", f:"6.25 years − 5 years = 1.25 years too slow"}],
  units:"dollars ÷ (dollars per year) = years. If the answer comes out in the wrong unit, a number is in the wrong period.",
  mistake:"Rounding 6.25 up to '6 to 7 years', as the casebook does, widens the gap with the 4 to 5 year requirement. Keep 6.25 and say it is 1.25 years over.",
  defs:[["payback period","years of profit needed to recover the money first spent"],["hurdle","the standard an investment must meet to be accepted"]]},
 {h:"Payback and annual return are two views of one fact", lvl:3, u:[7],
  sum:"$3.2M earned on $20M is 16% a year. Payback is 1 divided by that return, which gives 6.25 years again. A good return can still fail a timing test.",
  idea:"Annual return is the yearly profit divided by the money put in. Payback is the same two numbers the other way up. They describe the same cash flow, but one is a rate and one is a length of time, and a client can care about only one of them.",
  ex:[{say:"Divide the yearly profit by the money put in.", f:"{$3.2M per year|$20M} = 0.16 = 16% per year"},{say:"Turn it upside down to get the years.", f:"{1|0.16 per year} = 6.25 years"}],
  units:"A return is dollars per year per dollar invested, written as a percentage per year. Payback is years. Never compare one to the other directly.",
  mistake:"Saying 16% is a poor return. Many investors would accept 16%. The deal fails here because this client set a time limit, not a return target.",
  defs:[["annual return","yearly profit as a percentage of the money invested"]]},
 {h:"What it would take to close the gap", lvl:3, u:[7,8],
  sum:"Working backwards: to repay $20M in 5 years the hotel needs $4M a year, which is $0.8M more than it earns. Our own estimate of the extra rooms needed follows from that.",
  idea:"The required figure is what the client's rule demands. The achievable figure is what the numbers show. The gap between them says how much the plan has to improve and, divided by the price, how much extra volume that means.",
  ex:[{say:"To get $20M back in 5 years, the hotel must earn this much each year.", f:"{$20M|5 years} = $4.0M per year"},{say:"It earns $3.2M, so it is short by", f:"$4.0M − $3.2M = $0.8M per year"},{say:"At 4 years the requirement is higher, so the shortfall is larger.", f:"{$20M|4 years} − $3.2M = $5.0M − $3.2M = $1.8M per year"},{say:"Our own estimate: if each extra room-night adds its full $60 to profit, $0.8M needs this many more nights sold. This is optimistic, since extra guests would also cost something.", f:"{$0.8M|$60 per room-night} ≈ 13,300 room-nights"}],
  units:"dollars ÷ years = dollars per year. dollars per year ÷ dollars per room-night = room-nights per year.",
  mistake:"Treating the 13,300 as achievable. The hotel is already short of rooms for four months of the year and cannot raise its price, so the gap is more likely to be closed by other income or lower cost than by extra room-nights.",
  defs:[["required","what the client's rule demands"],["achievable","what the numbers support"]]}
 ]},

"BTH-19": { title:"Heavy attrition",
 sub:"This case gives almost no numbers, so the arithmetic here is about reading words like 'heavy' and 'average' correctly. Where a number is ours rather than the case's it says so, and the case supplies none for you to check against.",
 items:[
 {h:"How much of the time a new hire is productive", lvl:1, u:[2],
  sum:"New hires stay under a year and take six months to learn the job, so at most half of the time they are with the company is productive.",
  idea:"If a task takes part of a person's time before they are useful, subtract it from the time they stay. What is left is the useful time, and the useful share is that time divided by the time they stay.",
  ex:[{say:"A new hire stays less than 12 months and spends the first 6 months learning.", f:"12 months − 6 months = 6 months productive, at most"},{say:"As a share of the whole stay:", f:"{6 months|12 months} = 0.5 = 50%, at most"}],
  units:"months − months = months; months ÷ months has no unit, so it is a share. Because the stay is under 12 months, 50% is the upper limit; the true share is lower.",
  mistake:"Reading 'less than one year' as 'one year'. The real figure is smaller, so the true productive share is below 50%.",
  defs:[["ramp-up","the months a new hire needs before they do the job well"],["tenure","how long someone has worked at the company"]]},
 {h:"What 'heavy' attrition is measured against", lvl:1, u:[1],
  sum:"Attrition rate is people who left divided by average headcount over the period. Without a second number to compare it to, 'heavy' means nothing. The numbers in this drill are ours.",
  idea:"An attrition rate turns a count of leavers into a percentage of the team, so teams of different sizes can be compared. It is leavers in a period divided by the average number of people employed in that period.",
  ex:[{say:"Illustration (ours; the case gives no figures). Suppose 12 of an average of 40 salespeople left in a year.", f:"{12 leavers|40 average salespeople} = 0.30 = 30% per year"},{say:"This only becomes 'heavy' or 'normal' when set against a second number, such as last year or the industry.", f:"30% vs 15% last year → twice as high"}],
  units:"people ÷ people = a share, and a share needs a period attached ('per year'). Percent without a period cannot be compared.",
  mistake:"Quoting leavers as a raw count. 12 leavers means something different in a team of 40 than in a team of 400.",
  defs:[["attrition","people leaving the company"],["headcount","the number of people employed"]]},
 {h:"Why an average can hide two different groups", lvl:2, u:[2,3],
  sum:"An average tenure mixes juniors who leave within a year with seniors who stay for years, so it can look healthy while every junior leaves. The numbers in this drill are ours.",
  idea:"An overall average adds every person's value and divides by the number of people. If there are two very different groups, the average describes neither. Work out each group on its own first.",
  ex:[{say:"Illustration (ours). Suppose 10 juniors stay 0.8 years each, and 10 seniors have stayed 5 years.", f:"{(10 × 0.8) + (10 × 5)|20 people} = {58|20} = 2.9 years"},{say:"An average of 2.9 years sounds acceptable, yet the juniors, who make up half of the team, last under one year.", f:"juniors: 0.8 years   seniors: 5 years"}],
  units:"person-years ÷ people = years per person. Each group has a different average, so they are kept on separate lines.",
  mistake:"Reporting the overall average and moving on. The case asks about junior salespeople, so the number to ask for is their tenure alone.",
  defs:[["average","the total divided by the number of people"]]},
 {h:"Comparing pay per hour of effort", lvl:3, u:[4],
  sum:"The same commission rate pays more per hour on a cheap product that sells itself than on an expensive one that takes weeks. The prices come from the case; the rate and hours are ours.",
  idea:"Commission is a percentage of the sale price. If a seller is paid the same percentage on two products, what matters is how much they earn per hour of work, which is the commission on one sale divided by the hours that sale takes.",
  ex:[{say:"Illustration (ours). Take a 5% commission rate. The case's prices are $100 to $300 for the cheaper product and $2,000 to $3,000 for the dearer; use $200 and $2,500. Assume 2 hours to sell the cheap one and 40 to sell the dear one.", f:"cheap: 5% × $200 = $10 per sale   dear: 5% × $2,500 = $125 per sale"},{say:"Divide each commission by the hours it took.", f:"cheap: {$10|2 hours} = $5 per hour   dear: {$125|40 hours} = $3.13 per hour"},{say:"The dear product pays more per sale but less per hour, so a junior who can sell either will drift to the cheap one.", f:"$5.00 per hour > $3.13 per hour"}],
  units:"dollars per sale ÷ hours per sale = dollars per hour. Both products must be compared in dollars per hour; dollars per sale alone favours the wrong one.",
  mistake:"Concluding that the dearer product is more attractive because the commission per sale is bigger. Effort, not price, is what a seller compares.",
  defs:[["commission","pay that is a percentage of each sale"]]}
 ]},

"BTH-11": { title:"Electric utility",
 sub:"Six pieces of arithmetic, easiest first. Several are about reading percentages correctly, which is what this case tests. Where a number is ours rather than the case's, it says so.",
 items:[
 {h:"Percentage points against percent", lvl:1, u:[5],
  sum:"80% compared with 77% is 3 points higher, not 3% higher. Going from 80% to 90% is 10 points, which is a 12.5% increase.",
  idea:"When two numbers are already percentages, the plain subtraction between them is measured in percentage points. A percent change instead compares the gap with the starting value.",
  ex:[{say:"GPE runs at 80% utilisation and the industry average is 77%.", f:"80% − 77% = 3 percentage points"},{say:"The CEO wants 90%. Points first:", f:"90% − 80% = 10 percentage points"},{say:"Then as a change from where GPE is now:", f:"{90 − 80|80} = 0.125 = 12.5% more output from the same plants"}],
  units:"A gap between two percentages is in points. Dividing that gap by the starting percentage gives a percent change, which is a different number.",
  mistake:"Writing '3% above average'. The case's figure is 3 points above. As a percent of 77 it would be about 3.9%.",
  defs:[["utilisation","the share of a plant's maximum output that it actually produces"],["percentage point","one unit of a percentage, used for gaps between two percentages"]]},
 {h:"Utilisation is actual output over maximum output", lvl:1, u:[5],
  sum:"A plant that could produce 1,000 megawatts and averages 800 is at 80%. The plant size here is our own example, since the case gives none.",
  idea:"Utilisation compares what a plant produces with the most it could produce. Divide actual by maximum. To go the other way, multiply the maximum by the utilisation.",
  ex:[{say:"Illustration (ours; the case gives no plant size). A plant can produce at most 1,000 MW and averages 800 MW.", f:"{800 MW|1,000 MW} = 0.80 = 80%"},{say:"The CEO's 90% target would mean the same plant averaging", f:"1,000 MW × 90% = 900 MW"},{say:"That is 100 MW more on average, but the plant already runs flat out at the summer peak, so the extra has to come from the quiet months, when nobody is asking for it.", f:"900 MW − 800 MW = 100 MW more"}],
  units:"MW ÷ MW has no unit, so utilisation is a share. A megawatt (MW) is a measure of power, how much electricity a plant produces at a moment.",
  mistake:"Assuming the output of a plant can simply be raised to 90%. Electricity cannot be stored cheaply, so the plant can only produce what customers are asking for at that time.",
  defs:[["MW","megawatt, a unit of power: one million watts"],["peak","the time of highest demand"]]},
 {h:"Growth of 3% a year, compounded", lvl:2, u:[2],
  sum:"The market grows about 3% a year. After 5 years that is 1.03 multiplied by itself five times, about 16% more, not 15%. Doubling takes about 24 years.",
  idea:"Each year's growth is applied to the new, larger amount, not the original. So after n years, the amount is the start multiplied by (1 + the growth rate) n times.",
  ex:[{say:"Start with 100 units of demand and grow 3% a year. After one year:", f:"100 × 1.03 = 103"},{say:"After five years, multiply by 1.03 five times.", f:"100 × 1.03⁵ = 115.9, about 16% more"},{say:"A rough rule for doubling is to divide 72 by the growth rate in percent.", f:"{72|3} = 24 years"}],
  units:"A growth rate is a share per year. 1.03 is the multiplier for one year. Powers count years.",
  mistake:"Adding 3% five times to get 15%. It underestimates because the later years grow from a bigger base.",
  defs:[["compounding","growth applied to the new total each year, not to the starting amount"]]},
 {h:"Averaging over seasons gives a lower number than the peak", lvl:2, u:[5],
  sum:"A plant at full output for 4 months and 70% for 8 months averages 80% over the year. The seasonal split is our illustration; it shows why a peak-driven utility cannot reach 90%.",
  idea:"A yearly average is the sum of each period's level times its length, divided by the total length. If one season is at 100%, the average cannot be 100%, because the other seasons are lower.",
  ex:[{say:"Illustration (ours). Summer, 4 months, runs at 100%. The other 8 months run at 70%.", f:"{(4 × 100%) + (8 × 70%)|12 months}"},{say:"Work out the top line, then divide by 12.", f:"= {400% + 560%|12} = {960%|12} = 80%"}],
  units:"percent × months, summed, then ÷ months gives percent. It is a weighted average: each season counts in proportion to its length.",
  mistake:"Reading an 80% yearly figure as 'the plant is 20% idle all year'. The 20% gap is concentrated in the quiet months, when demand is low.",
  defs:[["weighted average","an average in which each part counts in proportion to its size"]]},
 {h:"Opportunity cost of using your own coal", lvl:2, u:[4],
  sum:"The mine gives coal 30% below the third-party rate. But the same coal could be sold at the market price, so burning it costs the market price in forgone sales. Prices here are an index, not dollars.",
  idea:"Opportunity cost is what you give up by choosing one use instead of another. If your own coal could be sold at the market price, using it yourself costs you that sale, whatever it cost to dig.",
  ex:[{say:"Use an index: the market price of a tonne of coal is 100. Third-party coal costs GPE 100. Its own mine's coal is 30% cheaper.", f:"100 × (1 − 0.30) = 70"},{say:"If GPE sells that tonne instead of burning it, it receives the market price, 100.", f:"cost of burning your own coal = 100 forgone"},{say:"So the 'saving' is not a real saving. Compare what each choice leaves you with.", f:"buy 100 and burn   vs   burn own: forgo 100"}],
  units:"The 30% is a gap between your cost of producing and the market price, not between two real costs. Prices here are an index (market price = 100).",
  mistake:"Counting the 30% as a saving each year. The mine may still be worth keeping for security of supply and quality, but not because of the 30%.",
  defs:[["opportunity cost","the value of the best alternative you give up"],["index","a number scaled so the starting value is 100, to compare changes without using dollars"]]},
 {h:"The same gap measured from two bases", lvl:3, u:[4],
  sum:"If own coal is 30% below the third-party price, the third-party price is about 43% above own coal. Both describe the same gap, measured from different starting values.",
  idea:"A percentage always depends on what it is a percentage of. The same gap gives different percentages when you change the base, so state the base each time.",
  ex:[{say:"Own coal: 70. Third-party coal: 100. The gap is 30 either way.", f:"100 − 70 = 30"},{say:"As a share of the third-party price (the base the case uses):", f:"{30|100} = 30% below"},{say:"As a share of own coal (the other base):", f:"{30|70} ≈ 0.43 = 43% above"}],
  units:"A gap in index points is the same either way. The percentage changes with the base.",
  mistake:"Reversing the direction of a percentage change and expecting the same number. Falling 30% and then rising 30% does not return you to the start.",
  defs:[["base","the number a percentage is measured against"]]}
 ]},

"BTH-02": { title:"Breast cancer surgery",
 sub:"Five pieces of arithmetic, easiest first. The case is one table of prices and adoption rates, so these skills are about reading it correctly.",
 items:[
 {h:"The ceiling on volume", lvl:1, u:[2],
  sum:"The market is 100,000 surgeries a year, one disposable device per surgery, so 100,000 devices a year is the most that could ever be sold.",
  idea:"The most you can sell is how many times the product is used, times how many are used each time. A disposable device is used once and thrown away, so every surgery needs a new one.",
  ex:[{say:"There are about 100,000 breast conservation surgeries a year and each uses one device.", f:"100,000 surgeries × 1 device per surgery = 100,000 devices per year"}],
  units:"surgeries × devices per surgery = devices, per year.",
  mistake:"Forgetting that a reusable device would change this completely. A reusable device would be bought once per hospital, not once per surgery.",
  defs:[["disposable","used once and then thrown away"]]},
 {h:"A percentage of a count", lvl:1, u:[3],
  sum:"Adoption of 75% means 75 out of every 100 surgeries use the device. Of 100,000 surgeries that is 75,000.",
  idea:"To find a share of a count, multiply the count by the share as a decimal. 75% is 0.75, so 100,000 × 0.75.",
  ex:[{say:"The exhibit says that at $300, 75% of surgeons would adopt the device.", f:"100,000 surgeries × 75% = 75,000 devices"},{say:"At $600 the exhibit says 50%.", f:"100,000 × 50% = 50,000 devices"}],
  units:"A percentage has no unit, so the answer is in the units of the count: devices.",
  mistake:"Multiplying by 75 instead of 0.75. Check that the answer is smaller than the starting count.",
  defs:[["adoption","the share of surgeries in which the device is used"]]},
 {h:"Revenue at each price: three numbers multiplied", lvl:2, u:[3],
  sum:"Revenue is surgeries times adoption times price. Work it out for each of the four prices tested.",
  idea:"At each price the exhibit gives an adoption rate. Multiply surgeries by that rate to get devices sold, then by the price to get revenue. Do this once per row and put the results side by side.",
  ex:[{say:"At $0: 90% adopt, but each device is free.", f:"100,000 × 90% × $0 = $0"},{say:"At $300: 75% adopt.", f:"100,000 × 75% × $300 = 75,000 × $300 = $22.5M"},{say:"At $600: 50% adopt.", f:"100,000 × 50% × $600 = 50,000 × $600 = $30.0M"},{say:"At $1,000: 10% adopt.", f:"100,000 × 10% × $1,000 = 10,000 × $1,000 = $10.0M"},{say:"The largest of the four is at $600.", f:"$30.0M > $22.5M > $10.0M > $0"}],
  units:"surgeries × (devices per surgery) × (dollars per device) = dollars per year.",
  mistake:"Picking the price with the highest adoption (free) or the highest price ($1,000). Neither gives the highest revenue.",
  defs:[["willingness to pay","the most a buyer will pay"],["price point","one price that was tested"]]},
 {h:"Why revenue rises and then falls", lvl:3, u:[3],
  sum:"Between $300 and $600 the price doubles but adoption only falls by a third, so revenue rises. Between $600 and $1,000 adoption falls by four-fifths, so it falls.",
  idea:"Revenue is price times quantity. If price rises by a larger percentage than quantity falls, revenue goes up. If quantity falls by a larger percentage, revenue goes down. The peak is where the two balance.",
  ex:[{say:"From $300 to $600, the price changes by", f:"{$600 − $300|$300} = +100%"},{say:"and adoption changes from 75% to 50%.", f:"{50% − 75%|75%} = −33%"},{say:"Revenue is therefore higher: 2 × 0.667 = 1.33, which is the step from $22.5M to $30.0M.", f:"{$30.0M|$22.5M} = 1.33 = +33%"},{say:"From $600 to $1,000, the price rises by 67% but adoption falls from 50% to 10%.", f:"{$1,000 − $600|$600} = +67%   and   {10% − 50%|50%} = −80%"},{say:"Revenue falls by two-thirds.", f:"{$10.0M|$30.0M} = 0.33 = −67%"}],
  units:"All three changes are percent changes from the previous row, so each uses the earlier row as its base.",
  mistake:"Assuming the highest adoption gives the highest revenue. At $0, 90% of surgeries adopt, the highest of the four, and revenue is $0.",
  defs:[["percent change","(new − old) ÷ old"]]},
 {h:"Revenue is not profit: finding the cost that changes the answer", lvl:3, u:[3,4],
  sum:"Profit is devices times (price minus cost per device). With a cost above $500 a device, $1,000 beats $600. The cost figures here are ours; the case gives none.",
  idea:"Once each device has a cost, profit is the devices sold times what each one earns, which is its price minus its cost. A higher cost per device pushes the best price up, because each sale earns less and you want fewer, better-paid ones.",
  ex:[{say:"Illustration (ours; the case gives no cost). Suppose each device costs $400 to make. At $600 and at $1,000:", f:"$600: 50,000 × ($600 − $400) = $10.0M   $1,000: 10,000 × ($1,000 − $400) = $6.0M"},{say:"Now suppose each costs $550.", f:"$600: 50,000 × ($600 − $550) = $2.5M   $1,000: 10,000 × ($1,000 − $550) = $4.5M"},{say:"The two prices tie when profit is equal. Set them equal and solve for the cost.", f:"50,000 × (600 − c) = 10,000 × (1,000 − c)"},{say:"Divide both sides by 10,000, then collect c on one side.", f:"5 × (600 − c) = 1,000 − c   →   3,000 − 5c = 1,000 − c   →   c = $500"},{say:"So below $500 a device, $600 earns more; above $500, $1,000 earns more.", f:"c < $500 → $600 wins   c > $500 → $1,000 wins"}],
  units:"devices × (dollars per device − dollars per device) = dollars. The cost is per device, so it is subtracted from the price before multiplying by devices.",
  mistake:"Thinking a lower price with more devices might win on margin. With the same cost per device, $300 never beats $600, because it earns less revenue and uses more devices (and so more cost).",
  defs:[["margin","what one sale leaves after its own cost: price minus cost"]]}
 ]},

"BTH-05": { title:"Cleaning products",
 sub:"Seven pieces of arithmetic, easiest first. The whole case is one calculation done correctly, so each drill builds on the one before it.",
 items:[
 {h:"A percentage of a total", lvl:1, u:[3],
  sum:"Each product's revenue is its share times the total: 5% of $3 billion is $150 million.",
  idea:"To get a part from a total, multiply the total by the part's share as a decimal.",
  ex:[{say:"Dish washing powder is 5% of the $3B in sales.", f:"5% × $3,000M = $150M"},{say:"Do the same for every line, and check that they add back to the total.", f:"$150M + $600M + $900M + $900M + $450M = $3,000M"}],
  units:"A share has no unit, so the answer is in dollars. $3B = $3,000M.",
  mistake:"Skipping the check. If the five lines do not add back to $3B, one of the weights has been copied wrongly.",
  defs:[["weight","a line's share of total revenue"],["$B","billions of dollars"]]},
 {h:"A percent change in dollars", lvl:1, u:[3,4],
  sum:"A price change of −2% on a line of $150M is −$3M. A percentage is only useful once it is turned into dollars.",
  idea:"A percent change is a share of the amount it applies to. Multiply the starting amount by the change.",
  ex:[{say:"Dish washing powder: price changes by −2% on $150M of sales.", f:"$150M × (−2%) = −$3M"},{say:"New revenue for that line:", f:"$150M − $3M = $147M"}],
  units:"dollars × a percent change = dollars. The sign matters: a fall is negative.",
  mistake:"Using the wrong base, for example applying −2% to the $3B total instead of to the line's $150M.",
  defs:[["price elasticity","how much the quantity sold changes when the price changes. Here the research says volumes do not change"]]},
 {h:"Weight times total times change", lvl:2, u:[4],
  sum:"Each line's contribution is its weight times the total times its price change. Doing this once for every line gives five dollar amounts.",
  idea:"Combine the last two skills: weight × total gives the line's revenue, and revenue × change gives the dollars it adds or loses. Do it for all five lines.",
  ex:[{say:"Dish washing: 5% of the total moves −2%.", f:"5% × $3B × (−2%) = −$3M"},{say:"Detergent: 20% moves +1%.", f:"20% × $3B × 1% = +$6M"},{say:"Hand wash: 30% moves 0%.", f:"30% × $3B × 0% = $0"},{say:"Shower gel: 30% moves +2%.", f:"30% × $3B × 2% = +$18M"},{say:"All-purpose soap: 15% moves +4%.", f:"15% × $3B × 4% = +$18M"}],
  units:"Every line ends in millions of dollars, so they can be added.",
  mistake:"Starting with the percentages and averaging them. See the next drill for why that gives the wrong answer.",
  defs:[["contribution","how many dollars one line adds to, or takes from, the total"]]},
 {h:"Add the dollars, never the percentages", lvl:2, u:[4],
  sum:"The five price changes add up to 5%, and their simple average is 1%. The right answer, weighted by size, is 1.3%.",
  idea:"A percentage is a share of its own base, and each line has a different base. To combine them, turn each into dollars first, add, then divide by the total.",
  ex:[{say:"Add the five dollar contributions.", f:"−$3M + $6M + $0 + $18M + $18M = +$39M"},{say:"Divide by the total to express it as a percent.", f:"{$39M|$3,000M} = 0.013 = +1.3%"},{say:"The wrong ways give 5% (add the percents) or 1% (simple average).", f:"−2 + 1 + 0 + 2 + 4 = 5   {5|5 lines} = 1"}],
  units:"dollars ÷ dollars = a share. The simple average treats every line as if it were the same size, which is why it is wrong.",
  mistake:"The simple average happens to land on the client's 1% target, which makes it tempting. It is a coincidence, not a calculation.",
  defs:[["blended","combined across lines, weighted by size"]]},
 {h:"Comparing the result with a target", lvl:2, u:[4,5],
  sum:"The client's target is 1% of $3B, which is $30M. The price change gives $39M, which is $9M above it.",
  idea:"A result only means something compared with a standard. Convert the standard into the same unit as the result, then subtract.",
  ex:[{say:"The target is a 1% increase in revenue.", f:"1% × $3,000M = $30M"},{say:"The price change gives $39M. The difference is", f:"$39M − $30M = $9M above target"},{say:"As a share of the target:", f:"{$9M|$30M} = 0.30 = 30% above"}],
  units:"Both numbers must be in dollars before they are subtracted. If one were in percent, convert it first.",
  mistake:"Comparing $39M with 1% directly. They are different units.",
  defs:[["target","the result the client has said it would be happy with"]]},
 {h:"Which lines carry the result", lvl:2, u:[4],
  sum:"Shower gel and all-purpose soap add $36M of the $39M. One line is 30% of sales but moves 0%, and the largest move sits on a 15% line.",
  idea:"Divide each line's contribution by the total contribution to see how much of the result it explains. Lines that carry most of the result are the ones to test hardest.",
  ex:[{say:"Add the two big contributors.", f:"$18M + $18M = $36M"},{say:"As a share of the total gain:", f:"{$36M|$39M} = 0.92 = 92%"}],
  units:"dollars ÷ dollars = a share.",
  mistake:"Treating the five lines as equally important. One line is flat and one is slightly negative.",
  defs:[["concentration","most of a result coming from a few parts"]]},
 {h:"How little volume loss erases the gain", lvl:3, u:[4,5],
  sum:"The research says volumes will not change. If they fell by about 0.3% across the board, the gain would drop to the $30M target; at about 1.3% it would vanish. This test is our own.",
  idea:"After the price change, revenue is $3,039M. If volume falls by a share v, revenue falls by the same share, so new revenue is 3,039 × (1 − v). Set that equal to the target and solve for v.",
  ex:[{say:"Revenue stays at or above the target if", f:"$3,039M × (1 − v) ≥ $3,030M"},{say:"Divide both sides by 3,039 and rearrange.", f:"v ≤ 1 − {3,030|3,039} = 0.0030 = 0.3%"},{say:"To lose the whole gain, new revenue must fall back to $3,000M.", f:"v = 1 − {3,000|3,039} = 0.0128 = 1.3%"}],
  units:"v is a share of volume, with no unit. Revenue stays in millions of dollars. This assumes the same volume loss on every line, which is a simplification.",
  mistake:"Accepting 'volumes will not change' without asking how sure that is. The margin for error is a fraction of one percent.",
  defs:[["volume","the quantity sold"],["break-even point","the value at which the gain is exactly zero"]]}
 ]}
};
/* Interview mental-math working for every drill */
(()=>{ const MENTAL = {"BTH-01": [[{"say": "Split the 365. Do 4 × 365 first, then add two zeros for the 100.", "f": "365 × 4: 300 × 4 = 1,200;  60 × 4 = 240;  5 × 4 = 20"}, {"say": "Add the three pieces, then put the two zeros back.", "f": "1,200 + 240 + 20 = 1,460  →  × 100 = 146,000"}], [{"say": "Basic: do the digits first (2 × 7 = 14), then count the zeros (200 has 2, 70 has 1, so 3 zeros).", "f": "200 × 70 = 14,000"}, {"say": "Times 5 is half of times 10, so halve 140,000.", "f": "14,000 × 5 = 140,000 ÷ 2 = 70,000"}, {"say": "Advanced: 50 is half of 100, so halve 28 × 100.", "f": "50 × 28 = 2,800 ÷ 2 = 1,400  →  × 10 = 14,000"}, {"say": "Rotations: divide first, because 9 is easy to split by 3.", "f": "9,000 ÷ 3 = 3,000"}, {"say": "Times 15 is times 10 plus half again.", "f": "3,000 × 10 = 30,000;  half of that = 15,000;  total 45,000"}, {"say": "Add in thousands, ignoring the zeros until the end. Say 'about 130,000' aloud, as the casebook does.", "f": "70 + 14 + 45 = 129  →  129,000 ≈ 130,000"}], [{"say": "Subtract in two small steps.", "f": "$75 − $10 = $65;  $65 − $5 = $60"}, {"say": "Sanity-check the meals: two meals at about $7 to $8 each.", "f": "2 × $7.50 = $15"}], [{"say": "Do 12 × 6 first, then count zeros (120,000 has 4, 60 has 1, so 5 zeros).", "f": "12 × 6 = 72  →  7,200,000"}, {"say": "Or say it in thousands: 120 thousand × 60 = 7,200 thousand, which is $7.2M.", "f": "120 × 60 = 7,200  (thousands)"}], [{"say": "Do the digits, then the 30.", "f": "80 × 4 = 320;  320 × 30 = 960 × 10 = 9,600"}, {"say": "Round to a clean number and say that you did.", "f": "9,600 ≈ 10,000"}, {"say": "Subtract in thousands.", "f": "130 − 10 = 120  →  120,000"}, {"say": "Capacity: round 365 down to 360, then add back.", "f": "400 × 360 = 144,000;  400 × 5 = 2,000  →  146,000"}], [{"say": "Subtract in millions; keep one decimal.", "f": "7.2 − 4.0 = 3.2"}, {"say": "Digits first (4 × 5 = 20), then count zeros (400 has 2, 50,000 has 4, so 6).", "f": "4 × 5 = 20  →  20,000,000 = $20M"}], [{"say": "Make the division whole by multiplying top and bottom by 10.", "f": "20 ÷ 3.2 = 200 ÷ 32"}, {"say": "Find how many whole 32s fit, then the remainder.", "f": "32 × 6 = 192;  200 − 192 = 8;  8 is a quarter of 32"}, {"say": "So the answer is 6 and a quarter. Compare with 5.", "f": "6.25 − 5 = 1.25 years"}], [{"say": "Halve $3.2M, then divide by 10.", "f": "3.2 ÷ 20 = 1.6 ÷ 10 = 0.16 = 16%"}, {"say": "1 divided by 0.16 is 100 divided by 16.", "f": "16 × 6 = 96;  remainder 4 is a quarter of 16  →  6.25"}], [{"say": "Divide $20M by 5 (double it, divide by 10).", "f": "20 ÷ 5 = 4"}, {"say": "Subtract.", "f": "4.0 − 3.2 = 0.8"}, {"say": "Do the same at 4 years.", "f": "20 ÷ 4 = 5;  5.0 − 3.2 = 1.8"}, {"say": "Convert $0.8M into room-nights: work in thousands and cancel.", "f": "800,000 ÷ 60 = 80,000 ÷ 6 ≈ 13,300"}]], "BTH-19": [[{"say": "Subtract, then notice that 6 is half of 12.", "f": "12 − 6 = 6;  6 ÷ 12 = ½ = 50%"}], [{"say": "Reduce the fraction by dividing top and bottom by 4.", "f": "12 ÷ 40 = 3 ÷ 10 = 30%"}, {"say": "Compare with the benchmark.", "f": "30 ÷ 15 = 2  →  twice as high"}], [{"say": "Do each group on its own line, then add.", "f": "10 × 0.8 = 8;  10 × 5 = 50;  8 + 50 = 58"}, {"say": "Halve it, then divide by 10.", "f": "58 ÷ 20 = 29 ÷ 10 = 2.9"}], [{"say": "5% is half of 10%. Move the decimal for 10%, then halve.", "f": "10% of 200 = 20 → 5% = 10;  10% of 2,500 = 250 → 5% = 125"}, {"say": "Divide by hours. The cheap sale is easy; for the dear one, find how many 40s fit in 125.", "f": "10 ÷ 2 = 5;  40 × 3 = 120, remainder 5  →  about 3.1 an hour"}]], "BTH-11": [[{"say": "Plain subtraction for points.", "f": "80 − 77 = 3;  90 − 80 = 10"}, {"say": "For the percent change, notice that 10 out of 80 is one-eighth.", "f": "10 ÷ 80 = 1/8 = 12.5%"}], [{"say": "Take 10% (move the decimal), then scale.", "f": "10% of 1,000 = 100  →  80% = 800;  90% = 900"}, {"say": "Subtract.", "f": "900 − 800 = 100 MW"}], [{"say": "Square it first: 1.03 × 1.03 is about 1.06.", "f": "1.03² ≈ 1.06"}, {"say": "Square again for the fourth power, then multiply by 1.03 once more.", "f": "1.06² ≈ 1.12;  1.12 × 1.03 ≈ 1.16"}, {"say": "A faster check: 5 years × 3% = 15%, plus a little for compounding, so about 16%. Doubling: 72 ÷ 3.", "f": "72 ÷ 3 = 24 years"}], [{"say": "Do each season on its own line.", "f": "4 × 100 = 400;  8 × 70 = 560"}, {"say": "Add, then divide by 12. 12 × 8 = 96, so 960 is 80.", "f": "400 + 560 = 960;  960 ÷ 12 = 80"}], [{"say": "Take 30% off 100 by taking 70%.", "f": "100 × 0.7 = 70"}, {"say": "Subtract in whole numbers.", "f": "100 − 70 = 30;  100 − 100 = 0"}], [{"say": "The first percentage is on the easy base of 100.", "f": "30 ÷ 100 = 30%"}, {"say": "For the second, simplify 30 over 70 to 3 over 7. 7 × 0.4 = 2.8, so the answer is just over 0.4.", "f": "30 ÷ 70 = 3/7 ≈ 0.43"}]], "BTH-02": [[{"say": "Nothing to calculate. Say the logic aloud.", "f": "100,000 × 1 = 100,000"}], [{"say": "10% is moving the decimal; 75% is three-quarters; 50% is half.", "f": "10% of 100,000 = 10,000;  75% = 100,000 − 25,000 = 75,000;  50% = 50,000"}], [{"say": "Digits first, then count zeros.", "f": "75 × 3 = 225 → 75,000 × 300 = 22,500,000 = $22.5M"}, {"say": "Same method for each price.", "f": "5 × 6 = 30 → 50,000 × 600 = $30M;  10,000 × 1,000 = $10M"}], [{"say": "Price change: the gap is exactly 300, the same as the starting price.", "f": "(600 − 300) ÷ 300 = 1 = +100%"}, {"say": "Adoption: 50 out of 75 is two-thirds, so it fell by a third.", "f": "50 ÷ 75 = 2/3 → −33%"}, {"say": "Revenue: 30 out of 22.5 is four-thirds.", "f": "22.5 × 4 = 90;  90 ÷ 3 = 30  →  +33%"}, {"say": "For $600 to $1,000: 1,000 is five-thirds of 600; 10 is a fifth of 50; 10 is a third of 30.", "f": "+67%;  −80%;  −67%"}], [{"say": "Cost $400: subtract inside the bracket, then digits and zeros.", "f": "50,000 × 200 = 10,000,000;  10,000 × 600 = 6,000,000"}, {"say": "Cost $550.", "f": "50,000 × 50 = 2,500,000;  10,000 × 450 = 4,500,000"}, {"say": "Solve for the tie: divide both sides by 10,000, expand, collect c.", "f": "5(600 − c) = 1,000 − c  →  3,000 − 5c = 1,000 − c  →  2,000 = 4c  →  c = 500"}, {"say": "Check the answer both ways.", "f": "50,000 × 100 = 5M;  10,000 × 500 = 5M"}]], "BTH-05": [[{"say": "Take 10% by moving the decimal, then scale.", "f": "10% of 3,000 = 300  →  5% = 150;  20% = 600;  30% = 900;  15% = 450"}, {"say": "Add as you go to check you land on 3,000.", "f": "150 + 600 = 750;  + 900 = 1,650;  + 900 = 2,550;  + 450 = 3,000"}], [{"say": "1% of 150 is 1.5, so 2% is 3.", "f": "2% of 150 = 3"}, {"say": "Subtract.", "f": "150 − 3 = 147"}], [{"say": "Use 1% of each line (move the decimal two places), then multiply by the change.", "f": "−2% × 150 = −3;  1% × 600 = 6;  0 × 900 = 0"}, {"say": "For the last two.", "f": "2% × 900 = 18;  4% × 450 = 4.5 × 4 = 18"}], [{"say": "Add left to right, one number at a time.", "f": "−3 + 6 = 3;  3 + 0 = 3;  3 + 18 = 21;  21 + 18 = 39"}, {"say": "1% of $3,000M is $30M, so $39M is 1% plus 9 more; 9 is 0.3% of 3,000.", "f": "1% + 0.3% = 1.3%"}, {"say": "Show why the shortcut is wrong.", "f": "−2 + 1 + 0 + 2 + 4 = 5;  5 ÷ 5 = 1"}], [{"say": "1% of 3,000.", "f": "30"}, {"say": "Subtract, then compare with the target.", "f": "39 − 30 = 9;  9 ÷ 30 = 0.3 = 30%"}], [{"say": "Add, then compare using a round denominator.", "f": "18 + 18 = 36;  36 ÷ 39 ≈ 36 ÷ 40 = 0.9, a bit more, so about 92%"}], [{"say": "Gap to the target, as a share of revenue: use 3,000 as the denominator.", "f": "9 ÷ 3,039 ≈ 9 ÷ 3,000 = 0.3%"}, {"say": "Gap to the start.", "f": "39 ÷ 3,039 ≈ 39 ÷ 3,000 = 1.3%"}]]}; for(const c in MENTAL) MENTAL[c].forEach((m,i)=>{ if(MATHDRILLS[c] && MATHDRILLS[c].items[i]) MATHDRILLS[c].items[i].mental = m; }); })();
