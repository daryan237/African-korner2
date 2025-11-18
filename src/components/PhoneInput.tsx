import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  required?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  required = false,
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const countryCodes = [
    { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
    { code: "+237", country: "CM", flag: "🇨🇲", name: "Cameroun" },
    { code: "+32", country: "BE", flag: "🇧🇪", name: "Belgique" },
    { code: "+41", country: "CH", flag: "🇨🇭", name: "Suisse" },
    { code: "+1", country: "US", flag: "🇺🇸", name: "USA/Canada" },
    { code: "+44", country: "GB", flag: "🇬🇧", name: "Royaume-Uni" },
    { code: "+49", country: "DE", flag: "🇩🇪", name: "Allemagne" },
    { code: "+34", country: "ES", flag: "🇪🇸", name: "Espagne" },
    { code: "+39", country: "IT", flag: "🇮🇹", name: "Italie" },
    { code: "+351", country: "PT", flag: "🇵🇹", name: "Portugal" },
  ];

  const selectedCountry = countryCodes.find((c) => c.code === countryCode) || countryCodes[0];

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="h-full px-3 py-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center gap-2 min-w-[100px]"
          >
            <span className="text-xl">{selectedCountry.flag}</span>
            <span className="text-gray-900">{selectedCountry.code}</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                {countryCodes.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      onCountryCodeChange(country.code);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-left"
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span className="text-gray-900 flex-1">{country.name}</span>
                    <span className="text-gray-600">{country.code}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <input
          type="tel"
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="6 12 34 56 78"
        />
      </div>
    </div>
  );
}
