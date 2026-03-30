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
