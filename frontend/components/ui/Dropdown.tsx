// components/ui/Dropdown.tsx
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function Dropdown({
  value,
  onChange,
  options,
  label,
  className,
  disabled = false,
}: DropdownProps) {
  const selectedOption = options.find(option => option.value === value) || options[0];

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selectedOption?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}