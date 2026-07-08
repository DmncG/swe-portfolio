import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavDots } from './index';

describe('NavDots', () => {
  const sections = ['Home', 'Experience', 'About', 'Contact'];

  it('renders the correct number of buttons', () => {
    const onNav = vi.fn();
    render(<NavDots active={0} sections={sections} onNav={onNav} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });

  it('renders aria-labels for each section', () => {
    const onNav = vi.fn();
    render(<NavDots active={0} sections={sections} onNav={onNav} />);

    sections.forEach((section) => {
      const button = screen.getByLabelText(`Go to ${section}`);
      expect(button).toBeInTheDocument();
    });
  });

  it('applies active styling to the active button', () => {
    const onNav = vi.fn();
    render(<NavDots active={1} sections={sections} onNav={onNav} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[1]).toHaveClass('bg-slide-button-accent', 'border-slide-button-accent', 'scale-125');
  });

  it('applies inactive styling to inactive buttons', () => {
    const onNav = vi.fn();
    render(<NavDots active={0} sections={sections} onNav={onNav} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[1]).toHaveClass('bg-transparent', 'border-muted-foreground');
  });

  it('calls onNav with correct index on button click', async () => {
    const onNav = vi.fn();
    const user = userEvent.setup();
    render(<NavDots active={0} sections={sections} onNav={onNav} />);

    const button = screen.getByLabelText('Go to Experience');
    await user.click(button);

    expect(onNav).toHaveBeenCalledWith(1);
  });

  it('calls onNav with correct indices for multiple clicks', async () => {
    const onNav = vi.fn();
    const user = userEvent.setup();
    render(<NavDots active={0} sections={sections} onNav={onNav} />);

    await user.click(screen.getByLabelText('Go to About'));
    await user.click(screen.getByLabelText('Go to Contact'));

    expect(onNav).toHaveBeenCalledTimes(2);
    expect(onNav).toHaveBeenNthCalledWith(1, 2);
    expect(onNav).toHaveBeenNthCalledWith(2, 3);
  });

  it('renders with fixed positioning classes', () => {
    const onNav = vi.fn();
    const { container } = render(<NavDots active={0} sections={sections} onNav={onNav} />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('fixed', 'right-6', 'top-1/2', '-translate-y-1/2', 'z-40');
  });
});
