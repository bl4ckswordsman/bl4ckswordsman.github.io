import { describe, expect, test } from 'bun:test';
import { portfolio } from '../../src/data/portfolio';

describe('Portfolio Data Validation', () => {
  test('social links have valid URLs and labels', () => {
    expect(portfolio.socials.length).toBeGreaterThan(0);
    for (const social of portfolio.socials) {
      expect(social.platform).toBeDefined();
      expect(social.url).toMatch(/^https?:\/\//);
      expect(social.label.length).toBeGreaterThan(0);
    }
  });

  test('skills list is non-empty and has valid categories', () => {
    expect(portfolio.skills.length).toBeGreaterThan(0);
    const validCategories = ['language', 'framework', 'tool', 'platform', 'database', 'other'];
    for (const skill of portfolio.skills) {
      expect(skill.name.length).toBeGreaterThan(0);
      expect(validCategories).toContain(skill.category);
    }
  });

  test('experience entries have required fields', () => {
    expect(portfolio.experience.length).toBeGreaterThan(0);
    for (const exp of portfolio.experience) {
      expect(exp.title.length).toBeGreaterThan(0);
      expect(exp.organisation.length).toBeGreaterThan(0);
      expect(exp.startDate.length).toBeGreaterThan(0);
    }
  });

  test('spoken languages have valid levels', () => {
    expect(portfolio.spokenLanguages.length).toBeGreaterThan(0);
    const validLevels = ['native', 'fluent', 'professional', 'conversational', 'basic'];
    for (const lang of portfolio.spokenLanguages) {
      expect(lang.name.length).toBeGreaterThan(0);
      expect(validLevels).toContain(lang.level);
    }
  });
});
