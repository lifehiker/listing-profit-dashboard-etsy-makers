"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      className="rounded-full border px-4 py-2 text-sm font-semibold"
      onClick={() => window.print()}
    >
      Print or save PDF
    </button>
  );
}
