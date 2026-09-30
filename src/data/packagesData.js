/**
 * packagesData.js
 * Celebration and video packages offered by Thaagam Foundation.
 */

export const packages = [
  {
    id: 1,
    name: "Wish Video",
    title: "Wish Video Package",
    amount: 1500,
    unitPrice: 1500,
    amountTitle: "₹ 1,500",
    image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/packages/Wish_Video_2.jpg.webp",
    description: "Children hold personalized boards wishing you or your loved ones with songs and heartfelt prayers, captured in a delightful 4K video.",
    includes: [
      "Personalized birthday board with your name & picture",
      "Celebration song performed by 20+ children",
      "High-definition video delivered via WhatsApp & Email",
      "Nutritious sweets and fruit distribution"
    ]
  },
  {
    id: 2,
    name: "Distribution Video",
    title: "Distribution Video Package",
    amount: 2500,
    unitPrice: 2500,
    amountTitle: "₹ 2,500",
    image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/packages/distribution_video1.jpg.webp",
    description: "Complete video coverage documenting food distribution to 50+ homeless people with your custom donor acknowledgement banner.",
    includes: [
      "Custom donor banner displayed during distribution",
      "50 full meals distributed on the street",
      "Full video and high-resolution photo proof",
      "Direct beneficiary interaction video clips"
    ]
  },
  {
    id: 3,
    name: "Banner Package",
    title: "Banner & Meal Sponsorship",
    amount: 3500,
    unitPrice: 3500,
    amountTitle: "₹ 3,500",
    image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/packages/banner1.jpg.webp",
    description: "Full-size personalized 6x3 flex banner honoring your anniversary, birthday, or loved one's memory during the entire food drive.",
    includes: [
      "6x3 ft custom flex banner designed with your photos",
      "100 freshly prepared meals served to destitute elders",
      "Complete photo collage & donor certificate",
      "Tax exemption receipt (80G)"
    ]
  },
  {
    id: 8,
    name: "Cake with Image",
    title: "Custom Photo Cake Package",
    amount: 2200,
    unitPrice: 2200,
    amountTitle: "₹ 2,200",
    image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/packages/imageoncake.webp",
    description: "Fresh premium 2kg edible photo cake with your personalized picture or message cut by orphanage children in celebration.",
    includes: [
      "2kg freshly baked edible photo cake",
      "Candle lighting & cake cutting ceremony",
      "High-definition video clips of celebration",
      "Snacks and drinks for all kids"
    ]
  },
  {
    id: 5,
    name: "Wish Video & Cake",
    title: "Wish Video & Birthday Cake Combo",
    amount: 4500,
    unitPrice: 4500,
    amountTitle: "₹ 4,500",
    image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/packages/Wish_Video_with_Cake1.jpg.webp",
    description: "The ultimate celebration experience combining a 3kg designer cake, party hats, personalized wishing video, and hot meals for 30 children.",
    includes: [
      "3kg freshly baked designer cake",
      "Personalized 4K wishing video and photo album",
      "Hot festive meals served to 30 orphanage kids",
      "Custom souvenir certificate from Thaagam Foundation"
    ]
  }
];

export const getPackageById = (id) => {
  const numericId = parseInt(id, 10);
  return packages.find((p) => p.id === numericId) || packages[0];
};
