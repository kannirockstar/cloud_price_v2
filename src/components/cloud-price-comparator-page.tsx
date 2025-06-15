
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2, Cloud, ShieldCheck, Cpu, Award, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import {
  getGeosForProvider,
  getRegionsForProvider,
  getMachineFamilyGroups,
  getMachineInstancesForFamily,
  fetchPricingData,
  loadProviderMetadata, // Ensure this is imported
  getPricingModelsForProvider, // Added import for pricing models
} from '@/lib/data';
import type { Region, MachineFamily, CloudProvider, SelectOption, PriceData, CpuDetails } from '@/lib/types';

const HOURS_IN_MONTH = 730;

export default function CloudPriceComparatorPage() {
  const { toast } = useToast();

  const [isMetadataLoading, setIsMetadataLoading] = useState(true);

  const [customCpu, setCustomCpu] = useState<string>('');
  const [customRam, setCustomRam] = useState<string>('');
  const [filterSapCertified, setFilterSapCertified] = useState(false);
  const [applyToleranceFilter, setApplyToleranceFilter] = useState(false);

  const [selectedGoogleGeo, setSelectedGoogleGeo] = useState<string>('');
  const [selectedAzureGeo, setSelectedAzureGeo] = useState<string>('');
  const [selectedAwsGeo, setSelectedAwsGeo] = useState<string>('');

  const [googleGeoOptions, setGoogleGeoOptions] = useState<SelectOption[]>([]);
  const [azureGeoOptions, setAzureGeoOptions] = useState<SelectOption[]>([]);
  const [awsGeoOptions, setAwsGeoOptions] = useState<SelectOption[]>([]);

  const [googleRegionOptions, setGoogleRegionOptions] = useState<Region[]>([]);
  const [azureRegionOptions, setAzureRegionOptions] = useState<Region[]>([]);
  const [awsRegionOptions, setAwsRegionOptions] = useState<Region[]>([]);

  const [selectedGoogleRegion, setSelectedGoogleRegion] = useState<string>('');
  const [selectedAzureRegion, setSelectedAzureRegion] = useState<string>('');
  const [selectedAwsRegion, setSelectedAwsRegion] = useState<string>('');

  const [selectedGoogleFamilyGroup, setSelectedGoogleFamilyGroup] = useState<string>('');
  const [selectedAzureFamilyGroup, setSelectedAzureFamilyGroup] = useState<string>('');
  const [selectedAwsFamilyGroup, setSelectedAwsFamilyGroup] = useState<string>('');

  const [googleCpuDetails, setGoogleCpuDetails] = useState<CpuDetails | null>(null);
  const [azureCpuDetails, setAzureCpuDetails] = useState<CpuDetails | null>(null);
  const [awsCpuDetails, setAwsCpuDetails] = useState<CpuDetails | null>(null);

  const [selectedGoogleInstance, setSelectedGoogleInstance] = useState<string>('');
  const [selectedAzureInstance, setSelectedAzureInstance] = useState<string>('');
  const [selectedAwsInstance, setSelectedAwsInstance] = useState<string>('');

  const [selectedGooglePricingModel, setSelectedGooglePricingModel] = useState<string>('on-demand');
  const [selectedAzurePricingModel, setSelectedAzurePricingModel] = useState<string>('on-demand');
  const [selectedAwsPricingModel, setSelectedAwsPricingModel] = useState<string>('on-demand');

  const [googleFamilyGroupOptions, setGoogleFamilyGroupOptions] = useState<SelectOption[]>([]);
  const [azureFamilyGroupOptions, setAzureFamilyGroupOptions] = useState<SelectOption[]>([]);
  const [awsFamilyGroupOptions, setAwsFamilyGroupOptions] = useState<SelectOption[]>([]);

  const [googleInstanceOptions, setGoogleInstanceOptions] = useState<MachineFamily[]>([]);
  const [azureInstanceOptions, setAzureInstanceOptions] = useState<MachineFamily[]>([]);
  const [awsInstanceOptions, setAwsInstanceOptions] = useState<MachineFamily[]>([]);

  const [googlePricingModelOptions, setGooglePricingModelOptions] = useState<SelectOption[]>([]);
  const [azurePricingModelOptions, setAzurePricingModelOptions] = useState<SelectOption[]>([]);
  const [awsPricingModelOptions, setAwsPricingModelOptions] = useState<SelectOption[]>([]);

  const [googleSapsRating, setGoogleSapsRating] = useState<number | null>(null);
  const [azureSapsRating, setAzureSapsRating] = useState<number | null>(null);
  const [awsSapsRating, setAwsSapsRating] = useState<number | null>(null);

  const [googlePriceData, setGooglePriceData] = useState<PriceData | null>(null);
  const [azurePriceData, setAzurePriceData] = useState<PriceData | null>(null);
  const [awsPriceData, setAwsPriceData] = useState<PriceData | null>(null);

  const [isGooglePriceLoading, setIsGooglePriceLoading] = useState(false);
  const [isAzurePriceLoading, setIsAzurePriceLoading] = useState(false);
  const [isAwsPriceLoading, setIsAwsPriceLoading] = useState(false);

  const initMetadata = useCallback(async () => {
    console.log('[CloudPriceComparatorPage] Starting initMetadata...');
    setIsMetadataLoading(true);
    try {
      console.log('[CloudPriceComparatorPage] Awaiting loadProviderMetadata()...');
      await loadProviderMetadata();
      console.log('[CloudPriceComparatorPage] loadProviderMetadata finished successfully.');

      const gcpGeos = getGeosForProvider('Google Cloud');
      console.log('[CloudPriceComparatorPage] GCP Geos from getGeosForProvider:', gcpGeos);
      setGoogleGeoOptions(gcpGeos);

      const azGeos = getGeosForProvider('Azure');
      console.log('[CloudPriceComparatorPage] Azure Geos from getGeosForProvider:', azGeos);
      setAzureGeoOptions(azGeos);

      const awsGeos = getGeosForProvider('AWS');
      console.log('[CloudPriceComparatorPage] AWS Geos from getGeosForProvider:', awsGeos);
      setAwsGeoOptions(awsGeos);
      
      setGooglePricingModelOptions(getPricingModelsForProvider('Google Cloud'));
      setAzurePricingModelOptions(getPricingModelsForProvider('Azure'));
      setAwsPricingModelOptions(getPricingModelsForProvider('AWS'));

      console.log('[CloudPriceComparatorPage] Geo and pricing model options set.');
      console.log(`[CloudPriceComparatorPage] Google Geo Options Populated: ${gcpGeos.length > 0}, Azure: ${azGeos.length > 0}, AWS: ${awsGeos.length > 0}`);


    } catch (error) {
      console.error("[CloudPriceComparatorPage] CRITICAL: Failed to initialize metadata in component:", error);
      toast({
        variant: "destructive",
        title: "Metadata Initialization Error",
        description: "Could not load essential configuration data. Dropdowns may be empty or non-functional. Please check browser console for detailed error messages from 'src/lib/data.ts' and verify Firebase setup.",
        duration: 10000,
      });
    } finally {
      console.log('[CloudPriceComparatorPage] Setting isMetadataLoading to false in finally block.');
      setIsMetadataLoading(false);
    }
  }, [toast]); // toast is a stable dependency from useToast

  useEffect(() => {
    initMetadata();
  }, [initMetadata]); // initMetadata is now stable due to useCallback


 useEffect(() => {
    if (!isMetadataLoading && googleGeoOptions.length > 0 && !selectedGoogleGeo) {
      const northAmericaOption = googleGeoOptions.find(o => o.value === 'North America');
      setSelectedGoogleGeo(northAmericaOption ? northAmericaOption.value : googleGeoOptions[0].value);
    }
  }, [googleGeoOptions, selectedGoogleGeo, isMetadataLoading]);

  useEffect(() => {
    if (!isMetadataLoading && azureGeoOptions.length > 0 && !selectedAzureGeo) {
      const northAmericaOption = azureGeoOptions.find(o => o.value === 'North America');
      setSelectedAzureGeo(northAmericaOption ? northAmericaOption.value : azureGeoOptions[0].value);
    }
  }, [azureGeoOptions, selectedAzureGeo, isMetadataLoading]);

  useEffect(() => {
    if (!isMetadataLoading && awsGeoOptions.length > 0 && !selectedAwsGeo) {
      const northAmericaOption = awsGeoOptions.find(o => o.value === 'North America');
      setSelectedAwsGeo(northAmericaOption ? northAmericaOption.value : awsGeoOptions[0].value);
    }
  }, [awsGeoOptions, selectedAwsGeo, isMetadataLoading]);


  useEffect(() => {
    setGoogleRegionOptions([]); setSelectedGoogleRegion('');
    setGoogleFamilyGroupOptions([]); setSelectedGoogleFamilyGroup('');
    setGoogleInstanceOptions([]); setSelectedGoogleInstance('');
    setGoogleCpuDetails(null); setGoogleSapsRating(null); setGooglePriceData(null);

    if (selectedGoogleGeo && !isMetadataLoading && googleGeoOptions.length > 0) {
      const regions = getRegionsForProvider('Google Cloud', selectedGoogleGeo);
      setGoogleRegionOptions(regions);
      if (regions.length > 0) {
        if (selectedGoogleGeo === 'North America') {
          const defaultRegion = regions.find(r => r.id === 'us-central1');
          setSelectedGoogleRegion(defaultRegion ? defaultRegion.id : regions[0].id);
        } else {
          setSelectedGoogleRegion(regions[0].id);
        }
      }
    }
  }, [selectedGoogleGeo, isMetadataLoading, googleGeoOptions]);

  useEffect(() => {
    setAzureRegionOptions([]); setSelectedAzureRegion('');
    setAzureFamilyGroupOptions([]); setSelectedAzureFamilyGroup('');
    setAzureInstanceOptions([]); setSelectedAzureInstance('');
    setAzureCpuDetails(null); setAzureSapsRating(null); setAzurePriceData(null);

    if (selectedAzureGeo && !isMetadataLoading && azureGeoOptions.length > 0) {
      const regions = getRegionsForProvider('Azure', selectedAzureGeo);
      setAzureRegionOptions(regions);
      if (regions.length > 0) {
         if (selectedAzureGeo === 'North America') {
          const defaultRegion = regions.find(r => r.id === 'eastus2');
          setSelectedAzureRegion(defaultRegion ? defaultRegion.id : regions[0].id);
        } else {
          setSelectedAzureRegion(regions[0].id);
        }
      }
    }
  }, [selectedAzureGeo, isMetadataLoading, azureGeoOptions]);

  useEffect(() => {
    setAwsRegionOptions([]); setSelectedAwsRegion('');
    setAwsFamilyGroupOptions([]); setSelectedAwsFamilyGroup('');
    setAwsInstanceOptions([]); setSelectedAwsInstance('');
    setAwsCpuDetails(null); setAwsSapsRating(null); setAwsPriceData(null);

    if (selectedAwsGeo && !isMetadataLoading && awsGeoOptions.length > 0) {
      const regions = getRegionsForProvider('AWS', selectedAwsGeo);
      setAwsRegionOptions(regions);
      if (regions.length > 0) {
        if (selectedAwsGeo === 'North America') {
          const defaultRegion = regions.find(r => r.id === 'us-east-1');
          setSelectedAwsRegion(defaultRegion ? defaultRegion.id : regions[0].id);
        } else {
          setSelectedAwsRegion(regions[0].id);
        }
      }
    }
  }, [selectedAwsGeo, isMetadataLoading, awsGeoOptions]);

  const parsedCustomCpu = customCpu ? parseInt(customCpu) : undefined;
  const parsedCustomRam = customRam ? parseInt(customRam) : undefined;
  const shouldUseTolerance = filterSapCertified && applyToleranceFilter;

  useEffect(() => {
    setGoogleFamilyGroupOptions([]); setSelectedGoogleFamilyGroup('');
    setGoogleInstanceOptions([]); setSelectedGoogleInstance('');
    setGoogleCpuDetails(null); setGoogleSapsRating(null); setGooglePriceData(null);
    if (selectedGoogleRegion && !isMetadataLoading) {
      const familyGroups = getMachineFamilyGroups('Google Cloud', parsedCustomCpu, parsedCustomRam, filterSapCertified, shouldUseTolerance);
      setGoogleFamilyGroupOptions(familyGroups);
      if (familyGroups.length > 0) setSelectedGoogleFamilyGroup(familyGroups[0].value); else setSelectedGoogleFamilyGroup('');
    }
  }, [selectedGoogleRegion, customCpu, customRam, filterSapCertified, applyToleranceFilter, parsedCustomCpu, parsedCustomRam, shouldUseTolerance, isMetadataLoading]);


  useEffect(() => {
    setAzureFamilyGroupOptions([]); setSelectedAzureFamilyGroup('');
    setAzureInstanceOptions([]); setSelectedAzureInstance('');
    setAzureCpuDetails(null); setAzureSapsRating(null); setAzurePriceData(null);
    if (selectedAzureRegion && !isMetadataLoading) {
       const familyGroups = getMachineFamilyGroups('Azure', parsedCustomCpu, parsedCustomRam, filterSapCertified, shouldUseTolerance);
       setAzureFamilyGroupOptions(familyGroups);
       if (familyGroups.length > 0) setSelectedAzureFamilyGroup(familyGroups[0].value); else setSelectedAzureFamilyGroup('');
    }
  }, [selectedAzureRegion, customCpu, customRam, filterSapCertified, applyToleranceFilter, parsedCustomCpu, parsedCustomRam, shouldUseTolerance, isMetadataLoading]);

  useEffect(() => {
    setAwsFamilyGroupOptions([]); setSelectedAwsFamilyGroup('');
    setAwsInstanceOptions([]); setSelectedAwsInstance('');
    setAwsCpuDetails(null); setAwsSapsRating(null); setAwsPriceData(null);
    if (selectedAwsRegion && !isMetadataLoading) {
      const familyGroups = getMachineFamilyGroups('AWS', parsedCustomCpu, parsedCustomRam, filterSapCertified, shouldUseTolerance);
      setAwsFamilyGroupOptions(familyGroups);
      if (familyGroups.length > 0) setSelectedAwsFamilyGroup(familyGroups[0].value); else setSelectedAwsFamilyGroup('');
    }
  }, [selectedAwsRegion, customCpu, customRam, filterSapCertified, applyToleranceFilter, parsedCustomCpu, parsedCustomRam, shouldUseTolerance, isMetadataLoading]);

  const updateCpuDetails = (instances: MachineFamily[], setter: React.Dispatch<React.SetStateAction<CpuDetails | null>>) => {
    if (instances.length > 0) {
      const firstInstance = instances[0];
      setter({ architecture: firstInstance.cpuArchitecture, clockSpeed: firstInstance.cpuClockSpeed });
    } else {
      setter(null);
    }
  };

  useEffect(() => {
    setGoogleInstanceOptions([]); setSelectedGoogleInstance('');
    setGoogleCpuDetails(null); setGoogleSapsRating(null); setGooglePriceData(null);
    if (selectedGoogleFamilyGroup && !isMetadataLoading) {
      const instances = getMachineInstancesForFamily('Google Cloud', selectedGoogleFamilyGroup, filterSapCertified, parsedCustomCpu, parsedCustomRam, shouldUseTolerance);
      setGoogleInstanceOptions(instances);
      updateCpuDetails(instances, setGoogleCpuDetails);
      if (instances.length > 0) setSelectedGoogleInstance(instances[0].id); else setSelectedGoogleInstance('');
    } else if (!isMetadataLoading) { 
      setGoogleInstanceOptions([]);
      setSelectedGoogleInstance('');
      setGoogleCpuDetails(null);
    }
  }, [selectedGoogleFamilyGroup, filterSapCertified, customCpu, customRam, selectedGoogleRegion, applyToleranceFilter, parsedCustomCpu, parsedCustomRam, shouldUseTolerance, isMetadataLoading]);

  useEffect(() => {
    setAzureInstanceOptions([]); setSelectedAzureInstance('');
    setAzureCpuDetails(null); setAzureSapsRating(null); setAzurePriceData(null);
    if (selectedAzureFamilyGroup && !isMetadataLoading) {
      const instances = getMachineInstancesForFamily('Azure', selectedAzureFamilyGroup, filterSapCertified, parsedCustomCpu, parsedCustomRam, shouldUseTolerance);
      setAzureInstanceOptions(instances);
      updateCpuDetails(instances, setAzureCpuDetails);
      if (instances.length > 0) setSelectedAzureInstance(instances[0].id); else setSelectedAzureInstance('');
    } else if (!isMetadataLoading) {
        setAzureInstanceOptions([]);
        setSelectedAzureInstance('');
        setAzureCpuDetails(null);
    }
  }, [selectedAzureFamilyGroup, filterSapCertified, customCpu, customRam, selectedAzureRegion, applyToleranceFilter, parsedCustomCpu, parsedCustomRam, shouldUseTolerance, isMetadataLoading]);

  useEffect(() => {
    setAwsInstanceOptions([]); setSelectedAwsInstance('');
    setAwsCpuDetails(null); setAwsSapsRating(null); setAwsPriceData(null);
    if (selectedAwsFamilyGroup && !isMetadataLoading) {
      const instances = getMachineInstancesForFamily('AWS', selectedAwsFamilyGroup, filterSapCertified, parsedCustomCpu, parsedCustomRam, shouldUseTolerance);
      setAwsInstanceOptions(instances);
      updateCpuDetails(instances, setAwsCpuDetails);
      if (instances.length > 0) setSelectedAwsInstance(instances[0].id); else setSelectedAwsInstance('');
    } else if (!isMetadataLoading) {
        setAwsInstanceOptions([]);
        setSelectedAwsInstance('');
        setAwsCpuDetails(null);
    }
  }, [selectedAwsFamilyGroup, filterSapCertified, customCpu, customRam, selectedAwsRegion, applyToleranceFilter, parsedCustomCpu, parsedCustomRam, shouldUseTolerance, isMetadataLoading]);

  useEffect(() => {
    setGooglePriceData(null); setGoogleSapsRating(null);
    if (selectedGoogleInstance && !isMetadataLoading) { 
        const instance = googleInstanceOptions.find(inst => inst.id === selectedGoogleInstance);
        if (filterSapCertified && instance) {
            setGoogleSapsRating(instance.sapsRating || null);
        } else {
            setGoogleSapsRating(null);
        }
    } else if (!isMetadataLoading) {
        setGoogleSapsRating(null);
    }
  }, [selectedGoogleInstance, googleInstanceOptions, filterSapCertified, isMetadataLoading]);

  useEffect(() => {
    setAzurePriceData(null); setAzureSapsRating(null);
    if (selectedAzureInstance && !isMetadataLoading) { 
        const instance = azureInstanceOptions.find(inst => inst.id === selectedAzureInstance);
        if (filterSapCertified && instance) {
            setAzureSapsRating(instance.sapsRating || null);
        } else {
            setAzureSapsRating(null);
        }
    } else if (!isMetadataLoading) {
        setAzureSapsRating(null);
    }
  }, [selectedAzureInstance, azureInstanceOptions, filterSapCertified, isMetadataLoading]);

  useEffect(() => {
    setAwsPriceData(null); setAwsSapsRating(null);
    if (selectedAwsInstance && !isMetadataLoading) { 
        const instance = awsInstanceOptions.find(inst => inst.id === selectedAwsInstance);
        if (filterSapCertified && instance) {
            setAwsSapsRating(instance.sapsRating || null);
        } else {
            setAwsSapsRating(null);
        }
    } else if (!isMetadataLoading) {
        setAwsSapsRating(null);
    }
  }, [selectedAwsInstance, awsInstanceOptions, filterSapCertified, isMetadataLoading]);

  useEffect(() => { setGooglePriceData(null); }, [selectedGooglePricingModel]);
  useEffect(() => { setAzurePriceData(null); }, [selectedAzurePricingModel]);
  useEffect(() => { setAwsPriceData(null); }, [selectedAwsPricingModel]);


  useEffect(() => {
    if (selectedGoogleRegion && selectedGoogleInstance && selectedGooglePricingModel && !isMetadataLoading) {
      setIsGooglePriceLoading(true);
      fetchPricingData('Google Cloud', selectedGoogleRegion, selectedGoogleInstance, selectedGooglePricingModel)
        .then(setGooglePriceData)
        .catch(error => {
          console.error("Error fetching Google Cloud price:", error);
          toast({ variant: "destructive", title: "Pricing Error", description: `Failed to fetch Google Cloud price for ${selectedGoogleInstance}. Check console.` });
          setGooglePriceData(null);
        })
        .finally(() => setIsGooglePriceLoading(false));
    } else if (!isMetadataLoading) {
      setGooglePriceData(null);
    }
  }, [selectedGoogleRegion, selectedGoogleInstance, selectedGooglePricingModel, toast, isMetadataLoading]);

  useEffect(() => {
    if (selectedAzureRegion && selectedAzureInstance && selectedAzurePricingModel && !isMetadataLoading) {
      setIsAzurePriceLoading(true);
      fetchPricingData('Azure', selectedAzureRegion, selectedAzureInstance, selectedAzurePricingModel)
        .then(setAzurePriceData)
        .catch(error => {
          console.error("Error fetching Azure price:", error);
          toast({ variant: "destructive", title: "Pricing Error", description: `Failed to fetch Azure price for ${selectedAzureInstance}. Check console.` });
          setAzurePriceData(null);
        })
        .finally(() => setIsAzurePriceLoading(false));
    } else if (!isMetadataLoading) {
      setAzurePriceData(null);
    }
  }, [selectedAzureRegion, selectedAzureInstance, selectedAzurePricingModel, toast, isMetadataLoading]);

  useEffect(() => {
    if (selectedAwsRegion && selectedAwsInstance && selectedAwsPricingModel && !isMetadataLoading) {
      setIsAwsPriceLoading(true);
      fetchPricingData('AWS', selectedAwsRegion, selectedAwsInstance, selectedAwsPricingModel)
        .then(setAwsPriceData)
        .catch(error => {
          console.error("Error fetching AWS price:", error);
          toast({ variant: "destructive", title: "Pricing Error", description: `Failed to fetch AWS price for ${selectedAwsInstance}. Check console.` });
          setAwsPriceData(null);
        })
        .finally(() => setIsAwsPriceLoading(false));
    } else if (!isMetadataLoading) {
      setAwsPriceData(null);
    }
  }, [selectedAwsRegion, selectedAwsInstance, selectedAwsPricingModel, toast, isMetadataLoading]);


  const renderCpuDetails = (details: CpuDetails | null) => {
    const cpuDetailsWrapperClass = "mt-1 h-5 flex items-center text-xs text-muted-foreground";
    if (isMetadataLoading || !details || (!details.architecture && !details.clockSpeed)) {
      return <div className={`${cpuDetailsWrapperClass} text-transparent`}><Cpu size={12} className="mr-1 opacity-0"/>&nbsp;</div>;
    }
    return (
      <div className={cpuDetailsWrapperClass}>
        <Cpu size={12} className="mr-1" />
        {details.architecture}
        {details.clockSpeed && `, ${details.clockSpeed}`}
      </div>
    );
  };

  const renderSapsRating = (rating: number | null, isSapFilterActive: boolean) => {
    const sapsRatingWrapperClass = "mt-1 h-5 flex items-center text-xs text-muted-foreground";
    if (isMetadataLoading || !isSapFilterActive || rating === null || rating === undefined) {
      return <div className={`${sapsRatingWrapperClass} text-transparent`}>&nbsp;</div>;
    }
    return (
      <div className={sapsRatingWrapperClass}>
        <Award size={12} className="mr-1 text-green-600" />
        {`${rating.toLocaleString()} SAPS`}
      </div>
    );
  };

  const renderPriceDisplay = (
    providerName: CloudProvider,
    priceData: PriceData | null,
    isLoading: boolean,
    googleBasePriceData: PriceData | null
  ) => {
    const priceDisplayWrapperClass = "mt-2 pt-2 border-t border-dashed";
    if (isLoading || isMetadataLoading) {
      return <div className={`${priceDisplayWrapperClass} flex items-center`}><Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading price...</div>;
    }
    if (!priceData || priceData.price === null) {
      return <div className={`${priceDisplayWrapperClass} text-sm text-muted-foreground`}>Price not available</div>;
    }

    const monthlyPrice = priceData.price * HOURS_IN_MONTH;
    let differenceText = '';
    let differencePercentageText = '';
    let textColorClass = 'text-foreground';

    if (providerName !== 'Google Cloud' && googleBasePriceData?.price !== null && googleBasePriceData?.price !== undefined && priceData.price !== null) {
      const googleMonthlyPrice = googleBasePriceData.price * HOURS_IN_MONTH;
      const difference = monthlyPrice - googleMonthlyPrice;

      if (googleMonthlyPrice !== 0) {
          const percentageDifference = (difference / googleMonthlyPrice) * 100;
          if (difference < 0) {
            differenceText = `-$${Math.abs(difference).toFixed(2)}`;
            differencePercentageText = `(${Math.abs(percentageDifference).toFixed(1)}% cheaper)`;
            textColorClass = 'text-green-600 font-semibold';
          } else if (difference > 0) {
            differenceText = `+$${difference.toFixed(2)}`;
            differencePercentageText = `(${percentageDifference.toFixed(1)}% more expensive)`;
            textColorClass = 'text-red-600 font-semibold';
          } else {
            differenceText = '$0.00';
            differencePercentageText = '(Same price)';
          }
      }
    }

    return (
      <div className={priceDisplayWrapperClass}>
        <p className="text-lg font-bold text-primary">
          ${monthlyPrice.toFixed(2)}
          <span className="text-xs text-muted-foreground"> /month (calculated)</span>
        </p>
        {providerName !== 'Google Cloud' && differenceText && (
          <p className={`text-sm ${textColorClass}`}>
            Difference: {differenceText} {differencePercentageText}
          </p>
        )}
         <p className="text-xs text-muted-foreground">
          (Hourly: ${priceData.price.toFixed(6)}, Model: {priceData.pricingModelLabel})
        </p>
      </div>
    );
  };


  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary">CloudPrice Comparator</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Select configurations for Google Cloud, Azure, and AWS to compare prices dynamically.
        </p>
        <p className="text-sm text-muted-foreground font-code">*Pricing data (Google Cloud, Azure, AWS) in this interactive tool is calculated based on public information and typical configurations.</p>
      </header>

      {isMetadataLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin mr-3 text-primary" />
          <p className="text-muted-foreground">Loading configuration options...</p>
        </div>
      )}

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Configuration Filters</CardTitle>
          <CardDescription>
            Apply global filters for SAP certification, CPU, and RAM. These filters apply across all providers. Selections below will update dynamically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-2 mb-4 pl-1">
            <Checkbox
              id="sap-filter"
              checked={filterSapCertified}
              onCheckedChange={(checked) => {
                setFilterSapCertified(checked as boolean);
                if (!(checked as boolean)) {
                  setApplyToleranceFilter(false); 
                }
              }}
              disabled={isMetadataLoading}
            />
            <Label htmlFor="sap-filter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4 text-green-600" /> Show only SAP Certified Instances
            </Label>
          </div>
          {filterSapCertified && (
            <div className="flex items-center space-x-2 mb-4 pl-1 ml-6">
               <Checkbox
                id="tolerance-filter"
                checked={applyToleranceFilter}
                onCheckedChange={(checked) => setApplyToleranceFilter(checked as boolean)}
                disabled={isMetadataLoading}
              />
              <Label htmlFor="tolerance-filter" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Apply +/- 15% Tolerance to CPU/RAM (for SAP Certified)
              </Label>
            </div>
          )}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mb-6 p-1">
            <div>
                <Label htmlFor="common-custom-cpu" className="block text-sm font-medium text-foreground mb-1">
                  Min vCPUs (Optional{shouldUseTolerance ? ", +/- 15%" : ""})
                </Label>
                <Input id="common-custom-cpu" type="number" placeholder="e.g. 4" value={customCpu} onChange={e => setCustomCpu(e.target.value)} className="h-10 text-sm" disabled={isMetadataLoading} />
            </div>
            <div>
                <Label htmlFor="common-custom-ram" className="block text-sm font-medium text-foreground mb-1">
                  Min RAM (GB) (Optional{shouldUseTolerance ? ", +/- 15%" : ""})
                </Label>
                <Input id="common-custom-ram" type="number" placeholder="e.g. 16" value={customRam} onChange={e => setCustomRam(e.target.value)} className="h-10 text-sm" disabled={isMetadataLoading} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="space-y-4 p-4 border rounded-md shadow-sm bg-card">
              <h3 className="text-lg font-medium text-primary flex items-center"><Cloud className="mr-2 h-5 w-5 text-blue-500" />Google Cloud</h3>
              <div>
                <Label htmlFor="gcp-geo-select" className="block text-sm font-medium text-foreground mb-1">Geography</Label>
                <Select value={selectedGoogleGeo} onValueChange={setSelectedGoogleGeo} disabled={isMetadataLoading || googleGeoOptions.length === 0}>
                  <SelectTrigger id="gcp-geo-select"><SelectValue placeholder={isMetadataLoading? "Loading..." : "Select Geography"} /></SelectTrigger>
                  <SelectContent>{googleGeoOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gcp-region-select" className="block text-sm font-medium text-foreground mb-1">Region</Label>
                <Select value={selectedGoogleRegion} onValueChange={setSelectedGoogleRegion} disabled={isMetadataLoading || googleRegionOptions.length === 0}>
                  <SelectTrigger id="gcp-region-select"><SelectValue placeholder={isMetadataLoading? "Loading..." : "Select Region"} /></SelectTrigger>
                  <SelectContent>{googleRegionOptions.map(o => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gcp-family-group-select" className="block text-sm font-medium text-foreground mb-1">Machine Family Group</Label>
                <Select value={selectedGoogleFamilyGroup} onValueChange={setSelectedGoogleFamilyGroup} disabled={isMetadataLoading || googleFamilyGroupOptions.length === 0}>
                  <SelectTrigger id="gcp-family-group-select"><SelectValue placeholder={isMetadataLoading? "Loading..." : "Select Family Group"} /></SelectTrigger>
                  <SelectContent>{googleFamilyGroupOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
                {renderCpuDetails(googleCpuDetails)}
              </div>
              <div>
                <Label htmlFor="gcp-instance-select" className="block text-sm font-medium text-foreground mb-1">Instance</Label>
                <Select value={selectedGoogleInstance} onValueChange={setSelectedGoogleInstance} disabled={isMetadataLoading || googleInstanceOptions.length === 0}>
                  <SelectTrigger id="gcp-instance-select"><SelectValue placeholder={isMetadataLoading? "Loading..." : "Select Instance"} /></SelectTrigger>
                  <SelectContent>
                    {googleInstanceOptions.length > 0 ?
                      googleInstanceOptions.map(o => <SelectItem key={o.id} value={o.id}>{o.instanceName}</SelectItem>) :
                      <SelectItem value="no-options" disabled>No instances match filters</SelectItem>
                    }
                  </SelectContent>
                </Select>
                {renderSapsRating(googleSapsRating, filterSapCertified)}
              </div>
              <div>
                <Label htmlFor="gcp-pricing-model-select" className="block text-sm font-medium text-foreground mb-1">Pricing Model</Label>
                <Select value={selectedGooglePricingModel} onValueChange={setSelectedGooglePricingModel} disabled={isMetadataLoading || googlePricingModelOptions.length === 0}>
                  <SelectTrigger id="gcp-pricing-model-select"><SelectValue placeholder="Select Pricing Model" /></SelectTrigger>
                  <SelectContent>{googlePricingModelOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
                {renderPriceDisplay("Google Cloud", googlePriceData, isGooglePriceLoading, null)}
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded-md shadow-sm bg-card">
              <h3 className="text-lg font-medium text-primary flex items-center"><Cloud className="mr-2 h-5 w-5 text-sky-600" />Azure</h3>
              <div>
                <Label htmlFor="azure-geo-select" className="block text-sm font-medium text-foreground mb-1">Geography</Label>
                <Select value={selectedAzureGeo} onValueChange={setSelectedAzureGeo} disabled={isMetadataLoading || azureGeoOptions.length === 0}>
                  <SelectTrigger id="azure-geo-select"><SelectValue placeholder={isMetadataLoading? "Loading..." : "Select Geography"} /></SelectTrigger>
                  <SelectContent>{azureGeoOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="azure-region-select" className="block text-sm font-medium text-foreground mb-1">Region</Label>
                <Select value={selectedAzureRegion} onValueChange={setSelectedAzureRegion} disabled={isMetadataLoading || azureRegionOptions.length === 0}>
                  <SelectTrigger id="azure-region-select"><SelectValue placeholder={isMetadataLoading? "Loading..." : "Select Region"} /></SelectTrigger>
                  <SelectContent>{azureRegionOptions.map(o => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="azure-family-group-select" className="block text-sm font-medium text-foreground mb-1">Machine Family Group</Label>
                <Select value={selectedAzureFamilyGroup} onValueChange={setSelectedAzureFamilyGroup} disabled={isMetadataLoading || azureFamilyGroupOptions.length === 0}>
                  <SelectTrigger id="azure-family-group-select"><SelectValue placeholder={isMetadataLoading? "Loading..." : "Select Family Group"} /></SelectTrigger>
                  <SelectContent>{azureFamilyGroupOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
                {renderCpuDetails(azureCpuDetails)}
              </div>
              <div>
                <Label htmlFor="azure-instance-select" className="block text-sm font-medium text-foreground mb-1">Instance</Label>
                <Select value={selectedAzureInstance} onValueChange={setSelectedAzureInstance} disabled={isMetadataLoading || azureInstanceOptions.length === 0}>
                  <SelectTrigger id="azure-instance-select"><SelectValue placeholder={isMetadataLoading? "Loading..." : "Select Instance"} /></SelectTrigger>
                  <SelectContent>
                    {azureInstanceOptions.length > 0 ?
                      azureInstanceOptions.map(o => <SelectItem key={o.id} value={o.id}>{o.instanceName}</SelectItem>) :
                       <SelectItem value="no-options" disabled>No instances match filters</SelectItem>
                    }
                  </SelectContent>
                </Select>
                {renderSapsRating(azureSapsRating, filterSapCertified)}
              </div>
               <div>
                <Label htmlFor="azure-pricing-model-select" className="block text-sm font-medium text-foreground mb-1">Pricing Model</Label>
                <Select value={selectedAzurePricingModel} onValueChange={setSelectedAzurePricingModel} disabled={isMetadataLoading || azurePricingModelOptions.length === 0}>
                  <SelectTrigger id="azure-pricing-model-select"><SelectValue placeholder="Select Pricing Model" /></SelectTrigger>
                  <SelectContent>{azurePricingModelOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
                {renderPriceDisplay("Azure", azurePriceData, isAzurePriceLoading, googlePriceData)}
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded-md shadow-sm bg-card">
              <h3 className="text-lg font-medium text-primary flex items-center"><Cloud className="mr-2 h-5 w-5 text-orange-500" />AWS</h3>
              <div>
                <Label htmlFor="aws-geo-select" className="block text-sm font-medium text-foreground mb-1">Geography</Label>
                <Select value={selectedAwsGeo} onValueChange={setSelectedAwsGeo} disabled={isMetadataLoading || awsGeoOptions.length === 0}>
                  <SelectTrigger id="aws-geo-select"><SelectValue placeholder={isMetadataLoading? "Loading..." : "Select Geography"} /></SelectTrigger>
                  <SelectContent>{awsGeoOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="aws-region-select" className="block text-sm font-medium text-foreground mb-1">Region</Label>
                <Select value={selectedAwsRegion} onValueChange={setSelectedAwsRegion} disabled={isMetadataLoading || awsRegionOptions.length === 0}>
                  <SelectTrigger id="aws-region-select"><SelectValue placeholder={isMetadataLoading? "Loading..." : "Select Region"} /></SelectTrigger>
                  <SelectContent>{awsRegionOptions.map(o => <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="aws-family-group-select" className="block text-sm font-medium text-foreground mb-1">Machine Family Group</Label>
                <Select value={selectedAwsFamilyGroup} onValueChange={setSelectedAwsFamilyGroup} disabled={isMetadataLoading || awsFamilyGroupOptions.length === 0}>
                  <SelectTrigger id="aws-family-group-select"><SelectValue placeholder={isMetadataLoading? "Loading..." : "Select Family Group"} /></SelectTrigger>
                  <SelectContent>{awsFamilyGroupOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
                {renderCpuDetails(awsCpuDetails)}
              </div>
              <div>
                <Label htmlFor="aws-instance-select" className="block text-sm font-medium text-foreground mb-1">Instance</Label>
                <Select value={selectedAwsInstance} onValueChange={setSelectedAwsInstance} disabled={isMetadataLoading || awsInstanceOptions.length === 0}>
                  <SelectTrigger id="aws-instance-select"><SelectValue placeholder={isMetadataLoading? "Loading..." : "Select Instance"} /></SelectTrigger>
                  <SelectContent>
                    {awsInstanceOptions.length > 0 ?
                      awsInstanceOptions.map(o => <SelectItem key={o.id} value={o.id}>{o.instanceName}</SelectItem>) :
                       <SelectItem value="no-options" disabled>No instances match filters</SelectItem>
                    }
                  </SelectContent>
                </Select>
                {renderSapsRating(awsSapsRating, filterSapCertified)}
              </div>
              <div>
                <Label htmlFor="aws-pricing-model-select" className="block text-sm font-medium text-foreground mb-1">Pricing Model</Label>
                <Select value={selectedAwsPricingModel} onValueChange={setSelectedAwsPricingModel} disabled={isMetadataLoading || awsPricingModelOptions.length === 0}>
                  <SelectTrigger id="aws-pricing-model-select"><SelectValue placeholder="Select Pricing Model" /></SelectTrigger>
                  <SelectContent>{awsPricingModelOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                </Select>
                {renderPriceDisplay("AWS", awsPriceData, isAwsPriceLoading, googlePriceData)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

       <div className="flex items-center text-xs text-muted-foreground p-2 border-t border-border mt-4">
        <Info size={16} className="mr-2 shrink-0"/>
        <span>
          All prices are calculated based on public information and typical configurations (hourly rate * {HOURS_IN_MONTH} hours). Percentage differences are calculated relative to the Google Cloud monthly price for the selected configurations.
          This tool is for estimation and demonstration purposes and should not be used for actual financial decisions.
        </span>
      </div>

      <footer className="text-center mt-12 py-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          CloudPrice Comparator &copy; {new Date().getFullYear()}. All pricing data is calculated for illustrative purposes.
        </p>
      </footer>
    </div>
  );
}
