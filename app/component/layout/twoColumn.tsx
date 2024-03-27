export const TwoColumn = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-[100%] gap-x-4">
      {children}
    </div>
  );
};
