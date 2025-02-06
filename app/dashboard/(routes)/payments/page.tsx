import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownUp, CreditCard, DollarSign, Receipt } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left">
              Payments
            </h1>
            <p className="text-muted-foreground text-center sm:text-left">
              Manage your rent payments and view payment history.
            </p>
          </div>

          {/* Payment Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Next Payment",
                value: "$1,200",
                subtitle: "Due in 5 days",
                icon: <DollarSign className="h-4 w-4 text-emerald-500" />,
                urgent: true,
              },
              {
                title: "Last Payment",
                value: "$1,200",
                subtitle: "Paid Oct 1, 2023",
                icon: <Receipt className="h-4 w-4 text-blue-500" />,
              },
              {
                title: "Payment Method",
                value: "VISA",
                subtitle: "ending in 4242",
                icon: <CreditCard className="h-4 w-4 text-purple-500" />,
              },
              {
                title: "Total Paid",
                value: "$14,400",
                subtitle: "Last 12 months",
                icon: <ArrowDownUp className="h-4 w-4 text-gray-500" />,
              },
            ].map((stat) => (
              <Card
                key={stat.title}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${
                      stat.urgent
                        ? "text-emerald-600 dark:text-emerald-400"
                        : ""
                    }`}
                  >
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment History Card */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    date: "Oct 1, 2023",
                    amount: "$1,200",
                    status: "Paid",
                    method: "VISA •••• 4242",
                  },
                  {
                    date: "Sep 1, 2023",
                    amount: "$1,200",
                    status: "Paid",
                    method: "VISA •••• 4242",
                  },
                  {
                    date: "Aug 1, 2023",
                    amount: "$1,200",
                    status: "Paid",
                    method: "VISA •••• 4242",
                  },
                ].map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="space-y-2 flex-1">
                      <p className="text-sm font-medium leading-none">
                        {payment.date}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {payment.method}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-sm font-medium leading-none">
                        {payment.amount}
                      </p>
                      <p className="text-sm text-green-500 font-medium">
                        {payment.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Make Payment Card */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Make a Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Pay Now
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-initial">
                  Update Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
