"use client";
import { useCallback, useEffect, useState } from "react";
import Button from "../atom/button";
import FormInput from "../atom/formInput";
import { formatPhoneNumberWithInputMask, validatePhone } from "@/lib/phone";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
// import { useDebounce } from "@/lib/useDebounce";

export default function Home() {
  const [formData, setFormData] = useState<
    Record<string, { value: string; error: string }>
  >({
    firstName: { value: "", error: "" },
    lastName: { value: "", error: "" },
    phoneNumber: { value: "", error: "" },
    corporationNumber: { value: "", error: "" },
  });

  const requiredFields = [
    { key: "firstName", label: "First name" },
    { key: "lastName", label: "Last name" },
    { key: "phoneNumber", label: "Phone number" },
    { key: "corporationNumber", label: "Corporation number" },
  ];

  const updateField = useCallback((key: string, value: string, error = "") => {
    setFormData((prev) => ({
      ...prev,
      [key]: { value, error },
    }));
  }, []);

  useEffect(() => {
    if (formData.phoneNumber.value === "") {
      updateField("phoneNumber", "", "");
    }
  }, [formData.phoneNumber.value, updateField]);

  // const debouncedCorpNumber = useDebounce(
  //   formData.corporationNumber.value,
  //   500
  // );

  // useEffect(() => {
  //   if (!debouncedCorpNumber) return;

  //   const runValidation = async () => {
  //     await validateCorpNumber(debouncedCorpNumber);
  //   };

  //   runValidation();
  // }, [debouncedCorpNumber]);

  const validateCorpNumber = async () => {
    try {
      const response = await fetch(
        `https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${formData.corporationNumber.value}`
      );
      const data = await response.json();

      if (!data.valid) {
        updateField(
          "corporationNumber",
          formData.corporationNumber.value,
          "Invalid corporation number"
        );
      } else {
        updateField("corporationNumber", formData.corporationNumber.value, "");
      }
    } catch (error) {
      console.error("Error validating corporation number:", error);
      updateField(
        "corporationNumber",
        formData.corporationNumber.value,
        "Failed to validate corporation number"
      );
    }
  };

  const handleSubmit = async () => {
    let hasError = false;
    requiredFields.forEach((field) => {
      if (formData[field.key].error) {
        return;
      } else if (!formData[field.key].value) {
        hasError = true;
        updateField(
          field.key,
          formData[field.key].value,
          formData[field.key].error || `${field.label} is required`
        );
      }
    });

    if (hasError) return;

    try {
      const response = await fetch(
        "https://fe-hometask-api.qa.vault.tryvault.com/profile-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName.value,
            lastName: formData.lastName.value,
            corporationNumber: formData.corporationNumber.value,
            phone: formData.phoneNumber.value,
          }),
        }
      );
      if (response.ok) {
        alert("Onboarding successful");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit");
    }
  };

  return (
    <div className="bg-neutral-200 w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-l bg-white border-[1px] border-neutral-300 rounded-medium items-center text-neutral-800 p-2xl">
        <div className="text-h2Regular">Onboarding Form</div>
        <div className="flex gap-xl items-center justify-center">
          <FormInput
            data-testid="firstName"
            label="First name"
            value={formData.firstName.value}
            onChange={(val) => updateField("firstName", val)}
            errorMessage={formData.firstName.error}
            maxLength={50}
          />
          <FormInput
            data-testid="lastName"
            label="Last name"
            value={formData.lastName.value}
            onChange={(val) => updateField("lastName", val)}
            errorMessage={formData.lastName.error}
            maxLength={50}
          />
        </div>
        <FormInput
          data-testid="phoneNumber"
          label="Phone number"
          value={formData.phoneNumber.value}
          onChange={(val) => {
            const error = !validatePhone(val) ? "Invalid phone number" : "";
            updateField(
              "phoneNumber",
              formatPhoneNumberWithInputMask(val),
              error
            );
          }}
          errorMessage={formData.phoneNumber.error}
          maxLength={12}
        />
        <FormInput
          data-testid="corporationNumber"
          label="Corporation number"
          value={formData.corporationNumber.value}
          onChange={(val) => {
            updateField("corporationNumber", val);
          }}
          errorMessage={formData.corporationNumber.error}
          onBlur={validateCorpNumber}
          maxLength={9}
        />
        <Button
          data-testid="submit"
          onClick={handleSubmit}
          icon={{
            icon: <ArrowRightIcon className="size-l text-neutral-0" />,
            position: "right",
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
