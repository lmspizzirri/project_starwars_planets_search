import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testAPI from '../mocks/testAPI';
import { act } from 'react-dom/test-utils';

describe('Testes componente Table',() => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testAPI),
    }));
});

  const apiPlanets =  testAPI.results.map((el) => el.name);

  afterEach(() => jest.restoreAllMocks());

  it('Verifica se existe a coluna Name', () => {
  render(<App />);
  const name = screen.getByText(/name/i);
  expect(name).toBeInTheDocument();
  });

  it('Verifica se existe a coluna rotation period', () => {
    render(<App />);
    const rotationPeriod = screen.getByText(/rotation period/i);
    expect(rotationPeriod).toBeInTheDocument();
  });

  it('Verifica se existe a coluna orbital period', () => {
    render(<App />);
    const orbitalPeriod = screen.getByText(/orbital period/i);
    expect(orbitalPeriod).toBeInTheDocument();
  });

  it('Verifica se existe a coluna diameter', () => {
    render(<App />);
    const diameter = screen.getByText('Diameter');
    expect(diameter).toBeInTheDocument();
  });

  it('Verifica se existe a coluna climate', () => {
    render(<App />);
    const climate = screen.getByText(/climate/i);
    expect(climate).toBeInTheDocument();
  });

  it('Verifica se existe a coluna terrain', () => {
    render(<App />);
    const terrain = screen.getByText(/terrain/i);
    expect(terrain).toBeInTheDocument();
  });

  it('Verifica se existe a coluna surface water', () => {
    render(<App />);
    const surfaceWater = screen.getByText(/surface water/i);
    expect(surfaceWater).toBeInTheDocument();
  });

  it('Verifica se existe a coluna population', () => {
    render(<App />);
    const population = screen.getByText('Population');
    expect(population).toBeInTheDocument();
  });

  it('Verifica a requisição a API', async ()=> {

    await act (async () => {
      render(<App />);
    });

    apiPlanets.forEach( async (el) => {
      const planetName = await screen.findByText(el);
      expect(planetName).toBeInTheDocument();
    })
  });
})