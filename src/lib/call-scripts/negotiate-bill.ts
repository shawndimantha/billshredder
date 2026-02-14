import type { CallScript } from "@/lib/types";

export const NEGOTIATE_BILL_SCRIPT: CallScript = {
  id: "negotiate-bill",
  title: "Negotiating Your Bill Down",
  hospital: "City General Hospital",
  department: "Billing Department",
  estimated_real_duration: "15-25 minutes",
  messages: [
    // === OPENING ===
    {
      id: "sys-n1",
      type: "system",
      content: "Dialing City General Hospital Billing Department...",
      delay_ms: 600,
      coaching: {
        type: "prep",
        title: "Your ammunition",
        content: "5 billing errors ($17,383 in overcharges)\nFair value: $8,240 (83% average markup)\n3 legal protections apply\nCharity care eligible (nonprofit hospital)\nHave your audit findings open for reference.",
      },
    },
    {
      id: "sys-n2",
      type: "system",
      content: "\u{1F3B5} On hold... (estimated wait: 3 minutes)",
      delay_ms: 1000,
      coaching: {
        type: "explain",
        title: "Strategy overview",
        content: "We'll negotiate in layers:\n1. Remove clear billing errors (strongest position)\n2. Challenge remaining prices with Medicare benchmarks\n3. Invoke charity care eligibility for the rest\nEach layer reduces the bill further. Stay calm and factual.",
      },
    },
    {
      id: "sys-n3",
      type: "system",
      content: "Connected to billing representative.",
      delay_ms: 800,
    },
    {
      id: "rep-n1",
      type: "rep",
      content: "City General billing, this is James. How can I help you?",
      delay_ms: 500,
      coaching: {
        type: "suggest",
        title: "Open with your account and intent",
        content: "State your account, then say you've reviewed the itemized bill and found billing errors. Be direct but professional.",
        copy_text: "Hi James, I'm calling about account CGH-2024-88291, date of service January 15th. I've reviewed my fully itemized bill in detail and I've found several billing errors I need to dispute.",
      },
    },
    {
      id: "you-n1",
      type: "you",
      content: "Hi James, I'm calling about account CGH-2024-88291, date of service January 15th. I've reviewed my fully itemized bill in detail and I've found several billing errors I need to dispute.",
      delay_ms: 1500,
    },

    // === ERROR DISPUTES ===
    {
      id: "rep-n2",
      type: "rep",
      content: "Sure, I can pull up your account. What errors are you seeing?",
      delay_ms: 800,
      coaching: {
        type: "suggest",
        title: "Lead with the duplicate charge \u2014 it's undeniable",
        content: "The duplicate CT scan is your strongest card. It's the same CPT code (74177) billed twice on the same date. This is clearly a billing error, not a judgment call.",
        copy_text: "First, line items 4 and 5 are both CPT 74177 \u2014 CT Abdomen/Pelvis with Contrast \u2014 billed at $4,800 each. That's the same scan charged twice. I need the duplicate removed.",
      },
    },
    {
      id: "you-n2",
      type: "you",
      content: "First, line items 4 and 5 are both CPT 74177 \u2014 CT Abdomen/Pelvis with Contrast \u2014 billed at $4,800 each. That's the exact same scan charged twice on the same date. I need the duplicate removed.",
      delay_ms: 1800,
    },
    {
      id: "rep-n3",
      type: "rep",
      content: "Let me check... You're right, I do see two CT charges with the same code. I can submit a correction for that. That would remove $4,800.",
      delay_ms: 1200,
      bill_impact: { label: "Duplicate CT scan removed", amount: -4800 },
      coaching: {
        type: "success",
        title: "First win: -$4,800",
        content: "Bill is now $42,483. Don't stop \u2014 move to the next error while you have momentum.",
      },
    },
    {
      id: "you-n3",
      type: "you",
      content: "Thank you. Second, line item 6 is \"Operating Room Services\" for $4,500. I came in with a broken arm and received a splint \u2014 I never had surgery or entered an operating room. This is a phantom charge.",
      delay_ms: 1800,
      coaching: {
        type: "explain",
        title: "Phantom charges are common",
        content: "Hospitals sometimes auto-bill OR fees for orthopedic cases. If you only got a splint (CPT 29125) in the ER, there's no basis for OR charges.",
      },
    },
    {
      id: "rep-n4",
      type: "rep",
      content: "Hmm, let me look at the clinical notes... I see you were treated in the emergency department. I'll need to verify with our coding team, but it does look like this may have been coded incorrectly.",
      delay_ms: 1200,
      coaching: {
        type: "alert",
        title: "They said \"may have been\" \u2014 push for commitment",
        content: "Don't let them defer. Ask for it to be flagged for removal now, with a timeline for the coding review.",
        copy_text: "I understand you need to verify, but the clinical record clearly shows I was treated in the ER, not the OR. Can you flag this for removal now and confirm the correction within 5 business days?",
      },
    },
    {
      id: "you-n4",
      type: "you",
      content: "I understand you need to verify, but the clinical record clearly shows I was treated in the ER, not the OR. Can you flag this for removal now and confirm the correction within 5 business days?",
      delay_ms: 1500,
    },
    {
      id: "rep-n5",
      type: "rep",
      content: "Yes, I can flag it. I'll put in a priority review. You should see that adjusted within 3-5 days.",
      delay_ms: 800,
      bill_impact: { label: "Phantom OR charge flagged for removal", amount: -4500 },
      coaching: {
        type: "success",
        title: "Second win: -$4,500",
        content: "Bill is now $37,983. Now address the upcoding on the ER visit level.",
      },
    },
    {
      id: "you-n5",
      type: "you",
      content: "Third issue: the ER visit is coded as Level 5 \u2014 CPT 99285 at $6,800. A Level 5 is for life-threatening emergencies. I came in with a broken forearm. That's a Level 3 or 4 at most, around $2,000-$4,000. This appears to be upcoding.",
      delay_ms: 2000,
      coaching: {
        type: "explain",
        title: "Upcoding is the #1 ER billing error",
        content: "Hospitals upcode ER visits to maximize revenue. Level 5 (99285) is for \"high severity\" with \"significant threat to life.\" A simple fracture doesn't qualify. CMS guidelines are clear on this.",
      },
    },
    {
      id: "rep-n6",
      type: "rep",
      content: "The ER coding is based on the resources used during your visit. I'm not able to change the clinical coding from my end.",
      delay_ms: 1000,
      coaching: {
        type: "alert",
        title: "Common deflection: \"I can't change coding\"",
        content: "They're trying to end this line of discussion. You don't need them to change it \u2014 you need them to submit it for review. Reference CMS guidelines.",
        copy_text: "I understand you can't change the code directly, but I'm asking you to submit this for a coding review. Under CMS guidelines, a Level 5 ER code requires high-severity conditions with a significant threat to life or function. A forearm fracture treated with a splint doesn't meet that threshold. Can you escalate this to your coding compliance team?",
      },
    },
    {
      id: "you-n6",
      type: "you",
      content: "I understand you can't change the code directly, but I'm asking you to submit this for a coding review. Under CMS guidelines, a Level 5 code requires high-severity conditions with significant threat to life. A forearm fracture treated with a splint doesn't meet that threshold. Can you escalate this to your coding compliance team?",
      delay_ms: 2000,
    },
    {
      id: "rep-n7",
      type: "rep",
      content: "I can submit it for review. If it's downgraded, the charge would be adjusted accordingly.",
      delay_ms: 800,
      bill_impact: { label: "ER upcoding submitted for review (est. -$2,800)", amount: -2800 },
      coaching: {
        type: "success",
        title: "Third win: -$2,800 (estimated)",
        content: "Bill now ~$35,183. Excellent progress. Now pivot from errors to overall pricing.",
      },
    },

    // === PRICE CHALLENGE ===
    {
      id: "you-n7",
      type: "you",
      content: "Thank you. Beyond the coding errors, I've also benchmarked the remaining charges against Medicare rates and fair market value. Your prices are averaging 4-8x Medicare across the board. For example, my forearm X-ray is billed at $1,250 when Medicare reimburses $42 for CPT 73060. The fair rate is about $126.",
      delay_ms: 2200,
      coaching: {
        type: "explain",
        title: "Medicare benchmarks are powerful",
        content: "Hospitals can't easily argue against Medicare rates \u2014 it's what the federal government determined these services cost. Fair market value (typically 2-3x Medicare) is a reasonable ask.",
      },
    },
    {
      id: "rep-n8",
      type: "rep",
      content: "Our rates are set based on our cost structure. Medicare rates don't reflect the actual cost of providing care.",
      delay_ms: 1000,
      coaching: {
        type: "alert",
        title: "Standard deflection: \"our rates reflect our costs\"",
        content: "This is their script. Pivot to the financial hardship angle and charity care.",
        copy_text: "I understand hospital costs are complex. But as an uninsured patient, these charges represent a significant financial hardship. I'd like to discuss your financial assistance program. As a 501(c)(3) nonprofit, City General is required under IRS Section 501(r) to have a charity care policy. Can you transfer me to your financial assistance department?",
      },
    },

    // === CHARITY CARE ===
    {
      id: "you-n8",
      type: "you",
      content: "I understand. But as an uninsured patient, this represents a severe financial hardship. I'd like to discuss your financial assistance program. As a 501(c)(3) nonprofit hospital, City General is required under IRS Section 501(r) to have a charity care policy. Can you connect me with financial assistance?",
      delay_ms: 2000,
    },
    {
      id: "rep-n9",
      type: "rep",
      content: "Let me transfer you to our financial counseling department. One moment please.",
      delay_ms: 800,
    },
    {
      id: "sys-n4",
      type: "system",
      content: "\u{1F3B5} On hold \u2014 transferring to financial counseling... (1 min 45 sec)",
      delay_ms: 1200,
      coaching: {
        type: "prep",
        title: "Financial assistance prep",
        content: "You'll speak with someone who can apply discounts. Key facts:\n\u2022 Hospital is nonprofit (501(c)(3))\n\u2022 Must offer charity care under 501(r)\n\u2022 Your household income qualifies\n\u2022 After error corrections, bill should be ~$35K\n\u2022 Fair value for all services: ~$8,240\n\u2022 Ask for the charity care application",
      },
    },
    {
      id: "rep-n10",
      type: "rep",
      content: "Hi, this is Sandra from financial counseling. I understand you'd like to discuss financial assistance for your account?",
      delay_ms: 800,
      coaching: {
        type: "suggest",
        title: "Summarize your situation and cite 501(r)",
        content: "Be direct about your financial situation and what you're asking for.",
        copy_text: "Hi Sandra. Yes \u2014 I'm an uninsured patient with account CGH-2024-88291. The original bill was $47,283. I've already identified and reported several billing errors with James that are being corrected. For the remaining charges, I'm requesting consideration under your 501(r) financial assistance policy. My household income qualifies for your charity care program.",
      },
    },
    {
      id: "you-n9",
      type: "you",
      content: "Hi Sandra. I'm an uninsured patient with account CGH-2024-88291. The original bill was $47,283 but I've identified billing errors totaling about $12,100 that James is correcting. For the remaining balance, I'm requesting consideration under your 501(r) financial assistance policy. My household income qualifies for charity care.",
      delay_ms: 2000,
    },
    {
      id: "rep-n11",
      type: "rep",
      content: "I can see the adjustments James noted. Based on your account and the corrections pending, the remaining balance would be around $35,000. I can offer a 15% discount for self-pay patients, which would bring it to about $29,750.",
      delay_ms: 1200,
      coaching: {
        type: "alert",
        title: "15% is their opening offer \u2014 don't accept",
        content: "A 15% self-pay discount is standard but nowhere near enough. The fair market value is ~$8,240. Counter with the specific 501(r) obligation and your financial data.",
        copy_text: "I appreciate the offer, but $29,750 is still far above fair market value for these services. My benchmarking shows the fair rate \u2014 based on 250% of Medicare \u2014 is approximately $8,240 for all services rendered. Additionally, under your 501(r) obligations, patients at my income level should qualify for a significantly larger reduction. I'd like to formally apply for your charity care program.",
      },
    },
    {
      id: "you-n10",
      type: "you",
      content: "I appreciate that, but $29,750 is still far above fair market value. My benchmarking shows the fair rate at about $8,240 based on 250% of Medicare. Under your 501(r) obligations, patients at my income level should qualify for a much larger reduction. I'd like to formally apply for charity care.",
      delay_ms: 2000,
    },
    {
      id: "rep-n12",
      type: "rep",
      content: "Let me review our financial assistance guidelines... Based on the information in your file, you would qualify for our enhanced discount program. I can apply a financial hardship adjustment that would bring the remaining balance to $4,100.",
      delay_ms: 1500,
      bill_impact: { label: "Charity care + financial hardship applied", amount: -30900 },
      coaching: {
        type: "success",
        title: "$4,100 \u2014 that's a 91% reduction!",
        content: "Original: $47,283 \u2192 Final: $4,100\nTotal saved: $43,183 (91%)\n\nThis is an excellent outcome. Now lock it in \u2014 get written confirmation.",
      },
    },

    // === CONFIRMATION ===
    {
      id: "you-n11",
      type: "you",
      content: "That's much more reasonable, thank you Sandra. I'd like to accept that. Can you send me written confirmation of the adjusted amount, including the billing error corrections and the financial assistance adjustment? I'd like everything documented.",
      delay_ms: 1800,
      coaching: {
        type: "explain",
        title: "Always get it in writing",
        content: "Verbal agreements mean nothing if the bill comes back at the original amount later. Written confirmation protects you.",
      },
    },
    {
      id: "rep-n13",
      type: "rep",
      content: "Absolutely. I'll send a revised statement showing all adjustments to your email on file. You should receive it within 48 hours. Your new balance will be $4,100, and we can also set up a payment plan if you'd like.",
      delay_ms: 1200,
      coaching: {
        type: "suggest",
        title: "Ask about payment plan terms",
        content: "Most hospitals offer 0% interest payment plans. Get the terms now.",
        copy_text: "What are the terms of your payment plan? Is it interest-free?",
      },
    },
    {
      id: "you-n12",
      type: "you",
      content: "What are your payment plan options? Is it interest-free?",
      delay_ms: 800,
    },
    {
      id: "rep-n14",
      type: "rep",
      content: "Yes, we offer 12-month interest-free payment plans. That would be about $342 per month. Would you like me to set that up?",
      delay_ms: 800,
      coaching: {
        type: "success",
        title: "Interest-free \u2014 take it",
        content: "$342/month for 12 months, 0% interest.\nOriginal bill: $47,283\nYour cost: $4,100 (91% off)\n\nAccept and get confirmation of both the adjusted amount AND the payment plan terms in writing.",
      },
    },
    {
      id: "you-n13",
      type: "you",
      content: "Yes, please set that up. And please include the payment plan terms in the written confirmation you're sending. Thank you so much for your help, Sandra.",
      delay_ms: 1200,
      bill_impact: {
        label: "Final settlement: $4,100 (was $47,283) \u2014 saved $43,183",
        amount: 0,
      },
    },
    {
      id: "sys-n5",
      type: "system",
      content: "Call ended. Duration: 12 minutes 18 seconds.",
      delay_ms: 600,
    },
    {
      id: "sys-n6",
      type: "system",
      content: "\u{2705} Negotiation complete \u2014 $47,283 reduced to $4,100 (91% savings)",
      delay_ms: 1000,
      coaching: {
        type: "success",
        title: "You just saved $43,183",
        content: "Breakdown:\n\u2022 Duplicate CT removed: -$4,800\n\u2022 Phantom OR charge removed: -$4,500\n\u2022 ER upcoding correction: -$2,800\n\u2022 Charity care adjustment: -$30,900\n\u2022 Payment plan: $342/mo \u00d7 12 months, 0% interest\n\nWritten confirmation arriving within 48 hours.",
      },
    },
  ],
};
