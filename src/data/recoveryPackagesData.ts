export interface RecoveryService {
  name: string;
  description: string;
  quantity: string;
}

export interface RecoveryPlanOption {
  days: 7 | 14 | 30;
  price_inr: number;
  badge?: string;
}

export interface RecoveryPackage {
  id: string;
  package_number: string;
  title: string;
  subtitle: string;
  theme: 'purple' | 'green';
  services: RecoveryService[];
  plans: RecoveryPlanOption[];
  recovery_team: string[];
  special_note?: string;
}

export const RECOVERY_PACKAGES: RecoveryPackage[] = [
  {
    id: "joint-replacement",
    package_number: "01 / 06",
    title: "JOINT REPLACEMENT RECOVERY",
    subtitle: "Knee Replacement, Hip Replacement & Orthopaedic Surgery",
    theme: "purple",
    services: [
      {
        name: "Nursing",
        description: "Wound care, vitals & medication",
        quantity: "6 visits"
      },
      {
        name: "Physiotherapy",
        description: "Mobility & strengthening",
        quantity: "12 visits"
      },
      {
        name: "Doctor",
        description: "Recovery assessment",
        quantity: "2 visits"
      },
      {
        name: "Caregiver",
        description: "Personal care & daily activities",
        quantity: "12 hrs/day x 14 days"
      },
      {
        name: "Diagnostics",
        description: "Home sample collection",
        quantity: "2 collections"
      },
      {
        name: "Care Manager",
        description: "Family coordination",
        quantity: "Daily follow-up"
      }
    ],
    plans: [
      {
        days: 7,
        price_inr: 14999
      },
      {
        days: 14,
        price_inr: 27999,
        badge: "MOST POPULAR"
      },
      {
        days: 30,
        price_inr: 54999
      }
    ],
    recovery_team: [
      "Doctor",
      "Nurse",
      "Physiotherapist",
      "Caregiver",
      "Care Manager",
      "Diagnostics"
    ]
  },
  {
    id: "cardiac-surgery",
    package_number: "02 / 06",
    title: "CARDIAC SURGERY RECOVERY",
    subtitle: "CABG/Bypass, Valve Surgery, Angioplasty & Major Cardiac Procedures",
    theme: "green",
    services: [
      {
        name: "Nursing",
        description: "BP, pulse, SpO2 & medication",
        quantity: "10 visits"
      },
      {
        name: "Physiotherapy",
        description: "Breathing & mobility",
        quantity: "10 visits"
      },
      {
        name: "Doctor",
        description: "Post-surgery review",
        quantity: "3 visits"
      },
      {
        name: "Caregiver",
        description: "ADL support & companionship",
        quantity: "12 hrs/day x 14 days"
      },
      {
        name: "Diagnostics",
        description: "Home sample collection",
        quantity: "2 collections"
      },
      {
        name: "Care Manager",
        description: "Recovery coordination",
        quantity: "Daily follow-up"
      }
    ],
    plans: [
      {
        days: 7,
        price_inr: 16999
      },
      {
        days: 14,
        price_inr: 32999,
        badge: "MOST POPULAR"
      },
      {
        days: 30,
        price_inr: 64999
      }
    ],
    recovery_team: [
      "Doctor",
      "Nurse",
      "Physiotherapist",
      "Caregiver",
      "Care Manager",
      "Diagnostics"
    ]
  },
  {
    id: "cancer-chemotherapy",
    package_number: "03 / 06",
    title: "CANCER / CHEMOTHERAPY RECOVERY",
    subtitle: "Post-Chemotherapy Care, Cancer Surgery & Supportive Home Care",
    theme: "purple",
    services: [
      {
        name: "Nursing",
        description: "Vitals, medication & symptom care",
        quantity: "10 visits"
      },
      {
        name: "Physiotherapy",
        description: "Strength & fatigue management",
        quantity: "8 visits"
      },
      {
        name: "Doctor",
        description: "Medical review",
        quantity: "3 visits"
      },
      {
        name: "Caregiver",
        description: "Nutrition, hygiene & companionship",
        quantity: "12 hrs/day x 14 days"
      },
      {
        name: "Diagnostics",
        description: "Home sample collection",
        quantity: "2 collections"
      },
      {
        name: "Care Manager",
        description: "Family coordination",
        quantity: "Daily follow-up"
      }
    ],
    plans: [
      {
        days: 7,
        price_inr: 16999
      },
      {
        days: 14,
        price_inr: 32999,
        badge: "MOST POPULAR"
      },
      {
        days: 30,
        price_inr: 64999
      }
    ],
    recovery_team: [
      "Doctor",
      "Nurse",
      "Physiotherapist",
      "Caregiver",
      "Care Manager",
      "Diagnostics"
    ]
  },
  {
    id: "general-surgery",
    package_number: "04 / 06",
    title: "GENERAL SURGERY RECOVERY",
    subtitle: "Abdominal, Gallbladder, Hernia, Colorectal & Other Major Surgeries",
    theme: "green",
    services: [
      {
        name: "Nursing",
        description: "Dressing, vitals & medication",
        quantity: "6 visits"
      },
      {
        name: "Physiotherapy",
        description: "Mobility & functional recovery",
        quantity: "6 visits"
      },
      {
        name: "Doctor",
        description: "Post-operative assessment",
        quantity: "2 visits"
      },
      {
        name: "Caregiver",
        description: "Personal care, meals & mobility",
        quantity: "12 hrs/day x 14 days"
      },
      {
        name: "Diagnostics",
        description: "Home sample collection",
        quantity: "1 collection"
      },
      {
        name: "Care Manager",
        description: "Recovery coordination",
        quantity: "Daily follow-up"
      }
    ],
    plans: [
      {
        days: 7,
        price_inr: 12999
      },
      {
        days: 14,
        price_inr: 24999,
        badge: "MOST POPULAR"
      },
      {
        days: 30,
        price_inr: 49999
      }
    ],
    recovery_team: [
      "Doctor",
      "Nurse",
      "Physiotherapist",
      "Caregiver",
      "Care Manager",
      "Diagnostics"
    ]
  },
  {
    id: "ckd-dialysis",
    package_number: "05 / 06",
    title: "CKD / DIALYSIS RECOVERY",
    subtitle: "Post-Hospitalisation, Dialysis Support & Chronic Kidney Care",
    theme: "purple",
    services: [
      {
        name: "Nursing",
        description: "Vitals, dialysis care & medication",
        quantity: "8 visits"
      },
      {
        name: "Physiotherapy",
        description: "Mobility & strength",
        quantity: "8 visits"
      },
      {
        name: "Doctor",
        description: "Medical review",
        quantity: "3 visits"
      },
      {
        name: "Caregiver",
        description: "Diet, hygiene & daily support",
        quantity: "12 hrs/day x 14 days"
      },
      {
        name: "Diagnostics",
        description: "Home sample collection",
        quantity: "2 collections"
      },
      {
        name: "Care Manager",
        description: "Coordination & follow-up",
        quantity: "Daily follow-up"
      }
    ],
    plans: [
      {
        days: 7,
        price_inr: 15999
      },
      {
        days: 14,
        price_inr: 30999,
        badge: "MOST POPULAR"
      },
      {
        days: 30,
        price_inr: 59999
      }
    ],
    recovery_team: [
      "Doctor",
      "Nurse",
      "Physiotherapist",
      "Caregiver",
      "Care Manager",
      "Diagnostics"
    ]
  },
  {
    id: "dementia-management",
    package_number: "06 / 06",
    title: "DEMENTIA MANAGEMENT",
    subtitle: "Post Hospitalisation, Behaviour Support & Elder Recovery",
    theme: "green",
    services: [
      {
        name: "Nursing",
        description: "Medication, vitals & observation",
        quantity: "6 visits"
      },
      {
        name: "Physiotherapy",
        description: "Balance & fall prevention",
        quantity: "8 visits"
      },
      {
        name: "Doctor",
        description: "Clinical assessment",
        quantity: "2 visits"
      },
      {
        name: "Dementia-trained Caregiver",
        description: "Supervision, hygiene & companionship",
        quantity: "12 hrs/day x 14 days"
      },
      {
        name: "Care Manager",
        description: "Family communication",
        quantity: "Daily follow-up"
      }
    ],
    plans: [
      {
        days: 7,
        price_inr: 14999
      },
      {
        days: 14,
        price_inr: 27999,
        badge: "MOST POPULAR"
      },
      {
        days: 30,
        price_inr: 54999
      }
    ],
    recovery_team: [
      "Doctor",
      "Nurse",
      "Physiotherapist",
      "Caregiver",
      "Care Manager"
    ],
    special_note: "This source package does not list Diagnostics. Do not insert Diagnostics into this package."
  }
];

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
