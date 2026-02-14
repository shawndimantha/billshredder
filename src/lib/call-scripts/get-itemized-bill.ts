import type { CallScript } from "@/lib/types";

export const GET_ITEMIZED_BILL_SCRIPT: CallScript = {
  id: "get-itemized-bill",
  title: "Getting Your Itemized Bill",
  hospital: "City General Hospital",
  department: "Billing Department",
  estimated_real_duration: "8-12 minutes",
  messages: [
    {
      id: "sys-1",
      type: "system",
      content: "Dialing City General Hospital Billing Department...",
      delay_ms: 800,
      coaching: {
        type: "prep",
        title: "Have these ready",
        content: "Account #: CGH-2024-88291\nDate of service: 01/15/2025\nYour full name and date of birth",
      },
    },
    {
      id: "sys-2",
      type: "system",
      content: "\u{1F3B5} On hold... (estimated wait: 4 minutes)",
      delay_ms: 1200,
      coaching: {
        type: "explain",
        title: "Why an itemized bill matters",
        content: "A summary bill hides individual charges behind categories like \"Hospital Services: $15,000.\" An itemized bill (UB-04 form) shows every CPT code and charge \u2014 this is where you find errors. Under HIPAA, you have a legal right to receive this within 30 days.",
      },
    },
    {
      id: "sys-3",
      type: "system",
      content: "Connected to billing representative.",
      delay_ms: 1500,
    },
    {
      id: "rep-1",
      type: "rep",
      content: "Thank you for calling City General Hospital billing. My name is Maria. How can I help you today?",
      delay_ms: 600,
      coaching: {
        type: "suggest",
        title: "Say this",
        content: "State your account number, then clearly request an itemized bill with CPT codes. Be specific \u2014 don't just say \"my bill.\"",
        copy_text: "Hi Maria, I'm calling about account CGH-2024-88291, date of service January 15th. I'd like to request a fully itemized bill showing all individual charges with CPT and revenue codes.",
      },
    },
    {
      id: "you-1",
      type: "you",
      content: "Hi Maria, I'm calling about account CGH-2024-88291, date of service January 15th. I'd like to request a fully itemized bill showing all individual charges with CPT and revenue codes.",
      delay_ms: 1800,
    },
    {
      id: "rep-2",
      type: "rep",
      content: "Sure, I can send you a copy of your billing statement. It should arrive within 7-10 business days.",
      delay_ms: 1200,
      coaching: {
        type: "alert",
        title: "They're offering a summary, not an itemized bill",
        content: "A \"billing statement\" is usually the summary \u2014 the same thing you already got. You need the UB-04 form with line-by-line charges. Push back politely but firmly.",
        copy_text: "I appreciate that, but I need more than the summary statement. I'm requesting the fully itemized bill \u2014 the UB-04 form \u2014 that shows each individual charge with CPT codes, HCPCS codes, and revenue codes. This is my right under HIPAA's patient right of access.",
      },
    },
    {
      id: "you-2",
      type: "you",
      content: "I appreciate that, but I need more than the summary statement. I'm requesting the fully itemized bill \u2014 the UB-04 form \u2014 that shows each individual charge with CPT codes, HCPCS codes, and revenue codes. This is my right under HIPAA's patient right of access.",
      delay_ms: 2000,
    },
    {
      id: "rep-3",
      type: "rep",
      content: "Oh, okay. Let me check if I can do that from my system... Yes, I can generate an itemized statement. Would you like it mailed or emailed?",
      delay_ms: 1500,
      coaching: {
        type: "success",
        title: "They agreed",
        content: "Mentioning HIPAA worked. Always request email \u2014 it's faster and gives you a digital copy you can analyze.",
        copy_text: "Email would be great. Can you also confirm how many line items are on the bill? And how soon will I receive it?",
      },
    },
    {
      id: "you-3",
      type: "you",
      content: "Email would be great. My email is on file. Can you also confirm how many line items are on the bill? And how soon will I receive it?",
      delay_ms: 1200,
    },
    {
      id: "rep-4",
      type: "rep",
      content: "I see about 15 line items on your account. I'll send the itemized statement to your email on file. You should receive it within 24-48 hours.",
      delay_ms: 1200,
      coaching: {
        type: "explain",
        title: "Good \u2014 but set a deadline",
        content: "HIPAA requires they provide this within 30 days, but most hospitals can do it in 48 hours. Confirm the timeline and note who you spoke with.",
        copy_text: "Thank you, Maria. Just to confirm \u2014 I'll receive the fully itemized UB-04 form with all CPT codes within 48 hours by email. And I'm noting that I spoke with you today, Maria, regarding this request. Is there a reference number for this call?",
      },
    },
    {
      id: "you-4",
      type: "you",
      content: "Thank you, Maria. Just to confirm \u2014 I'll receive the fully itemized bill with all CPT codes within 48 hours by email. Can I get a reference number for this call?",
      delay_ms: 1500,
    },
    {
      id: "rep-5",
      type: "rep",
      content: "Of course. Your reference number is BIL-20250120-4428. Is there anything else I can help with?",
      delay_ms: 1000,
      coaching: {
        type: "success",
        title: "Save this reference number",
        content: "Reference #: BIL-20250120-4428\nRep name: Maria\nYou now have documentation that you requested the itemized bill. If they don't send it within 48 hours, you can follow up citing this call.",
      },
    },
    {
      id: "you-5",
      type: "you",
      content: "That's everything. Thank you, Maria.",
      delay_ms: 800,
      bill_impact: {
        label: "Itemized bill requested \u2014 arriving within 48 hours",
      },
    },
    {
      id: "sys-4",
      type: "system",
      content: "Call ended. Duration: 4 minutes 32 seconds.",
      delay_ms: 600,
    },
    {
      id: "sys-5",
      type: "system",
      content: "\u{1F4E7} Itemized bill received \u2014 loading into BillShredder...",
      delay_ms: 1500,
      coaching: {
        type: "success",
        title: "Bill received \u2014 now let's find every error",
        content: "BillShredder will now scan every line item, check for billing errors, compare against fair market value, identify your legal rights, and build your negotiation strategy.",
      },
    },
  ],
};
