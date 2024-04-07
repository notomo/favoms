export const LeftNavigationTwoColumn = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <div className="grid h-full w-full grid-cols-[20%_80%] grid-rows-[100%] gap-x-4 p-4">
      {children}
    </div>
  );
};
