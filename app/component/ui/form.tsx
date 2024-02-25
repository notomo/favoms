export const ErrorMessage = ({ errors }: { errors: string[] | undefined }) => {
  if (errors === undefined) {
    return null;
  }
  return <div className="text-orange-200">{errors}</div>;
};
