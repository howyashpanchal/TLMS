import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Payment } from "@/lib/db";
export default async function NextPaymentCard() {
  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">
            {Payment.amount}
          </div>
          <p className="text-xs text-muted-foreground">Due {Payment.dueDate}</p>
        </CardContent>
      </Card>
    </>
  );
}
