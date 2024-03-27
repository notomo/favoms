export const LeftNavigationTwoColumn = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <div className="grid h-full w-full grid-cols-[20%_calc(80%-1rem)] grid-rows-[100%] gap-[1rem] p-4">
      {children}
    </div>
  );
};
