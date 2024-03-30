import { render } from '@testing-library/react';

import Ticket from '.';

describe('Tickets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Ticket />);
    expect(baseElement).toBeTruthy();
  });
});
