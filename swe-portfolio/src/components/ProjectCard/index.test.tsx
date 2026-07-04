import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './index';
import { type Project } from '../../sections/ProjectsSection/projectList';

describe('ProjectCard', () => {
  const mockProject: Project = {
    name: 'Test Project',
    description: 'This is a test project description',
    tags: ['React', 'TypeScript', 'Tailwind'],
    link: 'https://example.com/test-project',
    year: '2026',
  };

  it('renders the project name', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders the project description', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
  });

  it('renders the project year', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('renders all project tags', () => {
    render(<ProjectCard project={mockProject} />);

    mockProject.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('renders link with correct href', () => {
    render(<ProjectCard project={mockProject} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com/test-project');
  });

  it('renders with correct card styling classes', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('group', 'relative', 'rounded-2xl', 'p-6', 'border');
  });

  it('applies correct background and border styles', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveStyle({ background: 'rgba(254,249,243,0.85)' });
    expect(card).toHaveStyle({ borderColor: 'rgba(120,80,40,0.12)' });
  });

  it('renders with hover effects', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('hover:-translate-y-1', 'hover:shadow-xl');
  });

  it('renders empty tag list when no tags provided', () => {
    const projectNoTags: Project = {
      ...mockProject,
      tags: [],
    };
    const { container } = render(<ProjectCard project={projectNoTags} />);
    const tagSpans = container.querySelectorAll('[style*="rgb(201,109,58)"]');
    expect(tagSpans).toHaveLength(0);
  });

  it('renders multiple tags correctly', () => {
    const projectManyTags: Project = {
      ...mockProject,
      tags: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Node.js'],
    };
    render(<ProjectCard project={projectManyTags} />);

    projectManyTags.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });
});
