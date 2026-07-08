import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CVButton } from './index';

describe('CVButton', () => {
  it('renders the download link', () => {
    render(<CVButton />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('has correct href attribute', () => {
    render(<CVButton />);
    const link = screen.getByRole('link') as HTMLAnchorElement;
    expect(link.href).toContain('CV_Dominic_Garcia-8-7-26.pdf');
  });

  it('has download attribute', () => {
    render(<CVButton />);
    const link = screen.getByRole('link') as HTMLAnchorElement;
    expect(link.hasAttribute('download')).toBe(true);
  });

  it('displays correct text', () => {
    render(<CVButton />);
    expect(screen.getByText('Download CV')).toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    render(<CVButton />);
    const link = screen.getByRole('link', { name: /download cv/i });
    expect(link).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    render(<CVButton />);
    const link = screen.getByRole('link') as HTMLAnchorElement;
    expect(link.style.background).toContain('gradient');
    expect(link.style.background).toContain('135deg');
    expect(link.style.color).toBe('rgb(253, 246, 236)');
    expect(link.style.fontFamily).toContain('Nunito');
  });

  it('applies correct className for positioning and styling', () => {
    render(<CVButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('fixed', 'bottom-8', 'left-1/2', '-translate-x-1/2', 'z-50');
  });
});
