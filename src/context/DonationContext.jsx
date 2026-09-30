import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/backendMock";

const DonationContext = createContext(null);

export const DonationProvider = ({ children }) => {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [subscriptionTab, setSubscriptionTab] = useState("education");
  const [selectedPlanAmount, setSelectedPlanAmount] = useState(1000);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRecentlyViewedOpen, setIsRecentlyViewedOpen] = useState(false);

  // Recently viewed causes
  const [recentlyViewed, setRecentlyViewed] = useState([
    {
      slug: "water_bottle",
      name: "Fight Thirst. Share Water",
      price: "₹ 10/Bottle",
      image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/deps/causes/card/WATTER_BOTTLE.webp",
      url: "/causes-detail/water_bottle/"
    },
    {
      slug: "homeless",
      name: "Feed a Homeless Person",
      price: "₹ 30/Person",
      image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/deps/causes/card/homeless5.webp",
      url: "/homeless/"
    },
    {
      slug: "chicken_briyani",
      name: "Chicken Biryani",
      price: "₹ 120/Person",
      image: "/cdn-cgi/image/w=300,fit=cover,f=auto,q=70/https:/media.thaagam.org/media/deps/causes/card/chickenbiriyani.webp",
      url: "/causes-detail/chicken_briyani/"
    }
  ]);

  const addRecentlyViewed = (cause) => {
    setRecentlyViewed((prev) => {
      const exists = prev.find((item) => item.slug === cause.slug);
      if (exists) return prev;
      return [
        {
          slug: cause.slug,
          name: cause.name,
          price: cause.amountTitle,
          image: cause.cardImage,
          url: cause.detailUrl
        },
        ...prev.slice(0, 5)
      ];
    });
  };

  const openSubscriptionModal = (tab = "education", amount = 1000) => {
    setSubscriptionTab(tab);
    setSelectedPlanAmount(amount);
    setIsSubscriptionModalOpen(true);
  };

  const closeSubscriptionModal = () => {
    setIsSubscriptionModalOpen(false);
  };

  return (
    <DonationContext.Provider
      value={{
        isSubscriptionModalOpen,
        openSubscriptionModal,
        closeSubscriptionModal,
        subscriptionTab,
        setSubscriptionTab,
        selectedPlanAmount,
        setSelectedPlanAmount,
        isSearchOpen,
        setIsSearchOpen,
        isRecentlyViewedOpen,
        setIsRecentlyViewedOpen,
        recentlyViewed,
        addRecentlyViewed
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error("useDonation must be used within a DonationProvider");
  }
  return context;
};
