import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import mockFetch from '../../cypress/mocks/fetch';


describe('Testes componente Table',() => {
  beforeEach(() => {
    global.fetch=jest.fn(mockFetch);
    
  });

  afterEach(() => jest.restoreAllMocks());

  it('Verifica a renderização de todos os elementos', () => {
    render(<App/>);
    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument();

    const columnSelect = screen.getByTestId('column-filter');
    expect(columnSelect).toBeInTheDocument();

    const comparisonSelect = screen.getByTestId('comparison-filter');
    expect(comparisonSelect).toBeInTheDocument();

    const valueInput = screen.getByTestId('value-filter');
    expect(valueInput).toBeInTheDocument();

    const filterBtn = screen.getByTestId('button-filter');
    expect(filterBtn).toBeInTheDocument();
  });

  it('Verifica se o filtro por nome funciona', async () => {
    await act (async () => {
        render(<App />);
    });
    const nameInput = screen.getByTestId('name-filter');
    userEvent.type(nameInput, 'aa');
    const getByFilter = await screen.getByText(/Alderaan/i);
    expect(getByFilter).toBeInTheDocument();
  });

  it('Verifica se o filtro por comparação funciona', async () => {
    await act (async () => {
        render(<App />);
    });
    const bespin = screen.getByText(/bespin/i);
    const valueInput = screen.getByTestId('value-filter');
    userEvent.type(valueInput, '6000000');
    const filterBtn = screen.getByTestId('button-filter');
    userEvent.click(filterBtn);
    expect(bespin).not.toBeInTheDocument();
    const rmvBtn = screen.getByTestId('button-remove-filters');
    userEvent.click(rmvBtn);
    expect(bespin).not.toBeInTheDocument();
  });

  it('Verifica se o filtro por comparação funciona', async () => {
    await act (async () => {
        render(<App />);
    });
    const bespin = screen.getByText(/bespin/i);
    const comparisonInput = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonInput, 'menor que');
    const valueIput = screen.getByTestId('value-filter');
    userEvent.type(valueIput, '620000')
    const filterBtn = screen.getByTestId('button-filter');
    userEvent.click(filterBtn);
    expect(bespin).not.toBeInTheDocument();
  });

  it('Verifica se o filtro por comparação funciona igual a', async () => {
    await act (async () => {
        render(<App />);
    });
    const bespin = screen.getByText(/bespin/i);
    const comparisonInput = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonInput, 'igual a');
    const valueIput = screen.getByTestId('value-filter');
    userEvent.type(valueIput, '6000000')
    const filterBtn = screen.getByTestId('button-filter');
    userEvent.click(filterBtn);
    expect(bespin).toBeInTheDocument();
  });

  it('Verifica se a ordenação funciona', async () => {
    await act (async () => {
        render(<App />);
    });
    const descRadio = screen.getByTestId('column-sort-input-desc');
    userEvent.click(descRadio);
    const orderBtn = screen.getByTestId('column-sort-button');
    userEvent.click(orderBtn);
    const tatooine = screen.getByText(/tatooine/i);
    const bespin = screen.getByText(/bespin/i);
    expect(tatooine.compareDocumentPosition(bespin)).toBe(2);
  });

  it('Verifica se a ordenação funciona', async () => {
    await act (async () => {
        render(<App />);
    });
    const ascRadio = screen.getByTestId('column-sort-input-asc');
    userEvent.click(ascRadio);
    const orderBtn = screen.getByTestId('column-sort-button');
    userEvent.click(orderBtn);
    const tatooine = screen.getByText(/tatooine/i);
    const bespin = screen.getByText(/bespin/i);
    expect(bespin.compareDocumentPosition(tatooine)).toBe(2);
  });

  it('Verifica se a ordenação funciona', async () => {
    await act (async () => {
        render(<App />);
    });
    const columnSort = screen.getByTestId('column-sort');
    userEvent.selectOptions(columnSort, 'diameter')
    const ascRadio = screen.getByTestId('column-sort-input-asc');
    userEvent.click(ascRadio);
    const orderBtn = screen.getByTestId('column-sort-button');
    userEvent.click(orderBtn);
    const tatooine = screen.getByText(/tatooine/i);
    const naboo = screen.getByText(/naboo/i);
    expect(naboo.compareDocumentPosition(tatooine)).toBe(2);
  });

  it('Verifica se a ordenação funciona', async () => {
    await act (async () => {
        render(<App />);
    });
    const columnSort = screen.getByTestId('column-sort');
    userEvent.selectOptions(columnSort, 'diameter')
    const descRadio = screen.getByTestId('column-sort-input-desc');
    userEvent.click(descRadio);
    const orderBtn = screen.getByTestId('column-sort-button');
    userEvent.click(orderBtn);
    const tatooine = screen.getByText(/tatooine/i);
    const naboo = screen.getByText(/naboo/i);
    expect(tatooine.compareDocumentPosition(naboo)).toBe(2);
  });

});
