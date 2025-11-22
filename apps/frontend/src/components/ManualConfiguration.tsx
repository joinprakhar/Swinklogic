'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

type FormDataType = {
  url: string;
  source: string;
  isApi: boolean;
  isRegular: boolean;
  wrapperSelector: string;
  selectors: {
    title: string;
    company: string;
    location: string;
    experience: string;
    description: string;
    tags: string;
    posted: string;
    link: string;
  };
  keys: Array<{
    field: string;
    path: string;
    map: string;
  }>;
  urlConfig: {
    directUrlFields: string;
    slugBase: string;
    slugPattern: string;
    slugifyFn: string;
  };
};

interface ManualConfigurationProps {
  formData: FormDataType;
  setFormData: (data: FormDataType) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleValidate: () => void;
  validating: boolean;
  saving: boolean;
  configId: string | null;
  router: any;
}

export default function ManualConfiguration({
  formData,
  setFormData,
  handleSubmit,
  handleValidate,
  validating,
  saving,
  configId,
  router,
}: ManualConfigurationProps) {
  const addKeyField = () => {
    setFormData({
      ...formData,
      keys: [...formData.keys, { field: '', path: '', map: '' }],
    });
  };

  const updateKeyField = (index: number, field: string, value: string) => {
    const newKeys = [...formData.keys];
    newKeys[index] = { ...newKeys[index], [field]: value };
    setFormData({ ...formData, keys: newKeys });
  };

  const removeKeyField = (index: number) => {
    setFormData({
      ...formData,
      keys: formData.keys.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="source">Source Name *</Label>
          <Input
            id="source"
            value={formData.source}
            onChange={(e) =>
              setFormData({ ...formData, source: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="url">URL *</Label>
          <Input
            id="url"
            type="url"
            value={formData.url}
            onChange={(e) =>
              setFormData({ ...formData, url: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="isApi">Configuration Type</Label>
          <Select
            value={formData.isApi ? 'api' : 'web'}
            onValueChange={(value) =>
              setFormData({ ...formData, isApi: value === 'api' })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web">Web Scraping</SelectItem>
              <SelectItem value="api">API Integration</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <input
            type="checkbox"
            id="isRegular"
            checked={formData.isRegular}
            onChange={(e) =>
              setFormData({ ...formData, isRegular: e.target.checked })
            }
          />
          <Label htmlFor="isRegular">Enable Regular Scraping</Label>
        </div>
      </div>

      {!formData.isApi && (
        <>
          <div>
            <Label htmlFor="wrapperSelector">Wrapper Selector</Label>
            <Input
              id="wrapperSelector"
              value={formData.wrapperSelector}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  wrapperSelector: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(formData.selectors).map(([key, value]) => (
              <div key={key}>
                <Label htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Label>
                <Input
                  id={key}
                  value={value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      selectors: {
                        ...formData.selectors,
                        [key]: e.target.value,
                      },
                    })
                  }
                />
              </div>
            ))}
          </div>
        </>
      )}

      {formData.isApi && (
        <>
          <div>
            <Label>API Keys</Label>
            {formData.keys.map((key, index) => (
              <div key={index} className="flex space-x-2 mt-2">
                <Input
                  placeholder="Field name"
                  value={key.field}
                  onChange={(e) =>
                    updateKeyField(index, 'field', e.target.value)
                  }
                  required
                />
                <Input
                  placeholder="JSON path"
                  value={key.path}
                  onChange={(e) =>
                    updateKeyField(index, 'path', e.target.value)
                  }
                  required
                />
                <Input
                  placeholder="Map function"
                  value={key.map}
                  onChange={(e) =>
                    updateKeyField(index, 'map', e.target.value)
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeKeyField(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addKeyField}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Key
            </Button>
          </div>

          <div className="space-y-4">
            <Label>URL Configuration</Label>
            <Input
              placeholder="Direct URL Fields (comma separated)"
              value={formData.urlConfig.directUrlFields}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  urlConfig: {
                    ...formData.urlConfig,
                    directUrlFields: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="Slug Base"
              value={formData.urlConfig.slugBase}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  urlConfig: {
                    ...formData.urlConfig,
                    slugBase: e.target.value,
                  },
                })
              }
            />
            <Input
              placeholder="Slug Pattern"
              value={formData.urlConfig.slugPattern}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  urlConfig: {
                    ...formData.urlConfig,
                    slugPattern: e.target.value,
                  },
                })
              }
            />
            <Textarea
              placeholder="Slugify Function"
              value={formData.urlConfig.slugifyFn}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  urlConfig: {
                    ...formData.urlConfig,
                    slugifyFn: e.target.value,
                  },
                })
              }
            />
          </div>
        </>
      )}

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
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : configId ? 'Update' : 'Create'}
          </Button>
        </div>
      </div>
    </form>
  );
}
