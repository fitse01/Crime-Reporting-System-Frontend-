"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Clock,
  MessageSquare,
  Trash2,
  Check,
} from "lucide-react";

export default function OfficerNotificationsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");

  // useEffect(() => {
  //   const auth = localStorage.getItem("officerAuth")
  //   if (!auth) {
  //     router.push("/officer/login")
  //   }
  // }, [router])

  const notifications = [
    {
      id: 1,
      type: "new_case",
      title: "New Case Assigned",
      message: "You have been assigned to case RPT-12345678 (Theft)",
      time: "5 minutes ago",
      read: false,
      priority: "high",
      icon: FileText,
      link: "/officer/cases/RPT-12345678",
    },
    {
      id: 2,
      type: "urgent",
      title: "High Priority Alert",
      message: "Assault reported in your patrol area - 5th Avenue",
      time: "15 minutes ago",
      read: false,
      priority: "urgent",
      icon: AlertTriangle,
      link: "/officer/map",
    },
    {
      id: 3,
      type: "update",
      title: "Case Update",
      message: "New evidence uploaded for case RPT-87654321",
      time: "1 hour ago",
      read: false,
      priority: "medium",
      icon: FileText,
      link: "/officer/cases/RPT-87654321",
    },
    {
      id: 4,
      type: "message",
      title: "Message from Sergeant Brown",
      message: "Please submit your weekly report by end of day",
      time: "2 hours ago",
      read: true,
      priority: "medium",
      icon: MessageSquare,
      link: "#",
    },
    {
      id: 5,
      type: "resolved",
      title: "Case Resolved",
      message: "Case RPT-44556677 has been marked as resolved",
      time: "3 hours ago",
      read: true,
      priority: "low",
      icon: CheckCircle2,
      link: "/officer/cases/RPT-44556677",
    },
    {
      id: 6,
      type: "reminder",
      title: "Court Appearance Reminder",
      message: "Case RPT-33221100 hearing scheduled for tomorrow at 9:00 AM",
      time: "5 hours ago",
      read: true,
      priority: "high",
      icon: Clock,
      link: "/officer/cases/RPT-33221100",
    },
    {
      id: 7,
      type: "new_case",
      title: "New Case Assigned",
      message: "You have been assigned to case RPT-99887766 (Burglary)",
      time: "1 day ago",
      read: true,
      priority: "high",
      icon: FileText,
      link: "/officer/cases/RPT-99887766",
    },
    {
      id: 8,
      type: "update",
      title: "Evidence Analysis Complete",
      message: "Forensic results available for case RPT-12345678",
      time: "1 day ago",
      read: true,
      priority: "medium",
      icon: FileText,
      link: "/officer/cases/RPT-12345678",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20";
      case "high":
        return "border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-950/20";
      case "medium":
        return "border-l-4 border-l-blue-500";
      case "low":
        return "border-l-4 border-l-gray-500";
      default:
        return "";
    }
  };

  const getNotificationIcon = (Icon: any, priority: string) => {
    const colorClass =
      priority === "urgent"
        ? "text-red-600"
        : priority === "high"
        ? "text-orange-600"
        : priority === "medium"
        ? "text-blue-600"
        : "text-gray-600";
    return <Icon className={`h-5 w-5 ${colorClass}`} />;
  };

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/10 rounded-full">
                <Bell className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Notifications</h1>
                <p className="text-muted-foreground">
                  {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => alert("All marked as read")}
            >
              <Check className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className={filter === "all" ? "" : "bg-transparent"}
              >
                All
                <Badge variant="secondary" className="ml-2">
                  {notifications.length}
                </Badge>
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("unread")}
                className={filter === "unread" ? "" : "bg-transparent"}
              >
                Unread
                <Badge variant="secondary" className="ml-2">
                  {unreadCount}
                </Badge>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card
                key={notification.id}
                className={`${getPriorityColor(notification.priority)} ${
                  !notification.read ? "shadow-md" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        !notification.read ? "bg-accent/20" : "bg-muted"
                      }`}
                    >
                      {getNotificationIcon(Icon, notification.priority)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3
                              className={`font-semibold ${
                                !notification.read
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => alert("Notification deleted")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => alert("Marked as read")}
                            >
                              <Check className="mr-1 h-3 w-3" />
                              Mark Read
                            </Button>
                          )}
                          {notification.link && notification.link !== "#" && (
                            <Link href={notification.link}>
                              <Button size="sm">View</Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
              <p className="text-muted-foreground">You're all caught up!</p>
            </CardContent>
          </Card>
        )}

        {/* Notification Settings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Customize what notifications you receive
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "New Case Assignments", enabled: true },
                { label: "Case Updates", enabled: true },
                { label: "High Priority Alerts", enabled: true },
                { label: "Messages from Supervisors", enabled: true },
                { label: "Court Reminders", enabled: true },
                { label: "System Announcements", enabled: false },
              ].map((pref, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <span className="text-sm font-medium">{pref.label}</span>
                  <Button
                    variant={pref.enabled ? "default" : "outline"}
                    size="sm"
                  >
                    {pref.enabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
