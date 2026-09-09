import { WorkerProfile, ServiceCategory } from '@/types';

export interface AllocationCandidate {
  worker: WorkerProfile;
  matchScore: number; // 0 to 100
  subScores: {
    skillMatch: number;      // 0-30 pts
    distanceScore: number;   // 0-25 pts
    workloadFairness: number;// 0-25 pts (Higher if worker has lower jobs today!)
    ratingExperience: number;// 0-20 pts
  };
  reasons: string[];
  isRecommended: boolean;
}

/**
 * Fair Work Allocation Engine
 * Central principle: Prevent star worker monopolization by prioritizing 
 * qualified workers who have lower recent workload and are nearby.
 */
export function rankWorkersForJob(
  workers: WorkerProfile[],
  requiredCategory: ServiceCategory,
  maxDistanceKm: number = 10
): AllocationCandidate[] {
  // Filter for workers with the required skill and who are available
  const eligible = workers.filter(w => 
    w.skills.includes(requiredCategory) && 
    w.verificationStatus === 'VERIFIED' && 
    w.isAvailable
  );

  const candidates: AllocationCandidate[] = eligible.map(worker => {
    const reasons: string[] = [];
    
    // 1. Skill Match (30 pts)
    const skillMatch = 30;
    reasons.push(`Verified ${requiredCategory} skill`);

    // 2. Distance Score (25 pts max, decays with distance)
    const distance = worker.distanceKm ?? 3.0;
    let distanceScore = 25;
    if (distance <= 2.0) {
      distanceScore = 25;
      reasons.push(`Within ${distance.toFixed(1)} km proximity`);
    } else if (distance <= 5.0) {
      distanceScore = 20 - (distance - 2) * 3;
      reasons.push(`${distance.toFixed(1)} km transit distance`);
    } else {
      distanceScore = Math.max(5, 15 - distance);
    }

    // 3. Workload Fairness (25 pts max - HIGHER if worker did fewer jobs today!)
    // If worker did 0-1 jobs today -> 25 pts
    // If worker did 2-3 jobs today -> 18 pts
    // If worker did 4-5 jobs today -> 10 pts
    // If worker did 6+ jobs today -> 4 pts (Penalized to share opportunities!)
    let workloadFairness = 25;
    if (worker.completedJobsToday === 0) {
      workloadFairness = 25;
      reasons.push('Zero jobs today - priority for fair wage access');
    } else if (worker.completedJobsToday === 1) {
      workloadFairness = 23;
      reasons.push('Low workload today (1 job completed)');
    } else if (worker.completedJobsToday <= 3) {
      workloadFairness = 16;
      reasons.push('Moderate daily load (balanced distribution)');
    } else {
      workloadFairness = Math.max(3, 25 - (worker.completedJobsToday * 3.5));
      reasons.push(`High daily assignments (${worker.completedJobsToday} jobs today - balancing away)`);
    }

    // 4. Rating & Experience (20 pts max)
    const ratingNorm = (worker.rating / 5) * 12; // max 12
    const expNorm = Math.min(8, worker.experienceYears * 1.2); // max 8
    const ratingExperience = Math.round(ratingNorm + expNorm);
    reasons.push(`${worker.rating}★ rating with ${worker.experienceYears}y experience`);

    // Total Score
    const rawScore = skillMatch + distanceScore + workloadFairness + ratingExperience;
    const matchScore = Math.min(99, Math.round(rawScore));

    return {
      worker,
      matchScore,
      subScores: {
        skillMatch: Math.round(skillMatch),
        distanceScore: Math.round(distanceScore),
        workloadFairness: Math.round(workloadFairness),
        ratingExperience: Math.round(ratingExperience)
      },
      reasons,
      isRecommended: false
    };
  });

  // Sort descending by matchScore
  candidates.sort((a, b) => b.matchScore - a.matchScore);

  if (candidates.length > 0) {
    candidates[0].isRecommended = true;
  }

  return candidates;
}
