"use client";

import { useState, useTransition } from "react";
import { CostTemplate } from "@prisma/client";
import { saveTemplateAction } from "@/app/app/templates/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function TemplateForm({ template }: { template?: CostTemplate | null }) {
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold">{template ? "Edit template" : "New cost template"}</h3>
      <form
        className="mt-4 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
          startTransition(async () => {
            const result = await saveTemplateAction(payload);
            if (!result.ok) {
              setError(result.error || "Unable to save template.");
              return;
            }
            window.location.reload();
          });
        }}
      >
        <input type="hidden" name="id" defaultValue={template?.id} />
        <Input name="name" defaultValue={template?.name} placeholder="3D Print Small Batch" required />
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="defaultLaborRate" type="number" step="0.01" defaultValue={template?.defaultLaborRate ?? 0} placeholder="Labor rate" />
          <Input name="defaultMachineRate" type="number" step="0.01" defaultValue={template?.defaultMachineRate ?? 0} placeholder="Machine rate" />
          <Input name="defaultPackagingCost" type="number" step="0.01" defaultValue={template?.defaultPackagingCost ?? 0} placeholder="Packaging" />
          <Input name="defaultOtherCost" type="number" step="0.01" defaultValue={template?.defaultOtherCost ?? 0} placeholder="Other" />
        </div>
        <Textarea name="notes" defaultValue={template?.notes || ""} placeholder="When do you use this template?" />
        {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
        <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save template"}</Button>
      </form>
    </Card>
  );
}
