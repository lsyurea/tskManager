import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// check that vitest is working
describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});


// check that App renders
describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
    });
    }   
);

// check that App renders the correct header
describe('App', () => {
    it('renders the correct header', () => {
        const { getByText } = render(<App />);
        expect(getByText('tskManager')).toBeInTheDocument();
    });
    }   
);

// check that App contains the Login component at the navbar
describe('App', () => {
    it('contains Login', () => {
        render(<App />);
        expect(screen.getByText('Login')).toBeInTheDocument();
    });
    }
);

// check that App contains Todo component at the navbar
describe('App', () => {
    it('contains Todo', () => {
        render(<App />);
        expect(screen.getByText('Todo')).toBeInTheDocument();
    });
    }
);

// check that App contains Calendar component at the navbar
describe('App', () => {
    it('contains Calendar', () => {
        render(<App />);
        expect(screen.getByText('Calendar')).toBeInTheDocument();
    });
    }
);

// check that App contains Profile component at the navbar
describe('App', () => {
    it('contains Profile', () => {
        render(<App />);
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });
    }
);

// integration test

describe('App', () => {
    <MemoryRouter initialEntries={['/']}>
        <App />
    </MemoryRouter>
    it('renders without crashing', () => {
        render(<App />);
    }
    );
    it('renders the correct header', () => {
        const { getByText } = render(<App />);
        expect(getByText('tskManager')).toBeInTheDocument();
    }
    );
    it('contains Login', () => {
        render(<App />);
        expect(screen.getByText('Login')).toBeInTheDocument();
    }
    );
    it('contains Todo', () => {
        render(<App />);
        expect(screen.getByText('Todo')).toBeInTheDocument();
    }
    );
    it('contains Calendar', () => {
        render(<App />);
        expect(screen.getByText('Calendar')).toBeInTheDocument();
    }
    );
    it('contains Profile', () => {
        render(<App />);
        expect(screen.getByText('Profile')).toBeInTheDocument();
    }
    );
    }
);
