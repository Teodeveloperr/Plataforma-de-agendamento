
import React from 'react';

export const MOCK_BUSINESSES = [
  {
    id: 'b1',
    ownerId: 'u2',
    name: 'Cortes & Estilo',
    category: 'Barbearia',
    description: 'A melhor barbearia da cidade com foco em degradês modernos e barba terapia.',
    address: 'Av. Paulista, 1000 - Bela Vista',
    price: 'R$ 45,00',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    location: 'São Paulo',
    availableSlots: ['2023-11-20T09:00:00', '2023-11-20T10:00:00', '2023-11-20T14:00:00']
  },
  {
    id: 'b2',
    ownerId: 'u3',
    name: 'Pet Love Care',
    category: 'Pet Shop',
    description: 'Banho e tosa com carinho. Cuidamos do seu melhor amigo como se fosse nosso.',
    address: 'Rua das Flores, 450 - Jardins',
    price: 'R$ 80,00',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    location: 'São Paulo',
    availableSlots: ['2023-11-21T08:30:00', '2023-11-21T11:00:00']
  },
  {
    id: 'b3',
    ownerId: 'u4',
    name: 'Clínica Sorriso',
    category: 'Dentista',
    description: 'Atendimento odontológico completo para toda a família.',
    address: 'Rua Sete de Setembro, 201 - Centro',
    price: 'A partir de R$ 150,00',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    location: 'Rio de Janeiro',
    availableSlots: ['2023-11-22T13:00:00', '2023-11-22T15:00:00']
  },
  {
    id: 'b4',
    ownerId: 'u5',
    name: 'Studio Zen',
    category: 'Salão de Beleza',
    description: 'Um refúgio de tranquilidade para seus cuidados pessoais e estética avançada.',
    address: 'Av. Batel, 1500 - Batel',
    price: 'R$ 120,00',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    location: 'Paraná',
    availableSlots: ['2023-11-22T10:00:00']
  },
  {
    id: 'b5',
    ownerId: 'u6',
    name: 'Tech Fix',
    category: 'Manutenção Residencial',
    description: 'Soluções rápidas e seguras para reparos elétricos e hidráulicos.',
    address: 'Rua da Bahia, 1200 - Lourdes',
    price: 'R$ 90,00',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    location: 'Minas Gerais',
    availableSlots: ['2023-11-23T09:00:00']
  }
];

export const CATEGORIES = [
  'Barbearia',
  'Salão de Beleza',
  'Pet Shop',
  'Dentista',
  'Médico',
  'Personal Trainer',
  'Manutenção Residencial',
  'Outros'
];

export const BRAZILIAN_STATES = [
  'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
  'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul',
  'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí',
  'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia',
  'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
];
