export type FlashcardDraft = {
  id: string;
  front: string;
  back: string;
  source: string;
};

export type Direction = {
  id: string;
  title: string;
  explanation: string;
  supportingEvidence: string[];
  source: string;
  flashcardFront: string;
  flashcardBack: string;
};

export type Expert = {
  id: string;
  name: string;
  initials: string;
  question: string;
  evidence: string[];
  answersByEvidence: string[];
  directions: Direction[];
};

export const recentSummary = {
  title: 'American Civil War',
  source: 'Britannica · Overview',
  bullets: [
    'A war from 1861 to 1865',
    'Fought between the Union and 11 seceding Southern states',
    'Closely tied to secession, slavery, and the future of the nation',
  ],
};

const sharedEvidence = [
  'Britannica explains that the war began as a conflict between the United States and the seceding Southern states.',
  'The Emancipation Proclamation, effective on January 1, 1863, declared enslaved people in rebellious states to be forever free.',
  'Gettysburg is widely treated as a turning point because it ended Lee’s largest invasion of the North.',
];

export const recentExperts: Expert[] = [
  {
    id: 'politics',
    name: 'Politics Expert',
    initials: 'PE',
    question: 'What was this war really about?',
    evidence: sharedEvidence,
    answersByEvidence: [
      'At the beginning, leaders publicly framed the conflict as a struggle over preserving the Union against secession. That framing mattered because it defined federal war aims and coalition politics in the North.\n\nAs the war deepened, policy and public language shifted. Emancipation and military turning-point narratives pulled the conflict into a larger argument about what kind of nation could survive after secession.',
      'The Emancipation Proclamation marked a political pivot: war aims expanded from restoring the Union to remaking the nation’s legal and moral foundations. It recast who the war served and what victory meant.\n\nSo the core conflict did not disappear, but by 1863 political purpose was no longer only reunion. It became tied to ending slavery as part of preserving national legitimacy.',
      'Gettysburg strengthened the idea that Confederate independence could be rolled back militarily. That made Union preservation look achievable, not just aspirational.\n\nCombined with emancipation-era policy, the political meaning of the war broadened: preserve the Union, then define a postwar order that could not simply restore the old balance.',
    ],
    directions: [
      {
        id: 'union-secession',
        title: 'It was first a war over preserving the Union.',
        explanation:
          'This lens emphasizes how wartime speeches, legislation, and mobilization initially centered on constitutional breakaway and federal authority.',
        supportingEvidence: [
          'Britannica frames the opening conflict as Union government versus seceding states.',
          'Early Union messaging prioritized restoring national integrity.',
        ],
        source: 'Britannica · American Civil War overview',
        flashcardFront: 'Politics lens: What was the Civil War initially framed as?',
        flashcardBack: 'Initially it was framed as preserving the Union against secession and constitutional rupture.',
      },
      {
        id: 'future-shape',
        title: 'It became a war over the future shape of the nation.',
        explanation:
          'This lens tracks the mid-war expansion of goals: emancipation, reconstruction questions, and a redefinition of national citizenship.',
        supportingEvidence: [
          'Emancipation Proclamation (National Archives) expanded the meaning of victory.',
          'Post-1863 political discourse tied military success to social transformation.',
        ],
        source: 'National Archives · Emancipation Proclamation',
        flashcardFront: 'Politics lens: What changed by mid-war?',
        flashcardBack: 'By 1863, war aims broadened to include emancipation and the future political structure of the nation.',
      },
    ],
  },
  {
    id: 'history',
    name: 'History Expert',
    initials: 'HE',
    question: 'When did the meaning of the war begin to change?',
    evidence: sharedEvidence,
    answersByEvidence: [
      'The earliest meaning was anchored in Union versus secession. Contemporary framing focused on whether the United States could remain politically whole after Southern departure.\n\nBut this starting point was not the endpoint. By 1863, emancipation policy and major battlefield narratives began to reshape how people interpreted what the war was for.',
      'January 1863 is a clear inflection point. The Emancipation Proclamation did not end slavery everywhere at once, but it changed the war’s declared purpose in rebel territory and transformed international and domestic interpretation.\n\nAfter that, the conflict was increasingly read as both a union war and a freedom war, not merely a constitutional dispute over secession.',
      'Gettysburg reinforced the sense that the Confederacy could be decisively contained. Historians often treat it as a symbolic and strategic hinge in public memory.\n\nPlaced beside emancipation-era policy, it helped lock in a new interpretation: the war began around Union versus secession, then shifted toward national reconstruction and slavery’s destruction.',
    ],
    directions: [
      {
        id: 'union-priority',
        title: 'The war was primarily about Union vs secession.',
        explanation:
          'This interpretation keeps focus on the constitutional crisis and the federal effort to reverse secession as the war’s central engine.',
        supportingEvidence: [
          'Britannica opens with conflict between the United States and seceding states.',
          'Early campaigns and policy debates centered on reunion as the immediate objective.',
        ],
        source: 'Britannica · American Civil War overview',
        flashcardFront: 'History lens: What was the war’s initial core?',
        flashcardBack: 'Its initial core was preserving the Union against secession, before later aims expanded.',
      },
      {
        id: 'mid-war-shift',
        title: 'By the middle of the war, it had become a war about national reconstruction and the end of slavery.',
        explanation:
          'This interpretation highlights 1863 as a semantic and strategic shift, when emancipation and turning-point narratives changed the war’s broader historical meaning.',
        supportingEvidence: [
          'National Archives records emancipation policy taking effect on January 1, 1863.',
          'NPS Gettysburg overview frames 1863 military outcomes as a turning point in momentum and memory.',
        ],
        source: 'National Archives + NPS Gettysburg overview',
        flashcardFront: 'History lens: Why is 1863 treated as a shift?',
        flashcardBack: 'Because emancipation policy and turning-point narratives reframed the war beyond reunion alone.',
      },
    ],
  },
  {
    id: 'society',
    name: 'Society Expert',
    initials: 'SE',
    question: 'What did this war actually change for enslaved people and ordinary life?',
    evidence: sharedEvidence,
    answersByEvidence: [
      'At first, many civilians experienced the war as disruption without immediate social transformation. Daily life changed through mobilization, shortages, and violence.\n\nYet the social meaning of the conflict expanded as wartime policy confronted slavery and labor systems more directly.',
      'The Emancipation Proclamation changed legal status in concrete wartime terms for enslaved people in rebellious areas. It opened a pathway that linked military conflict to freedom claims.\n\nStill, implementation was uneven and dangerous, which is why social transformation unfolded over time rather than in one instant.',
      'Gettysburg symbolized a shift in military momentum, and that shaped how civilians imagined the war’s possible end. Perceptions of eventual Union victory affected policy confidence and social expectations.\n\nBy combining battlefield turning points with emancipation policy, the war began to change ordinary life through law, labor, and state power.',
    ],
    directions: [
      {
        id: 'concrete-change',
        title: 'The war changed legal status and freedom in concrete ways.',
        explanation:
          'This lens focuses on legal shifts, federal wartime authority, and the lived consequences of emancipation policy for enslaved communities.',
        supportingEvidence: [
          'Emancipation Proclamation declared enslaved people in rebellious states forever free.',
          'War policy increasingly connected military lines with pathways to freedom.',
        ],
        source: 'National Archives · Emancipation Proclamation',
        flashcardFront: 'Society lens: What concrete social change happened?',
        flashcardBack: 'Wartime policy changed legal status and expanded real pathways to freedom, though unevenly.',
      },
      {
        id: 'uneven-change',
        title: 'The war changed society unevenly and over time, not all at once.',
        explanation:
          'This lens stresses regional variation, delayed enforcement, and gradual restructuring of work, family, and civic life.',
        supportingEvidence: [
          'Battlefield outcomes like Gettysburg changed momentum but not instantly every local condition.',
          'Freedom and reconstruction were contested processes across years, not a single event.',
        ],
        source: 'NPS Gettysburg overview + Britannica context',
        flashcardFront: 'Society lens: Why was social change uneven?',
        flashcardBack: 'Because legal change, military control, and local enforcement unfolded at different speeds across regions.',
      },
    ],
  },
];

export const discoverCard = {
  title: 'What actually changed the Civil War: secession, emancipation, or Gettysburg?',
  subtitle: 'Built from 3 items in your Civil War collection',
};

export const discoverExperts: Expert[] = [
  {
    ...recentExperts[0],
    question: 'Which event most clearly changed the purpose of the war?',
  },
  {
    ...recentExperts[1],
    question: 'Was Gettysburg the turning point, or was 1863 the deeper turning point?',
  },
  {
    ...recentExperts[2],
    question: 'Which event most changed the lives of enslaved people?',
  },
];
