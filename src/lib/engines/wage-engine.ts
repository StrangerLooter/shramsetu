import { ServiceItem, WageBreakdown } from '@/types';

/**
 * Protected Wage Floor Engine
 * Guarantees that configured statutory minimum worker earnings aren't violated.
 * Transparency split:
 * Customer Total = Protected Worker Wage + Material Cost + Cooperative Fund + Platform Operations
 */
export function calculateProtectedWageBreakdown(
  service: ServiceItem,
  customMaterialsCost?: number,
  urgentMultiplier: number = 1.0
): WageBreakdown {
  const materials = customMaterialsCost !== undefined ? customMaterialsCost : service.materialEstimatedCost;
  
  // Base protected worker wage with any emergency surcharge passed directly to worker
  const protectedWage = Math.round(service.minimumWageFloor * urgentMultiplier);
  
  // Cooperative Fund contribution (default 10% of labour)
  const cooperativeFund = Math.round(protectedWage * (service.coopFundPercent / 100));
  
  // Platform operations fee (5% of labour)
  const platformOperations = Math.round(protectedWage * (service.platformFeePercent / 100));
  
  // Total transparent customer price
  const customerTotal = protectedWage + materials + cooperativeFund + platformOperations;

  // Compliance check
  const isCompliantWithWageFloor = protectedWage >= service.minimumWageFloor;

  return {
    customerTotal,
    protectedWorkerWage: protectedWage,
    materialCost: materials,
    cooperativeFund,
    platformOperations,
    isCompliantWithWageFloor,
    wageFloorConfigured: service.minimumWageFloor
  };
}
