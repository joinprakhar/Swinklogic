'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Play, Pause, Eye, EyeOff, RefreshCw } from 'lucide-react';

interface ScrapeConfig {
  _id: string;
  url: string;
  source: string;
  isApi: boolean;
  isActive: boolean;
  isRegular: boolean;
  wrapperSelector?: string;
  selectors?: {
    title?: string;
    company?: string;
    location?: string;
    experience?: string;
    description?: string;
    tags?: string;
    posted?: string;
    link?: string;
  };
  keys?: Array<{
    field: string;
    path: string;
    map?: string;
  }>;
  urlConfig?: {
    directUrlFields?: string[];
    slugBase?: string;
    slugPattern?: string;
    slugifyFn?: string;
  };
  createdAt: string;
}

interface ScrapeResult {
  success?: boolean;
  message?: string;
  error?: string;
  totalScraped?: number;
  newInsertedCount?: number;
  newInserted?: Record<string, unknown>[];
}

export default function ScrapeManagementPage() {
  const router = useRouter();
  const [configs, setConfigs] = useState<ScrapeConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<ScrapeResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const loadConfigs = useCallback(async () => {
    try {
      const endpoint = showAll ? '/api/scrape-configs?all=true' : '/api/scrape-configs';
      const response = await fetch(endpoint);
      const result = await response.json();
      if (result.success) {
        setConfigs(result.data);
      }
    } catch (error) {
      console.error('Error loading configs:', error);
    } finally {
      setLoading(false);
    }
  }, [showAll]);

  useEffect(() => {
    loadConfigs();
  }, [loadConfigs]);

  const handleAdd = () => {
    router.push('/dashboard/management/scrape-configuration');
  };

  const handleEdit = (config: ScrapeConfig) => {
    router.push(`/dashboard/management/scrape-configuration?id=${config._id}`);
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/scrape-configs/${id}/toggle`, { method: 'PATCH' });
      if (response.ok) {
        loadConfigs();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const handleScrapeNow = async () => {
    setScraping(true);
    try {
      const response = await fetch('/api/scrape', { method: 'POST' });
      const result = await response.json();
      setScrapeResult(result);
      setShowResultModal(true);
      // Reload configs to reflect any changes
      loadConfigs();
    } catch (error) {
      console.error('Error scraping:', error);
      setScrapeResult({ success: false, message: 'Error occurred during scraping', error: (error as Error).message });
      setShowResultModal(true);
    } finally {
      setScraping(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Scrape Management</h1>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={handleScrapeNow}
            disabled={scraping}
          >
            {scraping ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            {scraping ? 'Scraping...' : 'Scrape Now'}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {showAll ? 'Show Active Only' : 'Show All'}
          </Button>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Configuration
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {configs.map((config) => (
          <Card key={config._id} className={`transition-all ${!config.isActive ? 'opacity-60' : ''}`}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{config.source}</span>
                <Badge variant={config.isActive ? 'default' : 'secondary'}>
                  {config.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2 truncate" title={config.url}>
                {config.url}
              </p>
              <p className="text-sm mb-4">
                Type: {config.isApi ? 'API' : 'Web'} | Regular: {config.isRegular ? 'Yes' : 'No'}
              </p>
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleEdit(config)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(config._id)}
                >
                  {config.isActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {config.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scrape Result Modal */}
      <Dialog open={showResultModal} onOpenChange={setShowResultModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scraping Results</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {scrapeResult?.success === false ? (
              <div className="text-red-600">
                <p className="font-semibold">Error</p>
                <p>{scrapeResult.message}</p>
                {scrapeResult.error && <p className="text-sm text-gray-600">{scrapeResult.error}</p>}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Total Scraped</p>
                    <p className="text-2xl font-bold text-blue-600">{scrapeResult?.totalScraped || 0}</p>
                  </div>
                  <div>
                    <p className="font-semibold">New Inserted</p>
                    <p className="text-2xl font-bold text-green-600">{scrapeResult?.newInsertedCount || 0}</p>
                  </div>
                </div>
                {scrapeResult?.newInserted && scrapeResult.newInserted.length > 0 && (
                  <div>
                    <p className="font-semibold mb-2">New Jobs Added:</p>
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {scrapeResult.newInserted.slice(0, 5).map((job: Record<string, unknown>, index: number) => (
                        <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                          <p className="font-medium">{job.title as string}</p>
                          <p className="text-gray-600">{job.company as string} - {job.source as string}</p>
                        </div>
                      ))}
                      {scrapeResult.newInserted.length > 5 && (
                        <p className="text-sm text-gray-500">...and {scrapeResult.newInserted.length - 5} more</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
