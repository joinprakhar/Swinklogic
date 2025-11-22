'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshCw, Play, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

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

interface Job {
  _id: string;
  title: string;
  company?: string;
  location?: string;
  url?: string;
  experience?: string;
  description?: string;
  tags: string[];
  posted?: string;
  link: string;
  source?: string;
  scrapedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function ScrapeNowPage() {
  const [configs, setConfigs] = useState<ScrapeConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrapingConfigs, setScrapingConfigs] = useState<Set<string>>(new Set());
  const [scrapeResults, setScrapeResults] = useState<Record<string, { success: boolean; message?: string; error?: string; totalScraped?: number; newInsertedCount?: number; allScraped?: Job[]; newInserted?: Job[] }>>({});
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState<{ config: ScrapeConfig; result: { success: boolean; message?: string; error?: string; totalScraped?: number; newInsertedCount?: number; allScraped?: Job[]; newInserted?: Job[] } } | null>(null);

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      const response = await fetch('/api/scrape-configs?all=true');
      const result = await response.json();
      if (result.success) {
        setConfigs(result.data);
      }
    } catch (error) {
      console.error('Error loading configs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeConfig = async (config: ScrapeConfig) => {
    setScrapingConfigs(prev => new Set(prev).add(config._id));
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sources: [config.source] }),
      });
      const result = await response.json();
      setScrapeResults(prev => ({ ...prev, [config._id]: result }));
      setSelectedResult({ config, result });
      setShowResultModal(true);
      // Reload configs to reflect any changes
      loadConfigs();
    } catch (error) {
      console.error('Error scraping config:', error);
      const errorResult = { success: false, message: 'Error occurred during scraping', error: (error as Error).message };
      setScrapeResults(prev => ({ ...prev, [config._id]: errorResult }));
      setSelectedResult({ config, result: errorResult });
      setShowResultModal(true);
    } finally {
      setScrapingConfigs(prev => {
        const newSet = new Set(prev);
        newSet.delete(config._id);
        return newSet;
      });
    }
  };

  const toggleRowExpansion = (configId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(configId)) {
        newSet.delete(configId);
      } else {
        newSet.add(configId);
      }
      return newSet;
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Scrape Now</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scrape Configurations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Source</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Regular</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {configs.map((config) => {
                const result = scrapeResults[config._id];
                const isExpanded = expandedRows.has(config._id);
                const hasResults = result && result.allScraped && result.allScraped.length > 0;

                return (
                  <>
                    <TableRow key={config._id}>
                      <TableCell>
                        {hasResults && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(config._id)}
                            className="p-0 h-6 w-6"
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{config.source}</TableCell>
                      <TableCell className="max-w-xs truncate" title={config.url}>
                        {config.url}
                      </TableCell>
                      <TableCell>
                        <Badge variant={config.isApi ? 'default' : 'secondary'}>
                          {config.isApi ? 'API' : 'Web'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={config.isActive ? 'default' : 'secondary'}>
                          {config.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={config.isRegular ? 'default' : 'outline'}>
                          {config.isRegular ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(config.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleScrapeConfig(config)}
                          disabled={scrapingConfigs.has(config._id)}
                          size="sm"
                        >
                          {scrapingConfigs.has(config._id) ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Play className="h-4 w-4 mr-2" />
                          )}
                          {scrapingConfigs.has(config._id) ? 'Scraping...' : 'Scrape'}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {isExpanded && hasResults && (
                      <TableRow>
                        <TableCell colSpan={8} className="bg-gray-50">
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-semibold">Scraped Jobs ({result.allScraped?.length || 0})</h4>
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">New: {result.newInsertedCount || 0}</span>
                                <span className="mx-2">•</span>
                                <span>Total: {result.totalScraped || 0}</span>
                              </div>
                            </div>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                              {result.allScraped?.map((job: Job, index: number) => {
                                const isNew = result.newInserted?.some((newJob: Job) => newJob._id === job._id);
                                return (
                                  <div key={index} className={`p-3 border rounded-lg ${isNew ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'}`}>
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <h5 className="font-medium text-gray-900">{job.title}</h5>
                                          {isNew && (
                                            <Badge variant="default" className="text-xs bg-green-600">
                                              New
                                            </Badge>
                                          )}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">{job.company || 'N/A'}</p>
                                        <p className="text-sm text-gray-500 mb-2">{job.location || 'N/A'}</p>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                          <span>Posted: {job.posted || 'N/A'}</span>
                                          {job.experience && <span>Exp: {job.experience}</span>}
                                        </div>
                                      </div>
                                      <div className="flex flex-col items-end gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => window.open(job.link, '_blank')}
                                          className="text-xs"
                                        >
                                          <ExternalLink className="h-3 w-3 mr-1" />
                                          View
                                        </Button>
                                        <span className="text-xs text-gray-400">
                                          {new Date(job.scrapedAt).toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                    {job.description && (
                                      <p className="text-sm text-gray-700 mt-2 line-clamp-2">{job.description}</p>
                                    )}
                                    {job.tags && job.tags.length > 0 && job.tags[0] && (
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {job.tags.slice(0, 3).map((tag, tagIndex) => (
                                          <Badge key={tagIndex} variant="outline" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Scrape Result Modal */}
      <Dialog open={showResultModal} onOpenChange={setShowResultModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scraping Results - {selectedResult?.config?.source}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedResult?.result?.success === false ? (
              <div className="text-red-600">
                <p className="font-semibold">Error</p>
                <p>{selectedResult.result.message}</p>
                {selectedResult.result.error && <p className="text-sm text-gray-600">{selectedResult.result.error}</p>}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Total Scraped</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedResult?.result?.totalScraped || 0}</p>
                  </div>
                  <div>
                    <p className="font-semibold">New Inserted</p>
                    <p className="text-2xl font-bold text-green-600">{selectedResult?.result?.newInsertedCount || 0}</p>
                  </div>
                </div>
                {selectedResult?.result?.newInserted && selectedResult.result.newInserted.length > 0 && (
                  <div>
                    <p className="font-semibold mb-2">New Jobs Added:</p>
                    <div className="max-h-40 overflow-y-auto space-y-1">
                      {selectedResult.result.newInserted.slice(0, 5).map((job: Job, index: number) => (
                        <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                          <p className="font-medium">{job.title}</p>
                          <p className="text-gray-600">{job.company} - {job.source}</p>
                        </div>
                      ))}
                      {selectedResult.result.newInserted.length > 5 && (
                        <p className="text-sm text-gray-500">...and {selectedResult.result.newInserted.length - 5} more</p>
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
