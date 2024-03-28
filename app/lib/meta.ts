import { useEffect } from "react";

export const useForceTitle = (title: string) => {
  // HACK
  useEffect(() => {
    document.title = title;
  }, [title]);
};
