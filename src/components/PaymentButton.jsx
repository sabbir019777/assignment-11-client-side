import React, { useState } from "react";
import { toast } from "react-hot-toast";

const PaymentButton = ({
  user = null,
  isPremium = false,
  priceTaka = 1500,
  createSessionUrl = "/create-checkout-session",
  getIdToken = null,
}) => {
  const [loading, setLoading] = useState(false);


  const fetchIdToken = async () => {
    try {
      if (typeof getIdToken === "function") return await getIdToken();
      
      if (user && typeof user.getIdToken === "function") return await user.getIdToken();
    } catch (err) {
      console.error("token error:", err);
    }
    return null;
  };

  const handleCheckout = async () => {
    if (isPremium) {
      toast("You are already a Premium user.");
      return;
    }

    setLoading(true);
    let token = null;
    try {
      token = await fetchIdToken();
    } catch (err) {
      console.error(err);
    }

    try {
      const res = await fetch(createSessionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          price: priceTaka, 
          currency: "bdt",
          mode: "one_time",
          metadata: { email: user?.email || null },
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to create checkout session");
      }

      const data = await res.json();

      if (data.url) {
      
        window.location.href = data.url;
      } else {
        throw new Error("Invalid session response from server");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inline-block">
      <button
        aria-label={isPremium ? "Already Premium" : `Upgrade to Premium ৳${priceTaka}`}
        onClick={handleCheckout}
        disabled={loading || isPremium}
        className={`relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl transform-gpu transition-transform
          ${isPremium ? "opacity-60 cursor-not-allowed scale-100" : "hover:-translate-y-1 active:translate-y-0"}
          bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white font-semibold`}
      >
        {/* Futuristic glow / ring */}
        <span
          aria-hidden
          className="absolute -inset-0.5 rounded-2xl blur-lg opacity-30 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500"
          style={{ zIndex: -1 }}
        />

        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2l2.09 6.26L20 9.27l-4.91 3.57L16.18 20 12 16.77 7.82 20l1.09-7.16L4 9.27l5.91-.99L12 2z" />
        </svg>

        <span className="flex flex-col leading-4 text-left">
          <span className="text-sm">Upgrade to Premium</span>
          <span className="text-xs opacity-90">One-time ৳{priceTaka} — Lifetime</span>
        </span>

        {/* Loader or lock */}
        <span className="ml-3">
          {loading ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : isPremium ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.8 2.034c-.784.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.566 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69L9.049 2.927z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
              <path d="M21 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
            </svg>
          )}
        </span>
      </button>

      {/* Small helper note */}
      <p className="mt-2 text-xs text-gray-500">Secure payment — Stripe (test mode). ৳{priceTaka} one-time.</p>
    </div>
  );
};

export default PaymentButton;
