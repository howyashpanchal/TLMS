import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Clock, MessageSquare } from "lucide-react";

export default function IssuesPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-center sm:text-left">
              Maintenance Issues
            </h1>
            <p className="text-muted-foreground text-center sm:text-left">
              Track and manage maintenance requests and issues.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Open Issues",
                count: "2",
                subtitle: "1 urgent",
                icon: <AlertCircle className="h-4 w-4 text-red-500" />,
              },
              {
                title: "In Progress",
                count: "3",
                subtitle: "2 scheduled",
                icon: <Clock className="h-4 w-4 text-yellow-500" />,
              },
              {
                title: "Resolved",
                count: "28",
                subtitle: "This year",
                icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
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
                  <div className="text-2xl font-bold">{stat.count}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Issues Card */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Recent Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    title: "Kitchen sink leaking",
                    status: "Urgent",
                    date: "Today",
                    description: "Water leaking under the sink",
                    statusColor: "text-red-500",
                  },
                  {
                    title: "Heating system maintenance",
                    status: "Scheduled",
                    date: "Tomorrow",
                    description: "Annual heating system check",
                    statusColor: "text-yellow-500",
                  },
                  {
                    title: "Window repair",
                    status: "In Progress",
                    date: "Oct 25",
                    description: "Fixing draft from living room window",
                    statusColor: "text-blue-500",
                  },
                ].map((issue, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="space-y-2 flex-1">
                      <p className="text-sm font-medium leading-none">
                        {issue.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {issue.description}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className={`text-sm font-medium ${issue.statusColor}`}>
                        {issue.status}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {issue.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Report New Issue Card */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Report New Issue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button className="flex-1 sm:flex-initial">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Create New Report
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-initial">
                  View All Issues
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
