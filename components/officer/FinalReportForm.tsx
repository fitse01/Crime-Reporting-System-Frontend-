"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, FileCheck } from "lucide-react";
import { getToken } from "@/lib/auth";

const finalReportSchema = z.object({
  investigationSummary: z.string().min(50, "Summary must be at least 50 characters"),
  evidenceCollectedDescription: z.string().optional(),
  finalRecommendation: z.string().min(1, "Please select a recommendation"),
});

type FinalReportData = z.infer<typeof finalReportSchema>;

interface FinalReportFormProps {
  reportId: string;
}

export function FinalReportForm({ reportId }: FinalReportFormProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FinalReportData>({
    resolver: zodResolver(finalReportSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FinalReportData) => {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch("http://localhost:4000/api/final-reports/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, reportId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit report");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Final report submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["case", reportId] });
      // You might want to refresh the page or update local state to hide form
      window.location.reload(); 
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: FinalReportData) => {
    mutation.mutate(data);
  };

  return (
    <Card className="mt-8 border-blue-200 shadow-md">
      <CardHeader className="bg-blue-50/50">
        <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-blue-700" />
            <CardTitle className="text-xl text-blue-900">Final Investigation Report</CardTitle>
        </div>
        <CardDescription>
          Submit your final findings and recommendation to close this case.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label>Investigation Summary</Label>
            <Textarea
              placeholder="Detailed summary of the investigation process and findings..."
              className="min-h-[150px]"
              {...register("investigationSummary")}
            />
            {errors.investigationSummary && (
              <p className="text-sm text-red-600">
                {errors.investigationSummary.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Evidence Description (Optional)</Label>
            <Textarea
              placeholder="Describe physical or digital evidence collected..."
              className="min-h-[100px]"
              {...register("evidenceCollectedDescription")}
            />
          </div>

          <div className="space-y-2">
            <Label>Final Recommendation</Label>
            <Select onValueChange={(val) => setValue("finalRecommendation", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select recommendation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLOSED_RESOLVED">Close Case - Resolved</SelectItem>
                <SelectItem value="CLOSED_UNRESOLVED">Close Case - Unresolved (Lack of evidence)</SelectItem>
                <SelectItem value="CHARGES_FILED">Charges Filed - Sent to Prosecutor</SelectItem>
                <SelectItem value="FURTHER_INVESTIGATION">Request Further Investigation</SelectItem>
              </SelectContent>
            </Select>
             {errors.finalRecommendation && (
              <p className="text-sm text-red-600">
                {errors.finalRecommendation.message}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-900 hover:bg-blue-800"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Report...
              </>
            ) : (
              "Submit Final Report"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
