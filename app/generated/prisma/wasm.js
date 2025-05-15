
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  password: 'password',
  image: 'image',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  twoFactorEnabled: 'twoFactorEnabled',
  twoFactorSecret: 'twoFactorSecret',
  backupCodes: 'backupCodes'
};

exports.Prisma.ProfileScalarFieldEnum = {
  id: 'id',
  bio: 'bio',
  organization: 'organization',
  title: 'title',
  location: 'location',
  interests: 'interests',
  socialLinks: 'socialLinks',
  theme: 'theme',
  securityLevel: 'securityLevel',
  avatarUrl: 'avatarUrl',
  coverImageUrl: 'coverImageUrl',
  preferredLanguage: 'preferredLanguage',
  contentPreferences: 'contentPreferences',
  lastSeen: 'lastSeen',
  userId: 'userId'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  content: 'content',
  excerpt: 'excerpt',
  publishedAt: 'publishedAt',
  coverImage: 'coverImage',
  published: 'published',
  featured: 'featured',
  views: 'views',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  authorId: 'authorId'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description'
};

exports.Prisma.TagScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug'
};

exports.Prisma.CategoryOnPostScalarFieldEnum = {
  postId: 'postId',
  categoryId: 'categoryId'
};

exports.Prisma.TagOnPostScalarFieldEnum = {
  postId: 'postId',
  tagId: 'tagId'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  content: 'content',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  postId: 'postId',
  authorId: 'authorId',
  parentId: 'parentId'
};

exports.Prisma.BookmarkScalarFieldEnum = {
  createdAt: 'createdAt',
  userId: 'userId',
  postId: 'postId'
};

exports.Prisma.CourseScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  description: 'description',
  coverImage: 'coverImage',
  level: 'level',
  price: 'price',
  isFree: 'isFree',
  isPublished: 'isPublished',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ModuleScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  order: 'order',
  courseId: 'courseId'
};

exports.Prisma.LessonScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  videoUrl: 'videoUrl',
  order: 'order',
  duration: 'duration',
  moduleId: 'moduleId'
};

exports.Prisma.CourseProgressScalarFieldEnum = {
  id: 'id',
  completedLessons: 'completedLessons',
  startedAt: 'startedAt',
  completedAt: 'completedAt',
  lastAccessedAt: 'lastAccessedAt',
  progressPercentage: 'progressPercentage',
  userId: 'userId',
  courseId: 'courseId'
};

exports.Prisma.BadgeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  imageUrl: 'imageUrl',
  category: 'category',
  difficulty: 'difficulty',
  points: 'points',
  isHidden: 'isHidden',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserBadgeScalarFieldEnum = {
  id: 'id',
  earnedAt: 'earnedAt',
  showcased: 'showcased',
  userId: 'userId',
  badgeId: 'badgeId'
};

exports.Prisma.UserAchievementScalarFieldEnum = {
  id: 'id',
  totalPoints: 'totalPoints',
  level: 'level',
  streak: 'streak',
  longestStreak: 'longestStreak',
  lastLoginDate: 'lastLoginDate',
  completedCourses: 'completedCourses',
  completedLessons: 'completedLessons',
  phishingScore: 'phishingScore',
  securityScore: 'securityScore',
  weeklyGoal: 'weeklyGoal',
  weeklyProgress: 'weeklyProgress',
  userId: 'userId'
};

exports.Prisma.ChallengeScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  startDate: 'startDate',
  endDate: 'endDate',
  isActive: 'isActive',
  points: 'points',
  maxParticipants: 'maxParticipants'
};

exports.Prisma.UserChallengeScalarFieldEnum = {
  id: 'id',
  joinedAt: 'joinedAt',
  completedAt: 'completedAt',
  progress: 'progress',
  userId: 'userId',
  challengeId: 'challengeId'
};

exports.Prisma.ThreatIntelScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  severity: 'severity',
  type: 'type',
  indicators: 'indicators',
  publishedAt: 'publishedAt',
  updatedAt: 'updatedAt',
  source: 'source'
};

exports.Prisma.NotificationPreferencesScalarFieldEnum = {
  id: 'id',
  emailNotifications: 'emailNotifications',
  smsNotifications: 'smsNotifications',
  securityAlerts: 'securityAlerts',
  newsUpdates: 'newsUpdates',
  courseUpdates: 'courseUpdates',
  marketingEmails: 'marketingEmails',
  profileId: 'profileId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  USER: 'USER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
};

exports.Theme = exports.$Enums.Theme = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  SYSTEM: 'SYSTEM'
};

exports.SecurityLevel = exports.$Enums.SecurityLevel = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  EXPERT: 'EXPERT'
};

exports.Level = exports.$Enums.Level = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
  EXPERT: 'EXPERT'
};

exports.BadgeCategory = exports.$Enums.BadgeCategory = {
  COURSE_COMPLETION: 'COURSE_COMPLETION',
  STREAK: 'STREAK',
  SECURITY_AWARENESS: 'SECURITY_AWARENESS',
  PHISHING_MASTER: 'PHISHING_MASTER',
  COMMUNITY: 'COMMUNITY',
  SPECIAL_EVENT: 'SPECIAL_EVENT',
  CHALLENGE_WINNER: 'CHALLENGE_WINNER'
};

exports.SeverityLevel = exports.$Enums.SeverityLevel = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.ThreatType = exports.$Enums.ThreatType = {
  MALWARE: 'MALWARE',
  PHISHING: 'PHISHING',
  VULNERABILITY: 'VULNERABILITY',
  RANSOMWARE: 'RANSOMWARE',
  APT: 'APT',
  OTHER: 'OTHER'
};

exports.Prisma.ModelName = {
  User: 'User',
  Profile: 'Profile',
  Post: 'Post',
  Category: 'Category',
  Tag: 'Tag',
  CategoryOnPost: 'CategoryOnPost',
  TagOnPost: 'TagOnPost',
  Comment: 'Comment',
  Bookmark: 'Bookmark',
  Course: 'Course',
  Module: 'Module',
  Lesson: 'Lesson',
  CourseProgress: 'CourseProgress',
  Badge: 'Badge',
  UserBadge: 'UserBadge',
  UserAchievement: 'UserAchievement',
  Challenge: 'Challenge',
  UserChallenge: 'UserChallenge',
  ThreatIntel: 'ThreatIntel',
  NotificationPreferences: 'NotificationPreferences'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
