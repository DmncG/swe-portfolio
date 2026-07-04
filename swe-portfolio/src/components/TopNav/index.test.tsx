import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TopNav } from './index';

describe('TopNav', () => {
  const sections = ['Home', 'Experience', 'About', 'Contact'];

  it('renders the logo image', () => {
    const onNav = vi.fn();
    render(<TopNav sections={sections} active={0} onNav={onNav} />);

    const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('w-16');
  });

  it('renders nav buttons for each section', () => {
    const onNav = vi.fn();
    render(<TopNav sections={sections} active={0} onNav={onNav} />);

    sections.forEach((section) => {
      expect(screen.getByText(section)).toBeInTheDocument();
    });
  });

  it('applies active styling to the active nav button', () => {
    const onNav = vi.fn();
    render(<TopNav sections={sections} active={1} onNav={onNav} />);

    const activeButton = screen.getAllByRole('button').find((btn) => btn.textContent === 'Experience');
    expect(activeButton).toHaveClass('text-primary');
  });

  it('applies inactive styling to inactive nav buttons', () => {
    const onNav = vi.fn();
    render(<TopNav sections={sections} active={0} onNav={onNav} />);

    const inactiveButton = screen.getAllByRole('button').find((btn) => btn.textContent === 'Experience');
    expect(inactiveButton).toHaveClass('text-muted-foreground');
  });

  it('calls onNav with correct index when desktop nav button is clicked', async () => {
    const onNav = vi.fn();
    const user = userEvent.setup();
    render(<TopNav sections={sections} active={0} onNav={onNav} />);

    const buttons = screen.getAllByRole('button');
    const experienceButton = buttons.find((btn) => btn.textContent === 'Experience');

    if (experienceButton) {
      await user.click(experienceButton);
      expect(onNav).toHaveBeenCalledWith(1);
    }
  });

  it('renders hamburger button on mobile', () => {
    const onNav = vi.fn();
    const { container } = render(<TopNav sections={sections} active={0} onNav={onNav} />);

    const hamburger = container.querySelector('.md\\:hidden');
    expect(hamburger).toBeInTheDocument();
  });

  it('shows mobile menu when hamburger is clicked', async () => {
    const onNav = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<TopNav sections={sections} active={0} onNav={onNav} />);

    const buttons = screen.getAllByRole('button');
    const hamburger = buttons[buttons.length - 1];

    await user.click(hamburger);

    const mobileMenu = container.querySelector('.absolute.top-full');
    expect(mobileMenu).toBeInTheDocument();
  });

  it('calls onNav and closes mobile menu when mobile nav item is clicked', async () => {
    const onNav = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<TopNav sections={sections} active={0} onNav={onNav} />);

    const buttons = screen.getAllByRole('button');
    const hamburger = buttons.find((btn) => btn.className.includes('md:hidden'));

    if (hamburger) {
      await user.click(hamburger);

      const mobileMenu = container.querySelector('.absolute.top-full');
      expect(mobileMenu).toBeInTheDocument();

      const mobileButtons = mobileMenu?.querySelectorAll('button');
      const mobileExperience = Array.from(mobileButtons || []).find((btn) => btn.textContent === 'Experience');

      if (mobileExperience) {
        await user.click(mobileExperience as HTMLElement);
        expect(onNav).toHaveBeenCalledWith(1);

        const mobileMenuAfter = container.querySelector('.absolute.top-full');
        expect(mobileMenuAfter).not.toBeInTheDocument();
      }
    }
  });

  it('renders with fixed top positioning', () => {
    const onNav = vi.fn();
    const { container } = render(<TopNav sections={sections} active={0} onNav={onNav} />);

    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
  });

  it('applies correct styles to nav element', () => {
    const onNav = vi.fn();
    const { container } = render(<TopNav sections={sections} active={0} onNav={onNav} />);

    const nav = container.querySelector('nav');
    expect(nav).toHaveStyle({ background: 'rgba(253,246,236,0.82)' });
    expect(nav).toHaveStyle({ backdropFilter: 'blur(12px)' });
  });
});
