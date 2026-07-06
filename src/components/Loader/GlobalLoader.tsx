import { useIsFetching, useIsMutating } from "@tanstack/react-query";

interface GlobalLoaderProps {
  isLoading?: boolean;
}

export const GlobalLoader = ({ isLoading = false }: GlobalLoaderProps) => {
  const fetching = useIsFetching();
  const mutating = useIsMutating();

  if (!isLoading && fetching === 0 && mutating === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};
