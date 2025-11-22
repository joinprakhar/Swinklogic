'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DatePicker } from '@/components/ui/datepicker';
import { Label } from '@/components/ui/label';
import { ExternalLink, Filter, Search } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  source: string;
  posted: string;
  link?: string;
  skills?: string[];
  description?: string;
  scrapedAt: string;
}

interface JobsResponse {
  jobs: Job[];
  total: number;
  sources: string[];
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [sources, setSources] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    source: '',
    scrapedFrom: undefined as Date | undefined,
    scrapedTo: undefined as Date | undefined,
    skills: '',
    search: ''
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.source) queryParams.append('source', filters.source);
      if (filters.scrapedFrom) queryParams.append('scrapedFrom', filters.scrapedFrom.toISOString().split('T')[0]);
      if (filters.scrapedTo) queryParams.append('scrapedTo', filters.scrapedTo.toISOString().split('T')[0]);
      if (filters.skills) queryParams.append('skills', filters.skills);
      if (filters.search) queryParams.append('search', filters.search);

      const response = await fetch(`/api/scrape/jobs?${queryParams}`);
      const data: JobsResponse = await response.json();

      setJobs(data.jobs);
      setSources(data.sources);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleFilterChange = (key: string, value: string | Date | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      source: '',
      scrapedFrom: undefined,
      scrapedTo: undefined,
      skills: '',
      search: ''
    });
  };

  return (
    <div className="container mx-auto p-0 space-y-6">
      <Card className='px-3 py-3'>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Job Listings</h1>
          <Badge variant="secondary" className="text-sm">
            {jobs.length} jobs found
          </Badge>
        </div>
      </Card>
      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Jobs</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by title, company..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Source Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Source</label>
              <Select
                value={filters.source || "all"}
                onValueChange={(value) =>
                  handleFilterChange("source", value === "all" ? "" : value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {sources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source.charAt(0).toUpperCase() + source.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date From */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Scraped From</Label>
              <DatePicker
                date={filters.scrapedFrom}
                onDateChange={(date) => handleFilterChange("scrapedFrom", date)}
                placeholder="Select start date"
              />
            </div>

            {/* Date To */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Scraped To</Label>
              <DatePicker
                date={filters.scrapedTo}
                onDateChange={(date) => handleFilterChange("scrapedTo", date)}
                placeholder="Select end date"
              />
            </div>
          </div>

          {/* Skills Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Skills</label>
            <Input
              placeholder="Enter skills (comma separated)..."
              value={filters.skills}
              onChange={(e) => handleFilterChange("skills", e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
            <Button onClick={fetchJobs}>Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading jobs...</p>
              </div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No job listings found.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Try adjusting your filters or check back later for new job
                postings.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Title</th>
                    <th className="text-left p-4 font-medium">Company</th>
                    <th className="text-left p-4 font-medium">Location</th>
                    <th className="text-left p-4 font-medium">Experience</th>
                    <th className="text-left p-4 font-medium">Source</th>
                    <th className="text-left p-4 font-medium">Posted</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job._id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div className="font-medium text-foreground">
                          {job.title}
                        </div>
                        {job.skills && job.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {job.skills.slice(0, 3).map((skill, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{job.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {job.company}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {job.location}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {job.experience}
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="capitalize">
                          {job.source}
                        </Badge>
                      </td>
                      <td className="p-4 text-muted-foreground text-sm">
                        {new Date(job.posted).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        {job.link && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="flex items-center gap-2"
                          >
                            <a
                              href={job.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                              View Job
                            </a>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
