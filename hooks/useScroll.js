import React from "react";

export const useScroll = () => {
  const moveTo = React.useCallback((ref) => {
    ref?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);
  return [moveTo];
};
