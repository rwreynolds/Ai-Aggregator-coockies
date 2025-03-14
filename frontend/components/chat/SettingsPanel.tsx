// components/chat/SettingsPanel.tsx
import { useState, useEffect } from "react";
import { Dropdown, DropdownOption } from "@/components/ui/Dropdown";
import { Slider } from "@/components/ui/Slider";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { UserSettings, availableServices } from "@/lib/types";
import axios from "axios";

interface SettingsPanelProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

export default function SettingsPanel({
  settings,
  onSettingsChange,
}: SettingsPanelProps) {
  const [localSettings, setLocalSettings] = useState<UserSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [availableModels, setAvailableModels] = useState<DropdownOption[]>([]);

  // Update services dropdown options
  const serviceOptions: DropdownOption[] = availableServices.map((service) => ({
    value: service.service,
    label: service.service.charAt(0).toUpperCase() + service.service.slice(1),
  }));

  // Update local settings when props change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Update available models when service changes
  useEffect(() => {
    const service = availableServices.find(
      (s) => s.service === localSettings.service
    );

    if (service) {
      const models = service.models.map((model) => ({
        value: model,
        label: model,
      }));

      setAvailableModels(models);

      // If current model is not available for this service, set to first available
      if (!service.models.includes(localSettings.model)) {
        setLocalSettings((prev) => ({
          ...prev,
          model: service.models[0],
        }));
      }
    }
  }, [localSettings.service]);

  const handleServiceChange = (value: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      service: value,
    }));
  };

  const handleModelChange = (value: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      model: value,
    }));
  };

  const handleTemperatureChange = (value: number) => {
    setLocalSettings((prev) => ({
      ...prev,
      temperature: value,
    }));
  };

  const handleMaxTokensChange = (value: number) => {
    setLocalSettings((prev) => ({
      ...prev,
      maxTokens: value,
    }));
  };

  const handleAssistantIdChange = (value: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      assistantId: value,
    }));
  };

  const handleServiceThreadChange = (value: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      serviceThread: value,
    }));
  };

  const handleSessionThreadChange = (value: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      sessionThread: value,
    }));
  };

  const handleApplySettings = () => {
    onSettingsChange(localSettings);
  };

  const handleSaveAsDefault = async () => {
    setIsSaving(true);
    try {
      await axios.post("/api/settings", {
        defaultService: localSettings.service,
        defaultModel: localSettings.model,
        temperature: localSettings.temperature,
        maxTokens: localSettings.maxTokens,
        defaultAssistantId: localSettings.assistantId,
      });
      // Apply the settings as well
      onSettingsChange(localSettings);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-4">Chat Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic settings */}
        <div className="space-y-4">
          <Dropdown
            label="AI Service"
            value={localSettings.service}
            onChange={handleServiceChange}
            options={serviceOptions}
          />

          <Dropdown
            label="Model"
            value={localSettings.model}
            onChange={handleModelChange}
            options={availableModels}
          />

          <Slider
            label="Temperature"
            min={0}
            max={1}
            step={0.1}
            value={localSettings.temperature}
            onChange={handleTemperatureChange}
          />

          <Slider
            label="Max Tokens"
            min={100}
            max={4000}
            step={100}
            value={localSettings.maxTokens}
            onChange={handleMaxTokensChange}
          />
        </div>

        {/* Advanced settings */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="assistantId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Assistant ID (Optional)
            </label>
            <Input
              id="assistantId"
              value={localSettings.assistantId || ""}
              onChange={(e) => handleAssistantIdChange(e.target.value)}
              placeholder="For OpenAI Assistant API"
            />
          </div>

          <div>
            <label
              htmlFor="serviceThread"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Service Thread ID (Optional)
            </label>
            <Input
              id="serviceThread"
              value={localSettings.serviceThread || ""}
              onChange={(e) => handleServiceThreadChange(e.target.value)}
              placeholder="For threading with services"
            />
          </div>

          <div>
            <label
              htmlFor="sessionThread"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Session Thread ID (Optional)
            </label>
            <Input
              id="sessionThread"
              value={localSettings.sessionThread || ""}
              onChange={(e) => handleSessionThreadChange(e.target.value)}
              placeholder="For app session threading"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-end space-y-4">
          <Button
            onClick={handleApplySettings}
            variant="default"
          >
            Apply Settings
          </Button>
          <Button
            onClick={handleSaveAsDefault}
            variant="outline"
            isLoading={isSaving}
          >
            Save as Default
          </Button>
        </div>
      </div>
    </div>
  );
}