import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
} from "lucide-react";

export default async function Dashboard() {
  const user = await currentUser();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left">
              Welcome back, {user?.firstName || "User"}
            </h1>
            <p className="text-muted-foreground text-center sm:text-left">
              Here&apos;s an overview of your rental status and recent
              activities.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Next Payment",
                amount: "$1,200",
                due: "Due in 5 days",
                icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
              },
              {
                title: "Open Issues",
                amount: "2",
                due: "1 urgent",
                icon: <AlertCircle className="h-4 w-4 text-muted-foreground" />,
              },
              {
                title: "Documents",
                amount: "7",
                due: "2 need attention",
                icon: <FileText className="h-4 w-4 text-muted-foreground" />,
              },
              {
                title: "Messages",
                amount: "3",
                due: "1 unread",
                icon: (
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                ),
              },
            ].map((card) => (
              <Card
                key={card.title}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  {card.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.amount}</div>
                  <p className="text-xs text-muted-foreground">{card.due}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      type: "resolved",
                      title: "Maintenance request resolved",
                      description: "Bathroom sink fixed",
                      timeAgo: "2h ago",
                      iconColor: "bg-green-100 dark:bg-green-900",
                      icon: (
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ),
                    },
                  ].map((activity) => (
                    <div
                      key={activity.title}
                      className="flex items-center space-x-4"
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.iconColor}`}
                      >
                        {activity.icon}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.timeAgo}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {[
                  { title: "Report an Issue", icon: MessageSquare },
                  {
                    title: "Make a Payment",
                    icon: DollarSign,
                    variant: "outline",
                  },
                  {
                    title: "Upload Document",
                    icon: FileText,
                    variant: "outline",
                  },
                ].map((action) => (
                  <Button
                    key={action.title}
                    variant={action.variant}
                    className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    {<action.icon className="mr-2 h-4 w-4" />}
                    {action.title}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
