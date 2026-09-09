'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  UserRole, 
  JobStatus, 
  ServiceItem, 
  WorkerProfile, 
  Cooperative, 
  ServiceRequest, 
  Job, 
  WelfareProgram, 
  CommunityOrder, 
  AuditLogItem,
  ServiceCategory
} from '@/types';
import { 
  SEED_SERVICES, 
  SEED_COOPERATIVES, 
  SEED_WORKERS, 
  SEED_JOBS, 
  SEED_WELFARE_PROGRAMS, 
  SEED_COMMUNITY_ORDERS, 
  SEED_AUDIT_LOGS 
} from '@/lib/data/seed';
import { calculateProtectedWageBreakdown } from '@/lib/engines/wage-engine';
import { classifyServiceRequest } from '@/lib/engines/ai-assistant';
import { Language, TRANSLATIONS } from '@/lib/i18n/translations';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['en'];
  
  services: ServiceItem[];
  cooperatives: Cooperative[];
  workers: WorkerProfile[];
  jobs: Job[];
  serviceRequests: ServiceRequest[];
  welfarePrograms: WelfareProgram[];
  communityOrders: CommunityOrder[];
  auditLogs: AuditLogItem[];
  
  activeWorkerId: string;
  setActiveWorkerId: (id: string) => void;
  activeWorker: WorkerProfile;
  
  activeCustomerId: string;
  activeCooperativeId: string;
  activeCooperative: Cooperative;
  
  // State Mutators
  createServiceRequest: (params: {
    serviceId: string;
    description: string;
    locationAddress: string;
    locationPincode?: string;
    preferredDate?: string;
    preferredTimeSlot?: 'morning' | 'afternoon' | 'evening';
    urgency?: 'NORMAL' | 'HIGH' | 'EMERGENCY';
    imageUrl?: string;
  }) => { request: ServiceRequest; job: Job };
  
  allocateJob: (jobId: string, workerId: string, reason?: string) => void;
  updateJobStatus: (jobId: string, status: JobStatus, extra?: any) => void;
  completeJobWithProof: (jobId: string, proofUrl?: string, notes?: string) => void;
  settleJobPayment: (jobId: string) => void;
  submitCustomerRating: (jobId: string, rating: { overall: number; quality: number; timeliness: number; professionalism: number; comment?: string }) => void;
  raiseDispute: (jobId: string, reason: string, description: string, raisedBy: 'CUSTOMER' | 'WORKER') => void;
  resolveDispute: (jobId: string, resolutionNotes: string) => void;
  createCommunityOrder: (data: Omit<CommunityOrder, 'id' | 'status'>) => void;
  toggleWorkerAvailability: (workerId: string) => void;
  resetDemoData: () => void;
  runSIHDemoFlow: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('customer');
  const [language, setLanguageState] = useState<Language>('en');
  
  const [services, setServices] = useState<ServiceItem[]>(SEED_SERVICES);
  const [cooperatives, setCooperatives] = useState<Cooperative[]>(SEED_COOPERATIVES);
  const [workers, setWorkers] = useState<WorkerProfile[]>(SEED_WORKERS);
  const [jobs, setJobs] = useState<Job[]>(SEED_JOBS);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [welfarePrograms, setWelfarePrograms] = useState<WelfareProgram[]>(SEED_WELFARE_PROGRAMS);
  const [communityOrders, setCommunityOrders] = useState<CommunityOrder[]>(SEED_COMMUNITY_ORDERS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(SEED_AUDIT_LOGS);
  
  const [activeWorkerId, setActiveWorkerId] = useState<string>('worker-1'); // Amit Verma
  const [activeCustomerId] = useState<string>('cust-1'); // Ram Sharma
  const [activeCooperativeId] = useState<string>('coop-1'); // Shramik Seva

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('shramsetu_role');
      if (savedRole) setRoleState(savedRole as UserRole);
      
      const savedLang = localStorage.getItem('shramsetu_lang');
      if (savedLang) setLanguageState(savedLang as Language);
      
      const savedJobs = localStorage.getItem('shramsetu_jobs');
      if (savedJobs) setJobs(JSON.parse(savedJobs));
      
      const savedWorkers = localStorage.getItem('shramsetu_workers');
      if (savedWorkers) setWorkers(JSON.parse(savedWorkers));
    } catch (e) {
      console.warn('LocalStorage load error', e);
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('shramsetu_role', role);
      localStorage.setItem('shramsetu_lang', language);
      localStorage.setItem('shramsetu_jobs', JSON.stringify(jobs));
      localStorage.setItem('shramsetu_workers', JSON.stringify(workers));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [role, language, jobs, workers]);

  const setRole = (r: UserRole) => setRoleState(r);
  const setLanguage = (l: Language) => setLanguageState(l);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const activeWorker = workers.find(w => w.id === activeWorkerId) || workers[0];
  const activeCooperative = cooperatives.find(c => c.id === activeCooperativeId) || cooperatives[0];

  const logAudit = (
    actorRole: UserRole,
    actorName: string,
    action: string,
    details: string,
    entityId: string,
    entityType: AuditLogItem['entityType']
  ) => {
    const newLog: AuditLogItem = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorRole,
      actorName,
      action,
      details,
      entityId,
      entityType
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const createServiceRequest = (params: {
    serviceId: string;
    description: string;
    locationAddress: string;
    locationPincode?: string;
    preferredDate?: string;
    preferredTimeSlot?: 'morning' | 'afternoon' | 'evening';
    urgency?: 'NORMAL' | 'HIGH' | 'EMERGENCY';
    imageUrl?: string;
  }) => {
    const service = services.find(s => s.id === params.serviceId) || services[0];
    const aiAnalysis = classifyServiceRequest(params.description);
    const urgency = params.urgency || aiAnalysis.suggestedUrgency;
    const wageBreakdown = calculateProtectedWageBreakdown(service, undefined, urgency === 'EMERGENCY' ? 1.25 : 1.0);

    const reqId = `req-${Date.now()}`;
    const jobId = `SHR-${Math.floor(10000 + Math.random() * 90000)}`;

    const newRequest: ServiceRequest = {
      id: reqId,
      customerId: activeCustomerId,
      customerName: 'Ram Sharma',
      customerPhone: '+91 98765 43210',
      serviceId: service.id,
      serviceName: service.name,
      category: service.category,
      description: params.description,
      urgency,
      locationAddress: params.locationAddress,
      locationPincode: params.locationPincode || '110017',
      preferredDate: params.preferredDate || new Date().toISOString().split('T')[0],
      preferredTimeSlot: params.preferredTimeSlot || 'morning',
      images: params.imageUrl ? [params.imageUrl] : [],
      createdAt: new Date().toISOString(),
      status: 'MATCHING',
      estimatedPrice: wageBreakdown.customerTotal,
      wageBreakdown,
      aiClassification: aiAnalysis
    };

    const newJob: Job = {
      id: jobId,
      requestId: reqId,
      customerId: activeCustomerId,
      customerName: 'Ram Sharma',
      customerPhone: '+91 98765 43210',
      cooperativeId: activeCooperativeId,
      cooperativeName: activeCooperative.name,
      serviceName: service.name,
      category: service.category,
      description: params.description,
      urgency,
      locationAddress: params.locationAddress,
      status: 'MATCHING',
      statusTimestamps: {
        requestedAt: new Date().toISOString()
      },
      pricing: wageBreakdown,
      workerEtaMinutes: 18,
      workerLocation: { lat: 28.5245, lng: 77.2066 }
    };

    setServiceRequests(prev => [newRequest, ...prev]);
    setJobs(prev => [newJob, ...prev]);

    logAudit(
      'customer',
      'Ram Sharma (Customer)',
      'CREATE_SERVICE_REQUEST',
      `Requested ${service.name} (${urgency} urgency) with AI scope: "${aiAnalysis.identifiedIssue}".`,
      jobId,
      'JOB'
    );

    return { request: newRequest, job: newJob };
  };

  const allocateJob = (jobId: string, workerId: string, reason?: string) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;

    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          workerId: worker.id,
          workerName: worker.name,
          workerPhone: worker.phone,
          workerRating: worker.rating,
          workerAvatar: worker.avatar,
          status: 'ASSIGNED',
          statusTimestamps: {
            ...job.statusTimestamps,
            assignedAt: new Date().toISOString()
          }
        };
      }
      return job;
    }));

    logAudit(
      'cooperative',
      `${activeCooperative.name} Admin`,
      'FAIR_ALLOCATION_DISPATCH',
      `Assigned ${worker.name} (Jobs today: ${worker.completedJobsToday}, Workload: ${worker.workloadScore}%). Reason: ${reason || 'Optimal fairness balance score'}.`,
      jobId,
      'JOB'
    );
  };

  const updateJobStatus = (jobId: string, status: JobStatus, extra?: any) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        const timestamps = { ...job.statusTimestamps };
        const now = new Date().toISOString();
        if (status === 'ACCEPTED') timestamps.acceptedAt = now;
        if (status === 'WORKER_ON_THE_WAY') timestamps.workerOnTheWayAt = now;
        if (status === 'ARRIVED') timestamps.arrivedAt = now;
        if (status === 'IN_PROGRESS') timestamps.startedAt = now;
        if (status === 'COMPLETED') timestamps.completedAt = now;
        if (status === 'PAYMENT_SETTLED') timestamps.settledAt = now;

        return {
          ...job,
          status,
          statusTimestamps: timestamps,
          ...(extra || {})
        };
      }
      return job;
    }));

    logAudit(
      role,
      role === 'worker' ? activeWorker.name : 'System/User',
      'STATUS_TRANSITION',
      `Job #${jobId} transitioned to ${status}.`,
      jobId,
      'JOB'
    );
  };

  const completeJobWithProof = (jobId: string, proofUrl?: string, notes?: string) => {
    const defaultProof = proofUrl || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80';
    
    updateJobStatus(jobId, 'COMPLETED', {
      completionProof: {
        image: defaultProof,
        notes: notes || 'Service completed with safety guidelines and verified fitting.',
        completedAt: new Date().toISOString()
      }
    });

    logAudit(
      'worker',
      activeWorker.name,
      'JOB_COMPLETION_PROOF_SUBMITTED',
      `Worker verified completion with photographic inspection evidence.`,
      jobId,
      'JOB'
    );
  };

  const settleJobPayment = (jobId: string) => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return;

    updateJobStatus(jobId, 'PAYMENT_SETTLED');

    // Update worker earnings and welfare credits
    const workerWage = targetJob.pricing.protectedWorkerWage;
    const coopFundAddition = targetJob.pricing.cooperativeFund;

    setWorkers(prev => prev.map(w => {
      if (w.id === targetJob.workerId) {
        return {
          ...w,
          completedJobsToday: w.completedJobsToday + 1,
          completedJobsTotal: w.completedJobsTotal + 1,
          todayEarnings: w.todayEarnings + workerWage,
          monthlyEarnings: w.monthlyEarnings + workerWage,
          workloadScore: Math.min(100, w.workloadScore + 15),
          welfareStatus: {
            ...w.welfareStatus,
            welfareCreditBalance: w.welfareStatus.welfareCreditBalance + Math.round(workerWage * 0.05)
          }
        };
      }
      return w;
    }));

    // Update cooperative fund
    setCooperatives(prev => prev.map(c => {
      if (c.id === targetJob.cooperativeId) {
        return {
          ...c,
          collectiveWelfareFund: c.collectiveWelfareFund + coopFundAddition,
          monthlyRevenue: c.monthlyRevenue + targetJob.pricing.customerTotal,
          completedJobsMonth: c.completedJobsMonth + 1
        };
      }
      return c;
    }));

    logAudit(
      'admin',
      'ShramSetu Transparent Settlement Engine',
      'ESCROW_SETTLEMENT_EXECUTED',
      `Disbursed ₹${workerWage} directly to worker, ₹${coopFundAddition} to Cooperative Welfare Pool, ₹${targetJob.pricing.platformOperations} to platform operations. Zero wage dilution.`,
      jobId,
      'PAYMENT'
    );
  };

  const submitCustomerRating = (
    jobId: string, 
    rating: { overall: number; quality: number; timeliness: number; professionalism: number; comment?: string }
  ) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        return { ...job, customerRating: rating };
      }
      return job;
    }));

    logAudit(
      'customer',
      'Ram Sharma (Customer)',
      'SUBMIT_REPUTATION_REVIEW',
      `Submitted ${rating.overall}★ rating with positive feedback on craftsmanship.`,
      jobId,
      'JOB'
    );
  };

  const raiseDispute = (jobId: string, reason: string, description: string, raisedBy: 'CUSTOMER' | 'WORKER') => {
    const disputeId = `dsp-${Date.now()}`;
    setJobs(prev => prev.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: 'DISPUTED',
          dispute: {
            id: disputeId,
            raisedBy,
            reason,
            description,
            status: 'OPEN',
            createdAt: new Date().toISOString()
          }
        };
      }
      return job;
    }));

    logAudit(
      raisedBy.toLowerCase() as UserRole,
      raisedBy === 'CUSTOMER' ? 'Ram Sharma' : activeWorker.name,
      'RAISE_DISPUTE_ARBITRATION',
      `Flagged dispute: "${reason}". Escalated to Cooperative & Platform Admin resolution queue.`,
      jobId,
      'DISPUTE'
    );
  };

  const resolveDispute = (jobId: string, resolutionNotes: string) => {
    setJobs(prev => prev.map(job => {
      if (job.id === jobId && job.dispute) {
        return {
          ...job,
          status: 'CUSTOMER_CONFIRMED',
          dispute: {
            ...job.dispute,
            status: 'RESOLVED',
            resolutionNotes
          }
        };
      }
      return job;
    }));

    logAudit(
      'admin',
      'Platform Arbitration Board',
      'RESOLVE_DISPUTE',
      `Arbitrated dispute on #${jobId}. Outcome: ${resolutionNotes}`,
      jobId,
      'DISPUTE'
    );
  };

  const createCommunityOrder = (data: Omit<CommunityOrder, 'id' | 'status'>) => {
    const newOrder: CommunityOrder = {
      ...data,
      id: `COMM-${Math.floor(100 + Math.random() * 900)}`,
      status: 'ALLOCATED'
    };
    setCommunityOrders(prev => [newOrder, ...prev]);

    logAudit(
      'community',
      data.adminName,
      'COMMUNITY_BULK_WORKFORCE_ORDER',
      `Booked society team (${data.requiredWorkers.map(w => `${w.count} ${w.category}`).join(', ')}) for ${data.societyName}.`,
      newOrder.id,
      'JOB'
    );
  };

  const toggleWorkerAvailability = (workerId: string) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        return { ...w, isAvailable: !w.isAvailable };
      }
      return w;
    }));
  };

  const resetDemoData = () => {
    setServices(SEED_SERVICES);
    setCooperatives(SEED_COOPERATIVES);
    setWorkers(SEED_WORKERS);
    setJobs(SEED_JOBS);
    setWelfarePrograms(SEED_WELFARE_PROGRAMS);
    setCommunityOrders(SEED_COMMUNITY_ORDERS);
    setAuditLogs(SEED_AUDIT_LOGS);
    localStorage.clear();
  };

  const runSIHDemoFlow = () => {
    // 1. Customer creates emergency pipe leak request
    const { job } = createServiceRequest({
      serviceId: 'srv-plumb',
      description: 'Kitchen sink pipe burst and flooding kitchen floor. Need urgent repair!',
      locationAddress: 'Flat 402, Sunshine Apartments, Saket, New Delhi',
      urgency: 'EMERGENCY'
    });

    // 2. Co-op Fair Allocation Engine assigns Amit Verma (lower workload score)
    allocateJob(
      job.id, 
      'worker-1', 
      'Fair Workload Balancing: Amit has completed 1 job today vs Rajesh who completed 6 jobs.'
    );

    // 3. Worker accepts & starts navigation
    updateJobStatus(job.id, 'ACCEPTED');
  };

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      language,
      setLanguage,
      t,
      services,
      cooperatives,
      workers,
      jobs,
      serviceRequests,
      welfarePrograms,
      communityOrders,
      auditLogs,
      activeWorkerId,
      setActiveWorkerId,
      activeWorker,
      activeCustomerId,
      activeCooperativeId,
      activeCooperative,
      createServiceRequest,
      allocateJob,
      updateJobStatus,
      completeJobWithProof,
      settleJobPayment,
      submitCustomerRating,
      raiseDispute,
      resolveDispute,
      createCommunityOrder,
      toggleWorkerAvailability,
      resetDemoData,
      runSIHDemoFlow
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
