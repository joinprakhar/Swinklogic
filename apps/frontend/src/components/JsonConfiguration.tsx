'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface JsonConfigurationProps {
  jsonConfig: string;
  setJsonConfig: (value: string) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  handleValidate: () => void;
  validating: boolean;
  saving: boolean;
  configId: string | null;
  router: any;
}

export default function JsonConfiguration({
  jsonConfig,
  setJsonConfig,
  handleSubmit,
  handleValidate,
  validating,
  saving,
  configId,
  router,
}: JsonConfigurationProps) {
  return (
    <div className="space-y-4">
      <Label htmlFor="jsonConfig">Paste Full Configuration JSON</Label>
      <Textarea
        id="jsonConfig"
        rows={20}
        value={jsonConfig}
        onChange={(e) => setJsonConfig(e.target.value)}
        placeholder="Paste full configuration JSON here"
        className="font-mono text-sm"
      />
      <div className="flex justify-between items-center space-x-4 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={handleValidate}
          disabled={validating}
        >
          {validating ? 'Validating...' : 'Validate'}
        </Button>
        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/management/scrape')}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving...' : configId ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>
    </div>
  );
}
