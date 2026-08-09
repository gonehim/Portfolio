import React from 'react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  renderToFile,
} from '@react-pdf/renderer';
import portfolioData from '../data/portfolio.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const profilePicPath = path.join(__dirname, 'resume-profile-pic.jpg');
const outputPath = path.join(__dirname, '../public/Irfan_Rahim_Resume.pdf');
const profilePicDataUri = `data:image/jpeg;base64,${fs.readFileSync(profilePicPath).toString('base64')}`;

const { profile, experience, resumeProjects, certificates, education, achievements, skills, references } =
  portfolioData;

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 9, fontFamily: 'Helvetica', color: '#111' },
  header: { flexDirection: 'row', marginBottom: 12 },
  photo: { width: 80, height: 80, borderRadius: 4, marginRight: 16 },
  name: { fontSize: 22, fontFamily: 'Helvetica-Bold' },
  title: { fontSize: 11, marginBottom: 6 },
  contactRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  contactLabel: { fontFamily: 'Helvetica-Bold', width: 80 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#111',
    paddingVertical: 3,
    marginTop: 10,
    marginBottom: 6,
  },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  entryTitle: { fontFamily: 'Helvetica-Bold' },
  entryPeriod: { fontFamily: 'Helvetica-Oblique' },
  subheading: { fontFamily: 'Helvetica-Bold', marginBottom: 2, marginTop: 4 },
  bulletRow: { flexDirection: 'row', marginBottom: 0, paddingLeft: 8 },
  bulletDot: { width: 8 },
  bulletText: { flex: 1, lineHeight: 1.3 },
  paragraph: { marginBottom: 4, lineHeight: 1.3 },
  skillsColumns: { flexDirection: 'row', justifyContent: 'space-between' },
  skillsColumn: { width: '48%' },
  referencesRow: { flexDirection: 'row', justifyContent: 'space-between' },
  referenceBlock: { width: '48%' },
});

const Bullets = ({ items }: { items: string[] }) => (
  <>
    {items.map((item) => (
      <View style={styles.bulletRow} key={item}>
        <Text style={styles.bulletDot}>•</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </>
);

const Resume = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src={profilePicDataUri} style={styles.photo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{profile.name.toUpperCase()}</Text>
          <Text style={styles.title}>{profile.title.toUpperCase()}</Text>
          <View style={styles.contactRow}>
            <Text><Text style={styles.contactLabel}>STATUS</Text>{profile.status}</Text>
            <Text><Text style={styles.contactLabel}>ADDRESS</Text>{profile.address}</Text>
          </View>
          <View style={styles.contactRow}>
            <Text><Text style={styles.contactLabel}>NATIONALITY</Text>{profile.nationality}</Text>
            <Text><Text style={styles.contactLabel}>EMAIL</Text>{profile.email}</Text>
          </View>
          <View style={styles.contactRow}>
            <Text><Text style={styles.contactLabel}>PHONE</Text>{profile.phone}</Text>
            <Text><Text style={styles.contactLabel}>LinkedIn</Text>{profile.linkedin}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>EXPERIENCES</Text>
      {experience.map((job) => (
        <View key={job.company} style={{ marginBottom: 6 }}>
          <Text style={styles.entryTitle}>{job.company.toUpperCase()}</Text>
          <View style={styles.entryHeader}>
            <Text style={styles.entryPeriod}>{job.role}</Text>
            <Text style={styles.entryPeriod}>{job.period}</Text>
          </View>
          {job.sections.map((section) => (
            <View key={section.heading}>
              <Text style={styles.subheading}>• {section.heading}</Text>
              <Bullets items={section.bullets} />
            </View>
          ))}
        </View>
      ))}

      <Text style={styles.sectionTitle}>PROJECTS</Text>
      {resumeProjects.map((project) => (
        <View key={project.title} style={{ marginBottom: 6 }}>
          <View style={styles.entryHeader}>
            <Text style={styles.entryTitle}>{project.title.toUpperCase()}</Text>
            <Text style={styles.entryPeriod}>{project.period}</Text>
          </View>
          <Text style={styles.paragraph}>{project.description}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>CERTIFICATES</Text>
      {certificates.map((cert) => (
        <View key={cert.name} style={styles.entryHeader}>
          <Text style={styles.entryTitle}>{cert.name}</Text>
          <Text style={styles.entryPeriod}>{cert.date}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>EDUCATIONS</Text>
      {education.map((edu) => (
        <View key={edu.institution} style={{ marginBottom: 4 }}>
          <View style={styles.entryHeader}>
            <Text style={styles.entryTitle}>{edu.institution.toUpperCase()}</Text>
            <Text style={styles.entryPeriod}>{edu.period}</Text>
          </View>
          <Text>• {edu.detail} | CGPA: {edu.cgpa}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
      {achievements.map((achievement) => (
        <View key={achievement.title} style={{ marginBottom: 4 }}>
          <Text style={styles.entryTitle}>{achievement.title}</Text>
          <Bullets items={achievement.bullets} />
        </View>
      ))}

      <Text style={styles.sectionTitle}>SKILLS</Text>
      <View style={styles.skillsColumns}>
        <View style={styles.skillsColumn}>
          <Text style={styles.subheading}>TECHNICAL</Text>
          <Bullets items={skills.technical} />
        </View>
        <View style={styles.skillsColumn}>
          <Text style={styles.subheading}>PERSONAL</Text>
          <Bullets items={skills.personal} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>REFERENCES</Text>
      <View style={styles.referencesRow}>
        {references.map((reference) => (
          <View key={reference.name} style={styles.referenceBlock}>
            <Text style={styles.entryTitle}>{reference.name.toUpperCase()}</Text>
            <Text>• {reference.role}</Text>
            {reference.company ? <Text>• {reference.company}</Text> : null}
            <Text>• {reference.email}</Text>
            <Text>• {reference.phone}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

await renderToFile(<Resume />, outputPath);
console.log(`Resume generated at ${outputPath}`);
