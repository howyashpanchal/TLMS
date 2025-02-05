import { currentUser } from "@clerk/nextjs/server";
import NextPaymentCard from "@/app/dashboard/tenant/_components/nextPaymentCard";
export default async function TenantDashboard() {
  const user = await currentUser();
  return (
    <>
      <div className="min-h-screen">
        <div className="mx-auto">
          <div className="space-y-8">
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter text-center sm:text-left">
                Welcome back, {user?.firstName || "User"}
              </h1>
              <p className="text-muted-foreground text-center sm:text-left">
                Here&apos;s an overview of your rental status and recent
                activities.
              </p>
            </div>

            <div className="grid">
              <NextPaymentCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
