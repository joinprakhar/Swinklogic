'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Zap, Code, Filter, Play } from 'lucide-react';
import ManualConfiguration from '@/components/ManualConfiguration';
import JsonConfiguration from '@/components/JsonConfiguration';
import AiAssistantSheet from '@/components/AiAssistantSheet';

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
    map: string;
  }>;
  urlConfig?: {
    directUrlFields?: string[];
    slugBase?: string;
    slugPattern?: string;
    slugifyFn?: string;
  };
}

interface JobResult {
  title?: string;
  company?: string;
  location?: string;
  experience?: string;
  description?: string;
  tags?: string[];
  posted?: string;
  source?: string;
  url?: string;
}

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

function ScrapeConfigurationPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const configId = searchParams.get('id');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [validating, setValidating] = useState(false);
  const [inputMode, setInputMode] = useState<'manual' | 'json'>('manual');
  const [validationResults, setValidationResults] = useState<JobResult[]>([]);
  const [statusMessages, setStatusMessages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    url: '',
    source: '',
    isApi: false,
    isRegular: false,
    wrapperSelector: '',
    selectors: {
      title: '',
      company: '',
      location: '',
      experience: '',
      description: '',
      tags: '',
      posted: '',
      link: '',
    },
    keys: [{ field: '', path: '', map: '' }],
    urlConfig: {
      directUrlFields: '',
      slugBase: '',
      slugPattern: '',
      slugifyFn: '',
    },
  });
  const [jsonConfig, setJsonConfig] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);

  useEffect(() => {
    if (configId) {
      loadConfig();
    } else {
      setLoading(false);
    }
  }, [configId]);

  const loadConfig = async () => {
    try {
      const response = await fetch(`/api/scrape-configs/${configId}`);
      const result = await response.json();
      if (result.success) {
        const config = result.data;
        setFormData({
          url: config.url,
          source: config.source,
          isApi: config.isApi,
          isRegular: config.isRegular,
          wrapperSelector: config.wrapperSelector || '',
          selectors: config.selectors || {
            title: '',
            company: '',
            location: '',
            experience: '',
            description: '',
            tags: '',
            posted: '',
            link: '',
          },
          keys: config.keys || [{ field: '', path: '', map: '' }],
          urlConfig: {
            directUrlFields: config.urlConfig?.directUrlFields?.join(', ') || '',
            slugBase: config.urlConfig?.slugBase || '',
            slugPattern: config.urlConfig?.slugPattern || '',
            slugifyFn: config.urlConfig?.slugifyFn || '',
          },
        });
      }
    } catch (error) {
      console.error('Error loading config:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTemplate = (templateName: string) => {
    let templateConfig: Partial<ScrapeConfig>;

    switch (templateName) {
      case 'foundit':
        templateConfig = {
          url: "https://www.foundit.in/home/api/searchResultsPage?start=0&limit=20&query=react&jobCities=gurgaon+%2F+gurugram&jobCities=delhi&jobCities=noida&jobCities=delhi+ncr&jobCities=gurugram&experienceRanges=2%7E2&queryDerived=true&jobFreshness=3&countries=India&limit=20&variantName=embeddings512",
          source: "foundit",
          keys: [
            { field: "title", path: "title", map: "" },
            { field: "company", path: "company.name", map: "" },
            { field: "location", path: "locations[0].city", map: "" },
            { field: "experience", path: "minimumExperience.years", map: "" },
            { field: "description", path: "description", map: "" },
            { field: "tags", path: "itSkills", map: "text" },
            { field: "posted", path: "postedAt", map: "" },
            { field: "redirectUrl", path: "redirectUrl", map: "" },
            { field: "link", path: "applyUrl", map: "" },
            { field: "jobId", path: "jobId", map: "" }
          ],
          urlConfig: {
            directUrlFields: ["redirectUrl", "applyUrl"],
            slugBase: "https://www.foundit.in/job",
            slugPattern: "${title}-${location}-${jobId}",
            slugifyFn: "(text) => (text || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')"
          },
          isApi: true,
          isRegular: false
        };
        break;

      case 'naukri':
        templateConfig = {
          url: "https://www.naukri.com/react-dot-js-react-developer-react-js-developer-react-js-software-engineer-react-js-frontend-developer-jobs-in-delhi-ncr?k=react.js%2C%20react%20developer%2C%20react%20js%20developer%2C%20react%20js%20software%20engineer%2C%20react%20js%20frontend%20developer&l=delhi%20%2F%20ncr%2C%20delhi%2C%20new%20delhi%2C%20noida%2C%20greater%20noida%2C%20gurgaon&experience=2&jobAge=1",
          wrapperSelector: ".srp-jobtuple-wrapper",
          isApi: false,
          source: "Naukri.com",
          selectors: {
            title: "a.title",
            company: "a.comp-name",
            location: ".locWdth",
            experience: ".expwdth",
            description: ".job-desc",
            tags: ".tags-gt li",
            posted: ".job-post-day",
            link: "a.title"
          },
          isRegular: false
        };
        break;

      default:
        return;
    }

    if (inputMode === 'json') {
      setJsonConfig(JSON.stringify(templateConfig, null, 2));
    } else {
      setFormData({
        url: templateConfig.url || '',
        source: templateConfig.source || '',
        isApi: templateConfig.isApi || false,
        isRegular: templateConfig.isRegular || false,
        wrapperSelector: templateConfig.wrapperSelector || '',
        selectors: {
          title: templateConfig.selectors?.title || '',
          company: templateConfig.selectors?.company || '',
          location: templateConfig.selectors?.location || '',
          experience: templateConfig.selectors?.experience || '',
          description: templateConfig.selectors?.description || '',
          tags: templateConfig.selectors?.tags || '',
          posted: templateConfig.selectors?.posted || '',
          link: templateConfig.selectors?.link || '',
        },
        keys: templateConfig.keys || [{ field: '', path: '', map: '' }],
        urlConfig: {
          directUrlFields: templateConfig.urlConfig?.directUrlFields?.join(', ') || '',
          slugBase: templateConfig.urlConfig?.slugBase || '',
          slugPattern: templateConfig.urlConfig?.slugPattern || '',
          slugifyFn: templateConfig.urlConfig?.slugifyFn || '',
        },
      });
    }
  };



  const handleValidate = async () => {
    setValidating(true);
    setValidationResults([]);
    setStatusMessages([]);

    let configData;
    try {
      if (inputMode === 'json') {
        configData = JSON.parse(jsonConfig);
      } else {
        configData = {
          ...formData,
          urlConfig: {
            ...formData.urlConfig,
            directUrlFields: formData.urlConfig.directUrlFields.split(',').map(s => s.trim()).filter(Boolean),
          },
        };
      }

      const response = await fetch('/api/scrape/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: configData }),
      });

      const result = await response.json();
      if (result.success) {
        setValidationResults(result.allResults || []);
        setStatusMessages(result.resultStatus || []);
      } else {
        console.error('Validation failed:', result.message);
      }
    } catch (error) {
      console.error('Validation error:', error);
    } finally {
      setValidating(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);

    try {
      let data;
      if (inputMode === 'json') {
        data = JSON.parse(jsonConfig);
      } else {
        data = {
          ...formData,
          urlConfig: {
            ...formData.urlConfig,
            directUrlFields: formData.urlConfig.directUrlFields.split(',').map(s => s.trim()).filter(Boolean),
          },
        };
      }

      const url = configId ? `/api/scrape-configs/${configId}` : '/api/scrape-configs';
      const method = configId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/dashboard/management/scrape');
      }
    } catch (error) {
      console.error('Error saving config:', error);
    } finally {
      setSaving(false);
    }
  };



  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const handleJsonGenerated = (json: string) => {
    setJsonConfig(json);
    setInputMode('json');
  };

  return (
    <div className="container mx-auto p-0 space-y-6">
      <Card className="px-3 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Configuration Editor
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Create and manage scraping configurations
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Templates
            </CardTitle>
            <div className="space-x-5 flex h-[30px] items-center justify-center">
              <Button
                onClick={() => loadTemplate("foundit")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 h-auto"
              >
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6" />
                  <div className="text-left">
                    <h3 className="font-semibold">Foundit.in API</h3>
                  </div>
                </div>
              </Button>
              <Button
                onClick={() => loadTemplate("naukri")}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 h-auto"
              >
                <div className="flex items-center space-x-3">
                  <Code className="w-6 h-6" />
                  <div className="text-left">
                    <h3 className="font-semibold">Naukri.com Web</h3>
                  </div>
                </div>
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/management/scrape")}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to List
            </Button>
          </div>
        </div>
      </Card>

      {/* Status Messages */}
      {statusMessages.length > 0 && (
        <Card className="flex flex-row justify-between w-full py-2 items-center">
          <CardTitle className="w-[200px] ml-3">Status Messages</CardTitle>
          <CardContent>
            <div className="space-y-2">
              {statusMessages.map((message, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm text-green-600"
                >
                  <span>✓</span>
                  <span>{message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configuration Form */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Configuration Details
            </CardTitle>
          </CardHeader>
          <div className="flex gap-5 justify-end px-5 items-center">
            <div className="flex items-center space-x-6 px-4 py-2 rounded-lg bg-background">
              <label className="inline-flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="inputMode"
                  value="manual"
                  checked={inputMode === "manual"}
                  onChange={() => setInputMode("manual")}
                  className="form-radio text-blue-600 dark:text-blue-400 h-5 w-5"
                />
                <span className="font-medium">Manual Configuration</span>
              </label>
              <label className="inline-flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="inputMode"
                  value="json"
                  checked={inputMode === "json"}
                  onChange={() => setInputMode("json")}
                  className="form-radio text-blue-600 dark:text-blue-400 h-5 w-5"
                />
                <span className="font-medium">Paste JSON</span>
              </label>
            </div>
          </div>
        </div>
        {/* Input Mode Toggle */}
        <CardContent className="space-y-6">
          {inputMode === "manual" ? (
            <ManualConfiguration
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              handleValidate={handleValidate}
              validating={validating}
              saving={saving}
              configId={configId}
              router={router}
            />
          ) : (
            <>
              <JsonConfiguration
                jsonConfig={jsonConfig}
                setJsonConfig={setJsonConfig}
                handleSubmit={handleSubmit}
                handleValidate={handleValidate}
                validating={validating}
                saving={saving}
                configId={configId}
                router={router}
              />
   
            </>
          )}
        </CardContent>
      </Card>
           <AiAssistantSheet
                conversation={conversation}
                setConversation={setConversation}
                onJsonGenerated={handleJsonGenerated}
                preDefinedInput={text}
              />
      {/* Validation Results */}
      {validationResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Validation Results
              <Badge variant="secondary">
                {validationResults.length} jobs found
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Title</th>
                    <th className="text-left p-4 font-medium">Company</th>
                    <th className="text-left p-4 font-medium">Location</th>
                    <th className="text-left p-4 font-medium">Experience</th>
                    <th className="text-left p-4 font-medium">Posted</th>
                    <th className="text-left p-4 font-medium">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {validationResults.map((job, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="font-medium text-foreground">
                          {job.title || "N/A"}
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {job.company || "N/A"}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {job.location || "N/A"}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {job.experience || "N/A"}
                      </td>
                      <td className="p-4 text-muted-foreground text-sm">
                        {job.posted
                          ? new Date(job.posted).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="capitalize">
                          {job.source || "N/A"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function ScrapeConfigurationPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
      <ScrapeConfigurationPageContent />
    </Suspense>
  );
}


let text = "You are an AI that analyzes job listing web pages and outputs a JSON configuration for web scraping.\n\nFollow these strict rules:\n\n1. Always return only valid JSON — no markdown, no code blocks, no explanations.\n2. The JSON must exactly follow this structure (include every key even if guessed):\n\n{\n  \"url\": \"<the provided URL>\",\n  \"wrapperSelector\": \"<CSS selector for each job listing wrapper>\",\n  \"isApi\": false,\n  \"source\": \"<domain name, e.g., Naukri.com>\",\n  \"selectors\": {\n    \"title\": \"<CSS selector for job title>\",\n    \"company\": \"<CSS selector for company name>\",\n    \"location\": \"<CSS selector for job location>\",\n    \"experience\": \"<CSS selector for experience>\",\n    \"description\": \"<CSS selector for job description>\",\n    \"tags\": \"<CSS selector for job tags>\",\n    \"posted\": \"<CSS selector for posted date>\",\n    \"link\": \"<CSS selector for job link>\"\n  },\n  \"isRegular\": false\n}\n\n3. Do not wrap the output in code fences (```) or quotes.\n4. All selector values must be simple strings, not nested objects.\n5. Do not invent new keys or change their order.\n6. Keep the source key properly capitalized (e.g., \"Naukri.com\").\n\nURL to analyze:\nhttps://www.naukri.com/react-dot-js-react-developer-react-js-developer-react-js-software-engineer-react-js-frontend-developer-jobs-in-delhi-ncr?k=react.js%2C%20react%20developer%2C%20react%20js%20developer%2C%20react%20js%20software%20engineer%2C%20react%20js%20frontend%20developer&l=delhi%20%2F%20ncr%2C%20delhi%2C%20new%20delhi%2C%20noida%2C%20greater%20noida%2C%20gurgaon&experience=2&jobAge=1"
