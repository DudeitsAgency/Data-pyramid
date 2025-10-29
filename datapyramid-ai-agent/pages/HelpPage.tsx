import React from 'react';

const faqs = [
    { q: "How do I start a new campaign?", a: "Navigate to the 'Campaigns' page and click the 'Create Campaign' button. The AI agent Isis will guide you through the setup process step-by-step." },
    { q: "What is the BCG Matrix?", a: "The Boston Consulting Group (BCG) Matrix is a strategic tool used to analyze your product or campaign portfolio. It categorizes them into Stars, Cash Cows, Question Marks, and Dogs based on market growth and market share." },
    { q: "How do I add funds to my wallet?", a: "Go to the 'Wallet' page and click the 'Fund Wallet' button. You will be prompted to enter your payment details securely." }
]

const glossary = [
    { term: "CPA (Cost Per Acquisition)", def: "The total cost of acquiring one paying customer for a campaign or channel." },
    { term: "ROI (Return on Investment)", def: "A performance measure used to evaluate the efficiency of an investment. It is calculated as (Net Profit / Cost of Investment) * 100." },
    { term: "SOV (Share of Voice)", def: "A measure of the market your brand owns compared to your competitors. It acts as a gauge for your brand's visibility." }
]

const HelpPage: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 h-full overflow-y-auto">
            <h1 className="text-3xl font-cinzel font-bold text-amber-600 tracking-wider mb-6">Help & Glossary</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* FAQ Section */}
                <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-6 border border-slate-300 shadow-sm">
                    <h2 className="font-cinzel text-2xl text-amber-600 mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i}>
                                <h3 className="font-bold text-slate-900">{faq.q}</h3>
                                <p className="text-slate-700 mt-1">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Glossary Section */}
                <div className="bg-slate-50/80 backdrop-blur-md rounded-lg p-6 border border-slate-300 shadow-sm">
                    <h2 className="font-cinzel text-2xl text-amber-600 mb-4">Glossary</h2>
                    <div className="space-y-4">
                        {glossary.map((item, i) => (
                            <div key={i}>
                                <h3 className="font-bold text-slate-900">{item.term}</h3>
                                <p className="text-slate-700 mt-1">{item.def}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;