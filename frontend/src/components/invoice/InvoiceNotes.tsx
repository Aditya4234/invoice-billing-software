interface Props {
  notes: string;
  termsConditions: string;
}

export function InvoiceNotes({ notes, termsConditions }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[11px] text-gray-600">
      <div>
        <h4 className="font-semibold text-gray-800 mb-1.5 text-xs">Notes</h4>
        <p className="leading-relaxed whitespace-pre-line">{notes}</p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-1.5 text-xs">Terms & Conditions</h4>
        <p className="leading-relaxed whitespace-pre-line">{termsConditions}</p>
      </div>
    </div>
  );
}
