import { z } from 'zod';

export const ProfileSchema = z.object({
  name: z.string().min(1).max(100),
  title: z.string().min(1).max(150),
  address: z.string().max(150),
  email: z.string().email(),
  linkedin: z.string().max(200),
  github: z.string().max(200),
  phone: z.string().max(50),
  status: z.string().max(50),
  nationality: z.string().max(50),
});

export const HeroSchema = z.object({
  content: z.string().min(1).max(2000),
});

export const SiteProjectSchema = z.object({
  title: z.string().min(1).max(120),
  image: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  technologies: z.array(z.string().max(50)).max(20),
});

export const ExperienceSectionSchema = z.object({
  heading: z.string().max(150),
  bullets: z.array(z.string().max(500)).max(30),
});

export const ExperienceEntrySchema = z.object({
  company: z.string().min(1).max(150),
  role: z.string().min(1).max(150),
  period: z.string().min(1).max(100),
  sections: z.array(ExperienceSectionSchema).max(10),
});

export const ResumeProjectSchema = z.object({
  title: z.string().min(1).max(150),
  period: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
});

export const CertificateSchema = z.object({
  name: z.string().min(1).max(150),
  date: z.string().min(1).max(50),
});

export const EducationSchema = z.object({
  institution: z.string().min(1).max(150),
  period: z.string().min(1).max(100),
  detail: z.string().min(1).max(200),
  cgpa: z.string().max(20),
});

export const AchievementSchema = z.object({
  title: z.string().min(1).max(150),
  bullets: z.array(z.string().max(500)).max(20),
});

export const SkillsSchema = z.object({
  technical: z.array(z.string().max(60)).max(40),
  personal: z.array(z.string().max(60)).max(40),
});

export const ReferenceSchema = z.object({
  name: z.string().min(1).max(150),
  role: z.string().max(150),
  company: z.string().max(150),
  email: z.string().email(),
  phone: z.string().max(50),
});

export const PortfolioSchema = z.object({
  profile: ProfileSchema,
  hero: HeroSchema,
  siteProjects: z.array(SiteProjectSchema).max(30),
  experience: z.array(ExperienceEntrySchema).max(30),
  resumeProjects: z.array(ResumeProjectSchema).max(30),
  certificates: z.array(CertificateSchema).max(30),
  education: z.array(EducationSchema).max(20),
  achievements: z.array(AchievementSchema).max(20),
  skills: SkillsSchema,
  references: z.array(ReferenceSchema).max(10),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;

// One entry per top-level key in portfolio.json, describing how an edit may
// be applied to it (see applyEdit.ts) and what shape its data must have.
export const SECTION_SCHEMAS = {
  profile: { kind: 'object', schema: ProfileSchema },
  hero: { kind: 'object', schema: HeroSchema },
  siteProjects: { kind: 'array', schema: SiteProjectSchema },
  experience: { kind: 'array', schema: ExperienceEntrySchema },
  resumeProjects: { kind: 'array', schema: ResumeProjectSchema },
  certificates: { kind: 'array', schema: CertificateSchema },
  education: { kind: 'array', schema: EducationSchema },
  achievements: { kind: 'array', schema: AchievementSchema },
  skills: { kind: 'object', schema: SkillsSchema },
  references: { kind: 'array', schema: ReferenceSchema },
} as const;

export type SectionKey = keyof typeof SECTION_SCHEMAS;
