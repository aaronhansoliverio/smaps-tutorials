// ============================================================
//  Replace each driveId with the actual Google Drive file ID.
//  Folder: https://drive.google.com/drive/folders/1MAuD9JnTwEsBUFuIecX3gPymKbWol4_O
//
//  How to get a file ID:
//    1. Open the folder in Google Drive
//    2. Right-click the video → Share → Copy link
//    3. Set access to "Anyone with the link" → Viewer
//    4. Copy the ID between /d/ and /view in the URL
// ============================================================

export const modules = [
  {
    id: 1,
    title: 'Module 1: Classroom & Student Management',
    description:
      'Learn how to navigate and manage your classroom settings and student information in SMAPS-SIS.',
    icon: '🏫',
    headerColor: 'bg-red-800',
    badgeColor: 'bg-yellow-100 text-red-800',
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    videos: [
      {
        id: 'm1v1',
        moduleId: 1,
        title: 'Teacher Portal Overview',
        description:
          'Get a comprehensive overview of the classroom management interface. Learn the layout, key navigation areas, and how to quickly access the features you need most.',
        driveId: '11kOoWzr5pLH4mXVwzaw8pWxGtb2gTnpB',
        duration: '5:00',
      },
      {
        id: 'm1v2',
        moduleId: 1,
        title: 'Classroom',
        description:
          'Learn how to view and access detailed student information, profile data, and contact details within the SMAPS-SIS system.',
        driveId: '1f62JBBrVhvE6EbXyhQ6jCppYasxyNvAT',
        duration: '4:30',
      },
      {
        id: 'm1v3',
        moduleId: 1,
        title: 'Details',
        description:
          'Explore the detailed view options for classroom and student data, including how to drill down into specific records.',
        driveId: '1OwF2Ua9dBp4uPvDHPqr6yNxFM9vk-1pq',
        duration: '6:00',
      },
    ],
  },
  {
    id: 2,
    title: 'Module 2: Academic Tasks',
    description:
      'Master academic task features including grade entry via the Electronic Class Record and viewing grade summaries.',
    icon: '📝',
    headerColor: 'bg-green-800',
    badgeColor: 'bg-green-100 text-green-800',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
    videos: [
      {
        id: 'm2v1',
        moduleId: 2,
        title: 'Enter Grades (ECR)',
        description:
          'Step-by-step guide on entering student grades using the Electronic Class Record (ECR) feature in SMAPS-SIS.',
        driveId: '1gguoA8gMD7-e9EzF3h9YBolnAqI0AVzv',
        duration: '8:00',
      },
      {
        id: 'm2v2',
        moduleId: 2,
        title: 'View Grade Summary',
        description:
          'Learn how to access and interpret grade summary reports for your class, and understand how grades are calculated.',
        driveId: '13h0lqBDQw-4RB_DKhXRtVsT2vl-egLpk',
        duration: '5:30',
      },
    ],
  },
  {
    id: 3,
    title: 'Module 3: Attendance & Schedule',
    description:
      'Manage student attendance records and view your class schedule efficiently using SMAPS-SIS.',
    icon: '📅',
    headerColor: 'bg-purple-800',
    badgeColor: 'bg-purple-100 text-purple-800',
    borderColor: 'border-purple-200',
    bgColor: 'bg-purple-50',
    videos: [
      {
        id: 'm3v1',
        moduleId: 3,
        title: 'Attendance',
        description:
          'Learn how to take and record daily student attendance, view attendance history, and generate attendance reports.',
        driveId: '1FQdtE7RBOeEIVGJAe34FAxuUtZ9z_sXo',
        duration: '7:00',
      },
      {
        id: 'm3v2',
        moduleId: 3,
        title: 'Class Schedule',
        description:
          'Navigate your class schedule within SMAPS-SIS, understand how to view daily and weekly timetables.',
        driveId: '1hEyvOAiABOSmXmrZf_OtkdMpLnRo9Vml',
        duration: '4:00',
      },
    ],
  },
  {
    id: 4,
    title: 'Module 4: Early Childhood Development',
    description:
      'Learn how to use the ECD Assessment feature for early childhood development tracking and reporting.',
    icon: '🌱',
    headerColor: 'bg-amber-700',
    badgeColor: 'bg-amber-100 text-amber-800',
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50',
    videos: [
      {
        id: 'm4v1',
        moduleId: 4,
        title: 'ECD Assessment',
        description:
          'Complete guide to using the Early Childhood Development Assessment feature, including how to record and submit ECD evaluations.',
        driveId: '1r2XIE5Ehb342wusUAGgxTt9tF50lC2RM',
        duration: '10:00',
      },
    ],
  },
]

// Flat ordered list of every video — used for Prev/Next navigation
export const allVideos = modules.flatMap((module) =>
  module.videos.map((video) => ({ ...video, moduleTitle: module.title }))
)

export const getVideoById = (id) => allVideos.find((v) => v.id === id)
export const getModuleById = (id) => modules.find((m) => m.id === id)
export const getTotalVideos = () => allVideos.length

// ============================================================
//  PARENT MODULES
// ============================================================
export const parentModules = [
  {
    id: 'p1',
    title: 'Module 1: Getting Started',
    description:
      'Learn how to access the Parent Portal for the first time and navigate the dashboard.',
    icon: '🏠',
    headerColor: 'bg-red-800',
    badgeColor: 'bg-yellow-100 text-red-800',
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    videos: [
      {
        id: 'pm1v1',
        moduleId: 'p1',
        title: 'Accessing the Parent Portal',
        description:
          'Step-by-step guide on how to access the Parent Portal using your unique enrollment code. Covers first-time login, account setup, and troubleshooting access issues.',
        driveId: '1IkuK517hhrUC2cNZBK6lSDZrmiwntxHJ',
        duration: '5:00',
      },
      {
        id: 'pm1v2',
        moduleId: 'p1',
        title: 'Understanding the Parent Dashboard',
        description:
          'Get a full overview of the Parent Dashboard — learn where to find key information, navigate the menu sections, and personalize your view.',
        driveId: '1ZojhubGHbpf97DkHNdDxUOVdJTQIgkyQ',
        duration: '4:30',
      },
    ],
  },
  {
    id: 'p2',
    title: 'Module 2: Academic Monitoring',
    description:
      'Monitor your child\'s academic performance, class schedule, and attendance records.',
    icon: '📊',
    headerColor: 'bg-blue-800',
    badgeColor: 'bg-blue-100 text-blue-800',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    videos: [
      {
        id: 'pm2v1',
        moduleId: 'p2',
        title: 'View Grades',
        description:
          'Learn how to access and read your child\'s grade reports, understand the grading system, and monitor academic progress across all subjects.',
        driveId: '1-qcAu7AcrOqC2hwXwH0M8PwfWlwR9SSH',
        duration: '5:30',
      },
      {
        id: 'pm2v2',
        moduleId: 'p2',
        title: 'View Class Schedule',
        description:
          'Navigate your child\'s class schedule — view daily and weekly timetables, subject assignments, and room information.',
        driveId: '1DPdpm40nnfkaQbIHgopqYWPhumouxHm0',
        duration: '3:30',
      },
      {
        id: 'pm2v3',
        moduleId: 'p2',
        title: 'Attendance & Excuse Letters',
        description:
          'Check your child\'s attendance record and learn how to submit excuse letters for absences directly through the Parent Portal.',
        driveId: '106dEqSC7aOEbyC45wbWe91cekjfYf7HY',
        duration: '6:00',
      },
    ],
  },
  {
    id: 'p3',
    title: 'Module 3: Communication & Records',
    description:
      'Manage finances, communicate with teachers, and access important student documents.',
    icon: '💬',
    headerColor: 'bg-green-800',
    badgeColor: 'bg-green-100 text-green-800',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
    videos: [
      {
        id: 'pm3v1',
        moduleId: 'p3',
        title: "Managing Your Child's Finances",
        description:
          'View tuition fees, payment history, and outstanding balances. Learn how to track financial transactions and understand billing statements.',
        driveId: '1_PK_0gM7j8gRXQpbPLzVK6gaSxCDKUDf',
        duration: '5:00',
      },
      {
        id: 'pm3v2',
        moduleId: 'p3',
        title: 'Using the Chat Section',
        description:
          'Communicate directly with teachers and school staff using the built-in chat feature. Learn how to start conversations and manage message notifications.',
        driveId: '1eMOMGuGrI_fCgLv22XkKRnwg8HeK5IQn',
        duration: '4:00',
      },
      {
        id: 'pm3v3',
        moduleId: 'p3',
        title: 'Viewing Student Documents',
        description:
          'Access and download important student documents such as report cards, certificates, and official school records from the Parent Portal.',
        driveId: '1jgB4U7UBZ9KIVw_MO2LD73RUwo-0z4db',
        duration: '3:30',
      },
    ],
  },
]

export const parentAllVideos = parentModules.flatMap((module) =>
  module.videos.map((video) => ({ ...video, moduleTitle: module.title }))
)

export const getParentVideoById = (id) => parentAllVideos.find((v) => v.id === id)
export const getParentModuleById = (id) => parentModules.find((m) => m.id === id)
export const getParentTotalVideos = () => parentAllVideos.length

// ============================================================
//  ADMIN MODULES
//  Google Drive Folder:
//  https://drive.google.com/drive/folders/1tAUJy4Pwd3jnv918gJ0eguxsU6qrx7kw
// ============================================================
export const adminModules = [
  {
    id: 'a1',
    title: 'Module 1: System Overview',
    description:
      'Get oriented with the SMAPS-SIS admin interface and understand the full scope of administrative tools available.',
    icon: '🖥️',
    headerColor: 'bg-red-800',
    badgeColor: 'bg-yellow-100 text-red-800',
    borderColor: 'border-red-200',
    bgColor: 'bg-red-50',
    videos: [
      {
        id: 'am1v1',
        moduleId: 'a1',
        title: 'Admin Dashboard',
        description:
          'A comprehensive overview of the SMAPS-SIS Admin Dashboard — learn the layout, key navigation areas, and how to quickly access the administrative features you need.',
        driveId: '1G4vKl_JFJ9avZoXRhRVZ5cGr6DVe49fm',
        duration: '5:00',
      },
    ],
  },
  {
    id: 'a2',
    title: 'Module 2: User & Access Management',
    description:
      'Manage system users including administrators, faculty, and student records within the SMAPS-SIS platform.',
    icon: '👥',
    headerColor: 'bg-blue-800',
    badgeColor: 'bg-blue-100 text-blue-800',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    videos: [
      {
        id: 'am2v1',
        moduleId: 'a2',
        title: 'User Management',
        description:
          'Learn how to create, edit, and manage system user accounts — assign roles, reset credentials, and control access levels for all SMAPS-SIS users.',
        driveId: '1fH9uC2pz3uS-DMClfPkC9EHw8PjfyHMy',
        duration: '6:00',
      },
      {
        id: 'am2v2',
        moduleId: 'a2',
        title: 'Faculty',
        description:
          'Manage faculty records including personal information, subject assignments, and teaching loads. Learn how to add new faculty members and update existing profiles.',
        driveId: '1SZN-vvlzA0ibscJ-vYv_hadKHyyxeWL4',
        duration: '5:30',
      },
      {
        id: 'am2v3',
        moduleId: 'a2',
        title: 'Students',
        description:
          'Access and manage student records, enrollment status, and academic information. Learn how to search, filter, and update student profiles across all grade levels.',
        driveId: '1lJDZbjvMMljlnTrfz6KcS8A7P9Av9KY_',
        duration: '6:30',
      },
    ],
  },
  {
    id: 'a3',
    title: 'Module 3: School Configuration',
    description:
      'Configure school-wide settings and manage the enrollment process for new and returning students.',
    icon: '⚙️',
    headerColor: 'bg-purple-800',
    badgeColor: 'bg-purple-100 text-purple-800',
    borderColor: 'border-purple-200',
    bgColor: 'bg-purple-50',
    videos: [
      {
        id: 'am3v1',
        moduleId: 'a3',
        title: 'School Setup',
        description:
          'Configure core school settings including academic year setup, grading systems, section assignments, and other institution-wide preferences in SMAPS-SIS.',
        driveId: '1biKyin13i3zmBz_Qijr2bho9Ci3sKF0g',
        duration: '7:00',
      },
      {
        id: 'am3v2',
        moduleId: 'a3',
        title: 'Enrollment',
        description:
          'Manage the student enrollment process from start to finish — process new enrollments, handle re-enrollment for returning students, and track enrollment status.',
        driveId: '1ugEVbcW9CPUcjVKyT05Oj3SippL6N3B6',
        duration: '8:00',
      },
    ],
  },
  {
    id: 'a4',
    title: 'Module 4: Financial Management',
    description:
      'Handle school accounting, fee collection, and financial reporting within the SMAPS-SIS system.',
    icon: '💰',
    headerColor: 'bg-green-800',
    badgeColor: 'bg-green-100 text-green-800',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
    videos: [
      {
        id: 'am4v1',
        moduleId: 'a4',
        title: 'Accounting',
        description:
          'Learn how to manage school finances including tuition fee setup, payment recording, billing statements, and generating financial summary reports.',
        driveId: '1XqYWQnbPGcLguxbwhS8wLW09KWT1Y3x3',
        duration: '9:00',
      },
    ],
  },
  {
    id: 'a5',
    title: 'Module 5: Monitoring & Outputs',
    description:
      'Generate reports and monitor school-wide data to support administrative decision-making.',
    icon: '📊',
    headerColor: 'bg-amber-700',
    badgeColor: 'bg-amber-100 text-amber-800',
    borderColor: 'border-amber-200',
    bgColor: 'bg-amber-50',
    videos: [
      {
        id: 'am5v1',
        moduleId: 'a5',
        title: 'Reports',
        description:
          'Access and generate a variety of administrative reports including enrollment summaries, academic performance overviews, attendance records, and financial statements.',
        driveId: '15IFPIXX6cLusBxKui0oRE5hF8ZkIdZUC',
        duration: '6:00',
      },
    ],
  },
]

export const adminAllVideos = adminModules.flatMap((module) =>
  module.videos.map((video) => ({ ...video, moduleTitle: module.title }))
)

export const getAdminVideoById = (id) => adminAllVideos.find((v) => v.id === id)
export const getAdminModuleById = (id) => adminModules.find((m) => m.id === id)
export const getAdminTotalVideos = () => adminAllVideos.length
