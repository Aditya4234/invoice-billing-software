export function SignatureSection() {
  return (
    <div className="border-t border-gray-300 pt-4 mt-4">
      <div className="flex justify-between items-end">
        <div className="text-[11px] text-gray-500">
          <p className="font-medium text-gray-700 mb-0.5">For Molyweb Digital Solutions Private Limited</p>
          <p>Authorised Signatory</p>
        </div>
        <div className="text-right">
          <div className="w-32 h-12 border-b border-gray-300 mb-1" />
          <p className="text-[11px] text-gray-500">Signature</p>
        </div>
      </div>
      <p className="text-[10px] text-gray-400 mt-3 text-center">
        This is a computer-generated invoice and does not require a physical signature.
      </p>
    </div>
  );
}
