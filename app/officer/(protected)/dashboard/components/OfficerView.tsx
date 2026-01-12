import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "./StatCard";
import { CheckCircle2, MessageSquare } from "lucide-react";
// components/OfficerView.tsx
import { OfficerUser } from "@/lib/auth";
import Link from "next/link";

interface OfficerViewProps {
  reports: any[];
  user: OfficerUser; // Add this line
}
export default function OfficerView({
  reports,
  user,
}: {
  reports: any[];
  user: any;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-700 p-8 rounded-2xl text-white shadow-xl">
        <h1 className="text-3xl font-bold">Officer {user.badgeId || "Unit"}</h1>
        <p className="opacity-90">
          You have {reports.length} active assignments for this shift.
        </p>
        <div className="mt-4 flex gap-3">
          <Button variant="secondary" size="sm">
            My Schedule
          </Button>
          <Button
            variant="outline"
            className="text-white border-white bg-white/10"
            size="sm"
          >
            File Report
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Urgent Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reports
              .filter((r) => r.priority === "HIGH")
              .map((r) => (
                <div
                  key={r.id}
                  className="p-3 bg-red-50 border-l-4 border-red-500 rounded text-sm flex justify-between"
                >
                  <span>
                    {r.caseNumber} - {r.title}
                  </span>
                  <Link
                    href={`/officer/reports/${r.id}`}
                    className="text-red-600 font-bold underline"
                  >
                    Respond
                  </Link>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Field Notifications</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            No new safety notices for your district.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
