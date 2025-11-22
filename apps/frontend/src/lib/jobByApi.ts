import axios from 'axios';
import { IScraperConfig } from './models/scrapeConfig';
import { IJobPost } from './models/JobPost';

interface IKey {
  field: string;
  path: string;
  map?: string;
}

function getValueByPath(obj: Record<string, unknown>, path: string): unknown {
  const pathArray = path
    .replace(/\[(\d+)\]/g, ".$1") // convert [0] → .0
    .split(".");

  return pathArray.reduce((acc: unknown, key: string) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return null;
  }, obj);
}

function createJobUrl(job: Record<string, unknown>, config: IScraperConfig['urlConfig']) {
  const {
    directUrlFields = ["redirectUrl", "applyUrl"], // fields to check if direct url exists
    slugBase = "https://www.foundit.in/job", // fallback base
    slugPattern = "${title}-${city}-${jobId}", // pattern template
    slugifyFn = (text: string) =>
      (text || "")
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""), // default slugify
  } = config;

  // 1. check if a direct URL exists
  for (const field of directUrlFields) {
    if (job[field] && job[field] !== "") {
      return job[field];
    }
  }

  // 2. generate slug URL if no direct URL found
  const slug = slugPattern.replace(/\${(.*?)}/g, (_: string, key: string) => {
    const rawValue = String(job[key] || "");
    const value = typeof slugifyFn === 'function' ? slugifyFn(rawValue) : rawValue;
    return String(value);
  });
  return `${slugBase}/${slug}`;
}

async function getDataFromApi(configs: IScraperConfig) {
  try {
    const response = await axios.get(configs.url);
    const responseData = response.data.data;
    if (typeof configs.urlConfig.slugifyFn === "string") {
      (configs.urlConfig as any).slugifyFn = new Function('return ' + configs.urlConfig.slugifyFn)();
    }
    const extracted = responseData.map((element: Record<string, unknown>) => {
      const extractedData: Partial<IJobPost> = {};

      configs.keys.forEach(({ field, path, map }: IKey) => {
        let value = getValueByPath(element, path);

        if (Array.isArray(value) && map) {
          value = value.map((item: unknown) =>
            typeof item === "object" && item !== null && map in item ? (item as Record<string, unknown>)[map] : item
          );
        }

        extractedData[field as keyof IJobPost] = value as IJobPost[keyof IJobPost];
      });

      extractedData.source = configs.source;
      extractedData.link = createJobUrl(extractedData, configs.urlConfig) as string || "link";

      return extractedData;
    });
    return extracted;
  } catch (error) {
    console.error("Error fetching or processing data:", (error as Error).message);
  }
}

export {
  getValueByPath,
  createJobUrl,
  getDataFromApi,
};
