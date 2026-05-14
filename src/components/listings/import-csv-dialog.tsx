"use client";

import Papa from "papaparse";
import { useState, useTransition } from "react";
import { importListingsCsvAction } from "@/app/app/import/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function ImportCsvDialog() {
  const [csv, setCsv] = useState(
    "name,salePrice,shippingCharged,shippingCost,materialsCost,laborMinutes,laborRate,packagingCost,otherCost,machineMinutes,machineHourlyRate,tags,season\nSample planter,34,6.5,5.2,4.1,18,22,1.8,0.9,210,3.2,3d-print,year-round",
  );
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold">CSV import</h2>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        Paste CSV rows for a quick catalog setup. The parser validates the same listing fields used in the main form.
      </p>
      <Textarea className="mt-4 min-h-64" value={csv} onChange={(event) => setCsv(event.target.value)} />
      <div className="mt-4 flex gap-3">
        <Button
          onClick={() => {
            startTransition(async () => {
              const preview = Papa.parse(csv, { header: true });
              if (!preview.data.length) {
                setMessage("CSV preview is empty.");
                return;
              }
              const result = await importListingsCsvAction(csv);
              setMessage(
                result.ok
                  ? `Imported ${result.count} listings.`
                  : result.error || "Unable to import listings.",
              );
              if (result.ok) {
                window.location.href = "/app/listings";
              }
            });
          }}
          disabled={pending}
        >
          {pending ? "Importing..." : "Import CSV"}
        </Button>
        <a href="/api/export/listings" className="inline-flex items-center text-sm font-semibold text-[var(--secondary)]">
          Download current export
        </a>
      </div>
      {message ? <p className="mt-3 text-sm text-[var(--muted-foreground)]">{message}</p> : null}
    </Card>
  );
}
