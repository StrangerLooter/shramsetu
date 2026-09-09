export type UserRole = 'customer' | 'worker' | 'cooperative' | 'community' | 'admin';

export type JobStatus = 
  | 'REQUESTED'
  | 'MATCHING'
  | 'ASSIGNED'
  | 'ACCEPTED'
  | 'WORKER_ON_THE_WAY'
  | 'ARRIVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CUSTOMER_CONFIRMED'
  | 'PAYMENT_SETTLED'
  | 'CANCELLED'
  | 'DISPUTED';

export type ServiceCategory = 
  | 'plumbing'
  | 'electrical'
  | 'cleaning'
  | 'carpentry'
  | 'painting'
  | 'appliances'
  | 'gardening'
  | 'masonry'
  | 'society_maintenance';

export interface ServiceItem {
  id: string;
  name: string;
  nameHi: string;
  category: ServiceCategory;
  description: string;
  descriptionHi: string;
  basePrice: number;
  minimumWageFloor: number;
  materialEstimatedCost: number;
  coopFundPercent: number; // typically 10%
  platformFeePercent: number; // typically 5%
  estimatedDuration: string;
  popular?: boolean;
  icon: string;
  completedJobsCount: number;
}

export interface WorkerProfile {
  id: string;
  userId: string;
  name: string;
  nameHi: string;
  phone: string;
  avatar: string;
  cooperativeId: string;
  cooperativeName: string;
  skills: ServiceCategory[];
  experienceYears: number;
  rating: number;
  ratingsCount: number;
  completedJobsToday: number;
  completedJobsTotal: number;
  todayEarnings: number;
  monthlyEarnings: number;
  workloadScore: number; // 0 (free) to 100 (overloaded)
  isAvailable: boolean;
  distanceKm?: number;
  verificationStatus: 'VERIFIED' | 'UNDER_REVIEW' | 'NOT_VERIFIED';
  wageComplianceRate: number; // e.g. 100%
  certifications: string[];
  welfareStatus: {
    healthCover: 'ACTIVE' | 'PENDING' | 'EXPIRED';
    accidentCover: 'ACTIVE' | 'PENDING' | 'EXPIRED';
    skillTrainingCoursesAvailable: number;
    emergencyFundEligible: boolean;
    welfareCreditBalance: number;
  };
}

export interface Cooperative {
  id: string;
  name: string;
  nameHi: string;
  registrationNumber: string;
  description: string;
  region: string;
  location: string;
  totalMembers: number;
  activeWorkers: number;
  completedJobsMonth: number;
  monthlyRevenue: number;
  collectiveWelfareFund: number;
  fairnessIndex: number; // e.g. 88 (out of 100)
  wageComplianceRate: number; // e.g. 100%
  activeServices: ServiceCategory[];
  verified: boolean;
}

export interface WageBreakdown {
  customerTotal: number;
  protectedWorkerWage: number;
  materialCost: number;
  cooperativeFund: number;
  platformOperations: number;
  isCompliantWithWageFloor: boolean;
  wageFloorConfigured: number;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  description: string;
  urgency: 'NORMAL' | 'HIGH' | 'EMERGENCY';
  locationAddress: string;
  locationPincode: string;
  preferredDate: string;
  preferredTimeSlot: 'morning' | 'afternoon' | 'evening';
  images?: string[];
  audioVoiceNote?: boolean;
  createdAt: string;
  status: JobStatus;
  estimatedPrice: number;
  wageBreakdown: WageBreakdown;
  aiClassification?: {
    category: ServiceCategory;
    identifiedIssue: string;
    suggestedUrgency: 'NORMAL' | 'HIGH' | 'EMERGENCY';
    estimatedHours: number;
    rawLanguageDetected: string;
  };
}

export interface Job {
  id: string;
  requestId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  workerId?: string;
  workerName?: string;
  workerPhone?: string;
  workerRating?: number;
  workerAvatar?: string;
  cooperativeId: string;
  cooperativeName: string;
  serviceName: string;
  category: ServiceCategory;
  description: string;
  urgency: 'NORMAL' | 'HIGH' | 'EMERGENCY';
  locationAddress: string;
  status: JobStatus;
  statusTimestamps: {
    requestedAt: string;
    assignedAt?: string;
    acceptedAt?: string;
    workerOnTheWayAt?: string;
    arrivedAt?: string;
    startedAt?: string;
    completedAt?: string;
    settledAt?: string;
  };
  pricing: WageBreakdown;
  completionProof?: {
    image?: string;
    notes?: string;
    completedAt: string;
  };
  customerRating?: {
    overall: number;
    quality: number;
    timeliness: number;
    professionalism: number;
    comment?: string;
  };
  dispute?: {
    id: string;
    raisedBy: 'CUSTOMER' | 'WORKER';
    reason: string;
    description: string;
    status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED';
    resolutionNotes?: string;
    createdAt: string;
  };
  workerEtaMinutes?: number;
  workerLocation?: { lat: number; lng: number };
}

export interface WelfareProgram {
  id: string;
  title: string;
  titleHi: string;
  category: 'HEALTH' | 'INSURANCE' | 'TRAINING' | 'EMERGENCY' | 'PENSION';
  description: string;
  coverageAmount: string;
  status: 'ACTIVE' | 'ENROLLED' | 'AVAILABLE';
  enrolledWorkersCount: number;
  provider: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorRole: UserRole;
  actorName: string;
  action: string;
  details: string;
  entityId: string;
  entityType: 'JOB' | 'PAYMENT' | 'WAGE_RULE' | 'WORKER_VERIFICATION' | 'DISPUTE';
}

export interface CommunityOrder {
  id: string;
  societyName: string;
  adminName: string;
  phone: string;
  address: string;
  eventName: string;
  requiredWorkers: {
    category: ServiceCategory;
    count: number;
    durationDays: number;
  }[];
  date: string;
  status: 'PENDING' | 'ALLOCATED' | 'IN_PROGRESS' | 'COMPLETED';
  totalBudget: number;
  cooperativeId: string;
}
