"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const ShareLinkButton = () => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    const currentUrl = window.location.href;

    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: document.title,
          text: "Check out this page!",
          url: currentUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      } finally {
        setIsSharing(false);
      }
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  return (
    <div>
      <Button onClick={handleShare} className="w-full">
        {isSharing ? "Sharing..." : "Share This Page"}
      </Button>
    </div>
  );
};

export default ShareLinkButton;
