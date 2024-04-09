import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigation } from "@remix-run/react";
import { Download } from "lucide-react";
import { LoadingOr } from "~/component/ui/loading";
import { exportFileRoute } from "~/routePath/exportRoute";

export const meta: MetaFunction = () => {
  return [{ title: "Export | favoms" }];
};

const size = 40;

export default function Page() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Link
        to={exportFileRoute({})}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-4 text-3xl"
      >
        <LoadingOr size={size} isLoading={isLoading}>
          <Download size={size} />
        </LoadingOr>
        Export
      </Link>
    </div>
  );
}
