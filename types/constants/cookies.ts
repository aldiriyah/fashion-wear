// Type definitions
export interface CookieType {
  type: string;
  purpose: string;
  examples: string;
}

export interface Browser {
  name: string;
  url: string;
}

export interface PolicySections {
  id: number;
  title: string;
  icon: string;
  content: string;
  list?: string[];
  note?: string;
  warning?: string;
  browsers?: Browser[];
}
export const cookieTypes: CookieType[] = [
    {
      type: "Strictly Necessary Cookies",
      purpose: "Required for the website to function properly. Without these, some features may not work.",
      examples: "Session cookies, security cookies"
    },
    {
      type: "Performance Cookies",
      purpose: "Collect data about website usage to improve functionality and content.",
      examples: "Analytics cookies"
    },
    {
      type: "Functionality Cookies",
      purpose: "Remember user preferences and choices.",
      examples: "Language settings, display preferences"
    },
    {
      type: "Affiliate Cookies",
      purpose: "Track clicks to Amazon and help us earn commissions.",
      examples: "Amazon Associates cookies"
    },
    {
      type: "Advertising Cookies",
      purpose: "May be used by third parties (like Amazon) to display relevant ads based on browsing history.",
      examples: "Amazon Ad Services cookies"
    }
  ];

  export const cookiePolicySections: PolicySections[] = [
    {
      id: 1,
      title: "What Are Cookies?",
      icon: "🍪",
      content: "Cookies are small text files that websites store on your computer or mobile device when you visit them. They help websites remember your actions and preferences (such as login details, language, and browsing behavior) over a certain period of time. Cookies are widely used to make websites function efficiently, analyze performance, and deliver personalized experiences to users."
    },
    {
      id: 2,
      title: "How Smart Wear Uses Cookies",
      icon: "🔍",
      content: "Smart Wear uses cookies to enhance your browsing experience, improve website functionality, and analyze user activity. We do not use cookies to collect personal or financial information such as names, payment details, or addresses. Here are the main ways we use cookies:",
      list: [
        "Performance and Analytics Cookies: These help us understand how visitors use our website — which pages they visit most, how long they stay, and how they navigate.",
        "Affiliate Tracking Cookies: Smart Wear participates in the Amazon Associates Program, which uses affiliate tracking cookies to track when you click on Amazon product links.",
        "Functionality Cookies: These cookies allow our site to remember certain preferences such as your language, display settings, or region.",
        "Security Cookies: Certain cookies help ensure our site's security by detecting suspicious or malicious activity."
      ]
    },
    {
      id: 3,
      title: "Third-Party Cookies",
      icon: "🔗",
      content: "In addition to our own cookies, we may use third-party cookies provided by trusted partners, such as:",
      list: [
        "Amazon: to track affiliate link clicks and attribute sales for commission purposes.",
        "Google Analytics (or similar tools): to gather anonymous statistical data about site usage, user behavior, and traffic sources."
      ],
      note: "These third-party services have their own privacy and cookie policies. Once you leave Smart Wear and go to Amazon or another external site, their policies will apply."
    },
    {
      id: 5,
      title: "Managing and Controlling Cookies",
      icon: "⚙️",
      content: "You have full control over how cookies are used on your device. You can:",
      list: [
        "Accept or reject cookies when you first visit our site (via the cookie consent banner).",
        "Change your cookie settings in your browser at any time.",
        "Delete existing cookies stored on your device."
      ],
      browsers: [
        { name: "Google Chrome", url: "#" },
        { name: "Mozilla Firefox", url: "#" },
        { name: "Microsoft Edge", url: "#" },
        { name: "Safari", url: "#" }
      ],
      warning: "Disabling cookies may affect how some parts of our website function. Some features may not display correctly or work as intended."
    },
    {
      id: 6,
      title: "How Long Cookies Stay on Your Device",
      icon: "⏰",
      content: "Cookies may remain on your device for varying lengths of time:",
      list: [
        "Session Cookies: Automatically deleted when you close your browser.",
        "Persistent Cookies: Remain stored on your device until they expire or you manually delete them."
      ],
      note: "We set cookies for the shortest reasonable duration necessary for their purpose."
    },
    {
      id: 7,
      title: "Changes to This Cookie Policy",
      icon: "🔄",
      content: "Smart Wear may update this Cookie Policy periodically to reflect changes in technology, legal requirements, or our own practices. When we make changes, we'll update the 'Effective Date' at the top of this page. We encourage you to review this page occasionally to stay informed about how we use cookies."
    },
    {
      id: 8,
      title: "Your Consent",
      icon: "✅",
      content: "By continuing to browse and use Smart Wear, you consent to our use of cookies as described in this policy. You may withdraw your consent at any time by adjusting your browser settings or rejecting cookies through our website banner."
    },
    {
      id: 9,
      title: "Contact Us",
      icon: "📞",
      content: "If you have questions or concerns about our Cookie Policy or how we use tracking technologies, please reach out to us through our Contact page or email us at [your@email.com]. We'll be happy to explain more or help you manage your cookie preferences."
    }
  ];